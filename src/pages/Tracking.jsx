import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Radio, 
  Map as MapIcon, 
  ChevronRight,
  Loader2,
  Navigation
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const STAGES = [
  { id: 'sent', label: 'Alert Sent', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'assigned', label: 'Team Assigned', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'en-route', label: 'Help On The Way', icon: Navigation, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 'arrived', label: 'Responder Arrived', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' }
];

const Tracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emergencyData = location.state || {
    id: 'SOS-TEMP-1',
    type: 'SOS SIGNAL',
    severity: 'CRITICAL',
    message: 'Manual Signal Sent',
    coords: [34.0522, -118.2437],
    location: 'Detected Position'
  };

  const [currentStage, setCurrentStage] = useState(0);
  const [notifications, setNotifications] = useState([{ id: Date.now(), text: 'SOS Signal Transmitted Successfully', time: 'Just Now' }]);
  const [eta, setEta] = useState(15);
  const [distance, setDistance] = useState(3.2);
  const [startTime] = useState(new Date());
  const [elapsed, setElapsed] = useState('00:00');

  const addNotification = (text) => {
    setNotifications(prev => [{ id: Date.now(), text, time: 'Just Now' }, ...prev.slice(0, 2)]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - startTime) / 1000);
      const mins = Math.floor(diff / 60).toString().padStart(2, '0');
      const secs = (diff % 60).toString().padStart(2, '0');
      setElapsed(`${mins}:${secs}`);
    }, 1000);

    // Simulation Stages
    const stage1 = setTimeout(() => {
      setCurrentStage(1);
      addNotification('Tactical Response Team Alpha-9 Assigned');
    }, 4000);

    const stage2 = setTimeout(() => {
      setCurrentStage(2);
      setEta(8);
      setDistance(1.8);
      addNotification('Interceptor Vehicle is En Route');
    }, 12000);

    const stage3 = setTimeout(() => {
      setCurrentStage(3);
      setEta(0);
      setDistance(0);
      addNotification('Responder Localized and Arrived');
    }, 25000);

    return () => {
      clearInterval(timer);
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, [startTime]);

  return (
    <div className="min-h-full py-10 px-6 max-w-[1400px] mx-auto overflow-hidden">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
            <Radio className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-headline font-black uppercase tracking-tight dark:text-white">Active Intercept</h2>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-red-200 dark:border-red-800">
                {emergencyData.severity}
              </span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              ID: {emergencyData.id || 'SOS-7729-B'} 
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> 
              Established {elapsed} ago
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
        >
          Return to HQ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: TRACKING & SUMMARY */}
        <div className="lg:col-span-7 space-y-10">
          {/* TRACKING PROGESS CARD */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-premium dark:shadow-none border border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-10 flex items-center gap-3">
              <Clock className="w-4 h-4 text-blue-600" />
              Operational Response Timeline
            </h3>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              <div 
                className="absolute left-[27px] top-0 w-1 bg-blue-600 rounded-full transition-all duration-1000 ease-in-out"
                style={{ height: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
              ></div>

              <div className="space-y-12 relative z-10">
                {STAGES.map((stage, i) => {
                  const isActive = i <= currentStage;
                  const isCurrent = i === currentStage;
                  const Icon = stage.icon;

                  return (
                    <div key={stage.id} className="flex items-start gap-8 group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-900 transition-all duration-500 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                        {isCurrent && i < STAGES.length - 1 ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-4">
                          <h4 className={`text-xl font-black uppercase tracking-tight transition-colors duration-500 ${isActive ? 'dark:text-white' : 'text-slate-300 dark:text-slate-700'}`}>
                            {stage.label}
                          </h4>
                          {isActive && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${stage.bg} ${stage.color} ${stage.border} border`}
                            >
                              Verified
                            </motion.span>
                          )}
                        </div>
                        <p className={`text-xs font-bold mt-1 transition-colors duration-500 ${isActive ? 'text-slate-500' : 'text-slate-200 dark:text-slate-800'}`}>
                          {i === 0 && "Signal received by Sector G-9"}
                          {i === 1 && "Rescue Team Alpha-9 assigned to Node"}
                          {i === 2 && "Tactical intercept vehicle in transit"}
                          {i === 3 && "Intervention team has reached the site"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* EMERGENCY SUMMARY CARD */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-premium dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full"></div>
            
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Incident Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Primary Message</label>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed italic">
                      "{emergencyData.message || 'No situational details provided.'}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                   <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                      <Radio className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Protocol Active</p>
                      <p className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase">Emergency Contacts Notified</p>
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Last Known Fix</p>
                    <p className="text-sm font-black dark:text-white uppercase tracking-tight">{emergencyData.location || 'Tactical Sector G-14'}</p>
                    <p className="text-[10px] font-mono text-blue-600 font-bold mt-1">[{emergencyData.coords?.[0]}, {emergencyData.coords?.[1]}]</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Incident Type</p>
                    <p className="text-sm font-black dark:text-white uppercase tracking-tight">{emergencyData.type || 'SOS SIGNAL'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: MAP & RESPONDER */}
        <div className="lg:col-span-5 space-y-10">
          {/* TACTICAL MAP CARD */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-premium dark:shadow-none border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
            <div className="h-[450px] rounded-[2rem] overflow-hidden relative shadow-inner">
               <MapContainer
                center={emergencyData.coords || [34.0522, -118.2437]}
                zoom={15}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={emergencyData.coords || [34.0522, -118.2437]} icon={L.divIcon({
                  className: 'custom-marker',
                  html: `
                    <div class="relative flex items-center justify-center">
                      <div class="radar-secondary !border-red-600"></div>
                      <div class="w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-premium relative z-10"></div>
                    </div>
                  `,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                })} />
              </MapContainer>

              {/* Radar Effect Overlay for Rescue Team */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center bg-blue-600/5">
                <div className="radar-ring w-[300px] h-[300px]"></div>
                <div className="radar-ring w-[500px] h-[500px] delay-700"></div>
                <div className="radar-ring w-[700px] h-[700px] delay-1000"></div>
              </div>

              {/* Status Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-slate-900/90 backdrop-blur-md px-8 py-5 rounded-[2rem] flex items-center justify-between border border-white/10 shadow-2xl">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-white animate-bounce" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Estimated Arrival</p>
                        <p className="text-xl font-black text-white">{eta} MINS</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Distance</p>
                      <p className="text-xl font-black text-blue-400">{distance.toFixed(1)} KM</p>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* RESPONDER TEAM CARD */}
          <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
             
             <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden border-2 border-blue-500/50">
                  <img src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2674&auto=format&fit=crop" className="w-full h-full object-cover" alt="Team Lead" />
                </div>
                <div>
                   <h4 className="text-xl font-black uppercase tracking-tight">Alpha-9 Intercept Team</h4>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Team Lead: Cmdr. Elias Thorne</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Responder Status</span>
                   <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Active Operative</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Secure Channel</span>
                   <span className="text-[11px] font-black text-white uppercase tracking-widest">CH-029-B-TAC</span>
                </div>
             </div>

             <div className="mt-8 flex gap-3">
                <button className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                   <Shield className="w-4 h-4" /> Message Team
                </button>
                <button className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                   <Users className="w-4 h-4" /> Personnel Details
                </button>
             </div>
          </section>
        </div>
      </div>

      {/* TACTICAL NOTIFICATIONS OVERLAY */}
      <div className="fixed bottom-8 right-8 z-[2000] flex flex-col gap-4 max-w-sm">
        <AnimatePresence>
          {notifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Response Node Feed</p>
                <p className="text-xs font-bold text-white tracking-tight">{note.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tracking;
