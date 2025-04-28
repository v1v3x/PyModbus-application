import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, BarChart3 } from "lucide-react";

export function DataLogging() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  // Sample data for demonstration
  const sampleData = [
    { name: '00:00', value: 23 },
    { name: '01:00', value: 24 },
    { name: '02:00', value: 22 },
    { name: '03:00', value: 25 },
    { name: '04:00', value: 26 },
    { name: '05:00', value: 24 },
    { name: '06:00', value: 23 },
    { name: '07:00', value: 25 },
    { name: '08:00', value: 27 },
    { name: '09:00', value: 28 },
    { name: '10:00', value: 26 },
    { name: '11:00', value: 25 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Data Logging</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Monitor and analyze your Modbus device data
        </p>
      </div>

      {selectedDevice ? (
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Device Data</CardTitle>
                <CardDescription className="text-base">
                  Real-time data from your Modbus device
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedDevice(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Device Selection
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="text-3xl font-bold">25.4</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Average</p>
                      <p className="text-3xl font-bold">24.8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Maximum</p>
                      <p className="text-3xl font-bold">28.0</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="h-full border-2 border-dashed">
            <CardHeader className="pb-4">
              <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">No Device Selected</CardTitle>
              <CardDescription className="text-base">
                Select a device to view its data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedDevice("demo-device")}
              >
                Select Demo Device
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 