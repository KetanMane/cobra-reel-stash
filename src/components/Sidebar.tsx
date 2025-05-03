
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight, ChevronLeft, Star, Share, Trash2, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'favorites', name: 'Favorites', icon: <Star size={20} />, action: () => {} },
    { id: 'shared', name: 'Shared', icon: <Share size={20} />, action: () => {} },
    { id: 'trash', name: 'Trash', icon: <Trash2 size={20} />, action: () => {} },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} />, action: () => navigate('/settings') },
  ];

  return (
    <>
      {/* Overlay when sidebar is expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 z-30 cursor-pointer"
          onClick={collapseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border",
          isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-sidebar-foreground hover:text-sidebar-primary self-end"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* User profile section */}
          <div className="flex flex-col items-center mb-8 p-4">
            <Avatar className="w-12 h-12 mb-2">
              {user?.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : 
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>}
            </Avatar>
            {isExpanded && (
              <div className="text-center text-sidebar-foreground">
                <p className="font-medium">{user?.name || 'User'}</p>
                {user && <p className="text-xs opacity-70">{user.email}</p>}
              </div>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 overflow-hidden">
            <nav className="px-2 pb-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={item.action}
                      className={cn(
                        "flex items-center w-full p-3 rounded-md transition-colors",
                        "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {isExpanded && (
                        <span className="ml-3 text-sm">{item.name}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
