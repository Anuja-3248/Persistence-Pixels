import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ChevronRight, ArrowRight, Eye, EyeOff, Phone, Globe, MapPin, Camera, CheckCircle2, AlertCircle, Loader2, RotateCw, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/auth-bg.png';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  const calculateStrength = (p) => {
    let s = 0;
    if (p.length > 6) s++;
    if (p.match(/[A-Z]/)) s++;
    if (p.match(/[0-9]/)) s++;
    if (p.match(/[^A-Za-z0-9]/)) s++;
    setStrength(s);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    calculateStrength(val);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const formData = new FormData(e.target);
    const emailStr = formData.get('email') || '';
    let parsedName = formData.get('name') || '';
    
    if (!parsedName && emailStr) {
      const emailPrefix = emailStr.split('@')[0];
      parsedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    
    const userData = {
      name: parsedName || 'Operator',
      email: emailStr,
      phone: formData.get('phone') || '',
      isLoggedIn: true,
      role: 'ADMIN_NODE_01',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    // Store in localStorage for persistence
    localStorage.setItem('disasterx_user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    navigate('/');
    setIsLoading(false);
  };

  const strengthColors = ["bg-neutral-800", "bg-rose-500", "bg-amber-500", "bg-cyan-500", "bg-emerald-500"];
  const strengthLabels = ["Weak", "Acceptable", "Secure", "Strong", "Fortified"];

  const toggleMode = () => {
    setError("");
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen bg-[#0C0B1B] overflow-hidden font-body selection:bg-purple-500/30 selection:text-white text-white">
      {/* INFO PANEL (LEFT SIDE) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center p-24 overflow-hidden group">
        {/* Background Image with Parallax-ish feel */}
        <div 
          className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-[20s] ease-linear"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0B1B]/95 via-[#0C0B1B]/70 to-[#0C0B1B]/40 backdrop-blur-[1px]" />
        
        <div className="relative z-10 space-y-12 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white uppercase">DisasterX</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-black text-white leading-[1.1] tracking-tighter"
            >
              Hello there, <br />
              Welcome to <span className="text-purple-500">DisasterX</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 font-medium leading-relaxed"
            >
              Your personal disaster response companion. Track real-time events, 
              get AI-powered emergency insights, and keep your community safe with confidence.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
             {[
               { icon: <Zap className="w-5 h-5" />, text: "24/7 Global Monitoring" },
               { icon: <LayoutGrid className="w-5 h-5" />, text: "AI-Powered Risk Analysis" },
               { icon: <ShieldCheck className="w-5 h-5" />, text: "100% Encrypted & Private" }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 text-slate-300 font-bold group/item">
                 <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover/item:bg-purple-500 group-hover/item:text-white transition-all">
                   {item.icon}
                 </div>
                 <span className="tracking-wide uppercase text-[10px] tracking-[0.2em]">{item.text}</span>
               </div>
             ))}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-24 text-slate-600 text-[10px] font-black tracking-[0.5em] uppercase pointer-events-none">
          ALPHA PROTOCOL: CONNECTED // SYSTEM STABLE
        </div>
      </div>

      {/* FORM PANEL (RIGHT SIDE) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0C0B1B] relative perspective-1000">
        {/* Mobile Logo */}
        <div className="absolute top-12 left-12 lg:hidden flex items-center gap-3">
          <Shield className="w-8 h-8 text-purple-600" />
          <span className="text-2xl font-black italic tracking-tighter text-white">DisasterX</span>
        </div>

        <motion.div 
          animate={{ rotateY: isLogin ? 0 : 180 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full max-w-md h-[700px] flex items-center justify-center"
        >
          {/* LOGIN CONTENT */}
          <div 
            className="absolute inset-0 w-full h-full flex flex-col justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white tracking-tighter">Sign in to your account</h2>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-loose">Enter your neural credentials to continue</p>
              </div>

              <form className="space-y-6" onSubmit={handleAuth}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Email address</label>
                  <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-xl bg-slate-900/50 border border-slate-800 transition-all">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-purple-500" />
                    <input name="email" type="email" placeholder="email@domain.com" className="w-full bg-transparent py-4 pl-12 pr-4 text-sm font-bold text-white outline-none" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Password</label>
                    <button type="button" className="text-[10px] font-bold text-slate-600 hover:text-purple-500 uppercase tracking-widest transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-xl bg-slate-900/50 border border-slate-800 transition-all">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-purple-500" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-transparent py-4 pl-12 pr-12 text-sm font-bold text-white outline-none tracking-widest" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-5 rounded-xl text-white text-xs font-black tracking-[0.3em] uppercase flex items-center justify-center transition-all shadow-xl shadow-purple-900/20 active:scale-[0.98]">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="ml-4 w-5 h-5" /></>}
                </button>
              </form>

              <div className="text-center">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Don't have an account? <button onClick={toggleMode} className="text-purple-500 ml-2 hover:underline tracking-widest flex inline-flex items-center gap-1 italic">Sign up <RotateCw className="w-3 h-3 ml-1" /></button>
                </p>
              </div>
            </div>
          </div>

          {/* SIGN-UP CONTENT */}
          <div 
            className="absolute inset-0 w-full h-full flex flex-col justify-center translate-z-0"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tighter italic"><span className="text-purple-500">Initialize</span> Access</h2>
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Create your neural management link</p>
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-slate-500 ml-1">Full Name</label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-lg bg-slate-900/50 border border-slate-800">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                      <input name="name" type="text" placeholder="NAME" className="w-full bg-transparent py-3 pl-10 pr-4 text-[10px] font-bold text-white outline-none tracking-widest" required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-slate-500 ml-1 tracking-widest">Mobile</label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-lg bg-slate-900/50 border border-slate-800">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                      <input name="phone" type="tel" placeholder="+91 XXX" className="w-full bg-transparent py-3 pl-10 pr-4 text-[10px] font-bold text-white outline-none tracking-widest" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[9px] font-bold uppercase text-slate-500 ml-1">Email Address</label>
                   <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-lg bg-slate-900/50 border border-slate-800">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                      <input name="email" type="email" placeholder="EMAIL@DOMAIN.COM" className="w-full bg-transparent py-3 pl-10 pr-4 text-[10px] font-bold text-white outline-none tracking-widest" required />
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[9px] font-bold uppercase text-slate-500 ml-1 tracking-widest">Password</label>
                   <div className="relative group focus-within:ring-2 focus-within:ring-purple-600 rounded-lg bg-slate-900/50 border border-slate-800">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="PASSWORD" className="w-full bg-transparent py-3 pl-10 pr-4 text-[10px] font-bold text-white outline-none tracking-widest" required />
                   </div>
                   <div className="flex gap-1 px-1 pt-1 opacity-60">
                      {[1, 2, 3, 4].map((step) => <div key={step} className={`h-0.5 flex-1 rounded-full ${step <= strength ? strengthColors[step] : 'bg-slate-800'} transition-colors duration-500`} />)}
                   </div>
                </div>

                <button disabled={isLoading} className="w-full bg-white text-dark-900 py-4 rounded-xl text-[10px] font-black tracking-[0.4em] uppercase flex items-center justify-center transition-all hover:bg-purple-100 active:scale-[0.98]">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE ACCESS'}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                  Back to command link. <button onClick={toggleMode} className="text-purple-500 ml-2 hover:underline tracking-widest italic font-black uppercase">Login Now</button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
