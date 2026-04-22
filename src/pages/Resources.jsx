import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  ExternalLink,
  ArrowRight,
  SquarePlus,
  HeartHandshake,
  Map as MapIcon,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Camera,
  QrCode,
  Clock,
  Navigation,
  Info,
  MoreHorizontal,
  Sun,
  Moon
} from 'lucide-react';
import { resourcesData } from '../data/mockResources';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('Directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNearest, setFilterNearest] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat && ['Medical', 'FoodWater', 'Shelters', 'Contacts', 'Supplies', 'NGOs', 'All'].includes(cat)) {
      setActiveTab(cat);
    } else {
      setActiveTab('Directory');
    }
  }, [location]);

  const categories = [
    { id: 'Medical', name: 'Medical', icon: SquarePlus, desc: "Trauma centers, field hospitals, and active pharmacies." },
    { id: 'FoodWater', name: 'Food & Water', icon: Droplets, desc: "Potable water stations and supply distribution." },
    { id: 'Shelters', name: 'Shelters', icon: Home, desc: "Safe havens and temporary accommodations." },
    { id: 'Contacts', name: 'Contacts', icon: Phone, desc: "Emergency dispatch and coordination units." },
    { id: 'Supplies', name: 'Supplies', icon: Package, desc: "Battery stations and essential gear." },
    { id: 'NGOs', name: 'NGOs & Vols', icon: HeartHandshake, desc: "Relief partners and volunteer mobilization." }
  ];

  const processedData = useMemo(() => {
    if (activeTab === 'Directory') return [];
    
    let rawData = [];
    if (activeTab === 'All') {
      Object.keys(resourcesData).forEach(key => {
        rawData = [...rawData, ...resourcesData[key].map(item => ({ ...item, type: key }))];
      });
    } else {
      rawData = (resourcesData[activeTab] || []).map(item => ({ ...item, type: activeTab }));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      rawData = rawData.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.details.toLowerCase().includes(q) ||
        (item.type && item.type.toLowerCase().includes(q))
      );
    }

    if (filterAvailable) rawData = rawData.filter(item => item.availabilityStatus === 'Available');
    if (filterFree) rawData = rawData.filter(item => item.isFree);
    if (filterNearest) rawData.sort((a, b) => a.distance - b.distance);

    return rawData;
  }, [activeTab, searchQuery, filterNearest, filterAvailable, filterFree]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100 dark:border-green-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Available</span>;
      case 'Limited': return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 dark:border-amber-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div> Limited</span>;
      case 'Full': return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100 dark:border-red-900/30 transition-colors duration-500"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Full Status</span>;
      default: return null;
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'Medical': return <SquarePlus className="w-6 h-6 text-blue-500" />;
      case 'FoodWater': return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'Shelters': return <Home className="w-6 h-6 text-blue-500" />;
      case 'Contacts': return <Phone className="w-6 h-6 text-blue-500" />;
      case 'Supplies': return <Package className="w-6 h-6 text-blue-500" />;
      case 'NGOs': return <HeartHandshake className="w-6 h-6 text-blue-500" />;
      default: return <Activity className="w-6 h-6 text-blue-500" />;
    }
  };

  const renderFoodWaterView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-20 lg:ml-12">
          <h1 className="text-[5.5rem] leading-none font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-8">
            Food & Water <br/>Resources.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-2xl font-light leading-relaxed">
            Critical life-support stations currently active within your safety perimeter. Verify status and proximity before departure.
          </p>
        </section>

        {/* Bento Layout Resource Cards (Dynamic from resourcesData) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:ml-12">
          {(resourcesData.FoodWater || []).map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx === 0 ? (
                /* Primary Large Card (First Item) */
                <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 h-full flex flex-col justify-between transition-all duration-500 hover:shadow-xl">
                    <div>
                      <div className="flex justify-between items-start mb-16">
                        <div className="flex flex-col">
                          <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Primary Aid</span>
                          <h2 className="text-5xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">{item.name}</h2>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 flex items-center gap-3 px-6 py-3 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-500">
                          <div className={`w-2.5 h-2.5 rounded-full ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                          <span className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest">{item.availabilityStatus}</span>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="flex items-center gap-6">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                            <MapPin className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-[#1a1a1a] dark:text-white">{item.address}</p>
                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Metropolitan Zone</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                            <Clock className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-[#1a1a1a] dark:text-white">{item.distance} km • {Math.round(item.distance * 15)} min walk</p>
                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estimated Transit</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-16 pt-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                      <div className="flex -space-x-3">
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                          <Utensils className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                          <Droplets className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                          <Activity className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                        </div>
                      </div>
                      <button 
                        onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                        className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                      >
                        Navigate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Resource Item (Subsequent Items) */
                <div className="lg:col-span-12 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors duration-500 ${
                        item.availabilityStatus === 'Available' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900'
                      }`}>
                        {item.availabilityStatus === 'Available' ? 'Stable Supply' : 'Limited Supply'}
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">ID: {item.id.toUpperCase()}</span>
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-4">{item.name}</h3>
                    <div className="flex gap-10">
                      <div className="flex items-center gap-3">
                        <Navigation className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-[#1a1a1a] dark:text-white font-black text-sm uppercase tracking-wider">{item.distance} km Distance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-[#1a1a1a] dark:text-white font-black text-sm uppercase tracking-wider">{item.details.split('.')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex items-center gap-6">
                    <button 
                      onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                      className="flex-1 md:flex-none bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                    >
                      Navigate
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Side Map Preview (Kept as Visual Anchor) */}
          <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden relative min-h-[400px] border border-slate-200 dark:border-slate-800 shadow-sm group transition-colors duration-500">
            <img 
              alt="Map" 
              className="w-full h-full object-cover grayscale opacity-50 contrast-125 transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKPoDidQ1iFwLoWaKkLAE09xCHAPPovjgij48-MBHlRqqN31SNLfOfbgDkEaQllSYjUkrfwc-PBZFvqBy5DRSgNJJn_4x_hcyq1u9ckTZK4WMhMs0utm-YBkPPgE5jlWk1Xr7emRBlViLyr4uVDcKBvOkXKMOysXVxKj9edqHm1onGoQ7fZ-xnhhe1A3D7VjLibFUTTSAIGxXiSimv-3ZrVqEYauyxaJaHMJQ-4ZeCKU38z5R-fnFwzLWfWE3gPJwKbM8KEnCAA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white dark:border-slate-800 transition-colors duration-500">
                <p className="text-[#1a1a1a] dark:text-white font-black text-xl mb-2">Live Perimeter View</p>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">{(resourcesData.FoodWater || []).length} Active Stations reporting.</p>
            </div>
          </div>
        </div>

          {/* Informational Layer */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col gap-8 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-500">
              <Info className="w-8 h-8 text-[#1a1a1a] dark:text-white" />
            </div>
            <h4 className="text-2xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">System Status</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Data refreshed 4 minutes ago. Local infrastructure is currently operating at 64% capacity. Priority is given to medical emergencies and families with children.
            </p>
            <div className="mt-4 pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
              <button className="text-[#1a1a1a] dark:text-white font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-3 hover:gap-5 transition-all">
                View Local Protocols
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="bg-white dark:bg-slate-900 h-full w-full p-12 flex flex-col md:flex-row gap-12 items-center rounded-[2.5rem] transition-colors duration-500">
              <div className="w-full md:w-1/3 aspect-square bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-inner transition-colors duration-500">
                <QrCode className="w-20 h-20 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-3xl font-black tracking-tighter text-[#1a1a1a] dark:text-white mb-4">Quick Pass Access</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Present this terminal code at any Clinical Sentinel station to bypass intake documentation.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest border border-slate-100 dark:border-slate-700 transition-colors duration-500">ID: CS-29381</span>
                  <span className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest border border-slate-100 dark:border-slate-700 transition-colors duration-500">Valid: 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Urgency Drawer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 rounded-full shadow-2xl flex items-center justify-between border border-white/20 dark:border-slate-800 transition-colors duration-500">
          <div className="flex items-center gap-5 pl-6">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] leading-none mb-1">Emergency</span>
              <span className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">Response Ready</span>
            </div>
          </div>
          <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] hover:bg-black dark:hover:bg-slate-200 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl">
            <Phone className="w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
            Call Dispatch
          </button>
        </div>
      </div>
    </motion.div>
  );


  const renderMedicalView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-12 max-w-5xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-24 mt-12">
          <h1 className="text-[5.5rem] font-black leading-[0.9] tracking-tighter text-[#1a1a1a] dark:text-white mb-8">
            Medical<br/>Resources.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-2xl font-light max-w-xl leading-relaxed">
            Real-time capacity and proximity tracking for clinical facilities.
          </p>
        </header>

        {/* Resource List - Tonal Stacking (Dynamic from resourcesData) */}
        <div className="space-y-16">
          {(resourcesData.Medical || []).map((item) => (
            <section 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-12 transition-all duration-300 hover:opacity-70">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#1a1a1a] dark:text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {item.id.startsWith('m') ? 'Hospital' : 'Clinic'}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <MapPin className="w-4 h-4" /> {item.distance} mi
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <Phone className="w-4 h-4" /> {item.contact}
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">
                    {item.name}
                  </h2>
                  <p className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-xs">{item.address}</p>
                </div>
                
                <div className="mt-8 md:mt-0 flex flex-wrap items-center gap-4">
                  <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border shadow-sm ${
                    item.availabilityStatus === 'Available' 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' 
                      : item.availabilityStatus === 'Limited'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      item.availabilityStatus === 'Available' ? 'bg-emerald-500' : item.availabilityStatus === 'Limited' ? 'bg-amber-500' : 'bg-red-500'
                    } animate-pulse`}></div>
                    <span className="text-[10px] font-black tracking-widest uppercase">{item.availabilityStatus}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.open(`tel:${item.contact}`); }}
                      className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      title="Call Facility"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); item.mapLink && window.open(item.mapLink, '_blank'); }}
                      className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      title="Open in Google Maps"
                    >
                      <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <ArrowRight className="w-10 h-10 text-slate-200 dark:text-slate-800 group-hover:text-[#1a1a1a] dark:group-hover:text-white group-hover:translate-x-2 transition-all hidden md:block" />
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Secondary Content / Map Preview */}
        <section className="mt-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-1 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
          <div className="relative h-[600px] w-full rounded-[2.8rem] overflow-hidden bg-slate-200 dark:bg-slate-800 group">
            {/* Real-time Map Simulation Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 mix-blend-overlay"></div>
              {/* Pulsing Radar Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                  className="w-[500px] h-[500px] border-2 border-blue-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
                  className="w-[500px] h-[500px] border-2 border-blue-500/30 rounded-full"
                />
              </div>
              
              {/* Scanning Line */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-y-1/2 origin-center"
              />

              {/* Data Points on Map */}
              {(resourcesData.Medical || []).map((item, idx) => (
                <div 
                  key={item.id}
                  className="absolute"
                  style={{ 
                    top: `${25 + (idx * 22)}%`, 
                    left: `${35 + (idx * 18)}%` 
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.7)]`} />
                  <div className="absolute top-6 left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xl min-w-[150px]">
                    <p className="text-[11px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter leading-none mb-1">{item.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.distance} mi • {item.availabilityStatus}</p>
                  </div>
                </div>
              ))}
            </div>

            <img 
              className="w-full h-full object-cover grayscale opacity-30 contrast-125 group-hover:scale-105 transition-transform duration-[3000ms]" 
              src="https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=2070&auto=format&fit=crop"
              alt="Medical Network Map"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent z-20"></div>
            
            <div className="absolute bottom-12 left-12 right-12 flex flex-col xl:flex-row justify-between items-end gap-8 z-30">
              <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
                {/* Area Summary Card */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 max-w-md transition-all duration-500 hover:translate-y-[-10px]">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-6 h-6 text-blue-500 animate-pulse" />
                    <h3 className="font-black text-3xl text-[#1a1a1a] dark:text-white tracking-tighter">Area Summary</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">Total Facilities</span>
                      <span className="text-2xl font-black text-[#1a1a1a] dark:text-white">{(resourcesData.Medical || []).length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">Available Now</span>
                      <span className="text-2xl font-black text-emerald-500">
                        {(resourcesData.Medical || []).filter(r => r.availabilityStatus === 'Available').length}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank')}
                      className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                    >
                      <MapPin className="w-4 h-4" />
                      Find Hospitals in Google Maps
                    </button>
                  </div>
                </div>

                {/* Emergency Dispatch Card */}
                <div className="bg-red-500/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-red-400 max-w-sm transition-all duration-500 hover:translate-y-[-10px] text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <PhoneCall className="w-6 h-6 text-white animate-bounce" />
                    <h3 className="font-black text-3xl text-white tracking-tighter">Ambulance</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/20">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Emergency Line</p>
                      <p className="text-3xl font-black tracking-tighter">911 / 102</p>
                    </div>
                    <button 
                      onClick={() => window.open('tel:911')}
                      className="w-full py-4 bg-white text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all shadow-lg active:scale-95"
                    >
                      Instant Dispatch
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Network Health</p>
                  <div className="flex items-end gap-1.5 h-10">
                    {[40, 70, 45, 90, 65, 80, 55, 75, 40, 85].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                        className="w-2 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => window.location.href='/map'} className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-800 text-[#1a1a1a] dark:text-white py-6 px-10 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 border border-slate-200 dark:border-slate-700">
                    Sentinel Map
                    <Activity className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open('https://www.google.com/maps/search/medical+facilities+near+me', '_blank')}
                    className="flex-1 md:flex-none bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white py-6 px-12 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 group"
                  >
                    Google Global Map
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );

  const renderSheltersView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        <header className="py-20 max-w-3xl lg:ml-12">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-4 block tracking-[0.2em]">SHELTER RECORDS</span>
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter mb-8">Safe Havens.</h1>
          <p className="text-2xl font-light text-slate-500 dark:text-slate-400 leading-relaxed">Verified emergency accommodations and secure relocation centers currently operational.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:ml-12">
          {(resourcesData.Shelters || []).map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx === 0 ? (
                /* Main Facility Card (First Item) */
                <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-1 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] h-full p-12 flex flex-col transition-colors duration-500">
                    <div className="flex justify-between items-start mb-16">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] font-black rounded uppercase tracking-wider border border-blue-100 dark:border-blue-800">Verified</span>
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID: {item.id.toUpperCase()}</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-[#1a1a1a] dark:text-white">{item.name}</h2>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                        item.availabilityStatus === 'Available' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}></div> {item.availabilityStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><MapPin className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">{item.address}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.distance} km distance</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><Users className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">{item.details.split('.')[0]}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Capacity Tracking</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><CheckCircle2 className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">Security Active</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Safety Zone</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><Clock className="w-5 h-5" /></div>
                          <div>
                            <p className="text-sm font-black text-[#1a1a1a] dark:text-white">24/7 Operations</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Open</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center"><Home className="w-5 h-5 text-slate-400" /></div>
                         <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center"><Droplets className="w-5 h-5 text-slate-400" /></div>
                      </div>
                      <button 
                        onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                        className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                      >
                        Navigate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Secondary Editorial Cards */
                <div key={item.id} className="lg:col-span-4 flex flex-col gap-8">
                  <div className="bg-[#1a1a1a] dark:bg-slate-800 rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[300px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 block">PROXIMITY</span>
                      <h3 className="text-3xl font-black tracking-tight leading-none mb-4 italic">{item.name}</h3>
                      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed">{item.details}</p>
                    </div>
                    <button 
                      onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                      className="relative z-10 w-fit text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-all"
                    >
                      Navigate in Maps
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>

      {/* Persistent Urgency Drawer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 rounded-full shadow-2xl flex items-center justify-between border border-white/20 dark:border-slate-800 transition-colors duration-500">
          <div className="flex items-center gap-5 pl-6">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] leading-none mb-1">Emergency</span>
              <span className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">Response Ready</span>
            </div>
          </div>
          <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] hover:bg-black dark:hover:bg-slate-200 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl">
            <Phone className="w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
            Call Dispatch
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSuppliesView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="max-w-[1600px] mx-auto bg-[#f9f9f9] dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-32 px-12 max-w-7xl mx-auto">
        <header className="py-20 max-w-3xl">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-4 block tracking-[0.2em]">INVENTORY STATUS</span>
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter mb-8">Supplies.</h1>
          <p className="text-2xl font-light text-slate-500 dark:text-slate-400 leading-relaxed">Critical resource directory for essential procurement and emergency hardware logistics.</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          {(resourcesData.Supplies || []).map((item, idx) => (
            <div 
              key={item.id} 
              className={`${idx % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5'} bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-500`}
            >
              <div className="p-12 flex flex-col h-full">
                <div className="flex justify-between items-start mb-16">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 mb-2 uppercase">CATEGORY: {item.id.includes('med') ? 'MEDICAL' : 'HARDWARE'}</span>
                    <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white">{item.name}</h2>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-500 ${
                    item.availabilityStatus === 'Available' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-700 text-red-600 dark:text-red-400'
                  }`}>
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${item.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{item.availabilityStatus}</span>
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <span className="text-slate-500 dark:text-slate-400 font-bold">{item.distance} miles away • {item.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <span className="text-slate-500 dark:text-slate-400 font-bold">{item.details}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                    className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-black dark:hover:bg-slate-200 transition-all active:scale-95"
                  >
                    NAVIGATE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {idx === 0 && (
                <div className="h-72 w-full relative">
                  <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2072&auto=format&fit=crop" alt="Supplies" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                </div>
              )}
            </div>
          ))}
        </div>
        <section className="border-t border-slate-100 dark:border-slate-800 pt-20 flex flex-col md:flex-row justify-between items-end gap-12 transition-colors duration-500">
          <div className="max-w-md">
            <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-6 uppercase tracking-tight">Stock Notification</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Fresh logistics arrived at North Gate Depot 20 minutes ago.</p>
          </div>
          <div className="flex gap-8">
            <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[200px] transition-colors duration-500">
              <span className="block text-6xl font-black text-[#1a1a1a] dark:text-white leading-none mb-4">04</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Nearby Hubs</span>
            </div>
            <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[200px] transition-colors duration-500">
              <span className="block text-6xl font-black text-[#1a1a1a] dark:text-white leading-none mb-4">92%</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">System Uptime</span>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-6rem)] max-w-lg z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-5 rounded-full shadow-2xl border border-white/20 dark:border-slate-800 flex items-center justify-between transition-colors duration-500">
          <div className="flex items-center gap-4 pl-4">
            <div className="bg-red-500 p-3 rounded-full">
              <Phone className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">Emergency Help</p>
              <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase">Immediate response dispatch</p>
            </div>
          </div>
          <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-colors shadow-lg active:scale-95">CALL NOW</button>
        </div>
      </div>
    </motion.div>
  );

  const renderContactsView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-[#f9f9f9] dark:bg-slate-950 min-h-screen font-body transition-colors duration-500"
    >
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-32 pb-32 px-12 max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-24">
          <h1 className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white leading-[1.1] tracking-tighter mb-4">Urgent Resources</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg font-light leading-relaxed">
            Critical communication channels for immediate assistance. High-priority dispatch and relief services monitored in real-time.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Primary Emergency Contact (Police) */}
          <div className="md:col-span-7 bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 transition-colors duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-sm transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">First Responder</span>
                  <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white">Police Emergency</h2>
                </div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full gap-2 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-bold tracking-wider text-[#1a1a1a] dark:text-white uppercase">Available</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <p className="text-[5.5rem] font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-none">911</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-4 font-medium italic">Standard emergency dispatch protocol</p>
                </div>
                <button className="inline-flex items-center justify-center bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl hover:bg-black dark:hover:bg-slate-200">
                  Initiate Call
                  <Phone className="ml-3 w-5 h-5 fill-white dark:fill-[#1a1a1a]" />
                </button>
              </div>
            </div>
          </div>

          {/* Relief Helpline */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-12 h-full flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-colors duration-500">
              <div className="mb-16">
                <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] uppercase block mb-4">Support & Recovery</span>
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white leading-tight">Disaster Relief Helpline</h2>
              </div>
              
              <div className="mb-8 inline-flex self-start items-center bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-4 py-2 rounded-full gap-2 transition-colors duration-500">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-[11px] font-bold tracking-wider text-red-600 dark:text-red-400 uppercase">Limited Availability</span>
              </div>

              <div>
                <div className="space-y-1 mb-8">
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Global Support ID</p>
                  <p className="text-3xl font-black text-[#1a1a1a] dark:text-white">1-800-621-3362</p>
                </div>
                <button className="w-full bg-white dark:bg-slate-800 text-[#1a1a1a] dark:text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center shadow-sm border border-slate-100 dark:border-slate-700">
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Visual Anchor Element */}
            <div className="relative overflow-hidden rounded-3xl h-56 bg-slate-200 dark:bg-slate-900 transition-colors duration-500">
              <img 
                alt="Atmospheric city" 
                className="w-full h-full object-cover opacity-60 grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeYq1x-B06J0svunCO2QsnxGptT1iTx9pwf2LU2Ti2q2T5OcArChn0TBJG5m0Il90cytKK9hi4r7io6fokdXrT-ZgqKPxRwzt-pdvNtzGDfB2T76z-c7Zd1-g2DbcRlugEIPsSSS0NvBznksYUOlajP6GWzMrfFJfzAxSDVU1sWSl-vnbgk8W7hNothjhik1RqJz9dWLw1ROPNPP9l3jQuAkgkRIjAXSM6AV_Oy0bCOH_XU3wfNJw0yUlP7_zD9TxYlRf_aFXMyg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-950 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Operational Monitoring: Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Information Layer */}
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-16 transition-colors duration-500">
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Global Dispatch</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Our sentinel systems provide direct routing to the nearest municipal dispatch center based on your encrypted geolocation data.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Response Times</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Average response latency for priority 911 calls is currently 4 minutes 12 seconds in monitored zones.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Privacy Protocol</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Communication with these entities is logged for safety but fully encrypted to protect user identity in transition.
            </p>
          </div>
        </div>
      </main>

      {/* Glassmorphism Urgency Drawer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Sentinel System Online</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Safety Guide</button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Privacy Shield</button>
            <button className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95">
              Direct SOS
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderNGOsView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto bg-white dark:bg-slate-950 min-h-screen font-body pb-32 transition-colors duration-500"
    >
      {/* Top NavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
            <div className="hidden md:flex gap-8">
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <span className="uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 text-[10px] font-bold mb-4 block">Regional Directory</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a1a1a] dark:text-white tracking-tighter leading-tight">
                NGO Response <br/>Units
              </h1>
            </div>
            <div className="flex gap-3">
              <button className="bg-slate-200 dark:bg-slate-800 text-[#1a1a1a] dark:text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter Status
              </button>
              <button onClick={() => setActiveTab('Directory')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-all">
                 <ChevronLeft className="w-4 h-4" /> Back to Directory
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid (Dynamic from resourcesData) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Map Integration */}
          <div className="md:col-span-4 h-[600px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative group border border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <img 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmFgW4T9A0qdEwvrUVyszlhXR8UmmXG7Fn0J5fFnj4JiOSJddwROd249jSr899V60Mn-hHQ0Wv9icag7NspWzCZykOGZvtBpAOYJBE_oypNl4d-1I9ca19wK3-XoLU52GjRtTnP-rVLHVFOIwLvac57z7KCq6dtn5U6uP-LoYbYgRlDzuUKOmcokjfhLWqcMRyGq2bn29PejU7hK3806CRuzPiBoSWwONI0nixEUEsJCniAeDdTGqfXC3HLg4eSGPwbURR8g2N9Q"
              alt="Map"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-950/80 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white dark:border-slate-800 transition-colors duration-500">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Live Radius</p>
              <p className="text-xl font-bold tracking-tight text-[#1a1a1a] dark:text-white">Active Deployments</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] dark:bg-white animate-pulse"></div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{(resourcesData.NGOs || []).length} Units in Proximity</span>
              </div>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="md:col-span-8 space-y-8">
            {(resourcesData.NGOs || []).map((item) => (
              <article key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-xl group border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    src={item.id === 'n1' 
                      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAKnHEEQEUVcPgwtRIZohAuSF5sgO_QMCXvMJYCOYs22DtDf7rfh4g0zVtzwmB8EsFidWXzhkro5Yu0PvbpxaLtiaV58Xhr99gDjA0HtZ2VjrASVE8nNcr42Uxt4MnbNgZg_o3LeIUxOhr-TjDeBWi0rXJu81GAGyzjuxtRCZteMdgmqZNPf75srnerec2XcWuj6WQ1kA4taX-BLrkCca_VexTxXdGj2fzXnnmZmKzYQdJdk5XbHSP5kepBOl91yo57MKH_XPCIUQ"
                      : "https://lh3.googleusercontent.com/aida-public/AB6AXuCs62pUJflbjPQzcuxpPWels66ozwHushsH_xB_03vWrQypkAzsYCScWslD6AaYLqa_kb5TteqcLf4ngUlCcOX6Y3-plbk4sWotX2YXchMToZHKgsT-zPNrVu0FKgBSq0wbdumFMYZxt8dWnRZ6YJuRFxvz5IkcaACMOgSpQXTrTDak1zqHi5rtT1nMGqRoB8qAQytMWgwKBcEhnvm_SSNp-wqFNUoKnWFqXLCKt6uF_dld6vSMiucb3c05TkAgwc8MFcn_nt2jYA"
                    }
                    alt="NGO Team"
                  />
                </div>
                <div className="md:w-2/3 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <h2 className="text-3xl font-extrabold tracking-tighter text-[#1a1a1a] dark:text-white leading-none">{item.name}</h2>
                      <span className={`bg-white dark:bg-slate-800 text-[#1a1a1a] dark:text-white text-[10px] font-black px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 flex items-center gap-1.5 shadow-sm uppercase tracking-widest transition-colors duration-500`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.availabilityStatus === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                        {item.availabilityStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 mb-2">Proximity</p>
                        <p className="text-xl font-black text-[#1a1a1a] dark:text-white">{item.distance} km</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 mb-2">ETA</p>
                        <p className="text-xl font-black text-[#1a1a1a] dark:text-white">{Math.round(item.distance * 8)} mins</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center pt-8 border-t border-slate-50 dark:border-slate-800 transition-colors duration-500">
                    <button 
                      onClick={() => item.mapLink && window.open(item.mapLink, '_blank')}
                      className="bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-black dark:hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
                    >
                      NAVIGATE IN MAPS
                    </button>
                    <button 
                      onClick={() => window.open(`tel:${item.contact}`)}
                      className="p-3 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                      title="Call NGO"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Urgency Drawer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-4 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xl transition-colors duration-500">
          <div className="flex items-center gap-4 pl-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Emergency Line</p>
              <p className="text-sm font-bold text-[#1a1a1a] dark:text-white">Secure Sentinel Link</p>
            </div>
          </div>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform">
            CALL NOW
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="dark:bg-slate-950 transition-colors duration-500 min-h-screen">
        {activeTab === 'Directory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 pb-24 transition-colors duration-500">
            {/* TopNavBar for Directory */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
              <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1600px] mx-auto">
                <div className="flex items-center gap-10">
                  <span className="text-xl font-black tracking-tighter text-[#1a1a1a] dark:text-white uppercase">Clinical Sentinel</span>
                  <div className="hidden md:flex gap-8">
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1a1a1a] dark:hover:text-white transition-all"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-40 py-20">
              <div className="max-w-3xl mb-16">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tight mb-6">Critical Resource Directory</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Centralized access to verified emergency infrastructure.</motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {categories.map((cat, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => setActiveTab(cat.id)} className="group bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-500 flex flex-col h-full cursor-pointer">
                    <div className="flex justify-between items-start mb-10"><h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white tracking-tight">{cat.name}</h3><div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500"><cat.icon className="w-7 h-7 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors duration-500" /></div></div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 flex-1">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">ACCES RECORDS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
                className="relative h-[450px] rounded-[3rem] overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-[#0c0c0e]">
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                   <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full"><span className="absolute inset-0 animate-ping bg-white/50 rounded-full"></span></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-12 left-12 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl max-w-sm border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                  <h4 className="text-xl font-black text-[#1a1a1a] dark:text-white mb-2">Live Resource Map</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">42 active stations reporting in your current sector.</p>
                  <button onClick={() => window.location.href='/map'} className="mt-6 flex items-center gap-3 py-4 px-8 bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-400 transition-all duration-500 group/btn">
                    <MapIcon className="w-4 h-4" /> Open Tactical Map <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Medical' && renderMedicalView()}
        {activeTab === 'Shelters' && renderSheltersView()}
        {activeTab === 'Contacts' && renderContactsView()}
        {activeTab === 'Supplies' && renderSuppliesView()}
        {activeTab === 'FoodWater' && renderFoodWaterView()}
        {activeTab === 'NGOs' && renderNGOsView()}

        {activeTab !== 'Directory' && !['Medical', 'FoodWater', 'Shelters', 'Contacts', 'Supplies', 'NGOs'].includes(activeTab) && (
          <div className="min-h-screen bg-[#060b13] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab('Directory')} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"><ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white" /></button>
                <div><h2 className="text-4xl font-black uppercase tracking-tighter">{activeTab} <span className="text-blue-500">Directory</span></h2><p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Verified Relief Infrastructure</p></div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 bg-white/5 p-6 border border-white/10 rounded-3xl backdrop-blur-md">
                 <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" /><input type="text" placeholder="Search tactical records..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                 <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setFilterNearest(!filterNearest)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterNearest ? 'bg-blue-500/20 border-blue-500/40 text-blue-500' : 'bg-white/5 border-white/10 text-slate-400'}`}>Nearest</button>
                    <button onClick={() => setFilterAvailable(!filterAvailable)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterAvailable ? 'bg-green-500/20 border-green-500/40 text-green-500' : 'bg-white/5 border-white/10 text-slate-400'}`}>Available</button>
                    <button onClick={() => setFilterFree(!filterFree)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterFree ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>Free</button>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {processedData.map((item) => (
                   <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-8 border border-white/10 rounded-[32px] flex flex-col group hover:border-blue-500/30 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex gap-4 items-center"><div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">{getIconForType(item.type)}</div><div><h4 className="text-xl font-bold text-white">{item.name}</h4><p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">{item.distance} KM AWAY</p></div></div>
                         {getStatusBadge(item.availabilityStatus)}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">{item.details}</p>
                      <div className="grid grid-cols-2 gap-4 mt-auto border-t border-white/10 pt-8"><a target="_blank" rel="noreferrer" href={item.mapLink} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest text-white transition-all uppercase"><MapPin className="w-4 h-4" /> Map</a><a href={`tel:${item.contact}`} className="flex items-center justify-center gap-2 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase"><PhoneCall className="w-4 h-4" /> Contact</a></div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
