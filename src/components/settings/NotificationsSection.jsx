import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Radio, Volume2, ShieldCheck } from 'lucide-react';

const NotificationsSection = ({ data, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Alert Severity Filters */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-amber-500 rounded-full"></div>
          <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">Active Alert Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'critical', level: 'Critical', desc: 'Life-threatening incidents', color: 'bg-red-500' },
            { id: 'high', level: 'High', desc: 'Severe property damage', color: 'bg-orange-500' },
            { id: 'advisory', level: 'Advisory', desc: 'General weather alerts', color: 'bg-blue-500' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => onChange(item.id, !data[item.id])}
              className={`p-6 rounded-3xl border-2 transition-all text-left group ${data[item.id] ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-100 bg-transparent opacity-60'}`}
            >
              <div className={`w-3 h-3 rounded-full ${item.color} mb-4 shadow-lg ${data[item.id] ? 'animate-pulse' : ''}`} />
              <p className="font-black text-slate-900 uppercase tracking-tight">{item.level}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <Volume2 className="w-6 h-6 text-blue-600" />
            <h4 className="font-headline font-black uppercase tracking-tight text-slate-900">Signal Audio</h4>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => onChange('sirens', !data.sirens)}>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Emergency Sirens</span>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${data.sirens ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <motion.div 
                  animate={{ x: data.sirens ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </div>
            </div>
            {/* Additional dummy toggles */}
            <div className="flex items-center justify-between opacity-50">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Push-to-Talk Beeps</span>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <Radio className="w-6 h-6 text-emerald-500" />
            <h4 className="font-headline font-black uppercase tracking-tight text-slate-900">Relay Frequency</h4>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Polling Interval</label>
            <select 
              value={data.radius}
              onChange={(e) => onChange('radius', e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl py-4 px-6 font-bold text-slate-900 outline-none"
            >
              <option>Real-time (High Battery)</option>
              <option>Every 5 Minutes (Standard)</option>
              <option>Every 15 Minutes (Eco)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsSection;
