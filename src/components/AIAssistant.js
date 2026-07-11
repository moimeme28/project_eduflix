import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

const QUICK_PROMPTS = [
  'Recommend biology documentaries',
  'I want to learn about AI',
  'Create a study plan for history',
  'Best content for beginners',
  'Explain genetics simply',
];

const generateAIResponse = (query) => {
  const q = query.toLowerCase();

  if (q.includes('biology') || q.includes('genetics') || q.includes('dna')) {
    return "I'd recommend starting with 'The Science of Everything' documentary series — it covers genetics in an accessible way with great visuals. For a deeper dive, 'DNA: The Secret of Life' is excellent. Would you like me to create a personalized learning path for genetics?";
  }
  if (q.includes('history') || q.includes('world war') || q.includes('wwii')) {
    return "For World War II, I recommend 'The World at War' — it's comprehensive and well-researched. 'Apocalypse: World War II' is also excellent with rare footage. What specific aspect of WWII interests you most?";
  }
  if (q.includes('technology') || q.includes('ai') || q.includes('programming') || q.includes('machine learning')) {
    return "Great choice! For AI, 'AlphaGo' is a fascinating documentary. 'The Code' series covers programming fundamentals beautifully. I can also recommend specific episodes that explain machine learning. What's your current knowledge level?";
  }
  if (q.includes('math') || q.includes('mathematics') || q.includes('calculus') || q.includes('algebra')) {
    return "For mathematics, I recommend 'The Story of Maths' by Marcus du Sautoy — it covers the history beautifully. 'A Beautiful Mind' and 'The Man Who Knew Infinity' are also inspiring. What branch of mathematics are you studying?";
  }
  if (q.includes('environment') || q.includes('climate') || q.includes('nature')) {
    return "David Attenborough's 'A Life on Our Planet' is a must-watch for environmental topics. 'Before the Flood' with Leonardo DiCaprio is excellent for climate change. 'Our Planet' on Netflix is also stunning. Interested in a specific environmental topic?";
  }
  if (q.includes('recommend') || q.includes('suggest') || q.includes('best')) {
    return "I can find the perfect educational content for you! Just tell me:\n\n• What subject you want to learn\n• Your level (beginner / intermediate / advanced)\n• Preferred format (documentary, movie, series)\n\nThen I'll give you personalized recommendations with explanations of why each one fits your learning goals.";
  }
  if (q.includes('study plan') || q.includes('learning path') || q.includes('curriculum')) {
    return "I can create a personalized study plan! Please share:\n\n1. Your learning goal\n2. Available time per week\n3. Current knowledge level\n4. Preferred learning style (visual, reading, hands-on)\n\nI'll structure a plan with recommended content, milestones, and progress checkpoints.";
  }
  if (q.includes('beginner') || q.includes('start') || q.includes('new to')) {
    return "Welcome to your learning journey! For beginners I always recommend:\n\n• Start with documentary series (short episodes are easier)\n• Pick a subject you're genuinely curious about\n• Explore our 'beginner' filter in Recommendations\n\nWhat subject sparks your curiosity?";
  }

  return "That's a great question! EduFlix has content across Science, Technology, History, Mathematics, Arts, Environment, and more. Tell me your specific interest and I'll find the most relevant educational content for your level and preferred format. What would you like to explore?";
};

const AIAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'assistant',
      content: "Hi! I'm your EduFlix AI assistant. I can help you find educational content, explain topics, or create study plans. What would you like to learn today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg = { id: nextId.current++, role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'assistant', content: response },
      ]);
      setIsTyping(false);
    }, 1200);
  }, [input, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl h-[600px] glass-card flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-surface flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold">EduFlix AI</h2>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by AI • Press Esc to close
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close AI assistant"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-primary text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-200 rounded-bl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-white/10 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-dark-surface flex-shrink-0">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about learning... (Enter to send)"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
              maxLength={500}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="px-4 py-3 rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
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
