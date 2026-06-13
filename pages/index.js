import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, Droplets, Bug, Sun } from 'lucide-react';
import Head from 'next/head';

const KeralaFarmingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your AI farming assistant for Kerala farmers.",
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
        text: data.response || "Sorry, I couldn't understand that. Please try again."
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
    <>
      <Head>
        <title>Kerala Farming Assistant 🌾</title>
        <meta name="description" content="AI-powered farming assistant for Kerala farmers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-blue-100 to-lime-100"></div>

            {/* Animated clouds */}
            <div
              className="absolute top-16 left-12 w-48 h-28 bg-white/50 rounded-full blur-3xl"
              style={{ animation: 'float 8s ease-in-out infinite' }}
            ></div>
            <div
              className="absolute top-32 right-16 w-56 h-32 bg-white/40 rounded-full blur-3xl"
              style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '1s' }}
            ></div>

            {/* Crop field SVG */}
            <svg className="absolute bottom-0 w-full h-64 opacity-90" viewBox="0 0 1200 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#84cc16" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#65a30d" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#4b5d1a" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="1200" height="300" fill="url(#fieldGradient)" />
              {Array.from({ length: 20 }).map((_, i) => (
                <g key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <circle
                      key={`plant-${i}-${j}`}
                      cx={i * 60 + 20}
                      cy={280 - j * 10}
                      r="5"
                      fill="#22c55e"
                      opacity={0.5 + j * 0.05}
                      style={{
                        animation: `sway ${2.5 + (i + j) * 0.15}s ease-in-out infinite`,
                        transformOrigin: `${i * 60 + 20}px ${280 - j * 10}px`
                      }}
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI-Powered • Kerala Specific • Free to Use
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Kerala Farming
              <span className="block text-green-600">AI Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 mb-3">കേരള കൃഷി AI സഹായി</p>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Get instant expert advice on crops, pest control, irrigation & government schemes — in English or Malayalam
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToChat}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🌾 Start Chatting
              </button>
              <button
                onClick={scrollToChat}
                className="px-8 py-4 bg-white text-green-700 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-md border border-green-200"
              >
                💬 ചോദ്യം ചോദിക്കുക
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
            onClick={scrollToChat}
            style={{ animation: 'bounce 2s ease-in-out infinite' }}
          >
            <div className="w-8 h-8 border-2 border-green-600 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">↓</span>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section id="chat-section" className="py-16 px-4 bg-gradient-to-b from-lime-50 to-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Ask Your Farming Question</h2>
              <p className="text-green-600 font-medium">നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Kerala Farming AI</div>
                  <div className="text-green-100 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                    Online & Ready
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <span className="text-sm">🌾</span>
                      </div>
                    )}
                    <div
                      className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-green-600 text-white rounded-tr-sm'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.malText && (
                        <p className="text-xs mt-1 opacity-75">{message.malText}</p>
                      )}
                      {message.subText && (
                        <p className="text-xs mt-2 text-green-600 font-medium">{message.subText}</p>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-sm">🌾</span>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions */}
              {showSuggestions && (
                <div className="px-4 py-3 border-t border-gray-100 bg-white">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Quick Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-full text-xs font-medium transition border border-green-200 hover:border-green-300 whitespace-nowrap"
                      >
                        {suggestion.emoji} {suggestion.text.split(' ').slice(0, 3).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about crops, pests, irrigation... (English/Malayalam)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">What Can I Help With?</h2>
            <p className="text-center text-green-600 mb-16 font-medium">ഞാൻ എന്ത് സഹായിക്കും?</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Leaf className="w-8 h-8" />, title: 'Best Crops', mal: 'മികച്ച വിളകൾ', desc: 'Monsoon planting tips & seasonal guidance' },
                { icon: <Bug className="w-8 h-8" />, title: 'Pest Control', mal: 'കീടനിയന്ത്രണം', desc: 'Organic solutions & prevention tips' },
                { icon: <Droplets className="w-8 h-8" />, title: 'Irrigation', mal: 'സേചനം', desc: 'Water management for rice & coconut' },
                { icon: <Sun className="w-8 h-8" />, title: 'Soil Health', mal: 'മണ്ണിന്റെ ആരോഗ്യം', desc: 'Nutrient management & soil tests' }
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition border border-green-100 hover:border-green-300">
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
                  quote: "This AI assistant helped me save my paddy crop from pest infestation. Best tool I've used!"
                },
                {
                  name: 'സുധീർ സിംഹ്',
                  engName: 'Sudhir Singh',
                  role: 'Coconut Farmer, Thiruvananthapuram',
                  quote: 'Irrigation advice was spot-on. Saved 40% water and got better yield!'
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg transition">
                  <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.engName} · {testimonial.role}</p>
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
            <p className="text-xl mb-8 text-green-100">Start chatting with your AI farming assistant today. Free and always available.</p>
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
    </>
  );
};

export default KeralaFarmingAssistant;
