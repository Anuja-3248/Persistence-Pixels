import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Upload, Send, CheckCircle2, Loader2, X,
  Camera, AlertTriangle, Navigation, Clock, User,
  ChevronDown, Zap, FileText, Radio, Shield,
  Flame, Droplets, Wind, Mountain, Globe2, HelpCircle,
  Phone, Info, Activity, Star, ArrowRight
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   DATA CONSTANTS
─────────────────────────────────────────────────────────────── */
const DISASTER_TYPES = [
  { value: 'Flood',      emoji: '🌊', Icon: Droplets, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', label: 'Flood',      desc: 'Rising water levels' },
  { value: 'Earthquake', emoji: '🌍', Icon: Globe2,   color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'Earthquake', desc: 'Seismic activity' },
  { value: 'Fire',       emoji: '🔥', Icon: Flame,    color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'Fire',       desc: 'Active wildfire / blaze' },
  { value: 'Cyclone',    emoji: '🌀', Icon: Wind,     color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', label: 'Cyclone',    desc: 'Tropical storm system' },
  { value: 'Landslide',  emoji: '⛰️', Icon: Mountain, color: '#b45309', bg: '#fffbeb', border: '#fde68a', label: 'Landslide',  desc: 'Soil / rock movement' },
  { value: 'Other',      emoji: '⚠️', Icon: HelpCircle, color: '#475569', bg: '#f8fafc', border: '#e2e8f0', label: 'Other',   desc: 'Unclassified incident' },
];

const SEVERITY_LEVELS = [
  {
    level: 'Low',
    color: '#059669', bg: '#ecfdf5', border: '#6ee7b7', ring: '#10b981',
    gradient: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
    desc: 'Manageable. No immediate life threat.',
    icon: '🟢', bars: 1,
  },
  {
    level: 'Medium',
    color: '#d97706', bg: '#fffbeb', border: '#fcd34d', ring: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    desc: 'Requires attention. Possible injuries.',
    icon: '🟡', bars: 2,
  },
  {
    level: 'High',
    color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', ring: '#ef4444',
    gradient: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
    desc: 'Immediate response needed. Life at risk.',
    icon: '🔴', bars: 3,
  },
];

/* ──────────────────────────────────────────────────────────────
   SMALL REUSABLE SUB-COMPONENTS
─────────────────────────────────────────────────────────────── */
const FieldLabel = ({ icon: Icon, label, required, hint }) => (
  <div className="flex items-center justify-between mb-2">
    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
      {Icon && <Icon className="w-3 h-3" />}
      {label}
      {required && <span className="text-red-400 text-xs">*</span>}
    </label>
    {hint && <span className="text-[10px] text-slate-300 font-medium">{hint}</span>}
  </div>
);

const inputBase =
  'w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';
const inputError = 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100';

const ErrorMsg = ({ msg }) =>
  msg ? (
    <p className="mt-1.5 text-[10px] font-black text-red-500 uppercase tracking-wide flex items-center gap-1">
      <AlertTriangle className="w-3 h-3" /> {msg}
    </p>
  ) : null;

/* ──────────────────────────────────────────────────────────────
   SEVERITY BAR INDICATOR
─────────────────────────────────────────────────────────────── */
const SeverityBars = ({ count, color }) => (
  <div className="flex gap-0.5 items-end h-4">
    {[1, 2, 3].map(n => (
      <motion.div
        key={n}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: n <= count ? 1 : 0.25 }}
        transition={{ duration: 0.3, delay: n * 0.05 }}
        style={{
          backgroundColor: n <= count ? color : '#e2e8f0',
          height: `${33 * n}%`,
          transformOrigin: 'bottom',
        }}
        className="w-1.5 rounded-full"
      />
    ))}
  </div>
);

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
─────────────────────────────────────────────────────────────── */
const LiveDisasterReport = ({ onReportSubmit }) => {
  const fileRef = useRef();
  const dropRef = useRef();

  const blankForm = () => ({
    reporterName: '',
    location: '',
    locCoords: null,
    disasterType: '',
    severity: '',
    description: '',
    dateTime: new Date().toISOString().slice(0, 16),
    image: null,
    imagePreview: null,
  });

  const [form, setForm] = useState(blankForm());
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatus, setGpsStatus] = useState(null); // null | 'success' | 'denied'
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [typeOpen, setTypeOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'recent'

  /* Auto-tick datetime */
  useEffect(() => {
    const t = setInterval(() => {
      if (!submitting && !success)
        setForm(p => ({ ...p, dateTime: new Date().toISOString().slice(0, 16) }));
    }, 60000);
    return () => clearInterval(t);
  }, [submitting, success]);

  /* GPS */
  const handleGPS = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    setGpsStatus(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        setForm(p => ({ ...p, locCoords: [lat, lng] }));
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const d = await r.json();
          setForm(p => ({ ...p, location: d.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}` }));
        } catch {
          setForm(p => ({ ...p, location: `${lat.toFixed(5)}, ${lng.toFixed(5)}` }));
        }
        setGpsStatus('success');
        setGpsLoading(false);
      },
      () => { setGpsStatus('denied'); setGpsLoading(false); }
    );
  };

  /* Image helpers */
  const loadImage = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(p => ({ ...p, image: file, imagePreview: ev.target.result }));
    reader.readAsDataURL(file);
  }, []);

  const handleImage = e => loadImage(e.target.files[0]);

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    loadImage(e.dataTransfer.files[0]);
  };

  /* Validate */
  const validate = () => {
    const e = {};
    if (!form.reporterName.trim()) e.reporterName = 'Name required';
    if (!form.location.trim())    e.location = 'Location required';
    if (!form.disasterType)       e.disasterType = 'Select type';
    if (!form.severity)           e.severity = 'Select severity';
    if (!form.description.trim()) e.description = 'Description required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  /* Submit */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));

    const report = {
      id: `rpt-${Date.now()}`,
      reporterName: form.reporterName,
      location: form.location,
      locCoords: form.locCoords,
      disasterType: form.disasterType,
      severity: form.severity,
      description: form.description,
      dateTime: form.dateTime,
      imagePreview: form.imagePreview,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };

    onReportSubmit?.(report);
    setRecentReports(prev => [report, ...prev].slice(0, 5));
    setSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setForm(blankForm());
      setGpsStatus(null);
      setErrors({});
    }, 4500);
  };

  const selectedType     = DISASTER_TYPES.find(d => d.value === form.disasterType);
  const selectedSeverity = SEVERITY_LEVELS.find(s => s.level === form.severity);

  /* ─── RENDER ─── */
  return (
    <section className="max-w-[1700px] mx-auto">

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg shadow-red-200">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
              Live Disaster Reporting
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Submit real-time field incident reports
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {recentReports.length > 0 && (
            <div className="flex gap-1">
              {['form', 'recent'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'form' ? 'New Report' : `Recent (${recentReports.length})`}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live</span>
          </div>
        </div>
      </div>

      {/* ── TAB: RECENT REPORTS ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'recent' && recentReports.length > 0 ? (
          <motion.div
            key="recent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {recentReports.map((r, i) => {
              const dt = DISASTER_TYPES.find(d => d.value === r.disasterType);
              const sv = SEVERITY_LEVELS.find(s => s.level === r.severity);
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4 hover:shadow-lg hover:border-slate-200 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                      style={{ background: dt?.bg, color: dt?.color, border: `1px solid ${dt?.border}` }}
                    >
                      <span>{dt?.emoji}</span> {r.disasterType}
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                      style={{ background: sv?.bg, color: sv?.color, border: `1px solid ${sv?.border}` }}
                    >
                      {r.severity}
                    </div>
                  </div>
                  {r.imagePreview && (
                    <img src={r.imagePreview} alt="report" className="w-full h-28 object-cover rounded-2xl border border-slate-100" />
                  )}
                  <div>
                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate">{r.reporterName}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> {r.location || 'Location not specified'}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">{r.description}</p>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(r.submittedAt).toLocaleString()}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (

          /* ── TAB: FORM ── */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8"
          >

            {/* ══════════ MAIN FORM CARD ══════════ */}
            <div className="xl:col-span-8">
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden relative">

                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #f43f5e, #f97316, #fbbf24, #34d399, #60a5fa, #a78bfa)' }}
                />

                <AnimatePresence mode="wait">
                  {success ? (
                    /* ── SUCCESS ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      className="flex flex-col items-center justify-center py-24 px-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                        className="relative mb-8"
                      >
                        <div className="w-28 h-28 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                          <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.4, 1] }}
                          transition={{ delay: 0.35, duration: 0.5 }}
                          className="absolute inset-0 rounded-full border-2 border-emerald-300 opacity-40"
                        />
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <h3 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">Report Submitted</h3>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest max-w-sm mx-auto">
                          Your incident report has been logged and forwarded to emergency response teams.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 grid grid-cols-3 gap-4 w-full max-w-sm"
                      >
                        {[
                          { label: 'Logged', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                          { label: 'Forwarded', icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-50' },
                          { label: 'Active', icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
                        ].map(({ label, icon: Icon, color, bg }) => (
                          <div key={label} className={`flex flex-col items-center gap-2 p-4 ${bg} rounded-2xl`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</span>
                          </div>
                        ))}
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => {
                          setSuccess(false);
                          setForm(blankForm());
                          setGpsStatus(null);
                          setErrors({});
                          setActiveTab('recent');
                        }}
                        className="mt-8 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all"
                      >
                        <Star className="w-3.5 h-3.5" /> View My Reports
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* ── FORM ── */
                    <motion.form
                      key="form-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="p-8 md:p-10 space-y-7"
                    >

                      {/* ROW 1 — Reporter Name + DateTime */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Reporter Name */}
                        <div>
                          <FieldLabel icon={User} label="Reporter Name" required />
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={form.reporterName}
                            onChange={e => {
                              setForm(p => ({ ...p, reporterName: e.target.value }));
                              if (errors.reporterName) setErrors(p => ({ ...p, reporterName: '' }));
                            }}
                            className={`${inputBase} ${errors.reporterName ? inputError : ''}`}
                          />
                          <ErrorMsg msg={errors.reporterName} />
                        </div>

                        {/* Date & Time */}
                        <div>
                          <FieldLabel icon={Clock} label="Date & Time" hint="Auto-updated" />
                          <input
                            type="datetime-local"
                            value={form.dateTime}
                            onChange={e => setForm(p => ({ ...p, dateTime: e.target.value }))}
                            className={inputBase}
                          />
                        </div>
                      </div>

                      {/* ROW 2 — Location */}
                      <div>
                        <FieldLabel icon={MapPin} label="Incident Location" required />
                        <div className="flex flex-col sm:flex-row gap-3">
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={handleGPS}
                            disabled={gpsLoading}
                            className={`shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all ${
                              gpsStatus === 'success'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : gpsStatus === 'denied'
                                ? 'bg-red-50 border-red-300 text-red-600'
                                : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-700'
                            }`}
                          >
                            {gpsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> :
                             gpsStatus === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                             <Navigation className="w-4 h-4" />}
                            {gpsLoading ? 'Locating…' :
                             gpsStatus === 'success' ? 'GPS Located' :
                             gpsStatus === 'denied'  ? 'Access Denied' : 'Use GPS'}
                          </motion.button>
                          <input
                            type="text"
                            placeholder="Or type location manually…"
                            value={form.location}
                            onChange={e => {
                              setForm(p => ({ ...p, location: e.target.value }));
                              if (errors.location) setErrors(p => ({ ...p, location: '' }));
                            }}
                            className={`flex-1 ${inputBase} ${errors.location ? inputError : ''}`}
                          />
                        </div>
                        <ErrorMsg msg={errors.location} />
                      </div>

                      {/* ROW 3 — Disaster Type + Severity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Disaster Type */}
                        <div>
                          <FieldLabel icon={AlertTriangle} label="Type of Disaster" required />
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setTypeOpen(o => !o)}
                              className={`w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border ${
                                errors.disasterType ? 'border-red-300 bg-red-50' : 'border-slate-200'
                              } rounded-2xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-100 ${
                                selectedType ? '' : 'text-slate-300'
                              }`}
                              style={selectedType ? { color: selectedType.color, backgroundColor: selectedType.bg, borderColor: selectedType.border } : {}}
                            >
                              <span className="flex items-center gap-3">
                                {selectedType ? (
                                  <>
                                    <span className="text-lg">{selectedType.emoji}</span>
                                    <span className="font-black uppercase tracking-wide text-sm">{selectedType.value}</span>
                                  </>
                                ) : 'Select disaster type…'}
                              </span>
                              <ChevronDown className={`w-4 h-4 transition-transform text-slate-400 ${typeOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {typeOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-30 overflow-hidden"
                                >
                                  {DISASTER_TYPES.map(dt => (
                                    <button
                                      key={dt.value}
                                      type="button"
                                      onClick={() => {
                                        setForm(p => ({ ...p, disasterType: dt.value }));
                                        setErrors(p => ({ ...p, disasterType: '' }));
                                        setTypeOpen(false);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all hover:opacity-90 text-left"
                                      style={{
                                        backgroundColor: form.disasterType === dt.value ? dt.bg : 'transparent',
                                        color: form.disasterType === dt.value ? dt.color : '#334155',
                                      }}
                                    >
                                      <span className="w-8 h-8 flex items-center justify-center rounded-xl text-base"
                                        style={{ background: dt.bg }}>{dt.emoji}</span>
                                      <div className="text-left">
                                        <p className="font-black uppercase tracking-wide text-[11px]">{dt.label}</p>
                                        <p className="text-[10px] font-medium opacity-60">{dt.desc}</p>
                                      </div>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <ErrorMsg msg={errors.disasterType} />
                        </div>

                        {/* Severity */}
                        <div>
                          <FieldLabel icon={Zap} label="Severity Level" required />
                          <div className="flex gap-2">
                            {SEVERITY_LEVELS.map(sv => {
                              const isSelected = form.severity === sv.level;
                              return (
                                <motion.button
                                  type="button"
                                  key={sv.level}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setForm(p => ({ ...p, severity: sv.level }));
                                    setErrors(p => ({ ...p, severity: '' }));
                                  }}
                                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all"
                                  style={{
                                    background: isSelected ? sv.gradient : '#f8fafc',
                                    borderColor: isSelected ? sv.border : '#e2e8f0',
                                    boxShadow: isSelected ? `0 0 0 3px ${sv.ring}22` : 'none',
                                  }}
                                >
                                  <SeverityBars count={isSelected ? sv.bars : 0} color={sv.color} />
                                  <span
                                    className="text-[9px] font-black uppercase tracking-widest"
                                    style={{ color: isSelected ? sv.color : '#94a3b8' }}
                                  >
                                    {sv.level}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </div>
                          {selectedSeverity && (
                            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"
                              style={{ color: selectedSeverity.color }}>
                              <Info className="w-3 h-3" /> {selectedSeverity.desc}
                            </p>
                          )}
                          <ErrorMsg msg={errors.severity} />
                        </div>
                      </div>

                      {/* ROW 4 — Description */}
                      <div>
                        <FieldLabel icon={FileText} label="Incident Description" required hint={`${form.description.length} chars`} />
                        <textarea
                          rows={4}
                          placeholder="Describe the disaster in detail — what happened, affected areas, approximate number of people, immediate needs, current conditions…"
                          value={form.description}
                          onChange={e => {
                            setForm(p => ({ ...p, description: e.target.value }));
                            if (errors.description) setErrors(p => ({ ...p, description: '' }));
                          }}
                          className={`${inputBase} resize-none leading-relaxed ${errors.description ? inputError : ''}`}
                        />
                        <ErrorMsg msg={errors.description} />
                      </div>

                      {/* ROW 5 — Image Upload (drag-and-drop) */}
                      <div>
                        <FieldLabel icon={Camera} label="Upload Evidence Image" hint="Optional" />
                        <div
                          ref={dropRef}
                          onClick={() => fileRef.current?.click()}
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          className={`relative border-2 border-dashed rounded-2xl p-5 cursor-pointer transition-all group ${
                            dragOver
                              ? 'border-blue-400 bg-blue-50 scale-[1.01]'
                              : form.imagePreview
                              ? 'border-emerald-300 bg-emerald-50/40'
                              : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                          }`}
                        >
                          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />

                          {form.imagePreview ? (
                            <div className="relative">
                              <img
                                src={form.imagePreview}
                                alt="Preview"
                                className="w-full max-h-52 object-cover rounded-xl border border-slate-200 shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  setForm(p => ({ ...p, image: null, imagePreview: null }));
                                }}
                                className="absolute top-2.5 right-2.5 p-2 bg-slate-900/80 backdrop-blur-sm text-white rounded-full hover:bg-slate-900 transition-all shadow-lg"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                              <div className="mt-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wide truncate">
                                  {form.image?.name}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-5 py-3">
                              <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-all">
                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                                  {dragOver ? 'Drop image here' : 'Drag & drop or click to upload'}
                                </p>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">PNG · JPG · WEBP · up to 10 MB</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SUBMIT BUTTON */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {submitting && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          />
                        )}
                        {submitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Report…</>
                        ) : (
                          <><Send className="w-5 h-5" /> Submit Incident Report</>
                        )}
                      </motion.button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ══════════ RIGHT PANEL ══════════ */}
            <div className="xl:col-span-4 flex flex-col gap-6">

              {/* GUIDELINES CARD */}
              <div className="bg-white rounded-[36px] border border-slate-100 shadow-sm p-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Reporting Guidelines
                </h3>
                <div className="space-y-5">
                  {[
                    { step: '01', title: 'Pinpoint Location',   desc: 'GPS gives precision. Manual entry works for remote zones.', color: '#2563eb' },
                    { step: '02', title: 'Classify Disaster',   desc: 'Pick the most accurate category from the dropdown.',          color: '#ea580c' },
                    { step: '03', title: 'Rate Severity',        desc: 'High = immediate threat to life or major infrastructure.',    color: '#dc2626' },
                    { step: '04', title: 'Attach Evidence',      desc: 'Photos accelerate response team coordination instantly.',      color: '#059669' },
                    { step: '05', title: 'Describe Fully',       desc: 'Include affected count, damage extent, urgent needs.',        color: '#7c3aed' },
                  ].map(g => (
                    <div key={g.step} className="flex gap-4 group">
                      <span className="text-[10px] font-black shrink-0 mt-0.5 w-6 tabular-nums" style={{ color: g.color }}>{g.step}</span>
                      <div>
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{g.title}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DISASTER TYPE REFERENCE */}
              <div className="bg-white rounded-[36px] border border-slate-100 shadow-sm p-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5" /> Disaster Reference
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {DISASTER_TYPES.map(dt => (
                    <div
                      key={dt.value}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all hover:shadow-sm cursor-default"
                      style={{ background: dt.bg, borderColor: dt.border }}
                    >
                      <span className="text-sm">{dt.emoji}</span>
                      <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: dt.color }}>{dt.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMERGENCY NOTICE */}
              <div className="bg-slate-950 rounded-[36px] border border-slate-800 p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{ background: 'radial-gradient(circle at 80% 20%, #f43f5e, transparent 60%)' }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <Phone className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Emergency First</p>
                  </div>
                  <p className="text-[11px] text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
                    If you or others are in immediate danger — <span className="text-white">call 112</span> first before submitting this report.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LiveDisasterReport;
