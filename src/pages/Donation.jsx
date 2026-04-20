import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, HeartHandshake, Users, BriefcaseMedical, 
  ShieldCheck, ArrowRight, CheckCircle2, 
  Building2, Globe, ChevronLeft
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import donationHeroBg from '../assets/donation-hero-bg.png';
import charityBanner from '../assets/charity-banner-highres.png';
import crackedEarth from '../assets/cracked-earth.png';
import donationBg from '../assets/donation-bg.png';
import { Link } from 'react-router-dom';

const Donation = () => {
  const donationRef = React.useRef(null);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [raisedAmount, setRaisedAmount] = useState(750000);
  const targetAmount = 1000000;

  const impactStats = [
    { label: 'Meals Provided', value: '12.5K', icon: <HeartHandshake className="w-6 h-6 text-[#10b981]" /> },
    { label: 'Lives Impacted', value: '8.2K', icon: <Users className="w-6 h-6 text-[#10b981]" /> },
    { label: 'Aid Kits Dispatched', value: '2.1K', icon: <BriefcaseMedical className="w-6 h-6 text-[#10b981]" /> },
  ];

  const handleDonate = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setRaisedAmount(prev => Math.min(prev + selectedAmount, targetAmount));
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulate Real-time incoming donations
  React.useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance of a small incoming donation every 5 seconds
      if (Math.random() > 0.7 && raisedAmount < targetAmount) {
        const randomDonation = Math.floor(Math.random() * 50) + 10;
        setRaisedAmount(prev => Math.min(prev + randomDonation, targetAmount));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [raisedAmount, targetAmount]);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0E0] font-body selection:bg-[#10b981]/30">
      
      {/* Header Overlay */}
      <header className="px-12 py-8 flex items-center justify-between border-b border-white/5 bg-[#0A0C10]/80 backdrop-blur-md sticky top-0 z-50">

        
        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors ml-4 flex items-center gap-2">
            <ChevronLeft className="w-3 h-3" /> Back
          </Link>
        </nav>

        <button 
          onClick={scrollToDonation}
          className="bg-[#10b981] text-black px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0d9466] transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          Donate Now
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center px-12 overflow-hidden border-b border-white/5">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0A0C10]" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 transition-opacity duration-1000" 
            style={{ backgroundImage: `url(${donationHeroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10] via-[#0A0C10]/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0A0C10] to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.3em] mb-4"
          >
            Action Required: Coastal Sector
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl font-black text-white leading-tight tracking-tighter mb-8 uppercase"
          >
            Empower <br /> Resilience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed mb-10 font-medium"
          >
            Direct humanitarian action in the face of climate instability. 
            Your contribution secures the supply chain for displaced communities in the Coastal Sector.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#10b981] text-black px-10 py-4 rounded-sm text-xs font-black uppercase tracking-[0.2em] hover:bg-[#0d9466] transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Initiate Support
          </motion.button>
        </div>


      </section>

      {/* Stats Grid */}
      <section className="px-12 -mt-16 relative z-30 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-[#14171F] border border-white/5 p-10 rounded-sm hover:border-[#10b981]/30 transition-all group"
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transparency & Main Form */}
      <section className="px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-start">
        
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-12">Transparency Matters</h2>
          
          <div className="space-y-12 mb-20">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">Direct Aid Execution</h4>
                <p className="text-slate-400 text-sm leading-relaxed">93% of every dollar goes directly to procurement and distribution. No middlemen, no bureaucratic lag.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">Secure Network</h4>
                <p className="text-slate-400 text-sm leading-relaxed">All transactions are logged on a private humanitarian ledger, ensuring auditability in high-risk zones.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">Tax Deductible Recognition</h4>
                <p className="text-slate-400 text-sm leading-relaxed">DisasterX is a registered 501(c)(3) entity. All contributions are fully deductible.</p>
              </div>
            </div>
          </div>

          {/* Current Crisis - Blue section in image */}
          <div className="bg-[#14171F] border-l-4 border-[#10b981] p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe className="w-32 h-32" />
             </div>
             <p className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.3em] mb-4">Urgent Priority</p>
             <h4 className="text-2xl font-black text-white uppercase mb-4">Flood Recovery - Coastal Sector</h4>
             <p className="text-slate-400 text-sm mb-8 max-w-md font-medium">Critical infrastructure restoration and emergency housing for 1,200 families affected by tidal surge displacement.</p>
             
             <div className="space-y-3">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                 <span>{Math.round((raisedAmount / targetAmount) * 100)}% Achieved</span>
                 <span>${(raisedAmount / 1000).toFixed(0)}K Raised</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   key={raisedAmount}
                   initial={{ width: 0 }}
                   animate={{ width: `${(raisedAmount / targetAmount) * 100}%` }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="h-full bg-[#10b981]" 
                 />
               </div>
               <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                 <span>Target ${targetAmount / 1000000}M</span>
                 <span>Remaining ${(targetAmount - raisedAmount).toLocaleString()}</span>
               </div>
             </div>
          </div>
        </div>

        {/* Donation Form Card */}
        <div ref={donationRef} className="bg-[#14171F] p-12 border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#10b981]/10 to-transparent" />
          
          <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] mb-8">Select Amount</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[10, 25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-6 rounded-sm border transition-all ${selectedAmount === amount ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30 hover:text-white'}`}
              >
                <span className="text-xl font-black">${amount}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleDonate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Full Name</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-[#10b981] transition-colors text-sm font-medium" 
                placeholder="Enter Identification" 
                required 
              />
            </div>
            
            <div className="space-y-2 pb-6">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Email Address</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-[#10b981] transition-colors text-sm font-medium" 
                type="email" 
                placeholder="secure@command.org" 
                required 
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-[#10b981] hover:bg-[#0d9466] text-black font-black py-5 rounded-sm flex items-center justify-center gap-3 tracking-[0.2em] transition-all transform active:scale-[0.98] disabled:bg-[#10b981]/50 text-xs shadow-[0_0_40px_rgba(16,185,129,0.2)]"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-black" /> DONATION LOGGED
                </>
              ) : (
                <>
                  CONFIRM DONATION <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-[0.2em] mt-6">
              Your data is protected by high-status-grade encryption.
              <br />
              Transparency is our operational priority.
            </p>
          </form>
        </div>
      </section>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-[#10b981] text-black px-12 py-8 rounded-sm shadow-[0_0_100px_rgba(16,185,129,0.5)] flex flex-col items-center gap-6 border border-white/20 min-w-[400px]"
          >
            <div className="bg-black/10 p-4 rounded-full">
               <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="text-center">
               <p className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-70">Transaction Secured</p>
               <h4 className="text-3xl font-black uppercase tracking-tighter">Thank you for your support</h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Banner - The Time Is Now */}
      <section className="relative py-32 md:py-48 flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/5 bg-[#FBDCD5]">
         <div className="absolute inset-0 z-0">
            <div 
                className="absolute inset-0 bg-no-repeat bg-bottom" 
                style={{ backgroundImage: `url(${charityBanner})`, backgroundSize: '100% auto' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent z-10" />
         </div>
         
         <div className="relative z-20 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black text-[#0A0C10] uppercase tracking-tighter leading-[0.8]"
            >
              The Time <br /> Is Now.
            </motion.h2>
            <div className="flex items-center justify-center gap-3">
               <div className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
               <p className="text-[10px] font-black text-[#0A0C10] uppercase tracking-[0.5em] opacity-60">Response Protocol : Active</p>
            </div>
         </div>
      </section>

      {/* Actual Footer */}
      <footer className="px-12 py-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-[#080A0F]">
         <div className="flex flex-col gap-2 mb-8 md:mb-0">
            <span className="text-sm font-black text-white uppercase tracking-tighter">DISASTER X</span>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">© 2024 DISASTER X. HUMANITARIAN TRANSPARENCY SECURED.</p>
         </div>
         
         <div className="flex gap-8 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            {['Privacy Protocol', 'Archive Access', 'Field Ethos', 'Contact Command'].map(item => (
               <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
         </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        ::placeholder {
          color: rgba(100, 116, 139, 0.5) !important;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.1em;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default Donation;
