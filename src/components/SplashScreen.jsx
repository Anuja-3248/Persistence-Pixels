import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onComplete }) => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show buttons after the initial animations finish
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAction = (isLogin) => {
    // Navigate to auth page
    navigate('/auth', { state: { isLogin } });
    // Tell App.jsx that the splash sequence is done
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#060b13] flex items-center justify-center z-[100] overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1.5 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-blue-600/30 blur-[120px]"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1.2 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
        className="absolute w-[600px] h-[600px] left-[10%] top-[40%] rounded-full bg-cyan-500/30 blur-[100px]"
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 md:mb-6"
        >
          <p className="text-blue-400 font-semibold tracking-[0.2em] uppercase text-2xl md:text-4xl mb-2 text-center drop-shadow-lg">
            Welcome to
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="flex items-center space-x-2"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-cyan-400 to-indigo-600 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            DisasterX
          </h1>
        </motion.div>
        
        {/* Animated Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-8 w-64 md:w-96"
        />
        
        <AnimatePresence mode="wait">
          {!showButtons ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-8 flex items-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <p className="text-slate-400 text-sm font-mono tracking-wider">INITIALIZING SYSTEMS...</p>
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full px-8 max-w-sm"
            >
              <button
                onClick={() => handleAction(true)}
                className="flex-1 py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                Login
              </button>
              <button
                onClick={() => handleAction(false)}
                className="flex-1 py-3 px-6 rounded-full bg-transparent border-2 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold tracking-widest uppercase transition-all hover:scale-105"
              >
                Sign Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SplashScreen;
