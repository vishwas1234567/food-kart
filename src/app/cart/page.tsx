"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShoppingCart, CreditCard, Receipt, MapPin, Search, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, tax, grandTotal, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart');
      return;
    }
    router.push('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 sm:p-20 text-center animate-in fade-in duration-1000">
          <div className="relative mb-8 group">
            <div className="absolute -inset-8 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative p-12 rounded-[3rem] bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105 duration-500">
              <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">Your cart is feeling empty</h2>
          <p className="text-lg font-medium text-zinc-500 dark:text-zinc-500 max-w-sm mx-auto mb-10 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Why not explore our top-rated restaurants?
          </p>
          <Link 
            href="/" 
            className="group flex h-14 items-center justify-center gap-3 px-10 rounded-2xl bg-orange-500 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95"
          >
            Go Shopping
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight">Your Cart</h1>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {totalItems} items selected from top restaurants
                </div>
              </div>
              <Link href="/" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                 Add more items
                 <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </Link>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {cart.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-10 p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800/50 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative h-48 sm:h-auto sm:w-48 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-white/5 flex-shrink-0 shadow-lg">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex flex-col flex-grow py-2">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-black group-hover:text-orange-500 transition-colors">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 uppercase tracking-widest">
                           <MapPin className="w-3.5 h-3.5" />
                           Top Restaurant Special
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 text-zinc-400 dark:text-zinc-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all active:scale-95"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                      <div className="text-2xl font-black text-orange-500 font-sans tracking-tight">
                         ${(item.price * item.quantity).toFixed(2)}
                         <span className="text-[10px] block font-bold text-zinc-400 uppercase tracking-widest mt-1">${item.price.toFixed(2)} / item</span>
                      </div>
                      
                      <div className="flex items-center h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-1.5 gap-2 border border-zinc-200 dark:border-zinc-700 shadow-inner">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-700 transition-all font-bold shadow-sm active:scale-90"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-lg font-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white transition-all font-bold shadow-md hover:bg-orange-600 active:scale-90"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-8 duration-700 sticky top-32">
            <div className="relative group overflow-hidden rounded-[3rem] bg-zinc-950 text-white p-8 sm:p-12 shadow-2xl transition-transform hover:scale-[1.01] duration-500 border border-white/5">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-500/30 transition-colors" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-8">
                   <div className="space-y-2">
                     <h2 className="text-3xl font-black tracking-tight">Order Summary</h2>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Pricing details for your selection</p>
                   </div>
                   <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-orange-400" />
                   </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Items Subtotal</span>
                    <span className="font-black">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Estimated Tax (12%)</span>
                    <span className="font-black">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Delivery Fee</span>
                    <span className="text-green-500 font-bold uppercase tracking-widest text-xs">FREE</span>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-zinc-400 uppercase tracking-widest text-xs font-black">Grand Total</span>
                       <div className="text-5xl font-black tracking-tight bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">${grandTotal.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button 
                    onClick={handleCheckout}
                    className="flex w-full h-16 items-center justify-center gap-4 rounded-[1.5rem] bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] shadow-2xl group/btn"
                  >
                    Proceed to Checkout
                    <CreditCard className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                  </button>
                  <p className="text-center text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Safe & Secure Payments Only</p>
                </div>
              </div>
            </div>

            {/* Empty Cart Hint Card */}
            <div className="mt-8 p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-6">
               <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-orange-500" />
               </div>
               <div>
                  <h4 className="text-sm font-black mb-1">Coupon code?</h4>
                  <p className="text-xs font-medium text-zinc-500">You can apply your promo codes in the next step of checkout.</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
