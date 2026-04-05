import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, AlertTriangle, CheckCircle, Activity, 
  Shield, Bell, User, Filter, Search, MoreVertical, MapPin, 
  ExternalLink, RefreshCw, BarChart, TrendingUp, Check, X, Globe
} from 'lucide-react';
import { 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, 
  LineChart, Line
} from 'recharts';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

// Fetch stored reports helper
const getStoredReports = () => {
  try {
    return JSON.parse(localStorage.getItem('aegis_user_reports') || '[]');
  } catch {
    return [];
  }
};

const Admin = () => {
  const [sosEntries, setSosEntries] = useState([
    { id: 'SOS-9402', reporterName: 'Amit Sharma', location: 'Satara District', status: 'DISPATCHING', submittedAt: Date.now() - 120000, severity: 'CRITICAL', source: 'FIREBASE' },
    { id: 'SOS-9401', reporterName: 'Priya Patel', location: 'Bavdhan, Pune', status: 'IN_PROGRESS', submittedAt: Date.now() - 720000, severity: 'HIGH', source: 'FIREBASE' },
    { id: 'SOS-9398', reporterName: 'Rahul Varma', location: 'Karve Nagar', status: 'RESOLVED', submittedAt: Date.now() - 2700000, severity: 'MEDIUM', source: 'LOCAL' },
  ]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // 1. Listen for Real-time Firebase Alerts
    const q = query(collection(db, "alerts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fbAlerts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fbAlerts.push({
          id: data.id || doc.id,
          reporterName: data.user || 'System User',
          location: `${data.lat}, ${data.lng}`,
          status: data.status,
          submittedAt: data.timestamp?.toDate() ? data.timestamp.toDate().getTime() : Date.now(),
          severity: data.severity || 'HIGH',
          source: 'FIREBASE',
          message: data.message
        });
      });
      
      setSosEntries(prev => {
        const combined = [...fbAlerts, ...prev];
        return combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      });
    }, (error) => {
      console.warn("Firestore listener failed (using local fallback):", error);
    });

    // 2. Load Aegis Reports & Local Emergency Alerts
    setReports(getStoredReports());
    const handler = () => setReports(getStoredReports());
    window.addEventListener('aegis:new-report', handler);

    const loadLocal = () => {
      const local = JSON.parse(localStorage.getItem('emergency_alerts') || '[]');
      if (local.length > 0) {
        setSosEntries(prev => {
          const formattedLocal = local.map(a => ({
            id: a.id || `LOCAL-${Math.random()}`,
            reporterName: 'Local User',
            location: `${a.lat}, ${a.lng}`,
            status: a.status || 'PENDING',
            submittedAt: a.timestamp ? new Date(a.timestamp).getTime() : Date.now(),
            severity: a.severity || 'HIGH',
            source: 'LOCAL'
          }));
          const combined = [...formattedLocal, ...prev];
          return combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        });
      }
    };
    loadLocal();

    return () => {
      unsubscribe();
      window.removeEventListener('aegis:new-report', handler);
    };
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = reports.map(r => r.id === id ? { ...r, status: newStatus } : r);
    localStorage.setItem('aegis_user_reports', JSON.stringify(updated));
    setReports(updated);
    window.dispatchEvent(new CustomEvent('aegis:new-report', { detail: updated }));
  };

  const pendingCount = reports.filter(r => r.status === 'PENDING').length;
  const criticalCount = sosEntries.filter(e => e.severity === 'CRITICAL').length;

  const stats = [
    { title: 'Active Alerts', value: (pendingCount + criticalCount).toString(), color: 'text-neon-red', icon: Bell, trend: '+2' },
    { title: 'S.O.S Requests', value: '42', color: 'text-neon-yellow', icon: AlertTriangle, trend: 'NEW' },
    { title: 'Rescues Done', value: '1,280', color: 'text-neon-green', icon: CheckCircle, trend: '+45' },
    { title: 'Active Units', value: '89', color: 'text-neon-blue', icon: MapPin, trend: 'STABLE' },
  ];

  const chartData = [
    { name: 'Mon', requests: 400, rescues: 240 },
    { name: 'Tue', requests: 300, rescues: 139 },
    { name: 'Wed', requests: 200, rescues: 980 },
    { name: 'Thu', requests: 278, rescues: 390 },
    { name: 'Fri', requests: 189, rescues: 480 },
    { name: 'Sat', requests: 239, rescues: 380 },
    { name: 'Sun', requests: 349, rescues: 430 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter">Command <span className="text-neon-blue">HQ</span> Admin</h2>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Operational Command System / Incident Verification</p>
        </div>
        
        <div className="flex gap-4">
           <button onClick={() => setReports(getStoredReports())} className="px-6 py-2.5 glass border border-white/5 rounded-2xl flex items-center gap-2 hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" /> Sync Data
           </button>
           <button className="px-6 py-2.5 bg-neon-blue text-dark-900 rounded-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(80,215,255,0.4)] transition-all text-xs font-black uppercase tracking-widest">
              <ExternalLink className="w-4 h-4" /> Live Deployment Map
           </button>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-dark border border-white/5 p-8 rounded-[40px] shadow-2xl group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-10">
               <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color} group-hover:scale-110 transition-transform`} />
               </div>
               <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/5 ${stat.color}`}>
                  {stat.trend}
               </span>
            </div>
            <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.title}</p>
               <h3 className="text-4xl font-black group-hover:text-neon-blue transition-colors">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* SOS Table */}
         <div className="lg:col-span-2 glass-dark border border-white/5 rounded-[50px] shadow-2xl p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-10">
               <h4 className="text-2xl font-black uppercase tracking-tighter">Emergency Queue</h4>
               <div className="flex gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl flex items-center px-4 py-2 w-64">
                     <Search className="w-4 h-4 text-slate-500 mr-3" />
                     <input type="text" placeholder="Search..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none w-full text-white" />
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-white/5">
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Node</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Reporter</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Location</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Severity</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {[...sosEntries, ...reports].sort((a,b) => b.submittedAt - a.submittedAt).slice(0, 10).map((entry, idx) => (
                       <tr key={idx} className="group hover:bg-white/5 transition-all">
                          <td className="py-6 font-mono text-neon-blue font-bold text-[10px] tracking-widest">{entry.id.substring(0,8)}</td>
                          <td className="py-6">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">
                                   {entry.reporterName?.substring(0,2).toUpperCase()}
                                </div>
                                <div>
                                   <p className="text-sm font-black text-white">{entry.reporterName}</p>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(entry.submittedAt).toLocaleTimeString()}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-6 text-sm font-medium text-slate-400 max-w-[150px] truncate">{entry.location}</td>
                          <td className="py-6">
                             <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                               entry.severity === 'CRITICAL' || entry.severity === 'High' ? 'bg-neon-red/10 text-neon-red' : 
                               entry.severity === 'HIGH' || entry.severity === 'Medium' ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-neon-green/10 text-neon-green'
                             }`}>
                                {entry.severity}
                             </span>
                          </td>
                          <td className="py-6 text-right">
                             {entry.source === 'FIREBASE' ? (
                               <span className="text-[10px] font-black text-neon-blue uppercase">{entry.status}</span>
                             ) : (
                               <div className="flex items-center justify-end gap-2">
                                  {entry.status === 'PENDING' || !entry.status ? (
                                    <>
                                       <button onClick={() => handleUpdateStatus(entry.id, 'APPROVED')} className="p-2 bg-neon-green/10 text-neon-green hover:bg-neon-green/20 rounded-xl transition-all">
                                          <Check className="w-4 h-4" />
                                       </button>
                                       <button onClick={() => handleUpdateStatus(entry.id, 'REJECTED')} className="p-2 bg-neon-red/10 text-neon-red hover:bg-neon-red/20 rounded-xl transition-all">
                                          <X className="w-4 h-4" />
                                       </button>
                                    </>
                                  ) : (
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${entry.status === 'APPROVED' ? 'text-neon-green' : 'text-slate-500'}`}>{entry.status}</span>
                                  )}
                               </div>
                             )}
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Stats Graph */}
         <div className="glass-dark border border-white/5 rounded-[50px] shadow-2xl p-10 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Response Efficiency</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Global Rescue Velocity</p>
               </div>
               <Activity className="w-6 h-6 text-neon-green opacity-50" />
            </div>

            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff1a', borderRadius: '16px', fontSize: '10px' }} itemStyle={{ color: '#50d7ff', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="rescues" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="requests" stroke="#fbbf24" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default Admin;
