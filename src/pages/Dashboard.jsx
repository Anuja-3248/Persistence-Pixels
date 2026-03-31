import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Users, LifeBuoy, CloudLightning, RefreshCw, Filter, Layers, 
  Plus, Minus, AlertOctagon, AlertTriangle, Info, MoreHorizontal, 
  Ambulance, Home, Package, CheckCircle, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend
} from 'recharts';

const Dashboard = () => {
  const chartData = [
    { name: 'Mon', critical: 2, resolved: 1 },
    { name: 'Tue', critical: 5, resolved: 3 },
    { name: 'Wed', critical: 3, resolved: 4 },
    { name: 'Thu', critical: 8, resolved: 5 },
    { name: 'Fri', critical: 4, resolved: 6 },
    { name: 'Sat', critical: 2, resolved: 4 },
    { name: 'Sun', critical: 1, resolved: 3 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Overview</h1>
          <p className="text-neutral-500 text-sm mt-1">Real-time monitoring and response coordination.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Last updated: Just now</span>
          <button className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Data Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Widget 1 */}
        <div className="bg-white p-5 rounded-xl shadow-custom border border-neutral-200 hover:shadow-custom-hover transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Active Disasters</p>
              <h3 className="font-heading text-3xl font-bold text-neutral-900">12</h3>
            </div>
            <div className="p-2 bg-tertiary-50 rounded-md">
              <Flame className="w-6 h-6 text-tertiary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-tertiary-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +2
            </span>
            <span className="text-neutral-400 ml-2">since yesterday</span>
          </div>
        </div>

        {/* Widget 2 */}
        <div className="bg-white p-5 rounded-xl shadow-custom border border-neutral-200 hover:shadow-custom-hover transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Affected People</p>
              <h3 className="font-heading text-3xl font-bold text-neutral-900">45.2k</h3>
            </div>
            <div className="p-2 bg-secondary-50 rounded-md">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-secondary-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +12%
            </span>
            <span className="text-neutral-400 ml-2">in last 24h</span>
          </div>
        </div>

        {/* Widget 3 */}
        <div className="bg-white p-5 rounded-xl shadow-custom border border-neutral-200 hover:shadow-custom-hover transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Rescue Ops</p>
              <h3 className="font-heading text-3xl font-bold text-neutral-900">34</h3>
            </div>
            <div className="p-2 bg-primary-50 rounded-md">
              <LifeBuoy className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> 8
            </span>
            <span className="text-neutral-400 ml-2">completed today</span>
          </div>
        </div>

        {/* Widget 4 */}
        <div className="bg-white p-5 rounded-xl shadow-custom border border-neutral-200 hover:shadow-custom-hover transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Weather Alert</p>
              <h3 className="font-heading text-lg font-bold text-neutral-900 leading-tight mt-1">Severe Storm<br/>Warning</h3>
            </div>
            <div className="p-2 bg-neutral-100 rounded-md">
              <CloudLightning className="w-6 h-6 text-neutral-700" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm text-secondary-600 font-medium">Coastal Region</div>
        </div>
      </section>

      {/* Map & Alerts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-custom border border-neutral-200 overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-white z-10">
            <h2 className="font-heading text-lg font-bold text-neutral-900">Live Incident Map</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors flex items-center gap-2">
                <Layers className="w-4 h-4" /> Layers
              </button>
            </div>
          </div>
          <div className="relative flex-1 bg-neutral-100 overflow-hidden min-h-[350px]">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Map View" 
              className="w-full h-full object-cover opacity-90"
            />
            {/* Map Controls */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-2">
              <button className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 border border-neutral-200">
                <Plus className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 border border-neutral-200">
                <Minus className="w-5 h-5" />
              </button>
            </div>

            {/* Map Legend */}
            <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-sm border border-neutral-200 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-tertiary-500"></span> Critical
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-secondary-500"></span> Warning
              </div>
              <div className="flex items-center gap-2 text-primary-500">
                <span className="w-3 h-3 rounded-full bg-primary-500"></span> Monitoring
              </div>
            </div>

            {/* Map Markers */}
            <div className="absolute top-[30%] left-[40%] group cursor-pointer">
              <div className="w-4 h-4 bg-tertiary-500 rounded-full border-2 border-white shadow-md relative z-10" />
              <div className="w-4 h-4 bg-tertiary-500 rounded-full absolute top-0 left-0 animate-ping opacity-75" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg border border-neutral-200 p-3 hidden group-hover:block z-20">
                <p className="font-bold text-sm text-neutral-900 mb-1">Wildfire - Sector 7</p>
                <p className="text-xs text-neutral-500 mb-2">Severity: Critical</p>
                <button className="w-full py-1 bg-tertiary-50 text-tertiary-700 text-xs font-medium rounded">View Details</button>
              </div>
            </div>
            
            <div className="absolute top-[60%] left-[65%]">
              <div className="w-4 h-4 bg-secondary-500 rounded-full border-2 border-white shadow-md relative z-10" />
              <div className="w-4 h-4 bg-secondary-500 rounded-full absolute top-0 left-0 animate-ping opacity-75" />
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl shadow-custom border border-neutral-200 flex flex-col h-[400px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-white shrink-0">
            <h2 className="font-heading text-lg font-bold text-neutral-900">Recent Alerts</h2>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</a>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[
              { type: 'critical', title: 'Evacuation Order', text: 'Immediate evacuation required for Coastal District.', time: '10m ago', icon: AlertOctagon },
              { type: 'warning', title: 'Power Outage', text: 'Grid failure reported in North Sector. Repair dispatched.', time: '45m ago', icon: AlertTriangle },
              { type: 'info', title: 'Supply Delivery', text: 'Medical supplies arrived at Shelter Alpha.', time: '2h ago', icon: Info },
              { type: 'info', title: 'Road Cleared', text: 'Highway 42 is now open for emergency vehicles.', time: '3h ago', icon: Info },
            ].map((alert, i) => (
              <div key={i} className={`p-3 border-l-4 rounded-r-md flex gap-3 ${
                alert.type === 'critical' ? 'border-tertiary-500 bg-tertiary-50' : 
                alert.type === 'warning' ? 'border-secondary-500 bg-secondary-50' : 
                'border-primary-500 bg-neutral-50'
              }`}>
                <div className="mt-0.5 shrink-0">
                  <alert.icon className={`w-5 h-5 ${
                    alert.type === 'critical' ? 'text-tertiary-600' :
                    alert.type === 'warning' ? 'text-secondary-600' :
                    'text-primary-600'
                  }`} />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-neutral-900">{alert.title}</h4>
                    <span className="text-[10px] text-neutral-500 whitespace-nowrap ml-2">{alert.time}</span>
                  </div>
                  <p className="text-xs text-neutral-700 line-clamp-2">{alert.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resource Management */}
        <div className="bg-white rounded-xl shadow-custom border border-neutral-200 p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-heading text-lg font-bold text-neutral-900">Resource Status</h2>
            <MoreHorizontal className="w-5 h-5 text-neutral-400 cursor-pointer" />
          </div>
          <div className="space-y-5">
            {[
              { label: 'Ambulances', val: 80, active: '24/30', icon: Ambulance, color: 'bg-primary-500' },
              { label: 'Shelters Capacity', val: 92, active: 'Almost Full', icon: Home, color: 'bg-tertiary-500' },
              { label: 'Food Supplies', val: 45, active: 'Resupply Needed', icon: Package, color: 'bg-secondary-500' },
            ].map((res, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5 font-medium">
                  <span className="text-neutral-700 flex items-center gap-2">
                    <res.icon className="w-4 h-4 text-neutral-400" /> {res.label}
                  </span>
                  <span className="text-neutral-900 font-bold">{res.val}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${res.val}%` }}
                    transition={{ duration: 1 }}
                    className={`${res.color} h-2 rounded-full`}
                  />
                </div>
                <p className="text-[10px] text-neutral-500 mt-1 text-right">{res.active}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 py-2 border border-neutral-200 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Request Resources</button>
        </div>

        {/* Rescue Teams */}
        <div className="bg-white rounded-xl shadow-custom border border-neutral-200 p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-heading text-lg font-bold text-neutral-900">Active Teams</h2>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Map View</a>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Team Alpha', sector: 'Sector 7 • Medical', status: 'Active', color: 'bg-green-500', icon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
              { name: 'Team Bravo', sector: 'North Hwy • Search', status: 'En Route', color: 'bg-secondary-500', icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
              { name: 'Team Charlie', sector: 'Base • Logistics', status: 'Standby', color: 'bg-neutral-400', icon: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            ].map((team, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-neutral-100 rounded-md hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img src={team.icon} alt={team.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 ${team.color} border-2 border-white rounded-full`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{team.name}</h4>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{team.sector}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  team.status === 'Active' ? 'bg-green-100 text-green-700' :
                  team.status === 'En Route' ? 'bg-secondary-100 text-secondary-700' :
                  'bg-neutral-100 text-neutral-600'
                }`}>{team.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Trends */}
        <div className="bg-white rounded-xl shadow-custom border border-neutral-200 p-5 md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold text-neutral-900">Incident Trends</h2>
            <select className="text-xs border border-neutral-200 rounded p-1 text-neutral-600 bg-white focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }} />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="resolved" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
