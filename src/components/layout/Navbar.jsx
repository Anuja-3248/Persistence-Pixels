import React, { useState, useEffect } from 'react';
import { 
  Bell, Menu, Search, Globe, Moon, Sun, 
  Radio, ShieldAlert, User, LogOut, Command, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from '../notifications/NotificationBell';

import logoImg from '../../assets/website-logo.png';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('disasterx_theme') || 'dark');

  useEffect(() => {
    const storedUser = localStorage.getItem('disasterx_user');
    if (storedUser) setUserData(JSON.parse(storedUser));
    
    // Initial theme sync
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for theme changes from Settings
    const handleThemeEvent = (e) => {
      setTheme(e.detail);
    };
    window.addEventListener('disasterx-theme-change', handleThemeEvent);
    return () => window.removeEventListener('disasterx-theme-change', handleThemeEvent);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('disasterx_theme', newTheme);
    window.dispatchEvent(new CustomEvent('disasterx-theme-change', { detail: newTheme }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('disasterx_user');
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-strat-panel border-b border-neutral-200 dark:border-strat-border sticky top-0 z-50 w-full transition-colors duration-300 h-16">
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-neutral-500 dark:text-strat-text-sub hover:text-neutral-900 dark:hover:text-white transition-colors p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
              <img src={logoImg} alt="DisasterX" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-tighter text-neutral-900 dark:text-white leading-none uppercase">Disaster <span className="text-red-600">X</span></span>
              <span className="text-[8px] font-black text-neutral-400 dark:text-strat-text-sub tracking-[0.2em] uppercase leading-none mt-1">Strategic Response Node</span>
            </div>
          </Link>
        </div>

        {/* Tactical Search */}
        <div className="hidden md:flex flex-1 max-w-sm mx-10">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-strat-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Query Sentinel Nodes..." 
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 dark:bg-white/5 border border-transparent dark:border-strat-border rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-strat-accent/50 transition-all dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Tactical Stats (Desktop) */}
          <div className="hidden xl:flex items-center gap-6 font-black text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-strat-text-sub border-r border-neutral-200 dark:border-strat-border pr-6">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                <span>Sync Stable</span>
             </div>
             <div className="flex items-center gap-2">
                <Command className="w-3 h-3 text-strat-accent" />
                <span>Sector A-7</span>
             </div>
          </div>

          {/* Theme & Notifications */}
          <div className="flex items-center gap-1 md:gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-neutral-500 dark:text-strat-text-sub hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 rounded-xl transition-all" 
              title={theme === 'dark' ? "Nexus Light" : "Tactical Dark"}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <NotificationBell />
          </div>

          {/* Donate Button */}
          <Link
            to="/donation"
            className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Donate Now</span>
          </Link>

          {/* Report Button */}
          <Link
            to="/report"
            className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all items-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Report Disaster</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-neutral-200 dark:border-strat-border">
            <Link to="/profile" className="flex items-center gap-3 group">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] font-black text-neutral-900 dark:text-white leading-none mb-1 uppercase tracking-tighter truncate max-w-[80px]">{userData?.name || 'OPERATOR'}</p>
                <p className="text-[8px] font-black text-neutral-400 dark:text-strat-text-sub uppercase tracking-widest">{userData?.node || 'SEC_NODE_7G'}</p>
              </div>
              <div className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-strat-border overflow-hidden cursor-pointer group-hover:border-strat-accent transition-colors shadow-sm bg-neutral-100 dark:bg-white/10 flex items-center justify-center">
                {userData?.avatar ? (
                  <img src={userData.avatar} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-neutral-400 dark:text-strat-text-sub" />
                )}
              </div>
            </Link>
            
            <button 
              onClick={handleSignOut}
              className="p-2.5 text-neutral-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
