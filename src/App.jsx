import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Chatbot from './components/Chatbot';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import MapPage from './pages/Map';
import SOS from './pages/SOS';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';
  const isHomePage = location.pathname === '/';

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div key="splash" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}>
            <SplashScreen onComplete={() => setShowSplash(false)} />
          </motion.div>
        ) : isAuthPage ? (
          <motion.div 
            key="auth" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-neutral-900 text-slate-100 font-body"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </motion.div>
        ) : (
          <motion.div 
            key="app" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-background-50 text-neutral-900 flex overflow-hidden font-body"
          >
            {!isHomePage && <Sidebar isOpen={sidebarOpen} />}
            
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isHomePage ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-20')}`}>
              {!isHomePage && <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
              
              <main className={`flex-1 overflow-y-auto ${isHomePage ? 'mt-0' : 'mt-0'} scroll-smooth`}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/sos" element={<SOS />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </AnimatePresence>
              </main>
              
              <Chatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
