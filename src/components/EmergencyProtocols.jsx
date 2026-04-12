import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const protocols = [
  {
    title: 'Landslide',
    image: 'https://images.pexels.com/photos/12093847/pexels-photo-12093847.jpeg?auto=compress&cs=tinysrgb&w=800',
    dos: [
      'Prepare tour to hilly region according to information given by weather department or news channel.',
      'Move away from landslide path or downstream valleys quickly without wasting time.'
    ],
    donts: [
      'Try to avoid construction and staying in vulnerable areas.',
      'Do not panic and loose energy by crying.'
    ]
  },
  {
    title: 'Tsunami',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    dos: [
      'Know the height of your street above sea level and the distance of your street from the coast.',
      'Plan evacuation routes from your home, school, workplace or any other place you could be.',
      'Practice your evacuation routes.'
    ],
    donts: [
      'Move immediately to higher ground, DO NOT wait for a tsunami warning to be announced.'
    ]
  },
  {
    title: 'Cyclone',
    image: 'https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg?auto=compress&cs=tinysrgb&w=800',
    dos: [
      'Check the house; secure loose tiles and carry out repairs of doors and windows.',
      'Keep some wooden boards ready so that glass windows can be boarded if needed.',
      'Keep a hurricane lantern filled with kerosene, battery operated torches and enough dry cells.'
    ],
    donts: [
      'DO NOT venture out even when the winds appear to calm down.'
    ]
  },
  {
    title: 'Forest Fire',
    image: 'https://images.pexels.com/photos/35544/fire-flames-heat-burn.jpg?auto=compress&cs=tinysrgb&w=800',
    dos: [
      'Keep emergency contact numbers of district fire service department and local forest authorities handy.',
      'Immediately inform them in case of an unattended or out-of-control fire.'
    ],
    donts: [
      'Do not burn stubble, municipal waste, etc. next to a forest area.',
      'Do not burn dry waste in farms close to forest areas.'
    ]
  }
];

const EmergencyProtocols = () => {
  return (
    <section className="relative z-10 py-20 px-6 md:px-12 bg-[#f8fafc] w-full">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-14 space-y-3 font-sans text-left">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0f2e6e] tracking-tight">
            Emergency Protocols: Do's & Don'ts
          </h2>
          <p className="text-[17px] text-slate-500 max-w-3xl mx-auto font-serif" style={{ color: '#6b7280' }}>
            Essential survival guidelines and protective actions for critical weather events and natural <br className="hidden md:block" /> disasters.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 font-serif">
          {protocols.map((protocol, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-[4px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full border border-slate-100"
            >
              {/* Card Image Header */}
              <div className="h-44 relative overflow-hidden">
                <img 
                  src={protocol.image} 
                  alt={protocol.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-[19px] font-bold tracking-wide font-serif">
                  {protocol.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-7 flex flex-col flex-1" style={{ color: '#4b5563' }}>
                <div className="flex-1">
                  
                  {/* DOs List */}
                  <div className="space-y-4 mb-5">
                    {protocol.dos.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-[18px] h-[18px] rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0 mt-[2px]">
                          <Check className="w-[10px] h-[10px] text-[#16a34a]" strokeWidth={4} />
                        </div>
                        <p className="text-[12px] md:text-[13px] leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Dashed Separator */}
                  <div className="w-full border-t border-dashed border-slate-200 my-5" />

                  {/* DONTs List */}
                  <div className="space-y-4">
                    {protocol.donts.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-[18px] h-[18px] rounded-full bg-[#ffe4e6] flex items-center justify-center shrink-0 mt-[2px]">
                          <X className="w-[10px] h-[10px] text-[#e11d48]" strokeWidth={4} />
                        </div>
                        <p className="text-[12px] md:text-[13px] leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* View More Button */}
                <div className="mt-8 text-right font-sans">
                  <button className="text-[#0f2e6e] text-[13px] font-bold hover:text-blue-700 transition-colors tracking-wide">
                    View More +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EmergencyProtocols;
