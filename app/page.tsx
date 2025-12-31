'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plane, MapPin, Calendar, Users, Sparkles, Globe, TrendingUp, Heart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Travel Assistant. I can help you plan your perfect trip, find destinations, book flights, and create amazing itineraries. Where would you like to go?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Beach vacation', 'Mountain adventure', 'City exploration', 'Cultural tour']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: getContextualSuggestions(text)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('beach') || lowerText.includes('ocean') || lowerText.includes('sea')) {
      return "Great choice! Beach destinations are perfect for relaxation. I'd recommend the Maldives, Bali, or the Greek Islands. When are you planning to travel, and how many days do you have?";
    } else if (lowerText.includes('mountain') || lowerText.includes('hiking') || lowerText.includes('adventure')) {
      return "Adventure awaits! The Swiss Alps, Patagonia, and the Himalayas offer breathtaking mountain experiences. What's your experience level with hiking, and what time of year works best for you?";
    } else if (lowerText.includes('city') || lowerText.includes('urban')) {
      return "City exploration is exciting! Paris, Tokyo, New York, and Barcelona are amazing urban destinations. Are you interested in history, food, nightlife, or all of the above?";
    } else if (lowerText.includes('budget') || lowerText.includes('cheap') || lowerText.includes('affordable')) {
      return "I can help you find budget-friendly options! Southeast Asia, Eastern Europe, and Central America offer great value. What's your approximate budget per day?";
    } else if (lowerText.includes('when') || lowerText.includes('date') || lowerText.includes('time')) {
      return "Timing is important! Let me know your preferred travel dates or the season you're thinking about. I can check weather patterns, peak seasons, and the best deals for that time.";
    } else {
      return "That sounds interesting! To help you better, could you tell me more about your travel preferences? Are you looking for relaxation, adventure, culture, or a mix of everything?";
    }
  };

  const getContextualSuggestions = (userText: string): string[] => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('beach')) {
      return ['Show me hotels', 'What activities are available?', 'Best time to visit', 'Flight options'];
    } else if (lowerText.includes('mountain')) {
      return ['Hiking trails', 'Equipment needed', 'Weather conditions', 'Guided tours'];
    } else if (lowerText.includes('city')) {
      return ['Top attractions', 'Local cuisine', 'Public transport', 'Nightlife spots'];
    } else {
      return ['Tell me more', 'Show destinations', 'Check availability', 'Get price estimate'];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-96 bg-white/80 backdrop-blur-xl border-r border-gray-200/60 flex-col shadow-xl">
        <div className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TravelBot AI</h1>
              <p className="text-sm text-gray-600 font-medium">Your travel companion</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50/50 rounded-2xl p-5 border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Quick Actions</h3>
            </div>
            <div className="space-y-2.5">
              <button 
                onClick={() => handleSendMessage('Find me a beach vacation')}
                className="w-full text-left px-4 py-3 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 border border-gray-200/50 hover:border-blue-300 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🏖️</span>
                  <span className="group-hover:text-blue-600 transition-colors">Beach Vacation</span>
                </span>
              </button>
              <button 
                onClick={() => handleSendMessage('Plan a city tour')}
                className="w-full text-left px-4 py-3 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 border border-gray-200/50 hover:border-purple-300 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🏙️</span>
                  <span className="group-hover:text-purple-600 transition-colors">City Tour</span>
                </span>
              </button>
              <button 
                onClick={() => handleSendMessage('Adventure trip ideas')}
                className="w-full text-left px-4 py-3 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 border border-gray-200/50 hover:border-green-300 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">⛰️</span>
                  <span className="group-hover:text-green-600 transition-colors">Adventure Trip</span>
                </span>
              </button>
              <button 
                onClick={() => handleSendMessage('Budget travel options')}
                className="w-full text-left px-4 py-3 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 border border-gray-200/50 hover:border-amber-300 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <span className="group-hover:text-amber-600 transition-colors">Budget Travel</span>
                </span>
              </button>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50/50 rounded-2xl p-5 border border-purple-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Popular Destinations</h3>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between px-3 py-2.5 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-purple-200">
                <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">🇫🇷 Paris</span>
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">from $599</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-purple-200">
                <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">🇯🇵 Tokyo</span>
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">from $899</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-purple-200">
                <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">🇮🇹 Rome</span>
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">from $549</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-purple-200">
                <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">🇹🇭 Bali</span>
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">from $449</span>
              </div>
            </div>
          </div>

          {/* Travel Tips */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50/50 rounded-2xl p-5 border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Travel Tips</h3>
            </div>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">Book flights 2-3 months in advance</span>
              </li>
              <li className="flex items-start gap-3 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">Travel during shoulder season for better deals</span>
              </li>
              <li className="flex items-start gap-3 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">Check visa requirements early</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 sm:px-6 py-4 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 lg:hidden">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Travel Assistant</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600 font-medium">Online • Ready to help</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-transparent to-blue-50/20">
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-3xl px-5 py-4 shadow-lg transition-all duration-300 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                        : 'bg-white/90 backdrop-blur-sm border border-gray-200/60 text-gray-900 shadow-gray-200/50 hover:shadow-xl'
                    }`}
                  >
                    <p className={`text-sm sm:text-base leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-3 font-medium ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-4 ml-0 animate-slideIn">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2.5 text-sm font-medium bg-white/90 backdrop-blur-sm border border-gray-300/60 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-gray-700 hover:text-blue-600 transform hover:scale-105 active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl px-5 py-4 shadow-lg">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/60 px-4 py-5 shadow-lg">
          <div className="max-w-5xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-3 items-end"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about travel..."
                  className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-300/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-105 active:scale-95 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium">AI-powered travel assistant</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 font-medium">Always learning to serve you better</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
