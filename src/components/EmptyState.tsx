
import { Category } from "@/lib/types";

interface EmptyStateProps {
  type: 'search' | 'category' | 'all';
  category?: Category | 'All';
  searchQuery?: string;
}

export function EmptyState({ type, category, searchQuery }: EmptyStateProps) {
  let message = '';
  let subMessage = '';

  switch (type) {
    case 'search':
      message = `No results found for "${searchQuery}"`;
      subMessage = 'Try a different search term or clear your search';
      break;
    case 'category':
      message = `No saved reels in ${category}`;
      subMessage = 'Save some reels in this category to see them here';
      break;
    case 'all':
      message = 'No saved reels yet';
      subMessage = 'Paste an Instagram Reel link above to get started';
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-4">
        <span className="text-2xl">📋</span>
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-1">{subMessage}</p>
    </div>
  );
}
