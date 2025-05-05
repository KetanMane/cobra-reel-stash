import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewType } from "@/hooks/useViewType";
import { SavedReel } from "@/lib/types";
import { useState } from "react";

interface TrashedReel extends SavedReel {
  deletedAt: string;
  expiresAt: string;
}

export default function TrashPage() {
  const { isExpanded } = useSidebar();
  const { trashedReels, restoreFromTrash, permanentlyDeleteReel, emptyTrash } = useReels();
  const [sortBy, setSortBy] = useState("newest");
  const { viewType } = useViewType();
  
  // Sort reels
  const sortedReels = [...trashedReels].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime();
    } else {
      return new Date(a.deletedAt).getTime() - new Date(b.deletedAt).getTime();
    }
  });
  
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
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-3 px-2 space-y-2 transition-all duration-300 overflow-auto ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Trash</h1>
          </div>
          
          <Button 
            variant="destructive"
            size="sm"
            disabled={trashedReels.length === 0}
            onClick={() => {
              if (window.confirm("Are you sure? This will permanently delete all items in trash.")) {
                emptyTrash();
              }
            }}
          >
            Empty Trash
          </Button>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
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
        
        <div className="space-y-2">
          {trashedReels.length === 0 ? (
            <EmptyState type="all" category="Trash" />
          ) : (
            // Grid layout
            <div className={getGridClass()}>
              {sortedReels.map((reel) => (
                <div key={reel.id} className="relative">
                  <ReelCard reel={reel} isSelectionMode={false} onSelect={() => {}} onOpenReel={() => {}} viewType={viewType} />
                  <div className="absolute top-1 left-1 flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => restoreFromTrash(reel.id)}>
                      <span className="sr-only">Restore</span>
                      <span>Restore</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => {
                      if (window.confirm("Are you sure you want to permanently delete this reel?")) {
                        permanentlyDeleteReel(reel.id);
                      }
                    }}>
                      <span className="sr-only">Delete Permanently</span>
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
