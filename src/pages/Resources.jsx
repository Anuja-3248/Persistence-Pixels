import React, { useState, useMemo } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { resourcesData } from '../data/mockResources';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNearest, setFilterNearest] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterFree, setFilterFree] = useState(false);

  const categories = [
    { id: 'All', name: 'All Resources', icon: MapPin },
    { id: 'Medical', name: 'Medical', icon: Activity },
    { id: 'FoodWater', name: 'Food & Water', icon: Droplets },
    { id: 'Shelters', name: 'Shelters', icon: Home },
    { id: 'Contacts', name: 'Contacts', icon: Phone },
    { id: 'Supplies', name: 'Supplies', icon: Package },
    { id: 'NGOs', name: 'NGOs & Vols', icon: Users }
  ];

  // Flatten and process data
  const processedData = useMemo(() => {
    let rawData = [];
    if (activeTab === 'All') {
      Object.keys(resourcesData).forEach(key => {
        rawData = [...rawData, ...resourcesData[key].map(item => ({ ...item, type: key }))];
      });
    } else {
      rawData = (resourcesData[activeTab] || []).map(item => ({ ...item, type: activeTab }));
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      rawData = rawData.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.details.toLowerCase().includes(q) ||
        (item.type && item.type.toLowerCase().includes(q))
      );
    }

    // Filter toggles
    if (filterAvailable) {
      rawData = rawData.filter(item => item.availabilityStatus === 'Available');
    }
    if (filterFree) {
      rawData = rawData.filter(item => item.isFree);
    }

    // Sort by nearest if selected
    if (filterNearest) {
      rawData.sort((a, b) => a.distance - b.distance);
    }

    return rawData;
  }, [activeTab, searchQuery, filterNearest, filterAvailable, filterFree]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available':
        return <span className="flex items-center gap-1 text-xs font-bold text-neon-green bg-neon-green/10 px-2 py-1 rounded-full border border-neon-green/20"><CheckCircle2 className="w-3 h-3"/> Available</span>;
      case 'Limited':
        return <span className="flex items-center gap-1 text-xs font-bold text-neon-yellow bg-neon-yellow/10 px-2 py-1 rounded-full border border-neon-yellow/20"><AlertTriangle className="w-3 h-3"/> Limited</span>;
      case 'Full':
        return <span className="flex items-center gap-1 text-xs font-bold text-neon-red bg-neon-red/10 px-2 py-1 rounded-full border border-neon-red/20"><XCircle className="w-3 h-3"/> Full</span>;
      default:
        return null;
    }
  };

  const getIconForType = (type) => {
    const cat = categories.find(c => c.id === type);
    if (!cat) return <MapPin className="w-5 h-5 text-neon-blue" />;
    const Icon = cat.icon;
    return <Icon className="w-5 h-5 text-neon-blue" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto min-h-screen"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black uppercase tracking-tighter">Emergency <span className="text-neon-blue">Resources</span></h2>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Real-time Location Directory & Relief Contacts</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white/5 border border-white/20 rounded-2xl flex items-center gap-2 hover:bg-neon-blue/10 hover:border-neon-blue/30 transition-all text-sm font-black uppercase tracking-widest text-slate-300 hover:text-white group">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Offline Survival Pack
           </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 section-card p-6 border border-white/5 shadow-2xl rounded-3xl">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search hospitals, food, shelter, supplies..." 
              className="w-full bg-dark-900 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 text-slate-400 border-r border-white/10 mr-2">
               <Filter className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
            </div>
            
            <button 
              onClick={() => setFilterNearest(!filterNearest)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterNearest ? 'bg-neon-blue/20 border-neon-blue/40 text-neon-blue' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
            >
              Nearest First
            </button>
            <button 
              onClick={() => setFilterAvailable(!filterAvailable)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterAvailable ? 'bg-neon-green/20 border-neon-green/40 text-neon-green' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
            >
              Available Now
            </button>
            <button 
              onClick={() => setFilterFree(!filterFree)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterFree ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
            >
              Free Services
            </button>
         </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
         {categories.map((cat) => (
           <button
             key={cat.id}
             onClick={() => setActiveTab(cat.id)}
             className={`flex-shrink-0 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all border ${
               activeTab === cat.id 
                ? 'bg-neon-blue/10 border-neon-blue/40 shadow-[0_0_20px_rgba(80,215,255,0.15)] text-white' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
              <cat.icon className={`w-5 h-5 ${activeTab === cat.id ? 'text-neon-blue' : 'opacity-70'}`} />
              <span className="text-sm font-black uppercase tracking-widest">{cat.name}</span>
           </button>
         ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         <AnimatePresence>
            {processedData.length > 0 ? (
               processedData.map((item) => (
                 <motion.div
                   key={item.id}
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className="section-card p-6 border border-white/10 rounded-[32px] flex flex-col group hover:border-neon-blue/30 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/[0.02] to-transparent"
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex gap-3 items-center">
                          <div className="w-12 h-12 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-neon-blue/30 transition-colors">
                            {getIconForType(item.type)}
                          </div>
                          <div>
                             <h4 className="text-lg font-black text-white leading-tight">{item.name}</h4>
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{item.distance} mi away</p>
                          </div>
                       </div>
                       <div>
                          {getStatusBadge(item.availabilityStatus)}
                       </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                       <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{item.details}</p>
                       <div className="flex flex-wrap gap-2">
                          {item.isFree && <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Free</span>}
                          {item.type && <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">{categories.find(c => c.id === item.type)?.name}</span>}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto border-t border-white/10 pt-6">
                       {item.mapLink ? (
                         <a 
                           href={item.mapLink}
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-black uppercase tracking-widest text-slate-300 transition-colors"
                         >
                           <MapPin className="w-4 h-4" />
                           Map
                         </a>
                       ) : (
                         <button disabled className="flex items-center justify-center gap-2 py-3 bg-white/5 opacity-50 rounded-xl text-sm font-black uppercase tracking-widest text-slate-500 cursor-not-allowed">
                           <MapPin className="w-4 h-4" />
                           N/A
                         </button>
                       )}
                       
                       {item.contact ? (
                         <a 
                           href={`tel:${item.contact.replace(/[^0-9+]/g, '')}`}
                           className="flex items-center justify-center gap-2 py-3 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/20 hover:border-neon-blue/40 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
                         >
                           <PhoneCall className="w-4 h-4" />
                           Call
                         </a>
                       ) : (
                          <button disabled className="flex items-center justify-center gap-2 py-3 bg-white/5 opacity-50 rounded-xl text-sm font-black uppercase tracking-widest text-slate-500 cursor-not-allowed">
                            <PhoneCall className="w-4 h-4" />
                            N/A
                          </button>
                       )}
                    </div>
                    
                    {item.type === 'NGOs' && (
                       <button className="w-full mt-3 py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2">
                          <ExternalLink className="w-3 h-3" /> Register / Request Help
                       </button>
                    )}
                 </motion.div>
               ))
            ) : (
               <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <XCircle className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Resources Found</h3>
                  <p className="text-slate-500 mt-2">Adjust your filters or search query to find nearby help.</p>
               </div>
            )}
         </AnimatePresence>
      </div>

      {/* SOS / Immediate Assistance Banner bottom */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-8 bg-dark-900 border border-neon-red/20 p-8 rounded-[40px] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-neon-red/5 blur-[80px] rounded-full group-hover:bg-neon-red/10 transition-all" />
         
         <div className="w-16 h-16 rounded-full bg-neon-red/10 text-neon-red border border-neon-red/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,60,60,0.2)] relative z-10">
            <HelpCircle className="w-8 h-8" />
         </div>
         <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-2xl font-black uppercase tracking-tighter text-white">Need Immediate Life-Saving Assistance?</h4>
            <p className="text-slate-400 font-medium leading-relaxed mt-2 text-sm max-w-2xl">
               Activate your S.O.S beacon or dial emergency services directly if you are in immediate danger.
            </p>
         </div>
         <div className="relative z-10 flex flex-wrap justify-center gap-4 shrink-0">
            <a href="tel:911" className="px-8 py-4 bg-neon-red text-white rounded-2xl text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(255,60,60,0.4)] flex items-center gap-2">
               <PhoneCall className="w-4 h-4" /> 911 Direct
            </a>
         </div>
      </div>

    </motion.div>
  );
};

export default Resources;
