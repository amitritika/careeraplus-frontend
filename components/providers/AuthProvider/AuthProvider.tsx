// components/providers/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type Photo = {
  contentType?: string;
  data?: string;
};

type User = {
  username: string;
  name: string;
  email: string;
  role?: number;
  photo?: Photo;
  id: string;
  _id?: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthContextType = AuthState & {
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const fetchUser = async (): Promise<User | null> => {
    try {
      const response = await apiFetch('/api/user/profile', { method: 'GET' });
      const user: User = response?.user ?? response;
      return user;
    } catch (error: any) {
      // Handle 401/Unauthorized as expected "not logged in" state
      const errorMessage = error.message || '';
      if (
        errorMessage.includes('Unauthorized') ||
        errorMessage.includes('401') ||
        errorMessage.includes('Request failed: 401')
      ) {
        // This is expected when user is not authenticated
        return null;
      }
      
      // Log other unexpected errors
      console.error('Unexpected authentication error:', error);
      return null;
    }
  };

  const refreshUser = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const user = await fetchUser();
      setState({ user, loading: false, error: null });
    } catch (error: any) {
      setState({ user: null, loading: false, error: null });
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/signout', { method: 'GET' });
    } catch (error: any) {
      // Ignore signout errors - we'll clear state anyway
      console.warn('Signout API call failed, but clearing local state:', error);
    } finally {
      setState({ user: null, loading: false, error: null });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchUser();
        setState({ user, loading: false, error: null });
      } catch (error: any) {
        // This should rarely happen due to error handling in fetchUser
        setState({ user: null, loading: false, error: null });
      }
    };

    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    refreshUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
