import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FirebaseConfig } from "@/pages/FirebaseConfig";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { Connections } from "@/pages/Connections";
import { NotFound } from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { FirebaseProvider } from "@/contexts/FirebaseContext";
import { DataLogging } from "@/pages/DataLogging";
import { Documentation } from "@/pages/Documentation";
import { Acknowledgements } from "@/pages/Acknowledgements";
import { FirebaseSuccess } from "@/pages/FirebaseSuccess";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <FirebaseProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1 container mx-auto px-4 py-8 mt-20">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/connections" element={<Connections />} />
                      <Route path="/data-logging" element={<DataLogging />} />
                      <Route path="/documentation" element={<Documentation />} />
                      <Route path="/acknowledgements" element={<Acknowledgements />} />
                      <Route path="/firebase-config" element={<FirebaseConfig />} />
                      <Route path="/firebase-success" element={<FirebaseSuccess />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </AuthProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

export default App;
