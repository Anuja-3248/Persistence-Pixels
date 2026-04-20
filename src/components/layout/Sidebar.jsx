import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, AlertTriangle, Package, Users, BarChart2, Settings, ShieldAlert, Radio,
  Activity, Info, LifeBuoy, ZapOff, Crosshair
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ShieldAlert },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'SOS Alerts', path: '/sos', icon: AlertTriangle, badge: 12 },
    { name: 'Resources', path: '/resources', icon: Package },
    { name: 'Rescue Teams', path: '/admin', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white dark:bg-strat-panel border-r border-neutral-200 dark:border-strat-border z-[1001] transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col font-sans`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-strat-border shrink-0">
        <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 flex flex-col"
          >
            <span className="font-black text-sm tracking-tight text-neutral-900 dark:text-white leading-none uppercase">DisasterX</span>
            <span className="text-[8px] font-black text-neutral-400 dark:text-strat-text-sub uppercase tracking-[0.2em] mt-1 opacity-60">Strategic Node</span>
          </motion.div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-red-600/5 dark:bg-strat-accent/10 text-red-600 dark:text-strat-accent' 
                  : 'text-neutral-500 dark:text-strat-text-sub hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? (location.pathname === '/tracking' ? 'text-blue-500' : 'text-red-600 dark:text-strat-accent') : 'group-hover:text-red-500 dark:group-hover:text-strat-accent'}`} />
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </div>
              
              {isOpen && item.badge && !isActive && (
                <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 py-0.5 px-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
                  {item.badge}
                </span>
              )}

              {isActive && (
                 <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-6 bg-red-600 dark:bg-strat-accent rounded-r-full" 
                 />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Immediate Action / System Status */}
      <div className="p-4 border-t border-neutral-200 dark:border-strat-border space-y-3">
        {isOpen && (
           <Link 
              to="/sos" 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 shadow-red-500/20"
           >
              <ZapOff className="w-3.5 h-3.5" />
              PRIORITY SOS
           </Link>
        )}
        
        <div className={`bg-neutral-100 dark:bg-white/5 p-4 rounded-xl overflow-hidden border border-transparent dark:border-strat-border ${!isOpen ? 'text-center p-2' : ''}`}>
          {isOpen ? (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-black text-[9px] uppercase tracking-widest text-neutral-400 dark:text-strat-text-sub mb-1">System State</h4>
                <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                  Active
                </div>
              </div>
              <Activity className="w-4 h-4 text-neutral-300 dark:text-strat-text-sub/20" />
            </div>
          ) : (
            <div className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse shadow-[0_0_8px_#10b981]"></div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
