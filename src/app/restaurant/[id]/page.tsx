"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, Plus, Minus, Star, Clock, ShoppingCart, Heart, Share2, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Restaurant } from '@/data/restaurants';

interface Props {
  params: Promise<{ id: string }>;
}

const RestaurantMenuPage: React.FC<Props> = ({ params }) => {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity, totalItems } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const docRef = doc(db, 'restaurants', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRestaurant(docSnap.data() as Restaurant);
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-orange-500 transition-colors mb-8 group"
        >
          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Restaurants
        </Link>

        {/* Restaurant Header */}
        <section className="relative h-[350px] sm:h-[450px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden mb-12 sm:mb-20 shadow-2xl animate-in fade-in duration-700">
          <Image 
            src={restaurant.image} 
            alt={restaurant.name} 
            fill
            className="object-cover brightness-[0.8]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 p-8 sm:p-16 flex flex-col justify-end gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl animate-in slide-in-from-bottom-8 duration-700 delay-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span className="text-sm font-bold text-white">{restaurant.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{restaurant.deliveryTime} Delivery</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">{restaurant.name}</h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300 line-clamp-2 leading-relaxed">
                Experience the finest {restaurant.cuisine} in town. Handcrafted with the freshest ingredients and delivered with precision.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10 animate-in fade-in duration-1000 delay-300">
                <button className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all active:scale-95 group">
                  <Heart className="w-5 h-5 group-hover:fill-current" />
                </button>
                <button className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all active:scale-95">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white hover:text-black transition-all active:scale-95">
                  <Info className="w-5 h-5" />
                </button>
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Full Menu</h2>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{restaurant.menu.length} Items Available</p>
            </div>
            
            <div className="flex items-center gap-4">
               {totalItems > 1 ? (
                 <Link href="/cart" className="flex h-14 items-center gap-3 px-8 rounded-2xl bg-orange-500 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all bounce-in shadow-xl shadow-orange-500/20 active:scale-95">
                    <ShoppingCart className="w-5 h-5" />
                    Checkout {totalItems} items
                 </Link>
               ) : null }
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {restaurant.menu.map((item, idx) => {
              const cartItem = cart.find(ci => ci.id === item.id);
              return (
                <div 
                  key={item.id} 
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-10 p-6 sm:p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800/50 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="relative h-[220px] sm:h-auto sm:w-[280px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-lg border border-zinc-100 dark:border-white/5 flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
                      <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                      <span className="text-[11px] font-bold text-white tracking-widest">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow py-2">
                    <div className="mb-6 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-black transition-colors group-hover:text-orange-500 leading-tight">{item.name}</h3>
                        <span className="text-2xl font-bold text-orange-500 font-sans tracking-tight">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">Available Now</span>
                      </div>

                      {cartItem ? (
                        <div className="flex items-center h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-1.5 gap-2 border border-zinc-200 dark:border-zinc-700">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-700 transition-all font-bold shadow-sm active:scale-90"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-lg font-black">{cartItem.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white transition-all font-bold shadow-md hover:bg-orange-600 active:scale-90"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item)}
                          className="h-14 px-8 rounded-2xl bg-zinc-950 dark:bg-zinc-800 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-zinc-950/20 hover:bg-orange-500 hover:shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
                        >
                          Add to Cart
                          <div className="p-1.5 rounded-lg bg-white/10 group-hover/btn:bg-white/20 transition-colors">
                            <Plus className="w-4 h-4" />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Sticky Bottom Cart (Mobile) */}
      {totalItems > 0 && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:hidden z-50 animate-in slide-in-from-bottom-12 duration-500">
            <Link href="/cart" className="flex h-16 items-center justify-between px-8 rounded-3xl bg-orange-500 text-white font-black shadow-2xl shadow-orange-500/40 transform transition-transform hover:scale-105 active:scale-95 group">
                <div className="flex items-center gap-4">
                   <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-orange-500">{totalItems}</span>
                   </div>
                   <span className="uppercase tracking-widest text-sm">View Cart</span>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180" />
            </Link>
         </div>
      )}
    </div>
  );
};

export default RestaurantMenuPage;
