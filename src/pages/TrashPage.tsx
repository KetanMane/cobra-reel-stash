
import { useState } from "react";
import { useReels } from "@/hooks/useReels";
import { SidebarProvider } from "@/hooks/useSidebar";
import { ReelsProvider } from "@/hooks/useReels";
import { Sidebar } from "@/components/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, RefreshCw } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function TrashPage() {
  const { reels } = useReels();
  const { isExpanded } = useSidebar();
  const [showEmptyTrashDialog, setShowEmptyTrashDialog] = useState(false);
  
  // For demonstration, we'll use a few reels as if they were in trash
  const [trashedReels, setTrashedReels] = useState(reels.slice(0, 3).map(reel => ({
    ...reel,
    deletedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  })));
  
  const handleRestore = (id: string) => {
    setTrashedReels(prev => prev.filter(reel => reel.id !== id));
    toast({
      title: "Reel restored",
      description: "The reel has been restored successfully",
    });
  };

  const handleDelete = (id: string) => {
    setTrashedReels(prev => prev.filter(reel => reel.id !== id));
    toast({
      title: "Reel deleted",
      description: "The reel has been permanently deleted",
    });
  };
  
  const handleEmptyTrash = () => {
    setTrashedReels([]);
    setShowEmptyTrashDialog(false);
    toast({
      title: "Trash emptied",
      description: "All items have been permanently deleted",
    });
  };
  
  return (
    <SidebarProvider>
      <ReelsProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-16">
            <div className={`flex-1 container py-6 space-y-6 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
                  <h1 className="text-2xl font-bold">Trash</h1>
                </div>
                {trashedReels.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={20} />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowEmptyTrashDialog(true)}>
                        Empty trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              {trashedReels.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Items in trash will be automatically deleted after 30 days.
                </p>
              )}
              
              <div className="space-y-4">
                {trashedReels.length === 0 ? (
                  <EmptyState type="all" category="Trash" />
                ) : (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {trashedReels.map((reel) => (
                      <TrashReelCard 
                        key={reel.id} 
                        reel={reel} 
                        onRestore={() => handleRestore(reel.id)} 
                        onDelete={() => handleDelete(reel.id)} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ReelsProvider>
      
      <AlertDialog open={showEmptyTrashDialog} onOpenChange={setShowEmptyTrashDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Empty trash?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all items in the trash. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmptyTrash} className="bg-destructive text-destructive-foreground">
              Empty trash
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}

interface TrashReelCardProps {
  reel: {
    id: string;
    title: string;
    summary: string;
    category: string;
    timestamp: string;
    favorite: boolean;
    deletedAt: string;
    expiresAt: string;
  };
  onRestore: () => void;
  onDelete: () => void;
}

function TrashReelCard({ reel, onRestore, onDelete }: TrashReelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const daysLeft = Math.ceil(
    (new Date(reel.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Card className={cn("card-transition", expanded ? "border-primary" : "")}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{reel.title}</CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onRestore}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw size={16} />
                <span className="sr-only">Restore</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical size={16} />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                    Delete permanently
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
            <span className="text-xs text-muted-foreground">Deleted {new Date(reel.deletedAt).toLocaleDateString()}</span>
          </div>
          <div className="mt-1">
            <span className="text-xs text-amber-500">Expires in {daysLeft} days</span>
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
        <CardFooter className="pt-0">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this reel. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }} 
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
