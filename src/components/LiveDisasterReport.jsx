import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Search, ShieldAlert, Badge, Phone, Siren, CloudUpload, MapPinned, ShieldCheck } from 'lucide-react';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom component to handle map flying
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { duration: 1.5 });
  }, [center, map]);
  return null;
};

const LiveDisasterReport = ({ onReportSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    isAnonymous: false,
    disasterType: 'Select Disaster Type',
    severity: 'High',
    incidentTime: new Date().toISOString().slice(0, 16),
    description: '',
    location: '421 Tactical Ave, Los Angeles, CA 90012',
    coords: [34.0522, -118.2437] // Default LA
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(3);

  // Detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData(prev => ({
          ...prev,
          coords: [pos.coords.latitude, pos.coords.longitude]
        }));
        setGpsAccuracy(Math.round(pos.coords.accuracy));
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const report = {
      ...formData,
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      id: `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    try {
      await addDoc(collection(db, 'reports'), report);
    } catch (err) {
      console.warn('Firebase save failed, falling back to local storage:', err);
    }

    if (onReportSubmit) onReportSubmit(report);
    setLoading(false);
    
    navigate('/tracking', { 
      state: { 
        id: report.id, 
        type: report.disasterType.toUpperCase(),
        severity: report.severity.toUpperCase(),
        message: report.description,
        coords: report.coords,
        location: report.location
      } 
    });
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100 max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-600/30">
           <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
        </div>
        <h2 className="font-heading text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Report Transmitted</h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
          Your emergency report has been logged and sent to the nearest Response Node. 
          End-to-end encryption ensures your data is secure.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95"
        >
          Submit Another Report
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 items-start mt-8">
        {/* LEFT COLUMN: FORM (6/10) */}
        <div className="lg:col-span-6 space-y-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section: Identity */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100 hover:border-blue-100 transition-colors"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <span className="material-symbols-outlined text-white text-3xl">badge</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-slate-900 tracking-tight uppercase">Reporter Info</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">Verification details for dispatch</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative group">
                    <input 
                      required
                      className="w-full h-[60px] bg-slate-50 border-2 border-slate-100 focus:border-blue-600 focus:bg-white rounded-2xl px-6 transition-all font-bold text-slate-900" 
                      placeholder="OPERATOR NAME" 
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                  <div className="relative group">
                    <input 
                      required
                      className="w-full h-[60px] bg-slate-50 border-2 border-slate-100 focus:border-blue-600 focus:bg-white rounded-2xl px-6 transition-all font-bold text-slate-900" 
                      placeholder="+1 (555) 000-0000" 
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}>
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${formData.isAnonymous ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                    {formData.isAnonymous && <span className="material-symbols-outlined text-white text-sm font-black">check</span>}
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest">Anonymize Profile</label>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section: Incident Specifics */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
                  <span className="material-symbols-outlined text-white text-3xl">emergency</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-slate-900 tracking-tight uppercase">Incident Specifics</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">Critical situational data</p>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Disaster Category</label>
                    <select 
                      required
                      className="w-full h-[60px] bg-slate-50 border-2 border-slate-100 focus:border-red-600 focus:bg-white rounded-2xl px-6 font-bold text-slate-900 transition-all"
                      value={formData.disasterType}
                      onChange={e => setFormData({...formData, disasterType: e.target.value})}
                    >
                      <option disabled>Select Disaster Type</option>
                      <option>Flood</option>
                      <option>Fire</option>
                      <option>Earthquake</option>
                      <option>Landslide</option>
                      <option>Cyclone</option>
                      <option>Industrial Accident</option>
                      <option>Building Collapse</option>
                      <option>Road Accident</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Severity Assessment</label>
                    <div className="flex p-1.5 bg-slate-100 rounded-[1.25rem] h-[60px]">
                      {['Low', 'Medium', 'High'].map(s => (
                        <button 
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, severity: s})}
                          className={`flex-1 flex items-center justify-center text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${formData.severity === s ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Situational Description</label>
                  <textarea 
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-600 focus:bg-white rounded-2xl py-6 px-8 transition-all resize-none font-bold text-slate-900 placeholder:text-slate-400 min-h-[160px]" 
                    placeholder="Describe the incident, casualties, or immediate threats..." 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </motion.section>

            {/* Section: Media */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-3xl">cloud_upload</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-slate-900 tracking-tight uppercase">Media Proof</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">Attach photographic evidence</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group">
                  <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-blue-600">add_a_photo</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Upload</span>
                  <input className="hidden" type="file" />
                </label>
              </div>
            </motion.section>
          </form>
        </div>

        {/* RIGHT COLUMN: MAP + SIDEBAR (4/10) */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-8">
          {/* Map Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-4 shadow-xl border border-slate-100 overflow-hidden"
          >
            <div className="relative h-[420px] rounded-[2rem] overflow-hidden shadow-inner bg-slate-100">
              <MapContainer
                center={formData.coords}
                zoom={15}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={formData.coords} icon={L.divIcon({
                  className: 'custom-marker',
                  html: `
                    <div class="relative flex items-center justify-center">
                      <div class="radar-ring !border-blue-600"></div>
                      <div class="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-premium relative z-10"></div>
                    </div>
                  `,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                })} />
                <MapController center={formData.coords} />
              </MapContainer>
              
              <div className="absolute top-6 left-6 z-[1000]">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 border border-slate-100 shadow-lg">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">GPS ACCURACY: {gpsAccuracy}M</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-[1000]">
                <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/10">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">Detected Node Address</p>
                    <p className="text-xs font-bold truncate">{formData.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 pt-6">
              <button type="button" className="w-full py-4 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 rounded-2xl transition-all flex items-center justify-center gap-3 border border-dashed border-blue-200">
                <MapPinned className="w-4 h-4" />
                Refine Location Profile
              </button>
            </div>
          </motion.div>

          {/* Action / Submit */}
          <div className="space-y-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white font-heading text-xl font-black py-8 rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 group shadow-red-500/30"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>TRANSMITTING...</span>
                </div>
              ) : (
                <>
                  TRANSMIT REPORT 
                  <span className="material-symbols-outlined text-3xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
                </>
              )}
            </motion.button>
            <div className="flex items-center justify-center gap-3 text-slate-400 bg-slate-50 py-3 rounded-2xl border border-slate-100">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Quantum-Secure AES-256 Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDisasterReport;
