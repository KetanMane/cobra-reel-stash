
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SavedReel {
  id: string;
  title: string;
  summary: string;
  category: Category;
  timestamp: string;
  favorite: boolean;
  sourceUrl?: string;
  selected?: boolean; // New property for multi-select functionality
}

export type Category = 
  | 'Recipes' 
  | 'Movies' 
  | 'Tools' 
  | 'Notes' 
  | 'Anime'
  | 'LifeHacks' 
  | 'Books' 
  | 'Fitness' 
  | 'Career' 
  | 'Art' 
  | 'Tech' 
  | 'Gaming'
  | 'Beauty' 
  | 'Travel' 
  | 'Music' 
  | 'Products' 
  | 'Finance' 
  | 'Coding' 
  | 'Pets'
  | 'Funny' 
  | 'Fashion' 
  | 'Quotes' 
  | 'Uncategorized';

export interface ReelProcessResponse {
  summary: string;
  category: Category;
  title: string;
}
