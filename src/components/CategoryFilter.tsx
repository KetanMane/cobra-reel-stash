
import { cn } from "@/lib/utils";
import { useReels } from "@/hooks/useReels";
import { Category } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function CategoryFilter() {
  const { filterByCategory, activeCategory } = useReels();
  
  const categories: { id: Category | 'All', name: string, emoji?: string }[] = [
    { id: 'All', name: 'All', emoji: '🌟' },
    { id: 'Recipes', name: 'Recipes', emoji: '🍳' },
    { id: 'Movies', name: 'Movies', emoji: '🎬' },
    { id: 'Anime', name: 'Anime', emoji: '📺' },
    { id: 'Tools', name: 'Tools', emoji: '🛠️' },
    { id: 'LifeHacks', name: 'Life Hacks', emoji: '🧠' },
    { id: 'Books', name: 'Books', emoji: '📚' },
    { id: 'Fitness', name: 'Fitness', emoji: '🧘' },
    { id: 'Career', name: 'Career', emoji: '💼' },
    { id: 'Art', name: 'Art', emoji: '🎨' },
    { id: 'Tech', name: 'Tech Tips', emoji: '💡' },
    { id: 'Gaming', name: 'Gaming', emoji: '🎮' },
    { id: 'Beauty', name: 'Beauty', emoji: '💄' },
    { id: 'Travel', name: 'Travel', emoji: '🧳' },
    { id: 'Music', name: 'Music', emoji: '🎵' },
    { id: 'Products', name: 'Products', emoji: '🛒' },
    { id: 'Finance', name: 'Finance', emoji: '💸' },
    { id: 'Coding', name: 'Coding', emoji: '🧑‍💻' },
    { id: 'Pets', name: 'Pets', emoji: '🐶' },
    { id: 'Funny', name: 'Funny', emoji: '😂' },
    { id: 'Fashion', name: 'Fashion', emoji: '👗' },
    { id: 'Quotes', name: 'Quotes', emoji: '💬' },
    { id: 'Uncategorized', name: 'Other', emoji: '📌' }
  ];

  return (
    <ScrollArea className="w-full pb-2 -mx-3 px-3">
      <div className="flex gap-2 w-max pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => filterByCategory(category.id)}
            className={cn(
              "px-2 py-1 rounded-md text-xs whitespace-nowrap transition-all",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.emoji && <span className="mr-1">{category.emoji}</span>}
            {category.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
