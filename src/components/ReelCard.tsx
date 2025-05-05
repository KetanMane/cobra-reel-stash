
import { SavedReel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReels } from "@/hooks/useReels";
import { useState, useEffect } from "react";
import { Check, Star } from "lucide-react";
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
      // View the content instead of editing
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
        {/* Selected indicator - moved to top-left */}
        {reel.selected && (
          <div className="absolute top-2 left-2 bg-primary rounded-full p-1 z-10 animate-scale-in">
            <Check size={14} className="text-white" />
          </div>
        )}
        
        {/* Favorite star - positioned at top-right always */}
        <div 
          className={cn(
            "absolute top-2 right-2 z-10 transition-opacity",
            !reel.favorite && "opacity-0 group-hover:opacity-100"
          )}
          onClick={handleToggleFavorite}
        >
          <Star 
            size={16} 
            className={cn(
              "transition-colors",
              reel.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-500"
            )} 
          />
        </div>
        
        <div className={cn("p-3", reel.selected ? "pt-8" : "pt-6")}>
          <h3 className="text-sm font-medium mb-1 line-clamp-1">{reel.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{reel.summary}</p>
          
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              reel.category === "Recipes" && "bg-green-900/50 text-green-300",
              reel.category === "Movies" && "bg-blue-900/50 text-blue-300",
              reel.category === "Tools" && "bg-orange-900/50 text-orange-300",
              reel.category === "Anime" && "bg-purple-900/50 text-purple-300",
              reel.category === "Notes" && "bg-gray-900/50 text-gray-100",
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
      {/* Selected indicator - moved to top-left */}
      {reel.selected && (
        <div className="absolute top-2 left-2 bg-primary rounded-full p-1 z-10 animate-scale-in">
          <Check size={14} className="text-white" />
        </div>
      )}
      
      {/* Favorite star - positioned at top-right always */}
      <div 
        className={cn(
          "absolute top-2 right-2 z-10 transition-opacity",
          !reel.favorite && "opacity-0 group-hover:opacity-100"
        )}
        onClick={handleToggleFavorite}
      >
        <Star 
          size={16} 
          className={cn(
            "transition-colors",
            reel.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-500"
          )} 
        />
      </div>
      
      <CardHeader className={cn("pb-1 px-3", reel.selected ? "pt-8" : "pt-6")}>
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
          reel.category === "Notes" && "bg-gray-900/50 text-gray-100",
          reel.category === "Uncategorized" && "bg-gray-900/50 text-gray-300"
        )}>
          {reel.category}
        </span>
        <span className="text-xs text-muted-foreground">{formatDate(reel.timestamp)}</span>
      </CardFooter>
    </Card>
  );
}

// Component for viewing a reel's content
export function ReelViewDialog({ 
  reel, 
  isOpen, 
  onClose
}: { 
  reel: SavedReel | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!reel) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-card max-w-md w-full rounded-lg p-4 shadow-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">{reel.title}</h2>
          {reel.favorite && <Star size={18} className="fill-yellow-400 text-yellow-400" />}
        </div>
        
        <Separator className="mb-4" />
        
        <div className="space-y-3">
          <div className="bg-secondary/30 p-3 rounded-md">
            <p className="text-sm whitespace-pre-wrap">{reel.summary}</p>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className={cn(
              "px-2 py-0.5 rounded-full",
              reel.category === "Recipes" && "bg-green-900/50 text-green-300",
              reel.category === "Movies" && "bg-blue-900/50 text-blue-300",
              reel.category === "Tools" && "bg-orange-900/50 text-orange-300",
              reel.category === "Anime" && "bg-purple-900/50 text-purple-300",
              reel.category === "Notes" && "bg-gray-900/50 text-gray-100",
              reel.category === "Uncategorized" && "bg-gray-900/50 text-gray-300"
            )}>
              {reel.category}
            </span>
            <span className="text-muted-foreground">Saved: {formatDate(reel.timestamp)}</span>
          </div>
          
          {reel.sourceUrl && (
            <Button 
              variant="outline" 
              className="w-full mt-2 transition-all hover:scale-105"
              onClick={() => window.open(reel.sourceUrl, '_blank')}
            >
              View Source
            </Button>
          )}
          
          <Button 
            className="w-full transition-all hover:scale-105"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export the old name for backward compatibility
export const ReelEditDialog = ReelViewDialog;
