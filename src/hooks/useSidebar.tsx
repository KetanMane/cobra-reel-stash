
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 
  | 'default' 
  | 'cyber-purple' 
  | 'warm-beige' 
  | 'forest-green' 
  | 'ocean-sailing' 
  | 'mountain-sunset' 
  | 'night-sky' 
  | 'misty-meadow'
  | 'pink-dream'
  | 'chocolate-brown'
  | 'anime-pastel'
  | 'aurora-lights'
  | 'desert-dunes'
  | 'cherry-blossom'
  | 'mystic-forest'
  | 'tech-noir';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Load theme from localStorage or use default
const getInitialTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem('cobra-theme');
  return (savedTheme as ThemeType) || 'default';
};

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(getInitialTheme);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  const collapseSidebar = () => {
    setIsExpanded(false);
  };

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('cobra-theme', theme);
    
    // Apply theme classes to body
    document.body.classList.remove(
      'theme-default', 
      'theme-cyber-purple', 
      'theme-warm-beige', 
      'theme-forest-green',
      'theme-ocean-sailing',
      'theme-mountain-sunset',
      'theme-night-sky',
      'theme-misty-meadow',
      'theme-pink-dream',
      'theme-chocolate-brown',
      'theme-anime-pastel',
      'theme-aurora-lights',
      'theme-desert-dunes',
      'theme-cherry-blossom',
      'theme-mystic-forest',
      'theme-tech-noir'
    );
    document.body.classList.add(`theme-${theme}`);
  };

  // Initialize theme on mount
  useEffect(() => {
    document.body.classList.add(`theme-${currentTheme}`);
    
    return () => {
      document.body.classList.remove(`theme-${currentTheme}`);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ 
      isExpanded, 
      toggleSidebar, 
      collapseSidebar, 
      currentTheme, 
      setTheme 
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
