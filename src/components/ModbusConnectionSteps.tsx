import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModbusConnectionStepsProps {
  connectionType: "tcp" | "rtu" | "ascii";
  onComplete: (config: any) => void;
  onBack: () => void;
  onCancel?: () => void;
}

export function ModbusConnectionSteps({ connectionType, onComplete, onBack, onCancel }: ModbusConnectionStepsProps) {
  const [config, setConfig] = useState({
    // Common settings
    timeout: "1",
    retries: "3",
    // TCP specific
    host: "",
    port: "502",
    // Serial specific
    port_name: "",
    baudrate: "9600",
    bytesize: "8",
    parity: "N",
    stopbits: "1",
  });

  const handleChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onComplete(config);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configure {connectionType.toUpperCase()} Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Common Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Common Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Response Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    value={config.timeout}
                    onChange={(e) => handleChange("timeout", e.target.value)}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retries">Retries</Label>
                  <Input
                    id="retries"
                    value={config.retries}
                    onChange={(e) => handleChange("retries", e.target.value)}
                    placeholder="3"
                  />
                </div>
              </div>
            </div>

            {/* TCP Specific Settings */}
            {connectionType === "tcp" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">TCP Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="host">Host IP Address</Label>
                    <Input
                      id="host"
                      value={config.host}
                      onChange={(e) => handleChange("host", e.target.value)}
                      placeholder="192.168.1.100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      value={config.port}
                      onChange={(e) => handleChange("port", e.target.value)}
                      placeholder="502"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* RTU/ASCII Specific Settings */}
            {(connectionType === "rtu" || connectionType === "ascii") && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Serial Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="port_name">Port Name</Label>
                    <Input
                      id="port_name"
                      value={config.port_name}
                      onChange={(e) => handleChange("port_name", e.target.value)}
                      placeholder="/dev/ttyUSB0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baudrate">Baud Rate</Label>
                    <Select value={config.baudrate} onValueChange={(value) => handleChange("baudrate", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select baud rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9600">9600</SelectItem>
                        <SelectItem value="19200">19200</SelectItem>
                        <SelectItem value="38400">38400</SelectItem>
                        <SelectItem value="57600">57600</SelectItem>
                        <SelectItem value="115200">115200</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bytesize">Byte Size</Label>
                    <Select value={config.bytesize} onValueChange={(value) => handleChange("bytesize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select byte size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parity">Parity</Label>
                    <Select value={config.parity} onValueChange={(value) => handleChange("parity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N">None</SelectItem>
                        <SelectItem value="E">Even</SelectItem>
                        <SelectItem value="O">Odd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stopbits">Stop Bits</Label>
                    <Select value={config.stopbits} onValueChange={(value) => handleChange("stopbits", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stop bits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                {onCancel && (
                  <Button variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button variant="outline" onClick={onBack}>
                  Back
                </Button>
              </div>
              <Button onClick={handleSubmit}>
                Save Connection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 