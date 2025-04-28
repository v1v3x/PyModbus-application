import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  BookOpen, 
  Download, 
  Settings, 
  Server, 
  Network, 
  Cpu, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Code,
  Zap,
  Clock,
  BarChart,
  Laptop,
  Monitor} from "lucide-react";
import { motion } from "framer-motion";

export function Documentation() {
  const [activeTab, setActiveTab] = useState("requirements");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4">
      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>
        <Button variant="outline" asChild>
          <a href="https://pypi.org/project/pymodbus/" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download PyModbus
          </a>
        </Button>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold tracking-tight">How to Use Modbus Connector Portal</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive guide to setting up and using the Modbus Connector Portal for your industrial automation needs.
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-muted/50 rounded-lg p-6 border"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h3 className="text-lg font-semibold">Quick Start</h3>
            <p className="text-muted-foreground">
              If you're new to Modbus, we recommend starting with the Requirements tab to understand what you need before setting up your connection.
            </p>
          </div>
        </div>
      </motion.div>

      <Tabs 
        defaultValue="requirements" 
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="requirements" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Requirements</span>
          </TabsTrigger>
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Setup</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>Offline App</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full border-t-4 border-t-primary">
                <CardHeader>
                  <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Hardware Requirements</CardTitle>
                  <CardDescription>
                    Physical components needed for Modbus communication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Modbus-compatible device (RTU, TCP, ASCII)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For RTU: Serial connection (RS-485, RS-422, or RS-232)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For TCP: Ethernet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For ASCII: Serial connection with ASCII encoding</span>
                    </li>
          </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-t-4 border-t-primary">
                <CardHeader>
                  <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Software Requirements</CardTitle>
                  <CardDescription>
                    Applications and settings needed to run the portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Modern web browser (Chrome, Firefox, Safari, Edge)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>JavaScript enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For RTU connections: Serial port access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For TCP connections: Network access to the device</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-t-4 border-t-primary">
                <CardHeader>
                  <div className="mb-4 p-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Network className="h-6 w-6 text-primary" />
        </div>
                  <CardTitle>Network Requirements</CardTitle>
                  <CardDescription>
                    Network configuration for Modbus communication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For TCP connections: IP address and port of the Modbus device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>For RTU over TCP: Gateway device with IP address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Network connectivity between your computer and the Modbus device</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-8"
          >
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Before setting up your Modbus connection, ensure that your device is properly configured and accessible on your network. If you're using RTU over TCP, make sure your gateway device is correctly set up to translate between the two protocols.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">1</span>
                    Create a Connection
                  </CardTitle>
                  <CardDescription>
                    Set up your first Modbus connection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Navigate to the Connections page and click "Add Connection". Fill in the following details:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Connection Name:</strong> A descriptive name for your connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Protocol:</strong> Select the appropriate Modbus protocol (RTU, TCP, ASCII)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Device ID:</strong> The unit ID or slave address of your Modbus device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Connection Parameters:</strong> Port, baud rate, parity, etc. based on your protocol</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground">
                      Use a descriptive name that includes the device type and location to easily identify your connections later.
              </p>
            </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">2</span>
                    Configure Device Settings
                  </CardTitle>
                  <CardDescription>
                    Set up the specific parameters for your device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Set up the specific parameters for your device:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>For RTU:</strong> Set the correct baud rate, data bits, stop bits, and parity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>For TCP:</strong> Enter the IP address and port number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>For ASCII:</strong> Configure the ASCII encoding settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Timeout and Retry:</strong> Set the appropriate timeout and retry values</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground">
                      The default timeout is usually sufficient for most applications, but you may need to adjust it based on your network conditions and device response time.
              </p>
            </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">3</span>
                    Test the Connection
                  </CardTitle>
                  <CardDescription>
                    Verify your connection is working correctly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>After configuring your connection, test it to ensure it works correctly:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Click the "Test Connection" button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Verify that the connection is established</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Check for any error messages and resolve them</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Troubleshooting:</p>
                    <p className="text-sm text-muted-foreground">
                      If your connection fails, check your network settings, ensure your device is powered on, and verify that the IP address and port are correct. For RTU connections, make sure the serial port is not being used by another application.
              </p>
            </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Reading Registers
                  </CardTitle>
                  <CardDescription>
                    How to read data from your Modbus device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To read data from your Modbus device:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Select your connection from the Connections page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Choose the register type (Holding, Input, Coil, or Discrete Input)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Enter the starting address and number of registers to read</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Click "Read Registers" to retrieve the data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>View the values in the table below</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Register Types:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li><strong>Holding Registers (4x):</strong> Read/write 16-bit registers</li>
                      <li><strong>Input Registers (3x):</strong> Read-only 16-bit registers</li>
                      <li><strong>Coils (0x):</strong> Read/write single-bit values</li>
                      <li><strong>Discrete Inputs (1x):</strong> Read-only single-bit values</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Writing Registers
                  </CardTitle>
                  <CardDescription>
                    How to write data to your Modbus device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To write data to your Modbus device:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Select your connection from the Connections page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Choose the register type (Holding or Coil)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Enter the address and value to write</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Click "Write Register" to send the data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Verify the write operation was successful</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Safety Note:</p>
                    <p className="text-sm text-muted-foreground">
                      Be cautious when writing to registers, as incorrect values can affect device operation. Always verify the address and value before writing, and consider implementing a confirmation step for critical operations.
              </p>
            </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Data Logging
                  </CardTitle>
                  <CardDescription>
                    How to log and monitor data over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To log and monitor data over time:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Navigate to the Data Logging page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Select your connection and registers to monitor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Set the logging interval (e.g., every 1 second, 1 minute, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Click "Start Logging" to begin collecting data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>View the data in real-time charts and tables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Export the data for further analysis</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground">
                      For long-term monitoring, consider setting up a database to store your logged data. This will allow you to analyze trends over time and generate reports.
                    </p>
        </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="offline" className="space-y-6">
              <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-primary" />
                    Offline GUI Application
                  </CardTitle>
                  <CardDescription>
                    How to use the standalone desktop application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Modbus Connector Portal is also available as a standalone desktop application that can be used offline. 
                    This application provides the same functionality as the web version but runs locally on your computer.
                  </p>
                  <div className="flex flex-col gap-4 my-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                        <Monitor className="h-6 w-6 text-blue-500" />
                        <div className="flex-grow">
                          <h3 className="font-medium">Windows Standalone Application</h3>
                          <p className="text-sm text-muted-foreground">
                            A standalone Modbus Data Logger application for Windows that doesn't require Python installation.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://github.com/v1v3x/modbus-connector-portal/releases/download/v1.0.0/ModbusDataLogger.exe" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                Download from GitHub
                  </a>
                </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://drive.google.com/uc?export=download&id=YOUR_GOOGLE_DRIVE_FILE_ID" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                Download from Google Drive
                  </a>
                </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://1drv.ms/u/YOUR_ONEDRIVE_SHARE_LINK" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                Download from OneDrive
                        </a>
                      </Button>
                          </div>
                </div>
              </div>
              
                      <div className="bg-muted/50 p-4 rounded-lg border border-primary/10">
                        <h4 className="font-medium flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-primary" />
                          Download Instructions
                        </h4>
                        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                          <li>1. Choose your preferred download source (GitHub, Google Drive, or OneDrive)</li>
                          <li>2. Some browsers might warn about downloading .exe files - this is normal</li>
                          <li>3. After downloading, you might need to click "Keep" or "Run anyway"</li>
                          <li>4. The file is virus-free, but you can scan it with your antivirus for peace of mind</li>
                        </ul>
                    </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">1</span>
                    Installation
                  </CardTitle>
                  <CardDescription>
                    How to install the offline application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To install the offline application:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Download the appropriate installer for your operating system (Windows, macOS, or Linux)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Run the installer and follow the on-screen instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Once installed, launch the application from your desktop or start menu</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">System Requirements:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li><strong>Windows:</strong> Windows 10 or later</li>
                      <li><strong>macOS:</strong> macOS 10.15 (Catalina) or later</li>
                      <li><strong>Linux:</strong> Ubuntu 20.04 or later, or equivalent</li>
                      <li><strong>Memory:</strong> 4GB RAM minimum</li>
                      <li><strong>Storage:</strong> 500MB free disk space</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">2</span>
                    Using the Offline Application
                  </CardTitle>
                  <CardDescription>
                    How to use the standalone application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The offline application provides the same functionality as the web version:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Connection Management:</strong> Create, edit, and delete Modbus connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Data Logging:</strong> Log and monitor data from your Modbus devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Offline Mode:</strong> Work without an internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Local Data Storage:</strong> Store your data locally on your computer</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Advantages of the Offline Application:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li>• Works without an internet connection</li>
                      <li>• Faster performance for data-intensive operations</li>
                      <li>• Local data storage for better security</li>
                      <li>• System-level access to serial ports and network interfaces</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">3</span>
                    Updating the Application
                  </CardTitle>
                  <CardDescription>
                    How to keep your application up to date
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To update the offline application:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>The application will automatically check for updates when launched</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>If an update is available, you will be prompted to download and install it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                      <span>Alternatively, you can manually download the latest version from the GitHub releases page</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md mt-4">
                    <p className="text-sm font-medium">Note:</p>
                    <p className="text-sm text-muted-foreground">
                      Updates may include new features, bug fixes, and security improvements. It is recommended to keep your application up to date.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-12"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Modbus Protocol</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <a href="https://modbus.org/docs/Modbus_Application_Protocol_V1_1b.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Modbus Application Protocol Specification</a></li>
                  <li>• <a href="https://modbus.org/docs/Modbus_over_serial_line_V1_02.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Modbus over Serial Line Specification</a></li>
                  <li>• <a href="https://modbus.org/docs/Modbus_Messaging_on_TCP_IP_Application_Protocol_V1_0b.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Modbus Messaging on TCP/IP</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">PyModbus</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <a href="https://pymodbus.readthedocs.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PyModbus Documentation</a></li>
                  <li>• <a href="https://github.com/pymodbus-dev/pymodbus" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PyModbus GitHub Repository</a></li>
                  <li>• <a href="https://pypi.org/project/pymodbus/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PyModbus on PyPI</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
