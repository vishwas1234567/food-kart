"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowRight, ShoppingCart, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const LoginPageContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push(redirect);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in zoom-in duration-700">
      
      {/* Form Side */}
      <div className="p-8 sm:p-16 lg:p-24 flex flex-col justify-center animate-in slide-in-from-left-12 duration-1000">
        <div className="mb-12 space-y-3">
           <h1 className="text-4xl font-black tracking-tight">Welcome Back</h1>
           <div className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
             Log in to your account
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1 ml-4 block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="email" 
                  required 
                  className="w-full h-16 pl-16 pr-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-medium text-sm shadow-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1 ml-4 mb-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block">Password</label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="password" 
                  required 
                  className="w-full h-16 pl-16 pr-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-medium text-sm shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest border border-red-100 dark:border-red-500/20 animate-in shake duration-500">
              <Info className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="group w-full h-16 flex items-center justify-center gap-4 rounded-2xl bg-zinc-950 dark:bg-orange-500 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-600 shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
            {!loading && <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </button>

          <div className="text-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
             <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
               Don't have an account?{' '}
               <Link href="/signup" className="text-orange-500 hover:text-orange-600 transition-colors underline underline-offset-8 decoration-2">Join us now</Link>
             </p>
          </div>
        </form>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:relative lg:flex flex-col justify-center p-20 bg-zinc-950 text-white group overflow-hidden">
         <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/40 transition-colors" />
         
         <div className="relative z-10 space-y-12 animate-in slide-in-from-right-12 duration-1000">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-xl shadow-orange-500/20 transform rotate-6 group-hover:rotate-0 transition-transform">
               <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            
            <div className="space-y-6">
               <h2 className="text-5xl font-black leading-[1.1] tracking-tight">Craving <span className="text-orange-400">Something</span> Delicious?</h2>
               <p className="text-xl font-medium text-zinc-400 max-w-sm leading-relaxed">
                 Sign in to access your previous orders, saved restaurants, and exclusive member discounts. Dinner is just a few clicks away.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
               <div>
                  <div className="text-2xl font-black">20 min</div>
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">AVG DELIVERY</div>
               </div>
               <div>
                  <div className="text-2xl font-black">24/7</div>
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SUPPORT</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPageContent />
        </Suspense>
      </main>
    </div>
  );
};

export default LoginPage;
