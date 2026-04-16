import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Activity, EyeOff, Key } from 'lucide-react';

const PrivacySection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Node Security Layer */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-indigo-600 rounded-full"></div>
          <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">Node Security Protocols</h3>
        </div>

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between p-8 bg-slate-50 rounded-3xl border border-indigo-100">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Quantum Shield Active</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">End-to-end data encryption of operational reports</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                <div className="w-[94%] h-full bg-emerald-500 rounded-full" />
              </div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Hydra-94 Encryption Protocol</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <EyeOff className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Incognito Response Mode</span>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <Key className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Hardware Bio-Key Lock</span>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
               <div className="flex items-center gap-3 mb-4">
                 <Activity className="w-4 h-4 text-indigo-500" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Security Metrics</span>
               </div>
               <p className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">0 Detected Intrusions</p>
               <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Satellite Link Secure (Encrypted)</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacySection;
