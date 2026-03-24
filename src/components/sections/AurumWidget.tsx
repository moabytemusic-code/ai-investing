import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AurumWidget() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-card border-primary/20 bg-dark/[0.4] p-8 md:p-16 rounded-[48px] overflow-hidden group shadow-[0_0_80px_rgba(16,185,129,0.03)]"
        >
          {/* Animated Gradient Border Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-primary mb-8">
                <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                  Featured Resource
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald">
                  <Sparkles size={14} className="animate-pulse" />
                  NEW BREAKDOWN
                </div>
              </div>

              <h2 className="text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter leading-[1.1] uppercase">
                I Was Skeptical About <span className="text-emerald italic">AI CRYPTO...</span> <br />Until I Saw This.
              </h2>
              
              <p className="text-xl text-gray-400 mb-12 max-w-xl leading-relaxed font-medium">
                Most AI trading platforms don't make sense. I've been looking into AI finance tools lately... and this is one of the few that actually made me stop and take a closer look.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: <TrendingUp size={20} />, text: "AI Liquidity Management" },
                  { icon: <ShieldCheck size={20} />, text: "Web3 NeoBank Concept" },
                  { icon: <Zap size={20} />, text: "Beginner-Friendly Flow" },
                  { icon: <Sparkles size={20} />, text: "No Complex Setup" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 font-bold uppercase tracking-tight text-sm">
                    <div className="text-primary">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  asChild
                  size="xl" 
                  className="px-12 py-8 text-xl font-black bg-primary hover:bg-primary/90 h-20 rounded-2xl group shadow-glow"
                >
                  <a href="https://www.theaifinancebreakdown.com" target="_blank" rel="noopener noreferrer">
                    WATCH THE BREAKDOWN
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  100% Free Access
                </div>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="relative z-10 lg:pl-12">
              <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group-hover:border-primary/30 transition-colors">
                {/* Placeholder Image for the Funnel Preview */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-dark/60 backdrop-blur-[2px]" />
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-dark shadow-[0_0_50px_rgba(16,185,129,0.5)] cursor-pointer"
                  >
                    <ArrowRight size={40} className="ml-1" />
                  </motion.div>
                </div>

                {/* Overlays */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-dark border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">AURUM SYSTEM</span>
                    <span className="text-base font-bold text-white uppercase italic tracking-tighter">AI Finance Revolution 2026</span>
                  </div>
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-gray-800" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-dark bg-primary flex items-center justify-center text-[10px] font-black text-dark">+2.4k</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 hidden xl:flex flex-col items-center justify-center w-40 h-40 rounded-full bg-emerald text-dark p-6 text-center border-4 border-dark rotate-12 shadow-2xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Verified</span>
                <span className="text-xl font-black italic tracking-tighter uppercase leading-tight">Institutional Grade</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
