import React, { useState, useMemo, useEffect } from 'react';
import medicalNetworkImg from '../assets/medical-network.png';
import fakeQrImg from '../assets/fake-qr.png';
import foodWaterImg from '../assets/food-water.png';
import shelterImg from '../assets/charity-banner.jpg';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  PhoneCall, 
  Download, 
  HelpCircle, 
  Activity, 
  Droplets, 
  Home, 
  Phone, 
  Package, 
  Users,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ArrowRight,
  SquarePlus,
  HeartHandshake,
  Map as MapIcon,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Camera,
  QrCode,
  Clock,
  Navigation,
  Info,
  MoreHorizontal,
  Sun,
  Moon, Star, Target, ShieldCheck, Briefcase, Bell, UserPlus, BarChart3, CheckSquare, FileText, Check, Award
} from 'lucide-react';
import { resourcesData } from '../data/mockResources';

const NGODashboard = ({ setActiveTab }) => {
  const [activeView, setActiveView] = useState('directory'); // directory, volunteer, tasks, impact
  const [filterType, setFilterType] = useState('All');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const stats = { activeVolunteers: 1248, suppliesDelivered: "42.5k", peopleHelped: "15,200+" };
  const tasks = [
    { id: 1, title: "Distribute Food Packets", org: "Red Cross", req: "Logistics", status: "Open", urgent: true },
    { id: 2, title: "Medical Camp Assistant", org: "Doctors Without Borders", req: "Medical", status: "Open", urgent: true },
    { id: 3, title: "Debris Clearing", org: "Local Relief Team", req: "General", status: "Filled", urgent: false },
    { id: 4, title: "Transport Driver Needed", org: "Shelter Connect", req: "Driver", status: "Open", urgent: false }
  ];
  const profiles = [
    { name: "Sarah Jenkins", skill: "Paramedic", tasks: 42, rating: 4.9, verified: true },
    { name: "Michael Chang", skill: "Heavy Machinery", tasks: 15, rating: 4.8, verified: true },
    { name: "Aisha Patel", skill: "Logistics Coordinator", tasks: 89, rating: 5.0, verified: true }
  ];

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setRegistrationSuccess(true);
    setTimeout(() => setRegistrationSuccess(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1600px] mx-auto bg-[#f9f9f9] dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500">
      <main className="pt-20 px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="pt-6 mb-2 flex justify-between items-start">
          <button onClick={() => setActiveTab('Directory')} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </button>
          <div className="flex gap-4">
            <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-100 transition-all">
              <AlertTriangle className="w-4 h-4" /> I Need Help
            </button>
            <button onClick={() => setActiveView('volunteer')} className="bg-blue-600 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-blue-700 transition-all">
              <HeartHandshake className="w-4 h-4" /> I Want to Help
            </button>
          </div>
        </div>
        <header className="py-12 max-w-3xl">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-4 block tracking-[0.2em]">COMMUNITY RESPONSE</span>
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter mb-8">NGOs & Volunteers.</h1>
          <p className="text-2xl font-light text-slate-500 dark:text-slate-400 leading-relaxed">Verified organizations, skilled volunteers, and real-time task assignments.</p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['directory', 'volunteer', 'tasks', 'impact'].map(view => (
            <button key={view} onClick={() => setActiveView(view)} className={`px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeView === view ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] shadow-xl' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}>
              {view === 'directory' ? 'NGO Directory' : view === 'volunteer' ? 'Volunteer Hub' : view === 'tasks' ? 'Task Board' : 'Impact Dashboard'}
            </button>
          ))}
        </div>

        {/* Impact Dashboard Preview (Always visible at top if not in Impact tab, but we'll show just the notification bell) */}
        {activeView === 'directory' && (
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center"><Bell className="w-6 h-6 text-blue-600 dark:text-blue-300" /></div>
              <div>
                <h4 className="font-bold text-[#1a1a1a] dark:text-white">URGENT: Volunteers needed in South District</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Flood relief operations require immediate logistical support.</p>
              </div>
            </div>
            <button onClick={() => setActiveView('tasks')} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700">View Task</button>
          </div>
        )}

        {/* 1. NGO Directory */}
        {activeView === 'directory' && (
          <section className="mb-16">
            <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={() => setFilterType('All')} className={`px-4 py-2 rounded-full font-bold text-xs border ${filterType === 'All' ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>All</button>
              <button onClick={() => setFilterType('Near Me')} className={`px-4 py-2 rounded-full font-bold text-xs border flex items-center gap-2 ${filterType === 'Near Me' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}><MapPin className="w-3 h-3" /> Near me</button>
              <button onClick={() => setFilterType('Medical')} className={`px-4 py-2 rounded-full font-bold text-xs border ${filterType === 'Medical' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Medical</button>
              <button onClick={() => setFilterType('Food')} className={`px-4 py-2 rounded-full font-bold text-xs border ${filterType === 'Food' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Food & Water</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(resourcesData.NGOs || []).map(ngo => (
                <div key={ngo.id} className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"><ShieldCheck className="w-32 h-32 text-blue-500" /></div>
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-3xl font-black text-[#1a1a1a] dark:text-white">{ngo.name}</h3>
                        <ShieldCheck className="w-6 h-6 text-blue-500" title="Verified Organization" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1 rounded-md">{ngo.category || 'Disaster Relief'}</span>
                    </div>
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
                      <img src={ngo.id === 'n1' ? "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=100&auto=format&fit=crop" : "https://images.unsplash.com/photo-1593113589914-07553f124f54?w=100&auto=format&fit=crop"} alt="NGO" className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-lighten" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium"><MapPin className="w-5 h-5" /> {ngo.distance} km away</div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium"><PhoneCall className="w-5 h-5" /> {ngo.contact}</div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <button className="flex-1 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all">Donate</button>
                    <button onClick={() => window.open(ngo.mapLink, '_blank')} className="flex-1 bg-slate-100 dark:bg-slate-800 text-[#1a1a1a] dark:text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"><Navigation className="w-4 h-4" /> Map</button>
                  </div>
                </div>
              ))}
            </div>
            {/* 3. Nearby Volunteer & NGO Map */}
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white">Live Operations Map</h3>
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Live Updates</span>
              </div>
              <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                <iframe
                  title="NGOs and Volunteering Hubs Map"
                  src="https://maps.google.com/maps?q=charity+OR+NGO+OR+volunteer+organization&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        )}

        {/* 2 & 7: Volunteer Hub */}
        {activeView === 'volunteer' && (
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
                <h2 className="text-3xl font-black text-[#1a1a1a] dark:text-white mb-2">Join the Force</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Register your skills to be matched with urgent tasks in your area.</p>
                {registrationSuccess ? (
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col items-center text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Registration Complete!</h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">Your profile is under verification. Check the Task Board to start helping.</p>
                  </div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                      <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-medium outline-none focus:border-blue-500 transition-colors" placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Phone</label>
                        <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-medium outline-none focus:border-blue-500 transition-colors" placeholder="+1..." />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Availability</label>
                        <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-medium outline-none focus:border-blue-500 transition-colors">
                          <option>Full-Time</option><option>Part-Time</option><option>Weekends</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Primary Skillset</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-medium outline-none focus:border-blue-500 transition-colors">
                        <option>Medical & First Aid</option>
                        <option>Search & Rescue</option>
                        <option>Logistics & Transport</option>
                        <option>Tech & Comm Setup</option>
                        <option>General Labor</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                      <span className="text-xs text-blue-800 dark:text-blue-300 font-medium">Your ID will be required upon reporting to the assigned NGO base.</span>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-8 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                      Submit Registration <UserPlus className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-8 flex items-center gap-3"><Award className="w-6 h-6 text-amber-500" /> Top Volunteers in your Sector</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.map((prof, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
                    {prof.verified && <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full" title="Verified Volunteer"><ShieldCheck className="w-4 h-4" /></div>}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?img=${idx+10}`} alt={prof.name} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#1a1a1a] dark:text-white leading-tight">{prof.name}</h4>
                        <span className="text-xs font-black uppercase text-blue-500 tracking-widest">{prof.skill}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Tasks</span>
                        <span className="text-xl font-black text-[#1a1a1a] dark:text-white flex items-center gap-1"><CheckSquare className="w-4 h-4 text-emerald-500" /> {prof.tasks}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Rating</span>
                        <span className="text-xl font-black text-[#1a1a1a] dark:text-white flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {prof.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5 & 6: Task Assignment System */}
        {activeView === 'tasks' && (
          <section className="mb-16">
            <div className="bg-[#1a1a1a] dark:bg-slate-900 rounded-3xl p-10 border border-slate-800 text-white mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl font-black mb-2 flex items-center gap-3"><Target className="w-8 h-8 text-blue-500" /> Skill-Based Matching</h2>
                  <p className="text-slate-400 font-medium">Our system prioritizes tasks based on your registered skill set. Log in to claim.</p>
                </div>
                <button className="bg-blue-600 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl whitespace-nowrap">Auto-Assign Me</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tasks.map(task => (
                <div key={task.id} className={`bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm transition-all hover:shadow-xl ${task.urgent ? 'border-red-200 dark:border-red-900/50' : 'border-slate-100 dark:border-slate-800'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      {task.urgent && <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-md mb-3 flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3" /> Urgent</span>}
                      <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-2">{task.title}</h3>
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{task.org}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${task.status === 'Open' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}>
                      {task.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Required Skill</span>
                      <span className="text-sm font-bold text-[#1a1a1a] dark:text-white flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500" /> {task.req}</span>
                    </div>
                    <button disabled={task.status !== 'Open'} className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${task.status === 'Open' ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] hover:bg-black dark:hover:bg-slate-200 active:scale-95 shadow-xl' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                      {task.status === 'Open' ? 'Accept Task' : 'Filled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Impact Dashboard */}
        {activeView === 'impact' && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-48">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" /> Active Volunteers</span>
                <span className="text-6xl font-black text-[#1a1a1a] dark:text-white">{stats.activeVolunteers}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-48">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Package className="w-4 h-4 text-emerald-500" /> Supplies Delivered</span>
                <span className="text-6xl font-black text-[#1a1a1a] dark:text-white">{stats.suppliesDelivered}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-48">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-red-500" /> People Helped</span>
                <span className="text-6xl font-black text-[#1a1a1a] dark:text-white">{stats.peopleHelped}</span>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] dark:bg-slate-900 rounded-3xl p-12 text-white border border-slate-800 text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
               <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-6 relative z-10" />
               <h2 className="text-4xl font-black mb-4 tracking-tighter relative z-10">Your Community Needs You.</h2>
               <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto mb-10 relative z-10">Every hour donated, every supply delivered directly saves lives. Join the verified network today.</p>
               <button onClick={() => setActiveView('volunteer')} className="relative z-10 bg-white text-[#1a1a1a] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl active:scale-95 inline-flex items-center gap-3">
                 Become a Volunteer <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </section>
        )}
      </main>
    </motion.div>
  );
};

const SuppliesDashboard = ({ setActiveTab }) => {
  const [kitFamilySize, setKitFamilySize] = useState('1');
  const [kitDisaster, setKitDisaster] = useState('earthquake');
  const [showCustomKit, setShowCustomKit] = useState(false);
  const [activeChecklist, setActiveChecklist] = useState('emergency');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (item) => setCheckedItems(prev => ({...prev, [item]: !prev[item]}));

  const emergencyKit = [
    "Drinking water (at least 3 days)",
    "Non-perishable food",
    "First aid kit",
    "Flashlight + batteries",
    "Power bank",
    "Important documents (ID, insurance copies)",
    "Whistle, mask, sanitizer"
  ];
  const medicalSupplies = [
    "Basic medicines (paracetamol, ORS)",
    "Bandages, antiseptic",
    "Personal prescriptions",
    "Emergency contact numbers"
  ];
  const foodWater = [
    "Ready-to-eat items (biscuits, canned food)",
    "Long shelf-life food",
    "Water purification tablets"
  ];
  const survivalTools = [
    "Multi-tool or knife",
    "Rope",
    "Radio (battery-powered)",
    "Fire extinguisher"
  ];

  const getCustomList = () => {
    let base = [...emergencyKit];
    if (kitFamilySize > 2) base.push("Extra baby formula/diapers (if applicable)", "Additional 5 gallons of water");
    if (kitDisaster === 'flood') base.push("Life jackets", "Waterproof boots", "Inflatable raft");
    if (kitDisaster === 'earthquake') base.push("Heavy duty gloves", "Dust masks", "Crowbar");
    if (kitDisaster === 'fire') base.push("Fire blankets", "N95 Respirators", "Goggles");
    return base;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1600px] mx-auto bg-[#f9f9f9] dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500">
      <main className="pt-20 px-12 max-w-7xl mx-auto">
        <div className="pt-6 mb-2">
          <button onClick={() => setActiveTab('Directory')} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </button>
        </div>
        <header className="py-12 max-w-3xl">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-4 block tracking-[0.2em]">EMERGENCY PREPAREDNESS</span>
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter mb-8">Supplies & Kits.</h1>
          <p className="text-2xl font-light text-slate-500 dark:text-slate-400 leading-relaxed">Comprehensive survival checklists, customized kits, and real-time inventory locations.</p>
        </header>

        {/* 6. Customized Kits */}
        <section className="mb-16 bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-3xl font-black text-[#1a1a1a] dark:text-white mb-6">Customized Survival Kit Builder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Family Size</label>
              <select value={kitFamilySize} onChange={(e)=>setKitFamilySize(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-bold outline-none">
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">3-4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Disaster Type</label>
              <select value={kitDisaster} onChange={(e)=>setKitDisaster(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-[#1a1a1a] dark:text-white font-bold outline-none">
                <option value="flood">Flood</option>
                <option value="earthquake">Earthquake</option>
                <option value="fire">Wildfire / Fire</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowCustomKit(true)} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95">
            Generate Personalized Kit
          </button>
          
          {showCustomKit && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-black text-blue-800 dark:text-blue-300 mb-4">Your Custom Kit ({kitFamilySize} Person, {kitDisaster.toUpperCase()})</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCustomList().map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#1a1a1a] dark:text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </section>

        {/* Categories 1-4 */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-4">
            {['emergency', 'medical', 'food', 'tools'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveChecklist(tab)}
                className={`p-6 text-left rounded-2xl font-black uppercase tracking-widest transition-all ${activeChecklist === tab ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] shadow-xl' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                {tab === 'emergency' ? '1. Emergency Kit' : tab === 'medical' ? '2. Medical Supplies' : tab === 'food' ? '3. Food & Water' : '4. Survival Tools'}
              </button>
            ))}
            <button onClick={() => window.print()} className="mt-4 p-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-2xl font-black uppercase tracking-widest flex items-center justify-between hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all cursor-pointer">
              Download PDF <Download className="w-5 h-5" />
            </button>
          </div>
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[400px]">
            <h2 className="text-3xl font-black text-[#1a1a1a] dark:text-white mb-8">
              {activeChecklist === 'emergency' ? 'Emergency Kit Checklist' : activeChecklist === 'medical' ? 'Medical Supplies' : activeChecklist === 'food' ? 'Food & Water Supplies' : 'Survival Tools & Equipment'}
            </h2>
            <div className="space-y-4">
              {(activeChecklist === 'emergency' ? emergencyKit : activeChecklist === 'medical' ? medicalSupplies : activeChecklist === 'food' ? foodWater : survivalTools).map((item, idx) => (
                <div key={idx} onClick={() => toggleCheck(item)} className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border transition-all ${checkedItems[item] ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-300'}`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 ${checkedItems[item] ? 'bg-blue-500 border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
                    {checkedItems[item] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium text-lg ${checkedItems[item] ? 'text-slate-400 line-through' : 'text-[#1a1a1a] dark:text-white'}`}>{item}</span>
                </div>
              ))}
            </div>
            {activeChecklist === 'food' && (
              <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Dietary Advice:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">Opt for canned foods, high-energy biscuits, and freeze-dried meals. Avoid salty foods as they increase thirst.</p>
              </div>
            )}
          </div>
        </section>

        {/* 5. Nearby Supply Locations */}
        <section className="mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase text-blue-500 mb-4 block tracking-[0.2em]">INTERACTIVE MAP</span>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white mb-6">Nearby Supply Locations</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                Locate open stores, pharmacies, and operational shelters in real-time. Verified statuses ensure you don't travel to depleted hubs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3"><Package className="w-5 h-5 text-slate-400" /><span className="font-bold text-[#1a1a1a] dark:text-white">City Central Pharmacy</span></div>
                  <span className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Open</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3"><Package className="w-5 h-5 text-slate-400" /><span className="font-bold text-[#1a1a1a] dark:text-white">Westside Hardware</span></div>
                  <span className="text-xs font-black text-red-500 uppercase flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Closed</span>
                </div>
              </div>
              <button onClick={() => window.open('https://maps.google.com/search?q=nearby+supplies', '_blank')} className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 w-fit">
                Open Global Map <MapIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="md:w-1/2 relative min-h-[400px] bg-slate-200 dark:bg-slate-800">
              <iframe
                title="Nearby Supplies Map"
                src="https://maps.google.com/maps?q=supermarket+OR+hardware+store&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* 7 & 8: Do's & Don'ts and Request Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <section className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-10 border border-amber-100 dark:border-amber-800/30">
            <h2 className="text-2xl font-black text-amber-900 dark:text-amber-400 mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6" /> Do's & Don'ts</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="font-medium text-amber-900 dark:text-amber-200"><strong>DO:</strong> Rotate supplies every few months to ensure freshness.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="font-medium text-amber-900 dark:text-amber-200"><strong>DO:</strong> Keep all supplies in sealed, waterproof bags or containers.</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /><span className="font-medium text-amber-900 dark:text-amber-200"><strong>DON'T:</strong> Store expired food or medications.</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /><span className="font-medium text-amber-900 dark:text-amber-200"><strong>DON'T:</strong> Rely solely on digital documents; keep physical copies.</span></li>
            </ul>
          </section>

          <section className="bg-[#1a1a1a] dark:bg-slate-800 rounded-3xl p-10 border border-slate-800 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3"><HeartHandshake className="w-6 h-6 text-blue-400" /> Supply Request & Help</h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-8">
                Are you out of critical supplies? Connect directly with local volunteers and NGOs who are distributing resources in your sector.
              </p>
            </div>
            <button onClick={() => setActiveTab('NGOs')} className="relative z-10 w-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
              Request Supplies <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </div>
      </main>
    </motion.div>
  );
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState('Directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNearest, setFilterNearest] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark') || localStorage.getItem('disasterx_theme') === 'dark'
  );
  
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [shelters, setShelters] = useState(resourcesData.Shelters || []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleLocateUser = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          const updatedShelters = [...(resourcesData.Shelters || [])].map(shelter => {
            if (shelter.lat && shelter.lng) {
              const dist = calculateDistance(latitude, longitude, shelter.lat, shelter.lng);
              return { ...shelter, distance: parseFloat(dist) };
            }
            return shelter;
          }).sort((a, b) => a.distance - b.distance);
          
          setShelters(updatedShelters);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          setIsLocating(false);
          alert("Could not get your location. Please ensure location services are enabled.");
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDarkMode(e.detail === 'dark');
    };
    window.addEventListener('disasterx-theme-change', handleThemeChange);
    return () => window.removeEventListener('disasterx-theme-change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('disasterx_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('disasterx-theme-change', { detail: newTheme }));
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat && ['Medical', 'FoodWater', 'Shelters', 'Contacts', 'Supplies', 'NGOs', 'All'].includes(cat)) {
      setActiveTab(cat);
    } else {
      setActiveTab('Directory');
    }
  }, [location]);

  const categories = [
    { id: 'Medical', name: 'Medical', icon: SquarePlus, desc: "Trauma centers, field hospitals, and active pharmacies." },
    { id: 'FoodWater', name: 'Food & Water', icon: Droplets, desc: "Potable water stations and supply distribution." },
    { id: 'Shelters', name: 'Shelters', icon: Home, desc: "Safe havens and temporary accommodations." },
    { id: 'Contacts', name: 'Contacts', icon: Phone, desc: "Emergency dispatch and coordination units." },
    { id: 'Supplies', name: 'Supplies', icon: Package, desc: "Battery stations and essential gear." },
    { id: 'NGOs', name: 'NGOs & Vols', icon: HeartHandshake, desc: "Relief partners and volunteer mobilization." }
  ];

  const processedData = useMemo(() => {
    if (activeTab === 'Directory') return [];
    
    let rawData = [];
    if (activeTab === 'All') {
      Object.keys(resourcesData).forEach(key => {
        rawData = [...rawData, ...resourcesData[key].map(item => ({ ...item, type: key }))];
      });
    } else {
      rawData = (resourcesData[activeTab] || []).map(item => ({ ...item, type: activeTab }));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      rawData = rawData.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.details.toLowerCase().includes(q) ||
        (item.type && item.type.toLowerCase().includes(q))
      );
    }

    if (filterAvailable) rawData = rawData.filter(item => item.availabilityStatus === 'Available');
    if (filterFree) rawData = rawData.filter(item => item.isFree);
    if (filterNearest) rawData.sort((a, b) => a.distance - b.distance);

    return rawData;
  }, [activeTab, searchQuery, filterNearest, filterAvailable, filterFree]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100 dark:border-green-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Available</span>;
      case 'Limited': return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 dark:border-amber-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div> Limited</span>;
      case 'Full': return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100 dark:border-red-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Full Status</span>;
      default: return null;
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'Medical': return <SquarePlus className="w-6 h-6 text-blue-500" />;
      case 'FoodWater': return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'Shelters': return <Home className="w-6 h-6 text-blue-500" />;
      case 'Contacts': return <Phone className="w-6 h-6 text-blue-500" />;
      case 'Supplies': return <Package className="w-6 h-6 text-blue-500" />;
      case 'NGOs': return <HeartHandshake className="w-6 h-6 text-blue-500" />;
      default: return <Activity className="w-6 h-6 text-blue-500" />;
    }
  };

  const renderFoodWaterView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      <main className="pt-20 px-12 max-w-7xl mx-auto">
        {/* Back Button + Hero Section */}
        <div className="pt-6 mb-4">
          <button
            onClick={() => setActiveTab('Directory')}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </button>
        </div>
        {/* Editorial Header */}
        <header className="mb-24 mt-4 lg:ml-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="flex-1">
              <h1 className="text-[5.5rem] font-black leading-[0.9] tracking-tighter text-[#1a1a1a] dark:text-white mb-8">
                Food & Water<br/>Resources.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-2xl font-light max-w-xl leading-relaxed">
                Critical life-support stations currently active within your safety perimeter. Verify status and proximity before departure.
              </p>
            </div>
            <div className="lg:w-[480px] shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
              >
                <img
                  src={foodWaterImg}
                  alt="Food and Water Illustration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Bento Layout Resource Cards (Dynamic from resourcesData) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:ml-12">
          {(resourcesData.FoodWater || []).map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx === 0 ? (
                <>
                  {/* Primary Large Card (First Item) */}
                  <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 h-full flex flex-col justify-between transition-all duration-500 hover:shadow-xl">
                      <div>
                        <div className="flex justify-between items-start mb-16">
                          <div className="flex flex-col">
                            <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Primary Aid</span>
                            <h2 className="text-5xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">{item.name}</h2>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 flex items-center gap-3 px-6 py-3 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-500">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                            <span className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest">{item.availabilityStatus}</span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="flex items-center gap-6">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                              <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white">{item.address}</p>
                              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Metropolitan Zone</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                              <Clock className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white">{item.distance} km • {Math.round(item.distance * 15)} min walk</p>
                              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estimated Transit</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-16 pt-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                        <div className="flex -space-x-3">
                          <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                            <Utensils className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                          </div>
                          <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                            <Droplets className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                          </div>
                          <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                            <Activity className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                          </div>
                        </div>
                        <button 
                          onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                          className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                        >
                          Navigate
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Pass Access (Moved beside Primary Card) */}
                  <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                    <div className="bg-white dark:bg-slate-900 h-full w-full p-12 flex flex-col items-center justify-center text-center rounded-[2.5rem] transition-colors duration-500">
                      <div className="w-48 aspect-square bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-inner transition-colors duration-500 overflow-hidden mb-8">
                        <img src={fakeQrImg} alt="Quick Pass QR Code" className="w-full h-full object-cover p-2 mix-blend-multiply dark:mix-blend-normal dark:invert" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-4">Quick Pass Access</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm mx-auto">Present this terminal code at any Clinical Sentinel station to bypass intake documentation.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <span className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest border border-slate-100 dark:border-slate-700 transition-colors duration-500">ID: CS-29381</span>
                          <span className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest border border-slate-100 dark:border-slate-700 transition-colors duration-500">Valid: 24h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Resource Item (Subsequent Items) */
                <div className="lg:col-span-12 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors duration-500 ${
                        item.availabilityStatus === 'Available' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900'
                      }`}>
                        {item.availabilityStatus === 'Available' ? 'Stable Supply' : 'Limited Supply'}
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">ID: {item.id.toUpperCase()}</span>
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-4">{item.name}</h3>
                    <div className="flex gap-10">
                      <div className="flex items-center gap-3">
                        <Navigation className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-[#1a1a1a] dark:text-white font-black text-sm uppercase tracking-wider">{item.distance} km Distance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-[#1a1a1a] dark:text-white font-black text-sm uppercase tracking-wider">{item.details.split('.')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex items-center gap-6">
                    <button 
                      onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                      className="flex-1 md:flex-none bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                    >
                      Navigate
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}



          {/* Informational Layer */}
          <div className="lg:col-span-12 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-12 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="w-16 h-16 shrink-0 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-500">
              <Info className="w-8 h-8 text-[#1a1a1a] dark:text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-2">System Status</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Data refreshed 4 minutes ago. Local infrastructure is currently operating at 64% capacity. Priority is given to medical emergencies and families with children.
              </p>
            </div>
            <div className="shrink-0">
              <button className="text-[#1a1a1a] dark:text-white font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-3 hover:gap-5 transition-all bg-white dark:bg-slate-800 px-8 py-4 rounded-full border border-slate-100 dark:border-slate-700">
                View Local Protocols
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Urgency Drawer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 rounded-full shadow-2xl flex items-center justify-between border border-white/20 dark:border-slate-800 transition-colors duration-500">
          <div className="flex items-center gap-5 pl-6">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] leading-none mb-1">Emergency</span>
              <span className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">Response Ready</span>
            </div>
          </div>
          <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] hover:bg-black dark:hover:bg-slate-200 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl">
            <Phone className="w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
            Call Dispatch
          </button>
        </div>
      </div>
    </motion.div>
  );


  const renderMedicalView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      <main className="pt-20 px-12 max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="pt-6 mb-4">
          <button
            onClick={() => setActiveTab('Directory')}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </button>
        </div>
        {/* Editorial Header */}
        <header className="mb-24 mt-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="flex-1">
              <h1 className="text-[5.5rem] font-black leading-[0.9] tracking-tighter text-[#1a1a1a] dark:text-white mb-8">
                Medical<br/>Resources.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-2xl font-light max-w-xl leading-relaxed">
                Real-time capacity and proximity tracking for clinical facilities.
              </p>
            </div>
            <div className="lg:w-[480px] shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
              >
                <img
                  src={medicalNetworkImg}
                  alt="Medical Network Illustration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Resource List - Tonal Stacking (Dynamic from resourcesData) */}
        <div className="space-y-16">
          {(resourcesData.Medical || []).map((item) => (
            <section 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-12 transition-all duration-300 hover:opacity-70">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#1a1a1a] dark:text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {item.id.startsWith('m') ? 'Hospital' : 'Clinic'}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <MapPin className="w-4 h-4" /> {item.distance} mi
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <Phone className="w-4 h-4" /> {item.contact}
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">
                    {item.name}
                  </h2>
                  <p className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-xs">{item.address}</p>
                </div>
                
                <div className="mt-8 md:mt-0 flex flex-wrap items-center gap-4">
                  <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border shadow-sm ${
                    item.availabilityStatus === 'Available' 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' 
                      : item.availabilityStatus === 'Limited'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      item.availabilityStatus === 'Available' ? 'bg-emerald-500' : item.availabilityStatus === 'Limited' ? 'bg-amber-500' : 'bg-red-500'
                    } animate-pulse`}></div>
                    <span className="text-[10px] font-black tracking-widest uppercase">{item.availabilityStatus}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.open(`tel:${item.contact}`); }}
                      className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      title="Call Facility"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); item.mapLink && window.open(item.mapLink, '_blank'); }}
                      className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      title="Open in Google Maps"
                    >
                      <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <ArrowRight className="w-10 h-10 text-slate-200 dark:text-slate-800 group-hover:text-[#1a1a1a] dark:group-hover:text-white group-hover:translate-x-2 transition-all hidden md:block" />
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Find Nearest Hospital Button */}
        <div className="mt-16 mb-8 flex justify-center">
          <button
            onClick={() => window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank')}
            className="group inline-flex items-center gap-4 bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 shadow-2xl active:scale-95"
          >
            <MapPin className="w-5 h-5 group-hover:animate-bounce" />
            View Nearest Hospitals on Google Maps
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>
    </motion.div>
  );

  const renderSheltersView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      <main className="pt-20 px-12 max-w-7xl mx-auto">
        <div className="pt-6 mb-2">
          <button
            onClick={() => setActiveTab('Directory')}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </button>
        </div>
        <header className="mb-24 mt-4 lg:ml-12 border-b border-slate-100 dark:border-slate-800 pb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-4 block tracking-[0.2em]">SHELTER RECORDS</span>
              <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter mb-8">Shelters.</h1>
              <p className="text-2xl font-light text-slate-500 dark:text-slate-400 leading-relaxed mb-8">Verified emergency accommodations and secure relocation centers currently operational.</p>
              
              <button 
                onClick={handleLocateUser}
                disabled={isLocating}
                className={`inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  userLocation 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-[#1a1a1a] hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-[#1a1a1a]'
                }`}
              >
                <Navigation className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} />
                {isLocating ? 'Locating...' : userLocation ? 'Location Active' : 'Find Nearby'}
              </button>
            </div>
            
            <div className="lg:w-[480px] shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
              >
                <img
                  src={shelterImg}
                  alt="Shelter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:ml-12">
          {shelters.map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx === 0 ? (
                /* Main Facility Card (First Item) */
                <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] h-full p-12 flex flex-col transition-colors duration-500">
                    <div className="flex justify-between items-start mb-16">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] font-black rounded uppercase tracking-wider border border-blue-100 dark:border-blue-800">Verified</span>
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID: {item.id.toUpperCase()}</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">{item.name}</h2>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                        item.availabilityStatus === 'Available' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}></div> {item.availabilityStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><MapPin className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">{item.address}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.distance} km distance</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><Users className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">{item.details.split('.')[0]}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Capacity Tracking</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><CheckCircle2 className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">Security Active</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Safety Zone</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><Clock className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">24/7 Operations</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Open</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center"><Home className="w-5 h-5 text-slate-400" /></div>
                         <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center"><Droplets className="w-5 h-5 text-slate-400" /></div>
                      </div>
                      <button 
                        onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                        className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                      >
                        Navigate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Secondary Editorial Cards */
                <div key={item.id} className="lg:col-span-4 flex flex-col gap-8">
                  <div className="bg-[#1a1a1a] dark:bg-slate-800 rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[300px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 block">PROXIMITY</span>
                      <h3 className="text-3xl font-black tracking-tight leading-none mb-4 italic">{item.name}</h3>
                      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed">{item.details}</p>
                    </div>
                    <button 
                      onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                      className="relative z-10 w-fit text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-all"
                    >
                      Navigate in Maps
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>

      {/* Persistent Urgency Drawer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 rounded-full shadow-2xl flex items-center justify-between border border-white/20 dark:border-slate-800 transition-colors duration-500">
          <div className="flex items-center gap-5 pl-6">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] leading-none mb-1">Emergency</span>
              <span className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">Response Ready</span>
            </div>
          </div>
          <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] hover:bg-black dark:hover:bg-slate-200 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl">
            <Phone className="w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
            Call Dispatch
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSuppliesView = () => <SuppliesDashboard setActiveTab={setActiveTab} />;

  const renderContactsView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-[#f9f9f9] dark:bg-slate-950 min-h-screen font-body transition-colors duration-500"
    >
      {/* Main Content Canvas */}
      <main className="pt-20 pb-32 px-12 max-w-7xl mx-auto">
        <div className="pt-6 mb-4">
          <button
            onClick={() => setActiveTab('Directory')}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-[#1a1a1a] dark:hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </button>
        </div>
        {/* Hero Header */}
        <div className="mb-24">
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[1.1] tracking-tighter mb-4">Urgent Resources</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg font-light leading-relaxed">
            Critical communication channels for immediate assistance. High-priority dispatch and relief services monitored in real-time.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Primary Emergency Contact (Police) */}
          <div className="md:col-span-7 bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 transition-colors duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-sm transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">First Responder</span>
                  <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white">Police Emergency</h2>
                </div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full gap-2 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-bold tracking-wider text-[#1a1a1a] dark:text-white uppercase">Available</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <p className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-none">911</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-4 font-medium italic">Standard emergency dispatch protocol</p>
                </div>
                <button className="inline-flex items-center justify-center bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl hover:bg-black dark:hover:bg-slate-200">
                  Initiate Call
                  <Phone className="ml-3 w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
                </button>
              </div>
            </div>
          </div>

          {/* Relief Helpline */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-12 h-full flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-colors duration-500">
              <div className="mb-16">
                <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">Support & Recovery</span>
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white leading-tight">Disaster Relief Helpline</h2>
              </div>
              
              <div className="mb-8 inline-flex self-start items-center bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-4 py-2 rounded-full gap-2 transition-colors duration-500">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-[11px] font-bold tracking-wider text-red-600 dark:text-red-400 uppercase">Limited Availability</span>
              </div>

              <div>
                <div className="space-y-1 mb-8">
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Global Support ID</p>
                  <p className="text-3xl font-black text-[#1a1a1a] dark:text-white">1-800-621-3362</p>
                </div>
                <button className="w-full bg-white dark:bg-slate-800 text-[#1a1a1a] dark:text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center shadow-sm border border-slate-100 dark:border-slate-700">
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>


          </div>
        </div>

        {/* New Row for Family Tracker and National Emergency */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Family Locator */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-12 shadow-sm transition-colors duration-500 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">Family & Community</span>
                <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white">Family Safe Locator</h2>
              </div>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full gap-2 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold tracking-wider text-[#1a1a1a] dark:text-white uppercase">Online</span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Verify the safety of your loved ones or register yourself as safe. This encrypted system tracks the last known secure location of registered family members.
            </p>
            <div className="flex justify-between items-end mt-auto">
              <button onClick={() => window.location.href='/tracking'} className="inline-flex items-center justify-center bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl hover:bg-blue-700 w-full">
                Access Portal
                <Users className="ml-3 w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* National Emergency Hotline */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-12 shadow-sm transition-colors duration-500 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">Federal Agency</span>
                <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white">National Emergency</h2>
              </div>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full gap-2 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold tracking-wider text-[#1a1a1a] dark:text-white uppercase">Active</span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
              Direct connection to federal disaster response coordinators for large-scale assistance in any severe disaster.
            </p>
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mt-auto">
               <div>
                 <p className="text-5xl font-black text-[#1a1a1a] dark:text-white tracking-tighter">112</p>
               </div>
               <button onClick={() => window.open('tel:112')} className="inline-flex items-center justify-center bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl hover:bg-black dark:hover:bg-slate-200">
                 Call Now
                 <Phone className="ml-3 w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
               </button>
            </div>
          </div>
        </div>

        {/* Essential Disaster Hotlines */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* FEMA */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 shadow-sm transition-colors duration-500 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2">FEMA Helpline</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">Federal disaster assistance and recovery info.</p>
            <div className="mt-auto">
              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-4">1-800-621-FEMA</p>
              <button onClick={() => window.open('https://www.fema.gov', '_blank')} className="w-full bg-white dark:bg-slate-800 text-[#1a1a1a] dark:text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                Visit Website <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Poison Control */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 shadow-sm transition-colors duration-500 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2">Poison Control</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">Immediate medical advice for poison exposure.</p>
            <div className="mt-auto">
              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-4">1-800-222-1222</p>
              <button onClick={() => window.open('tel:18002221222')} className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-sm flex justify-between items-center">
                Call Now <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SAMHSA Disaster Distress */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 shadow-sm transition-colors duration-500 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2">Disaster Distress</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">24/7 crisis counseling for disaster survivors.</p>
            <div className="mt-auto">
              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-4">1-800-985-5990</p>
              <button onClick={() => window.open('tel:18009855990')} className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-sm flex justify-between items-center">
                Call Now <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Information Layer */}
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-16 transition-colors duration-500">
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Global Dispatch</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Our sentinel systems provide direct routing to the nearest municipal dispatch center based on your encrypted geolocation data.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Response Times</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Average response latency for priority 911 calls is currently 4 minutes 12 seconds in monitored zones.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Privacy Protocol</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Communication with these entities is logged for safety but fully encrypted to protect user identity in transition.
            </p>
          </div>
        </div>
      </main>

      {/* Glassmorphism Urgency Drawer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Sentinel System Online</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Safety Guide</button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Privacy Shield</button>
            <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95">
              Direct SOS
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderNGOsView = () => <NGODashboard setActiveTab={setActiveTab} />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        {activeTab === 'Directory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pb-24 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 pt-24 py-20">
              <div className="max-w-3xl mb-16">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tight mb-6">Critical Resource Directory</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Centralized access to verified emergency infrastructure.</motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {categories.map((cat, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => setActiveTab(cat.id)} className="group bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-500 flex flex-col h-full cursor-pointer">
                    <div className="flex justify-between items-start mb-10"><h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white tracking-tight">{cat.name}</h3><div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500"><cat.icon className="w-7 h-7 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors duration-500" /></div></div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 flex-1">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">ACCES RECORDS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </motion.div>
                ))}
              </div>



            </div>
          </motion.div>
        )}

        {activeTab === 'Medical' && renderMedicalView()}
        {activeTab === 'Shelters' && renderSheltersView()}
        {activeTab === 'Contacts' && renderContactsView()}
        {activeTab === 'Supplies' && renderSuppliesView()}
        {activeTab === 'FoodWater' && renderFoodWaterView()}
        {activeTab === 'NGOs' && renderNGOsView()}

        {activeTab !== 'Directory' && !['Medical', 'FoodWater', 'Shelters', 'Contacts', 'Supplies', 'NGOs'].includes(activeTab) && (
          <div className="min-h-screen bg-[#060b13] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab('Directory')} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"><ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white" /></button>
                <div><h2 className="text-4xl font-black uppercase tracking-tighter">{activeTab} <span className="text-blue-500">Directory</span></h2><p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Verified Relief Infrastructure</p></div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 bg-white/5 p-6 border border-white/10 rounded-3xl backdrop-blur-md">
                 <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" /><input type="text" placeholder="Search tactical records..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                 <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setFilterNearest(!filterNearest)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterNearest ? 'bg-blue-500/20 border-blue-500/40 text-blue-500' : 'bg-white/5 border-white/10 text-slate-400'}`}>Nearest</button>
                    <button onClick={() => setFilterAvailable(!filterAvailable)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterAvailable ? 'bg-green-500/20 border-green-500/40 text-green-500' : 'bg-white/5 border-white/10 text-slate-400'}`}>Available</button>
                    <button onClick={() => setFilterFree(!filterFree)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterFree ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>Free</button>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {processedData.map((item) => (
                   <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-8 border border-white/10 rounded-[32px] flex flex-col group hover:border-blue-500/30 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex gap-4 items-center"><div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">{getIconForType(item.type)}</div><div><h4 className="text-xl font-bold text-white">{item.name}</h4><p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">{item.distance} KM AWAY</p></div></div>
                         {getStatusBadge(item.availabilityStatus)}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">{item.details}</p>
                      <div className="grid grid-cols-2 gap-4 mt-auto border-t border-white/10 pt-8"><a target="_blank" rel="noreferrer" href={item.mapLink} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest text-white transition-all uppercase"><MapPin className="w-4 h-4" /> Map</a><a href={`tel:${item.contact}`} className="flex items-center justify-center gap-2 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase"><PhoneCall className="w-4 h-4" /> Contact</a></div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="fixed top-8 right-8 z-[100] w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
        >
          {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-slate-700" />}
        </button>
    </div>
  );
};

export default Resources;
