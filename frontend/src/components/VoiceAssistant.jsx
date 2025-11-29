/* global webkitSpeechRecognition */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Square, User, Bot, Sparkles, Globe, ChevronDown, Loader2, Volume2, Settings, Plus, MessageSquare, Trash2, Menu, X } from "lucide-react";
import API_URL from "../config/api";

const OPENAI_VOICES = [
  { name: "Alloy (OpenAI)", id: "alloy", lang: "en-US", type: "openai" },
  { name: "Echo (OpenAI)", id: "echo", lang: "en-US", type: "openai" },
  { name: "Fable (OpenAI)", id: "fable", lang: "en-US", type: "openai" },
  { name: "Onyx (OpenAI)", id: "onyx", lang: "en-US", type: "openai" },
  { name: "Nova (OpenAI)", id: "nova", lang: "en-US", type: "openai" },
  { name: "Shimmer (OpenAI)", id: "shimmer", lang: "en-US", type: "openai" },
];

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voices, setVoices] = useState([]);
  const [language, setLanguage] = useState("en-IN");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const [user, setUser] = useState(null);
  
  // Multiple Chats State
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const synthRef = useRef(window.speechSynthesis);
  const audioRef = useRef(null);
  const chatEndRef = useRef(null);

  const languages = [
    { code: "en-IN", name: "English (India)", label: "English" },
    { code: "hi-IN", name: "Hindi (India)", label: "Hindi" },
    { code: "te-IN", name: "Telugu (India)", label: "Telugu" },
  ];

  // Fetch Chats & User on Mount
  useEffect(() => {
    fetchChats();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/chats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setChats(data);
        if (data.length > 0 && !currentChatId) {
          selectChat(data[0]._id);
        } else if (data.length === 0) {
           createNewChat();
        }
      }
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  const createNewChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/chats`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const newChat = await res.json();
        setChats([newChat, ...chats]);
        setCurrentChatId(newChat._id);
        setChatHistory([{ role: "assistant", text: "Hello! I'm CASK. How can I help you today?" }]);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
      }
    } catch (err) {
      console.error("Failed to create chat", err);
    }
  };

  const selectChat = async (chatId) => {
    setCurrentChatId(chatId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/chats/${chatId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const chat = await res.json();
        // Map backend messages to frontend format
        const formattedHistory = chat.messages.map(m => ({
            role: m.role,
            text: m.text
        }));
        setChatHistory(formattedHistory.length ? formattedHistory : [{ role: "assistant", text: "Hello! I'm CASK. How can I help you today?" }]);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
      }
    } catch (err) {
      console.error("Failed to load chat", err);
    }
  };

  const deleteChat = async (e, chatId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/chats/${chatId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      const updatedChats = chats.filter(c => c._id !== chatId);
      setChats(updatedChats);
      
      if (currentChatId === chatId) {
        if (updatedChats.length > 0) {
          selectChat(updatedChats[0]._id);
        } else {
          createNewChat();
        }
      }
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, currentTranscript, isProcessing]);

  // Load voices (Existing logic...)
  useEffect(() => {
    const synth = synthRef.current;

    function loadVoices() {
      const systemVoices = synth.getVoices() || [];
      const formattedSystemVoices = systemVoices.map(v => ({
        name: v.name,
        id: v.name,
        lang: v.lang,
        type: "system",
        originalVoice: v 
      }));
      
      const allVoices = [...OPENAI_VOICES, ...formattedSystemVoices];
      setVoices(allVoices);
      
      if (allVoices.length > 0) {
         if (language === "hi-IN") {
            const echo = OPENAI_VOICES.find(v => v.id === "echo");
            setSelectedVoice(echo || OPENAI_VOICES[0]);
         } else if (language.startsWith("en")) {
            setSelectedVoice(OPENAI_VOICES[0]); 
         } else {
            const langVoices = formattedSystemVoices.filter(v => v.lang.startsWith(language));
            const best = langVoices.find(v => v.name.includes("Google") || v.name.includes("Natural")) || langVoices[0];
            setSelectedVoice(best || OPENAI_VOICES[0]);
         }
      }
    }

    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => { synth.onvoiceschanged = null; };
  }, [language]); 

  const stopSpeaking = () => {
    if (synthRef.current.speaking || synthRef.current.pending) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const speakReply = async (text) => {
    stopSpeaking();
    setIsSpeaking(true);

    if (selectedVoice?.type === "openai") {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/speak`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ text, voice: selectedVoice.id }),
        });
  
        if (!res.ok) throw new Error("TTS failed");
  
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
        };
        
        audio.play();
      } catch (err) {
        console.error("TTS Error:", err);
        setIsSpeaking(false);
      }
    } else {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = language;
      if (selectedVoice?.originalVoice) {
        utter.voice = selectedVoice.originalVoice;
      }
      utter.rate = 1.1;
      utter.pitch = 1;
      utter.volume = 1;
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utter);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition. Try Chrome!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setCurrentTranscript("");
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setCurrentTranscript(transcript);

      if (event.results[0].isFinal) {
        const userText = transcript;
        setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
        setCurrentTranscript("");
        setIsProcessing(true);

        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${API_URL}/ask`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ userSpeech: userText, language, chatId: currentChatId }),
          });

          if (res.status === 401 || res.status === 403) {
              navigate("/login");
              return;
          }

          const data = await res.json();
          setChatHistory(prev => [...prev, { role: 'assistant', text: data.reply }]);
          
          // If we just created a new chat (server returned a chatId we didn't have)
          if (data.chatId && data.chatId !== currentChatId) {
             setCurrentChatId(data.chatId);
             // Add to sidebar list
             setChats(prev => [{ _id: data.chatId, title: data.title || "New Chat" }, ...prev]);
          } else if (data.title) {
             // Update title if it changed
             setChats(prev => prev.map(c => c._id === currentChatId ? { ...c, title: data.title } : c));
          }
          
          speakReply(data.reply);
        } catch (err) {
          setChatHistory(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error." }]);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pt-24 font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden flex h-[85vh] relative z-10">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`absolute md:relative z-40 h-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0'} bg-white/50 backdrop-blur-xl border-r border-white/50 flex flex-col`}>
          <div className="p-6 border-b border-white/50 flex items-center justify-between">
             <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <MessageSquare className="w-5 h-5 text-indigo-600" />
               Chats
             </h2>
             <button onClick={createNewChat} className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors shadow-sm">
               <Plus className="w-5 h-5" />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
             {chats.map(chat => (
               <div 
                 key={chat._id}
                 onClick={() => selectChat(chat._id)}
                 className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${currentChatId === chat._id ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-white/60 border border-transparent'}`}
               >
                 <div className="flex items-center gap-3 overflow-hidden">
                   <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentChatId === chat._id ? 'text-indigo-600' : 'text-gray-400'}`} />
                   <span className={`text-sm truncate ${currentChatId === chat._id ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                     {chat.title}
                   </span>
                 </div>
                 <button 
                   onClick={(e) => deleteChat(e, chat._id)}
                   className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
             ))}
          </div>

          <div className="p-4 border-t border-white/50 bg-white/30">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user ? user.username : "User Account"}</p>
                <p className="text-xs text-gray-500 truncate">{user ? user.email : "Loading..."}</p>
              </div>
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative min-w-0">
          {/* Header */}
          <div className="px-6 py-4 md:px-8 md:py-6 border-b border-white/50 flex justify-between items-center bg-white/40 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-gray-600 hover:bg-white/50 rounded-lg transition-colors md:hidden">
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 ring-2 ring-white/50 hidden md:block">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">CASK Assistant</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isListening ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : isProcessing ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isListening ? "Listening" : isProcessing ? "Processing" : isSpeaking ? "Speaking" : "Ready"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Voice Settings Toggle */}
              <div className="relative">
                 <button 
                   onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                   className={`p-2.5 rounded-full transition-all ${showVoiceSettings ? 'bg-indigo-100 text-indigo-600' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                   title="Voice Settings"
                 >
                   <Settings className="w-5 h-5" />
                 </button>
                 
                 {showVoiceSettings && (
                   <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50 animate-in fade-in slide-in-from-top-2 z-50">
                     <h3 className="text-sm font-bold text-gray-700 mb-3">Select Voice</h3>
                     <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-thin">
                       {voices
                         .filter(v => v.type === 'openai' || v.lang.startsWith(language.split('-')[0]))
                         .map((v, i) => (
                         <button
                           key={i}
                           onClick={() => {
                             setSelectedVoice(v);
                             setShowVoiceSettings(false);
                           }}
                           className={`w-full text-left px-3 py-2 rounded-lg text-xs truncate transition-colors ${
                             selectedVoice?.name === v.name 
                               ? "bg-indigo-50 text-indigo-700 font-medium" 
                               : "hover:bg-gray-50 text-gray-600"
                           }`}
                         >
                           {v.name}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all text-sm font-semibold border shadow-sm hover:shadow-md ${showLanguageSelector ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white/80 border-white text-gray-700 hover:bg-white'}`}
                >
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span className="hidden md:inline">{languages.find(l => l.code === language)?.label}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showLanguageSelector ? 'rotate-180' : ''}`} />
                </button>
                
                {showLanguageSelector && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden z-50 border border-white/50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageSelector(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm hover:bg-indigo-50 transition-colors ${
                          language === lang.code ? "text-indigo-600 font-bold bg-indigo-50/50" : "text-gray-600 font-medium"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-20 h-20 bg-white/50 rounded-3xl flex items-center justify-center mb-6 shadow-lg ring-1 ring-white/50">
                  <Bot className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Hello! I'm CASK.</h3>
                <p className="text-gray-500 max-w-xs mt-2">I can help you in English, Hindi, and Telugu. Just tap the mic!</p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200 ring-2 ring-white">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[75%] p-5 shadow-sm relative group transition-all duration-300 hover:shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl rounded-tl-sm border border-white/60'
                    }`}
                  >
                    <p className="leading-relaxed text-[15px]">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Real-time Transcript / Loading */}
            {(isListening || isProcessing) && (
              <div className={`flex gap-4 ${isListening ? 'justify-end' : 'justify-start'}`}>
                {isProcessing && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white animate-pulse">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-5 rounded-2xl shadow-sm ${
                    isListening
                      ? 'bg-indigo-50/80 backdrop-blur-sm text-indigo-900 rounded-tr-sm border border-indigo-100'
                      : 'bg-white/80 backdrop-blur-sm text-gray-800 rounded-tl-sm border border-white/60'
                  }`}
                >
                  {isListening ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <p className="ml-2 font-medium">{currentTranscript || "Listening..."}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                      <span className="font-medium">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Controls Area */}
          <div className="p-8 bg-white/40 backdrop-blur-md border-t border-white/50 flex flex-col items-center gap-6 relative">
            
            

            {/* Main Button */}
            <div className="relative">
              {isListening && (
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
              )}
              {isSpeaking ? (
                <button
                  onClick={stopSpeaking}
                  className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-500/30 transition-all hover:scale-105 active:scale-95 ring-4 ring-white/50"
                >
                  <Square className="w-8 h-8 fill-current" />
                </button>
              ) : (
                <button
                  onClick={startListening}
                  disabled={isListening || isProcessing}
                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ring-4 ring-white/50 ${
                    isListening
                      ? "bg-red-500 shadow-red-500/40 scale-110"
                      : "bg-gradient-to-br from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
                  }`}
                >
                  <Mic className={`w-10 h-10 text-white ${isListening ? 'animate-bounce' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
