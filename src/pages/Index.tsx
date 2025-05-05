
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import FavoritesPage from "./FavoritesPage";
import SharedPage from "./SharedPage";
import TrashPage from "./TrashPage";
import DonatePage from "./DonatePage";
import { SidebarProvider, useSidebar } from "@/hooks/useSidebar";
import { ReelsProvider } from "@/hooks/useReels";
import { ViewTypeProvider } from "@/hooks/useViewType";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Set default theme on component mount
  useEffect(() => {
    // Only apply default theme if one doesn't exist already in localStorage
    if (!localStorage.getItem('cobra-theme')) {
      localStorage.setItem('cobra-theme', 'dark'); // Changed to dark as default
      // Apply theme classes to body
      document.body.classList.add('theme-dark');
    }
  }, []);
  
  // Determine which page to show based on the current route
  const renderAuthenticatedPage = () => {
    const path = location.pathname;
    if (path === "/settings") {
      return <SettingsPage />;
    } else if (path === "/favorites") {
      return <FavoritesPage />;
    } else if (path === "/shared") {
      return <SharedPage />;
    } else if (path === "/trash") {
      return <TrashPage />;
    } else if (path === "/donate") {
      return <DonatePage />;
    } else {
      return <HomePage />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If not authenticated, redirect to the welcome page
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <SidebarProvider>
      <ReelsProvider>
        <ViewTypeProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 ml-16 overflow-auto">
              {renderAuthenticatedPage()}
            </div>
          </div>
        </ViewTypeProvider>
      </ReelsProvider>
    </SidebarProvider>
  );
}
