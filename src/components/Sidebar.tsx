
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight, ChevronLeft, Star, Share, Trash2, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();
  const { user } = useAuth();
  
  const menuItems = [
    { id: 'profile', name: 'Profile', icon: <Avatar className="w-6 h-6">
      {user?.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : 
      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>}
    </Avatar> },
    { id: 'favorites', name: 'Favorites', icon: <Star size={20} /> },
    { id: 'shared', name: 'Shared', icon: <Share size={20} /> },
    { id: 'trash', name: 'Trash', icon: <Trash2 size={20} /> },
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

          {/* Logo and user section */}
          <div className="flex flex-col items-center mb-8 p-4">
            <div className="w-12 h-12 mb-2">
              <img src="/lovable-uploads/d9d4f479-2706-49ad-9845-6eddeea96620.png" alt="CobraSave" className="w-full h-full" />
            </div>
            {isExpanded && (
              <div className="text-center text-sidebar-foreground">
                <p className="font-medium">CobraSave</p>
                {user && <p className="text-xs opacity-70">{user.name}</p>}
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

          {/* Bottom section */}
          <div className="p-4">
            <button
              className={cn(
                "flex items-center w-full p-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              )}
            >
              <Settings size={20} />
              {isExpanded && <span className="ml-3 text-sm">Settings</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
