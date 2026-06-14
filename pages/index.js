import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Send, Leaf, Droplets, Bug, Sun, Menu, X, Moon, Globe, Mic, ImagePlus, ChevronDown, ChevronUp, MapPin, Zap, Shield, Smartphone, Star, Search } from 'lucide-react';

const translations = {
  EN: {
    heroTitle: "Grow Better Crops with AI-Powered Guidance",
    heroSub: "Get expert guidance on crops, pests, irrigation, fertilizers, weather updates, and government schemes — all in one place.",
    startChat: "Start Chatting",
    exploreFeatures: "Explore Features",
    askAI: "Ask AI",
    featuresTitle: "What Can I Help You With?",
    chatTitle: "Ask Your Farming Question",
    howTitle: "How It Works",
    trustTitle: "Why Farmers Trust Us",
    testimonialsTitle: "Farmer Success Stories",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Ready to Improve Your Farming?",
    ctaSub: "Get instant farming guidance powered by AI. Free for every Kerala farmer.",
    ctaBtn: "Start Asking Questions 🌾",
    schemesTitle: "Government Schemes & Farmer Benefits",
    schemesSub: "Discover subsidies, insurance programs, financial assistance, and support initiatives for Kerala farmers.",
    methodsTitle: "Modern Farming Practices",
    methodsSub: "Learn proven techniques to improve productivity and sustainability.",
    precautionsTitle: "Essential Farming Precautions",
    inputPlaceholder: "Ask about crops, pests, irrigation...",
    online: "Online",
    selectDistrict: "Select District",
  },
  ML: {
    heroTitle: "AI സഹായത്തോടെ മികച്ച വിളകൾ കൃഷി ചെയ്യൂ",
    heroSub: "വിളകൾ, കീടങ്ങൾ, ജലസേചനം, വളം, കാലാവസ്ഥ, സർക്കാർ പദ്ധതികൾ — എല്ലാം ഒരു ഇടത്ത്.",
    startChat: "ചാറ്റ് തുടങ്ങൂ",
    exploreFeatures: "സവിശേഷതകൾ",
    askAI: "AI യോട് ചോദിക്കൂ",
    featuresTitle: "ഞാൻ എന്ത് സഹായിക്കും?",
    chatTitle: "നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക",
    howTitle: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    trustTitle: "കർഷകർ ഞങ്ങളെ വിശ്വസിക്കുന്നത് എന്തുകൊണ്ട്",
    testimonialsTitle: "കർഷകരുടെ അനുഭവങ്ങൾ",
    faqTitle: "പതിവ് ചോദ്യങ്ങൾ",
    ctaTitle: "നിങ്ങളുടെ കൃഷി മെച്ചപ്പെടുത്താൻ തയ്യാറാണോ?",
    ctaSub: "AI ശക്തിയിൽ ഉടനടി കൃഷി നിർദ്ദേശം ലഭിക്കൂ. എല്ലാ കേരള കർഷകർക്കും സൗജന്യം.",
    ctaBtn: "ചോദ്യങ്ങൾ ചോദിക്കൂ 🌾",
    schemesTitle: "സർക്കാർ പദ്ധതികൾ & കർഷക ആനുകൂല്യങ്ങൾ",
    schemesSub: "കേരളത്തിലെ കർഷകർക്കുള്ള സബ്സിഡികൾ, ഇൻഷുറൻസ്, ധനസഹായം എന്നിവ കണ്ടെത്തൂ.",
    methodsTitle: "ആധുനിക കൃഷി രീതികൾ",
    methodsSub: "ഉൽപ്പാദനക്ഷമതയും സുസ്ഥിരതയും മെച്ചപ്പെടുത്താൻ തെളിയിക്കപ്പെട്ട സാങ്കേതിക വിദ്യകൾ.",
    precautionsTitle: "അവശ്യ കൃഷി മുൻകരുതലുകൾ",
    inputPlaceholder: "വിളകൾ, കീടങ്ങൾ, ജലസേചനം...",
    online: "ഓൺലൈൻ",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കൂ",
  },
  HI: {
    heroTitle: "AI मार्गदर्शन से बेहतर फसल उगाएं",
    heroSub: "फसलों, कीटों, सिंचाई, उर्वरकों, मौसम और सरकारी योजनाओं पर विशेषज्ञ मार्गदर्शन — एक ही जगह।",
    startChat: "चैट शुरू करें",
    exploreFeatures: "सुविधाएं देखें",
    askAI: "AI से पूछें",
    featuresTitle: "मैं किसमें मदद कर सकता हूं?",
    chatTitle: "अपना खेती सवाल पूछें",
    howTitle: "यह कैसे काम करता है",
    trustTitle: "किसान हम पर भरोसा क्यों करते हैं",
    testimonialsTitle: "किसानों की सफलता की कहानियां",
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    ctaTitle: "अपनी खेती सुधारने के लिए तैयार हैं?",
    ctaSub: "AI द्वारा संचालित तत्काल खेती मार्गदर्शन प्राप्त करें। हर केरल किसान के लिए मुफ्त।",
    ctaBtn: "सवाल पूछना शुरू करें 🌾",
    schemesTitle: "सरकारी योजनाएं और किसान लाभ",
    schemesSub: "केरल किसानों के लिए सब्सिडी, बीमा, वित्तीय सहायता खोजें।",
    methodsTitle: "आधुनिक खेती पद्धतियां",
    methodsSub: "उत्पादकता और स्थिरता में सुधार के लिए सिद्ध तकनीकें सीखें।",
    precautionsTitle: "आवश्यक खेती सावधानियां",
    inputPlaceholder: "फसलों, कीटों, सिंचाई के बारे में पूछें...",
    online: "ऑनलाइन",
    selectDistrict: "जिला चुनें",
  },
  TA: {
    heroTitle: "AI வழிகாட்டுதலுடன் சிறந்த பயிர்களை வளர்க்கவும்",
    heroSub: "பயிர்கள், பூச்சிகள், நீர்ப்பாசனம், உரங்கள், வானிலை மற்றும் அரசு திட்டங்கள் — அனைத்தும் ஒரே இடத்தில்.",
    startChat: "அரட்டை தொடங்கு",
    exploreFeatures: "அம்சங்களை ஆராயுங்கள்",
    askAI: "AI கேளுங்கள்",
    featuresTitle: "நான் எதில் உதவ முடியும்?",
    chatTitle: "உங்கள் விவசாய கேள்வியை கேளுங்கள்",
    howTitle: "இது எவ்வாறு செயல்படுகிறது",
    trustTitle: "விவசாயிகள் எங்களை நம்புவது ஏன்",
    testimonialsTitle: "விவசாயி வெற்றிக் கதைகள்",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    ctaTitle: "உங்கள் விவசாயத்தை மேம்படுத்த தயாரா?",
    ctaSub: "AI மூலம் உடனடி விவசாய வழிகாட்டுதல் பெறுங்கள். இலவசம்.",
    ctaBtn: "கேள்விகள் கேட்கத் தொடங்குங்கள் 🌾",
    schemesTitle: "அரசு திட்டங்கள் & விவசாயி நன்மைகள்",
    schemesSub: "கேரள விவசாயிகளுக்கான மானியங்கள், காப்பீடு, நிதி உதவி கண்டறியுங்கள்.",
    methodsTitle: "நவீன விவசாய நடைமுறைகள்",
    methodsSub: "உற்பத்தித்திறன் மற்றும் நிலைத்தன்மையை மேம்படுத்த நிரூபிக்கப்பட்ட நுட்பங்கள்.",
    precautionsTitle: "அத்தியாவசிய விவசாய முன்னெச்சரிக்கைகள்",
    inputPlaceholder: "பயிர்கள், பூச்சிகள், நீர்ப்பாசனம் பற்றி கேளுங்கள்...",
    online: "ஆன்லைன்",
    selectDistrict: "மாவட்டம் தேர்ந்தெடுக்கவும்",
  },
};

