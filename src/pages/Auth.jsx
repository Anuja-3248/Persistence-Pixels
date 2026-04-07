import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD
import { Mail, Lock, User, Shield, ChevronRight, ArrowRight, Eye, EyeOff, Phone, Globe, MapPin, Camera, CheckCircle2, AlertCircle, Loader2, RotateCw, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/auth-bg.png';
=======
import { Mail, Lock, User, Shield, ChevronRight, ArrowRight, Eye, EyeOff, Phone, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
>>>>>>> 849247728b38486012928a87a3e626f14224a596

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
=======
  const [rememberMe, setRememberMe] = useState(false);
>>>>>>> 849247728b38486012928a87a3e626f14224a596

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

<<<<<<< HEAD
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
    <div className="flex min-h-screen bg-[#0C0B1B] overflow-hidden font-body selection:bg-purple-500/30 selection:text-white">
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
            <span className="text-2xl font-bold tracking-tighter text-white">DisasterX</span>
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
                      {[1, 2, 3, 4].map((step) => <div key={step} className={`h-0.5 flex-1 rounded-full ${step <= strength ? strengthColors[strength] : 'bg-slate-800'} transition-colors duration-500`} />)}
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
=======
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
    </div>
  );
};

export default Auth;
<<<<<<< HEAD


=======
>>>>>>> 849247728b38486012928a87a3e626f14224a596
