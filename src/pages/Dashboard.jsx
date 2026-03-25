import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Flame, Droplets, Wind, AlertCircle, BarChart, TrendingUp, PieChart, Info, Download, AlertTriangle } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart as ReBarChart, Bar, Cell
} from 'recharts';

const Dashboard = () => {
  const riskLevels = [
    { title: 'Flood Risk', level: 'HIGH', score: 85, color: 'text-neon-red', icon: Droplets, trend: '+12%' },
    { title: 'Wildfire Risk', level: 'MEDIUM', score: 42, color: 'text-neon-yellow', icon: Flame, trend: '-4%' },
    { title: 'Earthquake', level: 'LOW', score: 18, color: 'text-neon-green', icon: Activity, trend: 'STABLE' },
    { title: 'Cyclone Risk', level: 'LOW', score: 25, color: 'text-neon-green', icon: Wind, trend: '+2%' },
  ];

  const chartData = [
    { name: '00:00', flood: 40, risk: 24, temp: 24 },
    { name: '04:00', flood: 30, risk: 13, temp: 22 },
    { name: '08:00', flood: 20, risk: 98, temp: 26 },
    { name: '12:00', flood: 27, risk: 39, temp: 28 },
    { name: '16:00', flood: 18, risk: 48, temp: 30 },
    { name: '20:00', flood: 23, risk: 38, temp: 27 },
    { name: '24:00', flood: 34, risk: 43, temp: 25 },
  ];

  const distributionData = [
    { name: 'Urban', value: 45, color: '#50d7ff' },
    { name: 'Rural', value: 30, color: '#fbbf24' },
    { name: 'Coastal', value: 25, color: '#ff3d68' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter">AI <span className="text-neon-blue">Analytics</span> Dashboard</h2>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Real-time Predictive Modelling / Shield Intelligence Node-7</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-6 py-2.5 glass border border-white/5 rounded-2xl flex items-center gap-2 hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white">
              <Download className="w-4 h-4" />
              Intelligence Report
           </button>
           <button className="px-6 py-2.5 bg-neon-blue text-dark-900 rounded-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(80,215,255,0.4)] transition-all text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95">
              <Shield className="w-4 h-4" />
              Recalibrate AI
           </button>
        </div>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskLevels.map((risk, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-dark border border-white/5 p-8 rounded-[40px] shadow-2xl relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${risk.color.split('-')[1]}/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-blue/10 transition-colors`} />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
               <div className={`w-14 h-14 rounded-2xl ${risk.color.replace('text-', 'bg-')}/10 border border-${risk.color.split('-')[1]}/20 flex items-center justify-center`}>
                  <risk.icon className={`w-7 h-7 ${risk.color}`} />
               </div>
               <div className="text-right">
                  <span className={`text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-white/5 ${risk.level === 'HIGH' ? 'bg-neon-red/10 text-neon-red border-neon-red/30' : risk.level === 'MEDIUM' ? 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30' : 'bg-neon-green/10 text-neon-green border-neon-green/30'}`}>
                    {risk.level}
                  </span>
               </div>
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{risk.title}</h3>
            <div className="flex items-baseline gap-3 mb-6">
               <span className="text-4xl font-black">{risk.score}%</span>
               <span className={`text-[10px] font-black ${risk.trend.startsWith('+') ? 'text-neon-red' : 'text-neon-green'}`}>
                  {risk.trend} {risk.trend.startsWith('+') ? 'UP' : ''}
               </span>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${risk.score}%` }}
                 transition={{ duration: 1.5, delay: 0.5 }}
                 className={`h-full ${risk.color.replace('text-', 'bg-')}`}
               />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-dark border border-white/5 p-10 rounded-[48px] shadow-2xl min-h-[450px]">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter">Predictive Hazard Curve</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Next 24 Hours Probability</p>
               </div>
               <BarChart className="w-6 h-6 text-neon-blue opacity-50" />
            </div>
            
            <div className="h-[280px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#50d7ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#50d7ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#475569" 
                      fontSize={10} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={10} 
                      axisLine={false} 
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff1a', borderRadius: '16px', fontSize: '10px' }}
                      itemStyle={{ color: '#50d7ff', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="flood" stroke="#50d7ff" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="glass-dark border border-white/5 p-10 rounded-[48px] shadow-2xl flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter">Impact Distribution</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Satellite Area Analysis</p>
               </div>
               <PieChart className="w-6 h-6 text-neon-yellow opacity-50" />
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-around gap-10">
               <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="96" cy="96" r="80" fill="none" stroke="#1e293b" strokeWidth="20" />
                     <circle cx="96" cy="96" r="80" fill="none" stroke="#50d7ff" strokeWidth="20" strokeDasharray="502" strokeDashoffset="150" />
                     <circle cx="96" cy="96" r="80" fill="none" stroke="#ff3d68" strokeWidth="20" strokeDasharray="502" strokeDashoffset="400" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-4xl font-black">AI</span>
                     <span className="text-[10px] font-black text-slate-500 tracking-widest">ENABLED</span>
                  </div>
               </div>
               
               <div className="space-y-6 flex-1">
                  {distributionData.map((data, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center px-1">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400">{data.name}</span>
                          <span className="text-sm font-black">{data.value}%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${data.value}%`, backgroundColor: data.color }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="bg-neon-red/10 border border-neon-red/30 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-2xl">
         <div className="w-20 h-20 rounded-full bg-neon-red/20 flex items-center justify-center border-4 border-neon-red shrink-0">
            <AlertTriangle className="w-10 h-10 text-neon-red animate-pulse" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase tracking-tighter">AI Anomaly Detected</h4>
            <p className="text-slate-400 font-medium leading-relaxed mt-2 p-1">
              Atmospheric sensors near Satara Cluster have detected rapid pressure drops. 
              Flash flood probability has surged to 85.4% within the next 3 hours.
            </p>
         </div>
         <button className="px-10 py-4 bg-neon-red text-white font-black rounded-2xl shadow-[0_0_20px_rgba(255,61,104,0.4)] hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest shrink-0">
            Execute Alert
         </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
