/**
 * Mock API Service for DisasterX Dashboard
 * Simulates REST API endpoints with localStorage persistence and simulated latency.
 */

const STORAGE_KEYS = {
  USER: 'disasterx_user_data_v2',
  REPORTS: 'disasterx_reports_data',
};

const INITIAL_USER = {
  name: '',
  email: '',
  phone: '',
  location: '',
  role: 'User',
  bio: '',
  primaryOrg: '',
  id: 'ID-01'
};

const INITIAL_REPORTS = [
  { id: 1, disasterType: 'Seismic Level 7.2', location: 'Seattle Metro, WA', status: 'Critical', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), severity: 'High' },
  { id: 2, disasterType: 'Wildfire Containment', location: 'Rogue River, OR', status: 'Pending', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), severity: 'Medium' },
  { id: 3, disasterType: 'Flash Flood Audit', location: 'Boise River, ID', status: 'Resolved', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), severity: 'Low' },
  { id: 4, disasterType: 'Chemical Spill', location: 'Houston, TX', status: 'Critical', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), severity: 'High' },
  { id: 5, disasterType: 'Landslide Monitoring', location: 'Himalayas, India', status: 'Pending', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), severity: 'Medium' },
];

const wait = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- USER PROFILE ---
  getProfile: async () => {
    await wait(1000);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : INITIAL_USER;
  },

  updateProfile: async (userData) => {
    await wait(1500);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    return { success: true, data: userData };
  },

  // --- REPORTS ---
  getReports: async (filters = {}) => {
    await wait(1200);
    let reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS)) || INITIAL_REPORTS;

    // Apply filtering
    if (filters.status && filters.status !== 'All') {
      reports = reports.filter(r => r.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      reports = reports.filter(r => 
        r.disasterType.toLowerCase().includes(q) || 
        r.location.toLowerCase().includes(q)
      );
    }

    // Sort by latest
    return reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  // --- STATUS ---
  getStatus: async () => {
    await wait(500);
    const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS)) || INITIAL_REPORTS;
    const activeCount = reports.filter(r => r.status !== 'Resolved').length;
    const criticalCount = reports.filter(r => r.status === 'Critical').length;

    let status = 'Standby';
    if (criticalCount > 0) status = 'Critical Response';
    else if (activeCount > 0) status = 'Active Deployment';

    return {
      status,
      totalReports: reports.length,
      activeSignals: activeCount,
      capacity: 85 // Mock capacity
    };
  },

  // --- AUTH ---
  logout: async () => {
    await wait(500);
    localStorage.removeItem('disasterx_user');
    localStorage.removeItem('isLoggedIn');
    return { success: true };
  }
};
