
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReels } from '@/hooks/useReels';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, ReelProcessResponse } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { processReelWithOpenAI } from '@/lib/openai';

interface SaveReelFormProps {
  onSuccess?: () => void;
}

export function SaveReelForm({ onSuccess }: SaveReelFormProps) {
  const [reelUrl, setReelUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Uncategorized');
  const { saveReel, isProcessing } = useReels();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reelUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Reel URL or text",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Add category prefix to help categorization
      const reelTextWithCategory = `${selectedCategory.toLowerCase()}: ${reelUrl}`;
      
      await saveReel(reelTextWithCategory);
      setReelUrl('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving reel:", error);
      toast({
        title: "Error",
        description: "Failed to process reel. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="reelUrl" className="text-sm font-medium">
          Paste Instagram Reel Link
        </label>
        <Input
          id="reelUrl"
          placeholder="https://www.instagram.com/reel/..."
          value={reelUrl}
          onChange={(e) => setReelUrl(e.target.value)}
          disabled={isProcessing}
          className="bg-background border border-input"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as Category)}
          disabled={isProcessing}
        >
          <SelectTrigger id="category" className="bg-background border border-input">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Recipes">Recipes</SelectItem>
            <SelectItem value="Movies">Movies</SelectItem>
            <SelectItem value="Tools">Tools</SelectItem>
            <SelectItem value="Notes">Notes</SelectItem>
            <SelectItem value="Anime">Anime</SelectItem>
            <SelectItem value="LifeHacks">Life Hacks</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Fitness">Fitness</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Uncategorized">Uncategorized</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing || !reelUrl.trim()} 
        className="w-full mt-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Add Reel'
        )}
      </Button>
    </form>
  );
}
