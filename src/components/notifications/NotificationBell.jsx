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
        className={`p-2.5 rounded-xl transition-all relative group ${
          isOpen 
            ? 'bg-strat-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
            : 'text-neutral-500 dark:text-strat-text-sub hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
        }`}
      >
        <Bell className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:rotate-12'}`} />
        
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white dark:border-strat-panel flex items-center justify-center text-[7px] font-black text-white">
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
