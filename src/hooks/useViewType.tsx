
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ViewType = 'grid' | 'list';

interface ViewTypeContextType {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}

const ViewTypeContext = createContext<ViewTypeContextType | undefined>(undefined);

export function ViewTypeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, otherwise use grid
  const [viewType, setViewType] = useState<ViewType>(() => {
    const savedViewType = localStorage.getItem('cobra-view-type');
    // Convert old values to new values
    if (savedViewType === 'smallGrid' || savedViewType === 'largeGrid') {
      return 'grid';
    }
    return (savedViewType as ViewType) || 'grid';
  });

  // Save to localStorage whenever viewType changes
  useEffect(() => {
    localStorage.setItem('cobra-view-type', viewType);
  }, [viewType]);

  return (
    <ViewTypeContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ViewTypeContext.Provider>
  );
}

export function useViewType() {
  const context = useContext(ViewTypeContext);
  if (context === undefined) {
    throw new Error('useViewType must be used within a ViewTypeProvider');
  }
  return context;
}
