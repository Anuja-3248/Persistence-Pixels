<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Bell, Menu, Search, Globe, Moon, Radio, ShieldAlert, User, LogOut } from 'lucide-react';
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

=======
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Search, Globe, Moon, Radio, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ toggleSidebar }) => {
>>>>>>> 849247728b38486012928a87a3e626f14224a596
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-tertiary-500 p-1.5 rounded-md">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-neutral-900 hidden sm:block">Aegis Response</span>
          </div>
        </div>

        {/* Search Bar */}
<<<<<<< HEAD
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
=======
        <div className="hidden md:flex flex-1 max-w-md mx-6">
>>>>>>> 849247728b38486012928a87a3e626f14224a596
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
<<<<<<< HEAD
              placeholder="Search neural sectors..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-md text-xs font-bold uppercase tracking-widest placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:border-transparent transition-all"
=======
              placeholder="Search locations, disasters, or teams..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
>>>>>>> 849247728b38486012928a87a3e626f14224a596
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
<<<<<<< HEAD
          <div className="hidden sm:flex items-center gap-3">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors" title="Language">
              <Globe className="w-5 h-5" />
            </button>
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors" title="Dark Mode">
              <Moon className="w-5 h-5" />
            </button>
            <div className="relative">
              <button className="text-neutral-500 hover:text-neutral-900 relative transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-tertiary-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
          
          <div className="h-8 w-px bg-neutral-200 mx-2 hidden lg:block"></div>

          <Link to="/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden lg:block">
              <p className="text-[10px] font-black text-neutral-900 leading-none mb-1 uppercase tracking-tighter">{userData?.name || 'OPERATOR'}</p>
              <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{userData?.node || 'SEC_NODE_7G'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl border border-neutral-200 overflow-hidden cursor-pointer group-hover:border-tertiary-500 transition-colors shadow-sm">
              <img 
                src={`https://ui-avatars.com/api/?name=${userData?.name || 'DR'}&background=6366f1&color=fff&bold=true`} 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <button onClick={handleSignOut} className="lg:flex hidden bg-tertiary-500 hover:bg-tertiary-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all items-center gap-2 shadow-sm shadow-tertiary-500/20 active:scale-95">
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
=======
          <button className="text-neutral-500 hover:text-neutral-900 hidden sm:block transition-colors" title="Language">
            <Globe className="w-5 h-5" />
          </button>
          <button className="text-neutral-500 hover:text-neutral-900 hidden sm:block transition-colors" title="Dark Mode">
            <Moon className="w-5 h-5" />
          </button>
          <div className="relative">
            <button className="text-neutral-500 hover:text-neutral-900 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-tertiary-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
          <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
          <Link
            to="/report"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-base font-black transition-all flex items-center gap-2 shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 relative"
          >
            <span className="text-lg leading-none">⚠️</span>
            <span className="hidden sm:inline">Report Disaster</span>
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-pulse" />
          </Link>
          <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden cursor-pointer ml-2">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
>>>>>>> 849247728b38486012928a87a3e626f14224a596
        </div>
      </div>
    </header>
  );
};

export default Navbar;
