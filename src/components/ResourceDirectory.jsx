import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  SquarePlus, 
  Droplets, 
  Home, 
  Contact, 
  Package, 
  HeartHandshake,
  ArrowRight,
  Map as MapIcon
} from 'lucide-react';

const ResourceDirectory = () => {
  const categories = [
    {
      title: "Medical",
      desc: "Trauma centers, field hospitals, and active pharmacy locations with stock updates.",
      icon: SquarePlus,
      linkText: "VIEW NETWORK",
      link: "/resources?cat=Medical"
    },
    {
      title: "Food & Water",
      desc: "Potable water stations, communal kitchens, and grocery supply distribution points.",
      icon: Droplets,
      linkText: "LOCATE POINTS",
      link: "/resources?cat=FoodWater"
    },
    {
      title: "Shelters",
      desc: "Safe havens, temporary housing, and overnight accommodations with capacity tracking.",
      icon: Home,
      linkText: "CHECK CAPACITY",
      link: "/resources?cat=Shelters"
    },
    {
      title: "Emergency Contacts",
      desc: "Direct lines to dispatch, search & rescue teams, and regional coordination units.",
      icon: Contact,
      linkText: "DIAL NOW",
      link: "/resources?cat=Contacts"
    },
    {
      title: "Supplies",
      desc: "Battery stations, hygiene kits, and essential non-food hardware distribution.",
      icon: Package,
      linkText: "CHECK INVENTORY",
      link: "/resources?cat=Supplies"
    },
    {
      title: "NGOs",
      desc: "Non-profit partners, volunteer mobilization, and international relief organization coordination.",
      icon: HeartHandshake,
      linkText: "PARTNER ACCESS",
      link: "/resources?cat=NGOs"
    }
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-[#1a1a1a] tracking-tight mb-6"
          >
            Critical Resource Directory
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed font-medium"
          >
            Centralized access to verified emergency infrastructure. Navigate by category to locate immediate assistance, essential supplies, and active support networks.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-10">
                <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{cat.title}</h3>
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors duration-500">
                  <cat.icon className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors duration-500" />
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">
                {cat.desc}
              </p>
              <Link 
                to={cat.link}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors duration-500"
              >
                {cat.linkText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Map Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[450px] rounded-[3rem] overflow-hidden group shadow-2xl"
        >
          {/* Map Background Simulation */}
          <div className="absolute inset-0 bg-[#0c0c0e]">
             {/* Simple grid pattern for "map" look */}
             <div className="absolute inset-0 opacity-20" style={{ 
               backgroundImage: `radial-gradient(circle at 2px 2px, #333 1px, transparent 0)`,
               backgroundSize: '40px 40px' 
             }}></div>
             
             {/* Strategic Map-like Lines */}
             <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <path d="M0 100 Q 200 150 400 50 T 800 200" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M100 0 Q 150 200 50 400 T 200 800" stroke="white" strokeWidth="2" fill="none" />
                </svg>
             </div>

             {/* Pulse Points */}
             <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-white rounded-full"><span className="absolute inset-0 animate-ping bg-white/50 rounded-full"></span></div>
             <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full"><span className="absolute inset-0 animate-ping bg-white/50 rounded-full"></span></div>
             <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-white rounded-full"><span className="absolute inset-0 animate-ping bg-white/50 rounded-full"></span></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Floating Card */}
          <div className="absolute bottom-12 left-12 bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm border border-slate-100">
            <h4 className="text-xl font-black text-[#1a1a1a] mb-2">Live Resource Map</h4>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">
              42 active stations reporting in your current sector.
            </p>
            <Link 
              to="/map"
              className="mt-6 flex items-center gap-3 py-4 px-8 bg-[#1a1a1a] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 group/btn"
            >
              <MapIcon className="w-4 h-4" /> Open Tactical Map <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourceDirectory;
