import React, { useState, useEffect } from 'react';
import { Bell, Menu, Search, Globe, Moon, Radio, ShieldAlert, User, LogOut, Command } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('disasterx_user');
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('disasterx_user');
    navigate('/');
  };

  return (
    <header className="bg-[#0c0c0e] border-b border-[#29292e] sticky top-0 z-[1002] w-full h-20 flex items-center shrink-0">
      <div className="flex items-center justify-between w-full px-8">
        
        {/* Mobile Menu & Search (Left Group) */}
        <div className="flex items-center gap-8 flex-1">
          <button 
            onClick={toggleSidebar}
            className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden xl:flex items-center gap-3 bg-[#1b1b1f] border border-[#29292e] rounded-xl px-4 py-2.5 w-full max-w-md group focus-within:border-[#4182f9] transition-all">
            <Search className="w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Query Sentinel Nodes..." 
              className="bg-transparent border-none text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Tactical Actions (Right Group) */}
        <div className="flex items-center gap-10">
          
          {/* Quick Stats Overlay */}
          <div className="hidden lg:flex items-center gap-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 border-r border-[#29292e] pr-10">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                <span>Sync Stable</span>
             </div>
             <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-blue-500" />
                <span>Sector A-7</span>
             </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative cursor-pointer group">
              <Bell className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0c0c0e]"></div>
            </div>

            <Link to="/profile" className="flex items-center gap-4 bg-[#1b1b1f] border border-[#29292e] px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all group">
               <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-500 mb-0.5 uppercase tracking-widest">{userData?.node || 'S_NODE_09'}</p>
                  <p className="text-xs font-black text-white whitespace-nowrap uppercase tracking-tighter">{userData?.name || 'OPERATOR'}</p>
               </div>
               <div className="w-9 h-9 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#4182f9]">
                  <User className="w-5 h-5 text-white" />
               </div>
            </Link>

            <button onClick={handleSignOut} className="py-3 px-6 bg-red-600/10 border border-red-500/20 text-red-500 hover:bg-red-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95">
               Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
