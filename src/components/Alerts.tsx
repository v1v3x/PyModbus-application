import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Bell } from 'lucide-react';
import { firebaseDataService, Alert } from '@/lib/firebaseDataService';

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unacknowledgedCount, setUnacknowledgedCount] = useState(0);

  useEffect(() => {
    const unsubscribe = firebaseDataService.subscribeToAlerts((newAlerts) => {
      setAlerts(newAlerts);
      setUnacknowledgedCount(newAlerts.filter(alert => !alert.acknowledged).length);
    });

    return () => {
      firebaseDataService.unsubscribe(unsubscribe);
    };
  }, []);

  const handleAcknowledge = async (alertId: string) => {
    await firebaseDataService.acknowledgeAlert(alertId);
  };

  const getAlertColor = (type: Alert['type']) => {
    return type === 'critical' ? 'text-red-500' : 'text-yellow-500';
  };

  const getAlertIcon = (type: Alert['type']) => {
    return type === 'critical' ? (
      <AlertCircle className="h-5 w-5" />
    ) : (
      <Bell className="h-5 w-5" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Alerts</CardTitle>
          {unacknowledgedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {unacknowledgedCount} unacknowledged
              </span>
            </div>
          )}
        </div>
        <CardDescription>
          Monitor and manage system alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No alerts
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between p-4 rounded-lg border"
              >
                <div className="flex gap-3">
                  <div className={`mt-1 ${getAlertColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-sm text-muted-foreground">
                      Device: {alert.deviceId} | Value: {alert.value} | Threshold: {alert.threshold}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </Button>
                )}
                {alert.acknowledged && (
                  <div className="flex items-center gap-1 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Acknowledged</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 