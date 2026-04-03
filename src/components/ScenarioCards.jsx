import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Shield, AlertCircle, X, ChevronRight, 
  BookOpen, Info, Flame, CloudRain, AlertTriangle, 
  MapPin, Clock, CheckCircle2, HelpCircle, ArrowRight
} from 'lucide-react';

const scenarios = [
  {
    id: 'quake',
    title: 'Earthquake Survival',
    type: 'Interactive Drill',
    videoUrl: 'https://www.youtube.com/embed/MKILThtPxQs',
    thumbnail: 'bg-gradient-to-br from-amber-600 to-orange-900',
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    description: 'Every second counts during seismic activity. Master the "Drop, Cover, and Hold On" technique.',
    realImpact: 'Over 10,000 significant earthquakes occur globally each year.',
    context: 'Lack of structural awareness causes 90% of preventable injuries.',
    protocol: {
      prepare: [
        { title: 'Secure Heavy Furniture', text: 'Bolt bookcases, TVs, and cabinets to wall studs.' },
        { title: 'Identify Safe Spots', text: 'Find sturdy tables or interior walls in every room.' },
        { title: 'Emergency Kit', text: 'Store 3 days of water, food, and a manual can opener.' }
      ],
      during: [
        { title: 'Drop, Cover, Hold On', text: 'Get on hands and knees, cover head/neck, and hold onto your shelter.' },
        { title: 'Stay Inside', text: 'Do not run outside or use doorways during the shaking.' },
        { title: 'If in Bed', text: 'Stay there and protect your head with a pillow.' }
      ],
      after: [
        { title: 'Check for Gas Leaks', text: 'If you smell gas, shut off the main valve immediately.' },
        { title: 'Expect Aftershocks', text: 'These follow-up tremors can be just as dangerous.' },
        { title: 'Listen to Radio', text: 'Use battery-powered radios for official emergency updates.' }
      ]
    },
    decisionPoints: [
      {
        question: 'The ground starts shaking. You are near a heavy desk and a doorway. What do you do?',
        options: [
          { text: 'Run to the doorway', correct: false, feedback: 'Doorways are not safer than other parts of modern buildings.' },
          { text: 'Drop, Cover, and Hold under the desk', correct: true, feedback: 'Correct! This protects you from falling objects.' },
          { text: 'Run outside immediately', correct: false, feedback: 'Most injuries occur when people try to leave buildings during shaking.' }
        ]
      }
    ]
  },
  {
    id: 'flood',
    title: 'Flash Flood Rescue',
    type: 'Situational Awareness',
    videoUrl: 'https://www.youtube.com/embed/LmCnXWN0Dwc',
    thumbnail: 'bg-gradient-to-br from-blue-600 to-indigo-900',
    icon: <CloudRain className="w-6 h-6 text-blue-400" />,
    description: 'Water levels can rise in minutes. Learn to identify high-ground routes and avoid the "Turn Around, Don\'t Drown" trap.',
    realImpact: 'Floods affect more people globally than any other natural hazard.',
    context: '6 inches of moving water can knock you off your feet.',
    protocol: {
      prepare: [
        { title: 'Know Your Elevation', text: 'Check if your property is in a flood-prone zone.' },
        { title: 'Waterproof Documents', text: 'Store passorts and deeds in sealed containers.' },
        { title: 'Check Sump Pumps', text: 'Ensure your drainage systems are clear and operational.' }
      ],
      during: [
        { title: 'Move Upwards', text: 'Move to the highest floor or a hill immediately.' },
        { title: 'Avoid Moving Water', text: 'Do not walk or drive through flowing water.' },
        { title: 'Switch Off Utilities', text: 'Turn off gas and electricity if told to do so.' }
      ],
      after: [
        { title: 'Avoid Floodwater', text: 'It might be contaminated or electrically charged.' },
        { title: 'Check Foundations', text: 'Look for cracks or sagging before entering homes.' },
        { title: 'Document Damage', text: 'Take photos for insurance before cleaning up.' }
      ]
    },
    decisionPoints: [
      {
        question: 'You encounter a flooded road while driving. The water looks shallow. What is your move?',
        options: [
          { text: 'Drive through slowly', correct: false, feedback: 'Depth is deceptive. Your car could be swept away in 12 inches of water.' },
          { text: 'Turn around and find another route', correct: true, feedback: 'Smart choice. Turn Around, Don\'t Drown!' },
          { text: 'Abandon the car and swim', correct: false, feedback: 'Never enter moving water voluntarily.' }
        ]
      }
    ]
  },
  {
    id: 'fire',
    title: 'Wildfire Evacuation',
    type: 'Rapid Response',
    videoUrl: 'https://www.youtube.com/embed/tWhTdfHQWqs',
    thumbnail: 'bg-gradient-to-br from-red-600 to-rose-900',
    icon: <Flame className="w-6 h-6 text-red-400" />,
    description: 'Strategic evacuation saves lives. Learn the protocols for smoke protection and route planning.',
    realImpact: 'Wildfire seasons are lengthening by 20% on average each decade.',
    context: 'Delayed evacuation is the #1 cause of wildfire fatalities.',
    protocol: {
      prepare: [
        { title: 'Defensible Space', text: 'Clear dry brush 100ft around your home.' },
        { title: 'Air Filtration', text: 'Keep N95 masks and air purifiers ready for smoke.' },
        { title: 'Family Plan', text: 'Decide on two evacuation routes from your area.' }
      ],
      during: [
        { title: 'Leave Early', text: 'If smoke is visible, consider leaving before ordered.' },
        { title: 'Close Openings', text: 'Seal all vents, windows, and doors to keep out embers.' },
        { title: 'Drive Safely', text: 'Keep headlights on and windows rolled up.' }
      ],
      after: [
        { title: 'Wait for Clearance', text: 'Fire can smolder underground for days.' },
        { title: 'Check the Roof', text: 'Monitor for hotspots or hidden embers.' },
        { title: 'Discard Contamination', text: 'Throw away food exposed to high heat or ash.' }
      ]
    },
    decisionPoints: [
      {
        question: 'Ash is falling and smoke is thickening. The official order hasn\'t come yet. What do you do?',
        options: [
          { text: 'Wait for the official alert', correct: false, feedback: 'Don\'t wait. Early evacuation is always safer.' },
          { text: 'Pack immediately and leave', correct: true, feedback: 'Correct. Proactive evacuation prevents getting trapped.' },
          { text: 'Stay and water your roof', correct: false, feedback: 'Personal property is not worth your life. Leave early.' }
        ]
      }
    ]
  }
];

