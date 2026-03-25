import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import MapPage from './pages/Map';
import SOS from './pages/SOS';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto mt-16 scroll-smooth">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
