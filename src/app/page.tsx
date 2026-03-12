"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Restaurant } from '@/data/restaurants';
import { Star, Clock, ChevronRight, Search, MapPin, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { restaurants, loading } = useRestaurants();

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16 rounded-[2rem] sm:rounded-[3rem] bg-zinc-900 border border-zinc-800/50 shadow-2xl min-h-[600px] flex items-center justify-center text-center">
          <Image 
            src="/images/hero_bg.png"
            alt="Delicious food display"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          
          <div className="relative z-10 max-w-4xl px-8 sm:px-12 lg:px-20 py-20 space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner transition-transform hover:scale-[1.02] active:scale-95 group cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase group-hover:text-white transition-colors">50% Off First Order</span>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Order Food From Your <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Favorite</span> Restaurants
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                Delicious meals, snacks, and treats from local favorites delivered directly to your doorstep with love and speed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link 
                href="#restaurants" 
                className="inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-orange-500 text-white font-bold text-sm sm:text-base tracking-wide hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 transition-all active:scale-95 group"
              >
                Explore Menu
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl group hover:bg-white/20 transition-all">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium text-white">New York, USA</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-12 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-xs font-medium text-zinc-400 tracking-wider uppercase">Restaurants</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">4.8/5</div>
                <div className="text-xs font-medium text-zinc-400 tracking-wider uppercase">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section id="restaurants" className="mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Popular Near You</h2>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Pick from our top-rated restaurants, chosen for you.</p>
            </div>
            
            <div className="relative group min-w-[320px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500">
                <Search className="w-5 h-5 text-zinc-400" />
              </div>
              <input 
                type="text"
                placeholder="Search restaurant or cuisine..."
                className="block w-full h-14 pl-12 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, idx) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={idx} />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
              <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900 mb-6">
                <Search className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No restaurants found</h3>
              <p className="text-zinc-500">Try searching for something else like "Pizza" or "Burger".</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-sans tracking-tight">FoodKart</span>
          </div>
          <p className="text-sm font-medium text-zinc-500">© 2026 FoodKart. Built with ❤️ for food lovers.</p>
        </div>
      </footer>
    </div>
  );
};

const RestaurantCard: React.FC<{ restaurant: Restaurant, index: number }> = ({ restaurant, index }) => {
  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={restaurant.image} 
          alt={restaurant.name} 
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
          <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="text-xs font-bold text-white tracking-wider">{restaurant.rating}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
               <Clock className="w-3.5 h-3.5 text-white" />
               <span className="text-[11px] font-bold text-white uppercase tracking-wider">{restaurant.deliveryTime}</span>
            </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white dark:bg-zinc-900 transition-colors">
        <div className="mb-4 flex flex-col gap-1.5">
          <h3 className="text-xl font-bold transition-colors group-hover:text-orange-500">{restaurant.name}</h3>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500 line-clamp-1">{restaurant.cuisine}</p>
        </div>
        
        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
          <Link 
            href={`/restaurant/${restaurant.id}`}
            className="flex items-center justify-center w-full h-12 bg-zinc-950 dark:bg-zinc-800 text-white rounded-2xl text-sm font-bold tracking-wide transition-all hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98]"
          >
            View Menu
            <ChevronRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
