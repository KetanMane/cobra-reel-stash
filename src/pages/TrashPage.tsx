
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { useState } from "react";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Trash2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useViewType } from "@/hooks/useViewType";

export default function TrashPage() {
  const { trashedReels, restoreFromTrash, emptyTrash, permanentlyDeleteReel } = useReels();
  const { isExpanded } = useSidebar();
  const { viewType } = useViewType();
  const [showEmptyTrashDialog, setShowEmptyTrashDialog] = useState(false);
  
  // Helper function to format date
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
  
  // Get grid class based on view type
  const getGridClass = () => {
    switch(viewType) {
      case 'largeGrid':
        return "grid grid-cols-2 gap-3"; // 2 cards per row
      case 'list':
        return "flex flex-col gap-3"; // List view
      case 'smallGrid':
      default:
        return "grid grid-cols-3 gap-2"; // 3 cards per row
    }
  };

  return (
    <div className="min-h-screen flex-1">
      <div className={`flex-1 container max-w-md mx-auto py-4 px-3 space-y-4 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Trash</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="More options">
                <MoreVertical size={18} />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEmptyTrashDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Empty Trash</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
        
        <div className="space-y-4">
          {trashedReels.length === 0 ? (
            <EmptyState type="trash" />
          ) : (
            <div className={getGridClass()}>
              {trashedReels.map((reel) => (
                <div key={reel.id} className="relative">
                  <ReelCard 
                    reel={{...reel, selected: false}}
                    isSelectionMode={false}
                    onSelect={() => {}}
                    onOpenReel={() => {}}
                    viewType={viewType}
                  />
                  <div className="absolute top-0 right-0 p-2 flex gap-1">
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 bg-secondary/50 hover:bg-secondary"
                      onClick={() => restoreFromTrash(reel.id)}
                      title="Restore reel"
                    >
                      <RefreshCcw size={12} />
                      <span className="sr-only">Restore</span>
                    </Button>
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 bg-secondary/50 hover:bg-secondary"
                      onClick={() => permanentlyDeleteReel(reel.id)}
                      title="Delete permanently"
                    >
                      <Trash2 size={12} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/50 text-xs text-white text-center">
                    Expires: {formatDate(reel.expiresAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Empty Trash Dialog */}
      <AlertDialog open={showEmptyTrashDialog} onOpenChange={setShowEmptyTrashDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Empty Trash</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all items in the trash. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                emptyTrash();
                setShowEmptyTrashDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Empty Trash
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
