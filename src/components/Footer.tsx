import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background/50 py-12">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">MS</span>
              </div>
              <span className="font-semibold text-xl">ModSync</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A full-featured Modbus protocol stack implementation for Python.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/v1v3x/ModSyncX" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ModSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
