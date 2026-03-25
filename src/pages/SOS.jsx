import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Camera, Send, CheckCircle, Shield, Phone, Radio, Users } from 'lucide-react';

const SOS = () => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSOS = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep(2);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-6 min-h-full flex flex-col items-center"
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="request"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            <div className="text-center">
              <h2 className="text-6xl font-black text-neon-red mb-4 animate-pulse uppercase tracking-tighter">Emergency Channel</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Direct connection to response headquarters</p>
            </div>

            {/* Main SOS Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-neon-red/30 rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-700 animate-pulse" />
              <button
                disabled={isSending}
                onClick={handleSOS}
                className={`relative w-80 h-80 rounded-full bg-neon-red flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(255,61,104,0.6)] transition-all active:scale-95 disabled:scale-90 ${isSending ? 'animate-bounce' : 'hover:scale-105'}`}
              >
                {isSending ? (
                  <div className="flex flex-col items-center">
                    <Radio className="w-16 h-16 animate-ping mb-4" />
                    <span className="text-2xl font-black uppercase tracking-widest">TRANSMITTING...</span>
                  </div>
                ) : (
                  <>
                    <AlertTriangle className="w-24 h-24 mb-3" />
                    <span className="text-5xl font-black font-sans">SEND SOS</span>
                    <span className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">Global Dispatch Protocol</span>
                  </>
                )}
              </button>
            </div>

            {/* Extras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
               <div className="glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4 text-neon-blue">
                     <MapPin className="w-8 h-8" />
                     <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Auto-Detected Position</p>
                        <p className="text-lg font-black text-white">Pune, Maharashtra, IND</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">GPS COORDINATES:</span>
                     <span className="text-[10px] font-mono text-neon-blue font-bold tracking-[0.2em]">18.5204° N, 73.8567° E</span>
                  </div>
               </div>

               <div className="glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl flex flex-col justify-center">
                  <div className="flex gap-4">
                     <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all group">
                        <Camera className="w-6 h-6 text-slate-400 group-hover:text-neon-blue transition-colors" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">UPLOAD PHOTO</span>
                     </button>
                     <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all group">
                        <Phone className="w-6 h-6 text-slate-400 group-hover:text-neon-blue transition-colors" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">VOICE CALL</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Message Box */}
            <div className="w-full glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl">
               <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="OPTIONAL: Briefly describe your situation (e.g. trapped by flood, medical emergency...)" 
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium focus:outline-none focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/30 transition-all resize-none placeholder:text-slate-700"
               />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl glass-dark p-12 rounded-[50px] border border-neon-green/30 text-center shadow-[0_0_80px_rgba(34,197,94,0.2)]"
          >
            <div className="w-32 h-32 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-8 border-4 border-neon-green">
               <CheckCircle className="w-16 h-16 text-neon-green" />
            </div>
            
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Signal Locked</h2>
            <p className="text-slate-400 mb-10 font-bold leading-relaxed px-10">
               Your SOS signal has been received by <span className="text-white">Maharashtra Disaster Control Room</span>. 
               The nearest rescue unit (Team Alpha-9) is being dispatched to your coordinates.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500">ETA TO COORDINATES</p>
                  <p className="text-3xl font-black text-neon-blue">12m 45s</p>
               </div>
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500">TEAM CAPACITY</p>
                  <p className="text-3xl font-black text-neon-green">AVAILABLE</p>
               </div>
            </div>

            <button 
               onClick={() => setStep(1)}
               className="btn-outline w-full py-5 rounded-3xl text-lg font-black tracking-widest uppercase border-slate-700 text-slate-400 hover:text-white hover:border-white"
            >
               CANCEL ALERT / SAFE NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 flex gap-20 opacity-30 pointer-events-none">
         <div className="flex flex-col items-center">
            <Users className="w-10 h-10 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">RESCUE TEAM: ALPHA-9</span>
         </div>
         <div className="flex flex-col items-center">
            <Shield className="w-10 h-10 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">SECURE CHANNEL 0291-B</span>
         </div>
      </div>
    </motion.div>
  );
};

export default SOS;
