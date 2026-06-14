import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Send, Leaf, Droplets, Bug, Sun, Menu, X, Moon, Globe, Mic, ImagePlus, ChevronDown, ChevronUp, MapPin, Zap, Shield, Smartphone, Star } from 'lucide-react';

export default function KeralaFarmingAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "നമസ്കാരം! I'm your Kerala Farming AI Assistant. Ask me anything about crops, pests, irrigation, or government schemes — in English or Malayalam!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [district, setDistrict] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({ q: 0, s: 0, d: 0 });
  const chatEndRef = useRef(null);
  const statsRef = useRef(null);

  const districts = ['Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam','Idukki','Ernakulam','Thrissur','Palakkad','Malappuram','Kozhikode','Wayanad','Kannur','Kasaragod'];

  const suggestions = [
    { emoji: '🥥', text: 'Coconut Farming' },
    { emoji: '🐛', text: 'Pest Control' },
    { emoji: '🌾', text: 'Best Seasonal Crops' },
    { emoji: '💧', text: 'Irrigation Tips' },
    { emoji: '🏛️', text: 'Government Schemes' },
    { emoji: '🌱', text: 'Organic Farming' },
  ];

  const features = [
    { icon: '🌾', title: 'Crop Selection', desc: 'Best crops for your district and season' },
    { icon: '🐛', title: 'Pest Control', desc: 'Disease and pest identification with remedies' },
    { icon: '💧', title: 'Irrigation Guidance', desc: 'Smart water management recommendations' },
    { icon: '🌱', title: 'Soil Health', desc: 'Soil improvement and nutrient advice' },
    { icon: '🏛️', title: 'Government Schemes', desc: 'Subsidies and assistance programs' },
    { icon: '🥥', title: 'Coconut Farming', desc: 'Kerala-specific coconut expertise' },
    { icon: '🌦️', title: 'Weather Advice', desc: 'Climate-aware farming guidance' },
    { icon: '🌿', title: 'Organic Farming', desc: 'Chemical-free farming techniques' },
  ];

  const faqs = [
    { q: 'Can I ask questions in Malayalam?', a: 'Yes! Select Malayalam in the language toggle. The AI will respond in Malayalam fully.' },
    { q: 'Is the service completely free?', a: 'Yes, Kerala Farming AI Assistant is 100% free for all Kerala farmers.' },
    { q: 'Can it help identify crop diseases?', a: 'Yes! Describe symptoms or upload a photo and the AI will suggest diagnosis and treatment.' },
    { q: 'Does it provide government scheme information?', a: 'Yes, it covers all major Kerala and central government farming schemes and subsidies.' },
    { q: 'Can I use it on mobile?', a: 'Absolutely! The site is fully mobile-optimized and works on any device.' },
  ];

  const testimonials = [
    { name: 'Suresh Kumar', loc: 'Kottayam', text: 'Helped me identify a coconut root disease in minutes. Saved my entire plantation!', stars: 5 },
    { name: 'Ayaan', loc: 'Malappuram', text: 'The irrigation advice reduced my water usage by 40%. Excellent tool for farmers.', stars: 5 },
    { name: 'Meera Nair', loc: 'Thrissur', text: 'Finally an AI assistant that understands Kerala farming. Malayalam support is great!', stars: 5 },
    { name: 'Rajan Pillai', loc: 'Alappuzha', text: 'Got information on PM-KISAN scheme instantly. Very helpful for small farmers.', stars: 5 },
  ];

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true);
        animateCount('q', 0, 10000, 1500);
        animateCount('s', 0, 95, 1200);
        animateCount('d', 0, 14, 800);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCount = (key, from, to, duration) => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(prev => ({ ...prev, [key]: Math.floor(from + (to - from) * ease) }));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const handleSend = async (e, text = null) => {
    if (e) e.preventDefault();
    const msg = text || inputValue.trim();
    if (!msg) return;

    const userMsg = { id: Date.now(), type: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    const systemContext = `${district ? `The farmer is from ${district} district, Kerala.` : 'The farmer is from Kerala.'} Respond in ${language === 'മലയാളം' ? 'Malayalam language only' : language === 'Auto Detect' ? 'the same language as the question' : 'English'}.`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, context: systemContext })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: data.response || 'Sorry, please try again.' }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  const dm = darkMode;
  const bg = dm ? 'bg-gray-950' : 'bg-white';
  const text = dm ? 'text-gray-100' : 'text-gray-900';
  const subtext = dm ? 'text-gray-400' : 'text-gray-600';
  const card = dm ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100';
  const nav = dm ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-100';

  return (
    <>
      <Head>
        <title>Kerala Farming AI Assistant 🌾</title>
        <meta name="description" content="AI-powered farming assistant for Kerala farmers in English and Malayalam" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <div className={`${bg} ${text} min-h-screen transition-colors duration-300`}>

        {/* NAVBAR */}
        <nav className={`fixed top-0 w-full z-50 border-b ${nav} backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌿</span>
              </div>
              <span className="font-bold text-base hidden sm:block">Kerala Farming AI</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {['home','features','how-it-works','faq','chat-section'].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className={`${subtext} hover:text-green-600 transition capitalize`}>
                  {id === 'chat-section' ? 'Chat' : id.replace('-',' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setDarkMode(!dm)} className={`p-2 rounded-lg ${dm ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition`}>
                <Moon className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('chat-section')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition hidden sm:block">
                Ask AI
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2">
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className={`md:hidden border-t ${dm ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-100'} px-4 py-4 space-y-3`}>
              {['home','features','how-it-works','faq','chat-section'].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className={`block w-full text-left text-sm font-medium ${subtext} hover:text-green-600 py-1 capitalize`}>
                  {id === 'chat-section' ? 'Chat' : id.replace('-',' ')}
                </button>
              ))}
              <button onClick={() => scrollTo('chat-section')} className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
                Ask AI Now
              </button>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section id="home" className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                🌱 AI-Powered Farming Assistant
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Get Instant Farming Advice in{' '}
                <span className="text-green-600">Malayalam</span> &{' '}
                <span className="text-green-600">English</span>
              </h1>

              <p className={`text-lg ${subtext} mb-8 leading-relaxed`}>
                Ask questions about crops, pests, irrigation, fertilizers, weather, government schemes, and farming best practices — free forever.
              </p>

              {/* Language Selector */}
              <div className="mb-8">
                <p className={`text-xs font-semibold uppercase tracking-wider ${subtext} mb-3 flex items-center gap-2`}>
                  <Globe className="w-3.5 h-3.5" /> Response Language
                </p>
                <div className="flex gap-2">
                  {['English', 'മലയാളം', 'Auto Detect'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${language === lang ? 'bg-green-600 text-white border-green-600' : `${dm ? 'border-gray-700 text-gray-300 hover:border-green-500' : 'border-gray-200 text-gray-600 hover:border-green-400'}`}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo('chat-section')} className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200 hover:shadow-green-300 flex items-center gap-2">
                  <span>Start Chatting</span> <Send className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo('features')} className={`px-6 py-3 rounded-xl font-semibold border transition ${dm ? 'border-gray-700 hover:border-green-500 text-gray-300' : 'border-gray-200 hover:border-green-400 text-gray-700'}`}>
                  Explore Features
                </button>
              </div>
            </div>

            {/* Right — Chat Preview */}
            <div className={`rounded-2xl border ${card} shadow-2xl overflow-hidden`}>
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🌿</div>
                <div>
                  <div className="text-white text-sm font-semibold">Kerala Farming AI</div>
                  <div className="text-green-100 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span> Online
                  </div>
                </div>
                <div className="ml-auto">
                  <span className={`text-xs px-2 py-1 rounded-full ${dm ? 'bg-white/10 text-gray-300' : 'bg-white/20 text-white'}`}>{language}</span>
                </div>
              </div>
              <div className={`p-4 space-y-3 ${dm ? 'bg-gray-900' : 'bg-gray-50'} min-h-48`}>
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🌾</div>
                  <div className={`${dm ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm shadow-sm max-w-xs`}>
                    Hello! How can I help with your farming today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-xs">
                    My coconut leaves are turning yellow 🥥
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🌾</div>
                  <div className={`${dm ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm shadow-sm max-w-xs`}>
                    This may be potassium deficiency. Apply muriate of potash (MOP) at 1kg per tree. Also check for root wilt disease...
                  </div>
                </div>
                <div className={`flex gap-1 items-center ${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl px-4 py-3 w-fit shadow-sm`}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section ref={statsRef} className={`py-12 px-4 border-y ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-green-50'}`}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: `${counts.q.toLocaleString()}+`, label: 'Questions Answered' },
              { val: `${counts.s}%`, label: 'Farmer Satisfaction' },
              { val: '24/7', label: 'Always Available' },
              { val: counts.d, label: 'Districts Supported' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-green-600 mb-1">{stat.val}</div>
                <div className={`text-sm ${subtext}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">What Can I Help You With?</h2>
              <p className={`${subtext} max-w-xl mx-auto`}>Comprehensive farming guidance powered by advanced AI, tailored for Kerala's unique agricultural landscape.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <div key={i} className={`group p-5 rounded-xl border ${card} hover:border-green-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default`}>
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className={`text-sm ${subtext}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAT SECTION */}
        <section id="chat-section" className={`py-20 px-4 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Ask Your Farming Question</h2>
              <p className={`${subtext} text-sm`}>നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക</p>
            </div>

            {/* District selector */}
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className={`text-sm px-3 py-1.5 rounded-lg border ${dm ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex gap-1">
                {['English','മലയാളം'].map(l => (
                  <button key={l} onClick={() => setLanguage(l)} className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${language === l ? 'bg-green-600 text-white border-green-600' : `${dm ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border ${card} shadow-xl overflow-hidden`}>
              {/* Chat header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">🌿</div>
                <div>
                  <div className="text-white font-semibold text-sm">Kerala Farming AI</div>
                  <div className="text-green-100 text-xs">{district ? `${district} District` : 'Kerala'} · {language}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  <span className="text-green-100 text-xs">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className={`h-80 overflow-y-auto p-4 space-y-3 ${dm ? 'bg-gray-950' : 'bg-gray-50'}`}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                    {msg.type === 'bot' && (
                      <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🌾</div>
                    )}
                    <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.type === 'user' ? 'bg-green-600 text-white rounded-tr-sm' : `${dm ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow-sm rounded-tl-sm`}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🌾</div>
                    <div className={`${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm`}>
                      <div className="flex gap-1">
                        {[0,150,300].map(d => <div key={d} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:`${d}ms`}}></div>)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions */}
              <div className={`px-4 py-3 border-t ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} flex flex-wrap gap-2`}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSend(null, s.text)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition hover:border-green-400 hover:text-green-600 ${dm ? 'border-gray-700 text-gray-400 bg-gray-800' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                    {s.emoji} {s.text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className={`border-t ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} p-4`}>
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={language === 'മലയാളം' ? 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...' : 'Ask about crops, pests, irrigation...'}
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-green-500 ${dm ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                    disabled={loading}
                    style={{ fontSize: "16px" }}
                  />
                  <button type="button" className={`p-2.5 rounded-xl border ${dm ? 'border-gray-700 text-gray-400 hover:text-green-400' : 'border-gray-200 text-gray-500 hover:text-green-600'} transition`} title="Voice input">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button type="button" className={`p-2.5 rounded-xl border ${dm ? 'border-gray-700 text-gray-400 hover:text-green-400' : 'border-gray-200 text-gray-500 hover:text-green-600'} transition`} title="Upload image">
                    <ImagePlus className="w-4 h-4" />
                  </button>
                  <button type="submit" disabled={loading || !inputValue.trim()} className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-40">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { num: '1', icon: '💬', title: 'Ask Your Question', desc: 'Type in English or Malayalam' },
                { num: '2', icon: '🤖', title: 'AI Analyzes', desc: 'Processes your farming context' },
                { num: '3', icon: '🌾', title: 'Get Expert Advice', desc: 'Instant Kerala-specific guidance' },
                { num: '4', icon: '📈', title: 'Improve Results', desc: 'Apply and grow better crops' },
              ].map((step, i) => (
                <div key={i} className="text-center relative">
                  {i < 3 && <div className={`hidden sm:block absolute top-8 left-1/2 w-full h-px ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}></div>}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-200">
                    {step.icon}
                  </div>
                  <div className="font-semibold mb-1">{step.title}</div>
                  <div className={`text-sm ${subtext}`}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className={`py-16 px-4 ${dm ? 'bg-gray-900' : 'bg-green-50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Why Farmers Trust Us</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: <Zap className="w-5 h-5"/>, title: 'Instant Answers', desc: 'Response in seconds' },
                { icon: <Leaf className="w-5 h-5"/>, title: 'Kerala-Specific', desc: 'Local crop knowledge' },
                { icon: <Globe className="w-5 h-5"/>, title: 'Malayalam Support', desc: 'Full language support' },
                { icon: <Star className="w-5 h-5"/>, title: 'Completely Free', desc: 'No hidden costs' },
                { icon: <Shield className="w-5 h-5"/>, title: 'Secure & Private', desc: 'Your data is safe' },
                { icon: <Smartphone className="w-5 h-5"/>, title: 'Mobile Friendly', desc: 'Works on any device' },
              ].map((t, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${card}`}>
                  <div className="text-green-600 mt-0.5">{t.icon}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.title}</div>
                    <div className={`text-xs ${subtext}`}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Farmer Success Stories</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className={`p-6 rounded-xl border ${card} hover:shadow-md transition`}>
                  <div className="flex gap-0.5 mb-3">
                    {Array(t.stars).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className={`text-sm ${subtext} mb-4 leading-relaxed`}>"{t.text}"</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className={`text-xs ${subtext}`}>{t.loc}, Kerala</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`py-20 px-4 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className={`rounded-xl border ${card} overflow-hidden`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 text-left flex items-center justify-between">
                    <span className="font-medium text-sm">{f.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-green-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className={`px-5 pb-4 text-sm ${subtext} border-t ${dm ? 'border-gray-800' : 'border-gray-100'} pt-3`}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-emerald-700">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Improve Your Farming?</h2>
            <p className="text-green-100 text-lg mb-8">Get instant farming guidance powered by AI. Free for every Kerala farmer.</p>
            <button onClick={() => scrollTo('chat-section')} className="px-8 py-4 bg-white text-green-700 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition">
              Start Asking Questions 🌾
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`${dm ? 'bg-gray-950 border-gray-800' : 'bg-gray-900'} text-gray-400 py-12 px-4`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center text-sm">🌿</div>
                  <span className="text-white font-bold text-sm">Kerala Farming AI</span>
                </div>
                <p className="text-xs leading-relaxed">AI-powered farming assistant for Kerala farmers. Free, fast, and accurate.</p>
              </div>
              {[
                { title: 'Product', links: ['Features', 'How It Works', 'FAQ'] },
                { title: 'Support', links: ['Contact', 'Privacy Policy', 'Terms'] },
                { title: 'Language', links: ['English', 'മലയാളം'] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map(l => <li key={l}><a href="#" className="text-xs hover:text-green-400 transition">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-xs">
              © 2026 Kerala Farming AI Assistant. Built with ❤️ for Kerala farmers.
              <div className="mt-2 text-gray-500">Owner: Zaid · 📞 6304497470</div>
            </div>
          </div>
        </footer>

        {/* Floating Chat Button */}
        <button
          onClick={() => scrollTo('chat-section')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition flex items-center justify-center z-40"
          title="Open Chat"
        >
          <span className="text-xl">🌾</span>
        </button>
      </div>
    </>
  );
}
