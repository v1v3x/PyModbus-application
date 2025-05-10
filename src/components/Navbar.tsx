import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, Github, ChevronDown, CheckCircle2, XCircle, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavLink = {
  name: string;
  path: string;
};

const Navbar = () => {
  const [_, setIsOpen] = useState(false); // Used only in onClick handler
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();

  // Check if Firebase is connected
  useEffect(() => {
    // This would typically check your Firebase connection status
    const checkFirebaseConnection = () => {
      // Mock connection status - replace with actual Firebase connection check
      const connected = localStorage.getItem('firebaseConnected') === 'true';
      setIsConnected(connected);
    };

    checkFirebaseConnection();
    // Set up interval to periodically check connection
    const interval = setInterval(checkFirebaseConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Connected Devices', path: '/connections' },
    { name: 'Data Logs', path: '/data-logging' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'Acknowledgements', path: '/acknowledgements' },
  ];

  const handleDisconnect = () => {
    // Handle Firebase disconnection
    localStorage.setItem('firebaseConnected', 'false');
    setIsConnected(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group transition-all duration-300 hover:scale-105">
          <div className="relative">
            <Database className="h-8 w-8 text-primary animate-pulse" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">ModSyncX</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              <span className="relative z-10">{link.name}</span>
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-primary/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                location.pathname === link.path ? "scale-x-100" : ""
              )}></span>
              {location.pathname === link.path && (
                <span className="absolute inset-0 bg-primary/10 rounded-md -z-10"></span>
              )}
            </Link>
          ))}
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300",
                    isConnected ? "bg-green-500/10 hover:bg-green-500/20" : "bg-red-500/10 hover:bg-red-500/20"
                  )}
                >
                  {isConnected ? (
                    <>
                      <div className="relative">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm animate-pulse"></span>
                      </div>
                      <span className="font-medium">Firebase Connected</span>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm"></span>
                      </div>
                      <span className="font-medium">Firebase Disconnected</span>
                    </>
                  )}
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/firebase-config" className="cursor-pointer">
                    Configure Firebase
                  </Link>
                </DropdownMenuItem>
                {isConnected && (
                  <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer">
                    Disconnect
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a
              href="https://github.com/yourusername/modbus-connector-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "block py-2 transition-colors hover:text-primary",
                      location.pathname === link.path
                        ? "text-primary font-medium"
                        : "text-foreground/80"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center gap-4 mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        {isConnected ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>Firebase Connected</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span>Firebase Disconnected</span>
                          </>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/firebase-config" className="cursor-pointer">
                          Configure Firebase
                        </Link>
                      </DropdownMenuItem>
                      {isConnected && (
                        <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer">
                          Disconnect
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;