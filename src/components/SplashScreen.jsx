import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => { setShowButtons(true); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    onComplete(); // Tells App.jsx to hide splash
    navigate('/dashboard'); // Direct entry
  };

  const handleAction = (isLogin) => {
    navigate('/auth', { state: { isLogin } });
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#060b13] flex items-center justify-center z-[5000] overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1.5 }}
        transition={{ duration: 3 }}
        className="absolute w-[800px] h-[800px] rounded-full bg-blue-600/30 blur-[120px]"
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center gap-3 mb-6"
        >
           <ShieldAlert className="w-8 h-8 text-blue-400 animate-pulse" />
           <span className="text-blue-200 text-sm font-black uppercase tracking-[0.3em]">System Initialization</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-cyan-400 to-indigo-600 drop-shadow-2xl">
            DisasterX
          </h1>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {showButtons ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 flex flex-col items-center gap-4 w-full max-w-xs"
            >
              <button
                onClick={handleEnter}
                className="w-full py-4 px-8 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-2xl flex items-center justify-center gap-3 group"
              >
                Enter System <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </button>
              
              <div className="flex gap-3 w-full">
                <button onClick={() => handleAction(true)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase rounded-xl hover:bg-white/10">Sign In</button>
                <button onClick={() => handleAction(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase rounded-xl hover:bg-white/10">Register</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="mt-12 flex items-center gap-3 text-slate-500"
            >
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
               <p className="text-[10px] font-black uppercase tracking-widest">Bridging Satellite Nodes...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SplashScreen;
