
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session and set up auth state listener
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      } else if (data) {
        setUser({
          id: data.id,
          email: data.email || '', // We'll need to get this from auth.users
          name: data.name || '',
          role: data.role as 'customer' | 'admin'
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data && data.user) {
        toast.success("Login successful!");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Register new user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      toast.success("Registration successful! Please check your email for verification.");
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
      } else {
        setUser(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
