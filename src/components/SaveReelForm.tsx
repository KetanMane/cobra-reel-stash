
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReels } from '@/hooks/useReels';
import { Loader2 } from 'lucide-react';

interface SaveReelFormProps {
  onSuccess?: () => void;
}

export function SaveReelForm({ onSuccess }: SaveReelFormProps) {
  const [reelUrl, setReelUrl] = useState('');
  const { saveReel, isProcessing } = useReels();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveReel(reelUrl);
    setReelUrl('');
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="reelUrl" className="text-sm font-medium">
          Paste Instagram Reel Link or Description
        </label>
        <Input
          id="reelUrl"
          placeholder="https://www.instagram.com/reel/... or describe the reel content"
          value={reelUrl}
          onChange={(e) => setReelUrl(e.target.value)}
          disabled={isProcessing}
          className="bg-background border border-input"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isProcessing || !reelUrl.trim()} 
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Save Reel'
        )}
      </Button>
    </form>
  );
}
