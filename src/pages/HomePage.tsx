
import { useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SaveReelForm } from "@/components/SaveReelForm";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { filteredReels, activeCategory } = useReels();
  const { isExpanded } = useSidebar();
  
  const isEmpty = useMemo(() => {
    return filteredReels.length === 0;
  }, [filteredReels]);

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-all duration-300 ease-in-out",
      isExpanded ? "ml-64" : "ml-16"
    )}>
      <div className="flex-1 container py-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">CobraSave</h1>
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
