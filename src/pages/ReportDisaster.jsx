import React, { useState } from 'react';
import IncidentCommanderReport from '../components/IncidentCommanderReport';

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

const ReportDisaster = () => {
  const handleReportSubmit = (report) => {
    saveReport(report);
  };

  return (
    <div className="min-h-screen bg-white">
      <IncidentCommanderReport onReportSubmit={handleReportSubmit} />
    </div>
  );
};

export default ReportDisaster;
