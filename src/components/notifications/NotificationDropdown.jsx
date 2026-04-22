import React, { useState } from 'react';
import { 
  X, CheckCircle2, Trash2, BellRing, 
  AlertCircle, ShieldAlert, History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationCard from './NotificationCard';

const NotificationDropdown = ({ notifications, onRead, onReadAll, onClear, onClose }) => {
  const [activeTab, setActiveTab] = useState('urgent');

  const urgent = notifications.filter(n => n.priority === 'high');
  const important = notifications.filter(n => n.priority === 'medium');
  const general = notifications.filter(n => n.priority === 'low' || !n.priority);

  const tabs = [
    { id: 'urgent', label: 'Urgent', count: urgent.length, icon: ShieldAlert, color: 'text-red-500' },
    { id: 'important', label: 'Important', count: important.length, icon: AlertCircle, color: 'text-yellow-500' },
    { id: 'general', label: 'General', count: general.length, icon: BellRing, color: 'text-neutral-400' }
  ];

  const getActiveList = () => {
    switch (activeTab) {
      case 'urgent': return urgent;
      case 'important': return important;
      case 'general': return general;
      default: return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-3 w-[420px] bg-white dark:bg-strat-panel border border-neutral-200 dark:border-strat-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-[9999]"
    >
      {/* Header */}
      <div className="p-5 border-b border-neutral-100 dark:border-strat-border bg-neutral-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-strat-accent/10 p-2 rounded-lg">
              <BellRing className="w-5 h-5 text-strat-accent" />
            </div>
            <div>
              <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Tactical Alerts</h3>
              <p className="text-[10px] font-bold text-neutral-400 dark:text-slate-600 uppercase tracking-widest mt-0.5">Response Node Node-7G</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg transition-colors text-neutral-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-neutral-100 dark:bg-white/5 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-strat-accent text-neutral-900 dark:text-white shadow-sm scale-[1.02]' 
                  : 'text-neutral-500 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? '' : tab.color}`} />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${
                  activeTab === tab.id ? 'bg-black/10 dark:bg-white/20' : 'bg-neutral-200 dark:bg-white/10'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[450px] overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-3">
          {getActiveList().length > 0 ? (
            getActiveList().map((notif) => (
              <NotificationCard 
                key={notif.id} 
                notification={notif} 
                onRead={onRead} 
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-neutral-300 dark:text-slate-700" />
              </div>
              <p className="text-xs font-black text-neutral-400 dark:text-slate-600 uppercase tracking-widest">Sector Secure</p>
              <p className="text-[10px] text-neutral-400 dark:text-slate-700 mt-1">No active {activeTab} signals detected.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-100 dark:border-strat-border bg-neutral-50/50 dark:bg-white/[0.02] flex items-center justify-between">
        <button 
          onClick={onReadAll}
          className="flex items-center gap-2 text-[10px] font-black text-neutral-500 dark:text-slate-500 hover:text-strat-accent transition-colors uppercase tracking-widest"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Mark all as read
        </button>
        <button 
          onClick={onClear}
          className="flex items-center gap-2 text-[10px] font-black text-neutral-500 dark:text-slate-500 hover:text-red-500 transition-colors uppercase tracking-widest"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear all
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
