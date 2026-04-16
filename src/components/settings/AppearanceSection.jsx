import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Layout, Type } from 'lucide-react';

const AppearanceSection = ({ data, onChange }) => {
  const applyTheme = (newTheme) => {
    onChange('theme', newTheme);
    // Theme applies immediately for visual feedback
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Dispatch event for global listeners (App.jsx)
    window.dispatchEvent(new CustomEvent('disasterx-theme-change', { detail: newTheme }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Theme Selection */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">Visual Interface Theme</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => applyTheme('light')}
            className={`p-8 rounded-[2rem] border-4 transition-all text-left flex items-start gap-6 group ${data.theme === 'light' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 bg-transparent opacity-60 hover:opacity-100'}`}
          >
            <div className={`p-4 rounded-2xl ${data.theme === 'light' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-blue-600'}`}>
              <Sun className="w-8 h-8" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Nexus Light</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">High-clarity operative interface</p>
            </div>
          </button>

          <button 
            onClick={() => applyTheme('dark')}
            className={`p-8 rounded-[2rem] border-4 transition-all text-left flex items-start gap-6 group ${data.theme === 'dark' ? 'border-blue-600 bg-blue-600/5' : 'border-slate-50 bg-transparent opacity-60 hover:opacity-100'}`}
          >
            <div className={`p-4 rounded-2xl ${data.theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-blue-600'}`}>
              <Moon className="w-8 h-8" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Tactical Dark</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Low-light optimized response environment</p>
            </div>
          </button>
        </div>
      </div>

      {/* Additional UI Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <Layout className="w-6 h-6 text-blue-600" />
            <h4 className="font-headline font-black uppercase tracking-tight text-slate-900">Interface Scale</h4>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => onChange('density', data.density === 'Condensed' ? 'Standard' : 'Condensed')}>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Condensed View</span>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${data.density === 'Condensed' ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <motion.div 
                  animate={{ x: data.density === 'Condensed' ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Animations Enabled</span>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-premium dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <Type className="w-6 h-6 text-blue-600" />
            <h4 className="font-headline font-black uppercase tracking-tight text-slate-900 dark:text-white">Language Pack</h4>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation Standard</label>
            <select 
              value={data.language}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl py-4 px-6 font-bold text-slate-900 outline-none"
            >
              <option>English (Global Standard)</option>
              <option>Hindi (Regional Pack)</option>
              <option>Marathi (Regional Pack)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppearanceSection;
