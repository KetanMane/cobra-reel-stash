
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight, ChevronLeft, Home, Star, Share2, Trash2, Settings, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { User } from "@supabase/supabase-js";

export function Sidebar() {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { id: 'home', name: 'Home', icon: <Home size={20} />, path: '/' },
    { id: 'favorites', name: 'Favorites', icon: <Star size={20} />, path: '/favorites' },
    { id: 'shared', name: 'Shared', icon: <Share2 size={20} />, path: '/shared' },
    { id: 'trash', name: 'Trash', icon: <Trash2 size={20} />, path: '/trash' },
  ];

  const isActive = (path: string) => currentPath === path;
  
  // Handle fallback for user avatar display
  const getUserName = () => {
    if (!user) return 'U';
    
    // Handle both Supabase User and mock user
    if ('name' in user && user.name) {
      return user.name.charAt(0);
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  // Handle user display name
  const getDisplayName = () => {
    if (!user) return 'User';
    
    // Handle both Supabase User and mock user
    if ('name' in user && user.name) {
      return user.name;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };
  
  // Get user avatar URL if available
  const getAvatarUrl = () => {
    if (!user) return '';
    
    if ('avatar' in user && user.avatar) {
      return user.avatar;
    }
    return '';
  };

  return (
    <>
      {/* Overlay when sidebar is expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 z-30 cursor-pointer transition-opacity duration-300"
          onClick={collapseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border flex flex-col",
          isExpanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-sidebar-foreground hover:text-sidebar-primary self-end transition-transform duration-300 hover:scale-110"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* User profile section */}
          <div className="flex flex-col items-center mb-2 p-4">
            <Avatar className="w-12 h-12 mb-2 transition-transform duration-300 hover:scale-110">
              {getAvatarUrl() ? <AvatarImage src={getAvatarUrl()} alt={getDisplayName()} /> : 
              <AvatarFallback>{getUserName()}</AvatarFallback>}
            </Avatar>
            {isExpanded && (
              <div className="text-center text-sidebar-foreground">
                <p className="font-medium">{getDisplayName()}</p>
                {user && 'email' in user && <p className="text-xs opacity-70">{user.email}</p>}
              </div>
            )}
          </div>

          {/* Separator below user profile */}
          <div className="flex justify-center mb-4">
            <Separator className="w-[80%] bg-sidebar-border" />
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 overflow-hidden">
            <nav className="px-2 pb-2">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => navigate(item.path)}
                        className={cn(
                          "flex items-center w-full p-3 rounded-md transition-all duration-300",
                          "text-sidebar-foreground",
                          active 
                            ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary" 
                            : "hover:bg-sidebar-accent/50 hover:scale-[1.02]"
                        )}
                      >
                        {/* Fixed width for icon container to maintain alignment */}
                        <div className="w-6 flex justify-center">
                          {item.icon}
                        </div>
                        
                        {isExpanded && (
                          <span className="ml-3 text-sm">
                            {item.name}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </ScrollArea>
          
          {/* Settings and Donate at the bottom - Fixed position */}
          <div className="p-2 border-t border-sidebar-border">
            {/* Donate button */}
            <button
              onClick={() => navigate('/donate')}
              className={cn(
                "flex items-center w-full p-3 rounded-md transition-all duration-300 mb-1",
                "text-sidebar-foreground",
                isActive('/donate')
                  ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                  : "hover:bg-sidebar-accent/50 hover:scale-[1.02]"
              )}
            >
              <div className="w-6 flex justify-center">
                <Heart size={20} className="text-red-500" />
              </div>
              
              {isExpanded && (
                <span className="ml-3 text-sm">
                  Donate
                </span>
              )}
            </button>
            
            {/* Settings button */}
            <button
              onClick={() => navigate('/settings')}
              className={cn(
                "flex items-center w-full p-3 rounded-md transition-all duration-300",
                "text-sidebar-foreground",
                isActive('/settings')
                  ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                  : "hover:bg-sidebar-accent/50 hover:scale-[1.02]"
              )}
            >
              <div className="w-6 flex justify-center">
                <Settings size={20} />
              </div>
              
              {isExpanded && (
                <span className="ml-3 text-sm">
                  Settings
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
