import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Lock, Mail, ArrowRight, Eye, EyeOff, 
  Globe, Activity, Users, ShieldCheck, ChevronLeft, MapPin 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import globeImage from '../assets/command-center-globe.png';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const stats = [
    { label: 'ACTIVE REGIONS', value: '47', icon: <MapPin className="w-3.5 h-3.5" /> },
    { label: 'FIELD RESPONDERS', value: '238', icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'SYSTEM UPTIME', value: '99.9%', icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate High-Tech Decryption/Auth delay
    await new Promise(resolve => setTimeout(resolve, 2000));

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

    navigate('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* ── LEFT PANEL: VISUALLY STUNNING GLOBE ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#2563eb_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
        
        {/* Globe Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 w-[20%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 h-[20%]" />
          <img 
            src={globeImage} 
            alt="Global Network" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen animate-pulse"
          />
        </motion.div>

        {/* Branding & Mission */}
        <div className="relative z-20 space-y-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Disaster<span className="text-blue-500">X</span>
            </span>
          </Link>

          <div className="space-y-4 max-w-md">
            <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase italic">
              Secure <br /> Access <br /> <span className="text-blue-500">Terminal</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              Establishing encrypted tunnel to Global Response Center. All activities are monitored by Sentinel-1 AI.
            </p>
          </div>
        </div>

        {/* Real-time Stats Chips */}
        <div className="relative z-20 flex flex-wrap gap-4 pt-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default shadow-xl"
            >
              <div className="text-blue-500 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL: THE LOGIN FORM ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-gradient-to-br from-[#0a0a0a] to-[#050505] relative z-20">
        
        {/* Back Link for Mobile */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link to="/" className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="max-w-[440px] w-full mx-auto space-y-10">
          
          <div className="text-left space-y-2">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
              {isLogin ? 'Initiate Link' : 'Register Service'}
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              {isLogin ? 'Enter credentials to authorize access.' : 'Complete technical profile for deployment.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        name="name"
                        type="text" 
                        placeholder="OFFICER NAME"
                        className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold text-white uppercase placeholder:text-slate-800 focus:border-blue-500/30 focus:bg-blue-500/5 transition-all outline-none"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Email Terminal</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="ID@DISASTERX.GOV"
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold text-white uppercase placeholder:text-slate-800 focus:border-blue-500/30 focus:bg-blue-500/5 transition-all outline-none"
                  required 
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Security Key</label>
                {isLogin && (
                  <button type="button" className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline">Forgot Key?</button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="********"
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-14 text-sm font-bold text-white placeholder:text-slate-800 focus:border-blue-500/30 focus:bg-blue-500/5 transition-all outline-none"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)} 
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'border-white/10 group-hover:border-white/30'}`}>
                  {rememberMe && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Maintain Link</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.25)] active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {isLoading ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  <span className="uppercase tracking-[0.2em] italic font-black text-sm">Synchronizing...</span>
                </>
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] italic font-black text-sm">{isLogin ? 'Request Authorization' : 'Deploy Profile'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 text-center border-t border-white/5 space-y-8">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {isLogin ? "Requirement for new access?" : "Already have authorized link?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-3 text-blue-500 hover:text-blue-400 transition-colors italic font-black uppercase underline decoration-2 underline-offset-4"
              >
                {isLogin ? 'Register Node' : 'Initialize Terminal'}
              </button>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Auth;
