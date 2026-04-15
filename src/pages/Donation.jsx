import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, CreditCard, Box, ShieldCheck, ArrowRight, CheckCircle2, Info, ChevronLeft } from 'lucide-react';

const Donation = () => {
  const [activeTab, setActiveTab] = useState('money');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const impactStats = [
    { label: 'Meals Provided', value: '12.5k', icon: <Box className="w-5 h-5 text-blue-400" /> },
    { label: 'Lives Impacted', value: '8.2k', icon: <Heart className="w-5 h-5 text-rose-400" /> },
    { label: 'Aid Kits Sent', value: '2.1k', icon: <Gift className="w-5 h-5 text-emerald-400" /> },
  ];

  const donationTiers = [
    { amount: 10, label: 'Water Supply', impact: 'Provides clean water for a family for 1 week.' },
    { amount: 25, label: 'Medical Kit', impact: 'Basic first-aid and essential medicine for 3 people.' },
    { amount: 50, label: 'Emergency Shelter', impact: 'Thermal blankets and temporary shelter for a family.' },
    { amount: 100, label: 'Full Support', impact: 'Comprehensive aid package including food, water, and medicine.' },
  ];

  const physicalGoods = [
    { type: 'Clothing', icon: <Box className="w-5 h-5" />, items: ['Winter jackets', 'Blankets', 'New socks', 'Thermal wear'], needed: true },
    { type: 'Hygiene', icon: <ShieldCheck className="w-5 h-5" />, items: ['Soap', 'Sanitary pads', 'Toothbrushes', 'Diapers'], needed: true },
    { type: 'Essentials', icon: <Box className="w-5 h-5" />, items: ['Bottled water', 'Canned food', 'Flashlights', 'Batteries'], needed: true },
  ];

  const handleDonate = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0C0B1B] text-white pt-12 pb-12 px-6 font-body">
      
      <div className="max-w-6xl mx-auto mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 mb-6"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-xs font-black uppercase tracking-widest text-rose-500">Humanitarian Aid</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase"
          >
            Empower <span className="text-rose-500">Resilience</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Your contribution provides immediate life-saving support and long-term recovery aid to communities affected by natural disasters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center text-center group hover:bg-white/10 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#131127] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          <div className="lg:w-2/5 bg-gradient-to-br from-rose-600 to-rose-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase leading-none mb-6">Transparency Matters</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Direct Aid</h4>
                    <p className="text-white/70 text-sm">95% of every dollar goes directly to the field operations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Secure Network</h4>
                    <p className="text-white/70 text-sm">Your data is protected with 256-bit encryption standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Tax Deductible</h4>
                    <p className="text-white/70 text-sm">All donations are eligible for tax relief in supported regions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 relative z-10">
              <p className="text-xs font-black tracking-widest uppercase opacity-50 mb-4">Current Crisis Focus</p>
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <p className="font-bold text-sm tracking-tight text-white mb-2 uppercase">Flood Recovery - Coastal Sector</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-white" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-black uppercase">
                  <span>$750k Raised</span>
                  <span>$1M Goal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-8 md:p-12 bg-dark-900 shadow-inner">
            <div className="flex gap-1 bg-white/5 p-1 rounded-2xl mb-8">
              <button 
                onClick={() => setActiveTab('money')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'money' ? 'bg-white text-dark-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <CreditCard className="w-4 h-4" /> Monetary
              </button>
              <button 
                onClick={() => setActiveTab('goods')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'goods' ? 'bg-white text-dark-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Box className="w-4 h-4" /> Goods & Aid
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'money' ? (
                <motion.div
                  key="money"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Select Amount</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {donationTiers.map((tier) => (
                        <button
                          key={tier.amount}
                          onClick={() => setSelectedAmount(tier.amount)}
                          className={`p-4 rounded-2xl border transition-all text-left ${selectedAmount === tier.amount ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
                        >
                          <span className="text-2xl font-black">${tier.amount}</span>
                          <p className="text-[10px] uppercase font-bold tracking-tighter block mt-1">{tier.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <p className="text-sm font-medium text-slate-400">
                      <span className="text-rose-500 font-bold uppercase mr-2">Impact:</span>
                      {donationTiers.find(t => t.amount === selectedAmount)?.impact}
                    </p>
                  </div>

                  <form onSubmit={handleDonate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitted}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 tracking-[0.1em] transition-all transform active:scale-[0.98] disabled:bg-emerald-500 shadow-[0_0_30px_rgba(244,63,94,0.3)] mt-6"
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-6 h-6" /> DONATION RECEIVED
                        </>
                      ) : (
                        <>
                          CONFIRM ${selectedAmount} DONATION <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="goods"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {physicalGoods.map((category, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all flex items-start gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xl font-bold uppercase tracking-tight">{category.type}</h4>
                            <span className="text-[10px] font-black text-rose-500 border border-rose-500/30 px-3 py-1 rounded-full uppercase tracking-tighter">High Demand</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((item, j) => (
                              <span key={j} className="text-[10px] bg-white/5 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-8 text-center mt-10">
                    <p className="text-lg font-bold mb-4 tracking-tight">Prefer to drop off or ship?</p>
                    <p className="text-sm text-slate-400 mb-6">Contact our logistics team to coordinate the pickup or delivery of physical aid packages.</p>
                    <div className="flex flex-col md:flex-row gap-4">
                       <button className="flex-1 py-4 bg-white text-dark-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-colors">Request Pickup</button>
                       <button className="flex-1 py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-colors">Find Drop-off Points</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
