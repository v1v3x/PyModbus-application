import { useEffect, useRef, useState } from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import { firebaseDataService, DataLog } from '@/lib/firebaseDataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataVisualizationProps {
  deviceId: string;
  title: string;
  unit: string;
  warningThreshold?: number;
  criticalThreshold?: number;
  isConnected?: boolean;
}

export function DataVisualization({
  deviceId,
  title,
  unit,
  warningThreshold,
  criticalThreshold,
  isConnected = true
}: DataVisualizationProps) {
  const [data, setData] = useState<DataLog[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const unsubscribeRef = useRef<() => void>();

  useEffect(() => {
    if (isConnected && isPlaying) {
      unsubscribeRef.current = firebaseDataService.subscribeToData(deviceId, (newData) => {
        setData(newData);
        setLastUpdate(new Date());
      });
    } else if (!isConnected) {
      // Generate sample data when not connected
      const sampleData: DataLog[] = [
        {
          id: '1',
          timestamp: Date.now() - 3600000,
          value: 25,
          unit,
          deviceId,
          status: 'normal'
        },
        {
          id: '2',
          timestamp: Date.now() - 1800000,
          value: 30,
          unit,
          deviceId,
          status: 'normal'
        },
        {
          id: '3',
          timestamp: Date.now() - 900000,
          value: 35,
          unit,
          deviceId,
          status: 'warning'
        },
        {
          id: '4',
          timestamp: Date.now(),
          value: 40,
          unit,
          deviceId,
          status: 'critical'
        }
      ];
      setData(sampleData);
      setLastUpdate(new Date());
    }

    return () => {
      if (unsubscribeRef.current) {
        firebaseDataService.unsubscribe(unsubscribeRef.current);
      }
    };
  }, [deviceId, isPlaying, isConnected, unit]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setData([]);
  };

  const formatXAxis = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatTooltip = (value: number) => {
    return `${value} ${unit}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {lastUpdate && `Last updated: ${lastUpdate.toLocaleTimeString()}`}
            </CardDescription>
          </div>
          {isConnected && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: unit, angle: -90, position: 'insideLeft', offset: 15 }}
              />
              <Tooltip
                labelFormatter={formatXAxis}
                formatter={formatTooltip}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name={title}
                stroke="#4ade80"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 