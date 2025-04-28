import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Server, Cpu, Settings } from "lucide-react";

export function Examples() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Examples</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Sample code and configurations for common Modbus scenarios
        </p>
      </div>

      <Tabs defaultValue="tcp" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tcp">TCP Examples</TabsTrigger>
          <TabsTrigger value="rtu">RTU Examples</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="tcp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Basic TCP Connection
              </CardTitle>
              <CardDescription>
                Simple example of connecting to a Modbus TCP device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`// TCP Connection Example
const client = new ModbusTcpClient({
    host: "192.168.1.100",
    port: 502
});

// Connect to the device
await client.connect();

// Read holding registers
const response = await client.readHoldingRegisters(0, 10);
console.log("Register values:", response.data);

// Close the connection
await client.close();`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rtu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Basic RTU Connection
              </CardTitle>
              <CardDescription>
                Simple example of connecting to a Modbus RTU device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`// RTU Connection Example
const client = new ModbusRtuClient({
    port: "COM3",          // Windows
    // port: "/dev/ttyUSB0", // Linux
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: "none"
});

// Connect to the device
await client.connect();

// Read input registers
const response = await client.readInputRegisters(100, 5);
console.log("Register values:", response.data);

// Close the connection
await client.close();`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Data Logging Example
              </CardTitle>
              <CardDescription>
                Example of continuous data logging from a Modbus device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`// Data Logging Example
async function logData(client, interval = 1000) {
    while (true) {
        try {
            const response = await client.readHoldingRegisters(0, 10);
            const timestamp = new Date().toISOString();
            
            // Log to file/database
            await saveData({
                timestamp,
                values: response.data
            });
            
            // Wait for next interval
            await new Promise(resolve => setTimeout(resolve, interval));
        } catch (error) {
            console.error("Logging error:", error);
            break;
        }
    }
}

// Start logging
const client = new ModbusTcpClient({
    host: "192.168.1.100",
    port: 502
});

await client.connect();
await logData(client, 5000); // Log every 5 seconds`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 