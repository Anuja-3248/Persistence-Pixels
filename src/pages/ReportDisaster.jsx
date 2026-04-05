import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, AlertTriangle, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import LiveDisasterReport from '../components/LiveDisasterReport';

/* ─── Shared report store (in-memory, synced via localStorage) ─── */
const STORAGE_KEY = 'aegis_user_reports';

export const getStoredReports = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveReport = (report) => {
  const prev = getStoredReports();
  const updated = [report, ...prev].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('aegis:new-report', { detail: report }));
};

/* ─── Stat Card ─── */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <motion.div
    whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-3xl border border-slate-100 p-6 flex items-center gap-4"
  >
    <div className={`p-3 rounded-2xl ${bg}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  </motion.div>
);

/* ─── Main Page ─── */
const ReportDisaster = () => {
  const [reportCount, setReportCount] = useState(() => getStoredReports().length);

  const handleReportSubmit = (report) => {
    saveReport(report);
    setReportCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── PAGE HERO ── */}
      <div className="relative bg-slate-900 overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1700px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            
            {/* Left: Title */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl shadow-xl shadow-red-900/40">
                  <Radio className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Live System
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
                  Report <span className="text-red-400">Disaster</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium mt-1 max-w-md">
                  Submit real-time field incident reports. Your report goes directly to emergency response teams.
                </p>
              </div>
            </div>

            {/* Right: Quick stats */}
            <div className="flex gap-4 flex-wrap">
              <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                <p className="text-2xl font-extrabold text-white">{reportCount}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Reports</p>
              </div>
              <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                <p className="text-2xl font-extrabold text-emerald-400">Active</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
              </div>
              <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                <p className="text-2xl font-extrabold text-blue-400">&lt;2m</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Response</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: AlertTriangle, label: 'Critical Alerts Active', value: '3', color: 'text-red-500', bg: 'bg-red-50' },
              { icon: Users,         label: 'Response Teams On Duty', value: '24', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Clock,         label: 'Reports Last 24 Hours',  value: '47', color: 'text-orange-500', bg: 'bg-orange-50' },
            ].map(s => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── EMERGENCY NOTICE BANNER ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 py-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
            Emergency? <span className="text-amber-900">Call 112 first</span> — then submit this report for coordinated response.
          </p>
        </div>
      </div>

      {/* ── FORM CONTENT ── */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 py-10">
        <LiveDisasterReport onReportSubmit={handleReportSubmit} />
      </div>
    </div>
  );
};

export default ReportDisaster;
