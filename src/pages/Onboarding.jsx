import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Brain, Globe, Lock } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // Automatically transition from the welcome screen (step 0) to the first card (step 1)
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 4000); // 4 seconds welcome screen
      return () => clearTimeout(timer);
    }
  }, [step]);

  const nextStep = () => {
    if (step < onboardingData.length) {
      setStep(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  const onboardingData = [
    {
      title: "Predictive Intelligence",
      description: "Our neural engines identify disaster risks before they manifest into critical events, giving you the power of early intervention through data synthesis.",
      icon: <Brain className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Global Monitoring",
      description: "Track real-time hazards across the globe using continuous satellite data feeds and on-the-ground intelligence.",
      icon: <Globe className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Secure Comm Link",
      description: "A fully encrypted network ensuring your crisis communication remains private, immutable, and accessible only to authorized personnel.",
      icon: <Lock className="w-5 h-5 text-purple-400" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0C0B1B] text-white flex items-center justify-center overflow-hidden font-body">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="welcome"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center z-10"
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              <Shield className="w-20 h-20 text-purple-500 mb-8 animate-pulse" />
            </motion.div>

            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-black tracking-tighter text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6"
            >
              <div className="flex">
                {"WELCOME".split("").map((char, i) => (
                  <motion.span key={`w-${i}`} variants={letterVariants}>{char}</motion.span>
                ))}
              </div>
              <div className="flex">
                {"TO".split("").map((char, i) => (
                  <motion.span key={`t-${i}`} variants={letterVariants}>{char}</motion.span>
                ))}
              </div>
              <div className="flex text-purple-500">
                {"DISASTERX".split("").map((char, i) => (
                  <motion.span key={`d-${i}`} variants={letterVariants}>{char}</motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-8 text-purple-400/60 font-medium tracking-[0.5em] uppercase text-xs"
            >
              Establishing Neural Link...
            </motion.p>
          </motion.div>
        )}

        {step > 0 && (
          <motion.div 
            key="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="z-10 w-full max-w-2xl"
          >
            <div className="bg-[#131127] border border-white/5 rounded-3xl p-10 md:p-14 shadow-2xl shadow-purple-900/20 relative overflow-hidden">
                {/* Decorative glowing orb in the card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-slate-500 uppercase">Protocol Initialization</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[160px]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {onboardingData[step - 1].icon}
                      <h2 className="text-3xl font-black text-white tracking-tight">
                        {onboardingData[step - 1].title}
                      </h2>
                    </div>
                    
                    <div className="w-12 h-1 bg-purple-500/30 rounded-full mb-6" />
                    
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      {onboardingData[step - 1].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 flex items-center justify-between">
                  <div className="flex gap-2">
                    {onboardingData.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${step - 1 === idx ? 'w-8 bg-purple-500' : 'w-2 bg-slate-800'}`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={nextStep}
                    className="group flex items-center gap-3 bg-white text-dark-900 px-6 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all hover:bg-purple-100 active:scale-95"
                  >
                    {step === onboardingData.length ? 'ENTER SYSTEM' : 'NEXT STAGE'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
