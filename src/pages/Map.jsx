import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Minus, Filter, Layers, Navigation, Search, 
  Map as MapIcon, Shield, Info, AlertTriangle, Radio
} from 'lucide-react';

const MapPage = () => {
  const markers = [
    { id: 1, type: 'critical', top: '30%', left: '40%', title: 'Wildfire - Sector 7', severity: 'Critical' },
    { id: 2, type: 'warning', top: '60%', left: '65%', title: 'Flash Flood Risk', severity: 'Warning' },
    { id: 3, type: 'monitoring', top: '20%', left: '70%', title: 'River Level Check', severity: 'Monitoring' },
    { id: 4, type: 'critical', top: '80%', left: '45%', title: 'Coastal Surge', severity: 'Critical' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 lg:p-8 flex flex-col h-full space-y-6 max-w-7xl mx-auto w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Live Incident Map</h1>
          <p className="text-neutral-500 text-sm mt-1">Real-time geospatial intelligence and node monitoring.</p>
        </div>
        <div className="flex bg-white border border-neutral-200 p-1 rounded-lg shadow-sm">
          {['Incident View', 'Resource View', 'Terrain'].map((tab, i) => (
            <button 
              key={tab}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                i === 0 ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[600px] bg-white rounded-xl shadow-custom border border-neutral-200 overflow-hidden relative flex flex-col">
        {/* Map Header Overlay */}
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-white/90 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2 rounded-lg border border-neutral-200 w-full max-w-md">
            <Search className="w-4 h-4 text-neutral-400" />
            <input type="text" placeholder="Search coordinates or sectors..." className="bg-transparent border-none text-sm outline-none w-full" />
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

        {/* Map Interactive Area */}
        <div className="relative flex-1 bg-neutral-100 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Main Map" 
            className="w-full h-full object-cover opacity-80"
          />
          
          {/* Map UI Elements */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-3">
             <div className="flex flex-col bg-white rounded-lg shadow-lg border border-neutral-200">
                <button className="p-3 hover:bg-neutral-50 text-neutral-600 border-b border-neutral-100"><Plus className="w-5 h-5" /></button>
                <button className="p-3 hover:bg-neutral-50 text-neutral-600"><Minus className="w-5 h-5" /></button>
             </div>
             <button className="p-3 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition-colors">
                <Navigation className="w-6 h-6 fill-current" />
             </button>
          </div>

          <div className="absolute left-6 bottom-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-neutral-200 w-48">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Map Legend</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
                <span className="w-3 h-3 rounded-full bg-tertiary-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /> Critical Incident
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
                <span className="w-3 h-3 rounded-full bg-secondary-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" /> High Warning
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
                <span className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" /> Routine Monitor
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700">
                <span className="w-3 h-3 rounded-full bg-green-500" /> Rescue Cluster
              </div>
            </div>
          </div>

          {/* Markers */}
          {markers.map((m) => (
             <div key={m.id} className="absolute group cursor-pointer" style={{ top: m.top, left: m.left }}>
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg relative z-10 ${
                  m.type === 'critical' ? 'bg-tertiary-500' : m.type === 'warning' ? 'bg-secondary-500' : 'bg-primary-500'
                }`}>
                   <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                     m.type === 'critical' ? 'bg-tertiary-500' : m.type === 'warning' ? 'bg-secondary-500' : 'bg-primary-500'
                   }`} />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none z-20">
                   <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.type === 'critical' ? 'bg-tertiary-50 text-tertiary-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>{m.severity}</span>
                   </div>
                   <h4 className="font-bold text-neutral-900 text-sm mb-1">{m.title}</h4>
                   <p className="text-xs text-neutral-500 mb-3">Threat detected via Satellite Cluster Node 7-B.</p>
                   <button className="w-full py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md">Analyze Node</button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
