
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/mockData';
import { toast } from "sonner";

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

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll use mock data and simple validation
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser && password === 'password') { // Simple password check for demo
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success("Login successful!");
      setIsLoading(false);
      return true;
    }
    
    toast.error("Invalid email or password");
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    setIsLoading(true);
    
    // Mock registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      toast.error("Email already in use");
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      email,
      name,
      role: 'customer'
    };
    
    // In a real app, we would save this to the database
    // For demo, we'll just set as current user
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success("Registration successful!");
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
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
