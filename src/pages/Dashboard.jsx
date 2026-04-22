import React, { useState, useEffect } from 'react';
import { 
  Shield, Map as MapIcon, 
  AlertCircle, ChevronRight, BookOpen, 
  Radio, Settings, MessageSquare,
  LayoutDashboard, Bell, Navigation, Moon, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import NotificationBell from '../components/notifications/NotificationBell';

import logoImg from '../assets/website-logo.png';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(() => {
    const localUser = JSON.parse(localStorage.getItem('disasterx_user') || '{}');
    if (localUser.name) {
      return {
        name: localUser.name,
        initial: localUser.name.charAt(0).toUpperCase()
      };
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const featureBoxes = [
    {
      id: 'live-map',
      title: 'LIVE MAP',
      description: 'View real-time tactical map with live disaster tracking and sector monitoring.',
      icon: Navigation,
      color: '#00CFBD', // Cyan/Teal
      path: '/map',
      gradient: 'from-[#00CFBD] to-[#008B7F]'
    },
    {
      id: 'alerts',
      title: 'ALERTS & SOS',
      description: 'Critical emergency alerts and immediate SOS broadcast for priority response.',
      icon: AlertCircle,
      color: '#FF4D4D', // Red
      path: '/sos',
      badge: 'SOS ACTIVE',
      gradient: 'from-[#FF4D4D] to-[#B91C1C]'
    },
    {
      id: 'report',
      title: 'REPORT DISASTER',
      description: 'Contribution to global safety by reporting local disasters and field needs.',
      icon: Radio,
      color: '#F97316', // Orange
      path: '/report',
      gradient: 'from-[#F97316] to-[#C2410C]'
    },
    {
      id: 'resources',
      title: 'RESOURCES',
      description: 'Official database of hospitals, shelters, and critical relief centers.',
      icon: BookOpen,
      color: '#3B82F6', // Blue
      path: '/resources',
      gradient: 'from-[#3B82F6] to-[#1E40AF]'
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      description: 'Manage tactical preferences, responder credentials, and system configuration.',
      icon: Settings,
      color: '#A855F7', // Purple
      path: '/settings',
      gradient: 'from-[#A855F7] to-[#7E22CE]'
    },
    {
      id: 'chatbot',
      title: 'ASK KAVACH',
      description: 'Get instant AI guidance for emergency protocols and disaster intelligence.',
      icon: MessageSquare,
      color: '#EC4899', // Pink
      path: '#',
      gradient: 'from-[#EC4899] to-[#BE185D]'
    }
  ];

  // Mouse tracking for Cursor Glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Auth Listener
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Try localStorage first for immediate high-fidelity result
        const localUser = JSON.parse(localStorage.getItem('disasterx_user') || '{}');
        
        // Try to get more info from Firestore if needed
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        setUserProfile({
          name: localUser.name || (userDoc.exists() ? userDoc.data().name : (user.displayName || user.email.split('@')[0])),
          initial: (localUser.name ? localUser.name.charAt(0) : (userDoc.exists() ? userDoc.data().name.charAt(0) : (user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)))).toUpperCase()
        });
      }
      setLoading(false);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* --- CURSOR FOLLOW GLOW --- */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.06), transparent 40%)`
        }}
      />

      {/* --- TACTICAL GRID BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* PROFILE TAB (Top Right) */}
      <div className="absolute top-8 right-8 z-[50] flex items-center gap-4">
        {!loading && (
          <>
            <NotificationBell />
            <Link to="/profile" className="flex items-center gap-4 bg-[#11111a]/80 border border-white/10 pl-5 pr-3 py-2.5 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group backdrop-blur-md hover:scale-105 active:scale-95 shadow-xl">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-400 uppercase leading-none mb-1.5 group-hover:text-white transition-colors">
                {userProfile?.name || 'Guest User'}
              </p>
              <p className="text-[11px] font-black text-neon-green uppercase tracking-widest leading-none">Status: Online</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400/50 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/30 text-white">
              {userProfile?.initial || '?'}
            </div>
            </Link>
          </>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-8 py-20 relative">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- HEADER --- */}
        <header className="mb-10 relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <Link to="/" className="w-12 h-12 rounded-xl overflow-hidden hover:scale-110 transition-all cursor-pointer group">
               <img src={logoImg} alt="DisasterX" className="w-full h-full object-contain" />
            </Link>
            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase">Dashboard Overview</h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl font-medium">Select a tool below to coordinate disaster response and manage mission-critical intelligence.</p>
        </header>


        {/* --- FEATURE BOXES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureBoxes.map((box, idx) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
                <Link
                to={box.path}
                onClick={(e) => {
                  if (box.id === 'chatbot') {
                    e.preventDefault();
                    window.dispatchEvent(new Event('open-kavach'));
                  }
                }}
                className="block h-full bg-[#0d0d12] border-2 rounded-[40px] p-10 flex flex-col items-start transition-all hover:translate-y-[-10px] group relative overflow-hidden"
                style={{ 
                   borderColor: `${box.color}AA`,
                   boxShadow: `0 20px 40px -20px ${box.color}88`
                }}
              >
                {/* Gradient Border Glow (Simulated) */}
                <div 
                  className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    border: `2px solid ${box.color}`,
                    borderRadius: '40px',
                    filter: 'blur(1px)'
                  }}
                />

                <div className="w-full flex justify-between items-start mb-12">
                  <div 
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:scale-110 shadow-lg"
                    style={{ borderColor: `${box.color}44`, backgroundColor: `${box.color}11` }}
                  >
                    <box.icon 
                      className="w-10 h-10" 
                      style={{ color: box.color, filter: `drop-shadow(0 0 10px ${box.color}CC)` }} 
                    />
                  </div>
                  {box.badge && (
                    <span className="text-[10px] font-black bg-red-500/20 text-red-500 px-5 py-2 rounded-full border border-red-500/30 tracking-[0.2em] shadow-lg shadow-red-500/10">
                      {box.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-bold mb-5 tracking-tight uppercase group-hover:text-white transition-colors">
                  {box.title}
                </h3>
                
                <p className="text-gray-400 text-base leading-relaxed mb-12 flex-1 font-medium">
                  {box.description}
                </p>

                <div 
                  className="flex items-center justify-center w-full py-5 bg-white/5 border border-white/10 rounded-[24px] text-[12px] font-black uppercase tracking-[0.2em] transition-all group-hover:bg-white/10 group-hover:border-white/20 group-active:scale-95 text-gray-400 group-hover:text-white shadow-xl"
                >
                  Access Feature <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Cyber Glow Accent - More Pronounced */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none rounded-b-[40px]"
                  style={{ 
                    background: `linear-gradient(to top, ${box.color}, transparent)`,
                    filter: 'blur(60px)'
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </div>


      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
