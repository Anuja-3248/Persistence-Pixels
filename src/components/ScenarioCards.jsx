import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD
import {
  Flame, Waves, Wind, Mountain, CloudLightning, Zap,
  CheckCircle2, XCircle, BookOpen, ChevronLeft, ChevronRight,
  Trophy, RotateCcw, CheckCheck
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const scenarios = [
  {
    id: 1,
    icon: Flame,
    category: 'WILDFIRE',
    color: '#ff6b35',
    bg: 'from-orange-950/60 to-red-950/60',
    badge: 'bg-orange-500/20 text-orange-400',
    title: 'Wildfire Survival & Evacuation',
    description:
      "A wildfire can travel faster than you can run. Learn how to evaluate risk, prepare an emergency go-bag, and execute a rapid evacuation before fire cuts off your route.",
    videoId: 'tWhTdfHQWqs',
    dos: [
      'Sign up for emergency alerts in your area',
      'Prepare a go-bag with essentials (water, documents, medication)',
      'Know at least two evacuation routes from your home',
      'Keep car fuelled and pointed toward the exit',
      'Wear long sleeves, pants & N95 mask to reduce smoke inhalation',
      'Follow official evacuation orders immediately',
    ],
    donts: [
      "Never wait to see how big the fire gets before leaving",
      "Don't re-enter an evacuated zone without clearance",
      "Avoid driving through smoke — pull over and stay low",
      "Don't shelter inside a wooden structure",
      "Never use a generator indoors due to carbon monoxide risk",
      "Don't post your evacuation location publicly on social media",
    ],
    quiz: [
      {
        q: "What is the FIRST thing you should do when a wildfire evacuation order is issued?",
        options: ["Wait and monitor the fire", "Leave immediately via your planned route", "Shut all windows and stay indoors", "Call neighbours first"],
        answer: 1,
      },
      {
        q: "Which mask is best to wear during heavy wildfire smoke?",
        options: ["A cloth bandana", "A surgical mask", "An N95 respirator mask", "No mask needed"],
        answer: 2,
      },
      {
        q: "How many evacuation routes should you know from your home?",
        options: ["One is enough", "At least two", "Only the main road", "Routes don't matter"],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    icon: Waves,
    category: 'FLOOD',
    color: '#2e7de9',
    bg: 'from-blue-950/60 to-cyan-950/60',
    badge: 'bg-blue-500/20 text-blue-400',
    title: 'Flash Flood Response Protocol',
    description:
      "Just 15 cm of fast-moving water can knock a person off their feet. Understand flood stages, safe zones, and how to assist others without becoming a victim yourself.",
    videoId: 'LmCnXWN0Dwc',
    dos: [
      'Move immediately to higher ground at first warning',
      'Disconnect electrical appliances before water enters',
      'Store important documents in waterproof containers',
      'Follow official evacuation routes — never shortcuts',
      'Help vulnerable neighbours who cannot evacuate alone',
      'Listen to battery-powered or hand-crank radio for updates',
    ],
    donts: [
      "Never walk or drive through floodwater — 30 cm can sweep a car",
      "Don't touch electrical equipment in or near water",
      "Never return home until authorities declare it safe",
      "Don't drink floodwater — it is heavily contaminated",
      "Avoid bridges over fast-moving water",
      "Don't ignore Road Closed signs",
    ],
    quiz: [
      {
        q: "How much fast-moving floodwater can knock an adult off their feet?",
        options: ["60 cm", "30 cm", "15 cm", "1 metre"],
        answer: 2,
      },
      {
        q: "What should you do FIRST when a flash flood warning is issued?",
        options: ["Stay and watch the water level", "Move immediately to higher ground", "Disconnect the TV", "Call a friend"],
        answer: 1,
      },
      {
        q: "Can you drive through 30 cm of moving floodwater safely?",
        options: ["Yes, if it's a big car", "Yes, slowly", "No — it can sweep away a car", "Only at night"],
        answer: 2,
      },
    ],
  },
  {
    id: 3,
    icon: Mountain,
    category: 'EARTHQUAKE',
    color: '#d97706',
    bg: 'from-amber-950/60 to-yellow-950/60',
    badge: 'bg-amber-500/20 text-amber-400',
    title: 'Earthquake: Drop, Cover & Recover',
    description:
      "Earthquakes strike without warning. This module covers the correct Drop-Cover-Hold protocol, post-quake building assessment, and how to handle trapped survivors.",
    videoId: 'aV89_yUJunM',
    dos: [
      'DROP to hands and knees immediately',
      'Take COVER under a sturdy desk or against an interior wall',
      'HOLD ON until the shaking stops completely',
      'Move away from windows, furniture & heavy objects',
      'If outdoors, move to an open area away from buildings',
      'Check for injuries and provide first aid after shaking stops',
    ],
    donts: [
      "Never stand in a doorway — it offers no extra protection",
      "Don't run outside during shaking",
      "Never use elevators after an earthquake",
      "Don't light candles or matches — gas leaks are common",
      "Avoid coastal areas — tsunami risk follows a quake",
      "Don't enter a damaged building without structural clearance",
    ],
    quiz: [
      {
        q: "What is the correct earthquake safety action?",
        options: ["Stand in a doorway", "Run outside immediately", "Drop, Cover and Hold On", "Hide under a bed"],
        answer: 2,
      },
      {
        q: "Why should you NOT light candles or matches after an earthquake?",
        options: ["They attract attention", "Gas leaks may have occurred", "They cause more shaking", "No reason"],
        answer: 1,
      },
      {
        q: "Is a doorway the safest place during an earthquake?",
        options: ["Yes, always", "Only in old buildings", "No — it offers no special protection", "Only in modern buildings"],
        answer: 2,
      },
    ],
  },
  {
    id: 4,
    icon: Wind,
    category: 'CYCLONE',
    color: '#7c3aed',
    bg: 'from-violet-950/60 to-purple-950/60',
    badge: 'bg-violet-500/20 text-violet-400',
    title: 'Cyclone Shelter & Survival',
    description:
      "Category-4 winds can uproot trees and collapse walls. Understand cyclone categories, how to fortify your home, and what to do when the deceptive eye passes over.",
    videoId: 'vth5naFEHUQ',
    dos: [
      'Board up windows and secure doors with storm shutters',
      'Store at least 3 days of water (4 L per person per day)',
      'Charge all devices and keep power banks ready',
      'Move to the smallest interior room on the lowest floor',
      'Stay indoors when the eye passes — the storm will resume',
      'Report fallen power lines to authorities immediately',
    ],
    donts: [
      "Never shelter in a mobile home or caravan",
      "Don't open windows to equalise pressure — this is a myth",
      "Avoid standing near windows or glass doors",
      "Don't venture outside during the eye of the storm",
      "Never use candles — fire risk is high during power cuts",
      "Don't drive unless under an official evacuation order",
    ],
    quiz: [
      {
        q: "When is the MOST dangerous time to go outside during a cyclone?",
        options: ["Before it starts", "During the eye when it seems calm", "After the storm passes", "During heavy rain"],
        answer: 1,
      },
      {
        q: "How much water should you store per person per day for a cyclone?",
        options: ["1 litre", "2 litres", "4 litres", "10 litres"],
        answer: 2,
      },
      {
        q: "Which structure is LEAST safe during a cyclone?",
        options: ["Brick house", "Concrete building", "Mobile home or caravan", "Multi-storey building"],
        answer: 2,
      },
    ],
  },
  {
    id: 5,
    icon: CloudLightning,
    category: 'TSUNAMI',
    color: '#0891b2',
    bg: 'from-cyan-950/60 to-teal-950/60',
    badge: 'bg-cyan-500/20 text-cyan-400',
    title: 'Tsunami Warning & Evacuation',
    description:
      "A tsunami can travel at 800 km/h across the ocean and still offer minutes of warning on shore. Learn the natural signs, vertical evacuation, and community alert systems.",
    videoId: 'N_un67nbe7k',
    dos: [
      'If you feel strong shaking near the coast, move inland immediately',
      'Act on natural warnings: ocean receding, loud roaring sound',
      'Reach high ground at least 30 m above sea level',
      'Stay inland until officials give the all-clear',
      'Help children and elderly reach higher ground first',
      'Know your local tsunami evacuation map and signs',
    ],
    donts: [
      "Never go to the beach to watch a tsunami approach",
      "Don't assume the first wave is the last — there are many",
      "Don't rely only on sirens — act on natural signs too",
      "Avoid low-lying bridges and coastal roads during alert",
      "Never return to shore until multiple-hour all-clear is issued",
      "Don't use elevators in coastal buildings during evacuation",
    ],
    quiz: [
      {
        q: "What natural sign indicates a tsunami may be coming?",
        options: ["Heavy rain", "Ocean suddenly receding far back", "Birds flying away", "Fog on the water"],
        answer: 1,
      },
      {
        q: "How high should you be on land to be safe from a tsunami?",
        options: ["5 metres", "10 metres", "30 metres or more", "Any hill will do"],
        answer: 2,
      },
      {
        q: "Is the first tsunami wave always the biggest?",
        options: ["Yes, always", "No — later waves can be much larger", "Only in the Pacific", "It depends on the earthquake"],
        answer: 1,
      },
    ],
  },
  {
    id: 6,
    icon: Zap,
    category: 'LANDSLIDE',
    color: '#16a34a',
    bg: 'from-green-950/60 to-emerald-950/60',
    badge: 'bg-green-500/20 text-green-400',
    title: 'Landslide Early Warning & Safety',
    description:
      "Heavy rains and seismic activity can trigger deadly landslides with little notice. Identify early warning signs, safe zones, and rescue techniques for debris-buried survivors.",
    videoId: 'GptY4m6s1qQ',
    dos: [
      'Watch for cracks in hillsides, foundations or road surfaces',
      'Evacuate immediately if you notice tilting trees or utility poles',
      'Move away from the slide path — sideways is safer than straight down',
      'Listen for unusual sounds (cracking, rumbling from hillside)',
      'Contact local emergency services to report unstable slopes',
      'Apply first aid for trauma injuries to slide survivors',
    ],
    donts: [
      "Never build homes at the base of steep unstable slopes",
      "Don't re-enter a slide area — secondary slides are common",
      "Avoid stream channels during and after heavy rain",
      "Never try to outrun a landslide directly downhill",
      "Don't ignore Slope Instability warnings from geologists",
      "Avoid driving on roads adjacent to steep hills during rain",
    ],
    quiz: [
      {
        q: "Which direction should you move to escape a landslide?",
        options: ["Run straight downhill", "Stay still and shelter in place", "Move sideways out of the slide path", "Run uphill directly"],
        answer: 2,
      },
      {
        q: "What is a key visual warning sign of an impending landslide?",
        options: ["Heavy fog", "Cracks appearing in hillsides or roads", "Loud thunder", "Bright sky"],
        answer: 1,
      },
      {
        q: "Is it safe to re-enter a landslide area immediately after the slide stops?",
        options: ["Yes, immediately", "Only with a torch", "No — secondary slides are common", "Yes, after 10 minutes"],
        answer: 2,
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   QUIZ COMPONENT
───────────────────────────────────────────── */
const Quiz = ({ questions, color }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswered(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center space-y-4"
      >
        <Trophy className="w-10 h-10 mx-auto" style={{ color }} />
        <h4 className="text-xl font-black text-white">Quiz Complete!</h4>
        <p className="text-slate-400 text-sm">
          You scored <span className="font-black text-white">{score}/{questions.length}</span> ({pct}%)
        </p>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
        <p className="text-xs font-bold text-slate-500">
          {pct === 100 ? "Perfect score! You're ready." : pct >= 67 ? "Good job! Review the missed ones." : "Keep practicing — review the Do's & Don'ts above."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" style={{ color }} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Knowledge Quiz
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
        <motion.div
          animate={{ width: `${((current) / questions.length) * 100}%` }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          className="text-sm font-bold text-white leading-snug"
        >
          {q.q}
        </motion.p>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {q.options.map((opt, i) => {
          let cls = "text-left w-full px-4 py-3 rounded-xl text-xs font-bold transition-all border ";
          if (!answered) {
            cls += "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06] cursor-pointer";
          } else if (i === q.answer) {
            cls += "border-emerald-500/50 bg-emerald-950/40 text-emerald-300 cursor-default";
          } else if (i === selected && i !== q.answer) {
            cls += "border-rose-500/50 bg-rose-950/40 text-rose-300 cursor-default";
          } else {
            cls += "border-white/5 bg-white/[0.02] text-slate-500 cursor-default";
          }
          return (
            <motion.button
              key={i}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
              className={cls}
              onClick={() => handleSelect(i)}
            >
              <span className="font-black mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
              {opt}
              {answered && i === q.answer && <CheckCheck className="inline w-3.5 h-3.5 ml-2 text-emerald-400" />}
            </motion.button>
          );
        })}
      </div>

      {answered && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-white"
          style={{ background: color + 'cc' }}
        >
          {current < questions.length - 1 ? "Next Question →" : "See Results →"}
        </motion.button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   SIDEBAR CARD
───────────────────────────────────────────── */
const SideCard = ({ scenario, isActive, onClick }) => {
  const Icon = scenario.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl border p-4 transition-all duration-300"
      style={{
        borderColor: isActive ? scenario.color + '70' : 'rgba(255,255,255,0.05)',
        background: isActive ? scenario.color + '12' : 'rgba(255,255,255,0.015)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isActive ? scenario.color + '22' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${scenario.color}33`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: scenario.color }} />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] font-black tracking-[0.25em] uppercase truncate" style={{ color: scenario.color }}>
            {scenario.category}
          </p>
          <p className="text-xs font-bold text-white leading-tight truncate">{scenario.title}</p>
=======
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
        </div>
      </div>
    </motion.div>
  );
};

<<<<<<< HEAD
/* ─────────────────────────────────────────────
   TAB BAR
───────────────────────────────────────────── */
const tabs = ['Video', "Do's & Don'ts", 'Quiz'];

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
const ScenarioCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const active = scenarios[activeIndex];
  const Icon = active.icon;

  // reset tab to Video when switching scenario
  const switchScenario = (i) => {
    setActiveIndex(i);
    setTab(0);
  };

  const prev = () => switchScenario((activeIndex - 1 + scenarios.length) % scenarios.length);
  const next = () => switchScenario((activeIndex + 1) % scenarios.length);

  return (
    <div className="py-28 px-6 md:px-12 max-w-[1400px] mx-auto">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 space-y-5"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/25">
          <BookOpen className="w-4 h-4 text-neon-blue" />
          <span className="text-[10px] font-black text-neon-blue uppercase tracking-[0.3em]">
            Immersive Training
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05]">
          Learn to Survive
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-purple-400 to-rose-400">
            Every Disaster
          </span>
        </h2>

        <p className="text-slate-400 text-base font-medium max-w-xl mx-auto leading-relaxed">
          Watch expert-guided video walkthroughs, study the critical Do's &amp; Don'ts, and test your readiness with a knowledge quiz — for every major disaster type.
        </p>
      </motion.div>

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-8">

        {/* ── Scenario List (left) ── */}
        <div className="flex flex-col gap-2.5">
          {scenarios.map((s, i) => (
            <SideCard key={s.id} scenario={s} isActive={i === activeIndex} onClick={() => switchScenario(i)} />
          ))}
        </div>

        {/* ── Detail Panel (right) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1 rounded-full border ${active.badge}`}
                  style={{ borderColor: active.color + '40' }}
                >
                  <Icon className="w-3 h-3" />
                  {active.category}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">{active.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{active.description}</p>
              </div>
            </div>

            {/* ── TAB BAR ── */}
            <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/5 w-fit">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className="relative px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors"
                  style={{ color: tab === i ? '#fff' : 'rgba(148,163,184,0.8)' }}
                >
                  {tab === i && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: active.color + '33', border: `1px solid ${active.color}55` }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              ))}
            </div>

            {/* ── TAB CONTENT ── */}
            <AnimatePresence mode="wait">

              {/* VIDEO TAB */}
              {tab === 0 && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
                    style={{ aspectRatio: '16/9', border: `1px solid ${active.color}30` }}
                  >
                    <iframe
                      key={active.videoId}
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${active.videoId}?rel=0&modestbranding=1&showinfo=0&color=white`}
                      title={active.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <p className="text-[10px] text-slate-600 font-medium">
                      Video sourced from YouTube
                    </p>
                    <a 
                      href={`https://www.youtube.com/watch?v=${active.videoId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold underline transition-opacity hover:opacity-70"
                      style={{ color: active.color }}
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </motion.div>
              )}

              {/* DOS & DONTS TAB */}
              {tab === 1 && (
                <motion.div
                  key="dosdonts"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {/* Do's */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Do's</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {active.dos.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-2.5 text-xs text-slate-300 font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Don'ts</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {active.donts.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-2.5 text-xs text-slate-300 font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* QUIZ TAB */}
              {tab === 2 && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Quiz questions={active.quiz} color={active.color} />
                </motion.div>
              )}

            </AnimatePresence>

            {/* ── Prev / Next Navigation ── */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={prev}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <div className="flex gap-2">
                {scenarios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => switchScenario(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i === activeIndex ? active.color : 'rgba(255,255,255,0.15)',
                      transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
=======
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
>>>>>>> 849247728b38486012928a87a3e626f14224a596
    </div>
  );
};

export default ScenarioCards;
