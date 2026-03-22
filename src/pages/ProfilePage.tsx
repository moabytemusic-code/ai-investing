import { useState, useEffect } from 'react';
import { blink } from '@/blink/client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Cpu, Bookmark, Trash2, ExternalLink, TrendingUp, LogOut, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'sonner'; // Removed for now to avoid toast setup overhead

interface Favorite {
  id: string;
  itemId: string;
  itemType: 'tool' | 'post';
}

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  affiliateUrl: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/');
      return;
    }

    if (isAuthenticated && user) {
      fetchFavorites();
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const favs = await (blink.db as any).userFavorites.list({
        where: { userId: user?.id }
      }) as Favorite[];
      setFavorites(favs || []);

      const toolIds = favs?.filter(f => f.itemType === 'tool').map(f => f.itemId);
      const postIds = favs?.filter(f => f.itemType === 'post').map(f => f.itemId);

      if (toolIds?.length) {
        // In local mock, we just filter the list
        const tools = await (blink.db as any).affiliateTools.list();
        setSavedTools(tools.filter((t: any) => toolIds.includes(t.id)) || []);
      } else {
        setSavedTools([]);
      }

      if (postIds?.length) {
        const posts = await (blink.db as any).blogPosts.list();
        setSavedPosts(posts.filter((p: any) => postIds.includes(p.id)) || []);
      } else {
        setSavedPosts([]);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await (blink.db as any).userFavorites.delete(id);
      setFavorites(prev => prev.filter(f => f.id !== id));
      // toast.success('Removed from favorites');
      const fav = favorites.find(f => f.id === id);
      if (fav?.itemType === 'tool') {
        setSavedTools(prev => prev.filter(t => t.id !== fav.itemId));
      } else if (fav?.itemType === 'post') {
        setSavedPosts(prev => prev.filter(p => p.id !== fav.itemId));
      }
    } catch (error) {
      // toast.error('Failed to remove favorite');
    }
  };

  if (authLoading || (isAuthenticated && isLoading)) {
    return (
      <div className="pt-48 pb-24 px-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-emerald animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-48 pb-24 px-6 max-w-[1500px] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 glass-card p-12 relative overflow-hidden bg-dark/[0.5] border-white/5">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          
          <div className="flex items-center gap-10">
            <div className="w-24 h-24 rounded-[28px] bg-emerald/10 flex items-center justify-center border border-emerald/20 relative shadow-2xl shadow-emerald/5">
              <User className="w-12 h-12 text-emerald" />
              <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-emerald rounded-full border-4 border-dark flex items-center justify-center shadow-lg shadow-emerald/20">
                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-2">{user?.displayName || user?.email?.split('@')[0]}</h1>
              <p className="text-gray-400 text-xl font-medium">{user?.email}</p>
              <div className="flex items-center gap-3 mt-4">
                <Badge variant="default" className="bg-emerald/20 text-emerald border border-emerald/30">PRO MEMBER</Badge>
                <span className="text-[11px] text-gray-500 font-mono font-bold tracking-widest uppercase">JOINED MARCH 2026</span>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={logout} className="gap-2 text-red-400 hover:text-red-300 border-white/10 hover:border-red-500/50 hover:bg-red-500/10 px-8 h-14 rounded-2xl">
            <LogOut className="w-5 h-5" />
            Logout Session
          </Button>
        </div>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="h-16 mb-12 bg-white/[0.02] border-white/5 p-1.5 rounded-3xl">
            <TabsTrigger value="tools" className="gap-3 px-10 h-full data-[state=active]:bg-emerald data-[state=active]:text-white transition-all text-sm font-black uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              Saved Tools ({savedTools.length})
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-3 px-10 h-full data-[state=active]:bg-emerald data-[state=active]:text-white transition-all text-sm font-black uppercase tracking-widest">
              <Bookmark className="w-4 h-4" />
              Saved Articles ({savedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedTools.length === 0 ? (
                <div className="col-span-full py-32 text-center glass-card border-white/5 bg-white/[0.01]">
                   <Cpu className="w-16 h-16 text-emerald mx-auto mb-6 opacity-20" />
                   <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tighter">No saved tools yet</h3>
                   <p className="text-gray-400 text-xl font-medium mb-10 leading-relaxed">Explore our directory and save your favorite AI stacks.</p>
                   <Link to="/recommendations">
                      <Button size="lg" className="gap-3 shadow-2xl shadow-emerald/20">
                        Explore Directory
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                   </Link>
                </div>
              ) : (
                savedTools.map(tool => {
                  const fav = favorites.find(f => f.itemId === tool.id && f.itemType === 'tool');
                  return (
                    <Card key={tool.id} className="h-full group flex flex-col justify-between min-h-[380px] p-2">
                      <CardHeader className="p-10 pb-6">
                        <div className="flex items-center justify-between mb-8">
                          <Badge variant="outline" className="border-emerald/20 text-emerald bg-emerald/5">{tool.category}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => fav && removeFavorite(fav.id)} className="h-10 w-10 text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/20">
                             <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <CardTitle className="text-3xl font-extrabold tracking-tight group-hover:text-emerald transition-colors">{tool.name}</CardTitle>
                        <CardDescription className="text-gray-400 mt-4 leading-relaxed line-clamp-3">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-10 pt-0">
                        <Button variant="outline" asChild className="w-full h-14 rounded-2xl gap-3 group-hover:bg-emerald group-hover:text-white transition-all shadow-xl shadow-transparent group-hover:shadow-emerald/20">
                           <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer">
                             Visit Tool <ExternalLink className="w-5 h-5" />
                           </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedPosts.length === 0 ? (
                <div className="col-span-full py-32 text-center glass-card border-white/5 bg-white/[0.01]">
                   <Bookmark className="w-16 h-16 text-emerald mx-auto mb-6 opacity-20" />
                   <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tighter">No saved articles yet</h3>
                   <p className="text-gray-400 text-xl font-medium mb-10 leading-relaxed">Read our latest market insights and save them for later.</p>
                   <Link to="/blog">
                      <Button size="lg" className="gap-3 shadow-2xl shadow-emerald/20">
                        Browse Insights
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                   </Link>
                </div>
              ) : (
                savedPosts.map(post => {
                  const fav = favorites.find(f => f.itemId === post.id && f.itemType === 'post');
                  return (
                    <Card key={post.id} className="h-full group flex flex-col justify-between min-h-[280px] p-2">
                      <CardHeader className="p-10 pb-6">
                        <div className="flex items-center justify-between mb-8">
                          <Badge variant="outline" className="border-emerald/20 text-emerald bg-emerald/5">{post.category}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => fav && removeFavorite(fav.id)} className="h-10 w-10 text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/20">
                             <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <CardTitle className="text-2xl font-extrabold tracking-tight group-hover:text-emerald transition-colors line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-10 pt-0">
                        <Button variant="outline" asChild className="w-full h-14 rounded-2xl gap-3 group-hover:bg-emerald group-hover:text-white transition-all">
                           <Link to={`/blog/${post.slug}`}>
                             Read Full Article <ArrowRight className="w-5 h-5" />
                           </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
