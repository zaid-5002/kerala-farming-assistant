import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, Droplets, Bug, Sun, Wind, MessageCircle, ChevronDown, Sparkles } from 'lucide-react';

const KeralaFarmingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your AI farming assistant for Kerala farmers.',
      malText: 'നമസ്കാരം! കേരളത്തിലെ കർഷകർക്കായി ഞാൻ AI സഹായി ആണ്.',
      subText: 'Ask about crops, pest control, irrigation, and more! 🌾'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    { emoji: '⚡', text: 'Best crops for monsoon?', mal: 'മൺസൂണിനുള്ള മികച്ച വിളകൾ?' },
    { emoji: '🥥', text: 'Coconut tree care tips', mal: 'തേങ്ങ മരത്തിന്റെ പരിചരണം' },
    { emoji: '🐛', text: 'Pest control for paddy', mal: 'നെല്ലിനുള്ള കീടനിയന്ത്രണം' },
    { emoji: '💧', text: 'Irrigation guidance', mal: 'സേചന മാർഗ്ഗദർശനം' },
    { emoji: '🌱', text: 'Soil health for Kerala', mal: 'കേരളത്തിലെ മണ്ണിന്റെ ആരോഗ്യം' },
    { emoji: '📅', text: 'Harvesting schedule', mal: 'വിളവെടുപ്പിന്റെ സമയം' },
    { emoji: '🌿', text: 'Organic farming tips', mal: 'ജൈവ കൃഷി നുറുങ്ങുകൾ' },
    { emoji: '🏛️', text: 'Government schemes', mal: 'സർക്കാർ പദ്ധതികൾ' }
  ];

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    chatSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(null, suggestion.text);
  };

  const handleSendMessage = async (e, messageText = null) => {
    if (e) e.preventDefault();
    
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: data.response || 'Sorry, I couldn\'t understand that. Please try again.'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: 'Error connecting to the server. Please try again.'
      }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 via-green-50 to-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">Kerala Farming Assistant</div>
              <div className="text-xs text-green-600 font-medium">കേരള കൃഷി സഹായി</div>
            </div>
          </div>
          <button
            onClick={scrollToChat}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Ask AI Now
          </button>
        </div>
      </nav>

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-blue-100 to-lime-100"></div>

          {/* Animated clouds */}
          <div 
            className="absolute top-16 left-12 w-48 h-28 bg-white/50 rounded-full blur-3xl"
            style={{
              animation: 'float 8s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute top-32 right-16 w-56 h-32 bg-white/40 rounded-full blur-3xl"
            style={{
              animation: 'float 10s ease-in-out infinite',
              animationDelay: '1s'
            }}
          ></div>

          {/* Crop field with SVG */}
          <svg className="absolute bottom-0 w-full h-96 opacity-90" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#65a30d" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#4b5d1a" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="1200" height="400" fill="url(#fieldGradient)" />
            
            {/* Animated crop rows */}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={i} filter="url(#glow)">
                {Array.from({ length: 12 }).map((_, j) => (
                  <g key={`plant-${i}-${j}`}>
                    {/* Stem */}
                    <path
                      d={`M ${i * 60 + 20} 380 Q ${i * 60 + 25} 330 ${i * 60 + 20} 280`}
                      stroke="#7c3a1d"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.6"
                    />
                    {/* Leaves */}
                    <circle
                      cx={i * 60 + 20}
                      cy={380 - j * 8}
                      r="4"
                      fill="#22c55e"
                      opacity={0.5 + j * 0.04}
                      style={{
                        animation: `sway ${2.5 + (i + j) * 0.15}s ease-in-out infinite`,
                        transformOrigin: `${i * 60 + 20}px ${380 - j * 8}px`
                      }}
                    />
                    <circle
                      cx={i * 60 + 12}
                      cy={380 - j * 8 - 2}
                      r="3"
                      fill="#86efac"
                      opacity={0.4 + j * 0.03}
                      style={{
                        animation: `sway ${2.8 + (i + j) * 0.15}s ease-in-out infinite`,
                        animationDelay: '0.3s',
                        transformOrigin: `${i * 60 + 12}px ${380 - j * 8 - 2}px`
                      }}
                    />
                  </g>
                ))}
              </g>
            ))}
          </svg>

          {/* Animated Farmer - Smooth & Artistic */}
          <div 
            className="absolute bottom-48 left-1/4 text-7xl"
            style={{
              animation: 'farmersway 3.5s ease-in-out infinite',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
              transformOrigin: 'center bottom'
            }}
          >
            👨‍🌾
          </div>

          {/* Watering can animation */}
          <div 
            className="absolute bottom-56 left-1/3 text-5xl"
            style={{
              animation: 'pour 4s ease-in-out infinite',
              transformOrigin: '50% 100%',
              opacity: 0.8
            }}
          >
            💧
          </div>

          {/* Sun with glow */}
          <div 
            className="absolute top-20 right-20 w-28 h-28 bg-yellow-300 rounded-full blur-2xl opacity-70"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute top-20 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-90"
            style={{
              animation: 'pulse 3s ease-in-out infinite'
            }}
          ></div>

          {/* Floating leaves */}
          {[0, 1, 2].map((i) => (
            <div
              key={`leaf-${i}`}
              className="absolute text-2xl"
              style={{
                animation: `float-leaves ${5 + i * 1}s linear infinite`,
                opacity: 0.5,
                left: `${20 + i * 25}%`,
                top: `${30 + i * 15}%`
              }}
            >
              🍃
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8 inline-block animate-bounce" style={{ animationDuration: '2s' }}>
            <span className="text-sm font-semibold text-green-700 bg-green-100/70 px-4 py-2 rounded-full backdrop-blur-sm">
              🌾 AI-Powered Farming Guidance
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Grow Better <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Crops</span> with AI
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your personal AI farming assistant for Kerala. Get instant advice on crops, pest control, irrigation, soil health, and government schemes.
          </p>

          <button
            onClick={scrollToChat}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6" />
            Start Chatting Now
          </button>

          <div className="mt-12 flex justify-center">
            <ChevronDown className="w-8 h-8 text-green-600 animate-bounce" />
          </div>
        </div>

        <style>{`
          @keyframes sway {
            0%, 100% { transform: translateX(0px) rotate(0deg); }
            25% { transform: translateX(3px) rotate(0.3deg); }
            75% { transform: translateX(-3px) rotate(-0.3deg); }
          }
          
          @keyframes farmersway {
            0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
            25% { transform: translateX(-5px) translateY(-3px) rotate(-1deg); }
            50% { transform: translateX(0px) translateY(-6px) rotate(0deg); }
            75% { transform: translateX(5px) translateY(-3px) rotate(1deg); }
          }
          
          @keyframes pour {
            0%, 100% { transform: rotateZ(-20deg); opacity: 0.3; }
            50% { transform: rotateZ(20deg); opacity: 0.9; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          
          @keyframes float-leaves {
            0% { transform: translateX(0) translateY(-100px) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateX(100px) translateY(600px) rotate(360deg); opacity: 0; }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </section>

      {/* Chat Section - Early Placement */}
      <section id="chat-section" className="relative py-20 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Chat with AI Farmer</h2>
            <p className="text-gray-600">Ask anything about farming in Kerala</p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-auto max-h-96">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                    style={{
                      animation: 'fadeIn 0.3s ease-in'
                    }}
                  >
                    <p className="text-sm font-medium">{msg.text}</p>
                    {msg.malText && (
                      <p className="text-xs mt-1 opacity-80">{msg.malText}</p>
                    )}
                    {msg.subText && (
                      <p className="text-xs mt-1">{msg.subText}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions */}
            {showSuggestions && messages.length <= 1 && (
              <div className="px-6 py-4 bg-gradient-to-b from-green-50 to-white border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Quick suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-xs font-medium transition border border-green-300 hover:border-green-400 whitespace-nowrap"
                    >
                      {suggestion.emoji} {suggestion.text.split(' ').slice(0, 2).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-green-50 to-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about crops, pests, irrigation... (English/Malayalam)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">What Can I Help With?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: 'Best Crops',
                mal: 'മികച്ച വിളകൾ',
                desc: 'Monsoon planting tips & seasonal guidance'
              },
              {
                icon: <Bug className="w-8 h-8" />,
                title: 'Pest Control',
                mal: 'കീടനിയന്ത്രണം',
                desc: 'Organic solutions & prevention tips'
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: 'Irrigation',
                mal: 'സേചനം',
                desc: 'Water management for rice & coconut'
              },
              {
                icon: <Sun className="w-8 h-8" />,
                title: 'Soil Health',
                mal: 'മണ്ണിന്റെ ആരോഗ്യം',
                desc: 'Nutrient management & soil tests'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition border border-green-200 hover:border-green-400"
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-green-600 font-medium mb-2">{feature.mal}</p>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>

          <div className="space-y-8">
            {[
              { num: '1', title: 'Ask Your Question', mal: 'നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക', desc: 'Type any farming question in the chat' },
              { num: '2', title: 'Get Instant Advice', mal: 'തൽക്ഷണ നിർദ്ദേശം ലഭിക്കുക', desc: 'AI analyzes & provides Kerala-specific solutions' },
              { num: '3', title: 'Apply & Grow', mal: 'പ്രയോഗിക്കുക & വളരുക', desc: 'Follow recommendations & improve your harvest' }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-green-600 font-medium mb-2">{step.mal}</p>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Farmer Success Stories</h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                name: 'രാജേഷ് കുമാർ',
                engName: 'Rajesh Kumar',
                role: 'Rice Farmer, Ernakulam',
                quote: 'This AI assistant helped me save my paddy crop from pest infestation. Best tool I\'ve used!'
              },
              {
                name: 'സുധീര് സിംഹ്',
                engName: 'Sudhir Singh',
                role: 'Coconut Farmer, Thiruvananthapuram',
                quote: 'Irrigation advice was spot-on. Saved 40% water and got better yield!'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg transition">
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Better?</h2>
          <p className="text-xl mb-8 text-green-100">Start chatting with your AI farming assistant today. It's free and always available.</p>
          <button
            onClick={scrollToChat}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 active:scale-95"
          >
            Start Now 🌾
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Kerala Farming AI</h3>
              <p className="text-sm">Your personal AI assistant for modern farming</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <p className="text-sm">24/7 AI assistance available for all farmers</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <p className="text-sm">Follow us for farming tips and updates</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Kerala Farming Assistant. Built with ❤️ for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KeralaFarmingAssistant;
