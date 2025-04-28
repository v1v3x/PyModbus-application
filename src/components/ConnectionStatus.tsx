import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { modbusService, ModbusConnection } from "@/lib/modbusService";

interface ConnectionStatusProps {
  connection: ModbusConnection;
  onDelete: () => void;
}

export function ConnectionStatus({ connection, onDelete }: ConnectionStatusProps) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [retryCount, setRetryCount] = useState(0);
  const [data, setData] = useState<boolean[] | null>(null);
  const [isAutoReconnecting, setIsAutoReconnecting] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const MAX_RETRY_ATTEMPTS = 5;
  const RETRY_DELAY = 2000; // 2 seconds
  const POLL_INTERVAL = 1000; // 1 second

  // Cleanup on unmount or when connection changes
  useEffect(() => {
    return () => {
      cleanupConnection();
    };
  }, [connection.id]);

  const cleanupConnection = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    // Ensure we disconnect when cleaning up
    if (status === "connected") {
      handleDisconnect();
    }
    setRetryCount(0);
    setIsAutoReconnecting(false);
    setData(null);
  };

  // Handle data polling
  useEffect(() => {
    const startPolling = async () => {
      if (status === "connected") {
        try {
          const response = await modbusService.readData(connection.id);
          if (response.success && response.data) {
            setData(response.data);
          } else {
            throw new Error("Failed to read data");
          }
        } catch (error) {
          console.error("Failed to read data:", error);
          // Device might be disconnected, attempt auto-reconnect
          handleDeviceDisconnection();
        }
      }
    };

    if (status === "connected") {
      // Initial read
      startPolling();
      // Setup polling interval
      pollIntervalRef.current = setInterval(startPolling, POLL_INTERVAL);
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [status, connection.id]);

  const handleDeviceDisconnection = () => {
    // Only attempt reconnection if we were previously connected
    if (status === "connected") {
      // Clear existing intervals/timeouts
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      setStatus("disconnected");
      setData(null);

      // Only attempt auto-reconnect if we haven't exceeded max retries
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setIsAutoReconnecting(true);
        toast.info(`Device disconnected. Attempting to reconnect... (${retryCount + 1}/${MAX_RETRY_ATTEMPTS})`);
        reconnectTimeoutRef.current = setTimeout(() => {
          handleConnect(true);
        }, RETRY_DELAY);
      } else {
        setIsAutoReconnecting(false);
        setRetryCount(0);
        toast.error("Device disconnected. Max reconnection attempts reached.");
      }
    }
  };

  const handleConnect = async (isAutoReconnect: boolean = false) => {
    setStatus("connecting");
    
    try {
      const response = await modbusService.connect(connection);
      
      if (response.success) {
        setStatus("connected");
        setIsAutoReconnecting(false);
        toast.success(`✅ Connected to ${connection.name} via Modbus ${connection.type.toUpperCase()}`);
        setRetryCount(0);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
      
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setRetryCount(prev => prev + 1);
        if (isAutoReconnect) {
          // Schedule next auto-reconnect attempt
          reconnectTimeoutRef.current = setTimeout(() => {
            handleConnect(true);
          }, RETRY_DELAY);
        } else {
          toast.error(`Connection failed. Please try again.`);
          setStatus("disconnected");
        }
      } else {
        setStatus("disconnected");
        setIsAutoReconnecting(false);
        toast.error("Failed to connect after multiple attempts");
        setRetryCount(0);
      }
    }
  };

  const handleDisconnect = async () => {
    // Clear any existing reconnection attempts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    setIsAutoReconnecting(false);
    setRetryCount(0);

    try {
      await modbusService.disconnect(connection.id);
      setStatus("disconnected");
      setData(null);
      toast.info("Disconnected from device");
    } catch (error) {
      console.error("Disconnect error:", error);
      toast.error("Failed to disconnect properly");
      // Force disconnect state anyway
      setStatus("disconnected");
      setData(null);
    }
  };

  const handleDeleteConnection = async () => {
    // Ensure connection is disconnected before deletion
    if (status === "connected") {
      await handleDisconnect();
    }
    cleanupConnection();
    onDelete();
    toast.success("Connection deleted successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {status === "connected" ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-500 font-medium">Connected</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </>
        ) : status === "connecting" ? (
          <>
            <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
            <span className="text-sm text-orange-500 font-medium">
              {isAutoReconnecting 
                ? `Auto-reconnecting (Attempt ${retryCount}/${MAX_RETRY_ATTEMPTS})` 
                : `Connecting${retryCount > 0 ? ` (Attempt ${retryCount}/${MAX_RETRY_ATTEMPTS})` : '...'}`}
            </span>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-500 font-medium">Disconnected</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleConnect(false)}
              disabled={isAutoReconnecting}
            >
              Connect
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-100"
          onClick={handleDeleteConnection}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Show real-time data when connected */}
      {status === "connected" && data !== null && (
        <div className="text-sm">
          <p className="font-medium">Real-time Data:</p>
          <p className="text-muted-foreground">
            Coil Status: {data.map((bit, index) => 
              <span key={index} className={bit ? "text-green-500" : "text-red-500"}>
                {bit ? "ON" : "OFF"}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
} 