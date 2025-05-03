
import { useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SaveReelForm } from "@/components/SaveReelForm";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { useReels } from "@/hooks/useReels";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotesDialog } from "@/components/NotesDialog";

export default function HomePage() {
  const { filteredReels, activeCategory } = useReels();
  const { isExpanded } = useSidebar();
  const [showAddReelDialog, setShowAddReelDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [categorySort, setCategorySort] = useState("all");
  const [timeSort, setTimeSort] = useState("recent");
  
  const isEmpty = useMemo(() => {
    return filteredReels.length === 0;
  }, [filteredReels]);

  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container py-6 space-y-6 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">CobraSave</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowNotesDialog(true)}
            >
              <Pencil size={20} />
              <span className="sr-only">Create Note</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={20} />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Pin Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Batch Select
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="space-y-4">
          <SearchBar />

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <CategoryFilter />
            
            <div className="flex gap-2">
              <Select value={categorySort} onValueChange={setCategorySort}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeSort} onValueChange={setTimeSort}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isEmpty ? (
            <EmptyState 
              type={activeCategory !== 'All' ? 'category' : 'all'} 
              category={activeCategory} 
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredReels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Floating "+" button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={() => setShowAddReelDialog(true)}
      >
        <Plus size={24} />
        <span className="sr-only">Add Reel</span>
      </Button>
      
      {/* Dialog for adding a new reel */}
      <Dialog open={showAddReelDialog} onOpenChange={setShowAddReelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save a Reel</DialogTitle>
          </DialogHeader>
          <SaveReelForm onSuccess={() => setShowAddReelDialog(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Dialog for notes */}
      <NotesDialog open={showNotesDialog} onOpenChange={setShowNotesDialog} />
    </div>
  );
}
