<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Activity, Users, Ambulance, Package, Map as MapIcon, 
  AlertCircle, ChevronRight, RefreshCw, Compass, Flame, Wind, Droplet, 
  Waves, Zap, Box, TrendingUp, Home, Globe, BookOpen, HeartPulse, Building, AlertTriangle,
  Radio, HardHat, FileText, Globe2, ExternalLink, Image as ImageIcon,
  Cpu, Target, Play, BarChart3, CloudRain, Binary, Lock, ZapOff
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

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
=======
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, MapPin, Shield, Ambulance, 
  Terminal, AlertCircle, ChevronRight, 
  Package, Users, Radio, ArrowRight, FileWarning
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStoredReports } from './ReportDisaster';

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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
  });
};

const MapController = ({ center }) => {
  const map = useMap();
<<<<<<< HEAD
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.flyTo(center, 5, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [selectedPos, setSelectedPos] = useState([18, 77]);
  const [lastUpdate, setLastUpdate] = useState("Command Hub Status: READY");

  // --- DYNAMIC DATA ENGINE (REAL-TIME RISK) ---
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
    } catch (err) { } finally { setSyncing(false); }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectIncident = (inc) => {
    if (inc?.pos) {
      setSelectedIncident(inc);
      setSelectedPos(inc.pos);
    }
  };

  const handleLegendNavigate = (type) => {
    const list = incidents.filter(inc => inc.type === type).sort((a, b) => b.magnitude - a.magnitude);
    if (list.length > 0) handleSelectIncident(list[0]);
  };

  const threat = useMemo(() => {
    if (!selectedIncident) return null;
    const type = selectedIncident.type;
    const mag = selectedIncident.magnitude;
    if (type === 'FIRE') return { icon: <Flame className="w-6 h-6 font-sans"/>, bg: 'bg-red-500', exposure: '124k', risk: 85, desc: "SATELLITE INTEL: Active firefront detected via radar scan.", instruction: "Tactical: Deploy aerial thermal blocking. Evacuate all sectors." };
    if (type === 'STORM') return { icon: <Wind className="w-6 h-6 font-sans"/>, bg: 'bg-blue-500', exposure: '2.4m', risk: 94, desc: "AERIAL REPORT: Cyclonic wall structure confirmed. High-kinetic debris hazard.", instruction: "Tactical: Seek structural reinforcement. Ground all flight logistics." };
    if (type === 'FLOOD') return { icon: <Waves className="w-6 h-6 font-sans"/>, bg: 'bg-cyan-500', exposure: '450k', risk: 78, desc: "HYDRO-SYNC: Basin overflow confirmed via satellite radar scan.", instruction: "Tactical: Deploy aquatic extraction. Confirm safe elevations." };
    return { icon: <Activity className="w-6 h-6 font-sans"/>, bg: 'bg-orange-500', exposure: '15k', risk: 65, desc: `SEISMIC IMPACT [${mag}]: Fault line discharge localized. Local tremors confirmed.`, instruction: "Tactical: Execute Search & Recovery. Initiate architectural triage." };
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
           <p className="text-sm font-bold text-slate-400 max-w-sm italic uppercase tracking-wider font-sans">Global Defense & Tactical Coordination Hub.</p>
        </div>
        <div className="flex items-center gap-8 bg-white px-10 py-5 rounded-full shadow-xl border-[4px] border-white font-sans">
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
                 <p className="text-xl font-black text-blue-600 font-sans">98.4%</p>
              </div>
              <Activity className="w-6 h-6 text-blue-600 font-sans" />
           </div>
           <div className="flex items-center gap-4 font-sans">
              <div className={`w-3 h-3 rounded-full ${syncing ? 'bg-blue-600 animate-ping font-sans' : 'bg-green-500'}`} />
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest font-sans">{lastUpdate}</span>
=======
  useEffect(() => { if (center) map.flyTo(center, 6, { duration: 1.5 }); }, [center, map]);
  return null;
};

// Color helper for user-submitted report severity
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

const Dashboard = () => {
  // --- REAL DATA STATE ---
  const [incidents, setIncidents] = useState([]);
  const [userReports, setUserReports] = useState(() => getStoredReports().filter(r => r.status === 'APPROVED').slice(0, 5));
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

  // Listen for new field reports submitted from the Report Disaster page
  useEffect(() => {
    const handler = () => setUserReports(getStoredReports().filter(r => r.status === 'APPROVED').slice(0, 5));
    window.addEventListener('aegis:new-report', handler);
    return () => window.removeEventListener('aegis:new-report', handler);
  }, []);

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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
           </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* 2. MAIN HUB (MAP & SIDE INTEL) */}
      <main className="grid grid-cols-1 xl:grid-cols-12 gap-12 max-w-[1700px] mx-auto relative font-sans">
        <div className="xl:col-span-8 flex flex-col gap-12 font-sans">
           <div className="bg-white rounded-[56px] shadow-2xl border-[6px] border-white overflow-hidden h-[600px] relative z-0 shadow-slate-200">
              <MapContainer center={[20, 0]} zoom={2.5} style={{ width: '100%', height: '100%', background: '#f8fafc' }} zoomControl={false} attributionControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <MapController center={selectedPos} />
                {incidents.map(inc => (
                  <Marker key={inc.id} position={inc.pos} icon={createDisasterIcon(inc.type)} eventHandlers={{ click: () => handleSelectIncident(inc) }}>
                    <Popup className="saas-popup">
                       <div className="p-6 w-64 space-y-4 font-sans">
                          <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{inc.title}</h4>
                          <button onClick={() => handleSelectIncident(inc)} className="block w-full py-4 bg-slate-900 text-white text-[10px] font-black text-center rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-blue-600 font-sans">Analyze Threat</button>
=======
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
                       </div>
                    </Popup>
                  </Marker>
                ))}
<<<<<<< HEAD
              </MapContainer>
              {/* RESTORED: LEGEND BUTTONS */}
              <div className="absolute bottom-10 left-10 z-[1000]">
                 <div className="bg-white/95 backdrop-blur-xl px-12 py-6 rounded-full shadow-2xl border-[4px] border-white flex items-center gap-12">
                   {['QUAKE', 'STORM', 'FIRE', 'FLOOD'].map(type => (
                     <button key={type} onClick={() => handleLegendNavigate(type)} className="flex items-center gap-5 group active:scale-95 transition-all">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-lg group-hover:scale-125 transition-transform ${type==='FIRE'?'bg-[#ff4d4d]':type==='STORM'?'bg-[#33ccff]':type==='QUAKE'?'bg-[#ff9900]':'bg-[#00e5ff]'}`}>
                           {type==='FIRE'?'🔥':type==='STORM'?'🌀':type==='QUAKE'?'🫨':'🌊'}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">{type}</span>
                     </button>
                   ))}
=======
              {/* User-submitted report markers */}
              {userReports.filter(r => r.locCoords).map(r => (
                <Marker
                  key={r.id}
                  position={r.locCoords}
                  icon={createUserReportIcon(r.severity)}
                  eventHandlers={{ click: () => addLog(`Field Report: ${r.disasterType} at ${r.location}`) }}
                >
                  <Popup className="saas-popup">
                    <div className="p-4 w-60 space-y-2">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 uppercase tracking-widest">User Report</span>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{r.disasterType}</h4>
                      <p className="text-xs text-slate-500 font-medium truncate">{r.location}</p>
                      <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Severity</span>
                        <span className={`text-[10px] font-black ${r.severity === 'High' ? 'text-red-500' : r.severity === 'Medium' ? 'text-amber-500' : 'text-emerald-600'}`}>{r.severity}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{r.description.slice(0, 80)}{r.description.length > 80 ? '...' : ''}</p>
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
                 </div>
              </div>
           </div>

<<<<<<< HEAD
           <div className="bg-white rounded-[56px] shadow-sm border-[6px] border-white p-12 overflow-hidden relative">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-12 italic font-sans font-sans font-sans">Intelligence Stream</h2>
              <div className="space-y-6">
                 {incidents.slice(0, 4).map((inc) => (
                   <div key={inc.id} onClick={() => handleSelectIncident(inc)} className={`group flex items-center justify-between p-8 rounded-[40px] border-[3px] transition-all cursor-pointer ${selectedIncident?.id === inc.id ? 'bg-blue-50 border-blue-200 shadow-xl' : 'bg-slate-50 border-slate-50 hover:bg-white hover:border-slate-200'}`}>
                     <div className="flex items-center gap-8">
                        <div className={`p-5 rounded-3xl ${inc.type === 'FIRE' ? 'bg-red-50 text-red-600' : inc.type === 'STORM' ? 'bg-blue-50 text-blue-600' : inc.type === 'FLOOD' ? 'bg-cyan-50 text-cyan-600' : 'bg-orange-50 text-orange-600'}`}>
                           {inc.type === 'FIRE' ? <Flame className="w-8 h-8 font-sans" /> : inc.type === 'STORM' ? <Wind className="w-8 h-8 font-sans" /> : inc.type === 'FLOOD' ? <Droplet className="w-8 h-8 font-sans" /> : <Activity className="w-8 h-8 font-sans" />}
                        </div>
                        <div><h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 uppercase tracking-tighter leading-none">{inc.title}</h4><p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">{inc.severity} LEAD • {inc.time}</p></div>
                     </div>
                     <ChevronRight className={`w-8 h-8 transition-all ${selectedIncident?.id === inc.id ? 'text-blue-600 translate-x-3' : 'text-slate-200 group-hover:text-blue-500 font-sans'}`} />
                   </div>
                 ))}
=======
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
              </div>
           </div>
        </div>

<<<<<<< HEAD
        <div className="xl:col-span-4 flex flex-col gap-12 font-sans">
           <div className="bg-white rounded-[56px] shadow-2xl border-[6px] border-white p-12 overflow-hidden relative shadow-slate-200 min-h-[600px] flex flex-col font-sans font-sans">
              <div className="flex justify-between items-center mb-16 relative z-10 font-black text-xl italic uppercase font-sans">Sentinel Engine <Cpu className="w-8 h-8 text-blue-600 animate-pulse font-sans font-sans" /></div>
              <div className="bg-slate-50 rounded-[40px] p-10 border-2 border-slate-100 flex-1 flex flex-col space-y-12 relative z-10 font-sans">
                 <div className="space-y-4 font-sans">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] font-sans italic">Data Core Verification</p>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic font-sans font-sans">"Strategic risk calculated via high-bandwidth telemetry from global nodes."</p>
                 </div>
                 <div className="space-y-10 font-sans font-sans">
                    <div className="space-y-4 font-sans">
                       <div className="flex justify-between items-end italic text-[10px] font-black uppercase text-slate-400 font-sans text-xs">Live Population exposure <span className="text-xl text-slate-900 font-sans font-sans font-sans">{globalImpact.exposure}%</span></div>
                       <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner"><motion.div animate={{ width: `${globalImpact.exposure}%` }} className="h-full bg-blue-600 shadow-[0_0_15px_#2563eb]" /></div>
                    </div>
                    <div className="space-y-4 font-sans">
                       <div className="flex justify-between items-end italic text-[10px] font-black uppercase text-slate-400 font-sans text-xs font-sans">Structural Vulnerability <span className="text-xl text-slate-900 font-sans font-sans font-sans font-sans font-sans">{globalImpact.vulnerability}%</span></div>
                       <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner font-sans"><motion.div animate={{ width: `${globalImpact.vulnerability}%` }} className="h-full bg-orange-600 shadow-[0_0_15px_#ea580c] font-sans" /></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* RESTORED: SLIDING SIDE PANEL */}
        <AnimatePresence>
          {selectedIncident && threat && (
            <motion.div key={selectedIncident.id} initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 120 }} className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-[-60px_0_150px_rgba(0,0,0,0.15)] z-[6000] border-l-[12px] border-slate-50 p-12 overflow-y-auto font-sans">
               <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4 flex-1 font-sans"><div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border-2 border-blue-100 rounded-xl font-black text-[10px] text-blue-800 uppercase tracking-widest"><Zap className="w-4 h-4" /> Sentinel Intel</div><h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">{selectedIncident.title}</h3></div>
                  <button onClick={() => setSelectedIncident(null)} className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-red-50 flex items-center justify-center border-2 border-slate-100 shadow-sm transition-all font-bold">✕</button>
               </div>
               <div className="space-y-12">
                  <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 font-sans"><p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest italic leading-none font-sans">Impact Analysis</p><p className="text-xl font-bold text-slate-800 leading-relaxed italic animate-pulse font-sans">"{threat.desc}"</p></div>
                  <div className="grid grid-cols-2 gap-8 font-sans font-sans">
                     <div className="p-8 bg-white rounded-[40px] border-2 border-slate-50 shadow-sm hover:border-blue-200 transition-all font-black uppercase text-center"><p className="text-[10px] text-slate-400 mb-4 tracking-widest italic leading-none">Intensity</p><p className="text-4xl text-slate-900 tracking-tighter tabular-nums mt-4">{selectedIncident.magnitude || 'LIVE'}</p></div>
                     <div className="p-8 bg-white rounded-[40px] border-2 border-slate-50 shadow-sm hover:border-blue-200 transition-all font-black uppercase text-center"><p className="text-[10px] text-slate-400 mb-4 tracking-widest italic leading-none">Category</p><p className="text-2xl text-blue-600 tracking-tighter mt-4">{selectedIncident.type}</p></div>
                  </div>
                  <div className="space-y-12 font-sans">
                     <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.6em] flex items-center gap-6">Strategic Protocols <div className="flex-1 h-[2px] bg-slate-100" /></h4>
                     <div className="space-y-10 font-sans font-sans">
                        <div className="flex items-start gap-8 group"><div className={`p-6 rounded-[24px] ${threat.bg} text-white shadow-2xl flex-shrink-0 animate-bounce`}>{threat.icon}</div><div className="pt-2"><p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 italic leading-none">Tactical SOP</p><p className="text-lg font-bold text-slate-500 transition-colors group-hover:text-slate-900 leading-relaxed italic shadow-slate-200">{threat.instruction}</p></div></div>
                        <div className="flex items-start gap-8 group font-sans"><div className="p-6 rounded-[24px] bg-slate-900 text-white shadow-2xl flex-shrink-0 font-sans font-sans"><Box className="w-6 h-6" /></div><div className="pt-2"><p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 italic leading-none">Sentinel Suggestion</p><p className="text-lg font-bold text-slate-500 transition-colors group-hover:text-slate-900 leading-relaxed italic">Initiate Sector Audit.</p></div></div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. DISASTER MANAGEMENT COMMAND MATRIX */}
      <section className="max-w-[1700px] mx-auto mt-24 pb-24 font-sans font-sans">
         <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-16 border-b-8 border-blue-600 w-fit pb-4 font-sans font-sans">Disaster Management</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 font-sans font-sans">
            
            {/* 1. Natural Hazards */}
            <div className="bg-white rounded-[40px] shadow-2xl border-[6px] border-white overflow-hidden flex flex-col group transition-all hover:shadow-red-50 shadow-slate-100 min-h-[500px]">
               <div className="h-64 relative bg-slate-100 overflow-hidden flex items-center justify-center font-sans">
                  <img src="/natural.jpg" onError={(e) => { e.target.src = "https://images.pexels.com/photos/1577413/pexels-photo-1577413.jpeg?auto=compress&cs=tinysrgb&w=800" }} alt="Natural Hazards" className="w-full h-full object-cover relative z-0 font-sans" loading="eager" />
                  <div className="absolute inset-0 bg-slate-900/10 font-sans font-sans" />
                  {!selectedIncident && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-600/20 to-orange-400/20 font-sans"><Flame className="w-16 h-16 text-white drop-shadow-lg" /></div>}
               </div>
               <div className="p-10 flex flex-col gap-8 flex-1 font-sans">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter pb-4 border-b-2 border-slate-50 italic">Natural Hazards</h3>
                  <div className="space-y-4 font-sans font-sans">
                     {['> Cyclone', '> Tsunami', '> Heat Wave', '> Landslide'].map((item) => (
                        <p key={item} className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 flex items-center justify-between font-sans">{item} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 font-sans" /></p>
                     ))}
                  </div>
               </div>
            </div>

            {/* 2. Man Made Hazards */}
            <div className="bg-white rounded-[40px] shadow-2xl border-[6px] border-white overflow-hidden flex flex-col group transition-all hover:shadow-blue-50 shadow-slate-100 min-h-[500px]">
               <div className="h-64 relative bg-slate-100 overflow-hidden flex items-center justify-center font-sans font-sans">
                  <img src="/manmade.jpg" onError={(e) => { e.target.src = "https://images.pexels.com/photos/9310114/pexels-photo-9310114.jpeg?auto=compress&cs=tinysrgb&w=800" }} alt="Man Made Hazards" className="w-full h-full object-cover relative z-0 font-sans" loading="eager" />
                  <div className="absolute inset-0 bg-slate-900/10 font-sans font-sans" />
                  {!selectedIncident && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600/20 to-blue-400/20"><Radio className="w-16 h-16 text-white drop-shadow-lg" /></div>}
               </div>
               <div className="p-10 flex flex-col gap-8 flex-1">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter pb-4 border-b-2 border-slate-50 italic font-sans font-sans font-sans">Man Made Hazards</h3>
                  <div className="space-y-4 font-sans font-sans">
                     {['> Chemical', '> Nuclear', '> Biological', '> Radiological'].map((item) => (
                        <p key={item} className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 flex items-center justify-between font-sans">{item} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 font-sans" /></p>
                     ))}
                  </div>
               </div>
            </div>

            {/* 3. Regional States Status */}
            <div className="bg-white rounded-[40px] shadow-2xl border-[6px] border-white overflow-hidden flex flex-col group transition-all hover:shadow-emerald-50 shadow-slate-100 min-h-[500px]">
               <div className="h-64 relative bg-slate-100 overflow-hidden flex items-center justify-center font-sans font-sans">
                  <img src="/regional.jpg" onError={(e) => { e.target.src = "https://images.pexels.com/photos/9664426/pexels-photo-9664426.jpeg?auto=compress&cs=tinysrgb&w=800" }} alt="Regional Status" className="w-full h-full object-cover relative z-0 font-sans" loading="eager" />
                  <div className="absolute inset-0 bg-slate-900/10 font-sans" />
                  {!selectedIncident && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-600/20 to-teal-400/20 font-sans"><HardHat className="w-16 h-16 text-white drop-shadow-lg" /></div>}
               </div>
               <div className="p-10 flex flex-col gap-8 flex-1 font-sans">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter pb-4 border-b-2 border-slate-50 italic">Regional Status</h3>
                  <div className="space-y-4 max-h-48 overflow-y-auto scrollbar-hide font-sans font-sans font-sans">
                     {['> Arunachal Pradesh', '> Assam', '> Bihar', '> Kerala'].map((item) => (
                        <p key={item} className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 flex items-center justify-between font-sans">{item} <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse font-sans" /></p>
                     ))}
                     <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] pt-4 cursor-pointer hover:translate-x-2 transition-all font-sans font-sans">{"> National Status Hub"}</p>
                  </div>
               </div>
            </div>

            {/* 4. Global Initiatives */}
            <div className="bg-white rounded-[40px] shadow-2xl border-[6px] border-white overflow-hidden flex flex-col group transition-all hover:shadow-indigo-50 shadow-slate-100 min-h-[500px]">
               <div className="h-64 relative bg-slate-100 overflow-hidden flex items-center justify-center font-sans font-sans font-sans">
                  <img src="/global.jpg" onError={(e) => { e.target.src = "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800" }} alt="Global Initiatives" className="w-full h-full object-cover relative z-0 font-sans" loading="eager" />
                  <div className="absolute inset-0 bg-slate-900/10 font-sans font-sans font-sans" />
                  {!selectedIncident && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-700/20 to-indigo-900/20 font-sans font-sans font-sans font-sans font-sans"><Globe2 className="w-16 h-16 text-white drop-shadow-lg animate-spin-slow font-sans" /></div>}
               </div>
               <div className="p-10 flex flex-col gap-8 flex-1 font-sans">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter pb-4 border-b-2 border-slate-50 italic font-sans font-sans">Global Initiatives</h3>
                  <div className="space-y-4 italic font-sans font-sans font-sans font-sans font-sans">
                     {['> CDRI', '> SDG Target', '> Sendai Framework'].map((item) => (
                        <p key={item} className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 flex items-center justify-between font-sans">{item} <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all font-sans" /></p>
                     ))}
                  </div>
               </div>
            </div>

         </div>
      </section>

      <style>{`
        .leaflet-attribution-flag, .leaflet-control-attribution { display: none !important; }
        .saas-popup .leaflet-popup-content-wrapper { border-radius: 40px; box-shadow: 0 40px 100px rgba(0,0,0,0.15); border: 2px solid #f8fafc; padding: 12px; }
        .saas-popup .leaflet-popup-tip { display: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
=======
        {/* SECTION 2: RESOURCE COMMAND CENTER (35% width) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
           
           {/* RESOURCE STATUS BARS */}
           <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">Resource Ops</h2>
                 <Shield className="w-6 h-6 text-blue-600" />
              </div>

              <div className="space-y-8">
                 {/* Ambulances */}
                 <div className="space-y-3">
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
                      className="w-full py-3 px-6 border-2 border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
                    >
                       Dispatch Emergency Unit
                    </button>
                 </div>

                 {/* Personnel */}
                 <div className="space-y-3">
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

                 {/* Emergency Supplies */}
                 <div className="space-y-3">
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

              {/* TERMINAL LOGS */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">System Sequence Log</h3>
                 <div className="space-y-3 font-mono text-[11px] text-slate-500 leading-relaxed">
                    {operationLog.map((log, i) => (
                      <div key={i} className={`flex items-start gap-2 ${i === 0 ? 'text-blue-600 font-bold' : ''}`}>
                         <span className="mt-1 opacity-40">→</span>
                         <span className="uppercase">{log}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* RECENT FIELD REPORTS */}
           <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl">
                          <Radio className="w-4 h-4 text-white" />
                       </div>
                       <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">Field Reports</h2>
                 </div>
                 <Link
                   to="/report"
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"
                 >
                   <Radio className="w-3 h-3" /> Report
                 </Link>
              </div>

              {userReports.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="p-4 bg-slate-50 rounded-3xl mb-4">
                       <FileWarning className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No field reports yet</p>
                    <Link
                      to="/report"
                      className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-red-200"
                    >
                       <Radio className="w-3.5 h-3.5" /> Submit First Report
                    </Link>
                 </div>
              ) : (
                 <div className="space-y-3">
                    {userReports.map((r, i) => {
                      const severityColor = r.severity === 'High' ? 'text-red-600 bg-red-50 border-red-200' : r.severity === 'Medium' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-emerald-600 bg-emerald-50 border-emerald-200';
                      return (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 transition-all cursor-default group"
                        >
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${severityColor}`}>{r.severity}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{r.disasterType}</span>
                             </div>
                             <p className="text-xs font-bold text-slate-800 truncate uppercase tracking-tight">{r.location || 'Unknown location'}</p>
                             <p className="text-[10px] text-slate-400 font-medium mt-0.5">{r.reporterName}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-500 transition-all shrink-0 ml-2" />
                        </motion.div>
                      );
                    })}
                    <Link
                      to="/report"
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 hover:border-red-300 transition-all"
                    >
                       <ArrowRight className="w-3.5 h-3.5" /> Add New Report
                    </Link>
                 </div>
              )}
           </div>

           {/* WATCHDOG */}
           <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 hover:border-blue-600 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                 <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global Watchdog</p>
                 <Globe className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tighter hover:text-slate-200">Real-time anomaly detection monitoring 14 active coastal sectors. Alerts prioritized by magnitude and population density.</p>
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
        .user-report-marker { background: transparent !important; border: none !important; }
        .saas-popup .leaflet-popup-content-wrapper { border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; padding: 4px; }
        .saas-popup .leaflet-popup-tip { display: none; }
        .tracking-tightest { letter-spacing: -0.05em; }
>>>>>>> 849247728b38486012928a87a3e626f14224a596
      `}</style>
    </div>
  );
};

export default Dashboard;
