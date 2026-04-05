import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, AlertTriangle, Package, Users, BarChart2, Settings, ShieldAlert, Radio
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'Alerts', path: '/sos', icon: AlertTriangle, badge: 12 },
    { name: 'Resources', path: '/resources', icon: Package },
    { name: 'Rescue Teams', path: '/admin', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const reportItem = { name: 'Report Disaster', path: '/report', icon: Radio };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white border-r border-neutral-200 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}
    >
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 shrink-0">
        <div className="bg-tertiary-500 p-1.5 rounded-md min-w-[32px]">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 font-heading font-bold text-lg tracking-tight text-neutral-900"
          >
            Aegis Response
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-md font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </div>
              {isOpen && item.badge && (
                <span className="bg-tertiary-100 text-tertiary-700 py-0.5 px-2 rounded-full text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <div className={`bg-neutral-100 p-4 rounded-lg overflow-hidden ${!isOpen ? 'text-center p-2' : ''}`}>
          {isOpen ? (
            <>
              <h4 className="font-heading font-semibold text-sm text-neutral-900 mb-1">System Status</h4>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Operational
              </div>
            </>
          ) : (
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse"></span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
