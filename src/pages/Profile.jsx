import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Edit3, LogOut, Lock,
  Users, MapPinned, ToggleLeft, ToggleRight, Plus,
  FileText, ChevronLeft, Shield, BadgeCheck, Verified,
  Download, History, Radio, Bookmark, Bell, ShieldAlert,
  Search, Filter, Loader2, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { api } from '../services/api';

/* ───────────── helpers ───────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const STATUS_MAP = {
  Resolved: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  Pending: { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
  'In Review': { color: '#facc15', bg: 'rgba(250,204,21,0.1)', border: 'rgba(250,204,21,0.2)' },
};

/* ───────────── sub-components ───────────── */
const MaterialIcon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontSize: 'inherit' }}>
    {name}
  </span>
);

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [reports, setReports] = useState([]);
  const [statusData, setStatusData] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: 'All' });
  const [shareLocation, setShareLocation] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, reportsData, statusInfo] = await Promise.all([
          api.getProfile(),
          api.getReports(),
          api.getStatus()
        ]);
        setUser(userData);
        setReports(reportsData);
        setStatusData(statusInfo);
      } catch (err) {
        showToast('Failed to connect to tactical systems', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Real-time polling (every 15s)
    const interval = setInterval(async () => {
      const [reportsData, statusInfo] = await Promise.all([
        api.getReports(filters),
        api.getStatus()
      ]);
      setReports(reportsData);
      setStatusData(statusInfo);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!user.name || !user.email) {
      showToast('Name and Email are mandatory fields', 'error');
      return;
    }
    setUpdating(true);
    try {
      await api.updateProfile(user);
      showToast('Mission Profile Updated Successfully', 'success');
    } catch (err) {
      showToast('Profile update failed: Connectivity error', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleExport = () => {
    showToast('Export Started', 'info');
    const data = JSON.stringify({ user, reports }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DisasterX_Credentials_${user.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSignOut = async () => {
    await api.logout();
    navigate('/');
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = filters.search === '' || 
      r.disasterType.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.location.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All' || r.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  // Chart Data preparation
  const getChartData = () => {
    const typeCount = {};
    const statusCount = { Critical: 0, Pending: 0, Resolved: 0 };
    const timelineData = [];

    reports.forEach(r => {
      typeCount[r.disasterType] = (typeCount[r.disasterType] || 0) + 1;
      if (statusCount[r.status] !== undefined) statusCount[r.status]++;
    });

    const barData = Object.keys(typeCount).map(type => ({ name: type.split(' ')[0], value: typeCount[type] }));
    const pieData = Object.keys(statusCount).map(status => ({ name: status, value: statusCount[status] }));
    
    // Timeline Data: Group by day
    const dayMap = {};
    reports.forEach(r => {
      const day = new Date(r.timestamp).toLocaleDateString();
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    const lineData = Object.keys(dayMap).map(day => ({ date: day, count: dayMap[day] })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return { barData, pieData, lineData };
  };

  const { barData, pieData, lineData } = getChartData();
  const COLORS = ['#ef4444', '#f97316', '#22c55e'];

  if (!user) return null;

  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ff535b&color=fff&size=512&bold=true`;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#e5e2e1] font-['Inter',sans-serif] selection:bg-red-500/30 selection:text-white pb-12 w-full overflow-x-hidden relative">
      {/* Subtle Technical Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* ── Top Navigation ── */}
      <nav className="w-full h-[64px] flex justify-between items-center px-6 md:px-12 bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <Link to="/" className="text-[20px] font-bold tracking-tighter uppercase text-white hover:text-red-500 transition-colors">
            AEGIS
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-[13px] font-semibold uppercase tracking-wider text-gray-500">
            <Link to="#" className="hover:text-white transition-all">Archive</Link>
            <Link to="#" className="hover:text-white transition-all">Field Reports</Link>
            <Link to="#" className="hover:text-white transition-all">Tactical Log</Link>
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
            <button className="text-gray-400 hover:text-white transition-colors relative p-1">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
            </button>
            <div className="w-8 h-8 rounded-full border border-red-500/50 overflow-hidden bg-gray-800">
              <img className="w-full h-full object-cover" src={avatarSrc} alt={user.name} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Profile Header Section ── */}
      <section className="w-full pt-10 pb-6 flex flex-col items-center relative z-10">
        {toast && (
          <div className={`fixed top-24 right-12 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl animate-in slide-in-from-right duration-300 ${
            toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
            toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
            'bg-blue-500/10 border-blue-500/20 text-blue-500'
          }`}>
            {toast.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : 
             toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
             <Radio className="w-5 h-5 animate-pulse" />}
            <span className="text-[14px] font-bold uppercase tracking-wide">{toast.message}</span>
          </div>
        )}

        <div className="w-full max-w-[900px] px-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Edit Icon */}
            <div className="relative group mb-4">
              <div className="w-[90px] h-[90px] rounded-full border border-white/10 p-1 bg-white/[0.02] flex items-center justify-center transition-all duration-300 group-hover:border-red-500/30 group-hover:bg-red-500/5">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/5 transition-transform duration-300 group-hover:scale-95">
                  <img className="w-full h-full object-cover" src={avatarSrc} alt={user.name} />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center border-2 border-[#0c0c0e] hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 shadow-lg">
                <Edit3 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center gap-1 mb-3">
              {loading ? (
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded-md mb-2"></div>
              ) : (
                <h1 className="text-[28px] font-semibold tracking-tight text-white leading-tight">
                  {user.name}
                </h1>
              )}
              {loading ? (
                <div className="h-4 w-32 bg-white/5 animate-pulse rounded-md"></div>
              ) : (
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-gray-500 flex items-center gap-2">
                  {user.role} <span className="text-gray-700">•</span> {user.id}
                </p>
              )}
            </div>

            {/* Status Badge */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/5 border border-green-500/10 rounded-full text-[9px] font-bold uppercase tracking-wider text-green-500/80">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                Active Service
              </span>
            </div>

            {/* Compact Info Card */}
            <div className="w-full max-w-[500px] flex justify-between items-center py-3.5 px-6 bg-white/[0.03] border border-white/5 rounded-xl backdrop-blur-md hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group/infobar cursor-default">
              <div className="flex items-center gap-2.5 text-gray-400 group-hover/infobar:text-gray-200 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-red-500/70" />
                <span className="text-[11px] font-medium">{loading ? '...' : user.location}</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2.5 text-gray-400 group-hover/infobar:text-gray-200 transition-colors">
                <Mail className="w-3.5 h-3.5 text-red-500/70" />
                <span className="text-[11px] font-medium">{loading ? '...' : user.email}</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2.5 text-gray-400 group-hover/infobar:text-gray-200 transition-colors">
                <Phone className="w-3.5 h-3.5 text-red-500/70" />
                <span className="text-[11px] font-medium p-0 m-0">{loading ? '...' : user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider Line */}
      <div className="w-full max-w-[1200px] mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* ── Main Dashboard Content ── */}
      <main className="w-[96%] mx-auto mt-8 px-4 relative z-20">
        <motion.div {...fadeUp(0.4)} className="bg-[#1c1b1b] rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Column 1: Editable Personnel Data & Reports */}
            <div className="lg:col-span-8">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-1.5 bg-red-600 rounded-full"></div>
                        <h3 className="text-white text-[20px] uppercase tracking-[0.1em] font-semibold">
                            Personnel Data
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        {loading ? (
                          Array(5).fill(0).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                              <div className="h-3 w-24 bg-white/5 rounded-md animate-pulse"></div>
                              <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse"></div>
                            </div>
                          ))
                        ) : (
                          <>
                            <DataField 
                                icon={User} 
                                label="Full Name" 
                                name="name" 
                                value={user.name} 
                                onChange={handleInputChange} 
                                placeholder="Enter full name"
                            />
                            <DataField 
                                icon={Mail} 
                                label="Email Address" 
                                name="email" 
                                type="email"
                                value={user.email} 
                                onChange={handleInputChange} 
                                placeholder="operator@aegis.ai"
                            />
                            <DataField 
                                icon={Phone} 
                                label="Emergency Line" 
                                name="phone" 
                                type="tel"
                                value={user.phone} 
                                onChange={handleInputChange} 
                                placeholder="+1 (555) 000-0000"
                            />
                            <DataField 
                                icon={MapPin} 
                                label="Base Location" 
                                name="location" 
                                value={user.location} 
                                onChange={handleInputChange} 
                                placeholder="City, Country"
                            />
                            <div className="md:col-span-2">
                              <DataField 
                                  icon={Shield} 
                                  label="Primary Organization" 
                                  name="primaryOrg" 
                                  value={user.primaryOrg} 
                                  onChange={handleInputChange} 
                                  placeholder="Regional Emergency Command"
                              />
                            </div>
                          </>
                        )}
                    </div>
                </div>

                {/* CHARTS SECTION */}
                <div className="mt-16 pt-12 border-t border-white/5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-1.5 bg-red-600 rounded-full"></div>
                        <h2 className="text-[20px] font-semibold tracking-tight uppercase text-white">System Intelligence</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* Reports Overview */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl h-[300px]">
                            <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-6">Reports Overview (By Type)</p>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Status Distribution */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl h-[300px] flex flex-col">
                            <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-2">Status Distribution</p>
                            <div className="flex-1 flex items-center justify-between">
                                <div className="w-1/2 h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-1/2 space-y-3">
                                    {pieData.map((d, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{d.name}: {d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Activity Timeline */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl h-[300px] md:col-span-2 lg:col-span-1">
                            <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-6">Activity Timeline (Reports/Day)</p>
                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={lineData}>
                                    <defs>
                                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="#555" fontSize={8} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#ef4444" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-1.5 bg-red-600 rounded-full"></div>
                            <h2 className="text-[20px] font-semibold tracking-tight uppercase text-white">My Reports</h2>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {/* Search Input */}
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                              <input 
                                type="text"
                                placeholder="Search tactical logs..."
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-red-500/40 w-48 transition-all"
                              />
                           </div>
                           {/* Status Filter */}
                           <select 
                             value={filters.status}
                             onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                             className="bg-white/5 border border-white/10 rounded-full py-2 px-4 text-[11px] text-gray-400 focus:outline-none focus:text-white cursor-pointer"
                           >
                             <option value="All">All Status</option>
                             <option value="Critical">Critical</option>
                             <option value="Pending">Pending</option>
                             <option value="Resolved">Resolved</option>
                           </select>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="pb-6 text-gray-500 text-[10px] uppercase tracking-widest font-bold">Disaster Type</th>
                                    <th className="pb-6 text-gray-500 text-[10px] uppercase tracking-widest font-bold">Location</th>
                                    <th className="pb-6 text-gray-500 text-[10px] uppercase tracking-widest font-bold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                  Array(3).fill(0).map((_, i) => (
                                    <tr key={i}>
                                      <td className="py-6"><div className="h-6 w-48 bg-white/5 animate-pulse rounded-md"></div></td>
                                      <td className="py-6"><div className="h-4 w-32 bg-white/5 animate-pulse rounded-md"></div></td>
                                      <td className="py-6 flex justify-end"><div className="h-8 w-24 bg-white/5 animate-pulse rounded-full"></div></td>
                                    </tr>
                                  ))
                                ) : filteredReports.length > 0 ? (
                                    filteredReports.map((report, i) => (
                                        <tr key={i} className="group hover:bg-white/[0.02] transition-all cursor-pointer">
                                            <td className="py-6 text-[16px] font-medium text-gray-200 group-hover:text-red-500 transition-colors uppercase tracking-tight leading-relaxed">
                                              <div className="flex flex-col">
                                                <span>{report.disasterType}</span>
                                                <span className="text-[10px] text-gray-600 font-bold uppercase mt-1">{new Date(report.timestamp).toLocaleString()}</span>
                                              </div>
                                            </td>
                                            <td className="py-6 text-[13px] text-gray-500 font-medium">{report.location}</td>
                                            <td className="py-6 text-right">
                                                <span 
                                                    className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                                    style={{ backgroundColor: `${(STATUS_MAP[report.status] || STATUS_MAP.Pending).color}10`, color: (STATUS_MAP[report.status] || STATUS_MAP.Pending).color, border: `1px solid ${(STATUS_MAP[report.status] || STATUS_MAP.Pending).color}20` }}
                                                >
                                                    {report.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                  <tr>
                                    <td colSpan="3" className="py-20 text-center">
                                      <div className="flex flex-col items-center gap-3 text-gray-600">
                                        <AlertTriangle className="w-10 h-10 opacity-20" />
                                        <p className="text-[13px] font-bold uppercase tracking-widest">No reports found matching criteria</p>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Column 2: Deployment Status & Control Actions */}
            <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-[#131313]/50 p-8 rounded-[2rem] border border-white/5 border-l-4 border-l-red-500/50 shadow-xl backdrop-blur-sm">
                    <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-8">DEPLOYMENT STATUS</p>
                    {loading ? (
                      <div className="space-y-6">
                        <div className="h-8 w-32 bg-white/5 animate-pulse rounded-md"></div>
                        <div className="h-4 w-full bg-white/5 animate-pulse rounded-md"></div>
                        <div className="h-4 w-full bg-white/5 animate-pulse rounded-md"></div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-4 mb-10">
                            <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-lg ${statusData?.status === 'Critical Response' ? 'bg-red-600 shadow-red-600/50' : 'bg-green-600 shadow-green-600/50'}`}></div>
                            <p className="text-[20px] font-semibold tracking-tight text-white uppercase">{statusData?.status || 'READY FOR DISPATCH'}</p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-gray-500 uppercase tracking-widest text-[11px]">Total Reports</span>
                                <span className="text-white font-mono text-[18px]">{statusData?.totalReports.toString().padStart(2, '0') || '00'}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-gray-500 uppercase tracking-widest text-[11px]">Active Signals</span>
                                <span className="text-red-500 font-mono text-[18px]">{statusData?.activeSignals.toString().padStart(2, '0') || '00'}</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-600 h-full transition-all duration-1000" style={{ width: `${(statusData?.activeSignals / statusData?.totalReports) * 100 || 0}%` }}></div>
                            </div>
                        </div>
                      </>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <button 
                      disabled={updating || loading}
                      onClick={handleUpdateProfile}
                      className="w-full py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-[15px] uppercase tracking-wide shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
                        <span>{updating ? 'Updating...' : 'Update Mission Profile'}</span>
                    </button>
                    <button 
                      onClick={handleExport}
                      className="w-full py-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-gray-200 font-bold text-[15px] uppercase tracking-wide border border-white/10 transition-all flex items-center justify-center gap-3"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export Credentials</span>
                    </button>
                    <button 
                      className="w-full py-5 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold text-[15px] uppercase tracking-wide border border-red-500/10 transition-all flex items-center justify-center gap-3 mt-4" 
                      onClick={handleSignOut}
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Terminate Session</span>
                    </button>
                </div>

                {/* Family Tracking Card */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
                    <h3 className="text-white text-[13px] uppercase tracking-wider font-semibold">COMMAND OVERRIDE</h3>
                    <div className="flex items-center justify-between p-6 bg-black/20 rounded-[1.5rem] border border-white/5">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">LOCATION SHARING</span>
                            <span className="text-[15px] font-bold tracking-tight uppercase text-white">{shareLocation ? 'ACTIVE' : 'OFFLINE'}</span>
                        </div>
                        <button onClick={() => setShareLocation(!shareLocation)} className="p-1">
                            {shareLocation ? <ToggleRight size={32} className="text-red-500" /> : <ToggleLeft size={32} className="text-gray-600" />}
                        </button>
                    </div>
                </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* ── Recent Deployment Corridor (Full Width Banner) ── */}
      <section className="w-[96%] mx-auto mt-24 mb-24">
         <motion.div {...fadeUp(0.5)} className="bg-[#1c1b1b] rounded-[4rem] overflow-hidden h-[30rem] relative border-2 border-white/5 shadow-2xl">
            <img className="w-full h-full object-cover opacity-50 brightness-75 grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTdRnEeAM7jncgthrGBGobGNKBDgPgbgodLNDFduIdBpou0s-V72ugtkf_VGhpEdJizC_1hvzPa-V5sy_CtylDnMJ3lKOw4cvuNBuWBwkTWqWzq0hL20SQgt1Er5ndRy3I3ERnxGR8kPViA3IH8WPLHEcuQHkoy_SVroIkxwG9KXv86WmOojYFuXStjSEtASr8ViTh9P_1EIFhf5LTwgqLRoA_LPxHkB9x45GQ3G3Ki8OHRbPe8sLxh-v0y0rPFh-iMgh6O0xBZDI" alt="Topographic Map" />
            <div className="absolute inset-0 p-20 md:p-32 flex flex-col justify-end bg-gradient-to-t from-[#131313] via-transparent to-transparent">
                <div className="flex items-center space-x-8 mb-6">
                    <MaterialIcon name="radar" className="text-[#ffbd69] text-6xl drop-shadow-[0_0_20px_rgba(255,189,105,0.4)]" />
                    <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">Recent Deployment Corridor</h3>
                </div>
                <p className="text-stone-500 text-xl font-black uppercase tracking-[0.4em]">Synchronized Central Command • Mumbai Intelligence Cluster</p>
            </div>
            <div className="absolute top-20 right-20">
                <div className="px-10 py-4 rounded-full bg-[#f29b00]/10 text-[#f29b00] text-lg font-black uppercase tracking-[0.4em] border-2 border-[#f29b00]/30 backdrop-blur-2xl">
                    LIVE TRACKING
                </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

/* ── Helper Components ── */
const DataField = ({ icon: Icon, label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-2.5 group/field">
    <label className="text-[13px] font-medium text-gray-400 uppercase tracking-wide ml-1 transition-colors group-focus-within/field:text-red-500/70">
      {label}
    </label>
    <div className="relative flex items-center">
      {Icon && <Icon className="absolute left-4 w-4.5 h-4.5 text-gray-500 transition-colors group-focus-within/field:text-red-500" />}
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[16px] font-medium text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 focus:bg-red-500/[0.02] transition-all cursor-text z-20"
      />
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-8 transform hover:translate-x-2 transition-all duration-300">
    <div className="w-20 h-20 rounded-[1.5rem] bg-[#353534] flex items-center justify-center shrink-0 shadow-2xl border-2 border-white/5">
      <MaterialIcon name={icon} className="text-[#98cdf2] text-4xl" />
    </div>
    <div className="flex flex-col justify-center h-20">
      <p className="text-xs text-stone-600 uppercase tracking-[0.4em] mb-3 font-black">{label}</p>
      <p className="text-2xl font-black text-[#e5e2e1] leading-none uppercase">{value}</p>
    </div>
  </div>
);

export default Profile;
