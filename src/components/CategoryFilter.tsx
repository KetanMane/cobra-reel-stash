
import { cn } from "@/lib/utils";
import { useReels } from "@/hooks/useReels";
import { Category } from "@/lib/types";

export function CategoryFilter() {
  const { filterByCategory, activeCategory } = useReels();
  
  const categories: (Category | 'All')[] = ['All', 'Recipes', 'Movies', 'Tools', 'Uncategorized'];

  return (
    <div className="flex overflow-x-auto pb-2 gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => filterByCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
