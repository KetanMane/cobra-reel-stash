
import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser } from '@/lib/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<typeof mockUser | null>(null);

  const login = async () => {
    // Mock login - will be replaced with Supabase auth
    setTimeout(() => {
      setUser(mockUser);
      setIsAuthenticated(true);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
