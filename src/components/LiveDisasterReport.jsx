import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, MapPin, AlertTriangle, Info, Clock, 
  User, CheckCircle, Shield, Camera, Link as LinkIcon
} from 'lucide-react';

const LiveDisasterReport = ({ onReportSubmit }) => {
  const [formData, setFormData] = useState({
    reporterName: '',
    disasterType: 'Fire',
    location: '',
    severity: 'Medium',
    description: '',
    phone: '',
    timestamp: new Date().toISOString()
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const report = {
      ...formData,
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
      locCoords: [18.5204, 73.8567] // Default Pune coords for simulation
    };
    onReportSubmit(report);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-emerald-100 max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-200">
           <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Report Transmitted</h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-10">
          Your field report has been logged and sent to the nearest Response Node. 
          Emergency units are being notified.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
        >
          Submit Another Report
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
      
      {/* ── LEFT: INSTRUCTIONS ── */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
           <Shield className="w-12 h-12 text-red-500 mb-8" />
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Submission Protocol</h3>
           <p className="text-slate-400 text-sm font-medium leading-relaxed">
             Ensure your location is accurate. Upload images if possible to help units assess the hazard severity on approach.
           </p>
        </div>

        <div className="space-y-4">
           {['Secure your own safety first', 'Provide precise location clues', 'Identify number of affected persons'].map((step, i) => (
             <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{step}</span>
             </div>
           ))}
        </div>
      </div>

      {/* ── RIGHT: FORM ── */}
      <div className="lg:col-span-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-[44px] p-10 md:p-14 shadow-2xl border border-slate-100 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Reporter Name</label>
                 <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Sgt. John Doe"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-sm"
                      value={formData.reporterName}
                      onChange={e => setFormData({...formData, reporterName: e.target.value})}
                    />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contact Phone</label>
                 <input 
                   required
                   type="tel" 
                   placeholder="+91 XXXXX XXXXX"
                   className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-sm"
                   value={formData.phone}
                   onChange={e => setFormData({...formData, phone: e.target.value})}
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Disaster Type</label>
                 <select 
                   className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-sm appearance-none"
                   value={formData.disasterType}
                   onChange={e => setFormData({...formData, disasterType: e.target.value})}
                 >
                    <option>Fire</option>
                    <option>Flood</option>
                    <option>Earthquake</option>
                    <option>Storm</option>
                    <option>Medical Emergency</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Severity Level</label>
                 <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map(s => (
                      <button 
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, severity: s})}
                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.severity === s ? (s === 'High' ? 'bg-red-500 border-red-500 text-white' : s === 'Medium' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-emerald-500 border-emerald-500 text-white') : 'bg-white border-slate-100 text-slate-400'}`}
                      >
                         {s}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Location / Sector</label>
              <div className="relative">
                 <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   required
                   type="text" 
                   placeholder="Enter address or GPS coordinates"
                   className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-sm"
                   value={formData.location}
                   onChange={e => setFormData({...formData, location: e.target.value})}
                 />
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Incident Description</label>
              <textarea 
                required
                rows="4"
                placeholder="Describe what you see: flames, water level, trapped survivors..."
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-sm resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
           </div>

           <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-6 bg-red-600 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-sm hover:bg-red-700 transition-all shadow-2xl shadow-red-200 flex items-center justify-center gap-4 active:scale-[0.98]"
              >
                 <Send className="w-5 h-5" /> 
                 Broadcast Emergency Alert
              </button>
           </div>
        </form>
      </div>

    </div>
  );
};

export default LiveDisasterReport;
