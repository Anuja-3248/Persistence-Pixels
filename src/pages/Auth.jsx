import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ChevronRight, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 blur-[120px] rounded-full animate-float" />
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-red/10 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-xl glass-dark rounded-[50px] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full">
           <div className="flex-1 p-12 md:p-16">
              {/* Header */}
              <div className="mb-12">
                 <div className="w-12 h-12 rounded-2xl bg-neon-blue text-dark-900 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(80,215,255,0.4)]">
                    <Shield className="w-6 h-6" />
                 </div>
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-3">
                    {isLogin ? 'Access' : 'Initialize'} <span className="text-neon-blue">Shield</span> Control
                 </h2>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Alpha Protocol Access Node-01</p>
              </div>

              {/* Form */}
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                 {!isLogin && (
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Authorized Name</label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                         <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                         <input 
                            type="text" 
                            placeholder="OPERATOR NAME" 
                            className="w-full bg-transparent py-4 pl-14 pr-8 text-sm font-bold uppercase tracking-widest outline-none placeholder:text-slate-800"
                         />
                      </div>
                   </div>
                 )}

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Credential ID (Email)</label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                       <input 
                          type="email" 
                          placeholder="EMAIL@HQ.INTEL" 
                          className="w-full bg-transparent py-4 pl-14 pr-8 text-sm font-bold uppercase tracking-widest outline-none placeholder:text-slate-800"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="flex justify-between items-center ml-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Cipher (Password)</label>
                       {isLogin && <button className="text-[10px] font-black uppercase tracking-widest text-neon-blue hover:underline">Revive Cipher</button>}
                    </div>
                    <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                       <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="**************" 
                          className="w-full bg-transparent py-4 pl-14 pr-14 text-sm font-bold outline-none placeholder:text-slate-800"
                       />
                       <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                       >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                       </button>
                    </div>
                 </div>

                 <button className="w-full btn-primary py-5 rounded-3xl text-sm font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all hover:scale-[1.02] shadow-[0_20px_40px_rgba(80,215,255,0.2)]">
                    {isLogin ? 'Establish Link' : 'Initialize Protocol'}
                    <ArrowRight className="w-5 h-5" />
                 </button>
              </form>

              {/* Footer */}
              <div className="mt-12 pt-10 border-t border-white/5 flex flex-col items-center gap-8">
                 <div className="flex items-center gap-6 w-full">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Alternate Authorization</span>
                    <div className="flex-1 h-px bg-white/5" />
                 </div>
                 
                 <div className="flex gap-4 w-full">
                    <button className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex items-center justify-center gap-3 transition-all hover:bg-white/10 group">
                       <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0" alt="G" />
                    </button>
                    <button className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex items-center justify-center gap-3 transition-all hover:bg-white/10 group">
                       <Shield className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    </button>
                 </div>

                 <p className="text-sm font-black uppercase tracking-tighter text-slate-600">
                    {isLogin ? "No Operational Access?" : "Already Authorized?"} 
                    <button 
                       onClick={() => setIsLogin(!isLogin)}
                       className="text-neon-blue ml-2 hover:underline tracking-widest uppercase italic font-black text-xs"
                    >
                       {isLogin ? 'Request Initialization' : 'Access Link'}
                    </button>
                 </p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
