import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  User as Person, 
  AlertTriangle, 
  Upload as CloudUpload, 
  PhoneCall as AddIcCall, 
  ChevronDown as ExpandMore, 
  Trash2 as Delete, 
  LocateFixed as MyLocation, 
  MapPin as LocationOn, 
  MapPinned as EditLocationAlt, 
  Info, 
  CheckCircle, 
  Gavel, 
  Send, 
  Lock as Encrypted,
  Siren as Emergency,
  Mic
} from 'lucide-react';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map centering and manual clicking
const MapEvents = ({ setPosition, updateAddress }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      updateAddress(lat, lng);
    },
  });

  useEffect(() => {
    // Force a resize check for Leaflet
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  return null;
};

// Component only for recentering
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);
  return null;
};

const IncidentCommanderReport = ({ onReportSubmit }) => {
  const [position, setPosition] = useState([34.0522, -118.2437]); // Default Los Angeles
  const [isTracking, setIsTracking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    isAnonymous: false,
    disasterType: 'Select Disaster Type',
    severity: 'High',
    incidentTime: '',
    description: '',
    location: 'Waiting for GPS signal...'
  });

  // Reverse Geocoding Helper
  const updateAddressString = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setFormData(prev => ({ ...prev, location: address }));
    } catch {
      setFormData(prev => ({ ...prev, location: `Manual Target: ${lat.toFixed(4)}, ${lng.toFixed(4)}` }));
    }
  }, []);

  // Track live location
  const trackLocation = () => {
    if (!navigator.geolocation) {
      setFormData(prev => ({ ...prev, location: "Geolocation unsupported by system" }));
      return;
    }

    setIsTracking(true);
    setFormData(prev => ({ ...prev, location: "Establishing GPS link..." }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        await updateAddressString(latitude, longitude);
        setIsTracking(false);
      },
      (err) => {
        console.error("GPS Error:", err);
        let msg = "Manual Entry Required (GPS Fail)";
        if (err.code === 1) msg = "Location Blocked by User";
        if (err.code === 2) msg = "Position Unavailable (Signal Low)";
        if (err.code === 3) msg = "Locating Timeout (Check Wifi)";
        
        setFormData(prev => ({ ...prev, location: msg }));
        setIsTracking(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    trackLocation();
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = 'en-IN'; // English (India) as default, can be changed to Hindi via 'hi-IN'
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
    };
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, description: prev.description ? prev.description + ' ' + transcript : transcript }));
    };
    rec.onend = () => {
      setIsListening(false);
    };
    rec.onerror = (e) => {
      console.error('Speech recognition error', e);
      setIsListening(false);
    };
    rec.start();
    setRecognition(rec);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const handleSeverityChange = (level) => {
    setFormData({ ...formData, severity: level });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    
    // Simulate a brief transmission delay for tactical feel
    await new Promise(r => setTimeout(r, 1500));
    
    if (onReportSubmit) {
      onReportSubmit(formData);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset success state after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#fcf9f8] font-body text-[#1b1c1c] min-h-screen">
      {/* Container - Wide to consume page but unified */}
      <div className="w-full max-w-[1600px] mx-auto p-6 md:p-12 lg:p-16">
        
        {/* Header Section */}
        <header className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-[#af101a]/10 text-[#af101a] rounded-full text-sm font-bold uppercase tracking-widest">Protocol 4-Alpha</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#af101a] animate-pulse"></span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tight text-[#1b1c1c] mb-6">Report Emergency Incident</h1>
          <p className="text-[#5b403d] max-w-3xl mx-auto text-xl leading-relaxed opacity-80">
            Provide critical details to help our dispatch teams coordinate an immediate response. Your information saves lives.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Form Section - Left Side */}
          <div className="lg:col-span-7 space-y-20">
            {/* Section: Identity */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#f0eded] flex items-center justify-center">
                  <Person className="text-[#af101a] w-6 h-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold">Reporter Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-base font-bold text-[#5b403d] px-1">Full Name</label>
                  <input 
                    className="w-full bg-[#e5e2e1] border-none border-b-2 border-[#8f6f6c] focus:border-[#af101a] focus:ring-0 rounded-t-2xl py-5 px-6 text-lg transition-all" 
                    placeholder="e.g. John Doe" 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-base font-bold text-[#5b403d] px-1">Phone Number</label>
                  <input 
                    className="w-full bg-[#e5e2e1] border-none border-b-2 border-[#8f6f6c] focus:border-[#af101a] focus:ring-0 rounded-t-2xl py-5 px-6 text-lg transition-all" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 px-1">
                <input 
                  className="rounded border-[#e4beba] text-[#af101a] focus:ring-[#af101a] h-6 w-6 cursor-pointer" 
                  id="anon" 
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                />
                <label className="text-base text-[#5b403d] font-semibold cursor-pointer" htmlFor="anon">Keep my report anonymous to the public</label>
              </div>
            </section>

            {/* Section: Incident Specifics */}
            <section className="bg-[#f6f3f2] rounded-[3rem] p-8 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-[#e5e2e1] flex items-center justify-center">
                  <Emergency className="text-[#af101a] w-6 h-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold">Incident Specifics</h3>
              </div>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-base font-bold text-[#5b403d]">Disaster Type</label>
                    <div className="relative">
                      <select 
                        className="w-full appearance-none bg-[#e5e2e1] border-none border-b-2 border-[#8f6f6c] focus:border-[#af101a] focus:ring-0 rounded-t-2xl py-5 px-6 text-lg font-bold pr-12 cursor-pointer"
                        value={formData.disasterType}
                        onChange={(e) => setFormData({ ...formData, disasterType: e.target.value })}
                      >
                        <option disabled>Select Disaster Type</option>
                        <option>Flood</option>
                        <option>Fire</option>
                        <option>Earthquake</option>
                        <option>Landslide</option>
                        <option>Cyclone</option>
                        <option>Industrial Accident</option>
                        <option>Building Collapse</option>
                        <option>Road Accident</option>
                        <option>Other</option>
                      </select>
                      <ExpandMore className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-base font-bold text-[#5b403d]">Severity Level</label>
                    <div className="flex p-1.5 bg-[#e5e2e1] rounded-2xl overflow-hidden">
                      {['Low', 'Medium', 'High'].map((s) => (
                        <button 
                          key={s}
                          onClick={() => handleSeverityChange(s)}
                          className={`flex-1 py-4 text-sm font-black rounded-xl transition-all uppercase tracking-widest ${formData.severity === s ? 'bg-[#af101a] text-white shadow-lg' : 'text-[#9c4400] hover:bg-[#ffdbca]'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-base font-bold text-[#5b403d]">Time of Incident</label>
                    <input 
                      className="w-full bg-[#e5e2e1] border-none border-b-2 border-[#8f6f6c] focus:border-[#af101a] focus:ring-0 rounded-t-2xl py-5 px-6 text-lg font-semibold" 
                      type="datetime-local"
                      value={formData.incidentTime}
                      onChange={(e) => setFormData({ ...formData, incidentTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-base font-bold text-[#5b403d]">Emergency Contact Action</label>
                    <button className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#0058a2]/10 text-[#0058a2] font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-[#0058a2]/20 transition-all border border-[#0058a2]/30 shadow-sm active:scale-95">
                      <AddIcCall className="w-5 h-5" />
                      Alert My Contacts
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-base font-bold text-[#5b403d]">Description of Scene</label>
                  <div className="relative">
                    <textarea 
                      className="w-full bg-[#e5e2e1] border-none border-b-2 border-[#8f6f6c] focus:border-[#af101a] focus:ring-0 rounded-t-2xl py-5 px-6 text-lg transition-all resize-none min-h-[160px]" 
                      placeholder="Describe what you see, any casualties, or immediate threats..." 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      className="absolute right-4 top-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                      disabled={!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)}
                    >
                      <Mic className={`w-5 h-5 ${isListening ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
                    </button>
                    {isListening && (
                      <span className="absolute left-4 bottom-2 text-sm text-red-600 font-medium">Listening...</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Media */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#eae7e7] flex items-center justify-center">
                    <CloudUpload className="text-[#af101a] w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold">Media Proof</h3>
                </div>
                <span className="text-sm font-black text-[#5b403d] uppercase tracking-[0.2em] opacity-40">Max 50MB</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <label className="aspect-square rounded-[2.5rem] border-2 border-dashed border-[#e4beba] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f6f3f2] transition-all group active:scale-95">
                  <CloudUpload className="text-[#8f6f6c] w-10 h-10 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black uppercase text-[#8f6f6c] tracking-widest">Upload</span>
                  <input className="hidden" type="file" />
                </label>
                <div className="aspect-square rounded-[2.5rem] overflow-hidden relative group shadow-md hover:shadow-xl transition-all">
                  <img className="w-full h-full object-cover" alt="Flood illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfBQ-pOCKXzp3gwtjccIm5v3pF92nsCA5VcIwyjouG8yJrG25PzXGV6NA37r5QVkiKaglBVOGbFHTYH3GnlGtjL2q7DItbRlf3lWGPo1VnqOZII5hGzA62dsv36te4QEgNgITnPZUxl0mBujGeR2Kr9VsKkqjGsCFXGAs2J_G9vgDu8sPue5AqRosIFO9RVCGAbN5X8nE02n_Puux0v3S9r7CkbGA5cCdgBBWOdeTomN0oqtJtf1JalIcdTak7WQT9sIBqt7TyeTQ1"/>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="p-3 bg-white rounded-full text-[#af101a] shadow-lg hover:scale-110 transition-transform"><Delete className="w-6 h-6" /></button>
                  </div>
                </div>
                <div className="aspect-square rounded-[2.5rem] overflow-hidden relative group shadow-md hover:shadow-xl transition-all">
                  <img className="w-full h-full object-cover" alt="Fire illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzhTXpnhcZ0Zk5vHew7ZsLSrNpGWv66lmYlnT-IBrLdnlPLabhyEM4b787RSgARGvHHbYybM4UyRyeU_plOsb7aJW12NhgBGgAIEpf5pzoFDicVb1Ec3tFx_Y1RVCj5lmednZkPt-QXfW0wx_Ixep2t9cgYOeypmhC7CJFliesl8qgMATGww79rwgnRtlRp7-KmNk5jGZOLLu5zRpGNM9_IQusIw26YJ2hil9Z-yuieBUgCqyg_YcC1gXI2_39s95RPxw0BnT8q9Jk"/>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="p-3 bg-white rounded-full text-[#af101a] shadow-lg hover:scale-110 transition-transform"><Delete className="w-6 h-6" /></button>
                  </div>
                </div>
                <div className="aspect-square rounded-[2.5rem] bg-[#e5e2e1] flex items-center justify-center shadow-inner">
                  <span className="text-[#5b403d] font-black text-lg tracking-tight">+2 More</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar / Map Section - Right Side */}
          <div className="lg:col-span-5 space-y-16">
            {/* Location Card */}
            <div className="bg-white rounded-[3rem] overflow-hidden p-3 shadow-xl border border-[#e5e2e1]">
              <div className="relative h-[35rem] rounded-[2.5rem] overflow-hidden">
                <MapContainer 
                  center={position} 
                  zoom={16} 
                  className="w-full h-full z-0 cursor-crosshair"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} />
                  <RecenterMap position={position} />
                  <MapEvents setPosition={setPosition} updateAddress={updateAddressString} />
                </MapContainer>
                
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-[1000]">
                  <div className="bg-white/95 backdrop-blur px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                    <span className={`w-2.5 h-2.5 rounded-full ${isTracking ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-800">
                      {isTracking ? 'SCANNING SATELLITES...' : 'SYSTEM ONLINE'}
                    </span>
                  </div>
                  <button 
                    onClick={trackLocation}
                    className={`bg-[#af101a] text-white p-4 rounded-full shadow-2xl active:scale-90 transition-all ring-4 ring-white/20 ${isTracking ? 'animate-spin opacity-50' : 'hover:scale-110'}`}
                  >
                    <MyLocation className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-[1000]">
                  <div className="bg-[#af101a]/95 text-white px-6 py-5 rounded-[2rem] flex items-center gap-4 shadow-2xl backdrop-blur-md border border-white/20 transition-all">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <LocationOn className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black opacity-70 uppercase tracking-[0.1em] leading-none mb-2">Tactical Position</p>
                      <p className="text-lg font-bold leading-tight line-clamp-2">{formData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-center text-[#5b403d] text-sm font-bold mb-4 opacity-60 uppercase tracking-widest">
                  Tap anywhere on the map to set location manually
                </p>
                <button 
                  onClick={trackLocation}
                  className="w-full py-5 text-[#af101a] font-black uppercase tracking-widest text-sm hover:bg-[#af101a]/5 rounded-2xl transition-all flex items-center justify-center gap-3 border-2 border-transparent hover:border-[#af101a]/10"
                >
                  <EditLocationAlt className="w-6 h-6" />
                  Retry Automatic Tracking
                </button>
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-[#0058a2] bg-gradient-to-br from-[#0058a2] to-[#00427c] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <Gavel className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 rotate-12" />
              <h4 className="font-headline text-2xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Info className="w-6 h-6" />
                </div>
                Before Submitting
              </h4>
              <ul className="space-y-6 text-base font-semibold opacity-90">
                <li className="flex gap-4">
                  <CheckCircle className="w-6 h-6 shrink-0 pt-0.5 text-blue-300" />
                  <span>Ensure you are in a safe location before filing this report.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="w-6 h-6 shrink-0 pt-0.5 text-blue-300" />
                  <span>False reporting is a criminal offense punishable by law.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="w-6 h-6 shrink-0 pt-0.5 text-blue-300" />
                  <span>Emergency teams will use your GPS data for routing.</span>
                </li>
              </ul>
            </div>

            {/* Final Action */}
            <div className="space-y-6">
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || isSubmitted}
                className={`w-full bg-gradient-to-br text-white font-headline text-2xl font-black py-8 rounded-[2.5rem] shadow-2xl transition-all flex items-center justify-center gap-4 group ${
                  isSubmitted 
                    ? 'from-emerald-600 to-emerald-800 shadow-emerald-900/40' 
                    : isSubmitting
                      ? 'from-amber-600 to-amber-800 opacity-80 cursor-wait'
                      : 'from-[#af101a] to-[#800c13] shadow-[#af101a]/40 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Transmitting...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-8 h-8" />
                    Report Deployed
                  </>
                ) : (
                  <>
                    Submit Report
                    <Send className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-3 text-[#5b403d] opacity-50">
                <Encrypted className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">End-to-end Encrypted Transmission</span>
              </div>
            </div>

            <footer className="py-12 text-center text-[#5b403d]/30 text-xs font-black uppercase tracking-[0.3em]">
              © 2024 Incident Commander Systems
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentCommanderReport;
