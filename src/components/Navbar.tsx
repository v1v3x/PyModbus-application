import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Github, Server, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { FirebaseStatus } from "@/components/FirebaseStatus";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Connections', path: '/connections' },
    { name: 'Data Logging', path: '/data-logging' },
    { 
      name: 'Resources', 
      path: '#',
      dropdown: [
        { name: 'Documentation', path: '/documentation' },
        { name: 'Examples', path: '/examples' },
        { name: 'Acknowledgements', path: '/acknowledgements' },
        { name: 'Firebase Config', path: '/firebase-config' }
      ]
    }
  ];

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">Py</span>
          </div>
          <span className="font-semibold text-xl hidden sm:block">PyModbus</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.dropdown ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {link.dropdown.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link 
                        to={item.path}
                        className={cn(
                          "w-full",
                          location.pathname === item.path ? "text-primary font-medium" : ""
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="flex items-center gap-2">
            <FirebaseStatus />
            <ThemeToggle />
          </div>
        </nav>
        
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
                  link.dropdown ? (
                    <div key={link.name} className="space-y-2">
                      <div className="font-medium">{link.name}</div>
                      <div className="pl-4 space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              "block py-1 transition-colors hover:text-primary",
                              location.pathname === item.path
                                ? "text-primary font-medium"
                                : "text-foreground/80"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "block py-2 transition-colors hover:text-primary",
                        location.pathname === link.path
                          ? "text-primary font-medium"
                          : "text-foreground/80"
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="flex items-center gap-4 mt-4">
                  <FirebaseStatus />
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
