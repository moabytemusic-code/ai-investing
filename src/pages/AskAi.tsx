import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Terminal, 
  Sparkles, 
  Send, 
  ArrowRight, 
  Zap, 
  ExternalLink,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Supabase Client (Only use ANON_KEY maliciously exposing SERVICE_ROLE_KEY on the client is dangerous)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  role: 'user' | 'ai';
  content: string;
  insights?: string[];
  takeaway?: string;
  tool?: { name: string; link: string; description: string };
}

interface LiveInsight {
  content: string;
  metadata?: any;
  category: string;
  sentiment_score: string | number;
}

export default function AskAi() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveInsights, setLiveInsights] = useState<LiveInsight[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Fetch live market data when component mounts
    const fetchLiveInsights = async () => {
      try {
        const { data, error } = await supabase
          .from('market_insights')
          .select('content, metadata, category, sentiment_score')
          .order('sentiment_score', { ascending: false })
          .limit(3);
        
        if (!error && data) {
          setLiveInsights(data);
        }
      } catch (err) {
        console.error("Error fetching live data", err);
      }
    };
    fetchLiveInsights();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI Intelligence Response (In production, This calls the RAG engine)
    setTimeout(() => {
      let aiResponse: Message;

      if (text.toLowerCase().includes('bitcoin')) {
        aiResponse = {
          role: 'ai',
          content: "Bitcoin is currently testing key resistance levels at $68,500. Institutional inflow via ETFs remains strong, but short-term liquidations are looming.",
          insights: [
            "Spot ETF volume is up 12% in the last 24h.",
            "Long/Short ratio is leaning slightly bearish, suggesting a healthy shakeout could happen before next leg up.",
            "Whale accumulation addresses hit a 3-year high yesterday."
          ],
          takeaway: "The medium-term trend is bullish, but expect volatility over the weekend. Look for a daily close above $69k for confirmation.",
          tool: { name: "Bybit AI", link: "#", description: "Automated crypto sentiment tracking." }
        };
      } else {
        aiResponse = {
          role: 'ai',
          content: "Market conditions are currently dominated by macroeconomic uncertainty around inflation and high-interest rates, though specific sectors remain resilient.",
          insights: [
            "Consumer spending remains surprisingly robust despite high rates.",
            "The energy sector is hedging against geopolitical instability.",
            "Tech earnings are still the primary catalyst for overall market direction."
          ],
          takeaway: "Maintain a diversified portfolio with a focus on high-cash-flow companies. Avoid high-leverage positions.",
          tool: { name: "eToro CopyTrader", link: "#", description: "Mirror the top-performing AI-driven portfolios." }
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 h-[calc(100vh-200px)] flex flex-col pt-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tighter">INVESTAI <span className="text-emerald-500">ENGINE</span></h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          The most advanced RAG financial intelligence unit. Ask anything about the markets.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden flex flex-col flex-1 relative shadow-2xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Terminal size={20} className="text-emerald-500" />
            <div className="text-left">
              <p className="text-white font-bold text-sm">AI Financial Intelligence</p>
              <p className="text-emerald-500 text-[11px] font-medium flex items-center gap-1.5 animate-pulse">
                ● Real-time analysis active
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-bold text-gray-500 border border-white/10 uppercase tracking-widest">RAG ENABLED</div>
            <div className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-bold text-gray-500 border border-white/10 uppercase tracking-widest">WEB SEARCH ACTIVE</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 min-h-[400px]">
          {messages.length === 0 && (
            <div className="h-full w-full flex flex-col items-center pt-10">
              <Sparkles size={40} className="text-emerald-500 mb-6" />
              <p className="text-gray-300 font-bold text-xl uppercase tracking-widest mb-10">AI Engine is primed and ready.</p>
              
              {liveInsights.length > 0 && (
                <div className="w-full max-w-2xl px-4 animate-reveal">
                  <p className="text-emerald-500 text-xs font-black tracking-widest uppercase mb-4 opacity-80 flex items-center gap-2">
                    <Activity size={14} /> LIVE MARKET SENTIMENT
                  </p>
                  <div className="space-y-4 w-full">
                    {liveInsights.map((insight, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-2 hover:border-emerald-500/30 transition-all text-left">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold tracking-widest">{insight.category}</span>
                           <span className="text-[10px] text-gray-500 border border-white/10 rounded px-2">Score: {insight.sentiment_score}</span>
                        </div>
                        <p className="text-sm text-gray-300 font-medium leading-relaxed">{insight.content.substring(0, 150)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] rounded-2xl p-6 ${msg.role === 'user' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white/[0.04] border border-white/10 text-gray-200'}`}>
                  {msg.role === 'ai' && <p className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-4 tracking-widest">ANALYSIS UNIT 01</p>}
                  <p className="text-base mb-4 leading-relaxed">{msg.content}</p>
                  {msg.insights && (
                    <ul className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {msg.insights.map((ins, j) => <li key={j} className="text-[13px] text-gray-400 flex gap-2"><ArrowRight size={14} className="text-emerald-500" /> {ins}</li>)}
                    </ul>
                  )}
                  {msg.tool && (
                    <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between items-center gap-4">
                       <div className="flex items-center gap-3">
                         <Zap size={20} className="text-emerald-500" />
                         <div>
                           <p className="font-bold text-sm text-white">{msg.tool.name}</p>
                           <p className="text-xs text-gray-500">{msg.tool.description}</p>
                         </div>
                       </div>
                       <a href={msg.tool.link} className="p-2.5 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors"><ExternalLink size={16} /></a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="text-emerald-500 animate-pulse text-xs font-mono">ENGINE_PROCESS_ACTIVE...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="relative flex items-center max-w-3xl mx-auto">
            <input 
              type="text" 
              placeholder="Scan markets, tickers, or strategies..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-5 pr-16 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            />
            <button onClick={() => handleSendMessage(inputMessage)} className="absolute right-3 w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
