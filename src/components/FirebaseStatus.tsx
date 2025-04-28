import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Wifi, WifiOff, CheckCircle2, XCircle, Settings, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export function FirebaseStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured
    checkConfiguration();
  }, []);

  const checkConfiguration = () => {
    // TODO: Replace with actual Firebase config check
    const config = localStorage.getItem('firebase-config');
    setIsConfigured(!!config);
  };

  const handleConnectionAttempt = async () => {
    if (!isConfigured) {
      toast.error("Firebase not configured", {
        description: "Please configure Firebase settings first",
        action: {
          label: "Configure",
          onClick: () => window.location.href = '/firebase-config'
        }
      });
      return;
    }

    setIsChecking(true);
    try {
      // TODO: Replace with actual Firebase connection check
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
      toast.success("Connected to Firebase successfully");
    } catch (error) {
      setIsConnected(false);
      toast.error("Failed to connect to Firebase");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 p-0"
              onClick={() => setShowDetails(!showDetails)}
            >
              <AnimatePresence mode="wait">
                {!isConfigured ? (
                  <motion.div
                    key="unconfigured"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                ) : isChecking ? (
                  <motion.div
                    key="checking"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Database className="h-5 w-5 animate-pulse text-yellow-500" />
                  </motion.div>
                ) : isConnected ? (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Wifi className="h-5 w-5 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="disconnected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <WifiOff className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {!isConfigured 
                ? "Firebase Not Configured" 
                : "Firebase Connection Status"
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-72 rounded-lg border bg-card p-4 shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Firebase Status</h3>
                {!isConfigured ? (
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                ) : isChecking ? (
                  <Database className="h-5 w-5 animate-pulse text-yellow-500" />
                ) : isConnected ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              
              {!isConfigured ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Firebase is not configured. Please set up your Firebase configuration to enable cloud features.
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/firebase-config">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Firebase
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Connection</span>
                      <span className={isConnected ? "text-green-500" : "text-red-500"}>
                        {isChecking ? "Checking..." : isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Latency</span>
                      <span>
                        {isConnected ? "~100ms" : "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Last Sync</span>
                      <span>
                        {isConnected ? "Just now" : "Never"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Project ID</span>
                      <span className="text-muted-foreground">
                        {localStorage.getItem('firebase-config') ? JSON.parse(localStorage.getItem('firebase-config')!).projectId : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={handleConnectionAttempt}
                      disabled={isChecking}
                    >
                      {isChecking ? (
                        <Database className="mr-2 h-4 w-4 animate-pulse" />
                      ) : isConnected ? (
                        <WifiOff className="mr-2 h-4 w-4" />
                      ) : (
                        <Wifi className="mr-2 h-4 w-4" />
                      )}
                      {isChecking ? "Checking..." : isConnected ? "Disconnect" : "Connect"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to="/firebase-config">
                        <Settings className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 