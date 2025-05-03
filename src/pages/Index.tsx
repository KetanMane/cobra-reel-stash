
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import WelcomePage from "./WelcomePage";
import HomePage from "./HomePage";
import { SidebarProvider } from "@/hooks/useSidebar";
import { ReelsProvider } from "@/hooks/useReels";
import { AuthProvider } from "@/hooks/useAuth";

export default function Index() {
  return (
    <AuthProvider>
      <AuthCheck />
    </AuthProvider>
  );
}

function AuthCheck() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <SidebarProvider>
      <ReelsProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-16">
            <HomePage />
          </div>
        </div>
      </ReelsProvider>
    </SidebarProvider>
  ) : (
    <WelcomePage />
  );
}
