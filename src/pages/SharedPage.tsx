
import { useSidebar } from "@/hooks/useSidebar";
import { useReels } from "@/hooks/useReels";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { useViewType } from "@/hooks/useViewType";
import { EmptyState } from "@/components/EmptyState";
import { ReelCard } from "@/components/ReelCard";

export default function SharedPage() {
  const { isExpanded } = useSidebar();
  const { filteredReels, activeCategory } = useReels();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { viewType } = useViewType();

  // Filter reels to show only shared ones (mock functionality)
  const sharedReels = filteredReels.slice(0, 2); // Mock: just show first 2 reels as "shared"
  
  // Get grid class based on view type
  const getGridClass = () => {
    switch(viewType) {
      case 'list':
        return "flex flex-col gap-2 animate-fade-in"; 
      case 'grid':
      default:
        return "grid grid-cols-2 gap-2 animate-fade-in"; 
    }
  };

  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container px-2 py-3 space-y-2 transition-all duration-300 content-container ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Shared</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
        
        {/* Search bar */}
        <div className="w-full animate-fade-in">
          <SearchBar />
        </div>
        
        {/* Sorting */}
        <div className="w-24 max-w-[120px] animate-fade-in">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full text-xs text-foreground font-medium h-7 bg-secondary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          {sharedReels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <h3 className="text-lg font-medium text-center">No shared reels</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Reels shared with you will appear here
              </p>
            </div>
          ) : (
            <div className={getGridClass()}>
              {sharedReels.map((reel) => (
                <ReelCard 
                  key={reel.id} 
                  reel={reel}
                  isSelectionMode={false}
                  onSelect={() => {}}
                  onOpenReel={() => {}}
                  viewType={viewType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
