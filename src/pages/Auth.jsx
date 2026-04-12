import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ArrowRight, Eye, EyeOff, Check, ArrowLeft, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/auth-bg.png';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18c-.71 1.41-1.11 3-1.11 4.94s.4 3.53 1.11 4.94L5.84 14.1z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 20.28c-.96.95-2.11 2.22-3.41 2.22-1.25 0-1.68-.78-3.23-.78s-2.03.76-3.23.76c-1.28 0-2.58-1.47-3.53-2.43-1.98-2.01-3.41-5.69-3.41-8.91 0-5.22 3.2-7.98 6.22-7.98 1.58 0 2.61.94 3.6 1.03 1 .09 2.15-.98 3.86-.98 1.44 0 3.33.62 4.45 2.15-2.72 1.62-2.27 5.4 0 6.63-1.04 2.54-3.56 6.84-4.78 8.27zm-2.83-16.79c-.77-.94-1.29-2.25-1.29-3.49 0-.17.02-.34.06-.5-.87.04-2.02.6-2.65 1.35-.61.73-.89 1.83-.89 3.01 0 .19.03.37.06.41.97-.04 2.05-.6 2.71-1.78z"/>
  </svg>
);

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const formData = new FormData(e.target);
    const emailStr = formData.get('email') || '';
    let parsedName = formData.get('name') || '';
    
    if (!parsedName && emailStr) {
      const emailPrefix = emailStr.split('@')[0];
      parsedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    
    const userData = {
      name: parsedName || 'Responder',
      email: emailStr,
      isLoggedIn: true,
      role: 'FIELD_OFFICER_01',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    localStorage.setItem('disasterx_user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    navigate('/');
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 lg:p-10 font-body selection:bg-blue-500/30">
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1240px] h-[780px] bg-[#121212] rounded-[2.5rem] overflow-hidden flex shadow-2xl border border-white/5"
      >
        {/* LEFT PANEL: IMAGE & BRANDING */}
        <div className="hidden lg:block w-[55%] h-full relative group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
          
          {/* Header in Image */}
          <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">DisasterX</span>
            </div>
            <Link to="/" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all text-sm font-medium text-white">
              Back to website <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white leading-tight max-w-md"
            >
              Protecting Lives, <br />
              Building Global Resilience
            </motion.h2>
            <div className="flex gap-2 mt-6">
              {[0, 1, 2].map(i => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'w-10 bg-white' : 'w-4 bg-white/20'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AUTH FORM */}
        <div className="w-full lg:w-[45%] h-full flex flex-col p-8 md:p-14 lg:p-16 overflow-y-auto no-scrollbar relative">
          <div className="max-w-[400px] mx-auto w-full text-left">
            {/* Toggle Header */}
            <div className="mb-10 text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                {isLogin ? 'Login' : 'Create an account'}
              </h1>
              <p className="text-neutral-500 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"} 
                <button 
                  onClick={toggleMode}
                  className="text-blue-500 ml-2 hover:underline font-semibold focus:outline-none"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleAuth} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2 text-left">
                       <label className="text-xs font-semibold text-neutral-400 ml-1">First name</label>
                       <input 
                         name="name" 
                         type="text" 
                         placeholder="First name" 
                         className="w-full bg-[#1e1e1e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                         required={!isLogin}
                       />
                    </div>
                    <div className="space-y-2 text-left">
                       <label className="text-xs font-semibold text-neutral-400 ml-1">Last name</label>
                       <input 
                         type="text" 
                         placeholder="Last name" 
                         className="w-full bg-[#1e1e1e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                       />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-neutral-400 ml-1">Email address</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="name@agency.gov" 
                  className="w-full bg-[#1e1e1e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                  required 
                />
              </div>

              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-400 ml-1">Password</label>
                  {isLogin && <button type="button" className="text-xs text-neutral-500 hover:text-blue-400 transition-colors">Forgot password?</button>}
                </div>
                <div className="relative group">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter your password" 
                    className="w-full bg-[#1e1e1e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pr-12" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              {!isLogin && (
                <div className="flex items-start gap-3 py-2 text-left">
                  <button 
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${agreed ? 'bg-blue-600 border-blue-600' : 'border-neutral-700 bg-transparent'}`}
                  >
                    {agreed && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                  </button>
                  <p className="text-xs text-neutral-500 leading-normal">
                    I agree to the <span className="text-white hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </div>
              )}

              <button 
                disabled={isLoading || (!isLogin && !agreed)}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] mt-4"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  isLogin ? 'Log in' : 'Create account'
                )}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative px-4 text-xs font-semibold text-neutral-600 bg-[#121212] uppercase tracking-[0.2em]">
                {isLogin ? 'Or login with' : 'Or register with'}
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-[#1e1e1e] hover:bg-[#252525] border border-white/5 py-3.5 rounded-xl transition-all group">
                <GoogleIcon />
                <span className="text-sm font-semibold text-neutral-300 group-hover:text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#1e1e1e] hover:bg-[#252525] border border-white/5 py-3.5 rounded-xl transition-all group">
                <AppleIcon />
                <span className="text-sm font-semibold text-neutral-300 group-hover:text-white">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
