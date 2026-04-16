import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, Palette, Save, CheckCircle,
  ChevronRight, Lock, Globe, Smartphone, AlertTriangle, Trash2
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'emergency', label: 'Emergency', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all';

const labelClass =
  'block text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    role: 'Responder',
    email: '',
    phone: '',
  });

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    highAlerts: true,
    advisoryAlerts: false,
    sosUpdates: true,
    systemStatus: false,
  });

  const [emergency, setEmergency] = useState({
    sosMessage: '',
    contactName: '',
    contactPhone: '',
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    density: 'comfortable',
  });

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const p = localStorage.getItem('dx_profile');
    const n = localStorage.getItem('dx_notifications');
    const e = localStorage.getItem('dx_emergency');
    const a = localStorage.getItem('dx_appearance');
    if (p) setProfile(JSON.parse(p));
    if (n) setNotifications(JSON.parse(n));
    if (e) setEmergency(JSON.parse(e));
    if (a) setAppearance(JSON.parse(a));
  }, []);

  const handleSave = () => {
    localStorage.setItem('dx_profile', JSON.stringify(profile));
    localStorage.setItem('dx_notifications', JSON.stringify(notifications));
    localStorage.setItem('dx_emergency', JSON.stringify(emergency));
    localStorage.setItem('dx_appearance', JSON.stringify(appearance));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)]' : 'bg-white/10'}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className={labelClass}>Operational Role</label>
          <select
            className={inputClass}
            value={profile.role}
            onChange={e => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="Responder" className="bg-[#0C0B1B]">Responder</option>
            <option value="Team Leader" className="bg-[#0C0B1B]">Team Leader</option>
            <option value="Coordinator" className="bg-[#0C0B1B]">Coordinator</option>
            <option value="Observer" className="bg-[#0C0B1B]">Observer</option>
            <option value="Admin" className="bg-[#0C0B1B]">Admin</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            className={inputClass}
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            className={inputClass}
            value={profile.phone}
            onChange={e => setProfile({ ...profile, phone: e.target.value })}
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div className="border-t border-white/5 pt-6">
        <p className={labelClass}>Security</p>
        <button className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all">
          <Lock className="w-4 h-4 text-red-400" />
          Change Password
          <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {[
        { key: 'criticalAlerts', label: 'Critical Alerts', sub: 'Immediate life-threatening emergencies' },
        { key: 'highAlerts', label: 'High Priority Alerts', sub: 'Severe but non-immediate events' },
        { key: 'advisoryAlerts', label: 'Advisory Alerts', sub: 'Situational awareness updates' },
        { key: 'sosUpdates', label: 'SOS Status Updates', sub: 'Updates when SOS requests are handled' },
        { key: 'systemStatus', label: 'System Status', sub: 'Platform uptime and maintenance notices' },
      ].map(({ key, label, sub }) => (
        <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
          <div>
            <p className="text-sm font-black text-white uppercase tracking-wider">{label}</p>
            <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-widest">{sub}</p>
          </div>
          <Toggle
            checked={notifications[key]}
            onChange={val => setNotifications({ ...notifications, [key]: val })}
          />
        </div>
      ))}
    </div>
  );

  const renderEmergency = () => (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
        <p className="text-[11px] font-bold text-red-300 uppercase tracking-wider leading-relaxed">
          This information is used when you send an SOS signal. Keep it accurate and up to date.
        </p>
      </div>

      <div>
        <label className={labelClass}>Custom SOS Message</label>
        <textarea
          className={`${inputClass} h-28 resize-none`}
          value={emergency.sosMessage}
          onChange={e => setEmergency({ ...emergency, sosMessage: e.target.value })}
          placeholder="e.g. I am trapped and need immediate assistance at my GPS location."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Emergency Contact Name</label>
          <input
            className={inputClass}
            value={emergency.contactName}
            onChange={e => setEmergency({ ...emergency, contactName: e.target.value })}
            placeholder="Contact full name"
          />
        </div>
        <div>
          <label className={labelClass}>Emergency Contact Phone</label>
          <input
            type="tel"
            className={inputClass}
            value={emergency.contactPhone}
            onChange={e => setEmergency({ ...emergency, contactPhone: e.target.value })}
            placeholder="+91 00000 00000"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-8">
      <div>
        <label className={labelClass}>Theme</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            { val: 'dark', label: 'Tactical Dark', sub: 'Dark background, red accents' },
            { val: 'light', label: 'Nexus Light', sub: 'Light background, blue accents' },
          ].map(({ val, label, sub }) => (
            <button
              key={val}
              onClick={() => setAppearance({ ...appearance, theme: val })}
              className={`p-5 rounded-2xl border text-left transition-all ${
                appearance.theme === val
                  ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(220,38,38,0.1)]'
                  : 'border-white/5 bg-white/[0.03] hover:border-white/10'
              }`}
            >
              <p className="text-sm font-black text-white uppercase tracking-wider">{label}</p>
              <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">{sub}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Layout Density</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {['compact', 'comfortable', 'spacious'].map((d) => (
            <button
              key={d}
              onClick={() => setAppearance({ ...appearance, density: d })}
              className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                appearance.density === d
                  ? 'border-red-500/50 bg-red-500/10 text-red-400'
                  : 'border-white/5 bg-white/[0.03] text-slate-500 hover:border-white/10 hover:text-slate-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Language</label>
        <select className={inputClass}>
          <option className="bg-[#0C0B1B]">English (Global Standard)</option>
          <option className="bg-[#0C0B1B]">Hindi</option>
          <option className="bg-[#0C0B1B]">Marathi</option>
        </select>
      </div>
    </div>
  );

  const sectionContent = {
    profile: renderProfile,
    notifications: renderNotifications,
    emergency: renderEmergency,
    appearance: renderAppearance,
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-[#060b13] text-white font-body"
    >
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-400 mb-2">
              System Configuration
            </p>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
              Settings
            </h1>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/30 hover:scale-[1.02] active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab Nav */}
          <nav className="flex md:flex-col gap-2 flex-wrap md:w-48 shrink-0">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left w-full text-[10px] font-black uppercase tracking-widest ${
                  activeTab === id
                    ? 'bg-red-600/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.08)]'
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 glass-dark rounded-3xl border border-white/5 p-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
              {activeTabData && (
                <>
                  <activeTabData.icon className="w-5 h-5 text-red-400" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                    {activeTabData.label} Configuration
                  </h2>
                </>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {sectionContent[activeTab]?.()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Save Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[999] bg-[#0C1A0C] border border-emerald-500/30 text-emerald-400 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Settings saved successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Settings;
