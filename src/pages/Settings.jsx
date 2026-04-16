import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, User, Bell, Home, Lock, Palette, 
  HelpCircle, LogOut, ChevronRight, Save, CheckCircle, Smartphone
} from 'lucide-react';

// Modular Sections
import ProfileSection from '../components/settings/ProfileSection';
import NotificationsSection from '../components/settings/NotificationsSection';
import EmergencySection from '../components/settings/EmergencySection';
import PrivacySection from '../components/settings/PrivacySection';
import AppearanceSection from '../components/settings/AppearanceSection';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Commander Vance Sterling',
      role: 'Authority (Command)',
      email: 'v.sterling@disasterx-node.gov',
      phone: '+1 (555) 902-1142'
    },
    notifications: {
      critical: true,
      high: true,
      advisory: false,
      radius: 'Every 5 Minutes (Standard)',
      sirens: true
    },
    emergency: {
      sosMessage: 'CRITICAL: Sector Responder Vance Sterling requesting immediate tactical support at current GPS coordinates. Situation unstable.',
      contacts: [
        { name: 'Sarah Miller', role: 'Spouse', initial: 'SM', type: 'Primary Contact' },
        { name: 'Central Dispatch HQ', role: 'Professional', initial: 'HQ', type: 'Sector Response' }
      ]
    },
    appearance: {
      theme: localStorage.getItem('disasterx_theme') || 'light',
      language: 'English (Global Standard)',
      density: 'Standard'
    }
  });

  // Load saved settings on mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('disasterx_global_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('disasterx_global_settings', JSON.stringify(settings));
    // Also save specific keys for external page integration (SOS, Theme)
    localStorage.setItem('disasterx_sos_message', settings.emergency.sosMessage);
    localStorage.setItem('disasterx_theme', settings.appearance.theme);
    localStorage.setItem('disasterx_emergency_contacts', JSON.stringify(settings.emergency.contacts));
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'emergency', icon: Home, label: 'Emergency' },
    { id: 'privacy', icon: Lock, label: 'Privacy' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
  ];

  const renderSection = () => {
    switch (activeTab) {
      case 'profile': 
        return <ProfileSection data={settings.profile} onChange={(k, v) => updateSettings('profile', k, v)} />;
      case 'notifications': 
        return <NotificationsSection data={settings.notifications} onChange={(k, v) => updateSettings('notifications', k, v)} />;
      case 'emergency': 
        return <EmergencySection data={settings.emergency} onChange={(k, v) => updateSettings('emergency', k, v)} />;
      case 'appearance': 
        return <AppearanceSection data={settings.appearance} onChange={(k, v) => updateSettings('appearance', k, v)} />;
      default: 
        return <ProfileSection data={settings.profile} onChange={(k, v) => updateSettings('profile', k, v)} />;
    }
  };

  const getSectionTitle = () => {
    return navItems.find(item => item.id === activeTab)?.label || 'Profile';
  };

  return (
    <div className="min-h-screen bg-[#f6fafe] text-[#171c1f] font-body flex flex-col selection:bg-blue-100 selection:text-blue-900 transition-colors duration-500">
      {/* CSS Overrides for fonts and scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');
        .font-headline { font-family: 'Space Grotesk', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Top Header */}
      <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-6 py-3 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#0052cc] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <ShieldAlert className="w-6 h-6" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-blue-900 tracking-tighter font-headline uppercase">Aegis Sentinel</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-500 hover:bg-slate-100 transition-colors p-2 rounded-full">
              <Bell className="w-5 h-5" />
            </button>
            <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none">Commander Vance</p>
              <p className="text-xs text-slate-500 leading-none mt-1">Sector 7 Node</p>
            </div>
            <img 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-600/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5zuzi3oS7092VNErZjwQYaGXuGztXtRMbBxN5pcrEQPKOWyfEcn4twR7qo2265evmnOM1FlivtkpRGteEuiu_cJdtijCKQxT1jjsus3OIj-obx1a8ZxdMbElQu4Dh0EAqPf5AHG0c503t7zyT-oy9JVL5zXIQ_jRm49bDyRW2mdUPTNXPlAxCI2LxcXrz1jnoLG4Od7il5Wc9629oc5PYk3dBv5KsW7ao6gJmZTWHXgcgtdp7EWTW8Xqz6LVn4BUL5TG1R0UXCwYB"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Side Settings Navigation */}
        <aside className="bg-slate-50 h-screen w-64 fixed left-0 top-0 pt-20 flex flex-col p-4 gap-2 z-40 hidden md:flex border-r border-slate-200">
          <div className="mb-6 px-4 text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tactical Command</p>
            <h2 className="text-lg font-headline font-bold text-blue-900">Aegis Command</h2>
          </div>
          <nav className="flex-1 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-100 scale-[1.02]' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" fill={activeTab === item.id ? "currentColor" : "none"} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-auto border-t border-slate-200 pt-4 flex flex-col gap-1">
            <button className="w-full bg-gradient-to-r from-[#ad2c00] to-[#a33500] text-white py-3 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all">
              Initiate Alert
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors text-left border-none bg-transparent">
              <HelpCircle className="w-5 h-5" />
              <span className="font-bold">Support</span>
            </button>
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-bold">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Settings Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-y-auto no-scrollbar bg-[#f6fafe]">
          <div className="max-w-4xl mx-auto pb-24">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em] text-left">
                  <span>Settings</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-blue-600">{getSectionTitle()} Configuration</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight text-left italic uppercase">
                   {getSectionTitle()}
                </h1>
              </div>
              <button 
                onClick={handleSave}
                className="bg-gradient-to-br from-[#003d9b] to-[#0052cc] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.1em] text-xs shadow-xl shadow-blue-600/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            {/* Dynamic Content Sections */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contextual FAB (Mobile) */}
          <div className="fixed bottom-24 right-6 md:hidden z-50">
             <button 
               onClick={handleSave}
               className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center"
             >
                <Save className="w-8 h-8" />
             </button>
          </div>
        </main>
      </div>

      {/* Persistence Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/10"
          >
            <div className="bg-emerald-500 rounded-full p-1">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest italic">Tactical configurations synced successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-4 z-50">
        {navItems.slice(0, 4).map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 bg-transparent border-none ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <item.icon className="w-6 h-6" fill={activeTab === item.id ? "currentColor" : "none"} />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
        <button 
          onClick={() => setActiveTab('appearance')}
          className={`flex flex-col items-center gap-1 bg-transparent border-none ${activeTab === 'appearance' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Palette className="w-6 h-6" fill={activeTab === 'appearance' ? "currentColor" : "none"} />
          <span className="text-[10px] font-black uppercase tracking-widest">UI</span>
        </button>
      </nav>
    </div>
  );
};

export default Settings;
