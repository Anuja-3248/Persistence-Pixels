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
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <div className="flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 lg:p-14 max-w-[1450px] mx-auto w-full">
          {/* Header Section */}
          <header className="mb-14 text-left relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-blue-600/10 text-blue-700 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-blue-600/20">Protocol 4-Alpha</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 text-red-700 rounded-full border border-red-600/20">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider">Live Response System</span>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">
                  Report Emergency <span className="text-blue-700">Incident</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-xl leading-relaxed font-medium">
                  Provide critical details to help our dispatch teams coordinate an immediate response. Your information saves lives.
                </p>
              </div>
              
              {/* Optional Hero Stats or Elements could go here */}
            </div>
          </header>

          {/* ── EMERGENCY NOTICE BANNER ── */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-600 rounded-2xl mb-12 shadow-sm overflow-hidden"
          >
            <div className="px-8 py-5 flex items-center gap-5">
              <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-600/20">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-red-900 uppercase tracking-widest mb-0.5">Emergency? Call 112 First</p>
                <p className="text-red-700 font-bold text-sm">Then submit this report for coordinated professional response.</p>
              </div>
            </div>
          </motion.div>

          {/* ── FORM CONTENT ── */}
          <div className="w-full">
            <LiveDisasterReport onReportSubmit={handleReportSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportDisaster;
