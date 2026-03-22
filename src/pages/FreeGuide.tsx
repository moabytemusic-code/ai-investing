import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function FreeGuide() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to sync with Brevo');
      }

      setSubmitted(true);
      
    } catch (error) {
      console.error('Lead Capture Error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "3 Stock Analysis Bots (TradingView + GPT-4o)",
    "The institutional 'Smart Money' Sentiment Tracker",
    "Crypto Arbitrage Automation Workflow",
    "SEC Filing Summarization Engine Prompt",
    "Quantitative Risk Visualizer Templates"
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <div className="flex flex-col lg:flex-row gap-20 items-center justify-between">
        <div className="flex-1 text-left">
           <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest inline-block mb-10 uppercase">EXCLUSIVE DOWNLOAD</div>
           <h1 className="text-5xl md:text-[86px] font-bold mb-8 text-white tracking-tighter leading-[0.9]">
             7 AI TOOLS <br />
             <span className="text-emerald-500 italic">AUTOMATING</span> <br />
             INVESTING IN 2026.
           </h1>
           <p className="text-2xl text-gray-400 mb-12 max-w-xl font-medium tracking-tight">Stop manual research. Get the proprietary stack used by elite investors to automate their research 24/7.</p>
           
           <div className="space-y-6 mb-16">
             {benefits.map((b, i) => (
               <div key={i} className="flex gap-4 items-center">
                 <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                   <CheckCircle2 size={14} className="text-emerald-500" />
                 </div>
                 <p className="text-white/80 font-bold text-lg tracking-tight">{b}</p>
               </div>
             ))}
           </div>
        </div>

        <div className="flex-1 w-full max-w-lg bg-white/[0.02] border border-white/10 rounded-[48px] p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 flex flex-col items-end opacity-20 hover:opacity-100 transition-opacity">
            <Mail size={120} className="text-emerald-500/40" />
          </div>

          {!submitted ? (
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">Claim Your Guide</h3>
              <p className="text-gray-500 mb-10 font-medium">Join 12,400+ investors who automated their edge this month.</p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-4">Business Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-emerald-500 transition-all text-xl" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <button disabled={isSubmitting} className="w-full bg-emerald-600 text-white font-bold py-6 rounded-2xl text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-emerald-500/30">
                  {isSubmitting ? 'PROCESSING...' : 'GET ACCESS NOW'}
                </button>
                <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-8">Your data is secured by RAG SOC-2 encryption.</p>
              </form>
            </div>
          ) : (
            <div className="relative z-10 py-12 text-center text-white">
               <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-emerald-500/50">
                 <CheckCircle2 size={40} className="text-white" />
               </div>
               <h3 className="text-4xl font-bold mb-6 tracking-tighter">ACCESS GRANTED.</h3>
               <p className="text-gray-500 mb-10 font-bold uppercase tracking-widest">Guide sent to {email}</p>
               <a href="/#chat" className="btn btn-outline border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white px-10 py-4">LAUNCH ENGINE</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
