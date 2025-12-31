'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plane, MapPin, Calendar, Users, Sparkles } from 'lucide-react';

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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-80 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TravelBot AI</h1>
              <p className="text-sm text-gray-500">Your travel companion</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-2 mt-3">
                <button 
                  onClick={() => handleSendMessage('Find me a beach vacation')}
                  className="w-full text-left px-3 py-2 text-sm bg-white rounded-lg hover:bg-blue-50 transition-colors text-gray-700"
                >
                  🏖️ Beach Vacation
                </button>
                <button 
                  onClick={() => handleSendMessage('Plan a city tour')}
                  className="w-full text-left px-3 py-2 text-sm bg-white rounded-lg hover:bg-blue-50 transition-colors text-gray-700"
                >
                  🏙️ City Tour
                </button>
                <button 
                  onClick={() => handleSendMessage('Adventure trip ideas')}
                  className="w-full text-left px-3 py-2 text-sm bg-white rounded-lg hover:bg-blue-50 transition-colors text-gray-700"
                >
                  ⛰️ Adventure Trip
                </button>
                <button 
                  onClick={() => handleSendMessage('Budget travel options')}
                  className="w-full text-left px-3 py-2 text-sm bg-white rounded-lg hover:bg-blue-50 transition-colors text-gray-700"
                >
                  💰 Budget Travel
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Popular Destinations</h3>
              </div>
              <div className="space-y-2 mt-3 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span>🇫🇷 Paris</span>
                  <span className="text-xs text-gray-500">from $599</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🇯🇵 Tokyo</span>
                  <span className="text-xs text-gray-500">from $899</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🇮🇹 Rome</span>
                  <span className="text-xs text-gray-500">from $549</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🇹🇭 Bali</span>
                  <span className="text-xs text-gray-500">from $449</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-gray-900">Travel Tips</h3>
              </div>
              <ul className="space-y-2 mt-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Book flights 2-3 months in advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Travel during shoulder season for better deals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Check visa requirements early</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center lg:hidden">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Travel Assistant</h2>
                <p className="text-sm text-gray-500">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
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
                  <div className="flex flex-wrap gap-2 mt-3 ml-0">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-400 transition-all text-gray-700 hover:text-blue-600"
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
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about travel..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI-powered travel assistant • Always learning to serve you better
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
