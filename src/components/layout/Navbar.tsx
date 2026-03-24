import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Cpu, Menu, X, ArrowRight, User, LogOut, LayoutDashboard, ChevronDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { blink } from '@/blink/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-xl font-heading font-bold">InvestAI</span>
            <Badge variant="outline" className="border-primary/30 text-primary text-[10px] h-5">PRO</Badge>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
          <a href="/#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="/#chat" className="text-foreground/80 hover:text-primary transition-colors">Ask AI</a>
          <Link to="/recommendations" className="text-foreground/80 hover:text-primary transition-colors font-bold text-primary">AI Directory</Link>
          <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors">Blog</Link>
          <Link to="/guide" className="text-foreground/80 hover:text-primary transition-colors">Free Guide</Link>
          <a href="https://www.theaifinancebreakdown.com" target="_blank" rel="noopener noreferrer" className="text-primary font-black uppercase tracking-tighter hover:scale-105 transition-transform">AURUM Breakdown</a>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-primary/20 hover:border-primary/50 transition-all">
                  <div className="flex h-full w-full items-center justify-center bg-primary/20">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass border-white/10 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || user?.email?.split('@')[0]}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="focus:bg-primary/10 cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-primary/10 cursor-pointer">
                  <Link to="/recommendations" className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    AI Directory
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={logout} className="focus:bg-red-500/10 text-red-400 focus:text-red-400 cursor-pointer flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => (blink.auth as any).login()} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow">
              Login
            </Button>
          )}

          <button 
            className="flex items-center gap-2 md:hidden"
            onClick={() => {}} // Placeholder for mobile menu toggle
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
