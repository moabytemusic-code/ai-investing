import { useState, useEffect } from 'react';
import { blink } from '@/blink/client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Cpu, TrendingUp, ExternalLink, PlusCircle, Bookmark, BookmarkCheck, Zap, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  affiliateUrl: string;
  icon?: any;
}

const FALLBACK_TOOLS: Tool[] = [
  {
    id: "t_1",
    name: "AlphaSense",
    category: "MARKET RESEARCH",
    description: "The premier AI search engine for market intelligence. Used by the world's leading institutional investors to uncover insights from millions of financial documents.",
    affiliateUrl: "#",
    icon: <SearchIcon className="w-8 h-8 text-emerald" />
  },
  {
    id: "t_2",
    name: "Kavout",
    category: "QUANT QUANTITATIVE",
    description: "Leverage machine learning algorithms to process massive datasets and identify high-probability trading signals before the market catches on.",
    affiliateUrl: "#",
    icon: <Activity className="w-8 h-8 text-emerald" />
  },
  {
    id: "t_3",
    name: "Trade Ideas",
    category: "AI TRADING",
    description: "Connect to the Holly AI engine for automated, risk-adjusted trading strategies directly executed into your brokerage account.",
    affiliateUrl: "#",
    icon: <Zap className="w-8 h-8 text-emerald" />
  },
  {
    id: "t_4",
    name: "Aiera",
    category: "EVENT MONITORING",
    description: "Real-time automated summaries, sentiment analysis, and transcriptions of every major earnings call and corporate event.",
    affiliateUrl: "#",
    icon: <Cpu className="w-8 h-8 text-emerald" />
  },
  {
    id: "t_5",
    name: "FinBrain",
    category: "PREDICTIVE MODELS",
    description: "Deep learning models that forecast prices for stocks, commodities, and forex over 10-day periods with remarkable accuracy.",
    affiliateUrl: "#",
  },
  {
    id: "t_6",
    name: "PortfolioPilot",
    category: "PORTFOLIO MANAGEMENT",
    description: "Automated macro-economic risk assessment engine that continuously stress-tests your asset allocation against global events.",
    affiliateUrl: "#",
    icon: <Shield className="w-8 h-8 text-emerald" />
  }
];

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  )
}

export function AffiliatePage() {
  const { user, isAuthenticated } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const result = await (blink.db as any).affiliateTools?.list() as Tool[];
        if (result && result.length > 0) {
          setTools(result);
        } else {
          setTools(FALLBACK_TOOLS);
        }

        if (isAuthenticated && user) {
          const favs = await (blink.db as any).userFavorites?.list({
            where: { userId: user.id, itemType: 'tool' }
          });
          if (favs) setFavorites(favs.map((f: any) => f.itemId));
        }
      } catch (error) {
        console.error('Error fetching affiliate tools. Using fallbacks.', error);
        setTools(FALLBACK_TOOLS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTools();
  }, [isAuthenticated, user]);

  const toggleFavorite = async (toolId: string) => {
    if (!isAuthenticated) {
      blink.auth.login();
      return;
    }

    try {
      const isFav = favorites.includes(toolId);
      if (isFav) {
        setFavorites(prev => prev.filter(id => id !== toolId));
        // Mock DB call
        const favs = await (blink.db as any).userFavorites?.list({
          where: { userId: user?.id, itemId: toolId, itemType: 'tool' }
        });
        if (favs && favs.length > 0) {
          await (blink.db as any).userFavorites.delete(favs[0].id);
        }
      } else {
        setFavorites(prev => [...prev, toolId]);
        // Mock DB call
        await (blink.db as any).userFavorites?.create({
          userId: user?.id,
          itemId: toolId,
          itemType: 'tool'
        });
      }
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  return (
    <div className="pt-48 pb-24 px-6 max-w-[1500px] mx-auto min-h-screen relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-16"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 text-center lg:text-left">
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <Badge variant="outline" className="w-fit border-emerald/30 text-emerald bg-emerald/5 px-4 py-1.5 text-xs font-black tracking-widest uppercase shadow-lg shadow-emerald/10">
              <Cpu className="w-4 h-4 mr-2" />
              CURATED AI STACK
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
              AI TOOLS <br className="hidden md:block" /> <span className="text-gray-600 italic">DIRECTORY</span>
            </h1>
            <p className="text-gray-400 text-2xl max-w-2xl leading-relaxed font-medium mt-2">
              Discover the best AI-powered tools for stock analysis, crypto automation, and portfolio management.
            </p>
          </div>
          <Button size="xl" className="gap-3 shadow-2xl shadow-emerald/20 h-20 px-12 rounded-[2rem] text-lg font-black uppercase tracking-widest bg-emerald hover:bg-emerald/90 transition-all hover:scale-105">
            <PlusCircle className="w-6 h-6" />
            Suggest a Tool
          </Button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse h-[450px] border-white/5 bg-white/[0.01] rounded-[32px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="h-full group relative overflow-hidden flex flex-col justify-between p-2 rounded-[32px] glass-card border-white/5 hover:border-emerald/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-[80px] -z-10 group-hover:bg-emerald/15 transition-all duration-700 pointer-events-none"></div>
                  
                  <CardHeader className="p-10 pb-6 text-left">
                    <div className="flex items-center justify-between mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center shadow-lg shadow-emerald/5 group-hover:scale-110 transition-transform duration-500">
                        {tool.icon || <Cpu className="w-8 h-8 text-emerald" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleFavorite(tool.id)}
                          className={`h-12 w-12 rounded-xl transition-all border border-transparent hover:border-emerald/20 ${favorites.includes(tool.id) ? 'text-emerald bg-emerald/10 border-emerald/30 shadow-lg shadow-emerald/10' : 'text-gray-500 hover:text-emerald hover:bg-emerald/5'}`}
                        >
                          {favorites.includes(tool.id) ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                        </Button>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="bg-emerald/5 text-emerald border-emerald/20 text-[10px] font-black tracking-widest uppercase mb-4 w-fit shadow-md shadow-emerald/5">
                      {tool.category}
                    </Badge>
                    <CardTitle className="text-4xl font-black tracking-tight text-white group-hover:text-emerald transition-colors duration-500 leading-none">{tool.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-6 leading-relaxed text-lg font-medium">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="p-10 pt-4">
                    <Button 
                      asChild
                      variant="outline"
                      className="w-full h-16 rounded-2xl gap-3 text-lg font-black uppercase tracking-widest border-white/10 text-white hover:bg-emerald hover:border-emerald hover:text-white transition-all duration-300 shadow-xl shadow-transparent group-hover:shadow-emerald/20"
                    >
                      <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                        EXPLORE TOOL
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
