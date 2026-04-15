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
import Onboarding from './pages/Onboarding';
import Donation from './pages/Donation';
import Profile from './pages/Profile';
import ReportDisaster from './pages/ReportDisaster';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';
  const isOnboardingPage = location.pathname === '/onboarding';
  const isDashboardPage = location.pathname === '/dashboard';
  const isMapPage = location.pathname === '/map';
  const isSOSPage = location.pathname === '/sos';
  const isReportPage = location.pathname === '/report';
  const isResourcesPage = location.pathname === '/resources';
  const isAdminPage = location.pathname === '/admin';
  const isDonationPage = location.pathname === '/donation';
  const isProfilePage = location.pathname === '/profile';
  const isHomePage = location.pathname === '/';

  const hideLayout = isHomePage || isDashboardPage || isMapPage || isSOSPage || isReportPage || isResourcesPage || isAdminPage || isDonationPage;

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div key="splash" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}>
            <SplashScreen onComplete={() => setShowSplash(false)} />
          </motion.div>
        ) : isAuthPage || isOnboardingPage || isDonationPage || isProfilePage ? (
          <motion.div 
            key="auth" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-[#0C0B1B] text-slate-100 font-body"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/profile" element={<Profile />} />
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
            {!hideLayout && <Sidebar isOpen={sidebarOpen} />}
            
            <div className={`flex-1 flex flex-col transition-all duration-300 ${hideLayout ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-20')}`}>
              {!hideLayout && (
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              )}
              
              <main className={`flex-1 overflow-y-auto ${isHomePage ? 'mt-0' : 'mt-0'} scroll-smooth`}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/sos" element={<SOS />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/report" element={<ReportDisaster />} />
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
