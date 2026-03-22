import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Cpu, Mail, Download, CheckCircle2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function LeadMagnetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenModal = localStorage.getItem('hasSeenLeadMagnet');
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 15000); // Show after 15 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenLeadMagnet', 'true');
  };

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

      setIsSuccess(true);
      toast.success('Guide sent to your email!');
      
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (error) {
      console.error('Lead Capture Error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden glass-dark border-primary/20 bg-background/95 backdrop-blur-2xl">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-emerald-400"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
          
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col gap-6">
              <Badge variant="outline" className="w-fit border-primary/50 text-primary bg-primary/5 px-3 py-1 animate-reveal">
                <Cpu className="w-3 h-3 mr-1" />
                LIMITED TIME FREE GUIDE
              </Badge>
              
              <DialogHeader>
                <DialogTitle className="text-3xl md:text-4xl font-heading font-black leading-[1.1] animate-reveal [animation-delay:100ms]">
                  7 AI TOOLS <br />
                  <span className="text-gradient">AUTOMATING</span> <br />
                  INVESTING IN 2026.
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-4 animate-reveal [animation-delay:200ms]">
                  Stop wasting hours on research. We've compiled the exact stack institutional traders use to automate 90% of their workflow.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 mt-4 animate-reveal [animation-delay:300ms]">
                {[
                  "Proprietary RAG Tools",
                  "Automated Sentiment Analysis",
                  "Portfolio Optimization Scripts",
                  "Real-time SEC Filing Alerts"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 p-8 flex flex-col justify-center gap-6 border-l border-white/5">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="p-4 rounded-xl bg-background/50 border border-white/10 flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <Input 
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-transparent border-none focus-visible:ring-0 p-0 h-auto"
                      />
                    </div>
                    <Button type="submit" variant="default" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 font-bold py-6 group h-14">
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 animate-spin text-white" />
                          <span>PROCESSING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>GET INSTANT ACCESS</span>
                          <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-black">
                      Join 12,000+ Investors. No spam.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-heading font-bold text-white">PDF SENT!</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox for the "7 AI Tools for Investing" guide.
                    </p>
                    <Button variant="outline" onClick={handleClose} className="w-full mt-4 h-12">Close</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
