import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, Activity, Users, Ambulance, Package, Map as MapIcon, 
  AlertCircle, ChevronRight, RefreshCw, Compass, Flame, Wind, Droplet, 
  Waves, Zap, Box, TrendingUp, Home, Globe, BookOpen, HeartPulse, Building, AlertTriangle,
  Radio, HardHat, FileText, Globe2, ExternalLink, Image as ImageIcon,
  Cpu, Target, Play, BarChart3, CloudRain, Binary, Lock, ZapOff, Terminal, ArrowRight, FileWarning
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoredReports } from './ReportDisaster';

// --- HI-TECH DISASTER MARKERS ---
const createDisasterIcon = (type) => {
  const color = type === 'FIRE' ? '#ff4d4d' : type === 'STORM' ? '#33ccff' : type === 'FLOOD' ? '#00e5ff' : '#ff9900';
  const icon = type === 'FIRE' ? '🔥' : type === 'STORM' ? '🌀' : type === 'FLOOD' ? '🌊' : '🫨';
  
  return L.divIcon({
    className: 'disaster-node font-sans',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
        <div class="w-8 h-8 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-[10px] text-white font-bold" style="background-color: ${color}">${icon}</div>
      </div>
    `,
    iconSize: [32, 32]
  });
};

const createUserReportIcon = (severity) => {
  const color = severity === 'High' ? '#7c3aed' : severity === 'Medium' ? '#d97706' : '#059669';
  return L.divIcon({
    className: 'user-report-marker',
    html: `<div class="relative flex items-center justify-center">
             <div class="w-5 h-5 rounded-full border-2 border-white shadow-lg z-10" style="background: ${color}"></div>
             <div class="absolute inset-0 rounded-full animate-ping opacity-60" style="background: ${color}"></div>
           </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.flyTo(center, 5, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [userReports, setUserReports] = useState(() => getStoredReports().filter(r => r.status === 'APPROVED').slice(0, 5));
  const [resources, setResources] = useState({
    ambulances: 24,
    shelters: 12,
    personnel: 156,
    lastUpdate: null
  });
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [selectedPos, setSelectedPos] = useState([18, 77]);
  const [lastUpdate, setLastUpdate] = useState("Command Hub Status: READY");
  const [operationLog, setOperationLog] = useState([
    "System initialized successfully.",
    "Connecting to Satellite Core...",
    "Security bridge established."
  ]);

  const addLog = (msg) => {
    setOperationLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  // --- DYNAMIC DATA ENGINE ---
  const globalImpact = useMemo(() => {
    if (incidents.length === 0) return { exposure: 0, vulnerability: 0, criticality: 0 };
    const criticalCount = incidents.filter(i => i.severity === 'CRITICAL').length;
    const avgMag = incidents.reduce((acc, i) => acc + (i.magnitude || 0), 0) / incidents.length;
    return {
      exposure: Math.min(Math.round(criticalCount * 6.5 + (avgMag * 5)), 100),
      vulnerability: Math.min(Math.round(criticalCount * 4.2 + (avgMag * 8)), 100),
      criticality: (avgMag + (criticalCount / 2)).toFixed(1)
    };
  }, [incidents]);

  const fetchData = async () => {
    setSyncing(true);
    try {
      const quakeResp = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15&minmagnitude=3.0');
      const quakeData = await quakeResp.json();
      const quakes = (quakeData.features || []).map(f => ({
        id: f.id, title: f.properties.place, magnitude: f.properties.mag, type: 'QUAKE',
        time: new Date(f.properties.time).toLocaleTimeString(),
        pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]], severity: f.properties.mag >= 6 ? 'CRITICAL' : 'MINOR'
      })).filter(q => q.pos[0] !== undefined);

      const nasaResp = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?days=30&status=open');
      const nasaData = await nasaResp.json();
      const nasaEvents = (nasaData.events || []).map(ev => {
        const cat = ev.categories?.[0]?.id;
        const type = cat === 8 ? 'FIRE' : (cat === 10 ? 'STORM' : 'FLOOD');
        const pos = ev.geometries?.[0]?.coordinates;
        if (!pos) return null;
        return {
          id: ev.id, title: ev.title, magnitude: 7.2, type: type, time: 'NASA LIVE',
          pos: [pos[1], pos[0]], severity: 'CRITICAL'
        };
      }).filter(ev => ev !== null);

      setIncidents([...quakes, ...nasaEvents.slice(0, 15)]); 
      setLastUpdate(new Date().toLocaleTimeString());
      setResources(prev => ({ ...prev, lastUpdate: new Date().toLocaleTimeString() }));
      addLog(`Data Sync Complete: ${quakes.length + nasaEvents.length} active nodes detected.`);
    } catch (err) {
      addLog(`CRITICAL ERROR: Satellite bridge timeout.`);
    } finally { setSyncing(false); }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = () => setUserReports(getStoredReports().filter(r => r.status === 'APPROVED').slice(0, 5));
    window.addEventListener('aegis:new-report', handler);
    return () => window.removeEventListener('aegis:new-report', handler);
  }, []);

  const handleSelectIncident = (inc) => {
    if (inc?.pos) {
      setSelectedIncident(inc);
      setSelectedPos(inc.pos);
      addLog(`Geo-tracking node: ${inc.title}`);
    }
  };

  const handleDeploy = (type) => {
    if (resources.ambulances === 0) {
      addLog("DEPLOYMENT FAILED: No units available.");
      return;
    }
    setResources(prev => ({ ...prev, ambulances: prev.ambulances - 1 }));
    addLog(`DEPLOYMENT SUCCESS: ${type} dispatched to active node.`);
  };

  const threat = useMemo(() => {
    if (!selectedIncident) return null;
    const type = selectedIncident.type;
    const mag = selectedIncident.magnitude;
    if (type === 'FIRE') return { icon: <Flame className="w-6 h-6"/>, bg: 'bg-red-500', exposure: '124k', risk: 85, desc: "SATELLITE INTEL: Active firefront detected via radar scan.", instruction: "Tactical: Deploy aerial thermal blocking. Evacuate all sectors." };
    if (type === 'STORM') return { icon: <Wind className="w-6 h-6"/>, bg: 'bg-blue-500', exposure: '2.4m', risk: 94, desc: "AERIAL REPORT: Cyclonic wall structure confirmed. High-kinetic debris hazard.", instruction: "Tactical: Seek structural reinforcement. Ground all flight logistics." };
    if (type === 'FLOOD') return { icon: <Waves className="w-6 h-6"/>, bg: 'bg-cyan-500', exposure: '450k', risk: 78, desc: "HYDRO-SYNC: Basin overflow confirmed via satellite radar scan.", instruction: "Tactical: Deploy aquatic extraction. Confirm safe elevations." };
    return { icon: <Activity className="w-6 h-6"/>, bg: 'bg-orange-500', exposure: '15k', risk: 65, desc: `SEISMIC IMPACT [${mag}]: Fault line discharge localized. Local tremors confirmed.`, instruction: "Tactical: Execute Search & Recovery. Initiate architectural triage." };
  }, [selectedIncident]);

  return (
    <div className="flex-1 bg-slate-50 min-h-screen text-slate-800 p-8 md:p-12 space-y-12 font-sans tracking-tight relative overflow-x-hidden">
      
      {/* 1. COMMAND HUD */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 max-w-[1700px] mx-auto mb-6">
        <div className="space-y-4">
           <div className="flex items-center gap-5">
              <Shield className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">AI Sentinel <span className="text-blue-600">Override</span></h1>
           </div>
           <p className="text-sm font-bold text-slate-400 max-w-sm italic uppercase tracking-wider">Global Defense & Tactical Coordination Hub.</p>
        </div>
        <div className="flex items-center gap-8 bg-white px-10 py-5 rounded-full shadow-xl border-[4px] border-white">
           <div className="flex items-center gap-5 border-r border-slate-100 pr-8">
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global Criticality</p>
                 <p className="text-xl font-black text-red-600">[{globalImpact.criticality}]<span className="text-[10px] text-slate-400 italic">/10</span></p>
              </div>
              <Binary className="w-6 h-6 text-red-600 animate-pulse" />
           </div>
           <div className="flex items-center gap-5 border-r border-slate-100 pr-8">
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Health</p>
                 <p className="text-xl font-black text-blue-600">98.4%</p>
              </div>
              <Activity className="w-6 h-6 text-blue-600" />
           </div>
           <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${syncing ? 'bg-blue-600 animate-ping' : 'bg-green-500'}`} />
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{lastUpdate}</span>
           </div>
        </div>
      </header>

      {/* 2. MAIN HUB */}
      <main className="grid grid-cols-1 xl:grid-cols-12 gap-12 max-w-[1700px] mx-auto relative">
        <div className="xl:col-span-8 flex flex-col gap-12">
           {/* MAP */}
           <div className="bg-white rounded-[56px] shadow-2xl border-[6px] border-white overflow-hidden h-[600px] relative z-0 shadow-slate-200">
              <MapContainer center={[20, 0]} zoom={2.5} style={{ width: '100%', height: '100%', background: '#f8fafc' }} zoomControl={false} attributionControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <MapController center={selectedPos} />
                {incidents.map(inc => (
                  <Marker key={inc.id} position={inc.pos} icon={createDisasterIcon(inc.type)} eventHandlers={{ click: () => handleSelectIncident(inc) }}>
                    <Popup className="saas-popup">
                       <div className="p-6 w-64 space-y-4">
                          <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{inc.title}</h4>
                          <button onClick={() => handleSelectIncident(inc)} className="block w-full py-4 bg-slate-900 text-white text-[10px] font-black text-center rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-blue-600">Analyze Threat</button>
                       </div>
                    </Popup>
                  </Marker>
                ))}
                {userReports.filter(r => r.locCoords).map(r => (
                  <Marker key={r.id} position={r.locCoords} icon={createUserReportIcon(r.severity)} eventHandlers={{ click: () => addLog(`Field Report: ${r.disasterType} at ${r.location}`) }}>
                    <Popup className="saas-popup">
                      <div className="p-4 w-60 space-y-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 uppercase tracking-widest">User Report</span>
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{r.disasterType}</h4>
                        <p className="text-xs text-slate-500 font-medium truncate">{r.location}</p>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Severity</span>
                          <span className={`text-[10px] font-black ${r.severity === 'High' ? 'text-red-500' : r.severity === 'Medium' ? 'text-amber-500' : 'text-emerald-600'}`}>{r.severity}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{r.description.slice(0, 80)}...</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
           </div>

           {/* INTELLIGENCE STREAM */}
           <div className="bg-white rounded-[56px] shadow-sm border-[6px] border-white p-12 overflow-hidden relative">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-12 italic">Intelligence Stream</h2>
              <div className="space-y-6">
                 {incidents.slice(0, 4).map((inc) => (
                   <div key={inc.id} onClick={() => handleSelectIncident(inc)} className={`group flex items-center justify-between p-8 rounded-[40px] border-[3px] transition-all cursor-pointer ${selectedIncident?.id === inc.id ? 'bg-blue-50 border-blue-200 shadow-xl' : 'bg-slate-50 border-slate-50 hover:bg-white hover:border-slate-200'}`}>
                     <div className="flex items-center gap-8">
                        <div className={`p-5 rounded-3xl ${inc.type === 'FIRE' ? 'bg-red-50 text-red-600' : inc.type === 'STORM' ? 'bg-blue-50 text-blue-600' : inc.type === 'FLOOD' ? 'bg-cyan-50 text-cyan-600' : 'bg-orange-50 text-orange-600'}`}>
                           {inc.type === 'FIRE' ? <Flame className="w-8 h-8" /> : inc.type === 'STORM' ? <Wind className="w-8 h-8" /> : inc.type === 'FLOOD' ? <Droplet className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                        </div>
                        <div><h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 uppercase tracking-tighter leading-none">{inc.title}</h4><p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">{inc.severity} LEAD • {inc.time}</p></div>
                     </div>
                     <ChevronRight className={`w-8 h-8 transition-all ${selectedIncident?.id === inc.id ? 'text-blue-600 translate-x-3' : 'text-slate-200 group-hover:text-blue-500'}`} />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-12">
           {/* RESOURCE OPS */}
           <div className="bg-white rounded-[56px] shadow-2xl border-[6px] border-white p-12 overflow-hidden relative shadow-slate-200 min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Resource Ops</h2>
                 <Shield className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-8 flex-1">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-3">
                          <Ambulance className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-bold text-slate-800 uppercase">Ambulance Fleet</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">{resources.ambulances}/30</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${(resources.ambulances / 30) * 100}%` }} className="h-full bg-blue-600" />
                    </div>
                    <button onClick={() => handleDeploy('Ambulance')} className="w-full py-4 px-6 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm">Dispatch Emergency Unit</button>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-indigo-600" />
                          <span className="text-sm font-bold text-slate-800 uppercase">Active Rescuers</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">{resources.personnel}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: "84%" }} className="h-full bg-indigo-600" />
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">System Sequence Log</h3>
                 <div className="space-y-3 font-mono text-[10px] text-slate-500 leading-relaxed uppercase">
                    {operationLog.map((log, i) => (
                      <div key={i} className={`flex items-start gap-2 ${i === 0 ? 'text-blue-600 font-bold' : ''}`}>
                         <span className="mt-1 opacity-40">→</span>
                         <span className="truncate">{log}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* FIELD REPORTS LIST */}
           <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                    <Radio className="w-5 h-5 text-red-500" />
                    <h2 className="text-base font-black text-slate-900 uppercase">Field Reports</h2>
                 </div>
                 <Link to="/report" className="px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800">New Report</Link>
              </div>
              <div className="space-y-3">
                 {userReports.map((r, i) => (
                   <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all group cursor-default">
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase text-red-500">{r.severity}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{r.disasterType}</span>
                         </div>
                         <p className="text-xs font-black text-slate-800 truncate uppercase">{r.location}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-500 ml-2" />
                   </div>
                 ))}
                 {userReports.length === 0 && <p className="text-center text-[10px] font-bold text-slate-400 py-6 uppercase">No reports available</p>}
              </div>
           </div>
        </div>

        {/* SLIDING SIDE PANEL */}
        <AnimatePresence>
          {selectedIncident && threat && (
            <motion.div key={selectedIncident.id} initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 120 }} className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-[-60px_0_150px_rgba(0,0,0,0.15)] z-[6000] border-l-[12px] border-slate-50 p-12 overflow-y-auto">
               <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4 flex-1">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border-2 border-blue-100 rounded-xl font-black text-[10px] text-blue-800 uppercase tracking-widest"><Zap className="w-4 h-4" /> Sentinel Intel</div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">{selectedIncident.title}</h3>
                  </div>
                  <button onClick={() => setSelectedIncident(null)} className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-red-50 flex items-center justify-center border-2 border-slate-100">✕</button>
               </div>
               <div className="space-y-12">
                  <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 font-sans">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest italic leading-none">Impact Analysis</p>
                    <p className="text-xl font-bold text-slate-800 leading-relaxed italic animate-pulse font-sans">"{threat.desc}"</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="p-8 bg-white rounded-[40px] border-2 border-slate-50 shadow-sm text-center">
                        <p className="text-[10px] text-slate-400 mb-4 uppercase italic">Intensity</p>
                        <p className="text-4xl text-slate-900 tracking-tighter font-black">{selectedIncident.magnitude || 'LIVE'}</p>
                     </div>
                     <div className="p-8 bg-white rounded-[40px] border-2 border-slate-50 shadow-sm text-center">
                        <p className="text-[10px] text-slate-400 mb-4 uppercase italic">Category</p>
                        <p className="text-2xl text-blue-600 tracking-tighter font-black">{selectedIncident.type}</p>
                     </div>
                  </div>
                  <div className="space-y-10">
                    <div className="flex items-start gap-8 group">
                      <div className={`p-6 rounded-[24px] ${threat.bg} text-white shadow-2xl flex-shrink-0 animate-bounce`}>{threat.icon}</div>
                      <div className="pt-2">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 italic">Tactical SOP</p>
                        <p className="text-lg font-bold text-slate-500 leading-relaxed italic">{threat.instruction}</p>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .leaflet-attribution-flag, .leaflet-control-attribution { display: none !important; }
        .saas-popup .leaflet-popup-content-wrapper { border-radius: 40px; box-shadow: 0 40px 100px rgba(0,0,0,0.15); border: 2px solid #f8fafc; padding: 12px; }
        .saas-popup .leaflet-popup-tip { display: none; }
        .custom-live-marker, .user-report-marker { background: transparent !important; border: none !important; }
      `}</style>
    </div>
  );
};

export default Dashboard;
