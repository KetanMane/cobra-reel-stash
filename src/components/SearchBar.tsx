
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useReels } from '@/hooks/useReels';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { searchReels } = useReels();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchReels(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, searchReels]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search saved reels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-9"
      />
    </div>
  );
}
