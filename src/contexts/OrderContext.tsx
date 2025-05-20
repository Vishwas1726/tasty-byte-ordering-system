
import React, { createContext, useState, useContext } from 'react';
import { Order, CartItem } from '@/lib/types';
import { orders as mockOrders } from '@/lib/mockData';
import { useAuth } from './AuthContext';
import { toast } from "sonner";

interface OrderContextType {
  orders: Order[];
  placeOrder: (cartItems: CartItem[], total: number, contactDetails: Order['contactDetails']) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: () => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { user } = useAuth();

  const placeOrder = async (
    cartItems: CartItem[], 
    total: number, 
    contactDetails: Order['contactDetails']
  ): Promise<string> => {
    // Create new order
    const newOrder: Order = {
      id: `${Math.floor(Math.random() * 100000)}`,
      userId: user?.id || 'guest',
      items: [...cartItems],
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      contactDetails
    };

    // Add order to state
    setOrders(prev => [...prev, newOrder]);
    
    // In a real app, we would save this to the database via API
    toast.success("Order placed successfully!");
    return newOrder.id;
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  const getAllOrders = () => {
    // Only admins should access all orders
    if (user?.role !== 'admin') {
      return [];
    }
    return orders;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    // Only admins can update order status
    if (user?.role !== 'admin') {
      toast.error("Unauthorized to update order status");
      return;
    }

    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );

    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      placeOrder, 
      getOrderById, 
      getUserOrders,
      getAllOrders,
      updateOrderStatus 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
