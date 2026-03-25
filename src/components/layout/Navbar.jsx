import React from 'react';
import { Bell, Menu, Search, Filter, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="h-16 fixed top-0 right-0 left-0 bg-dark-900/80 backdrop-blur-lg border-b border-white/5 z-40 px-6 flex items-center justify-between pointer-events-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-white/5 rounded-lg text-slate-400 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-64 focus-within:ring-1 focus-within:ring-neon-blue transition-all">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="bg-transparent border-none text-sm outline-none w-full placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Ticker */}
        <div className="hidden lg:flex items-center bg-neon-red/10 border border-neon-red/30 rounded-full px-4 py-1.5 overflow-hidden w-96 relative">
          <div className="flex items-center animate-[ticker_20s_linear_infinite] whitespace-nowrap">
            <span className="flex items-center text-xs font-bold text-neon-red mr-12 uppercase tracking-wide">
              <span className="w-2 h-2 bg-neon-red rounded-full mr-2 animate-ping" />
              ALERT: Potential Tsunami Warning - Indian Ocean
            </span>
            <span className="flex items-center text-xs font-bold text-neon-yellow mr-12 uppercase tracking-wide">
              <span className="w-2 h-2 bg-neon-yellow rounded-full mr-2" />
              WARNING: Extreme Heat Wave Predicted in Southern Regions
            </span>
            <span className="flex items-center text-xs font-bold text-neon-red mr-12 uppercase tracking-wide">
              <span className="w-2 h-2 bg-neon-red rounded-full mr-2 animate-pulse" />
              URGENT: Evacuation orders in Satara district (Flood Warning)
            </span>
          </div>
        </div>

        <button className="relative p-2 hover:bg-white/5 rounded-full text-slate-400 group">
          <Bell className="w-6 h-6 group-hover:shake transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-neon-red rounded-full border-2 border-dark-900" />
          
          <div className="absolute top-full right-0 mt-4 w-80 glass-dark rounded-2xl shadow-2xl p-4 hidden group-hover:block transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
            <h4 className="font-bold text-sm mb-3">Live Feed Alerts</h4>
            <div className="space-y-3">
              <div className="flex gap-3 p-2 bg-white/5 border border-white/5 rounded-lg">
                <div className="w-2 h-2 bg-neon-red rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Flood Warning Mumbai</p>
                  <p className="text-[10px] text-slate-500">2 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3 p-2 bg-white/5 border border-white/5 rounded-lg opacity-60">
                <div className="w-2 h-2 bg-neon-yellow rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Resupply Status Updated</p>
                  <p className="text-[10px] text-slate-500">45 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </button>

        <div className="w-px h-6 bg-white/10 mx-2" />

        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-bold">Pune Center</span>
          <span className="text-[10px] text-neon-green font-bold tracking-widest uppercase">Operational</span>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(10); }
          100% { transform: translateX(-100%); }
        }
        @keyframes shake {
          0% { transform: rotate(0); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(0); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
