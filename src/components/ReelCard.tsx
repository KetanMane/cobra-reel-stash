
import { SavedReel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReels } from "@/hooks/useReels";
import { useState, useEffect } from "react";
import { Check, ExternalLink, Star, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ViewType } from "@/hooks/useViewType";

// Function to format dates in a more readable manner (e.g., "12 Apr 23")
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${month} ${year}`;
  } catch (e) {
    return dateString;
  }
};

interface ReelCardProps {
  reel: SavedReel;
  isSelectionMode: boolean;
  onSelect: (id: string) => void;
  onOpenReel: (reel: SavedReel) => void;
  viewType: ViewType;
}

export function ReelCard({ reel, isSelectionMode, onSelect, onOpenReel, viewType }: ReelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const { toggleFavorite } = useReels();
  
  // Handle long press
  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      onSelect(reel.id);
    }, 500); // 500ms for long press
    setLongPressTimer(timer);
  };
  
  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (longPressTimer) clearTimeout(longPressTimer);
    };
  }, [longPressTimer]);

  // Handle regular tap/click
  const handleClick = () => {
    if (isSelectionMode) {
      onSelect(reel.id);
    } else {
      onOpenReel(reel);
    }
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(reel.id);
    
    // Show toast animation
    if (!reel.favorite) {
      toast({
        title: "Added to favorites",
        description: "Reel has been added to your favorites",
      });
    }
  };

  // List view
  if (viewType === 'list') {
    return (
      <Card 
        className={cn(
          "card-transition relative overflow-hidden border animate-fade-in",
          reel.selected ? "border-primary border-2" : "",
          "hover:border-primary/50 hover:scale-[1.02]"
        )}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {reel.favorite && (
          <div className="favorite-star" onClick={handleToggleFavorite}>
            <Star size={16} fill="#FFD700" stroke="#FFD700" className="drop-shadow-md" />
          </div>
        )}
        
        {!reel.favorite && (
          <div 
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10" 
            onClick={handleToggleFavorite}
          >
            <Star size={16} className="text-muted-foreground hover:text-yellow-500 transition-colors" />
          </div>
        )}
        
        {reel.selected && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-10 animate-scale-in">
            <Check size={14} className="text-white" />
          </div>
        )}
        
        <div className="p-3">
          <h3 className="text-sm font-medium mb-1 line-clamp-1">{reel.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{reel.summary}</p>
          
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              reel.category === "Recipes" && "bg-green-900/50 text-green-300",
              reel.category === "Movies" && "bg-blue-900/50 text-blue-300",
              reel.category === "Tools" && "bg-orange-900/50 text-orange-300",
              reel.category === "Anime" && "bg-purple-900/50 text-purple-300",
              reel.category === "Uncategorized" && "bg-gray-900/50 text-gray-300"
            )}>
              {reel.category}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(reel.timestamp)}</span>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (2 per row)
  return (
    <Card 
      className={cn(
        "card-transition relative overflow-hidden border h-full animate-fade-in group",
        reel.selected ? "border-primary border-2" : "",
        "hover:border-primary/50 hover:scale-[1.02]"
      )}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {reel.favorite && (
        <div className="favorite-star" onClick={handleToggleFavorite}>
          <Star size={16} fill="#FFD700" stroke="#FFD700" className="drop-shadow-md" />
        </div>
      )}
      
      {!reel.favorite && (
        <div 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10" 
          onClick={handleToggleFavorite}
        >
          <Star size={14} className="text-muted-foreground hover:text-yellow-500 transition-colors" />
        </div>
      )}
      
      {reel.selected && (
        <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-10 animate-scale-in">
          <Check size={14} className="text-white" />
        </div>
      )}
      
      <CardHeader className="pb-1 pt-2 px-3">
        <CardTitle className="text-sm font-medium line-clamp-1">{reel.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 pb-0">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {reel.summary}
        </p>
      </CardContent>
      <CardFooter className="p-0 px-3 pb-2 mt-1 flex justify-between">
        <span className={cn(
          "text-xs px-1.5 py-0.5 rounded-full",
          reel.category === "Recipes" && "bg-green-900/50 text-green-300",
          reel.category === "Movies" && "bg-blue-900/50 text-blue-300",
          reel.category === "Tools" && "bg-orange-900/50 text-orange-300",
          reel.category === "Anime" && "bg-purple-900/50 text-purple-300",
          reel.category === "Uncategorized" && "bg-gray-900/50 text-gray-300"
        )}>
          {reel.category}
        </span>
        <span className="text-xs text-muted-foreground">{formatDate(reel.timestamp)}</span>
      </CardFooter>
    </Card>
  );
}

// Component for the edit dialog when a reel is tapped
export function ReelEditDialog({ 
  reel, 
  isOpen, 
  onClose,
  onSave 
}: { 
  reel: SavedReel | null; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (id: string, title: string, summary: string) => void;
}) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSummary, setEditedSummary] = useState("");
  
  // Set initial values when dialog opens
  useEffect(() => {
    if (reel) {
      setEditedTitle(reel.title);
      setEditedSummary(reel.summary);
    }
  }, [reel]);
  
  const handleSave = () => {
    if (reel) {
      onSave(reel.id, editedTitle, editedSummary);
      onClose();
    }
  };
  
  const handleOpenSource = () => {
    if (reel?.sourceUrl) {
      window.open(reel.sourceUrl, '_blank');
    } else {
      toast({
        title: "Source not available",
        description: "The source URL for this reel is not available.",
        variant: "destructive"
      });
    }
  };
  
  if (!reel) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Edit Reel</DialogTitle>
          <Button variant="outline" size="sm" onClick={handleOpenSource} className="flex gap-1 transition-all hover:scale-105">
            <ExternalLink size={14} />
            <span>Open Source</span>
          </Button>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Reel Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Reel Summary"
              className="min-h-[200px]"
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="transition-all hover:scale-105">
            Cancel
          </Button>
          <Button onClick={handleSave} className="transition-all hover:scale-105">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
