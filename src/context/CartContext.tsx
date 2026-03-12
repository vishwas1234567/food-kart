"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { FoodItem } from '@/data/restaurants';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface CartItem extends FoodItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.12; // 12%

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();
  const isInitialMount = useRef(true);

  // Sync with Firestore when user logs in
  useEffect(() => {
    const fetchFirestoreCart = async () => {
      if (isAuthenticated && user) {
        try {
          const cartDoc = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartDoc);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            // If user has local cart, move it to Firestore
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              const items = JSON.parse(savedCart);
              await setDoc(cartDoc, { items });
              setCart(items);
            }
          }
        } catch (error) {
          console.error('Error fetching Firestore cart:', error);
        }
      } else {
        // Fallback to local storage if not authenticated
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };

    fetchFirestoreCart();
  }, [isAuthenticated, user]);

  // Save to Firestore or LocalStorage on change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const syncCart = async () => {
      if (isAuthenticated && user) {
        try {
          const cartDoc = doc(db, 'carts', user.uid);
          await setDoc(cartDoc, { items: cart });
        } catch (error) {
          console.error('Error syncing cart to Firestore:', error);
        }
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    };

    syncCart();
  }, [cart, isAuthenticated, user]);

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        toast.success(`Increased ${item.name} quantity`);
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${item.name} added to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (item) toast.error(`${item.name} removed from cart`);
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      });
    });
  };

  const clearCart = async () => {
    setCart([]);
    if (isAuthenticated && user) {
      try {
        const cartDoc = doc(db, 'carts', user.uid);
        await setDoc(cartDoc, { items: [] });
      } catch (error) {
        console.error('Error clearing cart in Firestore:', error);
      }
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      totalItems, subtotal, tax, grandTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
