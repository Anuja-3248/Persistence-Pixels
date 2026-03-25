import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Filter, Layers, Navigation, Search, Info, Shield, Radio, Flame, Droplets, Wind, AlertTriangle } from 'lucide-react';

const MapPage = () => {
  const [activeTab, setActiveTab] = useState('Flood');
  
  const markers = [
    { id: 1, type: 'danger', pos: { top: '30%', left: '40%' }, title: 'Active Flood Zone', label: 'High Risk' },
    { id: 2, type: 'safe', pos: { top: '65%', left: '25%' }, title: 'Safe Zone Alpha', label: 'Secured' },
    { id: 3, type: 'shelter', pos: { top: '45%', left: '75%' }, title: 'PMC Shelter 04', label: '120 Vacant' },
    { id: 4, type: 'danger', pos: { top: '80%', left: '60%' }, title: 'Landslide Alert', label: 'Evacuate' },
    { id: 5, type: 'safe', pos: { top: '20%', left: '60%' }, title: 'Zone Beta', label: 'Secured' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full gap-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">LIVE <span className="text-neon-blue">Disaster Map</span></h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Satellite Intelligence / Version 4.2.0-Alpha</p>
        </div>
        
        <div className="flex gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          {['Flood', 'Fire', 'Earthquake'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all uppercase tracking-widest ${
                activeTab === tab 
                  ? 'bg-neon-blue text-dark-900 shadow-[0_0_15px_rgba(80,215,255,0.4)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative glass-dark rounded-[40px] border border-white/10 overflow-hidden min-h-[650px] shadow-2xl">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#0c1221]">
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#50d7ff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
           
           {/* Simulated Landmap */}
           <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
             <path d="M0 200 C 150 150 350 250 500 200 S 850 150 1000 200 L 1000 1000 L 0 1000 Z" fill="#50d7ff" stroke="#50d7ff" strokeWidth="2" />
             <path d="M700 300 Q 800 200 900 350 T 1100 300" fill="none" stroke="#50d7ff" strokeWidth="4" />
           </svg>
        </div>

        {/* Heatmap Overlay */}
        <div className={`absolute inset-0 opacity-40 transition-all duration-1000 ${
          activeTab === 'Flood' ? 'bg-blue-900/40 mix-blend-screen' : 
          activeTab === 'Fire' ? 'bg-orange-950/40 mix-blend-overlay' : 
          'bg-stone-900/40'
        }`} />

        {/* Scanlines layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="scanline" style={{ animationDuration: '6s' }} />
        </div>

        {/* Active Hazards Visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <defs>
             <radialGradient id="gradRed" cx="50%" cy="50%" r="50%">
               <stop offset="0%" stopColor="#ff3d68" stopOpacity="0.4" />
               <stop offset="100%" stopColor="#ff3d68" stopOpacity="0" />
             </radialGradient>
           </defs>
           <motion.circle 
             cx="40%" cy="30%" r="80" 
             fill="url(#gradRed)" 
             animate={{ r: [70, 90, 70], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
           />
           <motion.circle 
             cx="60%" cy="80%" r="120" 
             fill="url(#gradRed)" 
             animate={{ r: [100, 140, 100], opacity: [0.2, 0.4, 0.2] }}
             transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
           />
        </svg>

        {/* Markers */}
        {markers.map((marker) => (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10, delay: marker.id * 0.1 }}
            style={{ top: marker.pos.top, left: marker.pos.left }}
            className="absolute group z-20 cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] ${
              marker.type === 'danger' ? 'bg-neon-red shadow-[0_0_20px_rgba(255,61,104,0.5)]' : 
              marker.type === 'safe' ? 'bg-neon-green shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 
              'bg-neon-yellow shadow-[0_0_20px_rgba(251,191,36,0.5)]'
            }`}>
              {marker.type === 'danger' && <AlertTriangle className="w-5 h-5 text-white animate-pulse" />}
              {marker.type === 'safe' && <Shield className="w-5 h-5 text-white" />}
              {marker.type === 'shelter' && <Radio className="w-5 h-5 text-dark-900" />}
            </div>
            
            {/* Expanded Info Tooltip */}
            <div className="absolute top-1/2 left-full -translate-y-1/2 ml-5 w-56 glass-dark border border-white/10 rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none scale-95 group-hover:scale-100 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-30">
              <div className="flex items-center gap-2 mb-2">
                 <div className={`w-2 h-2 rounded-full ${marker.type === 'danger' ? 'bg-neon-red' : marker.type === 'safe' ? 'bg-neon-green' : 'bg-neon-yellow'}`} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{marker.label}</span>
              </div>
              <p className="text-sm font-black truncate text-white">{marker.title}</p>
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-1">
                 <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                    <span>SEVERITY</span>
                    <span className={marker.type === 'danger' ? 'text-neon-red' : 'text-neon-green'}>
                       {marker.type === 'danger' ? 'CRITICAL' : 'MINIMAL'}
                    </span>
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                    <span>AI CONFIDENCE</span>
                    <span className="text-neon-blue">94%</span>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Floating Sidebar Controls */}
        <div className="absolute top-8 left-8 flex flex-col gap-6">
           <div className="bg-dark-900/90 backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] w-72 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <h4 className="text-xs font-black mb-6 flex items-center gap-3 uppercase tracking-[0.2em] text-neon-blue">
                <Layers className="w-4 h-4" />
                Intell-Layers
              </h4>
              <div className="space-y-5">
                 {[
                   { name: 'AI SATELLITE OVERLAY', active: true, icon: Wind },
                   { name: 'POPULATION HEATMAP', active: false, icon: Users },
                   { name: 'TERRAIN CONTOURS', active: true, icon: Navigation },
                   { name: 'INFRASTRUCTURE RISK', active: false, icon: Shield }
                 ].map((layer, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-3">
                        <layer.icon className={`w-4 h-4 ${layer.active ? 'text-neon-blue' : 'text-slate-500'}`} />
                        <span className={`text-[10px] font-black tracking-wider transition-colors ${layer.active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{layer.name}</span>
                     </div>
                     <div className={`w-9 h-4 rounded-full p-1 transition-all duration-300 ${layer.active ? 'bg-neon-blue/40 border border-neon-blue/50' : 'bg-slate-800 border border-white/5'}`}>
                        <div className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${layer.active ? 'translate-x-5 shadow-[0_0_8px_rgba(80,215,255,1)]' : 'translate-x-0'}`} />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-dark-900/80 backdrop-blur-3xl border border-white/10 p-5 rounded-3xl w-72">
              <div className="flex items-center gap-3 text-neon-green">
                 <div className="text-xs font-black uppercase tracking-widest flex-1">Network Status</div>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-neon-green rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />)}
                 </div>
              </div>
           </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-10 right-10 glass-dark border border-white/10 px-8 py-5 rounded-[28px] flex flex-col gap-4 shadow-2xl">
           <div className="flex items-center gap-4 group">
             <div className="w-4 h-4 rounded-lg bg-neon-red shadow-[0_0_15px_rgba(255,61,104,0.6)] animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Extreme Danger</span>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-4 h-4 rounded-lg bg-neon-green shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Secured Perimeters</span>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-4 h-4 rounded-lg bg-neon-yellow shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Shelter Facilities</span>
           </div>
        </div>

        {/* HUD Elements */}
        <div className="absolute top-8 right-8 flex gap-3">
           <div className="bg-dark-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center px-6 py-3 w-80 shadow-2xl focus-within:ring-2 focus-within:ring-neon-blue transition-all">
              <Search className="w-5 h-5 text-slate-500 mr-4" />
              <input type="text" placeholder="G.P.S / COORDINATES / CITY" className="bg-transparent border-none text-[10px] font-black tracking-widest outline-none w-full placeholder:text-slate-700 text-neon-blue" />
           </div>
           <button className="w-14 h-14 bg-neon-blue rounded-2xl flex items-center justify-center text-dark-900 shadow-[0_0_20px_rgba(80,215,255,0.4)] hover:scale-105 active:scale-95 transition-all">
              <Navigation className="w-6 h-6 fill-current" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
