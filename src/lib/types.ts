
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
}

export type Category = 'Recipes' | 'Movies' | 'Tools' | 'Uncategorized';

export interface ReelProcessResponse {
  summary: string;
  category: Category;
  title: string;
}
