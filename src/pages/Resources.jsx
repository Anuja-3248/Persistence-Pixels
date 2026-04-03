import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Shield, Phone, Radio, Users, Droplets, Flame, Globe, Zap, Info, ChevronRight, HelpCircle, Download } from 'lucide-react';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('Flood');

  const categories = [
    { name: 'Flood', icon: Droplets, color: 'text-neon-blue' },
    { name: 'Wildfire', icon: Flame, color: 'text-neon-red' },
    { name: 'Earthquake', icon: Globe, color: 'text-neon-yellow' },
    { name: 'Safety Kit', icon: Zap, color: 'text-neon-green' }
  ];

  const checklistItems = [
    { title: 'Water Supply', desc: 'At least 1 gallon per person per day for 3 days.', active: true },
    { title: 'Emergency Food', desc: 'Non-perishable, easy-to-prepare food items.', active: true },
    { title: 'Flashlight & Batteries', desc: 'Spare batteries for illumination during power cuts.', active: false },
    { title: 'First Aid Kit', desc: 'Basic medical supplies and personal prescriptions.', active: true },
    { title: 'Multi-tool', desc: 'Universal tool for minor repairs and adjustments.', active: false },
    { title: 'Sanitation Items', desc: 'Moist towelettes, garbage bags and plastic ties.', active: false }
  ];

  const guides = [
     { title: 'Flash Flood Preparedness', time: '5m Read', views: '2.4k', img: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1000' },
     { title: 'Home Fire Safety Protocol', time: '8m Read', views: '1.2k', img: 'https://images.unsplash.com/photo-1544152121-42cb4bd463e4?auto=format&fit=crop&q=80&w=1000' },
     { title: 'Earthquake Survival Guide', time: '12m Read', views: '4.8k', img: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-8 space-y-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter">Safety <span className="text-neon-blue">Intel</span> & Resources</h2>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Official Protection Procedures / Response Guide 2026</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 hover:bg-neon-blue/10 hover:border-neon-blue/30 transition-all text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white group">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Survivor's Data Pack (OFFLINE)
           </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
         {categories.map((cat, idx) => (
           <button 
             key={idx}
             onClick={() => setActiveCategory(cat.name)}
             className={`flex-1 min-w-[200px] p-6 rounded-[32px] border transition-all flex items-center gap-6 group ${
               activeCategory === cat.name 
                 ? 'bg-neon-blue/10 border-neon-blue/40 shadow-[0_20px_40px_rgba(80,215,255,0.1)]' 
                 : 'bg-white/5 border-white/5 hover:border-white/10'
             }`}
           >
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform ${
               activeCategory === cat.name ? 'bg-neon-blue/20' : 'bg-black/20'
             }`}>
                <cat.icon className={`w-7 h-7 ${cat.color} ${activeCategory === cat.name ? 'animate-pulse' : ''}`} />
             </div>
             <div className="text-left">
                <span className={`text-[10px] font-black uppercase tracking-widest ${activeCategory === cat.name ? 'text-neon-blue' : 'text-slate-500'}`}>{cat.name}</span>
                <p className="text-lg font-black mt-1">Protocols</p>
             </div>
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Checklist */}
         <div className="glass-dark border border-white/5 p-10 rounded-[50px] shadow-2xl">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Emergency Kit Checklist</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Survival Essentials for Critical Scenarios</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                  <CheckCircle className="w-6 h-6" />
               </div>
            </div>

            <div className="grid gap-6">
               {checklistItems.map((item, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ x: 10 }}
                   className="flex items-start gap-6 group cursor-pointer"
                 >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                      item.active ? 'bg-neon-green/20 border-neon-green/40' : 'bg-white/5 border-white/10 group-hover:border-neon-blue/40'
                    }`}>
                       <CheckCircle className={`w-5 h-5 ${item.active ? 'text-neon-green' : 'text-transparent group-hover:text-neon-blue/40'}`} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-white/5 group-last:border-none">
                       <h5 className={`text-lg font-black transition-colors ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{item.title}</h5>
                       <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
            
            <button className="w-full mt-10 btn-primary py-5 rounded-3xl text-sm font-black tracking-widest uppercase">
               Add Custom Supply Points
            </button>
         </div>

         {/* Safety Guides */}
         <div className="space-y-10">
            <div className="flex items-center justify-between">
               <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Safety Intel Library</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Field Tested Survival Strategies</p>
               </div>
               <Info className="w-6 h-6 text-slate-500" />
            </div>

            <div className="grid gap-8">
               {guides.map((guide, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ scale: 1.02 }}
                   className="relative h-64 rounded-[40px] border border-white/10 overflow-hidden group cursor-pointer shadow-xl shadow-black/20"
                 >
                    <img src={guide.img} alt={guide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 opacity-90 transition-opacity group-hover:opacity-100" />
                    
                    <div className="absolute inset-x-8 bottom-8 flex flex-col items-start">
                       <div className="flex gap-4 mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full border border-neon-blue/30 backdrop-blur-md">{guide.time}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">{guide.views} Reads</span>
                       </div>
                       <h5 className="text-2xl font-black text-white group-hover:text-neon-blue transition-colors leading-tight">{guide.title}</h5>
                       <div className="mt-4 flex items-center text-neon-blue font-bold text-xs uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Access Intel <ChevronRight className="w-4 h-4" />
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 bg-dark-900 border border-white/5 p-12 rounded-[60px] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 blur-[100px] rounded-full group-hover:bg-neon-blue/10 transition-all" />
         
         <div className="w-24 h-24 rounded-full bg-neon-blue text-dark-900 flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(80,215,255,0.4)] relative z-10">
            <HelpCircle className="w-12 h-12" />
         </div>
         <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-3xl font-black uppercase tracking-tighter">Need Immediate Assistance?</h4>
            <p className="text-slate-400 font-medium leading-relaxed mt-4 max-w-2xl">
               If you are currently experiencing a life-threatening emergency and cannot locate resources, 
               activate the S.O.S beacon or use our persistent AI Chatbot (ShieldAI) for real-time guidance.
            </p>
         </div>
         <div className="relative z-10 flex gap-4 shrink-0">
            <button className="btn-primary px-10 py-5 rounded-3xl text-sm font-black tracking-widest uppercase">Contact Authorities</button>
         </div>
      </div>
    </motion.div>
  );
};

export default Resources;
