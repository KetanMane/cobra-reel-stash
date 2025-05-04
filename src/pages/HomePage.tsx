
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { ReelCard, ReelEditDialog } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { Grid2x2, LayoutList, LayoutGrid, MoreVertical, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotesDialog } from "@/components/NotesDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SaveReelForm } from "@/components/SaveReelForm";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { SearchBar } from "@/components/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SavedReel } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useViewType } from "@/hooks/useViewType";

export default function HomePage() {
  const { reels, filteredReels, activeCategory, toggleFavorite, deleteReel, updateReel } = useReels();
  const { isExpanded } = useSidebar();
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [showSaveReelDialog, setShowSaveReelDialog] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const { viewType, setViewType } = useViewType();
  
  // Multi-select mode state
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReels, setSelectedReels] = useState<string[]>([]);
  
  // Edit dialog state
  const [editReel, setEditReel] = useState<SavedReel | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // Sort reels
  const sortedReels = [...filteredReels].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });
  
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
  
  // Get grid class based on view type
  const getGridClass = () => {
    switch(viewType) {
      case 'largeGrid':
        return "grid grid-cols-2 gap-3"; // Changed to 2 cards per row
      case 'list':
        return "flex flex-col gap-3";
      case 'smallGrid':
      default:
        return "grid grid-cols-3 gap-2"; // 3 cards per row
    }
  };
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-4 px-3 space-y-3 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section with consistent layout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Home</h1>
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
                onClick={() => setShowNotesDialog(true)}
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
                    <DropdownMenuItem onClick={() => setViewType('smallGrid')}>
                      <Grid2x2 className="mr-2 h-4 w-4" />
                      <span>Small Grid (3 per row)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewType('largeGrid')}>
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>Large Grid (2 per row)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewType('list')}>
                      <LayoutList className="mr-2 h-4 w-4" />
                      <span>List (1 per row)</span>
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
        
        {/* Search bar with white background */}
        <div className="w-full">
          <SearchBar />
        </div>
        
        {/* Sorting - smaller and darker */}
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
        
        {/* Category filtering - horizontal scroll */}
        <CategoryFilter />
        
        <div className="space-y-2">
          {filteredReels.length === 0 ? (
            <EmptyState type="all" category={activeCategory} />
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
      
      {/* Floating action button to add new reel */}
      {isMobile ? (
        <Drawer open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
            >
              <Plus size={20} />
              <span className="sr-only">Add Reel</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 pb-6 pt-4">
            <DialogHeader>
              <DialogTitle>Save New Reel</DialogTitle>
            </DialogHeader>
            <SaveReelForm onSuccess={() => setIsMobileDrawerOpen(false)} />
            <div className="mt-6 flex justify-end">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          onClick={() => setShowSaveReelDialog(true)}
        >
          <Plus size={24} />
          <span className="sr-only">Add Reel</span>
        </Button>
      )}
      
      {/* Dialogs */}
      <NotesDialog open={showNotesDialog} onOpenChange={setShowNotesDialog} />
      
      {/* Save Reel Dialog for desktop */}
      <Dialog open={showSaveReelDialog} onOpenChange={setShowSaveReelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save New Reel</DialogTitle>
          </DialogHeader>
          <SaveReelForm onSuccess={() => setShowSaveReelDialog(false)} />
        </DialogContent>
      </Dialog>
      
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
