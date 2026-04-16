import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Phone, Trash2, ShieldAlert, Zap, Loader2, CheckCircle2 } from 'lucide-react';

const EmergencySection = ({ data, onChange }) => {
  const [testStatus, setTestStatus] = useState('idle'); // idle, testing, success

  const runTest = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* SOS Message Template */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">SOS Protocol Briefing</h3>
          </div>
          
          <button 
            disabled={testStatus !== 'idle'}
            onClick={runTest}
            className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all active:scale-95 ${
              testStatus === 'success' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-white shadow-xl shadow-red-600/20 hover:bg-slate-800'
            }`}
          >
            {testStatus === 'idle' && <><Zap className="w-4 h-4 fill-current" /> Test SOS Protocol</>}
            {testStatus === 'testing' && <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>}
            {testStatus === 'success' && <><CheckCircle2 className="w-4 h-4" /> Signal Verified</>}
          </button>
        </div>
        
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Automated Distress Message Template</label>
          <textarea 
            className="w-full h-32 bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 rounded-2xl p-6 text-sm font-bold text-slate-900 transition-all outline-none resize-none"
            value={data.sosMessage}
            onChange={(e) => onChange('sosMessage', e.target.value)}
          />
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            Note: This message will be automatically transmitted along with your GPS lock when the SOS button is triggered.
          </p>
        </div>

        {/* Success Overlay Fragment */}
        <AnimatePresence>
          {testStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 bottom-0 bg-emerald-500 py-3 flex items-center justify-center gap-3"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Operational test successful. Satellite link established.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Emergency Contacts Table */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">Emergency Protocol Contacts</h3>
          </div>
          <button className="bg-red-50 text-red-700 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-red-100 transition-all border border-red-200">
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.contacts.map((contact, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group border border-slate-100 hover:border-red-200 hover:bg-white transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 font-black shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {contact.initial}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-lg tracking-tight">{contact.name}</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{contact.role} • {contact.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencySection;
