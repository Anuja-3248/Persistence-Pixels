import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, ChevronRight } from 'lucide-react';

const ProfileSection = ({ data, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8"
    >
      {/* Profile Main Config */}
      <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-headline font-black uppercase tracking-tight text-slate-900">Operational Credentials</h3>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 rounded-2xl py-4 px-6 font-bold text-slate-900 transition-all outline-none" 
                type="text" 
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Role</label>
              <div className="relative">
                <select 
                  value={data.role}
                  onChange={(e) => onChange('role', e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 rounded-2xl py-4 px-6 font-bold text-slate-900 transition-all appearance-none outline-none"
                >
                  <option>Authority (Command)</option>
                  <option>Primary Volunteer</option>
                  <option>Field Operational User</option>
                </select>
                <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email Address</label>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 rounded-2xl py-4 px-6 font-bold text-slate-900 transition-all outline-none" 
              type="email" 
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Satellite Link Phone</label>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 rounded-2xl py-4 px-6 font-bold text-slate-900 transition-all outline-none" 
              type="tel" 
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Avatar Summary */}
      <div className="md:col-span-4 bg-slate-100/50 p-8 rounded-[2.5rem] flex flex-col items-center text-center justify-center border border-slate-200/50 backdrop-blur-sm">
        <div className="relative mb-6 group">
          <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white transition-transform group-hover:scale-105">
            <img 
              alt="Profile Large" 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSpdUDJvtayj0wtSTtI9RP8fGJxDZ7ectpEkGBUk4_3kme_yQlKtOjem5rEGUuJlRIsWy139Z7zB3iWjdiPwS2ZRWgXcOjpGZPnkTZAbAK1RVduIc-IP2xngfrzZaqEzul1_2A0_q4uo-I9IFrg8YUfkDlNIC-yRwnGFEc71Lvm92sDfiSWdW9F1XAaJMIKh0YgcTz2PVnwBe-V7CqjkwSSTD8z7N7a4SQ9skM5UkB4AfZDmDQlNY2r9ItdkdMwi-y4E708eMzM6LO"
            />
          </div>
          <button className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-2xl shadow-xl hover:bg-blue-700 transition-all transform hover:rotate-12">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
        
        <h4 className="font-headline font-black text-xl text-slate-900">{data.name.split(' ')[1] || 'Commander'}</h4>
        
        <div className="mt-4 inline-flex items-center gap-2.5 px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          Verified Authority
        </div>
        
        <p className="text-[11px] text-slate-500 font-bold mt-8 px-4 leading-relaxed uppercase tracking-widest">
          Node Security Clearance Level: 5 (Tactical Ops)
        </p>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
