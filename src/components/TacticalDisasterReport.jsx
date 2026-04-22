import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, User, ShieldCheck, AlertTriangle, Info, Camera, Mic, 
  Upload, ChevronRight, ChevronLeft, Send, CheckCircle2, 
  Activity, Zap, Crosshair, EyeOff, Map as MapIcon, Layers, Lock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/tactical-ui.css';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TacticalDisasterReport = ({ onReportSubmit }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Reporter Info
    fullName: '',
    phone: '',
    email: '',
    role: 'Civilian',
    isAtLocation: true,
    isAnonymous: false,
    
    // Step 2: Incident Details
    disasterType: 'Fire',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    severity: 'Medium',
    peopleAffected: 0,
    injuryLevel: 'None',
    damage: {
      buildings: false,
      roads: false,
      power: false,
      communication: false
    },
    toggles: {
      isSpreading: false,
      peopleTrapped: false,
      immediateDanger: false
    },
    
    // Step 3: Description & Evidence
    description: '',
    evidence: [],
    
    // Map Info
    location: '421 Tactical Ave, Los Angeles, CA 90012',
    coords: [34.0522, -118.2437],
    accuracy: 3
  });

  // Calculate severity logic
  const getSeverityBadge = () => {
    let score = 0;
    if (formData.severity === 'High') score += 5;
    if (formData.toggles.immediateDanger) score += 5;
    if (formData.toggles.peopleTrapped) score += 5;
    if (formData.peopleAffected > 10) score += 3;
    
    if (score >= 10) return { label: 'CRITICAL RISK DETECTED', color: 'var(--neon-red)', icon: AlertTriangle };
    if (score >= 5) return { label: 'HIGH RISK DETECTED', color: '#ff8c00', icon: Activity };
    return { label: 'ELEVATED MONITORING', color: 'var(--neon-blue)', icon: ShieldCheck };
  };

  const badge = getSeverityBadge();

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowConfirmation(true);
    if (onReportSubmit) onReportSubmit(formData);
  };

  // Map Controller
  const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) map.flyTo(center, 15);
    }, [center, map]);
    return null;
  };

  const steps = [
    { title: 'Reporter', icon: User },
    { title: 'Incident', icon: Activity },
    { title: 'Evidence', icon: Camera },
    { title: 'Transmit', icon: Send }
  ];

  return (
    <div className="tactical-container h-screen overflow-hidden flex flex-col">
      {/* Top Header & Progress - Fixed */}
      <div className="w-full px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase">Neural Response Protocol v4.0</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tighter text-white uppercase italic">
              Emergency <span className="text-neon-blue">Transmission</span>
            </h1>
          </div>
          
          <div className="flex gap-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded shadow-lg flex items-center justify-center border transition-all ${step > i ? 'bg-neon-blue border-neon-blue text-black' : step === i + 1 ? 'border-neon-blue text-neon-blue' : 'border-white/10 text-white/30'}`}>
                  <s.icon size={14} />
                </div>
                <div className="hidden md:block">
                  <p className={`text-[8px] font-black uppercase tracking-widest ${step === i + 1 ? 'text-neon-blue' : 'text-white/30'}`}>{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="progress-container h-1">
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
      </div>

      {/* Main Content Area - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Section - Scrollable */}
        <div className="flex-1 lg:flex-[0_0_58%] overflow-y-auto custom-scrollbar bg-black/20 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="tactical-card p-8">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <User className="text-neon-blue" size={32} />
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white">Reporter Identity</h2>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Authentication & Verification Details</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="tactical-label">Full Designation/Name</label>
                        <input 
                          type="text" 
                          placeholder="ENTER LEGAL NAME"
                          className="tactical-input"
                          value={formData.fullName}
                          onChange={e => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="tactical-label">Contact Frequency (Phone)</label>
                        <input 
                          type="tel" 
                          placeholder="+X XXX-XXX-XXXX"
                          className="tactical-input"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="tactical-label">Secure Data Channel (Email)</label>
                      <input 
                        type="email" 
                        placeholder="OPERATOR@SECURE.GOV"
                        className="tactical-input"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Civilian', 'Volunteer', 'Authority'].map((role) => (
                        <button
                          key={role}
                          onClick={() => setFormData({...formData, role})}
                          className={`py-3 border text-[9px] font-black uppercase tracking-widest transition-all ${formData.role === role ? 'bg-neon-blue text-black border-neon-blue' : 'bg-transparent text-white/30 border-white/10 hover:border-white/20'}`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="text-neon-blue" size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">I am at the incident location</span>
                        </div>
                        <label className="tactical-toggle scale-90">
                          <input 
                            type="checkbox" 
                            checked={formData.isAtLocation}
                            onChange={e => setFormData({...formData, isAtLocation: e.target.checked})}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <EyeOff className="text-white/30" size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Report Anonymously</span>
                        </div>
                        <label className="tactical-toggle scale-90">
                          <input 
                            type="checkbox" 
                            checked={formData.isAnonymous}
                            onChange={e => setFormData({...formData, isAnonymous: e.target.checked})}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <Activity className="text-neon-red" size={32} />
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white">Incident Logistics</h2>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Situational Assessment & Data Points</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="tactical-label">Disaster Type</label>
                        <select 
                          className="tactical-input appearance-none bg-slate-900 pr-10"
                          value={formData.disasterType}
                          onChange={e => setFormData({...formData, disasterType: e.target.value})}
                        >
                          {['Fire', 'Flood', 'Earthquake', 'Landslide', 'Industrial', 'Medical'].map(v => (
                            <option key={v} value={v}>{v.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                         <div className="flex-1">
                          <label className="tactical-label">Date</label>
                          <input type="date" className="tactical-input" value={formData.incidentDate} onChange={e => setFormData({...formData, incidentDate: e.target.value})} />
                         </div>
                         <div className="flex-1">
                          <label className="tactical-label">Time</label>
                          <input type="time" className="tactical-input" value={formData.incidentTime} onChange={e => setFormData({...formData, incidentTime: e.target.value})} />
                         </div>
                      </div>
                    </div>

                    <div>
                      <label className="tactical-label">Initial Severity Assessment</label>
                      <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                        {['Low', 'Medium', 'High'].map(s => (
                          <button
                            key={s}
                            onClick={() => setFormData({...formData, severity: s})}
                            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all rounded ${formData.severity === s ? 'bg-neon-red text-white shadow-[0_0_15px_rgba(255,0,60,0.3)]' : 'bg-transparent text-white/30 hover:bg-white/5'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="tactical-label">Approx. People Affected</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="tactical-input pl-10"
                            value={formData.peopleAffected}
                            onChange={e => setFormData({...formData, peopleAffected: Number(e.target.value)})}
                          />
                          <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        </div>
                      </div>
                      <div>
                        <label className="tactical-label">Injury Level</label>
                        <select 
                          className="tactical-input bg-slate-900"
                          value={formData.injuryLevel}
                          onChange={e => setFormData({...formData, injuryLevel: e.target.value})}
                        >
                          {['None', 'Minor', 'Severe', 'Fatal'].map(v => (
                            <option key={v} value={v}>{v.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {Object.keys(formData.damage).map((k) => (
                        <button
                          key={k}
                          onClick={() => setFormData({
                            ...formData, 
                            damage: {...formData.damage, [k]: !formData.damage[k]}
                          })}
                          className={`p-3 border text-[7px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-2 ${formData.damage[k] ? 'border-neon-blue bg-neon-blue/10 text-neon-blue' : 'border-white/5 text-white/30 hover:border-white/10'}`}
                        >
                          <div className={`w-2.5 h-2.5 border ${formData.damage[k] ? 'bg-neon-blue border-neon-blue' : 'border-white/20'}`}></div>
                          {k.replace(/([A-Z])/g, ' $1')}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/5">
                      {Object.keys(formData.toggles).map((k) => (
                        <div key={k} className="flex items-center justify-between bg-white/5 p-3 rounded border border-white/5">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">{k.replace(/([A-Z])/g, ' $1')}</span>
                          <label className="tactical-toggle scale-75 origin-right">
                            <input 
                              type="checkbox" 
                              checked={formData.toggles[k]}
                              onChange={e => setFormData({
                                ...formData, 
                                toggles: {...formData.toggles, [k]: e.target.checked}
                              })}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <Camera className="text-neon-blue" size={32} />
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white">Visual & Audio Intel</h2>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Ground-Level Evidence Acquisition</p>
                      </div>
                    </div>

                    <div>
                      <label className="tactical-label">Situational Description</label>
                      <textarea 
                        className="tactical-input min-h-[160px] resize-none"
                        placeholder="Describe what is happening, risks, and current conditions. Mention any unique factors that might help response teams..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2 border-2 border-dashed border-white/10 rounded-lg p-10 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
                        <Upload className="text-neon-blue group-hover:scale-110 transition-transform" size={40} />
                        <div className="text-center">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white">Transmit Files</p>
                          <p className="text-[8px] uppercase tracking-widest text-white/30 mt-2">Images, Videos, or logs (Max 50MB)</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button className="w-full bg-white/5 border border-white/5 hover:border-neon-blue/40 py-6 flex flex-col items-center justify-center gap-2 group transition-all">
                          <Camera className="text-white/20 group-hover:text-neon-blue" size={24} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60">Active Camera</span>
                        </button>
                        <button className="w-full bg-white/5 border border-white/5 hover:border-neon-blue/40 py-6 flex flex-col items-center justify-center gap-2 group transition-all">
                          <Mic className="text-white/20 group-hover:text-neon-blue" size={24} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60">Voice Log</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <ShieldCheck className="text-neon-blue" size={32} />
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white">Final Review</h2>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Verify Secure Packet Before Transmission</p>
                      </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-lg border border-white/5 space-y-8">
                      <div className="grid grid-cols-2 gap-y-6">
                        <div>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Reporter</p>
                          <p className="text-xs font-bold text-white uppercase">{formData.fullName || 'ANONYMOUS OPERATOR'}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Incident Category</p>
                          <p className="text-xs font-bold text-neon-blue uppercase">{formData.disasterType}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Severity Level</p>
                          <p className="text-xs font-bold text-neon-red uppercase">{formData.severity}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Est. Impact</p>
                          <p className="text-xs font-bold text-white uppercase">{formData.peopleAffected} PERS.</p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5">
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-3">Detailed Log</p>
                        <p className="text-xs font-medium text-white/60 italic leading-relaxed">
                          "{formData.description || 'No situational logs provided.'}"
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-neon-red/10 border border-neon-red/20 rounded-lg flex items-center gap-4">
                      <AlertTriangle className="text-neon-red shrink-0" size={24} />
                      <p className="text-[9px] font-black uppercase tracking-widest text-neon-red/70 leading-relaxed">
                        WARNING: Intentional false reporting is a felony under Response Act Section 14. 
                        Your IP and GPS coordinates are logged and verified via multi-point triangulation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/5">
                  <button 
                    onClick={handleBack} 
                    disabled={step === 1}
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${step === 1 ? 'opacity-0' : 'text-white/40 hover:text-white'}`}
                  >
                    <ChevronLeft size={16} /> Previous Node
                  </button>
                  
                  {step < 4 ? (
                    <button 
                      onClick={handleNext} 
                      className="btn-tactical flex items-center gap-3 px-8 text-[11px]"
                    >
                      Next Component <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="btn-tactical btn-tactical-red flex items-center gap-4 px-12 py-5 text-[11px]"
                    >
                      {isSubmitting ? (
                        <>ENCRYPTING...</>
                      ) : (
                        <>
                          TRANSMIT REPORT <Send size={20} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Footer text */}
              <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                <span>AES-256 GCM</span>
                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                <span>SECURE OPS</span>
                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                <span>NODAL SYNC: OK</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interaction & Tools - Static/Fixed height */}
        <div className="hidden lg:flex lg:flex-[0_0_42%] flex-col border-l border-white/5">
          {/* Smart Assistant Card */}
          <div className="p-8 border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-neon-blue" size={18} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Sentinel AI Intelligence</h3>
            </div>
            
            <div className={`p-5 border-l-4 bg-white/5 rounded-r shadow-2xl transition-all duration-500`} style={{ borderColor: badge.color }}>
              <div className="flex items-center gap-3 mb-3">
                <badge.icon size={16} style={{ color: badge.color }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: badge.color }}>{badge.label}</span>
              </div>
              <p className="text-[9px] text-white/60 uppercase leading-relaxed font-bold tracking-wider">
                {step === 1 && "Authentication in progress. Trust score is currently neutral. Complete designation to unlock priority routing."}
                {step === 2 && "Active situation detected. Logged coordinates being synced with nearest rapid response teams."}
                {step === 3 && "Media packets will be routed via secure star-link channels to avoid local network congestion."}
                {step === 4 && "Packet structure verified. Ready for end-to-end encrypted distribution to global incident nodes."}
              </p>
            </div>
          </div>

          {/* Interactive Map Card - Fills remaining space */}
          <div className="flex-1 relative grey-map">
             <MapContainer
              center={formData.coords}
              zoom={14}
              zoomControl={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              <Marker position={formData.coords} icon={L.divIcon({
                className: 'tactical-marker',
                html: `<div class="relative flex items-center justify-center">
                  <div class="absolute w-16 h-16 rounded-full border border-neon-blue animate-ping opacity-30"></div>
                  <div class="absolute w-8 h-8 rounded-full border border-neon-blue/50 animate-pulse opacity-50"></div>
                  <div class="w-4 h-4 bg-neon-blue rounded shadow-[0_0_15px_#00f2ff] relative z-10"></div>
                </div>`,
                iconSize: [64, 64]
              })} />
              <Circle center={formData.coords} radius={800} pathOptions={{ color: 'var(--neon-blue)', weight: 1, fillColor: 'var(--neon-blue)', fillOpacity: 0.05 }} />
              <MapController center={formData.coords} />
            </MapContainer>

            {/* Map Overlays */}
            <div className="absolute top-6 left-6 z-[1000] space-y-4">
              <div className="bg-black/80 backdrop-blur-xl p-4 border border-neon-blue/30 rounded flex items-center gap-4 shadow-2xl">
                <div className="p-2 bg-neon-blue/10 rounded">
                  <Crosshair className="text-neon-blue" size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Target Grid</p>
                  <p className="text-[11px] font-bold text-white tracking-[0.2em]">{formData.coords[0].toFixed(4)}°N / {formData.coords[1].toFixed(4)}°W</p>
                </div>
              </div>
              
              <div className="bg-black/80 backdrop-blur-xl p-4 border border-white/5 rounded flex items-center gap-4 shadow-2xl">
                <div className="p-2 bg-white/5 rounded">
                  <ShieldCheck className="text-green-500" size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">GPS Connectivity</p>
                  <p className="text-[11px] font-bold text-green-500 tracking-widest uppercase">High Precision</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-[1000]">
              <div className="bg-black/90 backdrop-blur-xl p-6 border border-white/10 rounded-xl space-y-5 shadow-2xl max-w-md">
                <div className="flex items-center gap-4">
                  <MapIcon className="text-neon-blue" size={24} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Extraction Point / Incident Base</p>
                    <p className="text-xs font-bold text-white truncate uppercase tracking-widest">{formData.location}</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-neon-blue/10 border border-neon-blue/40 text-neon-blue text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neon-blue hover:text-black transition-all shadow-lg active:scale-95">
                  Synchronize Local GPS Node
                </button>
              </div>
            </div>

            {/* Map UI Toggles */}
            <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
               <button title="Toggle Layers" className="p-3 bg-black/80 border border-white/10 text-white/60 rounded-lg hover:border-neon-blue/50 hover:text-neon-blue transition-all backdrop-blur-xl">
                <Layers size={20} />
               </button>
               <button title="Recenter" className="p-3 bg-black/80 border border-white/10 text-white/60 rounded-lg hover:border-neon-blue/50 hover:text-neon-blue transition-all backdrop-blur-xl">
                <Crosshair size={20} />
               </button>
               <button title="Lock View" className="p-3 bg-black/80 border border-white/10 text-white/60 rounded-lg hover:border-neon-blue/50 hover:text-neon-blue transition-all backdrop-blur-xl">
                <Lock size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transmission Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="tactical-card p-12 max-w-xl text-center danger"
            >
              <div className="w-24 h-24 rounded-full border-4 border-neon-blue flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                <CheckCircle2 className="text-neon-blue" size={48} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Transmission <span className="text-neon-blue">Confirmed</span></h2>
              <p className="text-white/50 text-sm uppercase tracking-widest font-bold leading-relaxed mb-10">
                Your tactical report packet has been encrypted and distributed to the nearest 4 emergency response nodes. 
                Unit deployment initiated.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-white/5 border border-white/10 text-left">
                  <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Packet Hash</p>
                  <p className="text-[10px] font-mono text-neon-blue truncate">0x9F2E...A4B2</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 text-left">
                  <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">DEPLOYED</p>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = '/tracking'}
                className="btn-tactical w-full"
              >
                Enter Command Hub
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default TacticalDisasterReport;
