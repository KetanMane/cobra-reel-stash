
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import WelcomePage from "./WelcomePage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import FavoritesPage from "./FavoritesPage";
import SharedPage from "./SharedPage";
import TrashPage from "./TrashPage";
import { SidebarProvider } from "@/hooks/useSidebar";
import { ReelsProvider } from "@/hooks/useReels";
import { useLocation } from "react-router-dom";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
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
    } else {
      return <HomePage />;
    }
  };

  return isAuthenticated ? (
    <SidebarProvider>
      <ReelsProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-16">
            {renderAuthenticatedPage()}
          </div>
        </div>
      </ReelsProvider>
    </SidebarProvider>
  ) : (
    <WelcomePage />
  );
}
