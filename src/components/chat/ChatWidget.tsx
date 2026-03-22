import { useState, useRef, useEffect } from 'react';
import { blink } from '@/blink/client';
import OpenAI from 'openai';
import { retrieveMarketContext } from '@/lib/rag_engine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Cpu, TrendingUp, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the InvestAI Engine. Ask me anything about current market trends, investing tools, or financial insights." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, streamingText]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setStreamingText('');

    try {
      // 1. Fetch relevant context from RAG via server-side Edge Function
      let contextText = '';
      try {
        contextText = await retrieveMarketContext(userMessage);
      } catch (ragErr) {
        console.warn('RAG search unavailable, continuing without context:', ragErr);
      }

      const SYSTEM_PROMPT = `You are the InvestAI Engine, an expert AI financial analyst. 
Your goal is to provide clear, actionable insights using RAG-driven data principles.

OUTPUT STRUCTURE (STRICTLY FOLLOW):
1. DIRECT ANSWER (Clear + simplified explanation)
2. KEY INSIGHTS (3-5 Bullet points based on data)
3. MARKET ANALYSIS (Practical takeaway and what it means)
4. RECOMMENDED TOOLS (Soft affiliate recommendation if relevant)

TONE: Professional, insight-driven, but beginner-friendly.
NEVER provide direct financial advice. Always include a soft disclaimer.
Prioritize data and trends from the context below.

KNOWLEDGE CONTEXT:
${contextText || "No specific internal data found. Use general market expertise and web search."}

Current Context: The user is asking about investing and financial tools.`;

      let fullResponse = '';
      const openai = new OpenAI({ 
        apiKey: (import.meta as any).env.VITE_OPENAI_API_KEY, 
        dangerouslyAllowBrowser: true 
      });

      const responseStream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role as any, content: m.content })),
          { role: "user", content: userMessage }
        ],
        stream: true,
      });

      for await (const chunk of responseStream) {
        const text = chunk.choices[0]?.delta?.content || "";
        fullResponse += text;
        setStreamingText(prev => prev + text);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
      setStreamingText('');
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error while processing your request. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chat" className="max-w-4xl mx-auto py-24 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full glass border-primary/20">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-widest font-bold">InvestAI Engine v2.4</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-black">ASK THE ENGINE <br /><span className="text-gradient">GET THE TRUTH.</span></h2>
        <p className="text-muted-foreground max-w-xl">
          Enter any investment topic, stock ticker, or strategy. Our AI will analyze live market data and provide structured insights instantly.
        </p>
      </motion.div>

      <Card className="glass-dark border-white/10 shadow-2xl relative overflow-hidden h-[650px] flex flex-col">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-heading">AI Financial Intelligence</CardTitle>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-muted-foreground font-mono">Real-time analysis active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-[10px] hidden sm:flex">RAG ENABLED</Badge>
            <Badge variant="outline" className="border-white/10 text-[10px]">WEB SEARCH ACTIVE</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 relative">
          <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-6">
            <div className="flex flex-col gap-6">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${
                        m.role === 'user' ? 'bg-secondary border-white/10' : 'bg-primary/20 border-primary/30'
                      }`}>
                        {m.role === 'user' ? <User className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 text-primary" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-primary text-primary-foreground font-medium' 
                          : 'glass border-white/5 text-foreground/90'
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {(isLoading || streamingText) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                      <div className="p-4 rounded-2xl text-sm leading-relaxed glass border-white/5 text-foreground/90">
                        {streamingText || (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Thinking...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t border-white/5 p-4">
          <form onSubmit={handleSubmit} className="w-full flex items-center gap-3">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g. What is the current sentiment for S&P 500?"
              className="flex-1 bg-white/5 border-white/10 h-12 focus-visible:ring-primary/50"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="h-12 w-12 bg-primary hover:bg-primary/90">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: TrendingUp, text: "Current Market Sentiment", query: "What is the current market sentiment today?" },
          { icon: Cpu, text: "Top AI Investing Tools", query: "What are the top 3 AI tools for stock automation in 2026?" },
          { icon: HelpCircle, text: "Beginner ETF Strategies", query: "Explain a simple ETF strategy for a beginner with $1000." }
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={() => setInput(item.query)}
            className="flex items-center gap-3 p-4 rounded-xl glass border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
          >
            <item.icon className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
