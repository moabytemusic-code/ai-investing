import { useState, useEffect } from 'react';
import { blink } from '@/blink/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Cpu, Calendar, User, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  publishedAt: string;
}

import blogPostsData from '@/data/blogPosts.json';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // use local json 
        setPosts(blogPostsData as BlogPost[] || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-48 pb-24 px-6 max-w-[1500px] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col gap-6 mb-16">
          <Badge variant="outline" className="w-fit border-emerald/50 text-emerald gap-2 bg-emerald/5 px-4 py-1.5 h-auto text-xs font-bold tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            MARKET INSIGHTS
          </Badge>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter leading-none uppercase">LATEST UPDATES</h1>
          <p className="text-gray-400 text-2xl max-w-2xl leading-relaxed font-medium">
            Deep dives into AI investing, market analysis, and wealth automation strategies.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse h-[500px] border-white/5 bg-white/[0.01]"></Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full group">
                  <Card className="h-full flex flex-col group p-2 overflow-hidden border border-white/5 hover:border-emerald/40 transition-all transition-duration-500 min-h-[500px]">
                    <div className="h-56 bg-white/[0.01] relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                      <div className="absolute top-6 left-6">
                        <Badge variant="outline" className="bg-emerald/20 text-emerald border-emerald/30 font-black text-[10px] tracking-widest">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <span className="text-white/5 font-black text-6xl tracking-tighter select-none">INVESTAI</span>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald/10 backdrop-blur-sm">
                         <span className="text-emerald font-black flex items-center gap-3 translate-y-6 group-hover:translate-y-0 transition-transform text-lg uppercase tracking-widest">
                           Read Article <ArrowRight className="w-5 h-5" />
                         </span>
                      </div>
                    </div>
                    
                    <CardHeader className="flex-1 p-10">
                      <div className="flex items-center gap-6 text-[10px] font-black tracking-widest text-gray-500 mb-6 font-mono uppercase">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald" />
                          InvestAI Team
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-extrabold tracking-tight group-hover:text-emerald transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-6 text-gray-400 leading-relaxed line-clamp-3 text-[17px] font-medium">
                        {post.content}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardFooter className="p-10 pt-0">
                      <div className="text-emerald text-lg font-black flex items-center gap-3 group-hover:gap-5 transition-all uppercase tracking-widest">
                        Read More <ArrowRight className="w-5 h-5" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass-card border-white/5 bg-white/[0.01]">
             <Cpu className="w-16 h-16 text-emerald mx-auto mb-6 opacity-20" />
             <h3 className="text-3xl font-extrabold text-white tracking-tighter">No articles found</h3>
             <p className="text-gray-400 text-xl font-medium mt-4">Check back soon for fresh market insights.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
