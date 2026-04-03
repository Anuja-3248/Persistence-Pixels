import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import {
  Navigation, Search, Shield, Radio, Activity, Compass, 
  RefreshCw, Hospital, ShieldAlert, Tent, ChevronRight, 
  Maximize2, Minimize2, AlertTriangle, MapPin, Navigation2,
  Filter, Layers, Info, Plus, Minus
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const API_ENDPOINTS = {
  USGS_EARTHQUAKE: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=30&minmagnitude=4.5',
  GDACS: 'https://www.gdacs.org/gdacsapi/api/events/geteventlist/EVENTS4APP',
  OVERPASS: 'https://overpass-api.de/api/interpreter',
};

const TILE_LAYERS = {
  DEFAULT: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Professional Icon Factory (Pranay's Pulsing Glow Style)
const createPranayIcon = (type) => {
  const color = type === 'CRITICAL' ? '#ef4444' : type === 'WARNING' ? '#f97316' : '#3b82f6';
  return L.divIcon({
    className: 'pranay-map-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-5 h-5 rounded-full border-2 border-white shadow-lg z-10" style="background: ${color}"></div>
        <div class="absolute inset-0 rounded-full animate-ping opacity-75" style="background: ${color}"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// --- SUB-COMPONENTS ---
const MapEvents = ({ onBoundsChange }) => {
  const map = useMap();
  useEffect(() => {
    const handleMove = () => onBoundsChange(map.getBounds(), map.getZoom());
    map.on('moveend', handleMove);
    return () => map.off('moveend', handleMove);
  }, [map, onBoundsChange]);
  return null;
};

const FlyToLoc = ({ coords, zoom = 12 }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, zoom, { duration: 1.5 });
  }, [coords, zoom, map]);
  return null;
};

// --- MAIN COMPONENT ---
const MapPage = () => {
  // State: Core Data (My Logic)
  const [incidents, setIncidents] = useState([]); 
  const [resources, setResources] = useState([]); 
  const [alerts, setAlerts] = useState([]);
  
  // State: UI
  const [loading, setLoading] = useState(false);
  const [activeLayer, setActiveLayer] = useState('DEFAULT');
  const [searchQuery, setSearchQuery] = useState('');
  const [flyCoords, setFlyCoords] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastSync, setLastSync] = useState(null);
  const [nearestHelp, setNearestHelp] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  // 1. Fetch Real-time Incidents (My Logic)
  const syncIncidents = useCallback(async () => {
    setLoading(true);
    try {
      const [uRes, gRes] = await Promise.all([
        fetch(API_ENDPOINTS.USGS_EARTHQUAKE).then(r => r.json()),
        fetch(API_ENDPOINTS.GDACS).then(r => r.json())
      ]);

      const quakes = (uRes.features || []).map(f => ({
        id: f.id,
        type: 'QUAKE',
        severity: f.properties.mag >= 6 ? 'CRITICAL' : 'WARNING',
        title: `M${f.properties.mag} Earthquake`,
        location: f.properties.place,
        timestamp: new Date(f.properties.time).toISOString(),
        pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
        url: f.properties.url
      }));

      const major = (gRes.features || [])
        .filter(f => ['FL', 'TC', 'WF', 'EQ'].includes(f.properties.eventtype.toUpperCase()))
        .map(f => ({
          id: f.properties.eventid,
          type: f.properties.eventtype.toUpperCase(),
          severity: f.properties.alertlevel === 'Red' ? 'CRITICAL' : 'WARNING',
          title: f.properties.name,
          location: f.properties.country,
          timestamp: new Date(f.properties.fromdate).toISOString(),
          pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
          url: `https://www.gdacs.org/report.aspx?eventid=${f.properties.eventid}&eventtype=${f.properties.eventtype}`
        }));

      const combined = [...quakes, ...major].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      setIncidents(combined);
      setAlerts(combined.slice(0, 10));
      setLastSync(new Date());
    } catch (err) { console.error('Incident sync failed:', err); }
    finally { setLoading(false); }
  }, []);

  // 2. Fetch Resources (My Logic)
  const syncResources = async (bounds, zoom) => {
    if (!bounds || zoom < 13) {
      if (resources.length > 0) setResources([]);
      return;
    }
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const query = `[out:json][timeout:25];(node["amenity"~"hospital|police|fire_station"](${sw.lat},${sw.lng},${ne.lat},${ne.lng}););out body;`;
    
    try {
      const res = await fetch(API_ENDPOINTS.OVERPASS, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`
      }).then(r => r.json());

      const mapped = (res.elements || []).map(e => ({
        id: `res-${e.id}`,
        type: e.tags.amenity,
        name: e.tags.name || `Authorized ${e.tags.amenity}`,
        pos: [e.lat, e.lon]
      }));
      setResources(mapped);
    } catch (err) { console.error('Resource fetch failed:', err); }
  };

  useEffect(() => {
    syncIncidents();
    const interval = setInterval(syncIncidents, 600000); 
    return () => clearInterval(interval);
  }, [syncIncidents]);

  // 3. KILLER FEATURE: Find Nearest Help (My Logic)
  const findNearestHelp = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    setStatusMsg("INITIATING SCAN: SEARCHING FOR NEAREST AUTHORIZED SOS CENTER...");
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const userPos = [pos.coords.latitude, pos.coords.longitude];
      setFlyCoords(userPos);
      
      const margin = 0.08; 
      const sw = [userPos[0] - margin, userPos[1] - margin];
      const ne = [userPos[0] + margin, userPos[1] + margin];
      const query = `[out:json][timeout:25];(node["amenity"~"hospital|police|fire_station"](${sw[0]},${sw[1]},${ne[0]},${ne[1]}););out body;`;
      
      try {
        const res = await fetch(API_ENDPOINTS.OVERPASS, { method: 'POST', body: `data=${encodeURIComponent(query)}` }).then(r => r.json());
        if (res.elements && res.elements.length > 0) {
           let closest = null;
           let minDist = Infinity;
           res.elements.forEach(e => {
              const d = Math.sqrt(Math.pow((e.lat - userPos[0]) * 111, 2) + Math.pow((e.lon - userPos[1]) * 111, 2));
              if (d < minDist) { minDist = d; closest = e; }
           });
           if (closest) {
              const name = closest.tags.name || 'EMERGENCY CENTER';
              setNearestHelp({ pos: [closest.lat, closest.lon], name, dist: minDist.toFixed(1) });
              setStatusMsg(`SUCCESS: FOUND ${name} (${minDist.toFixed(1)} KM)`);
              setFlyCoords([closest.lat, closest.lon]);
              setTimeout(() => setStatusMsg(null), 6000); 
           }
        } else {
           setStatusMsg("FAIL: NO SOS CENTERS DETECTED IN 10KM RANGE.");
           setTimeout(() => setStatusMsg(null), 4000);
        }
      } catch (e) { setStatusMsg("SIGNAL ERROR: DATABASE OFFLINE."); }
      finally { setLoading(false); }
    }, () => {
        setStatusMsg("ACCESS DENIED: GPS PERMISSION REQUIRED.");
        setLoading(false);
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      const data = await res.json();
      if (data.length > 0) {
        setFlyCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (err) { console.error('Search failed:', err); }
  };

  return (
    <div className="flex h-full w-full bg-white overflow-hidden text-slate-900 font-body antialiased">
      
      {/* 1. Header (Pranay's UI Only) */}
      <div className="absolute top-0 right-0 left-0 bg-white/90 backdrop-blur-md border-b border-neutral-200 p-4 flex items-center justify-between z-[1000] shadow-sm">
        <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2 rounded-lg border border-neutral-200 w-full max-w-md ml-auto md:ml-4">
           <Search className="w-4 h-4 text-neutral-400" />
           <form onSubmit={handleSearch} className="w-full">
             <input 
               type="text" 
               placeholder="Search coordinates or sectors..." 
               className="bg-transparent border-none text-sm outline-none w-full font-medium"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </form>
        </div>
        <div className="flex gap-2 ml-4">
          <button className="px-3 py-1.5 text-sm bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-md transition-colors flex items-center gap-2 shadow-sm font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-3 py-1.5 text-sm bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-md transition-colors flex items-center gap-2 shadow-sm font-medium">
            <Layers className="w-4 h-4" /> Layers
          </button>
        </div>
      </div>

      {/* 2. Map Container (My Implementation) */}
      <div className="relative flex-1 bg-neutral-100 flex flex-col pt-[72px]">
        
        {/* System Notification Overlay (My Logic) */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div 
               initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
               className="absolute top-[80px] left-1/2 -translate-x-1/2 z-[1100] pointer-events-none"
            >
               <div className={`px-8 py-3 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-4 ${statusMsg.startsWith('SUCCESS') ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-900 border-slate-700'} text-white`}>
                  <div className={`w-2 h-2 rounded-full ${statusMsg.startsWith('INIT') ? 'bg-indigo-400 animate-ping' : 'bg-white'}`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{statusMsg}</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <MapContainer
          center={[20.5937, 78.9629]} zoom={5}
          style={{ width: '100%', height: '100%', background: '#f8fafc' }}
          zoomControl={false} attributionControl={false}
        >
          <FlyToLoc coords={flyCoords} />
          <MapEvents onBoundsChange={syncResources} />
          <TileLayer url={TILE_LAYERS[activeLayer]} />

          {/* Incident Markers (My Logic + Pranay's UI Style) */}
          <MarkerClusterGroup chunkedLoading>
            {incidents.map(inc => (
              <Marker 
                key={inc.id} 
                position={inc.pos} 
                icon={createPranayIcon(inc.severity)}
              >
                <Popup className="pro-map-popup">
                  <div className="p-4 w-60">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${inc.severity === 'CRITICAL' ? 'bg-red-50 text-red-600' : 'bg-neutral-100 text-neutral-600'}`}>{inc.severity}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1 uppercase tracking-tight">{inc.title}</h4>
                    <p className="text-xs text-neutral-500 mb-3 truncate font-medium uppercase tracking-tighter">{inc.location}</p>
                    <a href={inc.url} target="_blank" rel="noreferrer" className="block w-full py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest text-center rounded-md hover:bg-neutral-700 transition-colors">Analyze Node →</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {/* Resources (My Logic) */}
          {resources.map(res => (
            <CircleMarker 
              key={res.id} center={res.pos} radius={8}
              pathOptions={{ color: '#fff', fillColor: res.type === 'hospital' ? '#3b82f6' : '#6366f1', fillOpacity: 0.9, weight: 3 }}
            >
              <Popup>
                 <div className="p-3">
                    <div className="flex items-center gap-2 mb-2 text-indigo-600">
                       {res.type === 'hospital' ? <Hospital className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                       <span className="text-[10px] font-black uppercase tracking-widest">{res.type} Unit</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{res.name}</h4>
                 </div>
              </Popup>
            </CircleMarker>
          ))}

          {nearestHelp && (
            <Marker position={nearestHelp.pos} icon={createPranayIcon('READY')}>
                <Popup autoOpen>
                   <div className="p-2 text-center">
                      <p className="text-[10px] font-black uppercase text-indigo-600 mb-1">Closest Aid Found</p>
                      <h4 className="text-sm font-black uppercase tracking-tight italic">{nearestHelp.name}</h4>
                   </div>
                </Popup>
            </Marker>
          )}

          {flyCoords && <CircleMarker center={flyCoords} radius={10} pathOptions={{ color: '#fff', fillColor: '#3b82f6', fillOpacity: 0.5, weight: 3 }} />}
        </MapContainer>

        {/* 3. Legend (Pranay's UI Styling) */}
        <div className="absolute left-6 bottom-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-neutral-200 w-48 z-[900]">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Map Legend</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /> Critical Incident
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
              <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" /> High Warning
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" /> Monitoring
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
              <span className="w-3 h-3 rounded-full bg-indigo-500" /> Aid Found
            </div>
          </div>
        </div>

        {/* 4. Controls (Pranay's UI Styling) */}
        <div className="absolute right-6 bottom-10 flex flex-col gap-3 z-[900]">
           <div className="flex flex-col bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
              <button onClick={() => syncIncidents()} className="p-3 hover:bg-neutral-50 text-neutral-600 border-b border-neutral-100 flex items-center justify-center"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => setActiveLayer(activeLayer === 'DEFAULT' ? 'SATELLITE' : 'DEFAULT')} className="p-3 hover:bg-neutral-50 text-neutral-600"><Compass className="w-5 h-5" /></button>
           </div>
           <button 
             onClick={findNearestHelp}
             className="p-5 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center group"
             title="Find Nearest Help"
           >
              <Navigation className="w-8 h-8 fill-current group-hover:animate-bounce" />
           </button>
        </div>

      </div>

      <style>{`
        .pro-map-popup .leaflet-popup-content-wrapper { border-radius: 12px; border: 1px solid #f1f5f9; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 0; overflow: hidden; }
        .pro-map-popup .leaflet-popup-tip { display: none; }
        .pranay-map-marker { background: transparent !important; border: none !important; }
      `}</style>
    </div>
  );
};

export default MapPage;