const InteractiveModule = ({ scenario, onClose }) => {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'reading' | 'drill'
  const [drillStep, setDrillStep] = useState('question'); // 'question' | 'feedback'
  const [selectedOption, setSelectedOption] = useState(null);
  const [activePhase, setActivePhase] = useState('prepare');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDrillStep('feedback');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full max-w-[1400px] h-[85vh] bg-[#05080f] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(46,125,233,0.15)] flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between">
           <div>
              <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12">
                 <X className="w-5 h-5" /> CLOSE MODULE
              </button>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-neon-blue uppercase tracking-widest px-4">Training Sequence</p>
                 <button 
                  onClick={() => setActiveTab('video')}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'video' ? 'bg-white text-dark-900 shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}
                 >
                    <Play className="w-5 h-5" /> <span className="font-bold text-sm">Visual Briefing</span>
                 </button>
                 <button 
                  onClick={() => setActiveTab('reading')}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'reading' ? 'bg-white text-dark-900 shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}
                 >
                    <BookOpen className="w-5 h-5" /> <span className="font-bold text-sm">Survivor Protocol</span>
                 </button>
                 <button 
                  onClick={() => setActiveTab('drill')}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'drill' ? 'bg-white text-dark-900 shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}
                 >
                    <HelpCircle className="w-5 h-5" /> <span className="font-bold text-sm">Live Drill</span>
                 </button>
              </div>
           </div>

           <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-neon-blue uppercase tracking-widest mb-2">Module Target</p>
              <h4 className="text-xl font-bold text-white mb-2">{scenario.title}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                 <MapPin className="w-3 h-3" /> Global Standard
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-y-auto no-scrollbar">
           <AnimatePresence mode="wait">
              {activeTab === 'video' && (
                <motion.div key="video" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                   <iframe 
                    className="w-full h-full"
                    src={`${scenario.videoUrl}?autoplay=1&mute=0`}
                    title={scenario.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              )}

              {activeTab === 'reading' && (
                <motion.div key="reading" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-12 h-full flex flex-col">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                      <div className="space-y-4">
                        <span className="inline-block px-4 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-[10px] font-black uppercase tracking-widest">Reading Mode</span>
                        <h3 className="text-4xl md:text-6xl font-black text-white leading-none">THE PROTOCOL</h3>
                      </div>
                      <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                        {['prepare', 'during', 'after'].map((phase) => (
                           <button 
                            key={phase} onClick={() => setActivePhase(phase)}
                            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePhase === phase ? 'bg-white text-dark-900 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                           >
                            {phase}
                           </button>
                        ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {scenario.protocol[activePhase].map((item, idx) => (
                        <motion.div 
                          key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}
                          className="bg-white/[0.03] p-10 rounded-[40px] border border-white/5 hover:border-white/20 transition-all group"
                        >
                           <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 flex items-center justify-center text-neon-blue mb-8 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-6 h-6" />
                           </div>
                           <h4 className="text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
                           <p className="text-slate-400 font-medium leading-relaxed">{item.text}</p>
                        </motion.div>
                      ))}
                   </div>

                   <div className="mt-auto pt-12 flex justify-end">
                      <button 
                        onClick={() => setActiveTab('drill')}
                        className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-neon-blue text-dark-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                      >
                         PROCEED TO LIVE DRILL <ArrowRight className="w-5 h-5" />
                      </button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'drill' && (
                <motion.div key="drill" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-12 h-full flex items-center justify-center">
                   {drillStep === 'question' ? (
                     <div className="max-w-2xl text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-neon-red/10 border border-neon-red text-neon-red text-[10px] font-black uppercase tracking-widest mb-6">Critical Scenario</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-12 leading-tight">{scenario.decisionPoints[0].question}</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {scenario.decisionPoints[0].options.map((opt, i) => (
                            <button 
                              key={i} onClick={() => handleOptionSelect(opt)}
                              className="group flex items-center justify-between p-8 rounded-[32px] bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-white/30 transition-all"
                            >
                              <span className="text-xl font-bold text-slate-300 group-hover:text-white">{opt.text}</span>
                              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-neon-blue group-hover:border-neon-blue transition-all">
                                 <ChevronRight className="w-5 h-5 text-white" />
                              </div>
                            </button>
                          ))}
                        </div>
                     </div>
                   ) : (
                     <div className="max-w-2xl text-center">
                        <div className={`w-24 h-24 rounded-full mx-auto mb-10 flex items-center justify-center ${selectedOption.correct ? 'bg-neon-green/10 text-neon-green shadow-[0_0_50px_rgba(46,255,161,0.1)]' : 'bg-neon-red/10 text-neon-red shadow-[0_0_50px_rgba(255,61,104,0.1)]'}`}>
                           {selectedOption.correct ? <CheckCircle2 className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                        </div>
                        <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">
                          {selectedOption.correct ? 'Survivor Logic Met' : 'System Critical Alert'}
                        </h3>
                        <p className="text-2xl text-slate-400 mb-12 font-medium italic leading-relaxed">
                          "{selectedOption.feedback}"
                        </p>
                        <div className="flex gap-4 justify-center">
                          <button 
                            onClick={() => { setDrillStep('question'); setSelectedOption(null); }}
                            className="px-10 py-5 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                          >
                            RETRAIN CYCLE
                          </button>
                          <button 
                            onClick={onClose}
                            className="px-10 py-5 rounded-2xl bg-white text-dark-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                          >
                            COMPLETE MISSION
                          </button>
                        </div>
                     </div>
                   )}
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const ScenarioCards = () => {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-32 px-6">
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Shield className="w-5 h-5 text-neon-blue" />
            <span className="text-xs font-black text-neon-blue uppercase tracking-[0.3em]">Operational Readiness</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            IMMERSIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-blue-400 to-blue-600">TRAINING</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
            Experience real-world disaster scenarios through visual briefing, survivor protocols, and interactive live drills.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {scenarios.map((scenario) => (
          <motion.div 
            key={scenario.id}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0a0f1d] rounded-[48px] overflow-hidden border border-white/5 transition-all hover:border-white/20 shadow-2xl"
          >
            {/* Thumbnail Area */}
            <div className={`h-64 relative overflow-hidden ${scenario.thumbnail}`}>
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
               <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase font-black text-[10px] tracking-widest text-white">
                  {scenario.icon} {scenario.type}
               </div>
               <button 
                onClick={() => setActiveModule(scenario)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm"
               >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                     <Play className="w-8 h-8 text-black fill-black ml-1" />
                  </div>
               </button>
            </div>

            {/* Content Area */}
            <div className="p-10 space-y-8">
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">{scenario.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{scenario.description}</p>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5">
                     <div className="p-3 rounded-2xl bg-neon-blue/10 text-neon-blue">
                        <Info className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Insight</p>
                        <p className="text-sm font-bold text-slate-300 leading-tight">{scenario.realImpact}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5">
                     <div className="p-3 rounded-2xl bg-neon-red/10 text-neon-red">
                        <Shield className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Survival Rule</p>
                        <p className="text-sm font-bold text-slate-300 leading-tight">{scenario.context}</p>
                     </div>
                  </div>
               </div>

               <button 
                  onClick={() => setActiveModule(scenario)}
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-[24px] bg-white text-dark-900 font-black text-xs uppercase tracking-widest hover:bg-neon-blue transition-colors group/btn"
               >
                  BEGIN TRAINING <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeModule && (activeModule.protocol ? (
          <InteractiveModule 
            scenario={activeModule} 
            onClose={() => setActiveModule(null)} 
          />
        ) : null)}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioCards;
