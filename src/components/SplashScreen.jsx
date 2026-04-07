import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, Info, X, Activity, Globe, Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import bgImage from '../assets/splash-bg.png';

const SplashScreen = ({ onComplete }) => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setShowButtons(true); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    onComplete();
    navigate('/dashboard');
  };

  const handleAction = (isLogin) => {
    navigate('/auth', { state: { isLogin } });
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#060b13] flex items-center justify-center z-[5000] overflow-hidden font-body">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B1B] via-[#0C0B1B]/60 to-[#0C0B1B]/40 z-0" />

      {/* Main Centered Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-6"
      >
        <AnimatePresence mode="wait">
          {!showInfo ? (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-8"
            >
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center gap-3 mb-2"
              >
                 <ShieldAlert className="w-6 h-6 text-purple-400 animate-pulse" />
                 <span className="text-purple-200 text-xs font-black uppercase tracking-[0.3em]">System Initialization</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
                Disaster<span className="text-purple-500">X</span>
              </h1>

              {/* Buttons Area */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 w-full max-w-xs"
                  >
                    <button
                      onClick={handleEnter}
                      className="w-full py-4 px-8 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-xs hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-3 group"
                    >
                      Enter System <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                    </button>
                    
                    <div className="flex gap-3 w-full">
                      <button onClick={() => handleAction(true)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/5 text-white text-[9px] font-black uppercase rounded-xl transition-all">Sign In</button>
                      <button onClick={() => setShowInfo(true)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/5 text-white text-[9px] font-black uppercase rounded-xl transition-all">Know More</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="w-full max-w-2xl bg-[#0C0B1B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">About DisasterX</h2>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Global Response Node</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-slate-300 leading-relaxed">
                  DisasterX is an advanced neural network-driven platform engineered to predict, monitor, and manage global emergency events in real-time. By harnessing satellite telemetry and collective intelligence, it empowers responders worldwide.
                </p>

                <div className="grid gap-4 mt-8">
                  {[
                    { icon: <Activity className="w-5 h-5 text-purple-400" />, title: "Predictive Analytics", desc: "Identify disaster risks before they manifest into critical events." },
                    { icon: <Globe className="w-5 h-5 text-purple-400" />, title: "Global Monitoring", desc: "Track active hazards with real-time satellite data integration." },
                    { icon: <Lock className="w-5 h-5 text-purple-400" />, title: "Secure Operations", desc: "End-to-end encrypted communication for on-the-ground teams." }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                      <div className="mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button 
                  onClick={() => handleAction(true)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2"
                >
                  Enter Platform <LogIn className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
