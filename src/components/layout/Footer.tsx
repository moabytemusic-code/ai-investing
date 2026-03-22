import { TrendingUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-24 px-6 bg-[#05080f]">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="flex flex-col gap-6 col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tighter text-white">
            <TrendingUp size={28} className="text-emerald" />
            <span className="flex items-baseline">
              InvestAI 
              <span className="text-[10px] px-1.5 py-0.5 border border-emerald/20 bg-emerald/10 rounded-md font-black text-emerald ml-2 tracking-widest uppercase">PRO</span>
            </span>
          </div>
          <p className="text-gray-500 text-lg max-w-sm leading-relaxed">
            The next generation of AI-powered investment intelligence. Built for professional traders and long-term investors.
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">Platform</h4>
          <div className="flex flex-col gap-4 text-gray-500 font-bold text-sm tracking-wide">
            <Link to="/recommendations" className="hover:text-emerald transition-colors">AI Directory</Link>
            <Link to="/blog" className="hover:text-emerald transition-colors">Market Insights</Link>
            <a href="/#chat" className="hover:text-emerald transition-colors">Ask Engine</a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">Company</h4>
          <div className="flex flex-col gap-4 text-gray-500 font-bold text-sm tracking-wide">
            <Link to="/terms" className="hover:text-emerald transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-emerald transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-emerald transition-colors">Enterprise Contact</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1500px] mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-600 font-black text-xs tracking-[0.4em] uppercase">© 2026 INVESTAI PRO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">TWITTER</a>
           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">LINKEDIN</a>
           <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">SUBSTACK</a>
        </div>
      </div>
    </footer>
  );
}
