
import { SavedReel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReels } from "@/hooks/useReels";
import { useState } from "react";

interface ReelCardProps {
  reel: SavedReel;
}

export function ReelCard({ reel }: ReelCardProps) {
  const { toggleFavorite, deleteReel } = useReels();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn("card-transition", expanded ? "border-primary" : "")}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{reel.title}</CardTitle>
          <button
            onClick={() => toggleFavorite(reel.id)}
            className="text-yellow-500 hover:text-yellow-400 focus:outline-none"
            aria-label={reel.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {reel.favorite ? "⭐" : "☆"}
          </button>
        </div>
        <div className="flex gap-2 items-center mt-1">
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            reel.category === "Recipes" && "bg-green-900/50 text-green-300",
            reel.category === "Movies" && "bg-blue-900/50 text-blue-300",
            reel.category === "Tools" && "bg-orange-900/50 text-orange-300",
            reel.category === "Uncategorized" && "bg-gray-900/50 text-gray-300"
          )}>
            {reel.category}
          </span>
          <span className="text-xs text-muted-foreground">{reel.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={cn(
          "text-sm text-muted-foreground",
          !expanded && "line-clamp-2"
        )}>
          {reel.summary}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => deleteReel(reel.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
