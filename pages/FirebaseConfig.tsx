import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export function FirebaseConfig() {
  const [config, setConfig] = useState({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically save this to your environment variables or configuration
    console.log("Firebase config:", config);
    toast({
      title: "Configuration Saved",
      description: "Your Firebase configuration has been saved successfully.",
    });
  };

  const handleReset = () => {
    setConfig({
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    });
    toast({
      title: "Configuration Reset",
      description: "Your Firebase configuration has been reset.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Configuration</CardTitle>
          <CardDescription>
            Enter your Firebase project configuration details below. You can find these in your Firebase
            Console under Project Settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  placeholder="Your Firebase API Key"
                  value={config.apiKey}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authDomain">Auth Domain</Label>
                <Input
                  id="authDomain"
                  name="authDomain"
                  placeholder="your-app.firebaseapp.com"
                  value={config.authDomain}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  name="projectId"
                  placeholder="your-project-id"
                  value={config.projectId}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storageBucket">Storage Bucket</Label>
                <Input
                  id="storageBucket"
                  name="storageBucket"
                  placeholder="your-app.appspot.com"
                  value={config.storageBucket}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                <Input
                  id="messagingSenderId"
                  name="messagingSenderId"
                  placeholder="123456789"
                  value={config.messagingSenderId}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appId">App ID</Label>
                <Input
                  id="appId"
                  name="appId"
                  placeholder="1:123456789:web:abcdef"
                  value={config.appId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button type="button" onClick={handleSave}>
                Save Configuration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 