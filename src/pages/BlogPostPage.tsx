import { useState, useEffect } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { blink } from '@/blink/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, TrendingUp, Cpu, PieChart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AurumWidget from '@/components/ui/AurumWidget';

import blogPostsData from '@/data/blogPosts.json';

export function BlogPostPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = blogPostsData as any[];
        const found = posts.find((p: any) => p.slug === slug);
        setPost(found || null);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) return <div className="pt-48 flex justify-center text-emerald font-black text-2xl tracking-widest uppercase animate-pulse">Analyzing...</div>;
  if (!post) return <div className="pt-48 text-center text-white text-3xl font-black uppercase">Post not found</div>;

  return (
    <div className="pt-48 pb-24 px-6 max-w-[1500px] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        <Link to="/blog">
          <Button variant="ghost" className="gap-3 text-gray-400 hover:text-white px-0 hover:bg-transparent text-xl font-bold uppercase tracking-widest">
            <ArrowLeft className="w-5 h-5" />
            Back to Insights
          </Button>
        </Link>
        
        <div className="flex flex-col gap-10">
          <Badge variant="outline" className="w-fit border-emerald/50 text-emerald bg-emerald/5 px-4 h-10 text-xs font-bold tracking-widest uppercase">
            {post.category}
          </Badge>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
            {post.title}
          </h1>
          <div className="flex items-center gap-10 text-[11px] font-black tracking-[0.3em] text-emerald font-mono uppercase">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-10">
              <User className="w-4 h-4" />
              INVESTAI TEAM
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mt-12">
          <div className="lg:col-span-2 prose prose-invert prose-2xl max-w-none text-gray-400 font-medium leading-[1.8]">
             <p className="text-3xl font-bold text-white mb-12 italic leading-relaxed">
               {post.content}
             </p>
             <div className="h-px w-full bg-white/5 my-16"></div>
             <h2 className="text-white text-5xl font-black mb-10 tracking-tighter uppercase">RAG Engine Insight: {post.title}</h2>
             <p className="mb-10">
               Retrieval-Augmented Generation (RAG) allows our investment agents to analyze thousands of data points in real-time. By connecting our specialized financial LLMs to live market data pools, we identify patterns that traditional technical analysis filters often miss.
             </p>
             <div className="glass-card p-12 my-16 bg-emerald/5 border-emerald/30 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
               <h3 className="text-white text-3xl font-black mb-6 uppercase tracking-tight flex items-center gap-4">
                 <Activity className="text-emerald" />
                 LIVE SENTIMENT METRIC
               </h3>
               <p className="text-gray-300">
                  Institutional accumulation phase detected for {post.category} assets. AI Recommendation: <span className="text-emerald font-black">ACCUMULATE</span> with 84% confidence.
               </p>
             </div>
          </div>

          <aside className="flex flex-col gap-12">
            <div className="glass-card p-10 border-white/5">
              <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8 pb-4 border-b border-white/5">Market Pulse</h4>
              <div className="space-y-10">
                {[
                   { label: "TRADING VOLATILITY", value: "14.2%", icon: <Activity className="text-emerald" /> },
                   { label: "AI CONFIDENCE SCORE", value: "92/100", icon: <Cpu className="text-emerald" /> },
                   { label: "ALPHA PROJECTION", value: "+22.4%", icon: <TrendingUp className="text-emerald" /> }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      {stat.icon}
                      <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">{stat.label}</span>
                    </div>
                    <span className="text-xl font-black text-white group-hover:text-emerald transition-all">{stat.value}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full h-16 rounded-2xl mt-12 shadow-2xl shadow-emerald/20">
                UPGRADE TO PRO <TrendingUp className="ml-3" />
              </Button>
            </div>

            <div className="glass-card p-10 bg-emerald/5 border-emerald/20">
               <PieChart className="w-16 h-16 text-emerald mb-8" />
               <h4 className="text-white font-black text-2xl tracking-tighter mb-4">OPTIMIZED PORTFOLIO</h4>
               <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10">
                 Our AI agents are currently re-weighting towards {post.category} assets based on the latest RAG-extracted sentiment.
               </p>
               <Button variant="outline" className="w-full text-white border-white/10 hover:bg-emerald hover:border-emerald font-black py-4 rounded-xl transition-all">
                  VIEW FULL ALLOCATION
               </Button>
            </div>

            <AurumWidget />
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
