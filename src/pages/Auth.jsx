import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ChevronRight, ArrowRight, Eye, EyeOff, Phone, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  const handleAuth = (e) => {
    e.preventDefault();
    // In a real app we'd validate here, but for now we'll just redirect to dashboard
    navigate('/');
  };

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
        <div className="flex flex-col h-full">
           <div className="flex-1 p-10 md:p-14">
              {/* Header */}
              <div className="mb-10 text-center">
                 <div className="w-14 h-14 rounded-2xl bg-neon-blue text-dark-900 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(80,215,255,0.4)]">
                    <Shield className="w-7 h-7" />
                 </div>
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                    {isLogin ? 'Access' : 'Initialize'} <span className="text-neon-blue">Shield</span> Control
                 </h2>
                 <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Alpha Protocol Access Node-01</p>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleAuth}>
                 {!isLogin ? (
                    <>
                       {/* Full Name (Sign Up only) */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Full Name</label>
                          <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                             <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                             <input 
                                type="text" 
                                placeholder="YOUR FULL NAME" 
                                className="w-full bg-transparent py-4 pl-14 pr-8 text-sm font-bold tracking-widest outline-none placeholder:text-slate-800"
                                required
                             />
                          </div>
                       </div>
                       
                       {/* Mobile Number (Sign Up only) */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Mobile Number</label>
                          <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                             <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                             <input 
                                type="tel" 
                                placeholder="+91 XXXXX XXXXX" 
                                className="w-full bg-transparent py-4 pl-14 pr-8 text-sm font-bold tracking-widest outline-none placeholder:text-slate-800"
                                required
                             />
                          </div>
                       </div>
                    </>
                 ) : null}

                 {/* Email / Username */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">{isLogin ? "Email / Username" : "Email Address"}</label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                       <input 
                          type="text" 
                          placeholder={isLogin ? "EMAIL OR USERNAME" : "EMAIL@DOMAIN.COM"}
                          className="w-full bg-transparent py-4 pl-14 pr-8 text-sm font-bold tracking-widest outline-none placeholder:text-slate-800"
                          required
                       />
                    </div>
                 </div>

                 {/* Password */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">{isLogin ? "Password" : "Create Security Cipher"}</label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                       <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="**************" 
                          className="w-full bg-transparent py-4 pl-14 pr-14 text-sm font-bold outline-none placeholder:text-slate-800"
                          required
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

                 {isLogin ? (
                    <div className="flex justify-between items-center px-2">
                       <div className="flex items-center space-x-2">
                          <input 
                             type="checkbox" 
                             id="remember" 
                             checked={rememberMe}
                             onChange={(e) => setRememberMe(e.target.checked)}
                             className="w-4 h-4 rounded border-white/10 bg-white/5 accent-neon-blue focus:ring-0 cursor-pointer" 
                          />
                          <label htmlFor="remember" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 cursor-pointer select-none">Remember Me</label>
                       </div>
                       <button type="button" className="text-[10px] font-black uppercase tracking-widest text-neon-blue hover:underline">Forgot Password?</button>
                    </div>
                 ) : (
                    /* Confirm Password (Sign Up only) */
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Confirm Security Cipher</label>
                       <div className="relative group focus-within:ring-2 focus-within:ring-neon-blue transition-all rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20">
                          <Shield className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                          <input 
                             type={showPassword ? 'text' : 'password'} 
                             placeholder="**************" 
                             className="w-full bg-transparent py-4 pl-14 pr-14 text-sm font-bold outline-none placeholder:text-slate-800"
                             required
                          />
                       </div>
                    </div>
                 )}

                 <button type="submit" className="w-full btn-primary py-5 rounded-3xl text-sm font-black tracking-[0.2em] uppercase flex items-center justify-center transition-all hover:scale-[1.02] shadow-[0_20px_50px_rgba(80,215,255,0.2)] mt-4">
                    {isLogin ? 'Establish Link' : 'Initialize Protocol'}
                    <ArrowRight className="ml-4 w-5 h-5" />
                 </button>
              </form>

              {/* Social Login */}
              <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center gap-8">
                 <div className="flex items-center gap-6 w-full opacity-60">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Or Login with</span>
                    <div className="flex-1 h-px bg-white/10" />
                 </div>
                 
                 <div className="flex gap-4 w-full">
                    <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex items-center justify-center gap-4 transition-all hover:bg-white/10 group">
                       <img src="https://www.google.com/favicon.ico" className="w-6 h-6 grayscale group-hover:grayscale-0" alt="Google" />
                       <span className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Google</span>
                    </button>
                    <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex items-center justify-center gap-4 transition-all hover:bg-white/10 group">
                       <Globe className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                       <span className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Facebook</span>
                    </button>
                 </div>

                 <p className="text-sm font-black uppercase tracking-tighter text-slate-600">
                    {isLogin ? "Don't have an account?" : "System Access Verified?"} 
                    <button 
                       onClick={() => setIsLogin(!isLogin)}
                       className="text-neon-blue ml-2 hover:underline tracking-[0.2em] uppercase italic font-black text-xs"
                    >
                       {isLogin ? 'Sign Up' : 'Access Link'}
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
