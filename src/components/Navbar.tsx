"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, LogOut, User as UserIcon, Menu as MenuIcon, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-sans tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              FoodKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-sm font-medium hover:text-orange-500 transition-colors">Home</Link>
            
            <div className="flex items-center gap-4 border-l border-zinc-200 dark:border-zinc-800 pl-6 h-8">
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all group">
                <ShoppingCart className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-lg animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <UserIcon className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {user?.name.split(' ')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-zinc-500 hover:text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/login"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="text-sm font-medium bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 px-5 py-2 rounded-full hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all transform active:scale-95"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium transition-colors"
            >
              Home
            </Link>
            <div className="border-t border-zinc-200 dark:border-zinc-800 my-2" />
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-500 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 p-2">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
