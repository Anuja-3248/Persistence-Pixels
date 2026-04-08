import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Activity, Map, Globe, Heart, User, LogOut } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
// import ScenarioCards from '../components/ScenarioCards';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('disasterx_user');
    setIsLoggedIn(loggedIn);
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('disasterx_user');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const quotes = [
    "Preparation through education is less costly than learning through tragedy.",
    "The best time to prepare for a disaster was yesterday. The second best time is now.",
    "Disaster management is about making order out of chaos.",
    "Safety is not a gadget but a state of mind.",
    "Resilience is not just about surviving, but thriving after the storm.",
    "Nature's power is unpredictable; our preparedness must be absolute.",
    "Unity and information are our strongest shields against devastation."
  ];
  
  const [showContactInfo, setShowContactInfo] = React.useState(false);
  const dailyQuote = quotes[new Date().getDate() % quotes.length];
  
  // High-Performance System Status (Real-time Simulation)
  const [systemNode, setSystemNode] = React.useState({
    accuracy: '99.8%',
    status: 'OPERATIONAL',
    uptime: '100% Guaranteed',
    monitoring: 'Scanning Sector 7-G...'
  });

  React.useEffect(() => {
    const sectors = ['Sector 7-G', 'Sector 2-A', 'Coastal Zone 1', 'Northern District', 'Basin Alpha'];
    const interval = setInterval(() => {
      setSystemNode(prev => ({
        ...prev,
        monitoring: `Scanning ${sectors[Math.floor(Math.random() * sectors.length)]}...`
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col font-sans overflow-hidden"
    >
      {/* Immersive Persistent Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/20 to-[#0f172a]/95" />
        <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay" />
      </div>

      {/* Top Navigation Overlay */}
      <nav className="relative z-20 flex items-center justify-between px-12 py-8 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-neon-blue/20 p-2 rounded-lg border border-neon-blue/40 backdrop-blur-md transition-all hover:scale-110">
            <Activity className="w-8 h-8 text-neon-blue" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white drop-shadow-lg uppercase">
            Disaster <span className="text-neon-blue">X</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-12 font-black text-xs uppercase tracking-[0.2em] text-white/70">
          <Link to="/" className="text-white hover:text-white transition-colors border-b-2 border-neon-blue pb-1">HOME</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">DASHBOARD</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowContactInfo(true)}
            onMouseLeave={() => setShowContactInfo(false)}
          >
            <div className="hover:text-white transition-colors cursor-pointer">CONTACT</div>
            {showContactInfo && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 glass-dark p-6 rounded-2xl border border-white/10 shadow-2xl z-50 text-center"
              >
                <p className="text-[10px] text-neon-blue font-black tracking-widest mb-2 uppercase text-center">Core Development Team</p>
                <h4 className="text-xl font-black text-white mb-3 text-center">Persistence Pixel</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-4 normal-case text-center">
                  Dedicated to engineering resilient digital infrastructures for global safety and emergency response.
                </p>
              </motion.div>
            )}
          </div>

          <Link to="/sos" className="text-neon-red hover:text-white transition-colors flex items-center gap-2 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-red"></span>
            </span>
            SOS
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2">
                <User className="w-4 h-4 text-neon-blue" />
                <span>PROFILE</span>
              </Link>
              <button onClick={handleSignOut} className="px-6 py-3 rounded-xl bg-neon-red/10 border border-neon-red/40 text-neon-red font-bold text-xs uppercase tracking-widest hover:bg-neon-red/20 transition-all backdrop-blur-md flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-md">
                Sign in
              </Link>
              <Link to="/auth" state={{ isLogin: false }} className="px-8 py-3 rounded-xl bg-neon-blue text-white font-bold text-sm hover:bg-neon-blue/80 shadow-[0_0_20px_rgba(46,125,233,0.4)] transition-all">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="relative z-10 h-screen w-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}
           className="max-w-5xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-2xl">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">Disaster Management</span> <br />
            <span className="text-neon-blue font-extrabold tracking-widest text-3xl md:text-5xl lg:text-6xl uppercase mt-2 block">System</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center my-8 bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md w-full max-w-3xl mx-auto shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-neon-blue mb-6 rounded-full" />
            <p className="text-xl md:text-3xl text-white font-black italic leading-relaxed text-center drop-shadow-xl">
              "{dailyQuote}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <Link to="/donation" className="flex items-center gap-3 bg-neon-blue/90 text-dark-900 px-10 py-4 rounded-xl font-black text-sm hover:bg-neon-blue shadow-[0_10px_30px_rgba(46,125,233,0.3)] transition-all group uppercase tracking-widest">
               DONATION <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="/dashboard" className="flex items-center gap-3 bg-neon-blue/90 text-dark-900 px-10 py-4 rounded-xl font-black text-sm hover:bg-neon-blue shadow-[0_10px_30px_rgba(46,125,233,0.3)] transition-all group uppercase tracking-widest">
               COMMAND CENTER <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
            </Link>
            
            <Link to="/map" className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-white/20 border border-white/10 shadow-2xl transition-all group uppercase tracking-widest">
               DISASTER MAP <Map className="w-5 h-5 text-neon-blue" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Information Section */}
      <section className="relative z-10 py-32 px-12">
        <motion.div
           initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
           className="max-w-[1400px] mx-auto"
        >
          <div className="relative group overflow-hidden rounded-[60px] bg-gradient-to-br from-neon-blue to-blue-700 p-1 animate-gradient-xy shadow-[0_40px_100px_rgba(46,125,233,0.3)]">
            <div className="bg-dark-900 rounded-[58px] p-16 md:p-24 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex-1 space-y-10 relative z-10 text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30">
                  <Shield className="w-5 h-5 text-neon-blue" />
                  <span className="text-xs font-black text-neon-blue uppercase tracking-[0.3em]">Core Mission</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter text-left">
                  INTELLIGENCE <br /> 
                  <span className="text-neon-blue">FOR GLOBAL</span> <br />
                  RESILIENCE.
                </h2>
                
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl text-left">
                  DisasterX is a cutting-edge platform engineered to predict, monitor, and mitigate 
                  natural catastrophes using high-velocity data networks. 
                  Built for teams like <span className="text-white font-bold">Persistence Pixel</span>, 
                  we bridge the gap between data and life-saving action.
                </p>
              </div>

              <div className="w-full lg:w-1/3 aspect-square relative z-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-neon-blue/20 rounded-full animate-pulse blur-[60px]" />
                 <div className="w-full h-full glass-dark border border-white/10 rounded-[50px] p-12 flex flex-col justify-between shadow-2xl overflow-hidden text-left">
                    <div className="space-y-2 text-left">
                       <p className="text-[10px] font-black text-neon-blue uppercase tracking-widest text-left">Accuracy Rating</p>
                       <p className="text-6xl font-black text-white leading-none text-left">{systemNode.accuracy}</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 text-left">{systemNode.monitoring}</p>
                    </div>
                    <div className="space-y-6">
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: '99.8%' }} transition={{ duration: 2 }} className="h-full bg-neon-blue" />
                       </div>
                       <div className="flex justify-between items-end">
                          <div className="space-y-1 text-left">
                             <p className="text-[10px] text-slate-600 font-bold uppercase text-left">Status</p>
                             <p className="text-xs text-neon-green font-black text-left">{systemNode.status}</p>
                          </div>
                          <Link to="/dashboard" className="w-12 h-12 rounded-2xl bg-neon-blue flex items-center justify-center hover:scale-110 transition-transform">
                             <ChevronRight className="w-6 h-6 text-dark-900" />
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scenario Learning Section */}
      <section className="relative z-10 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        {/* <ScenarioCards /> */}
      </section>

      <footer className="relative z-10 py-16 px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-neon-blue" />
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                 Disaster <span className="text-neon-blue">X</span>
              </span>
           </div>
           <p className="text-slate-500 text-sm font-medium tracking-wide">
              &copy; 2026 Persistence Pixel. All rights reserved. System Operational.
           </p>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
           </div>
        </div>
      </footer>

      <style>{`
        @keyframes ken-burns { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-ken-burns { animation: ken-burns 20s ease-in-out infinite alternate; }
        .animate-gradient-xy { animation: gradient-xy 10s ease infinite; }
      `}</style>
    </motion.div>
  );
};

export default Home;
