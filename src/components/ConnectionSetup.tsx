import { useState, useEffect } from "react";
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
import { ModbusConnectionSteps } from "./ModbusConnectionSteps";

interface ConnectionSetupProps {
  onComplete: (config: any) => void;
  initialValues?: any;
  onCancel: () => void;
}

export function ConnectionSetup({ onComplete, initialValues, onCancel }: ConnectionSetupProps) {
  const [step, setStep] = useState<"initial" | "config">("initial");
  const [connectionName, setConnectionName] = useState(initialValues?.name || "");
  const [connectionType, setConnectionType] = useState<"tcp" | "rtu" | "ascii" | "">(initialValues?.type || "");
  
  // Initialize with existing values if editing
  useEffect(() => {
    if (initialValues) {
      setStep("config"); // Skip to config step when editing
    }
  }, [initialValues]);

  const handleInitialSubmit = () => {
    if (connectionName && connectionType) {
      setStep("config");
    }
  };

  const handleConfigComplete = (config: any) => {
    onComplete({
      name: connectionName,
      type: connectionType,
      ...config
    });
  };

  if (step === "config") {
    return (
      <ModbusConnectionSteps
        connectionType={connectionType as "tcp" | "rtu" | "ascii"}
        onComplete={handleConfigComplete}
        onBack={() => setStep("initial")}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Modbus Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Connection Name</Label>
              <Input
                id="name"
                value={connectionName}
                onChange={(e) => setConnectionName(e.target.value)}
                placeholder="My Modbus Connection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Connection Type</Label>
              <Select value={connectionType} onValueChange={(value: "tcp" | "rtu" | "ascii") => setConnectionType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcp">Modbus TCP</SelectItem>
                  <SelectItem value="rtu">Modbus RTU</SelectItem>
                  <SelectItem value="ascii">Modbus ASCII</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleInitialSubmit} disabled={!connectionName || !connectionType}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 