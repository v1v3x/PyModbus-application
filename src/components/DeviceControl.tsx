import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { firebaseDataService, ControlSignal } from '@/lib/firebaseDataService';
import { Power, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface DeviceControlProps {
  deviceId: string;
  deviceName: string;
  status: 'running' | 'stopped' | 'error';
  lastUpdate?: Date;
}

export function DeviceControl({ deviceId, deviceName, status, lastUpdate }: DeviceControlProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [controlSignals, setControlSignals] = useState<ControlSignal[]>([]);

  useEffect(() => {
    const unsubscribe = firebaseDataService.subscribeToControlSignals(deviceId, (signals) => {
      setControlSignals(signals);
    });

    return () => {
      firebaseDataService.unsubscribe(unsubscribe);
    };
  }, [deviceId]);

  const handleControl = async (command: ControlSignal['command']) => {
    setIsLoading(true);
    try {
      await firebaseDataService.sendControlSignal(deviceId, command);
      toast({
        title: "Command Sent",
        description: `${command} command sent to ${deviceName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send command",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-green-500';
      case 'stopped':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'stopped':
        return <Power className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <XCircle className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{deviceName}</CardTitle>
            <CardDescription>
              {lastUpdate && `Last updated: ${lastUpdate.toLocaleTimeString()}`}
            </CardDescription>
          </div>
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="capitalize">{status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => handleControl('start')}
            disabled={isLoading || status === 'running'}
          >
            Start
          </Button>
          <Button
            variant="outline"
            onClick={() => handleControl('stop')}
            disabled={isLoading || status === 'stopped'}
          >
            Stop
          </Button>
          <Button
            variant="outline"
            onClick={() => handleControl('reset')}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
        {controlSignals.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recent Commands</h4>
            <div className="space-y-2">
              {controlSignals.slice(-3).map((signal) => (
                <div
                  key={signal.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="capitalize">{signal.command}</span>
                  <span className="text-muted-foreground">
                    {new Date(signal.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 