import React from 'react';
import { 
  ShieldAlert, MapPin, Building2, LifeBuoy, 
  Bell, CheckCircle2, Clock, ChevronRight,
  AlertTriangle, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationCard = ({ notification, onRead }) => {
  const { type, title, description, createdAt, isRead, priority, isVerified } = notification;

  const getIcon = () => {
    switch (type) {
      case 'emergency': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'location': return <MapPin className="w-5 h-5 text-yellow-500" />;
      case 'authority': return <Building2 className="w-5 h-5 text-blue-500" />;
      case 'rescue': return <LifeBuoy className="w-5 h-5 text-emerald-500" />;
      default: return <Bell className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return past.toLocaleDateString();
  };

  const getPriorityClasses = () => {
    if (priority === 'high') return 'bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
    if (!isRead) return 'bg-white dark:bg-white/5 border-neutral-200 dark:border-strat-border';
    return 'bg-neutral-50 dark:bg-white/[0.02] border-transparent opacity-75';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative group p-4 rounded-xl border transition-all duration-300 ${getPriorityClasses()}`}
    >
      <div className="flex gap-4">
        {/* Icon Section */}
        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          priority === 'high' ? 'bg-red-500/20' : 'bg-neutral-100 dark:bg-white/10'
        }`}>
          {getIcon()}
          
          {!isRead && (
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
             </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`text-sm font-bold truncate ${isRead ? 'text-neutral-600 dark:text-neutral-400' : 'text-neutral-900 dark:text-white'}`}>
              {title}
            </h4>
            {isVerified && (
              <div className="flex items-center bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded text-[8px] font-black text-blue-500 uppercase tracking-tighter">
                Verified
              </div>
            )}
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-strat-text-sub line-clamp-2 mb-3 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 dark:text-slate-600 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {getTimeAgo(createdAt)}
              </span>
              {!isRead && (
                <span className="text-red-500 font-black">NEW SIGNAL</span>
              )}
            </div>
            
            <button 
              onClick={() => onRead(notification.id)}
              className="text-[10px] font-black text-strat-accent hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              View Details
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Selection Border Line (Urgent) */}
      {priority === 'high' && (
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-500 rounded-r-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      )}
    </motion.div>
  );
};

export default NotificationCard;
