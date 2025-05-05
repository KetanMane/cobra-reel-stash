
import { cn } from "@/lib/utils";
import { useReels } from "@/hooks/useReels";
import { Category } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CategoryFilter() {
  const { filterByCategory, activeCategory } = useReels();
  
  const categories: { id: Category | 'All', name: string, emoji?: string }[] = [
    { id: 'All', name: 'All', emoji: '🌟' },
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
    { id: 'Notes', name: 'Notes', emoji: '📝' },
    { id: 'Uncategorized', name: 'Other', emoji: '📌' }
  ];

  return (
    <ScrollArea className="w-full -mx-2 px-2">
      <div className="flex flex-wrap gap-0.5 w-max pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => filterByCategory(category.id)}
            className={cn(
              "px-1 py-0.5 rounded-md text-xs whitespace-nowrap transition-all hover:scale-105",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.emoji && <span className="mr-0.5">{category.emoji}</span>}
            {category.name}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
