import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your EduFlix AI assistant. I can help you find educational content, explain topics, or create study plans. What would you like to learn today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('biology') || lowerQuery.includes('genetics')) {
      return "I'd recommend starting with 'The Science of Everything' documentary series. It covers genetics in an accessible way with great visual explanations. For a deeper dive, 'DNA: The Secret of Life' is excellent. Would you like me to create a personalized learning path for genetics?";
    }
    
    if (lowerQuery.includes('history') || lowerQuery.includes('world war')) {
      return "For World War II, I recommend 'The World at War' documentary series - it's comprehensive and well-researched. 'Apocalypse: World War II' is also excellent with rare footage. What specific aspect of WWII interests you most?";
    }
    
    if (lowerQuery.includes('technology') || lowerQuery.includes('ai') || lowerQuery.includes('programming')) {
      return "Great choice! For AI, 'AlphaGo' is a fascinating documentary about artificial intelligence. 'The Code' series covers programming fundamentals beautifully. I can also recommend specific episodes that explain machine learning concepts. What's your current knowledge level?";
    }
    
    if (lowerQuery.includes('recommend') || lowerQuery.includes('suggest')) {
      return "I can help you find the perfect educational content! Just tell me:\n\n• What subject you want to learn\n• Your current level (beginner/intermediate/advanced)\n• Preferred format (documentary, movie, series)\n\nThen I'll give you personalized recommendations with explanations of why each one is valuable for your learning goals.";
    }
    
    if (lowerQuery.includes('study plan') || lowerQuery.includes('learning path')) {
      return "I can create a personalized study plan for you! Please share:\n\n1. Your learning goal\n2. Available time per week\n3. Current knowledge level\n4. Preferred learning style\n\nI'll structure a plan with recommended content, milestones, and progress tracking.";
    }
    
    return "That's a great question! Based on your interest, I'd recommend exploring our subject categories to find related content. You can also tell me more about your learning goals so I can provide more specific recommendations. What subject are you most interested in?";
  };

  const quickPrompts = [
    "Recommend biology documentaries",
    "I want to learn about AI",
    "Create a study plan for history",
    "Best content for beginners",
    "Explain genetics simply"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[600px] glass-card flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold">EduFlix AI</h2>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 p-3 rounded-2xl">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-dark-surface">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about learning..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
