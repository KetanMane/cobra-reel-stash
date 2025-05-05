import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { ReelCard, ReelEditDialog } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotesDialog } from "@/components/NotesDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SavedReel } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useViewType } from "@/hooks/useViewType";
import { ReelViewDialog } from "@/components/ReelViewDialog";

export default function FavoritesPage() {
  const { reels, toggleFavorite, deleteReel, updateReel } = useReels();
  const { isExpanded } = useSidebar();
  const { viewType } = useViewType();
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  
  // Multi-select mode state
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReels, setSelectedReels] = useState<string[]>([]);
  
  // Edit dialog state
  const [editReel, setEditReel] = useState<SavedReel | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // View reel dialog state
  const [selectedReel, setSelectedReel] = useState<SavedReel | null>(null);
  const [showReelViewDialog, setShowReelViewDialog] = useState(false);
  
  const favoriteReels = reels.filter(reel => reel.favorite);

  // Handle reel selection
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
  
  // Handle favorite selection in bulk
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
  
  // Handle delete selection in bulk
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
  
  // Handle open reel for editing
  const handleOpenReel = (reel: SavedReel) => {
    setEditReel(reel);
    setShowEditDialog(true);
  };
  
  // Handle cancel selection mode
  const handleCancelSelection = () => {
    setSelectedReels([]);
    setIsSelectionMode(false);
  };
  
  // Handle save edited reel
  const handleSaveEditedReel = (id: string, title: string, summary: string) => {
    updateReel(id, { title, summary });
    toast({
      title: "Success",
      description: "Reel updated successfully",
    });
  };
  
  // Get grid class based on view type for responsive displays
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
        {/* Header section with consistent layout */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Favorites</h1>
          </div>
          
          {isSelectionMode ? (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleFavoriteSelected}
                title="Remove from favorites"
              >
                <Star size={16} className="text-yellow-500" />
                <span className="sr-only">Remove from favorites</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDeleteSelected}
                title="Delete selected"
              >
                <Trash2 size={16} className="text-red-500" />
                <span className="sr-only">Delete selected</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCancelSelection}
                title="Cancel selection"
              >
                <span className="text-xs">Cancel</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNotesDialog(true)}
                title="Create Note"
              >
                <Pencil size={16} />
                <span className="sr-only">Create Note</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" title="More options">
                    <MoreVertical size={16} />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
        
        <div className="space-y-2">
          {favoriteReels.length === 0 ? (
            <EmptyState type="all" category="All" />
          ) : (
            <div className={getGridClass()}>
              {favoriteReels.map((reel) => (
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
      
      {/* Notes Dialog */}
      <NotesDialog open={showNotesDialog} onOpenChange={setShowNotesDialog} />
      
      {/* Edit Reel Dialog */}
      <ReelEditDialog 
        reel={editReel} 
        isOpen={showEditDialog} 
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveEditedReel}
      />
      
      {/* View Reel Dialog */}
      <ReelViewDialog
        reel={selectedReel}
        isOpen={showReelViewDialog}
        onClose={() => setShowReelViewDialog(false)}
      />
    </div>
  );
}
