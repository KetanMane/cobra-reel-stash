
import { useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SaveReelForm } from "@/components/SaveReelForm";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";

export default function HomePage() {
  const { filteredReels, activeCategory } = useReels();
  const { isExpanded } = useSidebar();
  
  const isEmpty = useMemo(() => {
    return filteredReels.length === 0;
  }, [filteredReels]);

  return (
    <div className="min-h-screen flex-1">
      <div className={`flex-1 container py-6 space-y-6 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">CobraSave</h1>
          </div>
          <SaveReelForm />
        </div>
        
        <div className="space-y-4">
          <SearchBar />
          <CategoryFilter />
          
          {isEmpty ? (
            <EmptyState 
              type={activeCategory !== 'All' ? 'category' : 'all'} 
              category={activeCategory} 
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredReels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
