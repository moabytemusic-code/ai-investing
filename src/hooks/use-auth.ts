import { useState, useEffect } from 'react';
import { blink } from '../blink/client';

interface User {
  id: string;
  email: string;
  displayName?: string;
  isPro?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Standard Blink SDK Managed Auth Subscription
    const unsubscribe = (blink.auth as any).onAuthStateChanged((u: any) => {
      if (u) {
        setUser({
          id: u.id,
          email: u.email,
          displayName: u.email?.split('@')[0] || 'User',
          isPro: true // Original source likely uses a session variable or metadata
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const login = () => {
    (blink.auth as any).login();
  };

  const logout = () => {
    (blink.auth as any).logout();
  };

  return { 
    user, 
    isAuthenticated, 
    isLoading, 
    login,
    logout 
  };
}
