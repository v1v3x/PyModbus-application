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
import { ModbusConnectionSteps } from "./ModbusConnectionSteps";

interface ConnectionSetupProps {
  onComplete: (config: any) => void;
}

export function ConnectionSetup({ onComplete }: ConnectionSetupProps) {
  const [step, setStep] = useState<"initial" | "config">("initial");
  const [connectionName, setConnectionName] = useState("");
  const [connectionType, setConnectionType] = useState<"tcp" | "rtu" | "ascii" | "">(""); 

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
            <Button 
              className="w-full mt-4" 
              onClick={handleInitialSubmit}
              disabled={!connectionName || !connectionType}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 