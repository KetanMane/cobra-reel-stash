import { useSidebar } from "@/hooks/useSidebar";
import { useReels } from "@/hooks/useReels";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { useViewType } from "@/hooks/useViewType";
import { EmptyState } from "@/components/EmptyState";

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
      case 'largeGrid':
        return "grid grid-cols-1 md:grid-cols-2 gap-2"; 
      case 'list':
        return "flex flex-col gap-2"; 
      case 'smallGrid':
      default:
        return "grid grid-cols-2 md:grid-cols-3 gap-1"; 
    }
  };
  
  // Function to render empty state
  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">No shared reels</h3>
          <p className="text-sm text-muted-foreground">
            Reels shared with you will appear here
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-3 px-2 space-y-2 transition-all duration-300 overflow-auto ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Shared</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
        
        {/* Search bar */}
        <div className="w-full">
          <SearchBar />
        </div>
        
        {/* Sorting */}
        <div className="w-24 max-w-[120px]">
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
        
        {/* Category filtering - more compact */}
        <div className="w-full">
          <EmptyState type="all" category={activeCategory} />
        </div>
      </div>
    </div>
  );
}
