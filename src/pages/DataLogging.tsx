import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration (replace with your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAiwT_l__UkaIii2Mx-fu3guo13unK7KGE",
  authDomain: "modbus-3faa0.firebaseapp.com",
  databaseURL: "https://modbus-3faa0-default-rtdb.firebaseio.com",
  projectId: "modbus-3faa0",
  storageBucket: "modbus-3faa0.firebasestorage.app",
  messagingSenderId: "293677767193",
  appId: "1:293677767193:web:48190a7b8067eded3d6888",
  measurementId: "G-STSQBG69J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function DataLogging() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string|null>("demo-device"); // Assume demo-device as default

  const [avgValue, setAvgValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [minValue, setMinValue] = useState<number>(0);

  useEffect(() => {
    if (selectedDevice) {
      // Correct path based on your Firebase structure
      const dataRef = ref(db, "modbus_data");

      onValue(dataRef, (snapshot) => {
        console.log("📥 Data snapshot received from Firebase");
        const rawData = snapshot.val();

        if (rawData) {
          console.log("🔥 Firebase Raw Data:", rawData);

          // Extract and format data
          const formattedData = Object.values(rawData)
            .slice(-5) // Get last 5 records
            .map((entry: any) => ({
              name: new Date(entry.timestamp).toLocaleTimeString(),
              value: entry.values[0], // Assuming the first value in the array
            }));

          setChartData(formattedData);

          // Calculate average, max, and min values
          const values = formattedData.map((entry) => entry.value);
          const total = values.reduce((acc, curr) => acc + curr, 0);
          const avg = total / values.length;
          const max = Math.max(...values);
          const min = Math.min(...values);

          setAvgValue(avg);
          setMaxValue(max);
          setMinValue(min);
        } else {
          console.warn("⚠️ No data found at path: data/logs");
          setChartData([]);
        }
      });
    }
  }, [selectedDevice]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Data Logging</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Monitor and analyze your Modbus device data
        </p>
      </div>

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
                <LineChart data={chartData}>
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
                    <p className="text-sm text-muted-foreground">Average Value</p>
                    <p className="text-3xl font-bold">{avgValue.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Maximum Value</p>
                    <p className="text-3xl font-bold">{maxValue.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Minimum Value</p>
                    <p className="text-3xl font-bold">{minValue.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
