import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { ReelCard, ReelEditDialog } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Pencil, Star, Trash2, Grid2x2, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { SavedReel } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useViewType, ViewType } from "@/hooks/useViewType";

export default function SharedPage() {
  const { reels, filteredReels, activeCategory, toggleFavorite, deleteReel, updateReel } = useReels();
  const { isExpanded } = useSidebar();
  const [sortBy, setSortBy] = useState("newest");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReels, setSelectedReels] = useState<string[]>([]);
  const [editReel, setEditReel] = useState<SavedReel | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { viewType } = useViewType();
  
  const sortedReels = [...filteredReels].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });
  
  const handleSelectReel = (id: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      setSelectedReels([id]);
    } else {
      setSelectedReels(prev => {
        if (prev.includes(id)) {
          const newSelection = prev.filter(reelId => reelId !== id);
          if (newSelection.length === 0) {
            setIsSelectionMode(false);
          }
          return newSelection;
        } else {
          return [...prev, id];
        }
      });
    }
  };
  
  const handleFavoriteSelected = () => {
    selectedReels.forEach(id => {
      toggleFavorite(id);
    });
    toast({
      title: "Success",
      description: `${selectedReels.length} reel(s) updated`,
    });
    setSelectedReels([]);
    setIsSelectionMode(false);
  };
  
  const handleDeleteSelected = () => {
    selectedReels.forEach(id => {
      deleteReel(id);
    });
    toast({
      title: "Success",
      description: `${selectedReels.length} reel(s) moved to trash`,
    });
    setSelectedReels([]);
    setIsSelectionMode(false);
  };
  
  const handleOpenReel = (reel: SavedReel) => {
    setEditReel(reel);
    setShowEditDialog(true);
  };
  
  const handleCancelSelection = () => {
    setSelectedReels([]);
    setIsSelectionMode(false);
  };
  
  const handleSaveEditedReel = (id: string, title: string, summary: string) => {
    updateReel(id, { title, summary });
    toast({
      title: "Success",
      description: "Reel updated successfully",
    });
  };
  
  // Get grid class based on view type
  const getGridClass = () => {
    switch(viewType) {
      case 'largeGrid':
        return "grid grid-cols-1 gap-3";
      case 'list':
        return "flex flex-col gap-3";
      case 'smallGrid':
      default:
        return "grid grid-cols-3 gap-2";
    }
  };
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-4 px-3 space-y-4 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Shared Reels</h1>
          </div>
          
          {isSelectionMode ? (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleFavoriteSelected}
                title="Add to favorites"
              >
                <Star size={18} className="text-yellow-500" />
                <span className="sr-only">Add to favorites</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDeleteSelected}
                title="Delete selected"
              >
                <Trash2 size={18} className="text-red-500" />
                <span className="sr-only">Delete selected</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCancelSelection}
                title="Cancel selection"
              >
                <span className="text-sm">Cancel</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {}}
                title="Create Note"
              >
                <Pencil size={18} />
                <span className="sr-only">Create Note</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" title="More options">
                    <MoreVertical size={18} />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>View</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {}}>
                      <Grid2x2 className="mr-2 h-4 w-4" />
                      <span>Small Grid</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>Large Grid</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      <LayoutList className="mr-2 h-4 w-4" />
                      <span>List</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Pin Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Batch Select
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
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
            <SelectTrigger className="w-full text-xs text-foreground font-medium h-8 bg-secondary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Category filtering */}
        <CategoryFilter />
        
        <div className="space-y-4">
          {filteredReels.length === 0 ? (
            <EmptyState type="shared" category={activeCategory} />
          ) : (
            <div className={getGridClass()}>
              {sortedReels.map((reel) => (
                <ReelCard 
                  key={reel.id} 
                  reel={{...reel, selected: selectedReels.includes(reel.id)}}
                  isSelectionMode={isSelectionMode}
                  onSelect={handleSelectReel}
                  onOpenReel={handleOpenReel}
                  viewType={viewType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Reel Dialog */}
      <ReelEditDialog 
        reel={editReel} 
        isOpen={showEditDialog} 
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveEditedReel}
      />
    </div>
  );
}
