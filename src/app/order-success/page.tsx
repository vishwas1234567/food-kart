"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, ChevronRight, ShoppingBag, MapPin, Receipt, Share2, Printer, ArrowLeft, Home, PackageCheck, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OrderSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      // Clear the cart after successfully placing the order
      clearCart();
    } else {
      router.push('/');
    }
  }, [clearCart, router]);

  if (!order) return null;

  const totalQty = order.items.reduce((sum: number, i: any) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-24 animate-in fade-in duration-1000">
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-all duration-700 hover:shadow-orange-500/5">
          
          {/* Header Part */}
          <div className="relative p-12 sm:p-20 text-center space-y-8 group overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-colors" />
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-orange-500/5 opacity-40 mix-blend-color-dodge transition-opacity duration-1000 group-hover:opacity-60" />

             <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="relative">
                   <div className="absolute -inset-10 bg-gradient-to-tr from-green-500/20 to-orange-500/20 blur-3xl opacity-40 animate-pulse pointer-events-none" />
                   <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-[2.5rem] bg-zinc-950 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
                      <div className="p-1.5 rounded-2xl bg-orange-500 animate-in zoom-in duration-700 delay-300">
                         <PackageCheck className="w-16 h-16 sm:w-20 sm:h-20 text-white" strokeWidth={1.5} />
                      </div>
                   </div>
                </div>

                <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-500">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-500">PAYMENT SECURED & SUCCESSFUL</span>
                   </div>
                   
                   <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9] bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent">Thank You <br /> For Ordering!</h1>
                   
                   <p className="text-xl font-medium text-zinc-500 max-w-md mx-auto leading-relaxed">
                      Your order <span className="text-orange-500 font-bold">#{order.id}</span> is being prepared and will be at your door in 25-45 minutes.
                   </p>
                </div>
             </div>
          </div>

          {/* Details Section */}
          <div className="grid lg:grid-cols-12 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-3xl animate-in fade-in duration-1000 delay-700">
             {/* Left - Items */}
             <div className="lg:col-span-8 p-10 sm:p-16 space-y-12">
                <div className="space-y-3">
                   <h2 className="text-2xl font-black tracking-tight">Order Details</h2>
                   <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                     {totalQty} Items from your favorite kitchen
                   </div>
                </div>

                <div className="space-y-8">
                   {order.items.map((item: any, idx: number) => (
                      <div key={item.id} className="flex gap-8 group/item">
                         <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 group-hover/item:scale-105 transition-transform duration-500 border border-zinc-100 dark:border-white/5">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                         </div>
                         <div className="flex flex-col flex-grow py-2">
                            <div className="flex justify-between items-start mb-auto">
                               <div className="space-y-1">
                                  <h3 className="text-xl font-black transition-colors group-hover/item:text-orange-500">{item.name}</h3>
                                  <div className="flex items-center gap-2">
                                     <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                                     <span className="text-xs font-bold text-zinc-500">{item.rating}</span>
                                  </div>
                               </div>
                               <div className="text-xl font-black text-zinc-900 dark:text-white font-sans tracking-tight">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-4">
                               <span>QTY: {item.quantity}</span>
                               <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                               <span>EACH: ${item.price.toFixed(2)}</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-white/5 flex flex-col gap-1 items-center justify-center min-w-[100px]">
                         <Clock className="w-6 h-6 text-orange-500" />
                         <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ETA</span>
                         <span className="text-xs font-bold italic">32 min</span>
                      </div>
                      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-white/5 flex flex-col gap-1 items-center justify-center min-w-[100px]">
                         <MapPin className="w-6 h-6 text-blue-500" />
                         <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Zone</span>
                         <span className="text-xs font-bold italic">B-09 NY</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <button className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-all active:scale-95 group">
                        <Share2 className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                      </button>
                      <button className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-all active:scale-95 group">
                        <Printer className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                      </button>
                   </div>
                </div>
             </div>

             {/* Right - Pricing & Action */}
             <div className="lg:col-span-4 p-10 sm:p-16 bg-zinc-950 text-white flex flex-col justify-between">
                <div className="space-y-12">
                   <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                         <Receipt className="w-6 h-6 text-orange-400" />
                      </div>
                      <h2 className="text-2xl font-black">Final Bill</h2>
                   </div>

                   <div className="space-y-6">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500">
                         <span>Subtotal</span>
                         <span className="text-white">${(order.total / 1.12).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500">
                         <span>Tax (12%)</span>
                         <span className="text-white">${(order.total - (order.total / 1.12)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500">
                         <span>Delivery</span>
                         <span className="text-green-500">FREE</span>
                      </div>
                      <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                         <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Paid Total</span>
                         <span className="text-4xl font-black text-orange-500 leading-none">${order.total.toFixed(2)}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-20 space-y-6">
                   <Link 
                     href="/" 
                     className="flex w-full h-16 items-center justify-center gap-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] group/btn shadow-2xl"
                   >
                     <Home className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                     Back to Home
                     <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                   </Link>
                   <p className="text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
                      WANT TO MODIFY YOUR ORDER?<br />
                      <span className="text-white">CONTACT SUPPORT LINE 1-800-FOOD</span>
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccessPage;
