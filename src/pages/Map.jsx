import React, { useState, useEffect } from 'react';
import {
  Activity, Flame, Wind, Waves, AlertTriangle,
  Clock, MapPin, ArrowLeft, X, Shield, Users,
  Thermometer, Navigation, AlertCircle, ChevronRight,
  Home, Zap
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

// ─── MARKER ICONS ────────────────────────────────────────────────────────────
const getIcon = (type, color) => {
  const svgPath =
    type === 'FIRE'
      ? '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.203 1.15-3.142C7 12.5 8 13 8.5 14.5z"/>'
      : type === 'STORM'
      ? '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m11 13-4 4h7l-4 4"/>'
      : type === 'FLOOD'
      ? '<path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 4 10.2c0 7.3 8 11.8 8 11.8Z"/><circle cx="12" cy="10" r="1" fill="currentColor"/>'
      : '<path d="M2 12h5l2 8 4-16 2 8h7"/>';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:52px;height:52px;">
        <!-- Outer pulse ring -->
        <div style="position:absolute;width:52px;height:52px;border-radius:50%;background:${color};opacity:0.25;animation:ping 1.8s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <!-- Mid ring -->
        <div style="position:absolute;width:40px;height:40px;border-radius:50%;border:1.5px solid ${color};opacity:0.5;animation:ping 1.8s 0.4s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <!-- Icon chip — white bg so it pops on satellite -->
        <div style="
          position:relative;
          width:38px;height:38px;
          border-radius:12px;
          background:#ffffff;
          border:2.5px solid ${color};
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 0 3px ${color}44, 0 4px 20px ${color}88, 0 2px 8px rgba(0,0,0,0.5);
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>
        </div>
      </div>`,
    iconSize: [52, 52],
    iconAnchor: [26, 26],
  });
};

// ─── MAP FLY-TO CONTROLLER ────────────────────────────────────────────────────
const MapFly = ({ pos }) => {
  const map = useMap();
  useEffect(() => {
    if (pos) map.flyTo(pos, 7, { duration: 2.2, easeLinearity: 0.2 });
  }, [pos, map]);
  return null;
};

// ─── SAFETY MEASURES BY TYPE ──────────────────────────────────────────────────
const safetyData = {
  FIRE: [
    { tip: 'Evacuate immediately via designated routes.', note: 'Status: Open / Guided by Dispatch' },
    { tip: 'Wear N95 masks for smoke protection.', note: 'Stock available at nearest shelter' },
    { tip: 'Keep all windows and doors sealed.', note: 'Standard structural air containment protocol' },
    { tip: 'Do not return until authorities give all-clear.', note: 'Monitor official emergency broadcasts' },
  ],
  STORM: [
    { tip: 'Shelter in a sturdy building away from windows.', note: 'Status: All shelters on standby' },
    { tip: 'Avoid flooded roads and low-lying areas.', note: 'Water levels updated every 15 minutes' },
    { tip: 'Disconnect electrical appliances immediately.', note: 'Power surge risk is HIGH' },
    { tip: 'Keep emergency kit with 3 days of supplies.', note: 'Nearest distribution point: 2.1 km' },
  ],
  FLOOD: [
    { tip: 'Move to higher ground immediately.', note: 'Status: Evacuation routes active' },
    { tip: 'Do not walk or drive through floodwater.', note: '15cm of water can sweep a person off their feet' },
    { tip: 'Disconnect electricity if water enters home.', note: 'Report outages to local grid authority' },
    { tip: 'Listen to emergency broadcasts for updates.', note: 'National Disaster Radio on 102.4 FM' },
  ],
  QUAKE: [
    { tip: 'Drop, Cover and Hold On until shaking stops.', note: 'Do NOT stand in doorways — myth debunked' },
    { tip: 'Stay away from windows and heavy furniture.', note: 'Falling objects cause 80% of injuries' },
    { tip: 'Do not use elevators after an earthquake.', note: 'Use stairways only after structural check' },
    { tip: 'Expect aftershocks — stay alert for 48 hours.', note: 'Strongest aftershock ETA unknown' },
  ],
};

const shelterData = {
  FIRE: { name: 'North Valley Evacuation Camp', dist: '3.2 km from epicenter', capacity: 78 },
  STORM: { name: 'Central City Storm Shelter', dist: '1.8 km from epicenter', capacity: 62 },
  FLOOD: { name: 'Highland Ridge Relief Camp', dist: '4.5 km from epicenter', capacity: 55 },
  QUAKE: { name: 'Seismic Response Hub Delta', dist: '2.1 km from epicenter', capacity: 91 },
};

const intensityMap = (type, magnitude) => {
  if (type === 'QUAKE') {
    if (magnitude >= 7) return { grade: 'Grade 5', label: 'Catastrophic', color: '#dc2626' };
    if (magnitude >= 6) return { grade: 'Grade 4', label: 'Critical Condition', color: '#dc2626' };
    if (magnitude >= 5) return { grade: 'Grade 3', label: 'Severe', color: '#ea580c' };
    return { grade: 'Grade 2', label: 'Moderate', color: '#d97706' };
  }
  return { grade: 'Grade 4', label: 'Critical Condition', color: '#dc2626' };
};

// ─── RIGHT SIDEBAR ─────────────────────────────────────────────────────────────
const IncidentSidebar = ({ incident, onClose }) => {
  if (!incident) return null;

  const safety = safetyData[incident.type] || safetyData.QUAKE;
  const shelter = shelterData[incident.type] || shelterData.QUAKE;
  const intensity = intensityMap(incident.type, incident.magnitude);
  const typeLabels = { FIRE: 'Fire', STORM: 'Storm', FLOOD: 'Flood', QUAKE: 'Earthquake' };
  const typeLabel = typeLabels[incident.type] || incident.type;

  // Calculate a pseudo-duration from rawTime
  const minsAgo = incident.rawTime
    ? Math.round((Date.now() - incident.rawTime) / 60000)
    : null;
  const durationStr = minsAgo
    ? minsAgo > 60
      ? `${Math.floor(minsAgo / 60)}h ${minsAgo % 60}m active`
      : `${minsAgo}m active`
    : 'Duration unknown';

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="absolute top-0 right-0 h-full w-[360px] z-[3000] flex flex-col overflow-hidden"
      style={{ background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-200 flex items-start justify-between flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">{typeLabel} Incident Details</h2>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Active
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider">
              High Intensity
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* EVENT INFO */}
        <div className="px-6 py-5 border-b border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.18em] mb-4">Event Info</p>

          {/* Place */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Place</p>
              <p className="text-base font-bold text-slate-900 leading-snug">{incident.title}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {incident.pos[0].toFixed(3)}° N, {incident.pos[1].toFixed(3)}° E
              </p>
            </div>
          </div>

          {/* Timing + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Timing</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{incident.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Activity className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{durationStr}</p>
              </div>
            </div>
          </div>

          {/* Magnitude badge if quake */}
          {typeof incident.magnitude === 'number' && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Magnitude</p>
                <p className="text-base font-bold text-slate-900">{incident.magnitude} Mw</p>
              </div>
            </div>
          )}
        </div>

        {/* CURRENT INTENSITY */}
        <div className="px-6 py-5 border-b border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.18em] mb-4">Current Intensity</p>
          <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: intensity.color }}>
            <div>
              <p className="text-white/70 text-xs font-black uppercase tracking-wider mb-1">Grade Level</p>
              <p className="text-white text-4xl font-black leading-none">{intensity.grade}</p>
              <p className="text-white/80 text-sm font-bold mt-1.5">{intensity.label}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-white/30" />
          </div>
        </div>

        {/* RESCUE RESOURCES */}
        <div className="px-6 py-5 border-b border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.18em] mb-4">Rescue Resources</p>
          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Nearest Camp</p>
                <p className="text-base font-bold text-slate-900 leading-snug">{shelter.name}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">{shelter.dist}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Capacity Utilization</p>
                <p className="text-xs font-black text-slate-700">{shelter.capacity}% full</p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shelter.capacity}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: shelter.capacity > 80 ? '#dc2626' : shelter.capacity > 60 ? '#f59e0b' : '#22c55e' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SAFETY MEASURES */}
        <div className="px-6 py-5">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.18em] mb-5">Safety Measures</p>
          <div className="space-y-4">
            {safety.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-800 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-snug">{item.tip}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer CTA ── */}
      <div className="px-6 py-4 border-t border-slate-200 flex-shrink-0">
        <Link
          to="/sos"
          className="block w-full py-3.5 rounded-2xl text-center text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95"
          style={{ background: '#dc2626' }}
        >
          Trigger SOS Emergency
        </Link>
      </div>
    </motion.div>
  );
};

// ─── MAIN MAP COMPONENT ────────────────────────────────────────────────────────
const LiveMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [flyTo, setFlyTo] = useState(null);
  const [selected, setSelected] = useState(null);

  // ── Fetch data ──
  const fetchData = async () => {
    setSyncing(true);
    try {
      // USGS Earthquakes
      const qRes = await fetch(
        'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=25&minmagnitude=4.5'
      );
      const qData = await qRes.json();
      const quakes = (qData.features || []).map((f) => ({
        id: f.id,
        title: f.properties.place,
        magnitude: f.properties.mag,
        type: 'QUAKE',
        time: new Date(f.properties.time).toLocaleString(),
        rawTime: f.properties.time,
        pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
        color: '#f59e0b',
        severityLabel: f.properties.mag >= 6 ? 'CRITICAL' : 'MAJOR',
      }));

      // NASA EONET
      const nRes = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?days=20&status=open');
      const nData = await nRes.json();
      const natural = (nData.events || [])
        .map((ev) => {
          const catId = ev.categories?.[0]?.id;
          let type = 'STORM', color = '#3b82f6';
          if (catId === 8 || catId === 12) { type = 'FIRE'; color = '#ef4444'; }
          if (catId === 15) { type = 'FLOOD'; color = '#06b6d4'; }
          const pos = ev.geometries?.[0]?.coordinates;
          if (!pos) return null;
          return {
            id: ev.id,
            title: ev.title,
            magnitude: 'LIVE',
            type,
            time: new Date(ev.geometries[0].date).toLocaleString(),
            rawTime: new Date(ev.geometries[0].date).getTime(),
            pos: [pos[1], pos[0]],
            color,
            severityLabel: 'MONITORED',
          };
        })
        .filter(Boolean);

      setIncidents([...quakes, ...natural].sort((a, b) => b.rawTime - a.rawTime));
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 60000);
    return () => clearInterval(t);
  }, []);

  // ── Jump to most dangerous of that type ──
  const jumpTo = (type) => {
    const matching = incidents.filter((i) => i.type === type);
    if (!matching.length) return;
    const worst = matching.sort((a, b) => {
      const vA = typeof a.magnitude === 'number' ? a.magnitude : 5;
      const vB = typeof b.magnitude === 'number' ? b.magnitude : 5;
      return vB - vA;
    })[0];
    setSelected(worst);
    setFlyTo(worst.pos);
  };

  const disasterButtons = [
    { type: 'QUAKE', label: 'Earthquake', icon: Activity, color: '#f59e0b' },
    { type: 'FIRE',  label: 'Wildfire',   icon: Flame,    color: '#ef4444' },
    { type: 'STORM', label: 'Storm',      icon: Wind,     color: '#3b82f6' },
    { type: 'FLOOD', label: 'Flood',      icon: Waves,    color: '#06b6d4' },
  ];

  return (
    <div className="fixed inset-0 bg-[#0a1628] overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── FULL-SCREEN MAP ── */}
      <MapContainer
        center={[20, 78]}
        zoom={4}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        {/* Satellite base layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        {/* Country & city labels overlay */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
          opacity={0.85}
        />
        <MapFly pos={flyTo} />
        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.pos}
            icon={getIcon(inc.type, inc.color)}
            eventHandlers={{ click: () => { setSelected(inc); setFlyTo(inc.pos); } }}
          >
            <Popup className="dark-popup">
              <div className="p-3 w-56 bg-[#0d0d18] border border-white/20 rounded-xl text-white">
                <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: inc.color }}>
                  {inc.type}
                </p>
                <p className="text-sm font-bold leading-snug mb-2">{inc.title}</p>
                <p className="text-[9px] text-slate-400 font-medium">{inc.time}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ── VIGNETTE OVERLAY for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
      />

      {/* ── TOP-LEFT BRANDING ── */}
      <div className="absolute top-6 left-6 z-[2000] flex items-center gap-3">
        <Link
          to="/dashboard"
          className="p-3 bg-[#0d0d18]/90 border border-white/15 rounded-xl hover:bg-white/10 transition-all backdrop-blur-md shadow-xl group"
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div className="px-5 py-3.5 bg-[#0d0d18]/90 border border-white/15 rounded-xl backdrop-blur-md shadow-xl">
          <p className="text-2xl font-black text-white uppercase tracking-tight leading-none">Live Map</p>
        </div>
      </div>

      {/* ── TOP-RIGHT STATUS ── */}
      <div className="absolute top-6 right-6 z-[2000] flex items-center gap-2.5 px-5 py-3 bg-[#0d0d18]/90 border border-white/15 rounded-xl backdrop-blur-md shadow-xl">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">
            {syncing ? 'Syncing...' : 'Live Feed Online'}
          </p>
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-right mt-0.5">
            {incidents.length} nodes active
          </p>
        </div>
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${syncing ? 'bg-blue-500 animate-pulse' : 'bg-emerald-400'}`} />
      </div>

      {/* ── BOTTOM DISASTER-TYPE BUTTONS ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2000]">
        <div
          className="flex items-center gap-1.5 px-2.5 py-2.5 rounded-[44px] backdrop-blur-2xl"
          style={{
            background: 'rgba(8,8,20,0.88)',
            border: '1.5px solid rgba(255,255,255,0.14)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)'
          }}
        >
          {disasterButtons.map((btn) => {
            const count = incidents.filter(i => i.type === btn.type).length;
            return (
              <button
                key={btn.type}
                onClick={() => jumpTo(btn.type)}
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-[32px] transition-all duration-200 active:scale-95 group overflow-hidden"
                style={{
                  background: selected?.type === btn.type ? `${btn.color}28` : `${btn.color}14`,
                  border: `1.5px solid ${selected?.type === btn.type ? btn.color : btn.color + '44'}`,
                  color: btn.color,
                  boxShadow: selected?.type === btn.type ? `0 0 20px ${btn.color}44` : 'none',
                }}
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: `${btn.color}20` }} />
                <btn.icon style={{ width: 17, height: 17, flexShrink: 0 }} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
                <span className="text-[11px] font-black uppercase tracking-[0.16em] whitespace-nowrap relative">{btn.label}</span>
                {/* live count badge */}
                {count > 0 && (
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black text-white flex-shrink-0"
                    style={{ background: btn.color }}
                  >
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="flex items-center gap-2 pl-3 ml-1 border-l border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Live</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDEBAR (slides in) ── */}
      <AnimatePresence>
        {selected && (
          <IncidentSidebar incident={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .leaflet-container { background: #0a1628 !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .leaflet-popup-content-wrapper { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        .leaflet-popup-tip-container { display: none !important; }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-scan { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

        .dark-popup .leaflet-popup-content { margin: 0; }
      `}</style>
    </div>
  );
};

export default LiveMap;
