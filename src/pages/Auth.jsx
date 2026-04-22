import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import globeImage from '../assets/command-center-globe.png';
import logo from '../assets/logo.png';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.47 8.47 1.07 10.06 1.07 12s.4 3.53 1.11 4.94L5.84 14.1z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.05 20.28c-.96.95-2.11 2.22-3.41 2.22-1.25 0-1.68-.78-3.23-.78s-2.03.76-3.23.76c-1.28 0-2.58-1.47-3.53-2.43-1.98-2.01-3.41-5.69-3.41-8.91 0-5.22 3.2-7.98 6.22-7.98 1.58 0 2.61.94 3.6 1.03 1 .09 2.15-.98 3.86-.98 1.44 0 3.33.62 4.45 2.15-2.72 1.62-2.27 5.4 0 6.63-1.04 2.54-3.56 6.84-4.78 8.27zm-2.83-16.79c-.77-.94-1.29-2.25-1.29-3.49 0-.17.02-.34.06-.5-.87.04-2.02.6-2.65 1.35-.61.73-.89 1.83-.89 3.01 0 .19.03.37.06.41.97-.04 2.05-.6 2.71-1.78z"/>
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  const handleDemoLogin = () => {
    const demoUser = {
      name: "Commander Alpha",
      email: "demo@disasterx.gov",
      uid: "demo-12345",
      isLoggedIn: true
    };
    localStorage.setItem('disasterx_user', JSON.stringify(demoUser));
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard', { replace: true });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const emailStr = formData.get('email');
    const passwordStr = password; 
    const nameStr = formData.get('name');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, emailStr, passwordStr);
        const user = userCredential.user;
        
        const userData = {
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          uid: user.uid,
          isLoggedIn: true
        };
        localStorage.setItem('disasterx_user', JSON.stringify(userData));
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, emailStr, passwordStr);
        const user = userCredential.user;

        await updateProfile(user, { displayName: nameStr });

        await setDoc(doc(db, 'users', user.uid), {
          name: nameStr,
          email: emailStr,
          role: 'FIELD_OFFICER_01',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        });

        localStorage.setItem('disasterx_user', JSON.stringify({
          name: nameStr,
          email: emailStr,
          uid: user.uid,
          isLoggedIn: true
        }));
      }

      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error("Auth Error:", err.code, err.message);
      
      let friendlyMessage = "Authentication failed. Please check your credentials.";
      if (err.code === 'auth/invalid-credential') friendlyMessage = "Invalid email or password.";
      if (err.code === 'auth/email-already-in-use') friendlyMessage = "Email already registered. Try logging in.";
      if (err.code === 'auth/weak-password') friendlyMessage = "Password must be at least 6 characters.";
      if (err.code === 'auth/user-not-found') friendlyMessage = "No account found with this email.";
      
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans overflow-hidden" style={{ background: '#0a0e1a' }}>

      {/* ── LEFT: GLOBE PANEL ── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col justify-between p-12 overflow-hidden">

        {/* Globe Background */}
        <div className="absolute inset-0">
          <img src={globeImage} alt="Globe" className="w-full h-full object-cover" />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/30 via-transparent to-[#0a0e1a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/70 via-transparent to-[#0a0e1a]/30" />
        </div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/60">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-white uppercase tracking-widest">DisasterX</span>
        </div>

        {/* Middle: Hero Text */}
        <div className="relative z-10 space-y-6 max-w-lg">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-blue-500" />
            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">Global Response Network</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-6xl font-black text-white uppercase leading-none tracking-tight">Respond.</h1>
            <h1 className="text-6xl font-black text-white uppercase leading-none tracking-tight">Rescue.</h1>
            <h1 className="text-6xl font-black text-blue-400 uppercase leading-none tracking-tight">Recover.</h1>
          </div>

          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm" style={{ fontWeight: 400 }}>
            Real-time situational awareness for emergency response teams worldwide. Your mission begins here.
          </p>
        </div>

        {/* Bottom: Stats */}
        <div className="relative z-10 flex items-end gap-12">
          <div className="text-center">
            <p className="text-3xl font-black text-blue-400">47</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Regions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-400">238</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Responders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-100">99.9%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Uptime</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: FORM PANEL ── */}
      <div className="w-full lg:w-[42%] flex items-center justify-center px-8 md:px-16 py-12 relative"
        style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="w-full max-w-[380px] space-y-8">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Secure Access</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">DisasterX Command Portal</p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-200">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-semibold text-slate-200">
              <GoogleIcon /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-semibold text-slate-200">
              <AppleIcon /> Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      required={!isLogin}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border-2 border-white/20 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border-2 border-white/20 rounded-lg pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-white/20 hover:border-white/40'}`}
                >
                  {rememberMe && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-semibold">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_8px_30px_rgba(37,99,235,0.25)] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-sm font-bold">{isLogin ? 'Access Command Center' : 'Create Account'}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <p className="text-center text-xs text-slate-600">
            {isLogin ? 'Not yet registered?' : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-400 font-bold transition-colors ml-1"
            >
              {isLogin ? 'Create an account' : 'Sign in'}
            </button>
          </p>

          {/* Demo Access */}
          <div className="pt-4">
            <button
              onClick={handleDemoLogin}
              className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
            >
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Tactical Bypass (Demo Access)</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-slate-700 uppercase tracking-widest">
            DisasterX Global Response Network
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
