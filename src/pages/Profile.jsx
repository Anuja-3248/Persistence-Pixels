import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Shield, Calendar, Edit3, LogOut, ChevronLeft, Award, Activity, Bell, Settings, ArrowRight, Check } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('disasterx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Mock user if not found (for demo)
      setUser({
        name: "Demo Operator",
        email: "operator@disasterx.ai",
        phone: "+91 98765 43210",
        role: "Emergency Coordinator",
        node: "SEC_NODE_7G",
        joinedDate: "March 2026",
        location: "Mumbai, India",
        rank: "Elite Responder",
        deployments: 24,
        impactScore: 98
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('disasterx_user');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const saveName = () => {
    if (editNameValue.trim() !== "") {
      const updatedUser = { ...user, name: editNameValue.trim() };
      setUser(updatedUser);
      localStorage.setItem('disasterx_user', JSON.stringify(updatedUser));
    }
    setIsEditingName(false);
  };

  const toggleEdit = () => {
    if (isEditingName) {
      saveName();
    } else {
      setEditNameValue(user.name);
      setIsEditingName(true);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0C0B1B] text-white font-body selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between px-12 py-8 w-full max-w-[1600px] mx-auto">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Nexus
        </Link>
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">Neural Profile // <span className="text-purple-500">Node {user.node || '01'}</span></span>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-bold uppercase tracking-widest">
          Sign Out <LogOut className="w-4 h-4" />
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info Card */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#131127] border border-white/5 rounded-[40px] p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-purple-500/30 p-1 group-hover:border-purple-500/60 transition-colors">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=256&bold=true`}
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <button 
                    onClick={toggleEdit} 
                    className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-purple-600 border-4 border-[#131127] flex items-center justify-center hover:bg-purple-500 transition-colors shadow-lg"
                  >
                    {isEditingName ? <Check className="w-4 h-4 text-white" /> : <Edit3 className="w-4 h-4 text-white" />}
                  </button>
                </div>

                {isEditingName ? (
                  <input 
                    type="text" 
                    value={editNameValue} 
                    onChange={(e) => setEditNameValue(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && saveName()}
                    className="text-3xl font-black text-white italic tracking-tighter mb-1 uppercase bg-white/10 border border-purple-500/50 rounded-xl px-4 py-1 text-center w-full max-w-[250px] outline-none"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-3xl font-black text-white italic tracking-tighter mb-1 uppercase">{user.name}</h2>
                )}
                
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 mt-2">
                  <Shield className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{user.role || 'Elite Responder'}</span>
                </div>

                <div className="w-full space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 text-slate-400 group/item">
                    <Mail className="w-4 h-4 group-hover/item:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 group/item">
                    <Phone className="w-4 h-4 group-hover/item:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium">{user.phone || '+91 99000 11000'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 group/item">
                    <MapPin className="w-4 h-4 group-hover/item:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium">{user.location || 'Mumbai Core'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 group/item">
                    <Calendar className="w-4 h-4 group-hover/item:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium">Joined {user.joinedDate || 'March 2026'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
                <Bell className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notifications</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
                <Settings className="w-5 h-5 text-slate-400 group-hover:rotate-45 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Settings</span>
              </button>
            </div>
          </div>

          {/* Right Column: Statistics & Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Deployments', value: user.deployments || 24, icon: <Activity className="w-5 h-5" />, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
                { label: 'Impact Score', value: `${user.impactScore || 98}%`, icon: <Award className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                { label: 'Rescue Verified', value: '412', icon: <Shield className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(stat.icon, { className: stat.color })}
                  </div>
                  <h3 className="text-4xl font-black text-white italic mb-1 uppercase tracking-tighter">{stat.value}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Card: Activity & Timeline */}
            <div className="bg-[#131127] border border-white/5 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Deployment History</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Operational records for current quarter</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-500" />
                  </div>
               </div>

               <div className="space-y-10">
                  {[
                    { event: "Flash Flood Coordination", sector: "Coastal Sector A-1", date: "4h Ago", status: "Active" },
                    { event: "Medical Kit Distribution", sector: "Urban Core 7G", date: "Yesterday", status: "Completed" },
                    { event: "Satellite Uplink Initialization", sector: "North Ridge", date: "2 Days Ago", status: "Completed" },
                  ].map((log, idx) => (
                    <div key={idx} className="relative pl-10 border-l border-white/5 flex items-start justify-between group">
                       <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-150 transition-transform" />
                       <div className="space-y-1">
                          <h4 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors uppercase italic tracking-tight">{log.event}</h4>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{log.sector} // <span className="opacity-60">{log.date}</span></p>
                       </div>
                       <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg border ${log.status === 'Active' ? 'bg-amber-500/10 border-amber-500 text-amber-500 animate-pulse' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'}`}>
                         {log.status}
                       </span>
                    </div>
                  ))}
               </div>

               <button className="w-full mt-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all group">
                 View Global Archival Records <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
