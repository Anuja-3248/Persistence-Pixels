import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ChevronLeft, Globe, Activity, Shield } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-white font-sans selection:bg-neon-blue/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-red/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-12 py-8 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-neon-blue/20 p-2 rounded-lg border border-neon-blue/40">
            <Activity className="w-6 h-6 text-neon-blue" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">
            Disaster <span className="text-neon-blue">X</span>
          </span>
        </div>
        
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Command
        </Link>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full mb-6"
              >
                <p className="text-[10px] font-black text-neon-blue uppercase tracking-[0.3em]">Operational Support</p>
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Establish <br /> <span className="text-neon-blue">Contact.</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">
                Our strategic command is operational 24/7. Whether you're reporting a system anomaly, 
                seeking partnership, or requiring emergency coordination, establish contact through 
                our secure channels.
              </p>
            </div>

            <div className="grid gap-10">
              {[
                { icon: Mail, label: 'Strategic Command', value: 'HQ@DISASTERX.ORG', color: 'text-neon-blue' },
                { icon: Phone, label: 'Emergency Hotline', value: '+1 (800) DISASTER', color: 'text-neon-red' },
                { icon: MapPin, label: 'Main Sector', value: 'SILICON VALLEY, CA', color: 'text-white' }
              ].map((info, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-8 group"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-blue/40 transition-all duration-500 group-hover:scale-110">
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{info.label}</p>
                    <p className="text-2xl font-black text-white group-hover:text-neon-blue transition-colors duration-500 tracking-tight">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 flex gap-6 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0A0C10] bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Specialist" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest"><span className="text-white">12 Specialists</span> Online & Ready</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-blue/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />
            <form className="relative glass-dark border border-white/10 p-12 md:p-16 rounded-[60px] space-y-8 shadow-2xl">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Full Name</label>
                    <input type="text" placeholder="GORDON FREEMAN" className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 text-sm font-bold text-white focus:outline-none focus:border-neon-blue transition-all placeholder:opacity-20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Secure Email</label>
                    <input type="email" placeholder="HQ@SECTOR7.ORG" className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 text-sm font-bold text-white focus:outline-none focus:border-neon-blue transition-all placeholder:opacity-20" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Transmission Subject</label>
                  <input type="text" placeholder="TECHNICAL SUPPORT" className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 text-sm font-bold text-white focus:outline-none focus:border-neon-blue transition-all placeholder:opacity-20" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Message Briefing</label>
                  <textarea rows="5" placeholder="SYSTEM OPERATIONAL IN SECTOR 4..." className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 text-sm font-bold text-white focus:outline-none focus:border-neon-blue transition-all placeholder:opacity-20 resize-none"></textarea>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white font-black py-6 rounded-[24px] flex items-center justify-center gap-4 tracking-[0.25em] transition-all transform active:scale-[0.98] shadow-[0_0_50px_rgba(46,125,233,0.3)] text-xs uppercase overflow-hidden group">
                <span className="relative z-10">Initialize Transmission</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="pt-4 flex items-center justify-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <p className="text-[9px] font-black text-[#10b981] uppercase tracking-[0.4em]">Secure Uplink Established</p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="relative z-10 px-12 py-12 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-blue" />
            <span className="text-xs font-black uppercase tracking-widest text-white">DisasterX Global Operations</span>
          </div>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            {['Privacy Protocol', 'Operational Ethos', 'Command Registry'].map(item => (
              <span key={item} className="cursor-pointer hover:text-white transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
