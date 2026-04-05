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
           </div>
        </div>
      </header>

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
                       </div>
                    </Popup>
                  </Marker>
                ))}
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
                 </div>
              </div>
           </div>

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
              </div>
           </div>
        </div>

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
      `}</style>
    </div>
  );
};

export default Dashboard;
