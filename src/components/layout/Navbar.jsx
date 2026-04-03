import React from 'react';
import { Bell, Menu, Search, Globe, Moon, Radio, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ toggleSidebar }) => {
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
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search locations, disasters, or teams..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
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
          <button className="bg-tertiary-500 hover:bg-tertiary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Radio className="w-4 h-4" />
            <span className="hidden sm:inline">Send Alert</span>
          </button>
          <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
