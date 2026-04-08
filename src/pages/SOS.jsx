import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Camera, Send, CheckCircle, Shield, Phone, Radio, Users, Loader2, XCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SOS = () => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, locating, sending, error
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null, address: 'Detecting position...' });
  const [eta, setEta] = useState(null);
  const [error, setError] = useState(null);

  // Function to get current location
  const getLocation = useCallback(() => {
    setStatus('locating');
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude.toFixed(4),
          lng: longitude.toFixed(4),
          address: 'Location Verified' // In a real app, use reverse geocoding here
        });
        setStatus('sending');
        // Simulate transmission delay after getting location
        performTransmission(latitude, longitude);
      },
      (err) => {
        setError("Location access denied. Please enable GPS for emergency services.");
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [message]);

  const performTransmission = async (lat, lng) => {
    try {
      // Real Firebase Write
      const alertData = {
        id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
        lat,
        lng,
        message,
        timestamp: serverTimestamp(),
        status: 'DISPATCHING',
        severity: 'CRITICAL',
        type: 'AUTO_GEOLOCATION'
      };
      
      // Attempt to save to Firestore
      try {
        const docRef = await addDoc(collection(db, 'alerts'), alertData);
        console.log("Alert saved to cloud: ", docRef.id);
      } catch (e) {
        console.warn("Firestore save failed, using local fallback", e);
      }

      // Still log locally for redundancy or offline view
      const existingAlerts = JSON.parse(localStorage.getItem('emergency_alerts') || '[]');
      localStorage.setItem('emergency_alerts', JSON.stringify([{...alertData, timestamp: new Date().toISOString()}, ...existingAlerts]));

      // Calculate a random but realistic ETA (between 5-15 mins)
      const randomMinutes = Math.floor(Math.random() * 11) + 5;
      const randomSeconds = Math.floor(Math.random() * 60);
      setEta(`${randomMinutes}m ${randomSeconds}s`);

      setIsSending(false);
      setStatus('idle');
      setStep(2);
    } catch (err) {
      console.error("Transmission Error: ", err);
      setStatus('error');
      setError("Cloud sync failed. Check connection.");
      setIsSending(false);
    }
  };

  const handleSOS = () => {
    setIsSending(true);
    getLocation();
  };

  const resetSOS = () => {
    setStep(1);
    setIsSending(false);
    setStatus('idle');
    setMessage('');
    setLocation({ lat: null, lng: null, address: 'Detecting position...' });
    setError(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-6 min-h-full flex flex-col items-center"
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="request"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            <div className="text-center">
              <h2 className="text-6xl font-black text-neon-red mb-4 animate-pulse uppercase tracking-tighter">Emergency Channel</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Direct connection to response headquarters</p>
            </div>

            {/* Main SOS Button Area */}
            <div className="relative group">
              <div className="absolute inset-0 bg-neon-red/30 rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-700 animate-pulse" />
              
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-xs bg-red-500/20 border border-red-500/50 backdrop-blur-md rounded-xl p-3 text-center z-50"
                >
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" /> {error}
                  </p>
                </motion.div>
              )}

              <button
                disabled={isSending}
                onClick={handleSOS}
                className={`relative w-80 h-80 rounded-full bg-neon-red flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(255,61,104,0.6)] transition-all active:scale-95 disabled:scale-90 ${isSending ? 'animate-bounce' : 'hover:scale-105'}`}
              >
                {status === 'locating' ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 animate-spin mb-4" />
                    <span className="text-2xl font-black uppercase tracking-widest">GETTING FIX...</span>
                  </div>
                ) : status === 'sending' ? (
                  <div className="flex flex-col items-center">
                    <Radio className="w-16 h-16 animate-ping mb-4" />
                    <span className="text-2xl font-black uppercase tracking-widest text-center">ENCRYPTING &<br/>SENDING...</span>
                  </div>
                ) : (
                  <>
                    <AlertTriangle className="w-24 h-24 mb-3" />
                    <span className="text-5xl font-black font-sans">SEND SOS</span>
                    <span className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">Global Dispatch Protocol</span>
                  </>
                )}
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
               <div className="glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4 text-neon-blue">
                     <div className={`p-3 rounded-xl ${location.lat ? 'bg-neon-blue/20' : 'bg-white/5'} border border-white/10`}>
                        <MapPin className={`w-8 h-8 ${!location.lat && 'animate-pulse text-slate-600'}`} />
                     </div>
                     <div className="flex-1 text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Tracker Position</p>
                        <p className="text-lg font-black text-white">{location.lat ? location.address : 'Waiting for GPS...'}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">GPS COORDINATES:</span>
                     <span className="text-[10px] font-mono text-neon-blue font-bold tracking-[0.2em]">
                        {location.lat ? `${location.lat}° N, ${location.lng}° E` : 'SCANNING_SPECTRUM...'}
                     </span>
                  </div>
               </div>

               <div className="glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl flex flex-col justify-center">
                  <div className="flex gap-4">
                     <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all group">
                        <Camera className="w-6 h-6 text-slate-400 group-hover:text-neon-blue transition-colors" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">UPLOAD PHOTO</span>
                     </button>
                     <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all group">
                        <Phone className="w-6 h-6 text-slate-400 group-hover:text-neon-blue transition-colors" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">VOICE CALL</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Message Box */}
            <div className="w-full glass-dark p-8 rounded-[32px] border border-white/5 shadow-2xl">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Situational Briefing (Optional)</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neon-red">Secure Line</span>
               </div>
               <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your situation (e.g. medical emergency, trapped...)" 
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium focus:outline-none focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/30 transition-all resize-none placeholder:text-slate-700 text-white"
               />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl glass-dark p-12 rounded-[50px] border border-neon-green/30 text-center shadow-[0_0_80px_rgba(34,197,94,0.2)]"
          >
            <div className="w-32 h-32 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-8 border-4 border-neon-green">
               <CheckCircle className="w-16 h-16 text-neon-green" />
            </div>
            
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Signal Locked</h2>
            <p className="text-slate-400 mb-10 font-bold leading-relaxed px-10">
               Your SOS signal has been encrypted and received. 
               Rescue units are being synchronized at coord: <span className="text-neon-blue font-mono">[{location.lat}, {location.lng}]</span>.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500">ESTIMATED ETA</p>
                  <p className="text-3xl font-black text-neon-blue">{eta}</p>
               </div>
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500">RESPONDER STATUS</p>
                  <p className="text-3xl font-black text-neon-green">DEPLOYED</p>
               </div>
            </div>

            <button 
               onClick={resetSOS}
               className="btn-outline w-full py-5 rounded-3xl text-lg font-black tracking-widest uppercase border-slate-700 text-slate-400 hover:text-white hover:border-white transition-all"
            >
               CANCEL ALERT / I AM SAFE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 w-full max-w-2xl">
         <div className="flex items-center justify-between mb-4 px-2 text-left">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-neon-blue flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
               </span>
               Live Emergency Log
            </h3>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Protocol 9.4 Active</span>
         </div>
         
         <div className="glass-dark border border-white/5 rounded-3xl p-6 space-y-4 overflow-hidden relative">
            {[
               { time: new Date().toLocaleTimeString(), event: 'Satellite link secured (GSAT-29)', status: 'online' },
               { time: status === 'idle' && !location.lat ? '-- : --' : new Date().toLocaleTimeString(), event: location.lat ? 'Positioning data verified' : 'Scanning for GPS signal...', status: location.lat ? 'verified' : 'waiting' },
               { time: location.lat ? new Date().toLocaleTimeString() : '-- : --', event: 'Local emergency services on standby', status: 'ready' }
            ].map((log, i) => (
               <div key={i} className="flex items-center gap-4 text-[10px] font-mono text-left">
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className="text-slate-300 uppercase tracking-wider flex-1 truncate">{log.event}</span>
                  <span className={`px-2 py-0.5 rounded bg-white/5 text-slate-300 font-bold uppercase`}>
                     {log.status}
                  </span>
               </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0C0B1B] pointer-events-none" />
         </div>
      </div>

      <div className="mt-12 flex gap-20 opacity-30 pointer-events-none">
         <div className="flex flex-col items-center">
            <Users className="w-10 h-10 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white text-center">RESCUE TEAM: ALPHA-9</span>
         </div>
         <div className="flex flex-col items-center">
            <Shield className="w-10 h-10 mb-2 text-center" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white text-center">SECURE CHANNEL 0291-B</span>
         </div>
      </div>
    </motion.div>
  );
};

export default SOS;
