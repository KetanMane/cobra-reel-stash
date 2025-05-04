
import { SavedReel } from './types';

export const mockReels: SavedReel[] = [
  {
    id: '1',
    title: 'Homemade French Toast Recipe',
    summary: 'Dip bread slices in egg mixture. Cook on buttered skillet until golden. Top with syrup and berries.',
    category: 'Recipes',
    timestamp: '2023-05-01',
    favorite: true,
  },
  {
    id: '2',
    title: 'DIY Shelf Installation Hack',
    summary: 'Use a paper template for perfect shelf bracket placement. Mark holes with pencil, then drill.',
    category: 'Tools',
    timestamp: '2023-05-03',
    favorite: false,
  },
  {
    id: '3',
    title: 'Must Watch Horror Classics',
    summary: 'Top 5 horror classics: The Exorcist, The Shining, Halloween, Psycho, and Alien.',
    category: 'Movies',
    timestamp: '2023-05-05',
    favorite: true,
  },
  {
    id: '4',
    title: 'Quick 15-Min Pasta Recipe',
    summary: 'Boil pasta. Mix with olive oil, garlic, chili flakes, and parmesan. Top with basil.',
    category: 'Recipes',
    timestamp: '2023-05-07',
    favorite: false,
  },
  {
    id: '5',
    title: 'Phone Stand From Paper Clip',
    summary: 'Bend large paper clip into M shape. Flatten bottom. Create phone slot at top. Adjust angle as needed.',
    category: 'Tools',
    timestamp: '2023-05-09',
    favorite: true,
  },
];

export const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
};

export const mockProcessReel = (reelText: string): Promise<{
  summary: string;
  category: 'Recipes' | 'Movies' | 'Tools' | 'Notes' | 'Uncategorized';
  title: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock processing logic
      if (reelText.toLowerCase().includes('recipe') || 
          reelText.toLowerCase().includes('food') || 
          reelText.toLowerCase().includes('cook')) {
        resolve({
          summary: 'A summary of the recipe with key ingredients and steps.',
          category: 'Recipes',
          title: 'Quick Delicious Recipe',
        });
      } else if (reelText.toLowerCase().includes('movie') || 
                reelText.toLowerCase().includes('film') || 
                reelText.toLowerCase().includes('watch')) {
        resolve({
          summary: 'A summary of the movie recommendation.',
          category: 'Movies',
          title: 'Must-Watch Film',
        });
      } else if (reelText.toLowerCase().includes('hack') || 
                reelText.toLowerCase().includes('tool') || 
                reelText.toLowerCase().includes('diy')) {
        resolve({
          summary: 'A summary of the tool or hack shown in the reel.',
          category: 'Tools',
          title: 'Useful Life Hack',
        });
      } else if (reelText.toLowerCase().includes('note') || 
                reelText.toLowerCase().includes('remember') || 
                reelText.toLowerCase().includes('idea')) {
        resolve({
          summary: 'A note to remember important information or ideas.',
          category: 'Notes',
          title: 'Important Note',
        });
      } else {
        resolve({
          summary: 'A general summary of the reel content.',
          category: 'Uncategorized',
          title: 'Interesting Content',
        });
      }
    }, 800); // Simulate API delay
  });
};
