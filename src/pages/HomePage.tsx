import { 
  TrendingUp, 
  Search, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Cpu,
  Activity,
  PieChart,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Button } from '@/components/ui/button';
import { AurumWidget } from '@/components/sections/AurumWidget';

export function HomePage() {
  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. HERO SECTION (MODULAR) */}
      <Hero />

      {/* 2. SOCIAL PROOF BAR */}
      <div className="border-y border-white/5 bg-white/[0.02] py-16">
        <div className="max-w-[1500px] mx-auto px-6 flex flex-col items-center gap-12">
          <p className="text-[11px] font-black text-gray-600 uppercase tracking-[0.4em] text-center">Powering the next generation of institutional investors</p>
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-3xl font-black text-white tracking-tighter">FORTUNE</span>
            <span className="text-3xl font-black text-white tracking-tighter">BLOOMBERG</span>
            <span className="text-3xl font-black text-white tracking-tighter">WSJ</span>
            <span className="text-3xl font-black text-white tracking-tighter">REUTERS</span>
          </div>
        </div>
      </div>

      {/* 3. CORE FEATURES */}
      <section id="features" className="py-64 max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-32">
          <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest inline-block mb-10 uppercase">THE CORE STACK</div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 text-white max-w-5xl mx-auto tracking-tighter leading-none uppercase"
          >
            STOP GUESSING. <br /><span className="text-emerald italic">START WINNING.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: <TrendingUp size={28} />, title: "Market Analysis", desc: "Real-time stock, crypto, and commodity analysis using multi-source RAG data pools." },
            { icon: <Search size={28} />, title: "Insight Extraction", desc: "Extract hidden patterns and institutional sentiment from news feeds and SEC filings." },
            { icon: <ShieldCheck size={28} />, title: "Risk Assessment", desc: "Quantify your portfolio risk using automated volatility models and historical context." },
            { icon: <Zap size={28} />, title: "Tool Discovery", desc: "Get personalized recommendations for the best AI investing tools for your strategy." }
          ].map((feat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -12 }}
              className="glass-card p-12 hover:border-primary/50 transition-all group border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary mb-10 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-black mb-6 text-white tracking-tight uppercase">{feat.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CHAT WIDGET (MODULAR) */}
      <section id="chat" className="bg-white/[0.01] border-y border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <ChatWidget />
      </section>

      {/* 5. AURUM BREAKDOWN WIDGET (NEW) */}
      <AurumWidget />

      {/* 6. FINAL CTA */}
      <section className="py-64 max-w-[1500px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative glass-card bg-dark/[0.8] p-20 md:p-32 rounded-[64px] border border-primary/20 overflow-hidden text-center flex flex-col items-center gap-12 shadow-[0_0_100px_rgba(16,185,129,0.05)]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent -z-10"></div>
          
          <div className="px-6 py-2 text-xs font-black bg-primary/20 text-primary border border-primary/30 rounded-full tracking-widest uppercase mb-4">THE FUTURE IS NOW</div>
          <h2 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter max-w-5xl text-white uppercase">
            READY TO JOIN THE <span className="text-emerald">AI REVOLUTION?</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium">
            Stop letting the institutions have all the fun. Get the same RAG technology they use, for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-8">
            <Button size="xl" className="px-16 py-8 text-2xl font-black bg-primary hover:bg-primary/90 h-24 rounded-3xl">
              GET STARTED FREE
            </Button>
            <Button size="xl" variant="outline" className="px-16 py-8 text-2xl font-black border-2 border-white/10 h-24 rounded-3xl">
              VIEW PRO PRICING
            </Button>
          </div>
          <div className="flex items-center gap-3 text-sm font-black text-gray-600 mt-10 uppercase tracking-[0.2em]">
            <Shield className="w-5 h-5 text-emerald" />
            No credit card • Cancel anytime • Free forever
          </div>
        </motion.div>
      </section>
    </div>
  );
}
