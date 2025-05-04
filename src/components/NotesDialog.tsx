
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useReels } from "@/hooks/useReels";

interface NotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotesDialog({ open, onOpenChange }: NotesDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const { saveReel } = useReels();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a title and content for your note.",
        variant: "destructive"
      });
      return;
    }
    
    // Format the note as a reel with "note" in the text to trigger the Notes category
    const noteText = `note: ${title} - ${content}`;
    
    try {
      await saveReel(noteText);
      
      // Reset form and close dialog
      onOpenChange(false);
      
      // Important: Reset form AFTER the dialog is closed to avoid state issues
      setTimeout(() => {
        setTitle("");
        setContent("");
      }, 300);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          // Reset form when dialog is closed
          setTimeout(() => {
            setTitle("");
            setContent("");
          }, 300);
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your note here..."
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
