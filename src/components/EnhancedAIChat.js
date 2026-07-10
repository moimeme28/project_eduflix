import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const EnhancedAIChat = ({ accent, onClose, context, user }) => {
  const { currentTheme } = useTheme();
  const [msgs, setMsgs] = useState([
    { 
      role: "assistant", 
      text: `Hey ${user || 'there'}! 🎬 I'm your AI recommendation expert. I can see you're feeling **${context.mood}**. 

I can help you with:
• **Personalized suggestions** based on your taste
• **Similar content** to what you like
• **Hidden gems** you might have missed
• **Watching plans** for movie nights
• **Book pairings** for movies you love

What would you like to explore today?` 
    }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What should I watch tonight?",
    "Find me hidden gems",
    "Similar to [movie name]",
    "Plan a movie marathon",
    "Book recommendations like [book title]"
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setThinking(true);

    try {
      const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google AI API key not configured');
      }

      // Build conversation history for Gemini
      const conversationHistory = msgs.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }));

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are MoodCurator's expert AI assistant - a sophisticated movie and book recommendation engine with deep knowledge of:

• User's current mood: ${context.mood}
• User's viewing history: ${context.watchlist?.length || 0} saved items
• User preferences and patterns
• Real-time streaming availability
• Critical ratings and reviews

Your personality: Enthusiastic, knowledgeable, and genuinely helpful. You provide:
1. **Specific, actionable recommendations** with reasoning
2. **Context-aware suggestions** based on mood and history
3. **Alternative options** when primary suggestions don't fit
4. **Practical viewing advice** (streaming, timing, etc.)
5. **Follow-up questions** to refine recommendations

Keep responses conversational but concise (2-4 sentences max). Use emojis occasionally. Be genuinely enthusiastic about great content!` }]
            },
            ...conversationHistory,
            {
              role: "user",
              parts: [{ text: userMsg }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API error');
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now, but I'd love to help you find something amazing to watch!";
      
      setMsgs(m => [...m, { role: "assistant", text }]);
      
      // Update suggestions based on conversation
      if (userMsg.toLowerCase().includes('similar')) {
        setSuggestions([
          "More like this director",
          "Same genre recommendations",
          "Similar themes",
          "If you liked this, try..."
        ]);
      } else if (userMsg.toLowerCase().includes('marathon')) {
        setSuggestions([
          "Plan a trilogy marathon",
          "Actor filmography marathon",
          "Genre-based marathon",
          "Decade marathon"
        ]);
      }

    } catch (error) {
      console.error('AI Chat Error:', error);
      let errorMessage = "I'm having trouble connecting right now. Please try again!";
      
      if (error.message === 'Google AI API key not configured') {
        errorMessage = "⚠️ AI service not configured. Please add REACT_APP_GOOGLE_AI_API_KEY to your environment variables.";
      } else if (error.message?.includes('401') || error.message?.includes('403') || error.message?.includes('API key')) {
        errorMessage = "⚠️ Invalid API key. Please check your Google AI API key configuration. Make sure you got the key from https://makersuite.google.com/app/apikey";
      } else if (error.message?.includes('429') || error.message?.includes('quota')) {
        errorMessage = "⚠️ Rate limit exceeded. Please wait a moment and try again.";
      } else if (error.message?.includes('fetch')) {
        errorMessage = "⚠️ Network error. Please check your internet connection.";
      } else {
        errorMessage = `⚠️ Error: ${error.message}`;
      }
      
      setMsgs(m => [...m, { 
        role: "assistant", 
        text: errorMessage 
      }]);
    }
    setThinking(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const quickActions = [
    { icon: "🎯", label: "Top Picks", action: "Show me your top recommendations" },
    { icon: "🔥", label: "Trending", action: "What's trending right now?" },
    { icon: "🎭", label: "Mood Match", action: "Perfect ${context.mood} movies" },
    { icon: "⭐", label: "Highly Rated", action: "Best rated content" },
    { icon: "🎲", label: "Surprise Me", action: "Random amazing pick" }
  ];

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      width: 380,
      zIndex: 800,
      background: currentTheme.background,
      border: `2px solid ${accent}`,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
      display: "flex",
      flexDirection: "column",
      maxHeight: "70vh"
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: `1px solid ${currentTheme.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: currentTheme.surface
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: currentTheme.text }}>
            🤖 AI Expert
          </div>
          <div style={{ fontSize: 11, color: accent }}>
            {context.mood} mode · Enhanced
          </div>
        </div>
        <button
          onClick={() => {
            console.log('Back button clicked');
            if (onClose) {
              onClose();
            }
          }}
          style={{
            background: "#ef4444",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "4px",
            marginLeft: "8px"
          }}
          type="button"
        >
          BACK
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{
        padding: "12px",
        borderBottom: `1px solid ${currentTheme.border}`,
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      }}>
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => setInput(action.action)}
            style={{
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: 20,
              color: currentTheme.text,
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "all 0.2s"
            }}
            title={action.label}
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              maxWidth: "85%",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? accent : currentTheme.surface,
              color: m.role === "user" ? "#ffffff" : currentTheme.text,
              fontSize: 13,
              lineHeight: 1.6,
              border: m.role === "user" ? "none" : `1px solid ${currentTheme.border}`
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              maxWidth: "85%",
              padding: "12px 16px",
              borderRadius: "18px 18px 18px 4px",
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              display: "flex",
              gap: 8,
              alignItems: "center"
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: accent,
                  animation: `pulse 1.2s ${i * 0.2}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={{
        padding: "8px 12px",
        borderTop: `1px solid ${currentTheme.border}`,
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }}>
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: 16,
              color: currentTheme.textSecondary,
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: 11,
              transition: "all 0.2s"
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px",
        display: "flex",
        gap: 8
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask me anything about movies, books, or recommendations..."
          style={{
            flex: 1,
            background: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: 12,
            color: currentTheme.text,
            padding: "10px 14px",
            fontSize: 13,
            outline: "none",
            fontFamily: "Inter, sans-serif"
          }}
        />
        <button
          onClick={send}
          disabled={thinking}
          style={{
            background: thinking ? currentTheme.textSecondary : accent,
            border: "none",
            borderRadius: 12,
            color: "#ffffff",
            padding: "10px 16px",
            cursor: thinking ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 700,
            transition: "background 0.2s"
          }}
        >
          {thinking ? "..." : "→"}
        </button>
      </div>
    </div>
  );
};

export default EnhancedAIChat;
