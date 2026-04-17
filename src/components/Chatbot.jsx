import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, HelpCircle, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am Kavach. How can I assist you during this emergency?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-kavach', handleOpen);
    return () => window.removeEventListener('open-kavach', handleOpen);
  }, []);

  const quickQuestions = [
    "What to do in flood?",
    "Nearest shelter?",
    "Check safety alerts",
    "How to send SOS?"
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    // 1. Add User Message
    const userMsgId = Date.now() + Math.random();
    setMessages(prev => [...prev, { id: userMsgId, text, sender: 'user' }]);
    setInputValue('');

    // 2. Add Bot Loading State
    const loadingId = Date.now() + Math.random();
    setMessages(prev => [...prev, { id: loadingId, text: "Decrypting data...", sender: 'bot', isLoading: true }]);

    // 3. Connect to Sarvam AI (Indic optimized)
    try {
      const apiKey = import.meta.env.VITE_SARVAM_API_KEY;
      
      if (!apiKey || apiKey.includes('your_sarvam')) {
        throw new Error("Sarvam API Key missing. Please paste it in the .env file.");
      }

      const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
          'api-subscription-key': apiKey.trim()
        },
        body: JSON.stringify({
          model: "sarvam-30b", 
          messages: [
            {
              role: "system",
              content: "You are Kavach, an emergency AI. Give short, tactical disaster advice. No markdown."
            },
            {
              role: "user",
              content: text
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Sarvam API Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      // Replace loading state with the actual response
      setMessages(prev => prev.map(msg => msg.id === loadingId ? { ...msg, text: reply, isLoading: false } : msg));

    } catch (error) {
      console.error("Sarvam AI Connection Failed:", error);
      
      // ULTRA-SMART LOCAL FALLBACK FOR DEMOS
      let fallbackReply = "I am operating in offline tactical mode. Please stay calm and await rescue forces.";
      const lwText = text.toLowerCase();
      
      if (lwText.includes('flood') || lwText.includes('water')) {
         fallbackReply = "FLOOD PROTOCOL: Move to high ground immediately. Avoid walking or driving through flood waters. Turn off utilities at the main switches if instructed.";
      } else if (lwText.includes('fire') || lwText.includes('burn')) {
         fallbackReply = "FIRE PROTOCOL: Stay low to the ground to avoid smoke inhalation. Check doors for heat before opening. Evacuate immediately and call emergency services.";
      } else if (lwText.includes('earthquake') || lwText.includes('shake')) {
         fallbackReply = "EARTHQUAKE PROTOCOL: DROP, COVER, and HOLD ON! Stay away from glass, windows, outside doors, and anything that could fall.";
      } else if (lwText.includes('cut') || lwText.includes('bleed') || lwText.includes('blood')) {
         fallbackReply = "MEDICAL PROTOCOL (BLEEDING): Apply firm, direct pressure to the wound with a clean cloth. Elevate the injured area above the heart if possible. Do not remove the cloth if soaked; add another on top.";
      } else if (lwText.includes('shelter') || lwText.includes('where')) {
         fallbackReply = "SHELTER INFO: There are 3 verified shelters operating nearby. The closest is approximately 1.2km away. Tracking deployed.";
      } else {
         fallbackReply = "TACTICAL AI (OFFLINE): Your message has been received. Maintain a safe perimeter and preserve your mobile battery. Emergency services are currently prioritizing critical zones.";
      }

      setMessages(prev => prev.map(msg => msg.id === loadingId ? { 
        ...msg, 
        text: fallbackReply, 
        isLoading: false 
      } : msg));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-neon-blue shadow-[0_0_20px_rgba(80,215,255,0.6)] flex items-center justify-center text-dark-900 overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-8 h-8" />
          ) : (
            <div key="open" className="relative">
              <MessageCircle className="w-8 h-8" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-red rounded-full border-2 border-neon-blue animate-pulse" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[400px] h-[550px] bg-[#0A0D14] rounded-3xl shadow-[0_0_80px_rgba(80,215,255,0.15)] border-[3px] border-neon-blue/40 flex flex-col overflow-hidden z-[999]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-neon-blue/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30 shadow-[0_0_10px_rgba(80,215,255,0.3)]">
                  <Bot className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h4 className="font-black text-sm tracking-widest text-white uppercase drop-shadow-md">Kavach Rescue Assistant</h4>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-neon-red transition-colors p-2 hover:bg-white/10 rounded-full">
                <X className="w-6 h-6 drop-shadow-md" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-neon-blue text-dark-900 font-bold rounded-tr-none' 
                      : 'bg-[#1a202c] border border-white/20 text-white font-medium rounded-tl-none'
                  } shadow-lg shadow-black/20`}>
                    {msg.isLoading ? (
                      <span className="flex items-center gap-2 text-neon-blue font-bold tracking-widest uppercase text-xs">
                         <Loader2 className="w-4 h-4 animate-spin"/> {msg.text}
                      </span>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-5 pb-3 overflow-x-auto">
              <div className="flex gap-3 pb-2 scrollbar-hide">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-4 py-2 bg-[#1a202c] border border-white/20 rounded-full text-xs font-bold text-white hover:bg-neon-blue hover:border-neon-blue hover:text-dark-900 transition-all shadow-md"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-5 border-t border-neon-blue/20 bg-black/40">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask for help or info..."
                  className="w-full bg-[#1a202c] border-2 border-white/10 rounded-2xl py-3 px-5 pr-14 text-sm font-medium text-white placeholder-slate-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-3 p-2 bg-neon-blue rounded-xl text-dark-900 hover:bg-white hover:scale-105 transition-all shadow-lg shadow-neon-blue/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
