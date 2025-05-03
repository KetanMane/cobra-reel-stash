
import { useEffect } from "react";
import { useReels } from "@/hooks/useReels";
import { SidebarProvider } from "@/hooks/useSidebar";
import { ReelsProvider } from "@/hooks/useReels";
import { Sidebar } from "@/components/Sidebar";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { useSidebar } from "@/hooks/useSidebar";

export default function FavoritesPage() {
  const { reels, toggleFavorite } = useReels();
  const { isExpanded } = useSidebar();
  
  const favoriteReels = reels.filter(reel => reel.favorite);
  
  return (
    <SidebarProvider>
      <ReelsProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-16">
            <div className={`flex-1 container py-6 space-y-6 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
                  <h1 className="text-2xl font-bold">Favorites</h1>
                </div>
              </div>
              
              <div className="space-y-4">
                {favoriteReels.length === 0 ? (
                  <EmptyState type="category" category="Favorites" />
                ) : (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {favoriteReels.map((reel) => (
                      <ReelCard key={reel.id} reel={reel} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ReelsProvider>
    </SidebarProvider>
  );
}
