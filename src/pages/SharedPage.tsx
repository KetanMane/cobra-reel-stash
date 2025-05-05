
import { useSidebar } from "@/hooks/useSidebar";
import { useReels } from "@/hooks/useReels";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { useViewType } from "@/hooks/useViewType";
import { ReelCard, ReelViewDialog } from "@/components/ReelCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SaveReelForm } from "@/components/SaveReelForm";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { SavedReel } from "@/lib/types";

export default function SharedPage() {
  const { isExpanded } = useSidebar();
  const { filteredReels, activeCategory } = useReels();
  const [sortBy, setSortBy] = useState("newest");
  const { viewType } = useViewType();
  const isMobile = useIsMobile();
  const [showSaveReelDialog, setShowSaveReelDialog] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState<SavedReel | null>(null);
  const [showReelViewDialog, setShowReelViewDialog] = useState(false);

  // Filter reels to show only shared ones (mock functionality)
  const sharedReels = filteredReels.slice(0, 2); // Mock: just show first 2 reels as "shared"
  
  // Get grid class based on view type
  const getGridClass = () => {
    return viewType === 'list' 
      ? "flex flex-col gap-2 animate-fade-in"
      : "grid grid-cols-2 gap-2 animate-fade-in";
  };

  // Handle view reel
  const handleViewReel = (reel: SavedReel) => {
    setSelectedReel(reel);
    setShowReelViewDialog(true);
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
              
              <Button 
                variant="outline" 
                className="mt-4 transition-all hover:scale-105"
                onClick={() => isMobile ? setIsMobileDrawerOpen(true) : setShowSaveReelDialog(true)}
              >
                Add Your First Reel
              </Button>
            </div>
          ) : (
            <div className={getGridClass()}>
              {sharedReels.map((reel) => (
                <ReelCard 
                  key={reel.id} 
                  reel={reel}
                  isSelectionMode={false}
                  onSelect={() => {}}
                  onOpenReel={handleViewReel}
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
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:scale-105 animate-fade-in"
            >
              <Plus size={18} />
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
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:scale-105 animate-fade-in"
          onClick={() => setShowSaveReelDialog(true)}
        >
          <Plus size={24} />
          <span className="sr-only">Add Reel</span>
        </Button>
      )}
      
      {/* Save Reel Dialog for desktop */}
      <Dialog open={showSaveReelDialog} onOpenChange={setShowSaveReelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save New Reel</DialogTitle>
          </DialogHeader>
          <SaveReelForm onSuccess={() => setShowSaveReelDialog(false)} />
        </DialogContent>
      </Dialog>
      
      {/* View Reel Dialog */}
      <ReelViewDialog
        reel={selectedReel}
        isOpen={showReelViewDialog}
        onClose={() => setShowReelViewDialog(false)}
      />
    </div>
  );
}
