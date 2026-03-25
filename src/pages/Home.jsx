import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, ChevronRight, Activity, Map, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 bg-dark-900 bg-cover bg-center bg-no-repeat bg-hero-flood animate-pulse-slow">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#0f172a]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue font-bold text-xs uppercase tracking-widest mb-10">
            <span className="w-2 h-2 bg-neon-blue rounded-full mr-2 animate-ping" />
            Shield AI Online: 99.8% Prediction Accuracy
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter">
            PREDICT. <span className="text-neon-blue">PROTECT.</span><br />
            PREVENT.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
            Harnessing the power of Artificial Intelligence to anticipate catastrophes 
            before they strike, ensuring proactive safety and rapid response.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <Link to="/map" className="btn-primary flex items-center justify-center gap-3 group text-lg px-10 py-4">
               Enter Live Map <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link to="/sos" className="px-10 py-4 rounded-xl border-2 border-neon-red text-neon-red font-black text-xl hover:bg-neon-red/10 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,61,104,0.3)]">
               SEND S.O.S <AlertTriangle className="w-7 h-7 animate-pulse" />
             </Link>
          </div>
        </motion.div>

        {/* Features Floating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32 max-w-5xl">
          {[
            { title: 'Global AI Monitoring', desc: 'Satellite data analyzed by neural networks for early hazard detection.', icon: Activity, color: 'text-neon-blue' },
            { title: 'Predictive Heatmaps', desc: 'Proprietary risk assessment models with zone-specific threat levels.', icon: Map, color: 'text-neon-yellow' },
            { title: 'Authority Link', desc: 'Direct encrypted integration with local emergency response units.', icon: Users, color: 'text-neon-green' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.2 }}
              className="glass-dark p-10 rounded-[40px] border border-white/5 hover:border-neon-blue/20 transition-all group hover:-translate-y-2 text-left"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${item.color.split('-')[1]}/10 flex items-center justify-center mb-8 border border-${item.color.split('-')[1]}/20`}>
                <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-neon-blue transition-colors">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
