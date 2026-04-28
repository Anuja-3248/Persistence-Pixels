import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { notificationService } from '../../services/notificationService';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('disasterx_user') || '{}');
      const data = await notificationService.getNotifications(
        storedUser.uid || storedUser.id || 'ID-01',
        storedUser.location || 'Mumbai, India'
      );
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Polling simulation (every 30 seconds)
    const interval = setInterval(fetchNotifications, 30000);
    
    // Click outside handler
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRead = async (id) => {
    await notificationService.markAsRead(id);
    fetchNotifications();
  };

  const handleReadAll = async () => {
    const storedUser = JSON.parse(localStorage.getItem('disasterx_user') || '{}');
    await notificationService.markAllAsRead(storedUser.uid || storedUser.id || 'ID-01');
    fetchNotifications();
  };

  const handleClear = async () => {
    const storedUser = JSON.parse(localStorage.getItem('disasterx_user') || '{}');
    await notificationService.clearAll(storedUser.uid || storedUser.id || 'ID-01');
    fetchNotifications();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          console.log('Bell clicked - isOpen:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className={`p-3 rounded-2xl transition-all relative group ${
          isOpen 
            ? 'bg-neon-blue text-dark-900 shadow-[0_0_25px_rgba(80,215,255,0.6)]' 
            : 'text-neutral-500 dark:text-white hover:text-neon-blue hover:bg-white/10'
        } border border-white/5`}
      >
        <Bell className={`w-7 h-7 transition-all duration-300 ${isOpen ? 'scale-110' : 'group-hover:rotate-12 group-hover:scale-110'}`} />
        
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-neon-red border-2 border-dark-900 flex items-center justify-center text-[9px] font-black text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <NotificationDropdown 
            notifications={notifications}
            onRead={handleRead}
            onReadAll={handleReadAll}
            onClear={handleClear}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
