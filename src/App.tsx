
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ViewTypeProvider } from "@/hooks/useViewType";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";

// Set default theme to dark
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('cobra-theme');
  if (!storedTheme) {
    localStorage.setItem('cobra-theme', 'dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.add(`theme-${storedTheme}`);
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ViewTypeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/settings" element={<Index />} />
              <Route path="/favorites" element={<Index />} />
              <Route path="/shared" element={<Index />} />
              <Route path="/trash" element={<Index />} />
              <Route path="/donate" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ViewTypeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
