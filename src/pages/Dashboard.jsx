import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, MapPin, Compass, Shield, Ambulance, 
  Terminal, RefreshCw, AlertCircle, ChevronRight, 
  Layers, Filter, Info, Package, Users
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- SERVICE LAYER (REPLACING MOCKS) ---
const DISASTER_API = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15&minmagnitude=4.5';

// Fix for icon loading issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Production-Ready Marker
const createLiveIcon = (mag) => {
  const color = mag >= 6 ? '#dc2626' : '#ea580c';
  return L.divIcon({
    className: 'custom-live-marker',
    html: `<div class="relative flex items-center justify-center">
             <div class="w-4 h-4 rounded-full bg-white shadow-md border-2 border-[${color}] z-10 flex items-center justify-center">
               <div class="w-1.5 h-1.5 rounded-full" style="background: ${color}"></div>
             </div>
             <div class="absolute inset-0 rounded-full animate-ping opacity-25" style="background: ${color}"></div>
           </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => { if (center) map.flyTo(center, 6, { duration: 1.5 }); }, [center, map]);
  return null;
};

const Dashboard = () => {
  // --- REAL DATA STATE ---
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState({
    ambulances: 24,
    shelters: 12,
    personnel: 156,
    lastUpdate: null
  });
  const [selectedPos, setSelectedPos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLog, setOperationLog] = useState([
     "System initialized successfully.",
     "Connecting to USGS Satellite Core...",
     "Security bridge established."
  ]);

  // --- CORE DATA ENGINE (REPLACE ALL MOCK DATA) ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(DISASTER_API);
      if (!response.ok) throw new Error('Satellite bridge timeout.');
      const data = await response.json();
      
      const mapped = (data.features || []).map(f => ({
        id: f.id,
        title: f.properties.place,
        magnitude: f.properties.mag,
        pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
        time: new Date(f.properties.time).toLocaleTimeString(),
        severity: f.properties.mag >= 6 ? 'CRITICAL' : 'WARNING',
        url: f.properties.url
      }));

      setIncidents(mapped);
      setResources(prev => ({ ...prev, lastUpdate: new Date().toLocaleTimeString() }));
      addLog(`Data Sync Complete: ${mapped.length} active nodes detected.`);
    } catch (err) {
      setError(err.message);
      addLog(`CRITICAL ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 600000); // 10 min refresh
    return () => clearInterval(interval);
  }, [fetchData]);

  const addLog = (msg) => {
    setOperationLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  // --- FUNCTIONALITY: ACTION HANDLERS ---
  const handleDeploy = (type) => {
    if (resources.ambulances === 0) {
      addLog("DEPLOYMENT FAILED: No units available.");
      return;
    }
    setResources(prev => ({ ...prev, ambulances: prev.ambulances - 1 }));
    addLog(`DEPLOYMENT SUCCESS: ${type} dispatched to active node.`);
  };

  // --- UI COMPONENTS ---
  return (
    <div className="flex-1 bg-slate-50 min-h-screen text-slate-800 p-6 md:p-12 space-y-10 font-sans tracking-tight">
      
      {/* 1. PRODUCT HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-[1700px] mx-auto">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <Terminal className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tightest uppercase italic">Aegis <span className="text-blue-600">Terminal</span></h1>
           </div>
           <p className="text-lg font-medium text-slate-500 max-w-xl">Unified incident response and resource orchestration for global disaster management.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:block text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Network Status</p>
              <div className="flex items-center gap-2 justify-end">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <p className="text-xs font-black text-slate-700">OPERATIONAL</p>
              </div>
           </div>
        </div>
      </header>

      {/* 2. THE TWO KEY SECTIONS (FOCUS-DRIVEN UI) */}
      <main className="grid grid-cols-1 xl:grid-cols-12 gap-10 max-w-[1700px] mx-auto">
        
        {/* SECTION 1: LIVE INTELLIGENCE FEED & MAP (65% width) */}
        <div className="xl:col-span-8 flex flex-col gap-10">
           
           {/* THE REAL MAP */}
           <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden h-[600px] relative z-0">
              {loading && !incidents.length && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                   <Globe className="w-10 h-10 text-blue-600 animate-bounce mb-4" />
                   <p className="font-bold text-slate-400 uppercase tracking-widest text-sm">Initializing Satellite Map...</p>
                </div>
              )}
              
              <MapContainer 
                center={[20, 0]} zoom={2.5}
                style={{ width: '100%', height: '100%', background: '#f8fafc' }}
                zoomControl={false} attributionControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <MapController center={selectedPos} />
                {incidents.map(inc => (
                  <Marker 
                    key={inc.id} 
                    position={inc.pos} 
                    icon={createLiveIcon(inc.magnitude)}
                    eventHandlers={{ click: () => addLog(`Geo-tracking node: ${inc.title}`) }}
                  >
                    <Popup className="saas-popup">
                       <div className="p-4 w-56 space-y-3">
                          <h4 className="text-sm font-bold text-slate-800 leading-tight uppercase tracking-tight">{inc.title}</h4>
                          <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                             <span className="text-[10px] font-black text-slate-400 uppercase">Mag</span>
                             <span className={`text-[10px] font-black ${inc.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'}`}>{inc.magnitude}</span>
                          </div>
                          <a href={inc.url} target="_blank" rel="noreferrer" className="block w-full py-2 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold text-center rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-all">Case File</a>
                       </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map Controls */}
              <div className="absolute top-8 left-8 z-[1000] space-y-3">
                 <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-6">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]"></span> <span className="text-xs font-black uppercase tracking-tight text-slate-600">Critical</span></div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> <span className="text-xs font-black uppercase tracking-tight text-slate-600">Minor</span></div>
                 </div>
              </div>
           </div>

           {/* REAL-TIME FEED ACTION LIST */}
           <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">Active Incident Stream</h2>
                 <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">{incidents.length} Nodes Online</span>
              </div>

              <div className="space-y-4">
                 {incidents.slice(0, 5).map((inc, i) => (
                   <div 
                     key={inc.id}
                     onClick={() => setSelectedPos(inc.pos)}
                     className="group flex items-center justify-between p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all cursor-pointer"
                   >
                     <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl ${inc.severity === 'CRITICAL' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                           <Globe className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600 uppercase tracking-tighter">{inc.title}</h4>
                           <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">{inc.severity} SENSING • AT {inc.time}</p>
                        </div>
                     </div>
                     <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-500 transition-all translate-x-0 group-hover:translate-x-2" />
                   </div>
                 ))}
                 <button onClick={fetchData} className="w-full py-5 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs hover:text-slate-900 transition-colors">Load Extended Historical Feed</button>
              </div>
           </div>
        </div>

        {/* SECTION 2: RESOURCE COMMAND CENTER (35% width) */}
        <div className="xl:col-span-4 flex flex-col gap-10">
           
           {/* RESOURCE STATUS BARS */}
           <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">Resource Ops</h2>
                 <Shield className="w-6 h-6 text-blue-600" />
              </div>

              <div className="space-y-10 flex-1">
                 {/* Ambulances */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-3">
                          <Ambulance className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-bold text-slate-800 uppercase">Ambulance Fleet</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">{resources.ambulances}/30</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(resources.ambulances / 30) * 100}%` }}
                         className="h-full bg-blue-600"
                       />
                    </div>
                    <button 
                      onClick={() => handleDeploy('Ambulance')}
                      className="w-full py-4 px-6 border-2 border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
                    >
                       Dispatch Emergency Unit
                    </button>
                 </div>

                 {/* Personnel */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-indigo-600" />
                          <span className="text-sm font-bold text-slate-800 uppercase">Active Rescuers</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">{resources.personnel}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: "84%" }} className="h-full bg-indigo-600" />
                    </div>
                 </div>

                 {/* Alert System */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-bold text-slate-800 uppercase">Emergency Supplies</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">72%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: "72%" }} className="h-full bg-orange-600" />
                    </div>
                 </div>
              </div>

              {/* TERMINAL LOGS (Subtle Realism) */}
              <div className="mt-12 pt-10 border-t border-slate-100">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">System Sequence Log</h3>
                 <div className="space-y-4 font-mono text-[11px] text-slate-500 leading-relaxed">
                    {operationLog.map((log, i) => (
                      <div key={i} className={`flex items-start gap-2 ${i === 0 ? 'text-blue-600 font-bold' : ''}`}>
                         <span className="mt-1 opacity-40">→</span>
                         <span className="uppercase">{log}</span>
                      </div>
                    ))}
                 </div>
                 <div className="mt-10 p-6 bg-slate-950 rounded-3xl border border-slate-800 group cursor-pointer hover:border-blue-600 transition-all">
                    <div className="flex items-center justify-between mb-4">
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global Watchdog</p>
                       <Globe className="w-4 h-4 text-blue-500 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tighter group-hover:text-slate-200">Real-time anomaly detection is currently monitoring 14 active coastal sectors. Alerts are being prioritized by magnitude and population density.</p>
                 </div>
              </div>
           </div>
        </div>

      </main>

      {/* ERROR / OVERLAY */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-10 left-10 right-10 md:left-auto md:right-10 md:w-96 z-[2000]"
          >
            <div className="bg-red-600 text-white p-8 rounded-[32px] shadow-2xl border border-red-500 flex items-center gap-4">
               <AlertCircle className="w-8 h-8" />
               <div>
                  <h4 className="font-black uppercase text-xs tracking-widest underline mb-1">Signal Outage</h4>
                  <p className="text-sm font-bold uppercase">{error}</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-live-marker { background: transparent !important; border: none !important; }
        .saas-popup .leaflet-popup-content-wrapper { border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; padding: 4px; }
        .saas-popup .leaflet-popup-tip { display: none; }
        .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>
    </div>
  );
};

export default Dashboard;
