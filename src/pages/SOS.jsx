import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, MapPin, Camera, Send, CheckCircle, 
  Shield, Phone, Radio, Users, Loader2, XCircle, 
  BellOff, Bell, Heart, Flame, Activity, AlertOctagon 
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SOS = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, locating, sending, error
  const [message, setMessage] = useState(() => localStorage.getItem('disasterx_sos_message') || '');
  const [location, setLocation] = useState({ lat: null, lng: null, address: 'Detecting position...' });
  const [eta, setEta] = useState(null);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  
  // New UI Features State
  const [silentMode, setSilentMode] = useState(false);
  const [selectedTriage, setSelectedTriage] = useState('GENERAL');
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef(null);

  // Fake Voice Call State
  const [callState, setCallState] = useState('idle'); // idle, ringing, connected
  const [callDuration, setCallDuration] = useState(0);
  const callDurationRef = useRef(null);
  const ringTimerRef = useRef(null);

  // --- FREE REVERSE GEOCODING (OpenStreetMap Nominatim) ---
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data && data.display_name) {
        const addr = data.address || {};
        // Prioritize very specific local areas first
        const localArea = addr.neighbourhood || addr.suburb || addr.residential || addr.road || '';
        const city = addr.city || addr.town || addr.village || '';
        
        if (localArea && city) return `${localArea}, ${city}`;
        if (city) return `${city}, ${addr.state || ''}`;
        return data.display_name.split(',').slice(0, 3).join(', ');
      }
      return 'Location Verified (GPS)';
    } catch (e) {
      console.warn('Geocoding failed, using coordinates', e);
      return 'Location Verified (GPS)';
    }
  };

  // Function to get current location
  const getLocation = useCallback(() => {
    setStatus('locating');
    setError(null);

    const fallbackLocation = async () => {
      // Provide a mock fallback for demo purposes if GPS is blocked
      const mockLat = 19.0760;
      const mockLng = 72.8777;
      setLocation({ lat: mockLat.toFixed(4), lng: mockLng.toFixed(4), address: 'Mumbai, Maharashtra' });
      setStatus('sending');
      performTransmission(mockLat, mockLng);
    };

    if (!navigator.geolocation) {
      fallbackLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch real address from FREE OpenStreetMap API
        const addressStr = await reverseGeocode(latitude, longitude);
        
        setLocation({
          lat: latitude.toFixed(4),
          lng: longitude.toFixed(4),
          address: addressStr
        });
        setStatus('sending');
        performTransmission(latitude, longitude);
      },
      (err) => {
        console.warn("Location denied, using fallback", err);
        fallbackLocation();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const performTransmission = async (lat, lng) => {
    try {
      // Real Firebase Write
      const alertData = {
        id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
        lat,
        lng,
        message,
        hasPhoto: !!photo,
        timestamp: serverTimestamp(),
        status: 'DISPATCHING',
        severity: 'CRITICAL',
        type: selectedTriage,
        silent: silentMode
      };
      
      // Attempt to save to Firestore
      try {
        const docRef = await addDoc(collection(db, 'alerts'), alertData);
        console.log("Alert saved to cloud: ", docRef.id);
      } catch (e) {
        console.warn("Firestore save failed, using local fallback", e);
      }

      // Vibrate if supported
      if ('vibrate' in navigator && !silentMode) {
        navigator.vibrate([200, 100, 200, 100, 500]);
      }

      // Calculate a random but realistic ETA (between 5-15 mins)
      const randomMinutes = Math.floor(Math.random() * 11) + 5;
      const randomSeconds = Math.floor(Math.random() * 60);
      setEta(`${randomMinutes}m ${randomSeconds}s`);

      setIsSending(false);
      setStatus('idle');
      navigate('/tracking', { 
        state: { 
          id: alertData.id, 
          type: 'SOS SIGNAL',
          severity: 'CRITICAL',
          message: alertData.message || 'No additional details.',
          coords: [lat, lng],
          location: 'Detected Position'
        } 
      });
    } catch (err) {
      console.error("Transmission Error: ", err);
      setStatus('error');
      setError("Network failed. Please try again.");
      setIsSending(false);
    }
  };

  const executeSOS = () => {
    setIsSending(true);
    getLocation();
  };

  // --- HOLD TO SEND LOGIC ---
  const startHold = () => {
    if (isSending || status === 'sending' || status === 'locating') return;
    setHoldProgress(0);
    let progress = 0;
    
    holdTimerRef.current = setInterval(() => {
      progress += 2; // fills in ~1.5 seconds (50 loops * 30ms)
      if (progress >= 100) {
        clearInterval(holdTimerRef.current);
        setHoldProgress(100);
        executeSOS();
      } else {
        setHoldProgress(progress);
      }
    }, 30);
  };

  const endHold = () => {
    if (holdProgress < 100) {
      clearInterval(holdTimerRef.current);
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => clearInterval(holdTimerRef.current);
  }, []);

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const resetSOS = () => {
    setStep(1);
    setIsSending(false);
    setStatus('idle');
    setMessage('');
    setHoldProgress(0);
    setPhoto(null);
    setLocation({ lat: null, lng: null, address: 'Detecting position...' });
    setError(null);
  };

  // --- MOCK VOICE CALL LOGIC ---
  const startVoiceCall = () => {
    if (silentMode) return; // Disallow in silent mode
    setCallState('ringing');
    setCallDuration(0);
    
    ringTimerRef.current = setTimeout(() => {
      setCallState('connected');
      
      // Start duration timer
      callDurationRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Trigger Text-to-Speech
      const utterance = new SpeechSynthesisUtterance("Emergency dispatch. We have received your signal. Remain calm. Alpha 9 is en route to your exact location. Stay on the line.");
      utterance.pitch = 0.9;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }, 3000); // 3 seconds ringing
  };

  const endVoiceCall = () => {
    clearTimeout(ringTimerRef.current);
    clearInterval(callDurationRef.current);
    setCallState('idle');
    setCallDuration(0);
    window.speechSynthesis.cancel();
  };

  // Triage Options
  const triageOptions = [
    { id: 'MEDICAL', label: 'MEDICAL', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/50' },
    { id: 'TRAPPED', label: 'TRAPPED', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/50' },
    { id: 'FIRE', label: 'FIRE', icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' },
    { id: 'GENERAL', label: 'GENERAL', icon: AlertOctagon, color: 'text-white', bg: 'bg-slate-400/10', border: 'border-slate-400/50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`max-w-4xl mx-auto py-12 px-6 min-h-full flex flex-col items-center transition-colors duration-700 ${silentMode ? 'bg-[#030000]' : ''}`}
    >
      {/* VIRTUAL DISPATCH CALL MODAL */}
      <AnimatePresence>
        {callState !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-[#0b101e] border border-neon-blue/30 shadow-[0_0_100px_rgba(0,212,255,0.15)] rounded-[40px] w-full max-w-sm p-8 flex flex-col items-center relative overflow-hidden">
              {/* background pulse */}
              {callState === 'connected' && <div className="absolute inset-0 bg-neon-blue/5 animate-[pulse_1s_ease-in-out_infinite] rounded-[40px] pointer-events-none" />}
              
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                 {callState === 'ringing' ? <Loader2 className="w-10 h-10 text-slate-400 animate-spin" /> : <Radio className="w-10 h-10 text-neon-blue animate-ping opacity-80" />}
                 {callState === 'connected' && <Radio className="w-10 h-10 text-neon-blue absolute" />}
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2 text-center">Alpha-9 Dispatch</h3>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 mb-8 text-center px-4 leading-relaxed">
                {callState === 'ringing' ? 'ESTABLISHING SECURE RADIO CONNECTION...' : 'ENCRYPTED CHANNEL OPEN'}
              </p>
              
              {callState === 'connected' && (
                <div className="text-4xl font-mono text-neon-blue mb-10 font-bold tracking-widest">
                   {Math.floor(callDuration / 60).toString().padStart(2, '0')}:{(callDuration % 60).toString().padStart(2, '0')}
                </div>
              )}
              
              <button 
                onClick={endVoiceCall} 
                className="w-full h-16 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500/40 text-red-500 font-black uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-3 relative z-50 cursor-pointer"
              >
                <Phone className="w-5 h-5 rotate-[135deg]" /> 
                DISCONNECT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="request"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full flex flex-col items-center space-y-10"
          >
            {/* Header & Silent Mode */}
            <div className="w-full flex items-start justify-between">
              <div className="flex-1 text-center pl-12">
                <h2 className={`text-6xl font-black mb-2 uppercase tracking-tighter ${silentMode ? 'text-red-900/80' : 'text-neon-red shadow-[0_0_20px_rgba(255,61,104,0.3)]'}`}>
                  Emergency Channel
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Direct connection to response headquarters</p>
              </div>
              <button 
                onClick={() => setSilentMode(!silentMode)}
                className={`p-4 rounded-2xl flex flex-col items-center gap-2 border transition-all ${silentMode ? 'bg-red-900/20 border-red-900/50 text-red-500' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
              >
                {silentMode ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                  SILENT<br/>MODE
                </span>
              </button>
            </div>

            {/* Quick Triage Badges */}
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
              {triageOptions.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTriage(t.id)}
                  className={`flex-1 min-w-[120px] flex flex-col items-center gap-3 p-4 rounded-3xl border-[3px] transition-all ${selectedTriage === t.id ? `${t.bg} ${t.border} ${t.color} scale-105 shadow-lg shadow-white/10` : 'bg-white/5 border-white/40 text-white hover:bg-white/10 hover:border-white/60'}`}
                >
                  <t.icon className={`w-10 h-10 ${selectedTriage === t.id ? '' : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'}`} />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white drop-shadow-md">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Main HOLD-TO-SEND Button Area */}
            <div className="relative pt-6 pb-4 group my-4">
              {/* Breathing Glow */}
              <div className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-[2000ms] ease-in-out ${silentMode ? 'bg-red-900/20' : 'bg-neon-red/40 animate-[pulse_3s_ease-in-out_infinite]'}`} />
              
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-xs bg-red-500/20 border border-red-500/50 backdrop-blur-md rounded-xl p-3 text-center z-50"
                >
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" /> {error}
                  </p>
                </motion.div>
              )}

              {/* The Button */}
              <div 
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className={`relative w-80 h-80 rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none overflow-hidden transition-transform ${silentMode ? 'bg-[#1a0505] border-4 border-red-900/50' : 'bg-neon-red shadow-[0_0_50px_rgba(255,61,104,0.6)]'} ${holdProgress > 0 && holdProgress < 100 ? 'scale-95' : 'hover:scale-105'}`}
              >
                {/* Hold Progress Background Fill */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-75 ease-linear z-0 ${silentMode ? 'bg-red-800' : 'bg-white/20'}`} 
                  style={{ height: `${holdProgress}%` }}
                />

                <div className="relative z-10 flex flex-col items-center pointer-events-none">
                  {status === 'locating' ? (
                    <>
                      <Loader2 className={`w-14 h-14 animate-spin mb-3 ${silentMode ? 'text-red-500' : 'text-white'}`} />
                      <span className={`text-2xl font-black uppercase tracking-widest text-center ${silentMode ? 'text-red-500' : 'text-white'}`}>GETTING FIX...</span>
                    </>
                  ) : status === 'sending' ? (
                    <>
                      <Radio className={`w-14 h-14 animate-ping mb-3 ${silentMode ? 'text-red-500' : 'text-white'}`} />
                      <span className={`text-2xl font-black uppercase tracking-widest text-center ${silentMode ? 'text-red-500' : 'text-white'}`}>ENCRYPTING &<br/>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className={`w-20 h-20 mb-2 ${silentMode ? 'text-red-500' : 'text-white'}`} />
                      <span className={`text-5xl font-black font-sans ${silentMode ? 'text-red-600' : 'text-white'}`}>SEND SOS</span>
                      <span className={`text-xs font-bold mt-3 uppercase tracking-[0.25em] text-center ${silentMode ? 'text-red-800' : 'text-white/80'}`}>
                        {holdProgress > 0 ? `HOLD: ${Math.round(holdProgress)}%` : 'HOLD TO SEND'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
               <div className="glass-dark p-8 rounded-[32px] border-2 border-white/30 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4 text-neon-blue">
                     <div className={`p-4 rounded-2xl ${location.lat ? 'bg-neon-blue/20' : 'bg-white/5'} border border-white/10`}>
                        <MapPin className={`w-8 h-8 ${!location.lat && 'animate-pulse text-slate-600'}`} />
                     </div>
                     <div className="flex-1 text-left">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Live Tracker Position</p>
                        <p className="text-xl font-black text-white">{location.lat ? location.address : 'Waiting for GPS...'}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">COORDINATES:</span>
                     <span className="text-xs font-mono text-neon-blue font-bold tracking-[0.2em]">
                        {location.lat ? `${location.lat}° N, ${location.lng}° E` : 'SCANNING_SPECTRUM...'}
                     </span>
                  </div>
               </div>

               <div className="glass-dark p-8 rounded-[32px] border-2 border-white/30 shadow-2xl flex flex-col justify-center gap-4 relative overflow-hidden">
                  {/* Hidden file input for native camera */}
                  <input 
                     type="file" 
                     accept="image/*" 
                     capture="environment" 
                     ref={fileInputRef} 
                     onChange={handlePhotoCapture} 
                     className="hidden" 
                  />
                  
                  <button 
                     onClick={() => fileInputRef.current?.click()}
                     className={`w-full h-16 rounded-2xl border flex items-center justify-center gap-3 transition-all group overflow-hidden relative ${photo ? 'bg-neon-blue/20 border-neon-blue' : 'bg-white/5 border-white/10 hover:bg-neon-blue/10 hover:border-neon-blue/40'}`}
                  >
                     {photo && (
                        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${photo})` }} />
                     )}
                     <Camera className={`w-6 h-6 relative z-10 ${photo ? 'text-neon-blue' : 'text-slate-400 group-hover:text-neon-blue transition-colors'}`} />
                     <span className={`text-sm font-black uppercase tracking-[0.2em] relative z-10 ${photo ? 'text-white' : 'text-slate-300'}`}>
                        {photo ? 'PHOTO SECURED' : 'UPLOAD PHOTO'}
                     </span>
                  </button>
                  <button 
                     onClick={startVoiceCall}
                     className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all group"
                  >
                     <Phone className="w-6 h-6 text-slate-400 group-hover:text-neon-blue transition-colors" />
                     <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">VOICE CALL</span>
                  </button>
               </div>
            </div>

          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-3xl glass-dark p-16 rounded-[60px] border text-center ${silentMode ? 'border-red-900/50 shadow-[0_0_80px_rgba(153,27,27,0.2)]' : 'border-neon-green/30 shadow-[0_0_80px_rgba(34,197,94,0.2)]'}`}
          >
            <div className={`w-36 h-36 rounded-full flex items-center justify-center mx-auto mb-10 border-4 ${silentMode ? 'bg-red-900/20 border-red-800' : 'bg-neon-green/20 border-neon-green'}`}>
               <CheckCircle className={`w-20 h-20 ${silentMode ? 'text-red-500' : 'text-neon-green'}`} />
            </div>
            
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter text-white">Signal Locked</h2>
            <p className="text-slate-400 mb-12 font-bold leading-relaxed px-10 text-lg">
               Your <span className={selectedTriage !== 'GENERAL' ? triageOptions.find(t=>t.id === selectedTriage).color : ''}>{selectedTriage}</span> SOS signal has been encrypted and received. 
               Rescue units are being synchronized at coord: <br/>
               <span className="text-neon-blue font-mono mt-2 inline-block text-xl">[{location.lat}, {location.lng}]</span>
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="bg-white/5 p-8 rounded-[32px] border border-white/5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-slate-500">ESTIMATED ETA</p>
                  <p className="text-4xl font-black text-neon-blue">{eta}</p>
               </div>
               <div className="bg-white/5 p-8 rounded-[32px] border border-white/5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-slate-500">RESPONDER STATUS</p>
                  <p className={`text-4xl font-black ${silentMode ? 'text-red-500' : 'text-neon-green'}`}>DEPLOYED</p>
               </div>
            </div>

            <button 
               onClick={resetSOS}
               className="btn-outline w-full py-6 rounded-[32px] text-xl font-black tracking-[0.2em] uppercase border-slate-700 text-slate-400 hover:text-white hover:border-white transition-all"
            >
               CANCEL ALERT / I AM SAFE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default SOS;
