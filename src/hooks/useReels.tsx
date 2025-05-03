
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { SavedReel, Category, ReelProcessResponse } from '@/lib/types';
import { mockReels, mockProcessReel } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

interface TrashedReel extends SavedReel {
  deletedAt: string;
  expiresAt: string;
}

interface ReelsContextType {
  reels: SavedReel[];
  filteredReels: SavedReel[];
  activeCategory: Category | 'All';
  isProcessing: boolean;
  trashedReels: TrashedReel[];
  saveReel: (reelUrl: string) => Promise<void>;
  filterByCategory: (category: Category | 'All') => void;
  toggleFavorite: (id: string) => void;
  searchReels: (query: string) => void;
  deleteReel: (id: string) => void;
  restoreFromTrash: (id: string) => void;
  emptyTrash: () => void;
  permanentlyDeleteReel: (id: string) => void;
}

const ReelsContext = createContext<ReelsContextType | undefined>(undefined);

export function ReelsProvider({ children }: { children: ReactNode }) {
  const [reels, setReels] = useState<SavedReel[]>(mockReels);
  const [filteredReels, setFilteredReels] = useState<SavedReel[]>(mockReels);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trashedReels, setTrashedReels] = useState<TrashedReel[]>([]);

  const applyFilters = useCallback((category: Category | 'All', query: string, reelsList: SavedReel[]) => {
    let result = [...reelsList];
    
    // Apply category filter
    if (category !== 'All') {
      result = result.filter(reel => reel.category === category);
    }
    
    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(reel => 
        reel.title.toLowerCase().includes(lowercaseQuery) || 
        reel.summary.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return result;
  }, []);

  const saveReel = async (reelText: string) => {
    if (!reelText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Reel URL or text",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // This will be replaced with actual API call
      const response: ReelProcessResponse = await mockProcessReel(reelText);
      
      const newReel: SavedReel = {
        id: Date.now().toString(),
        title: response.title,
        summary: response.summary,
        category: response.category,
        timestamp: new Date().toISOString().split('T')[0],
        favorite: false,
      };
      
      const updatedReels = [newReel, ...reels];
      setReels(updatedReels);
      setFilteredReels(applyFilters(activeCategory, searchQuery, updatedReels));
      
      toast({
        title: "Success!",
        description: "Reel saved successfully",
      });
    } catch (error) {
      console.error('Error saving reel:', error);
      toast({
        title: "Error",
        description: "Failed to process reel",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const filterByCategory = (category: Category | 'All') => {
    setActiveCategory(category);
    setFilteredReels(applyFilters(category, searchQuery, reels));
  };

  const searchReels = (query: string) => {
    setSearchQuery(query);
    setFilteredReels(applyFilters(activeCategory, query, reels));
  };

  const toggleFavorite = (id: string) => {
    const updatedReels = reels.map(reel => 
      reel.id === id ? { ...reel, favorite: !reel.favorite } : reel
    );
    setReels(updatedReels);
    setFilteredReels(applyFilters(activeCategory, searchQuery, updatedReels));
  };

  const deleteReel = (id: string) => {
    const reelToTrash = reels.find(reel => reel.id === id);
    if (reelToTrash) {
      // Add to trash with expiration date (30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const trashedReel: TrashedReel = {
        ...reelToTrash,
        deletedAt: new Date().toISOString(),
        expiresAt: thirtyDaysFromNow.toISOString()
      };
      
      setTrashedReels([...trashedReels, trashedReel]);
      
      // Remove from active reels
      const updatedReels = reels.filter(reel => reel.id !== id);
      setReels(updatedReels);
      setFilteredReels(applyFilters(activeCategory, searchQuery, updatedReels));
      
      toast({
        title: "Success",
        description: "Reel moved to trash",
      });
    }
  };
  
  const restoreFromTrash = (id: string) => {
    const reelToRestore = trashedReels.find(reel => reel.id === id);
    if (reelToRestore) {
      // Remove the trash-specific properties and add back to active reels
      const { deletedAt, expiresAt, ...restoredReel } = reelToRestore;
      
      setReels([restoredReel, ...reels]);
      setFilteredReels(applyFilters(activeCategory, searchQuery, [restoredReel, ...reels]));
      
      // Remove from trash
      setTrashedReels(trashedReels.filter(reel => reel.id !== id));
      
      toast({
        title: "Success",
        description: "Reel restored successfully",
      });
    }
  };
  
  const emptyTrash = () => {
    setTrashedReels([]);
    toast({
      title: "Success",
      description: "Trash emptied successfully",
    });
  };
  
  const permanentlyDeleteReel = (id: string) => {
    setTrashedReels(trashedReels.filter(reel => reel.id !== id));
    toast({
      title: "Success",
      description: "Reel permanently deleted",
    });
  };

  return (
    <ReelsContext.Provider value={{
      reels,
      filteredReels,
      activeCategory,
      isProcessing,
      trashedReels,
      saveReel,
      filterByCategory,
      toggleFavorite,
      searchReels,
      deleteReel,
      restoreFromTrash,
      emptyTrash,
      permanentlyDeleteReel
    }}>
      {children}
    </ReelsContext.Provider>
  );
}

export function useReels() {
  const context = useContext(ReelsContext);
  if (context === undefined) {
    throw new Error('useReels must be used within a ReelsProvider');
  }
  return context;
}
