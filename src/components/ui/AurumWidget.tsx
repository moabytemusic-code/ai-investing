export default function AurumWidget() {
  return (
    <div className="w-full max-w-[380px] bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden border-t-4 border-t-amber-500">
      
      {/* Subtle Glow Effect */}
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(217,119,6,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center text-xs font-bold uppercase tracking-wide text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-4">
        Featured Resource
      </div>

      {/* Content */}
      <h3 className="text-[1.35rem] font-bold text-white leading-tight mb-3 relative z-10">
        The AURUM AI Digital Ecosystem
      </h3>
      <p className="text-[0.95rem] text-slate-400 leading-relaxed mb-6 relative z-10">
        Discover how AI-driven liquidity bots and Web3 Neobanks are automating intelligent digital asset management.
      </p>

      {/* CTA Button */}
      {/* Swap the href below to your live Vercel/Netlify URL once it's deployed! */}
      <a 
        href="https://moabytemusic-code.github.io/aurum-funnel" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 transition-all duration-300 relative z-10"
      >
        See The Free Breakdown
      </a>
      
    </div>
  );
}
