import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, AlertTriangle, Package, Users, BarChart2, Settings, ShieldAlert, Radio,
  Activity, Info, LifeBuoy, ZapOff
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  // Removed Dashboard, keeping Live Map as primary Hub
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ShieldAlert },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'Alerts', path: '/sos', icon: AlertTriangle, badge: 12 },
    { name: 'Report Disaster', path: '/report', icon: Radio },
    { name: 'Resources', path: '/resources', icon: Package },
    { name: 'Rescue Teams', path: '/admin', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const bottomItems = [
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'System Status', path: '/status', icon: Info },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-[#0c0c0e] border-r border-[#29292e] z-[2001] transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col font-sans`}
    >
      {/* Brand Header */}
      <div className="h-24 flex items-center px-6 border-b border-[#29292e] shrink-0">
        <div className="bg-[#4182f9] p-2 rounded-lg flex items-center justify-center shadow-[0_0_15px_#4182f944]">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        {isOpen && (
          <div className="ml-3 flex flex-col">
            <span className="font-black text-lg tracking-tight text-white leading-none uppercase">STRAT-COM</span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1.5 opacity-60">Tactical Control</span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#1b1b1f] border border-[#29292e] text-white shadow-xl shadow-black/40' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#4182f9]' : 'group-hover:text-white'}`} />
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </div>
              {isOpen && item.badge && !isActive && (
                <span className="bg-[#4182f9]/20 text-[#4182f9] py-0.5 px-2 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  {item.badge}
                </span>
              )}
              {isActive && (
                 <div className="w-1.5 h-1.5 rounded-full bg-[#4182f9] shadow-[0_0_10px_#4182f9]"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-8 space-y-6 border-t border-[#29292e]">
        <Link to="/sos" className="w-full flex items-center justify-center gap-2 py-4.5 bg-[#4182f9] hover:bg-white hover:text-[#0c0c0e] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 shadow-[#4182f9]/20">
           <ZapOff className="w-4 h-4" />
           {isOpen && "Immediate action"}
        </Link>

        <div className="space-y-2">
           {bottomItems.map((item) => (
             <Link key={item.name} to={item.path} className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white transition-colors group">
                <item.icon className="w-4 h-4 group-hover:text-blue-400" />
                {isOpen && <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>}
             </Link>
           ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
