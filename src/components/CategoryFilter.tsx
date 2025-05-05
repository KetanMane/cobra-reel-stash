
import { cn } from "@/lib/utils";
import { useReels } from "@/hooks/useReels";
import { Category } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategoryFilter({ hideInMobile = false }: { hideInMobile?: boolean }) {
  const { filterByCategory, activeCategory } = useReels();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const categories: { id: Category | 'All', name: string, emoji?: string }[] = [
    { id: 'All', name: 'All', emoji: '🌟' },
    { id: 'Notes', name: 'Notes', emoji: '📝' },
    { id: 'Recipes', name: 'Recipes', emoji: '🍳' },
    { id: 'Movies', name: 'Movies', emoji: '🎬' },
    { id: 'Anime', name: 'Anime', emoji: '📺' },
    { id: 'Tools', name: 'Tools', emoji: '🛠️' },
    { id: 'LifeHacks', name: 'Life', emoji: '🧠' },
    { id: 'Books', name: 'Books', emoji: '📚' },
    { id: 'Fitness', name: 'Fit', emoji: '🧘' },
    { id: 'Career', name: 'Career', emoji: '💼' },
    { id: 'Art', name: 'Art', emoji: '🎨' },
    { id: 'Tech', name: 'Tech', emoji: '💡' },
    { id: 'Gaming', name: 'Gaming', emoji: '🎮' },
    { id: 'Beauty', name: 'Beauty', emoji: '💄' },
    { id: 'Travel', name: 'Travel', emoji: '🧳' },
    { id: 'Music', name: 'Music', emoji: '🎵' },
    { id: 'Products', name: 'Buy', emoji: '🛒' },
    { id: 'Finance', name: 'Money', emoji: '💸' },
    { id: 'Coding', name: 'Code', emoji: '🧑‍💻' },
    { id: 'Pets', name: 'Pets', emoji: '🐶' },
    { id: 'Funny', name: 'Fun', emoji: '😂' },
    { id: 'Fashion', name: 'Style', emoji: '👗' },
    { id: 'Quotes', name: 'Quote', emoji: '💬' },
    { id: 'Uncategorized', name: 'Other', emoji: '📌' }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = 200; // Adjust as needed
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth - 10));
  };
  
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', checkScrollPosition);
    // Initial check
    checkScrollPosition();
    
    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <div className={cn("w-full relative overflow-hidden", hideInMobile && "hidden md:block")}>
      {/* Left scroll button */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-1 z-10 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>
      )}
      
      {/* Right scroll button */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-1 z-10 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      )}
      
      <div 
        ref={scrollRef}
        className="flex gap-0.5 pb-1 overflow-x-auto scrollbar-none"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => filterByCategory(category.id)}
            className={cn(
              "px-1 py-0.5 rounded-md text-xs whitespace-nowrap transition-all hover:scale-105",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground font-medium"
                : category.id === "Notes"
                  ? "bg-gray-900 text-gray-100 hover:bg-gray-800"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.emoji && <span className="mr-0.5">{category.emoji}</span>}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
