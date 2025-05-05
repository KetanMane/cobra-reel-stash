
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { useViewType } from "@/hooks/useViewType";
import { Category, SavedReel } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

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
      case 'list':
        return "flex flex-col gap-2 animate-fade-in"; 
      case 'grid':
      default:
        return "grid grid-cols-2 gap-2 animate-fade-in"; 
    }
  };
  
  // Empty trash confirmation handler
  const handleEmptyTrash = () => {
    if (window.confirm("Are you sure? This will permanently delete all items in trash.")) {
      emptyTrash();
    }
  };
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container px-2 py-3 space-y-2 transition-all duration-300 content-container ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Trash</h1>
          </div>
          
          <Button 
            variant="destructive"
            size="sm"
            disabled={trashedReels.length === 0}
            onClick={handleEmptyTrash}
            className="animate-fade-in transition-all hover:scale-105"
          >
            Empty Trash
          </Button>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
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
        
        <div className="space-y-2">
          {trashedReels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <Trash2 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-center">Trash is Empty</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Items you delete will appear here for 30 days before being permanently removed.
              </p>
            </div>
          ) : (
            <div className={getGridClass()}>
              {sortedReels.map((reel) => (
                <div key={reel.id} className="relative animate-scale-in">
                  <ReelCard reel={reel} isSelectionMode={false} onSelect={() => {}} onOpenReel={() => {}} viewType={viewType} />
                  <div className="absolute top-1 left-1 flex space-x-1">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => {
                        restoreFromTrash(reel.id);
                        toast({
                          title: "Success",
                          description: "Reel restored successfully"
                        });
                      }} 
                      className="transition-all hover:scale-105 flex items-center gap-1"
                    >
                      <RotateCcw size={14} />
                      <span className="sr-only">Restore</span>
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to permanently delete this reel?")) {
                          permanentlyDeleteReel(reel.id);
                        }
                      }} 
                      className="transition-all hover:scale-105"
                    >
                      <Trash2 size={14} />
                      <span className="sr-only">Delete Permanently</span>
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
