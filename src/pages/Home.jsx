import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Activity, Map, Globe, Heart, User, LogOut } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import donationBg from '../assets/donation-bg.png';
import EmergencyProtocols from '../components/EmergencyProtocols';

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
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-walk-forward transform-origin-bottom"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/20 to-[#0f172a]/95" />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
        
        {/* Thunderstorm Effects */}
        <div className="absolute inset-0 bg-white opacity-0 animate-lightning mix-blend-overlay pointer-events-none" />
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

          <a href="#about" className="hover:text-white transition-colors">ABOUT US</a>
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
            <span className="uppercase tracking-widest block mt-4 text-5xl md:text-7xl lg:text-8xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">Disaster</span>
              <span className="text-neon-blue font-black">X</span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center my-8 w-full max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-3xl text-white font-black font-serif leading-relaxed text-center drop-shadow-2xl">
              "{dailyQuote}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <Link to="/donation" className="flex items-center gap-3 bg-neon-red/10 border border-neon-red/40 text-neon-red px-10 py-4 rounded-xl font-black text-sm hover:bg-neon-red/20 transition-all group uppercase tracking-widest">
              DONATION <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Humanitarian Quote Section */}
      <section className="relative z-10 py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-4 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight"
          >
            "Every calamity is just news, until it hits us." — Unknown
          </motion.h2>
          <div className="w-24 h-1 bg-neon-red mx-auto my-6" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium tracking-wide"
          >
            "Be the light in someone's darkest hour, support disaster relief today."
          </motion.p>
        </div>
      </section>

      {/* Donation Banner Section */}
      <section
        className="relative z-10 py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${donationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">
            Your Donation Changes Lives
          </h2>
          <div className="w-20 h-0.5 bg-white/40 mx-auto" />
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">
            "In the face of a crisis often the difference between life and death is immediate access to relief items.
            We are a pioneer in delivering life saving relief supplies on time at scale. Help us to do more."
          </p>
          <div className="pt-6">
            <Link
              to="/donation"
              className="inline-block px-12 py-4 border-2 border-white text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Donate Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Emergency Protocols Section (From User Image) */}
      <EmergencyProtocols />

      {/* About Us Section */}
      <section id="about" className="relative z-10 py-28 px-12 bg-black text-center border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-white"
          >
            About Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-lg text-slate-300 leading-relaxed font-medium">
              DisasterX is dedicated to fostering global resilience and safety. We combine
              cutting-edge situational awareness with traditional emergency protocols to
              create a transparent, secure, and accessible disaster management platform.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed font-medium">
              Our mission is to connect communities with critical resources and information,
              ensuring that every user is prepared, informed, and protected when it matters most.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-20 px-12 bg-white text-dark-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-neon-blue" />
                <span className="text-xl font-black tracking-tighter uppercase">
                  Disaster <span className="text-neon-blue">X</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Empowering communities through transparent and secure disaster management tools across the world.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-bold">
                <li><Link to="/" className="hover:text-neon-blue transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-neon-blue transition-colors">Dashboard</Link></li>
                <li><a href="#about" className="hover:text-neon-blue transition-colors">About Us</a></li>
                <li><Link to="/sos" className="hover:text-neon-blue transition-colors">SOS</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-bold">
                <li><Link to="/resources" className="hover:text-neon-blue transition-colors">Emergency Protocols</Link></li>
                <li><Link to="/map" className="hover:text-neon-blue transition-colors">Live Map</Link></li>
                <li><Link to="/dashboard" className="hover:text-neon-blue transition-colors">Training Modules</Link></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Connect With Us</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors text-slate-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors text-slate-600">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors text-slate-600">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Us</p>
                <a href="mailto:support@disasterx.com" className="text-sm font-bold text-slate-600 hover:text-neon-blue transition-colors underline decoration-dotted">
                  support@disasterx.com
                </a>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-xs w-full focus:outline-none focus:border-neon-blue transition-colors"
                  />
                  <button className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes walk-forward { 
          0% { transform: scale(1) translateY(0); } 
          50% { transform: scale(1.15) translateY(-1%); } 
          100% { transform: scale(1.3) translateY(1%); } 
        }
        .animate-walk-forward { animation: walk-forward 30s ease-in-out infinite alternate; transform-origin: center 70%; }
        
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-xy { animation: gradient-xy 10s ease infinite; }

        /* Thunderstorm Lightning */
        @keyframes lightning {
          0%, 91%, 93%, 95%, 100% { opacity: 0; }
          92% { opacity: 0.6; }
          94% { opacity: 0.3; }
        }
        .animate-lightning { animation: lightning 7s infinite; }
      `}</style>
    </motion.div>
  );
};

export default Home;