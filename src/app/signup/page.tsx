"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, CheckCircle, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const success = await signup(name, email, password);
      if (success) {
        router.push('/login');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in zoom-in duration-700">
          
          {/* Visual Side */}
          <div className="hidden lg:relative lg:flex flex-col justify-center p-20 bg-zinc-950 text-white group overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/40 transition-colors" />
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-red-500/30 transition-colors" />
             
             <div className="relative z-10 space-y-12 animate-in slide-in-from-left-12 duration-1000">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-xl shadow-orange-500/20 transform -rotate-6 group-hover:rotate-0 transition-transform">
                   <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                
                <div className="space-y-6">
                   <h2 className="text-5xl font-black leading-[1.1] tracking-tight">Join the <span className="text-orange-500">Foodie</span> Revolution!</h2>
                   <p className="text-xl font-medium text-zinc-400 max-w-sm leading-relaxed">
                     Create your account and unlock a world of gourmet flavors delivered with a tap. Over 500+ top restaurants waiting for you.
                   </p>
                </div>

                <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                   <div className="flex -space-x-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="User profile" />
                        </div>
                      ))}
                   </div>
                   <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest leading-none">JOIN 10,000+ USERS TODAY</div>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="p-8 sm:p-16 lg:p-24 flex flex-col justify-center animate-in slide-in-from-right-12 duration-1000">
            <div className="mb-12 space-y-3">
               <h1 className="text-4xl font-black tracking-tight">Create Account</h1>
               <div className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                 Start your food journey here
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1 ml-4 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="text" 
                      required 
                      className="w-full h-16 pl-16 pr-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-medium text-sm shadow-sm"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1 ml-4 block">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        type="password" 
                        required 
                        minLength={6}
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1 ml-4 block">Confirm</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        type="password" 
                        required 
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
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
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>

              <div className="text-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
                 <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                   Already have an account?{' '}
                   <Link href="/login" className="text-orange-500 hover:text-orange-600 transition-colors underline underline-offset-8 decoration-2">Sign in here</Link>
                 </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

const Info: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default SignupPage;
