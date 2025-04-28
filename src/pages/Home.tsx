import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Server, LineChart, Database, BookOpen, Download, Settings, Laptop, Cloud, Cpu, Network, Settings2, Code, Shield, Gauge, Workflow, Zap, Heart } from "lucide-react";

export function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold tracking-tight">PyModbus Connector Portal</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A powerful web interface for managing Modbus connections, monitoring data in real-time, and configuring your industrial automation setup.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg" className="px-8">
            <Link to="/connections">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link to="/documentation">
              Documentation <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="px-8">
            <Link to="/acknowledgements">
              Credits <Heart className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Real-time Monitoring</CardTitle>
            <CardDescription className="text-base">
              Monitor PLC data in real-time with automatic updates and visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Live data streaming</li>
              <li>Automatic value updates</li>
              <li>Visual data representation</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Secure Communication</CardTitle>
            <CardDescription className="text-base">
              Encrypted data transfer with robust error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>SSL/TLS encryption</li>
              <li>Error detection & recovery</li>
              <li>Connection monitoring</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Performance Optimization</CardTitle>
            <CardDescription className="text-base">
              High-performance data handling and processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Optimized polling rates</li>
              <li>Efficient data caching</li>
              <li>Minimal latency</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="pb-4">
            <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Workflow className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Advanced Features</CardTitle>
            <CardDescription className="text-base">
              Comprehensive tools for industrial automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Multiple protocol support (TCP, RTU, ASCII)</li>
              <li>Custom function code handling</li>
              <li>Batch operations support</li>
              <li>Automatic reconnection</li>
              <li>Data logging and export</li>
              <li>Custom data visualization</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Configuration Options</CardTitle>
            <CardDescription className="text-base">
              Flexible setup and configuration tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Connection templates</li>
              <li>Custom polling intervals</li>
              <li>Data type configuration</li>
              <li>Error handling settings</li>
              <li>Notification preferences</li>
              <li>Backup and restore</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">About Modbus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Cpu className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>What is Modbus?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Modbus is an industrial communication protocol developed by Modicon in 1979. It's a de facto standard for connecting industrial electronic devices, widely used in manufacturing, process control, and building automation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Network className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Protocol Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Modbus TCP/IP (Ethernet-based)</li>
                <li>Modbus RTU (Serial communication)</li>
                <li>Modbus ASCII (Serial communication)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Data Model</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Coils (Single bit, read-write)</li>
                <li>Discrete Inputs (Single bit, read-only)</li>
                <li>Input Registers (16-bit, read-only)</li>
                <li>Holding Registers (16-bit, read-write)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">PyModbus Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Code className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>About PyModbus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PyModbus is a full Modbus protocol implementation in Python, offering both client and server functionality. It supports all three Modbus variants: TCP, RTU, and ASCII.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Pure Python implementation</li>
                <li>Asynchronous I/O support</li>
                <li>Cross-platform compatibility</li>
                <li>Extensive documentation</li>
                <li>Active community support</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Settings2 className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Supported Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PyModbus supports all standard Modbus functions and provides additional features for modern applications.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Read/Write Coils and Registers</li>
                <li>Multiple Register Operations</li>
                <li>Custom Function Codes</li>
                <li>Error Handling and Diagnostics</li>
                <li>Unit Testing Support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 