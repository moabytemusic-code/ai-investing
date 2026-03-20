import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Search, 
  BarChart3, 
  Zap, 
  ArrowRight, 
  Mail, 
  ShieldCheck, 
  Layers,
  Sparkles,
  ChevronRight,
  Send,
  Cpu,
  Monitor,
  Layout,
  Globe,
  Database,
  Terminal,
  Activity,
  UserCheck,
  ChevronDown,
  LineChart,
  PieChart,
  Lock,
  ExternalLink,
  PlusCircle,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Message {
  role: 'user' | 'ai';
  content: string;
  insights?: string[];
  takeaway?: string;
  tool?: { name: string; link: string; description: string };
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    "Is Bitcoin about to move?",
    "What AI stocks are trending right now?",
    "What’s the biggest risk in the market today?",
    "Summarize the latest market news",
    "Where are the biggest opportunities right now?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 2 && messages[1].role === 'ai') {
      const timer = setTimeout(() => {
        setShowEmailCapture(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI Intelligence Response
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
      } else if (text.toLowerCase().includes('ai stocks')) {
        aiResponse = {
          role: 'ai',
          content: "The AI sector is shifting from pure compute (Nvidia) to application-layer winners in vertical SaaS and cybersecurity.",
          insights: [
            "Nvidia (NVDA) is consolidating after massive earnings growth.",
            "Palantir (PLTR) and CrowdStrike (CRWD) are showing relative strength in the AI security space.",
            "Smaller-cap AI infra providers are seeing record VC funding flow."
          ],
          takeaway: "Diversify beyond the 'Magnificent 7' into enterprise AI solutions. Keep a close eye on interest rate sentiment.",
          tool: { name: "Alpha Vantage", link: "#", description: "Get real-time AI stock data APIs." }
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
    <div className="min-h-screen bg-[#05080f] text-[#e1e7ef] selection:bg-emerald-500/30 selection:text-white pb-32">
      {/* Background radial glow */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-[#05080f]/80">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg uppercase tracking-tight text-white">
            <TrendingUp size={22} className="text-emerald-500" />
            <span>InvestAL <span className="text-xs px-1.5 py-0.5 border border-white/10 rounded-md font-medium text-gray-500 ml-1">PRO</span></span>
          </div>
          <div className="hidden lg:flex gap-8 text-[13px] font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#engine" className="hover:text-white transition-colors">Ask AI</a>
            <a href="#directory" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold">AI Directory</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors">Free Guide</a>
          </div>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-[13px] font-bold transition-all shadow-lg hover:translate-y-[-1px] shadow-emerald-600/20 active:translate-y-0">
          Login
        </button>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 pt-32 lg:pt-48">
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col lg:flex-row gap-20 items-start mb-64">
          <div className="flex-1 animate-slide-up">
            <div className="mb-10 inline-flex flex-wrap items-center gap-4">
              <div className="badge badge-green">
                <Cpu size={14} className="animate-pulse" />
                NEW: RAG-POWERED FINANCIAL ENGINE
              </div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-px bg-gray-800" />
                VERSION 2.4.0
              </div>
            </div>

            <h1 className="text-hero mb-8 text-white">
              ASK AI WHAT'S <br />
              <span className="gradient-green">ACTUALLY</span> <br />
              HAPPENING.
            </h1>

            <p className="text-body-lg text-gray-500 mb-12 max-w-section leading-relaxed font-medium">
              Leverage the power of RAG technology to analyze market trends, stock metrics, and investment tools in real-time. <span className="text-white">Smart. Fast. Actionable.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button 
                onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary group px-10 py-5"
              >
                ASK THE ENGINE
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline px-10 py-5">
                GET FREE GUIDE
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#05080f] bg-gray-900 flex items-center justify-center overflow-hidden">
                    <TrendingUp size={14} className="text-emerald-500" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#05080f] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  +12k
                </div>
              </div>
              <p className="text-[13px] text-gray-500 font-medium">
                Joined by <span className="text-white">12,400+</span> smart investors this month.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-panel p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2 text-[11px] font-mono text-gray-500">
                <span className="text-emerald-400 flex items-center gap-2">LIVE TREND <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
                <span className="text-2xl font-bold text-white">+14.2%</span>
                <span>S&P 500 Sentiment Index</span>
              </div>
              
              <div className="mb-12">
                <img 
                  src="/src/assets/hero_bg.png" 
                  alt="Financial Data Visualization" 
                  className="w-full h-[300px] object-cover rounded-2xl opacity-50 contrast-125 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                  <Activity size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Analyzing 4.2M Data Points</h3>
                <p className="text-gray-500 text-sm max-w-[300px] mx-auto">
                  The engine is currently tracking 5,400+ stocks and crypto assets.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gray-600 uppercase">AI Recommendation</span>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">ACCUMULATE</span>
                  <div className="w-24 h-1.5 rounded-full bg-gray-900 mt-1 overflow-hidden">
                    <div className="w-[85%] h-full bg-emerald-500" />
                  </div>
                </div>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="mb-64">
          <div className="text-center mb-24">
            <div className="badge mb-6">THE CORE STACK</div>
            <h2 className="text-section mb-6 text-white max-w-2xl mx-auto">STOP GUESSING. <br /><span className="text-emerald-500">START WINNING.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp size={24} className="text-emerald-500" />, title: "Market Analysis", desc: "Real-time stock, crypto, and commodity analysis using multi-source RAG data pools." },
              { icon: <Search size={24} className="text-emerald-500" />, title: "Insight Extraction", desc: "Extract hidden patterns and institutional sentiment from news feeds, blog posts, and SEC filings." },
              { icon: <ShieldCheck size={24} className="text-emerald-500" />, title: "Risk Assessment", desc: "Quantify your portfolio risk using automated volatility models and historical context." },
              { icon: <Zap size={24} className="text-emerald-500" />, title: "Tool Discovery", desc: "Get personalized recommendations for the best AI investing tools for your strategy." }
            ].map((feat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="glass-panel p-10 hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- WORKFLOW SECTION --- */}
        <section className="mb-64 flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1">
            <div className="badge mb-6 text-emerald-500 font-bold">THE VISUALIZATION ENGINE</div>
            <h2 className="text-section mb-8 text-white leading-tight">Actionable Intelligence, <br /><span className="text-gray-600 italic">Beautifully Rendered.</span></h2>
            <p className="text-gray-500 mb-12 text-lg max-w-lg">
              We translate millions of raw financial data points into clean, meaningful visualizations that anyone can understand in seconds.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: <BarChart3 size={20} className="text-emerald-500" />, title: "Sentiment Heatmaps", desc: "Instantly see how the crowd is feeling about any ticker." },
                { icon: <PieChart size={20} className="text-emerald-500" />, title: "AI Portfolio Allocation", desc: "Optimal distribution based on your risk profile." },
                { icon: <TrendingUp size={20} className="text-emerald-500" />, title: "Volatility Forecasts", desc: "Predict price action using deep historical RAG data." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 border border-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="glass-panel p-8 flex flex-col items-start gap-12">
              <TrendingUp size={32} className="text-emerald-500" />
              <div>
                <span className="text-4xl font-bold text-white">142%</span>
                <p className="text-gray-500 text-xs font-mono uppercase mt-2">Average Annual Return</p>
              </div>
            </div>
            <div className="glass-panel p-8 bg-emerald-500/5 border-emerald-500/20">
              <div className="flex justify-between items-start mb-12">
                <PieChart size={32} className="text-emerald-500" />
                <span className="badge badge-green">LOW RISK</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-1">Balanced Growth</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">Allocation Strategy</p>
            </div>
            <div className="glass-panel p-8 md:col-span-2 flex flex-col gap-6">
               <div className="flex gap-2">
                 {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gray-900 border border-white/10" />)}
               </div>
               <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                 <div className="w-[70%] h-full bg-emerald-500" />
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-white font-bold">Sentiment Score</span>
                 <span className="text-emerald-500 font-mono text-xs">BULLISH</span>
               </div>
            </div>
          </div>
        </section>

        {/* --- ENGINE SECTION --- */}
        <section id="engine" className="mb-64 text-center">
          <div className="mb-20">
            <div className="badge mb-6">INVESTAI ENGINE V2.4</div>
            <h2 className="text-section mb-8 text-white max-w-2xl mx-auto">ASK THE ENGINE <br /><span className="text-emerald-500">GET THE TRUTH.</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-body-lg">
              Enter any investment topic, stock ticker, or strategy. Our AI will analyze live market data and provide structured insights instantly.
            </p>
          </div>

          <div className="glass-panel overflow-hidden flex flex-col h-[700px] max-w-5xl mx-auto relative shadow-2xl">
            {/* Chat UI - Same as before but refined styling */}
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
                <div className="badge text-[9px]">RAG ENABLED</div>
                <div className="badge text-[9px]">WEB SEARCH ACTIVE</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Sparkles size={48} className="text-emerald-500/20 mb-6" />
                  <p className="text-gray-500">The engine is primed. Ask a question to begin.</p>
                </div>
              )}
              
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] rounded-2xl p-6 ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white/[0.02] border border-white/5 text-gray-200'}`}>
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
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-5 pr-16 text-white focus:outline-none focus:border-emerald-500/50"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                />
                <button onClick={() => handleSendMessage(inputMessage)} className="absolute right-3 w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"><Send size={20} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* --- DIRECTORY SECTION (MONETIZATION) --- */}
        <section id="directory" className="mb-64">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="badge badge-green mb-6">CURATED AI STACK</div>
                <h2 className="text-section mb-6 text-white">AI TOOLS DIRECTORY</h2>
                <p className="text-gray-500 max-w-xl">Discover the best AI-powered tools for stock analysis, crypto automation, and portfolio management.</p>
              </div>
              <button className="btn btn-primary bg-emerald-600/10 border border-emerald-500/30 font-bold text-emerald-500 hover:bg-emerald-500 hover:text-white group">
                <PlusCircle size={20} />
                Suggest a Tool
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "TrendSpider", cat: "TECHNICAL ANALYSIS", desc: "Automated charting and technical analysis for serious traders.", tags: ["#charting", "#automation"] },
                { name: "Danelfin", cat: "STOCK PICKING", desc: "AI-powered stock scores to help you beat the market.", tags: ["#alpha", "#scores"] },
                { name: "Coinrule", cat: "CRYPTO AUTOMATION", desc: "Automated trading rules for crypto without writing code.", tags: ["#bots", "#crypto"] }
              ].map((tool, idx) => (
                <div key={idx} className="glass-panel p-8 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex justify-between items-start mb-8">
                    <span className="badge text-[9px] text-emerald-500 border-emerald-500/10">{tool.cat}</span>
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-white"><Bookmark size={18} /></button>
                      <button className="text-gray-600 hover:text-white"><TrendingUp size={18} /></button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">{tool.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tool.tags.map(tag => <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-mono">{tag}</span>)}
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all font-bold flex items-center justify-center gap-2">
                    Visit Tool <ExternalLink size={16} />
                  </button>
                </div>
              ))}
           </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-48 text-center bg-gradient-to-b from-transparent to-emerald-500/5 rounded-[60px] border border-white/5 mb-32">
           <h2 className="text-hero mb-12 text-white">READY TO JOIN THE <br /><span className="text-emerald-500">AI REVOLUTION?</span></h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn btn-primary px-16 py-6 text-xl">GET STARTED FOR FREE</button>
              <button className="btn btn-outline px-16 py-6 text-xl">VIEW PRO PRICING</button>
           </div>
        </section>
      </main>

      <footer className="px-6 py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg uppercase tracking-tight text-white grayscale">
            <TrendingUp size={22} className="text-emerald-500" />
            <span>InvestAL</span>
          </div>
          <div className="flex gap-10 text-[13px] font-medium text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <p className="text-[12px] text-gray-700 font-mono">
            © 2026 INVESTAI. BUILT FOR THE NEXT GENERATION.
          </p>
        </div>
      </footer>
      
      {/* Ported Overlays */}
      <AnimatePresence>
        {showEmailCapture && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#05080f]/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6">
             <div className="max-w-4xl w-full flex flex-col md:flex-row glass-panel overflow-hidden border-emerald-500/20">
                <div className="flex-1 p-12 bg-emerald-500/5 flex flex-col justify-center">
                   <Mail size={48} className="text-emerald-500 mb-8" />
                   <h3 className="text-4xl font-bold text-white mb-6 leading-tight">Unlock Elite <br /> Market Intelligence.</h3>
                   <p className="text-gray-500">Join 12k+ investors who automate their research with our proprietary <span className="text-white">"7 AI Tools"</span> masterguide.</p>
                </div>
                <div className="flex-1 p-12 bg-black/40">
                   <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowEmailCapture(false); }}>
                      <input type="email" placeholder="name@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <button className="w-full bg-emerald-600 text-white font-bold py-5 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-2xl shadow-emerald-500/30">GET INSTANT ACCESS</button>
                      <button type="button" onClick={() => setShowEmailCapture(false)} className="w-full text-center text-xs text-gray-600 font-bold tracking-widest uppercase">Maybe Later</button>
                   </form>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Support components
function Maximize({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 3 6 6" /><path d="M9 21 3 15" /><path d="M21 3v6h-6" /><path d="M3 21v-6h6" />
    </svg>
  );
}

export default App;
