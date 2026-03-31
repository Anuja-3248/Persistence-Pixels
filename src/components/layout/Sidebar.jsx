import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Map, AlertTriangle, LayoutDashboard, 
  BookOpen, LogIn, Settings, User, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', path: '/', icon: Shield },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'S.O.S Emergency', path: '/sos', icon: AlertTriangle, color: 'text-neon-red' },
    { name: 'AI Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Admin Panel', path: '/admin', icon: Settings },
    { name: 'Login / Register', path: '/auth', icon: LogIn },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full glass-dark z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} border-r border-white/10`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Shield className="w-8 h-8 text-neon-blue shrink-0" />
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 text-lg font-black tracking-tighter whitespace-nowrap"
            >
              DISASTER <span className="text-neon-red">X</span>
            </motion.span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all group relative ${
                  isActive 
                    ? 'bg-neon-blue/20 border border-neon-blue/30 text-neon-blue shadow-[0_0_15px_rgba(80,215,255,0.1)]' 
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-6 h-6 shrink-0 ${item.color || ''} group-hover:scale-110 transition-transform`} />
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-4 font-semibold whitespace-nowrap overflow-hidden"
                  >
                    {item.name}
                  </motion.span>
                )}
                {!isOpen && isActive && (
                  <div className="absolute right-0 w-1.5 h-6 bg-neon-blue rounded-l-full shadow-[0_0_10px_rgba(80,215,255,1)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center ${isOpen ? 'px-4' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            {isOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-bold truncate">John Doe</p>
                <p className="text-[10px] text-neon-blue font-bold tracking-widest uppercase">Premium</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
