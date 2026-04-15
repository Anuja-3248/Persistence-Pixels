import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Bot, HelpCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am Kavach. How can I assist you during this emergency?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    "What to do in flood?",
    "Nearest shelter?",
    "Check safety alerts",
    "How to send SOS?"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text, sender: 'user' }]);
    setInputValue('');

    // Mock response
    setTimeout(() => {
      let response = "I'm analyzing your request. Please stay calm and follow local authority guidelines.";
      if (text.toLowerCase().includes('flood')) {
        response = "In case of a flood: Move to high ground immediately. Avoid walking or driving through flood waters. Turn off utilities if instructed.";
      } else if (text.toLowerCase().includes('shelter')) {
        response = "There are 3 shelters nearby in Pune: Pune Central High, PMC Community Center, and Deccan Gymkhana. Would you like directions?";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
    }, 1000);
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
            className="absolute bottom-20 right-0 w-[400px] h-[550px] glass-dark rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-neon-blue/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30 shadow-[0_0_10px_rgba(80,215,255,0.3)]">
                  <Bot className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Kavach Rescue Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Always Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-neon-blue text-dark-900 font-bold rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none'
                  } shadow-lg shadow-black/20`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-5 pb-2 overflow-x-auto">
              <div className="flex gap-2 pb-2 scrollbar-hide">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-slate-400 hover:border-neon-blue hover:text-neon-blue transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/10 bg-black/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask for help or info..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-3 p-1.5 text-neon-blue hover:text-white transition-colors"
                >
                  <Send className="w-5 h-5" />
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
