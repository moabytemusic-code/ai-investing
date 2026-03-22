import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronRight, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary gap-1 bg-primary/5 px-3 py-1 animate-reveal">
              <Cpu className="w-3 h-3" />
              NEW: RAG-POWERED FINANCIAL ENGINE
            </Badge>
            <div className="h-px w-12 bg-white/10"></div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Version 2.4.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-heading font-black tracking-tighter animate-reveal">
            ASK AI WHAT'S <br />
            <span className="text-gradient">ACTUALLY</span> <br />
            HAPPENING.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed animate-reveal [animation-delay:200ms]">
            Leverage the power of RAG technology to analyze market trends, stock metrics, and investment tools in real-time.
            <span className="text-white font-semibold"> Smart. Fast. Actionable.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-reveal [animation-delay:400ms]">
            <Button size="xl" className="w-full sm:w-auto gap-2 px-8 py-7 text-lg group bg-primary hover:bg-primary/90">
              ASK THE ENGINE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 px-8 py-7 text-lg border-white/10 hover:bg-white/5">
              GET FREE GUIDE
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-8 animate-reveal [animation-delay:600ms]">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-secondary flex items-center justify-center text-[10px] font-bold">
                  {i === 4 ? '+12k' : <TrendingUp className="w-4 h-4 text-primary" />}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
              Joined by <span className="text-white">12,400+</span> smart investors this month.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[32px] overflow-hidden glass border-white/5 shadow-2xl shadow-primary/10">
            <img 
              src="https://images.unsplash.com/photo-1611974714024-462cd467af9a?q=80&w=2070&auto=format&fit=crop" 
              alt="Financial Data Visualization" 
              className="w-full h-[600px] object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-transparent to-transparent"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-12 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/50 mb-6 animate-float">
                <TrendingUp className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-2 text-white">Analyzing 4.2M Data Points</h3>
              <p className="text-gray-400 font-medium">The engine is currently tracking 5,400+ stocks and crypto assets.</p>
            </div>
          </div>

          <div className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-xl animate-float [animation-delay:1s] z-20">
            <p className="text-xs font-mono text-primary uppercase tracking-tighter mb-1 font-bold">Live Trend</p>
            <h4 className="text-2xl font-heading font-black text-emerald-400">+14.2%</h4>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sentiment Index</p>
          </div>

          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl animate-float [animation-delay:2s] z-20">
            <p className="text-xs font-mono text-primary uppercase tracking-tighter mb-1 font-bold">AI Recommendation</p>
            <h4 className="text-lg font-heading font-bold text-white">ACCUMULATE</h4>
            <div className="h-1 w-24 bg-primary/20 rounded-full mt-2 overflow-hidden">
              <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '66%' }}
                 className="h-full bg-primary" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
