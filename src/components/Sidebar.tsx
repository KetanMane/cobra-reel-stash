
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useReels } from "@/hooks/useReels";
import { ChevronRight, ChevronLeft, Home, Settings, Film, Utensils, Wrench } from "lucide-react";
import { Category } from "@/lib/types";

export function Sidebar() {
  const { isExpanded, toggleSidebar, collapseSidebar } = useSidebar();
  const { user } = useAuth();
  const { filterByCategory, activeCategory } = useReels();

  const categories: { id: Category | 'All'; name: string; icon: React.ReactNode }[] = [
    { id: 'All', name: 'All', icon: <Home size={20} /> },
    { id: 'Recipes', name: 'Recipes', icon: <Utensils size={20} /> },
    { id: 'Movies', name: 'Movies', icon: <Film size={20} /> },
    { id: 'Tools', name: 'Tools', icon: <Wrench size={20} /> },
  ];

  return (
    <>
      {/* Overlay when sidebar is expanded on mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={collapseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 h-screen bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border",
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
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mb-2">
              CS
            </div>
            {isExpanded && (
              <div className="text-center text-sidebar-foreground">
                <p className="font-medium">CobraSave</p>
                {user && <p className="text-xs opacity-70">{user.name}</p>}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2">
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => filterByCategory(category.id)}
                    className={cn(
                      "flex items-center w-full p-3 rounded-md transition-colors",
                      activeCategory === category.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <span className="flex-shrink-0">{category.icon}</span>
                    {isExpanded && (
                      <span className="ml-3 text-sm">{category.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

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
