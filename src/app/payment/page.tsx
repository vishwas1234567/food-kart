"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CreditCard, DollarSign, ShieldCheck, ArrowRight, Loader2, AlertCircle, CheckCircle2, Truck } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { grandTotal, clearCart, cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/payment');
    }
  }, [isAuthenticated, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const enteredAmount = parseFloat(amount);
    
    if (isNaN(enteredAmount) || enteredAmount !== parseFloat(grandTotal.toFixed(2))) {
      setError(`Payment failed! Please enter the exact total amount: $${grandTotal.toFixed(2)}`);
      return;
    }

    setLoading(true);
    try {
      // Store order in Firestore
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderData = {
        id: orderId,
        items: cart,
        total: grandTotal,
        date: new Date().toISOString(),
        userId: user?.uid,
        userName: user?.name,
        status: 'confirmed'
      };

      // Import Firestore tools
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      await addDoc(collection(db, 'orders'), orderData);
      
      // Store in localStorage for success page if needed
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      await clearCart();
      router.push('/order-success');
    } catch (err: any) {
      console.error('Payment error:', err);
      setError('Payment failed during processing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-4xl grid lg:grid-cols-12 gap-12 bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in zoom-in duration-700">
          
          {/* Summary Side */}
          <div className="lg:col-span-5 bg-zinc-950 text-white p-10 sm:p-16 flex flex-col justify-between group relative overflow-hidden">
             <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-500/30 transition-colors" />
             
             <div className="relative z-10 space-y-10">
                <div className="space-y-3">
                   <h2 className="text-3xl font-black tracking-tight">Checkout</h2>
                   <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Almost there! Finalize your payment</p>
                </div>

                <div className="space-y-8 py-8 border-y border-white/10">
                   <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Total Payable</span>
                      <span className="text-4xl font-black text-orange-500">${grandTotal.toFixed(2)}</span>
                   </div>
                   
                   <div className="space-y-4">
                      {cart.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between text-sm font-medium">
                           <span className="text-zinc-400 line-clamp-1">{item.name} x {item.quantity}</span>
                           <span className="text-zinc-500">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {cart.length > 3 && (
                        <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">+{cart.length - 3} more items</div>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                   <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Secure Payment</div>
                      <div className="text-xs font-bold">Encrypted 256-bit Connection</div>
                   </div>
                </div>
             </div>

             <div className="relative z-10 mt-12 flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                <Truck className="w-4 h-4" />
                Delivery in 25-45 minutes
             </div>
          </div>

          {/* Payment Form Side */}
          <div className="lg:col-span-7 p-10 sm:p-16 lg:p-20 flex flex-col justify-center animate-in slide-in-from-right-12 duration-1000">
             <div className="mb-12 space-y-3">
               <h1 className="text-4xl font-black tracking-tight">Enter Payment</h1>
               <div className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                 Simulation Mode Active
               </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-10">
               <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1 ml-4 block">Confirm Order Amount</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        type="number" 
                        step="0.01"
                        required 
                        autoFocus
                        className="w-full h-20 pl-16 pr-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-black text-2xl tracking-tight shadow-sm"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="px-4 flex items-center gap-2">
                       <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Amount must exactly match your total: ${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 rounded-2xl border-2 border-orange-500/20 bg-orange-500/5 flex flex-col gap-3 group hover:border-orange-500 hover:bg-orange-500 text-black dark:text-white transition-all cursor-pointer">
                        <CreditCard className="w-6 h-6 text-orange-500 group-hover:text-white" />
                        <span className="text-xs font-black uppercase tracking-widest">Card</span>
                     </div>
                     <div className="p-6 rounded-2xl border-2 border-transparent bg-zinc-50 dark:bg-zinc-800 flex flex-col gap-3 grayscale opacity-50 cursor-not-allowed">
                        <div className="flex h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <span className="text-xs font-black uppercase tracking-widest">PayPal</span>
                     </div>
                  </div>
               </div>

               {error && (
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest border border-red-100 dark:border-red-500/20 animate-in shake duration-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="group w-full h-20 flex items-center justify-center gap-4 rounded-3xl bg-zinc-950 dark:bg-orange-500 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-600 shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Payment'}
                {!loading && <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />}
              </button>

              <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
                 <button onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors">Go back to cart</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
