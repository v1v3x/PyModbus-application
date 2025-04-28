import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Server } from "lucide-react";
import { ConnectionSetup } from "@/components/ConnectionSetup";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { Separator } from "@/components/ui/separator";
import { ModbusConnection } from "@/lib/modbusService";

const STORAGE_KEY = 'modbus-connections';

export function Connections() {
  const [isAddingConnection, setIsAddingConnection] = useState(false);
  const [editingConnection, setEditingConnection] = useState<ModbusConnection | null>(null);
  const [connections, setConnections] = useState<ModbusConnection[]>(() => {
    // Load saved connections from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save connections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
  }, [connections]);

  const handleConnectionComplete = (config: Omit<ModbusConnection, 'id'>) => {
    if (editingConnection) {
      // Update existing connection
      const updatedConnections = connections.map(conn => 
        conn.id === editingConnection.id 
          ? { ...config, id: editingConnection.id }
          : conn
      );
      setConnections(updatedConnections);
      setEditingConnection(null);
    } else {
      // Add new connection
      const newConnection: ModbusConnection = {
        ...config,
        id: `connection-${Date.now()}`,
      };
      setConnections(prev => [...prev, newConnection]);
    }
    setIsAddingConnection(false);
  };

  const handleEdit = (connection: ModbusConnection) => {
    setEditingConnection(connection);
    setIsAddingConnection(true);
  };

  const handleDelete = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Modbus Connections</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Manage your Modbus device connections
          </p>
        </div>
        {!isAddingConnection && (
          <Button 
            onClick={() => setIsAddingConnection(true)}
            className="px-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Connection
          </Button>
        )}
      </div>

      {isAddingConnection ? (
        <ConnectionSetup 
          onComplete={handleConnectionComplete}
          initialValues={editingConnection || undefined}
          onCancel={() => {
            setIsAddingConnection(false);
            setEditingConnection(null);
          }}
        />
      ) : connections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card key={connection.id} className="h-full">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{connection.name}</CardTitle>
                <CardDescription className="text-base">
                  {connection.type.toUpperCase()} Connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {connection.type === 'tcp' ? (
                      <>
                        <p>Host: {connection.host}</p>
                        <p>Port: {connection.port}</p>
                      </>
                    ) : (
                      <>
                        <p>Port: {connection.port_name}</p>
                        <p>Baud Rate: {connection.baudrate}</p>
                        <p>Parity: {connection.parity}</p>
                        <p>Stop Bits: {connection.stopbits}</p>
                        <p>Byte Size: {connection.bytesize}</p>
                      </>
                    )}
                    <p>Timeout: {connection.timeout}s</p>
                    <p>Retries: {connection.retries}</p>
                  </div>
                  <Separator />
                  <ConnectionStatus 
                    connection={connection}
                    onDelete={() => handleDelete(connection.id)} 
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleEdit(connection)}
                  >
                    Edit Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="h-full border-2 border-dashed">
            <CardHeader className="pb-4">
              <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Add Connection</CardTitle>
              <CardDescription className="text-base">
                Configure a new Modbus connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingConnection(true)}
              >
                Add Connection
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="h-full border-2 border-dashed">
            <CardHeader className="pb-4">
              <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">No Connections</CardTitle>
              <CardDescription className="text-base">
                Add your first Modbus connection to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingConnection(true)}
              >
                Add Connection
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 