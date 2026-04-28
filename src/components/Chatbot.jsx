import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, HelpCircle, MapPin, Loader2, Volume2, VolumeX, Camera, Image as ImageIcon, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Kavach Rescue Hub online. Tactical link established. Systems ready for image analysis and voice-guided protocols. How can I support your mission?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-kavach', handleOpen);
    return () => window.removeEventListener('open-kavach', handleOpen);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
      setInputValue('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const quickQuestions = [
    "What to do in flood?",
    "Nearest shelter?",
    "Analyze this scene",
    "How to send SOS?"
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (text, imageBase64 = null) => {
    const queryText = text || inputValue;
    if (!queryText.trim() && !imageBase64) return;
    
    // 1. Add User Message
    const userMsgId = Date.now() + Math.random();
    setMessages(prev => [...prev, { 
      id: userMsgId, 
      text: queryText, 
      sender: 'user',
      image: imageBase64 
    }]);
    setInputValue('');
    setSelectedImage(null);

    // 2. Add Bot Loading State
    const loadingId = Date.now() + Math.random();
    setMessages(prev => [...prev, { id: loadingId, text: "...", sender: 'bot', isLoading: true }]);

    // 3. Connect to Google Gemini (Direct REST API Call - Solution Challenge Optimized)
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey.includes('YOUR_GEMINI')) throw new Error("Gemini API Key missing.");

      const modelId = "gemini-1.5-flash";
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
      
      let body;
      if (imageBase64) {
         const mimeType = imageBase64.split(';')[0].split(':')[1];
         const base64Data = imageBase64.split(',')[1];
         body = {
           contents: [{
             parts: [
               { text: queryText || "Analyze this scene for disaster management." },
               { inline_data: { mime_type: mimeType, data: base64Data } }
             ]
           }]
         };
      } else {
        body = {
          contents: [{
            parts: [{ text: `Instruction: You are Kavach, a tactical AI for Disaster X. BE CONCISE. Query: ${queryText}` }]
          }]
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Tactical link failed.");

      const responseText = data.candidates[0].content.parts[0].text;
      const cleanReply = responseText.replace(/\*/g, '');
      
      setMessages(prev => prev.map(msg => msg.id === loadingId ? { ...msg, text: cleanReply, isLoading: false } : msg));
      speak(cleanReply);

    } catch (error) {
      console.error("Gemini AI Connection Failed:", error);
      const errorMessage = `TACTICAL ERROR: ${error.message}. Ensure your API key is from Google AI Studio.`;
      setMessages(prev => prev.map(msg => msg.id === loadingId ? { ...msg, text: errorMessage, isLoading: false } : msg));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Trigger Button: Simple Circular AI Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-neon-blue shadow-[0_0_30px_rgba(80,215,255,0.4)] flex items-center justify-center text-dark-900 border-2 border-white/20 overflow-hidden relative"
          >
            <Bot className="w-8 h-8" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-white rounded-full -z-10"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-4 right-4 w-[400px] h-[600px] bg-[#0A0D14]/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col overflow-hidden z-[999]"
          >
            {/* NEW Tactical Hub Header (Optimized Padding) */}
            <div className="p-4">
               <div className="flex items-center justify-between bg-[#0A0D14] border border-white/10 rounded-full px-4 py-3 shadow-2xl border-l-neon-blue border-l-4">
                  {/* Left: Animated Wave + Info */}
                  <div className="flex items-center gap-3 pr-4 border-r border-white/5">
                    <div className="flex items-center gap-1 h-6">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [8, 16, 8] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1 bg-neon-blue rounded-full shadow-[0_0_8px_rgba(80,215,255,0.6)]"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black tracking-[0.3em] text-slate-500 uppercase leading-none mb-1.5">
                        {isVoiceEnabled ? 'Voice Active' : 'System Ready'}
                      </span>
                      <h4 className="text-xl font-black text-white tracking-tighter uppercase whitespace-nowrap">
                        Kavach <span className="text-neon-blue">Rescue</span> Hub
                      </h4>
                    </div>
                  </div>

                  {/* Right: Hub Controls (Visual Match) */}
                  <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                    {/* Voice Input Trigger */}
                    <button 
                      onClick={toggleListening}
                      className={`relative p-2 transition-all ${isListening ? 'text-neon-red' : 'text-slate-400 hover:text-white'}`}
                    >
                       <Mic className="w-5 h-5" />
                       {isListening && (
                         <motion.div 
                           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                           transition={{ repeat: Infinity, duration: 1.5 }}
                           className="absolute inset-0 bg-neon-red/20 rounded-full -z-10"
                         />
                       )}
                    </button>

                    {/* Stop/Close Button */}
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center p-1.5 hover:border-neon-red hover:bg-neon-red/10 transition-all group/close"
                    >
                       <div className="w-2.5 h-2.5 bg-white group-hover/close:bg-neon-red rounded-sm" />
                    </button>
                  </div>
               </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-neon-blue text-dark-900 font-bold rounded-tr-none' 
                      : 'bg-[#1a202c] border border-white/20 text-white font-medium rounded-tl-none shadow-xl'
                  }`}>
                    {msg.image && (
                      <img src={msg.image} alt="User upload" className="w-full h-auto rounded-lg mb-3 border border-white/20" />
                    )}
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" />
                         <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                         <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="px-5 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedImage} alt="Selected" className="w-10 h-10 object-cover rounded-lg border border-neon-blue" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Image Attached</span>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-neon-red hover:bg-neon-red/10 p-1.5 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Suggestions */}
            <div className="px-5 pb-3 overflow-x-auto">
              <div className="flex gap-3 pb-2 scrollbar-hide">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-4 py-2 bg-[#1a202c] border border-white/20 rounded-full text-[10px] font-black text-white hover:bg-neon-blue hover:text-dark-900 transition-all uppercase tracking-widest shadow-md"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-5 border-t border-neon-blue/20 bg-black/40">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue, selectedImage); }}
                className="relative flex items-center gap-3"
              >
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-3 rounded-xl transition-all ${selectedImage ? 'bg-neon-blue text-dark-900' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  
                  {/* Voice Input Button */}
                  <button 
                    type="button"
                    onClick={toggleListening}
                    className={`p-3 rounded-xl transition-all relative ${isListening ? 'bg-neon-red text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    {isListening && (
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 bg-neon-red rounded-xl -z-10"
                      />
                    )}
                  </button>
                </div>

                <input 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={isListening ? "Listening..." : inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={selectedImage ? "Describe the image..." : "Ask for help..."}
                    className={`w-full bg-[#1a202c] border-2 border-white/10 rounded-2xl py-3 px-5 pr-14 text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-all ${isListening ? 'border-neon-red' : ''}`}
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neon-blue rounded-xl text-dark-900 hover:scale-105 transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