export default function KeralaFarmingAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "നമസ്കാരം! I'm your Kerala Farming AI Assistant. Ask me anything about crops, pests, irrigation, or government schemes!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('EN');
  const [district, setDistrict] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({ q: 0, s: 0, d: 0 });
  const [schemeSearch, setSchemeSearch] = useState('');
  const [schemeFilter, setSchemeFilter] = useState('All');
  const chatEndRef = useRef(null);
  const statsRef = useRef(null);
  const isInitialMount = useRef(true);

  const t = translations[lang];
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

  const schemes = [
    { name: 'PM-KISAN', desc: 'Direct income support of ₹6,000/year to farmer families.', eligibility: 'Small & marginal farmers with less than 2 hectares', benefit: '₹6,000/year in 3 installments', category: 'Direct Benefit' },
    { name: 'PMFBY', desc: 'Crop insurance scheme to protect farmers from natural calamities.', eligibility: 'All farmers growing notified crops', benefit: 'Full crop loss compensation', category: 'Crop Insurance' },
    { name: 'KCC - Kisan Credit Card', desc: 'Short-term credit for crop cultivation and allied activities.', eligibility: 'All farmers, sharecroppers, tenant farmers', benefit: 'Up to ₹3 lakh credit at 4% interest', category: 'Loans & Credit' },
    { name: 'PMKSY - Irrigation', desc: 'Har Khet Ko Paani — irrigation to every farm.', eligibility: 'Farmers with own/leased agricultural land', benefit: 'Subsidy on micro-irrigation systems', category: 'Irrigation' },
    { name: 'Paramparagat Krishi Vikas', desc: 'Promotes organic farming through cluster approach.', eligibility: 'Farmers willing to adopt organic farming', benefit: '₹50,000/hectare for 3 years', category: 'Organic Farming' },
    { name: 'Soil Health Card', desc: 'Free soil testing and recommendations for farmers.', eligibility: 'All farmers', benefit: 'Free soil analysis report every 2 years', category: 'Soil Health' },
    { name: 'e-NAM', desc: 'National Agriculture Market for better crop prices.', eligibility: 'All farmers with produce to sell', benefit: 'Access to pan-India market prices', category: 'Marketing Support' },
    { name: 'Kerala Karshika Thozhilali', desc: 'Agricultural workers welfare scheme by Kerala govt.', eligibility: 'Kerala agricultural laborers', benefit: 'Pension, medical aid, housing assistance', category: 'Direct Benefit' },
  ];

  const schemeCategories = ['All', 'Direct Benefit', 'Crop Insurance', 'Loans & Credit', 'Irrigation', 'Organic Farming', 'Soil Health', 'Marketing Support'];

  const filteredSchemes = schemes.filter(s =>
    (schemeFilter === 'All' || s.category === schemeFilter) &&
    (s.name.toLowerCase().includes(schemeSearch.toLowerCase()) || s.desc.toLowerCase().includes(schemeSearch.toLowerCase()))
  );

  const farmingMethods = [
    { icon: '🌿', title: 'Organic Farming', desc: 'Chemical-free cultivation using natural inputs and composting.', benefits: ['Healthier produce', 'Better soil health', 'Higher market price'] },
    { icon: '📡', title: 'Precision Farming', desc: 'Use technology and data to optimize inputs and maximize yield.', benefits: ['Reduced waste', 'Higher efficiency', 'Better resource use'] },
    { icon: '💧', title: 'Drip Irrigation', desc: 'Deliver water directly to roots for maximum efficiency.', benefits: ['60% water saving', 'Better crop quality', 'Reduced weeds'] },
    { icon: '🐛', title: 'Integrated Pest Management', desc: 'Combine biological, cultural, and chemical methods for pest control.', benefits: ['Less pesticide use', 'Cost effective', 'Eco-friendly'] },
    { icon: '🌱', title: 'Soil Health Management', desc: 'Maintain and improve soil fertility for long-term productivity.', benefits: ['Better yields', 'Carbon sequestration', 'Sustainable farming'] },
    { icon: '♻️', title: 'Sustainable Farming', desc: 'Farm in a way that preserves resources for future generations.', benefits: ['Environmental friendly', 'Long-term profit', 'Community benefit'] },
  ];

  const precautions = [
    { icon: '🔍', title: 'Monitor Pests Regularly', desc: 'Check crops weekly for signs of pests or disease to catch problems early.' },
    { icon: '💧', title: 'Avoid Overwatering', desc: 'Excess water causes root rot and fungal diseases. Water only when needed.' },
    { icon: '🌱', title: 'Use Certified Seeds', desc: 'Always buy certified, disease-free seeds from registered suppliers.' },
    { icon: '⚗️', title: 'Follow Fertilizer Dosage', desc: 'Excess fertilizer damages crops and soil. Follow soil test recommendations.' },
    { icon: '🌦️', title: 'Check Weather Forecasts', desc: 'Plan farming activities around weather to avoid crop damage.' },
    { icon: '🦺', title: 'Use Protective Equipment', desc: 'Always wear gloves, mask, and goggles when handling pesticides.' },
  ];

  const faqs = [
    { q: 'Can I ask questions in Malayalam?', a: 'Yes! Select ML in the language toggle. The AI will respond in Malayalam fully.' },
    { q: 'Is the service completely free?', a: 'Yes, Kerala Farming AI Assistant is 100% free for all Kerala farmers.' },
    { q: 'Can it help identify crop diseases?', a: 'Yes! Describe symptoms and the AI will suggest diagnosis and treatment.' },
    { q: 'Does it provide government scheme information?', a: 'Yes, it covers all major Kerala and central government farming schemes.' },
    { q: 'Can I use it on mobile?', a: 'Absolutely! The site is fully mobile-optimized and works on any device.' },
  ];

  const testimonials = [
    { name: 'Suresh Kumar', loc: 'Kottayam', text: 'Helped me identify a coconut root disease in minutes. Saved my entire plantation!', stars: 5 },
    { name: 'Ayaan', loc: 'Malappuram', text: 'The irrigation advice reduced my water usage by 40%. Excellent tool for farmers.', stars: 5 },
    { name: 'Meera Nair', loc: 'Thrissur', text: 'Finally an AI assistant that understands Kerala farming. Malayalam support is great!', stars: 5 },
    { name: 'Rajan Pillai', loc: 'Alappuzha', text: 'Got information on PM-KISAN scheme instantly. Very helpful for small farmers.', stars: 5 },
  ];

  // Scroll to top on mount, disable scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  // Only auto-scroll chat when new messages added (not on initial load)
  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return; }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true);
        const animate = (key, to, dur) => {
          const start = Date.now();
          const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCounts(prev => ({ ...prev, [key]: Math.floor(to * ease) }));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };
        animate('q', 10000, 1500);
        animate('s', 95, 1200);
        animate('d', 14, 800);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const handleSend = async (e, text = null) => {
    if (e) e.preventDefault();
    const msg = text || inputValue.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: msg }]);
    setInputValue('');
    setLoading(true);
    const ctx = `${district ? `Farmer is from ${district} district, Kerala.` : 'Farmer is from Kerala.'} Respond in ${lang === 'ML' ? 'Malayalam' : lang === 'HI' ? 'Hindi' : lang === 'TA' ? 'Tamil' : 'English'}.`;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, context: ctx }) });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: data.response || 'Sorry, please try again.' }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  const dm = darkMode;
  const bg = dm ? 'bg-gray-950' : 'bg-white';
  const tx = dm ? 'text-gray-100' : 'text-gray-900';
  const sub = dm ? 'text-gray-400' : 'text-gray-500';
  const card = dm ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100';
  const navCls = dm ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-200';

  return (
    <>
      <Head>
        <title>Kerala Farming AI Assistant 🌾</title>
        <meta name="description" content="AI-powered farming assistant for Kerala farmers" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <div className={`${bg} ${tx} min-h-screen transition-colors duration-300`}>

        {/* NAVBAR */}
        <nav className={`fixed top-0 w-full z-50 border-b ${navCls} backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌿</span>
              </div>
              <span className="font-bold text-sm hidden sm:block">Kerala Farming AI</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-5 text-sm font-medium">
              {[['home','Home'],['features','Features'],['how-it-works','How It Works'],['faq','FAQ'],['chat-section','Chat']].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className={`${sub} hover:text-green-600 transition`}>{label}</button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Language switcher */}
              <div className={`flex items-center rounded-lg border overflow-hidden text-xs font-bold ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
                {['EN','ML','HI','TA'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-2.5 py-1.5 transition ${lang === l ? 'bg-green-600 text-white' : `${dm ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}`}>
                    {l}
                  </button>
                ))}
              </div>

              <button onClick={() => setDarkMode(!dm)} className={`p-2 rounded-lg ${dm ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition`}>
                <Moon className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('chat-section')} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition hidden sm:block">
                {t.askAI}
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2">
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className={`md:hidden border-t ${dm ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-100'} px-4 py-4 space-y-3`}>
              {[['home','Home'],['features','Features'],['how-it-works','How It Works'],['faq','FAQ'],['chat-section','Chat']].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className={`block w-full text-left text-sm font-medium ${sub} hover:text-green-600 py-1`}>{label}</button>
              ))}
              {/* Mobile language switcher */}
              <div className="flex gap-1 pt-1">
                {['EN','ML','HI','TA'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${lang === l ? 'bg-green-600 text-white border-green-600' : `${dm ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}`}>
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTo('chat-section')} className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">{t.askAI}</button>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section id="home" className="pt-20 pb-10 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center min-h-[88vh]">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                🌱 AI-Powered Farming Assistant
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                {t.heroTitle}
              </h1>

              <p className={`text-base ${sub} mb-7 leading-relaxed max-w-lg`}>{t.heroSub}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button onClick={() => scrollTo('chat-section')} className="px-5 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center gap-2 text-sm">
                  {t.startChat} <Send className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo('features')} className={`px-5 py-3 rounded-xl font-semibold border transition text-sm ${dm ? 'border-gray-700 text-gray-300 hover:border-green-500' : 'border-gray-200 text-gray-700 hover:border-green-400'}`}>
                  {t.exploreFeatures}
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[['🌱','Smart Advice'],['🛡️','Trusted Guidance'],['🌦️','Weather Aware'],['♻️','Sustainable']].map(([ico, lbl]) => (
                  <div key={lbl} className="flex items-center gap-1.5">
                    <span className="text-base">{ico}</span>
                    <span className={`text-xs font-medium ${sub}`}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-farmer.png"
                alt="Kerala farmers working in paddy field"
                className="w-full h-80 sm:h-96 md:h-[480px] object-cover rounded-2xl"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent rounded-2xl"></div>
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🌾</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">Kerala Farming AI</div>
                    <div className="text-xs text-green-600">Empowering 35+ lakh farmers</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section ref={statsRef} className={`py-10 px-4 border-y ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-green-50'}`}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: `${counts.q.toLocaleString()}+`, label: 'Questions Answered' },
              { val: `${counts.s}%`, label: 'Farmer Satisfaction' },
              { val: '24/7', label: 'Always Available' },
              { val: counts.d, label: 'Districts Supported' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-green-600 mb-1">{s.val}</div>
                <div className={`text-sm ${sub}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">{t.featuresTitle}</h2>
              <p className={`${sub} text-sm max-w-xl mx-auto`}>Comprehensive farming guidance powered by AI, tailored for Kerala's unique agricultural landscape.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div key={i} className={`group p-5 rounded-xl border ${card} hover:border-green-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200`}>
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold mb-1 text-sm">{f.title}</h3>
                  <p className={`text-xs ${sub}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOVERNMENT SCHEMES */}
        <section className={`py-16 px-4 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{t.schemesTitle}</h2>
              <p className={`${sub} text-sm max-w-xl mx-auto`}>{t.schemesSub}</p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={schemeSearch}
                  onChange={e => setSchemeSearch(e.target.value)}
                  style={{ fontSize: '16px' }}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${dm ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {schemeCategories.slice(0, 4).map(cat => (
                  <button key={cat} onClick={() => setSchemeFilter(cat)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition ${schemeFilter === cat ? 'bg-green-600 text-white border-green-600' : `${dm ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'} hover:border-green-400`}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSchemes.map((s, i) => (
                <div key={i} className={`p-4 rounded-xl border ${card} hover:shadow-md transition`}>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-3 inline-block ${dm ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}>{s.category}</span>
                  <h3 className="font-bold text-sm mb-1">{s.name}</h3>
                  <p className={`text-xs ${sub} mb-2`}>{s.desc}</p>
                  <div className={`text-xs ${sub} mb-1`}><span className="font-medium">Eligibility:</span> {s.eligibility}</div>
                  <div className={`text-xs text-green-600 font-medium mb-3`}>✅ {s.benefit}</div>
                  <a href="#" className="text-xs text-green-600 font-semibold hover:underline">Visit Official Portal →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FARMING METHODS */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">{t.methodsTitle}</h2>
              <p className={`${sub} text-sm max-w-xl mx-auto`}>{t.methodsSub}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {farmingMethods.map((m, i) => (
                <div key={i} className={`p-5 rounded-xl border ${card} hover:border-green-300 hover:shadow-md transition`}>
                  <div className="text-3xl mb-3">{m.icon}</div>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className={`text-sm ${sub} mb-3`}>{m.desc}</p>
                  <div className="space-y-1">
                    {m.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-green-600">
                        <span>✓</span><span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FARMING PRECAUTIONS */}
        <section className={`py-16 px-4 ${dm ? 'bg-gray-900' : 'bg-green-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">{t.precautionsTitle}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {precautions.map((p, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-xl border ${card}`}>
                  <div className="text-2xl flex-shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                    <p className={`text-xs ${sub}`}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAT SECTION */}
        <section id="chat-section" className={`py-16 px-4 ${dm ? 'bg-gray-950' : 'bg-white'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">{t.chatTitle}</h2>
            </div>

            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <select value={district} onChange={e => setDistrict(e.target.value)} style={{ fontSize: '16px' }}
                  className={`text-sm px-3 py-1.5 rounded-lg border ${dm ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-green-500`}>
                  <option value="">{t.selectDistrict}</option>
                  {districts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className={`rounded-2xl border ${card} shadow-xl overflow-hidden`}>
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">🌿</div>
                <div>
                  <div className="text-white font-semibold text-sm">Kerala Farming AI</div>
                  <div className="text-green-100 text-xs">{district || 'Kerala'} · {lang}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  <span className="text-green-100 text-xs">{t.online}</span>
                </div>
              </div>

              <div className={`h-80 overflow-y-auto p-4 space-y-3 ${dm ? 'bg-gray-950' : 'bg-gray-50'}`}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                    {msg.type === 'bot' && <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🌾</div>}
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

              <div className={`px-4 py-3 border-t ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} flex flex-wrap gap-2`}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSend(null, s.text)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition hover:border-green-400 hover:text-green-600 ${dm ? 'border-gray-700 text-gray-400 bg-gray-800' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                    {s.emoji} {s.text}
                  </button>
                ))}
              </div>

              <div className={`border-t ${dm ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} p-4`}>
                <form onSubmit={handleSend} className="flex gap-2">
                  <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}
                    placeholder={t.inputPlaceholder} disabled={loading}
                    style={{ fontSize: '16px' }}
                    className={`flex-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500 ${dm ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`}
                  />
                  <button type="button" className={`p-2.5 rounded-xl border ${dm ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} hover:text-green-600 transition`}><Mic className="w-4 h-4" /></button>
                  <button type="button" className={`p-2.5 rounded-xl border ${dm ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} hover:text-green-600 transition`}><ImagePlus className="w-4 h-4" /></button>
                  <button type="submit" disabled={loading || !inputValue.trim()} className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-40"><Send className="w-4 h-4" /></button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className={`py-16 px-4 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">{t.howTitle}</h2>
            <div className="grid sm:grid-cols-4 gap-6">
              {[['💬','Ask Your Question','Type in English or Malayalam'],['🤖','AI Analyzes','Processes your farming context'],['🌾','Get Expert Advice','Instant Kerala-specific guidance'],['📈','Improve Results','Apply and grow better crops']].map(([ico, title, desc], i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-200">{ico}</div>
                  <div className="font-semibold mb-1 text-sm">{title}</div>
                  <div className={`text-xs ${sub}`}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">{t.trustTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[[<Zap className="w-5 h-5"/>,'Instant Answers','Response in seconds'],[<Leaf className="w-5 h-5"/>,'Kerala-Specific','Local crop knowledge'],[<Globe className="w-5 h-5"/>,'Multi-Language','EN, ML, HI, TA'],[<Star className="w-5 h-5"/>,'Completely Free','No hidden costs'],[<Shield className="w-5 h-5"/>,'Secure & Private','Your data is safe'],[<Smartphone className="w-5 h-5"/>,'Mobile Friendly','Works on any device']].map(([icon, title, desc], i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${card}`}>
                  <div className="text-green-600 mt-0.5">{icon}</div>
                  <div><div className="font-semibold text-sm">{title}</div><div className={`text-xs ${sub}`}>{desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className={`py-16 px-4 ${dm ? 'bg-gray-900' : 'bg-green-50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">{t.testimonialsTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {testimonials.map((t2, i) => (
                <div key={i} className={`p-5 rounded-xl border ${card} hover:shadow-md transition`}>
                  <div className="flex gap-0.5 mb-3">{Array(t2.stars).fill(0).map((_,j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className={`text-sm ${sub} mb-3 leading-relaxed`}>"{t2.text}"</p>
                  <div><div className="font-semibold text-sm">{t2.name}</div><div className={`text-xs ${sub}`}>{t2.loc}, Kerala</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">{t.faqTitle}</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className={`rounded-xl border ${card} overflow-hidden`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 text-left flex items-center justify-between">
                    <span className="font-medium text-sm">{f.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-green-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i && <div className={`px-5 pb-4 text-sm ${sub} border-t ${dm ? 'border-gray-800' : 'border-gray-100'} pt-3`}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-green-600 to-emerald-700">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-3">{t.ctaTitle}</h2>
            <p className="text-green-100 mb-7 text-sm">{t.ctaSub}</p>
            <button onClick={() => scrollTo('chat-section')} className="px-7 py-3.5 bg-white text-green-700 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition text-sm">{t.ctaBtn}</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center text-sm">🌿</div>
                  <span className="text-white font-bold text-sm">Kerala Farming AI</span>
                </div>
                <p className="text-xs leading-relaxed">AI-powered farming assistant for Kerala farmers. Free, fast, and accurate.</p>
              </div>
              {[['Product',['Features','How It Works','FAQ']],['Support',['Contact','Privacy Policy','Terms']],['Language',['English','മലയാളം','हिन्दी','தமிழ்']]].map(([col, links]) => (
                <div key={col}>
                  <h4 className="text-white font-semibold text-sm mb-3">{col}</h4>
                  <ul className="space-y-2">{links.map(l => <li key={l}><a href="#" className="text-xs hover:text-green-400 transition">{l}</a></li>)}</ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-xs">
              <div>© 2026 Kerala Farming AI Assistant. Built with ❤️ for Kerala farmers.</div>
              <div className="mt-1 text-gray-500">Owner: Zaid · 📞 6304497470</div>
            </div>
          </div>
        </footer>

        {/* Floating Chat Button */}
        <button onClick={() => scrollTo('chat-section')} className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition flex items-center justify-center z-40">
          <span className="text-xl">🌾</span>
        </button>
      </div>
    </>
  );
}
