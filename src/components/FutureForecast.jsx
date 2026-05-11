import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Zap, GitCommit, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../utils/cn";

const BRANCHES = {
  regulation: {
    id: "regulation",
    name: "Regulated Systems",
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    gradient: "from-blue-400 to-blue-600",
    predictions: [
      { year: 2030, title: "Global Diagnostic Standard", body: "WHO establishes a mandatory, highly regulated AI diagnostic baseline, reducing misdiagnosis by 40% but slowing experimental treatments." },
      { year: 2035, title: "Genomic Privacy Mesh", body: "Quantum-encrypted medical databases become law. AI is restricted to anonymized macro-pattern analysis, preventing genetic discrimination." },
      { year: 2045, title: "Systemic Disease Eradication", body: "Through highly controlled, multi-decade AI clinical trials, humanity systematically eliminates the top 10 preventable global diseases." }
    ]
  },
  acceleration: {
    id: "acceleration",
    name: "Unrestricted Acceleration",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.1)]",
    gradient: "from-orange-400 to-red-600",
    predictions: [
      { year: 2030, title: "Open-Source Bio-Hacking", body: "Unregulated open-weight models allow independent researchers to create custom synthetic proteins, leading to rapid, high-risk breakthroughs." },
      { year: 2035, title: "Autonomous Autodocs", body: "Hyper-intelligent, completely autonomous robotic surgery pods replace human surgeons in 80% of hospitals due to unchecked market efficiency." },
      { year: 2045, title: "Longevity Escape Velocity", body: "Radical, unrestricted AI synthetic biology achieves cellular reversal, fundamentally altering the human lifespan trajectory." }
    ]
  }
};

export function FutureForecast() {
  const [decision, setDecision] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleDecision = (branchId) => {
    setIsGlitching(true);
    setTimeout(() => {
      setDecision(branchId);
      setIsGlitching(false);
    }, 800); // 800ms of "glitch" processing
  };

  const branch = decision ? BRANCHES[decision] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-5xl mx-auto mt-32 p-8 md:p-12 overflow-hidden border rounded-3xl transition-all duration-1000",
        branch ? branch.bg : "bg-[#050505]",
        branch ? branch.border : "border-white/10",
        branch ? branch.glow : ""
      )}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
      
      {/* Ambient Glow */}
      <div className={cn(
        "absolute top-[-50%] left-1/2 -translate-x-1/2 w-[80%] h-[100%] blur-[100px] pointer-events-none transition-colors duration-1000",
        decision === 'regulation' ? "bg-blue-500/[0.03]" : decision === 'acceleration' ? "bg-orange-500/[0.03]" : "bg-white/[0.03]"
      )} />

      <div className="relative z-10 flex flex-col items-center mb-12 text-center">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 mb-6 border rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-colors duration-500",
          branch ? branch.border : "border-white/10 bg-[#0a0a0a]"
        )}>
          {branch ? <branch.icon className={cn("w-4 h-4", branch.color)} /> : <GitCommit className="w-4 h-4 text-white/80" />}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tighter text-transparent bg-clip-text mb-4 bg-gradient-to-br from-white to-white/50">
          {decision ? "Forecast Generated" : "The Divergence Point"}
        </h2>
        <p className="max-w-xl text-white/50 font-sans text-sm md:text-base font-light tracking-tight">
          {decision 
            ? "Probabilistic simulation computed based on chosen socio-technological trajectory." 
            : "The timeline stops in 2026. You must choose the fundamental parameter that will govern the next two decades of AI evolution."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!decision && !isGlitching && (
          <motion.div 
            key="decision-matrix"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-3xl mx-auto"
          >
            {/* Regulation Choice */}
            <button 
              onClick={() => handleDecision('regulation')}
              className="flex flex-col items-start p-8 text-left transition-all duration-300 border rounded-2xl bg-[#0a0a0a]/80 border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 group"
            >
              <Shield className="w-6 h-6 mb-4 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="mb-2 text-xl font-bold tracking-tight text-white/90 font-display">Strict Global Regulation</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/40 font-sans">Prioritize absolute safety, rigorous clinical trials, and systemic equality over raw speed of innovation.</p>
              <div className="flex items-center gap-2 mt-auto text-xs font-mono font-bold tracking-widest text-blue-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Simulate <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            {/* Acceleration Choice */}
            <button 
              onClick={() => handleDecision('acceleration')}
              className="flex flex-col items-start p-8 text-left transition-all duration-300 border rounded-2xl bg-[#0a0a0a]/80 border-white/5 hover:border-orange-500/50 hover:bg-orange-500/5 group"
            >
              <Zap className="w-6 h-6 mb-4 text-orange-400 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h3 className="mb-2 text-xl font-bold tracking-tight text-white/90 font-display">Open-Source Acceleration</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/40 font-sans">Remove restrictions. Allow models to self-improve and decentralize development to achieve medical singularity at any cost.</p>
              <div className="flex items-center gap-2 mt-auto text-xs font-mono font-bold tracking-widest text-orange-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Simulate <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </motion.div>
        )}

        {isGlitching && (
          <motion.div 
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 z-10 relative"
          >
            <div className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden rounded-full mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
              />
            </div>
            <p className="text-xs font-mono tracking-[0.5em] text-white/50 uppercase animate-pulse">
              Computing branching timeline...
            </p>
          </motion.div>
        )}

        {decision && !isGlitching && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 relative z-10"
          >
            {branch.predictions.map((p, i) => (
              <motion.div 
                key={p.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "p-6 transition-all duration-300 border rounded-2xl bg-white/[0.02] hover:bg-white/[0.04]",
                  branch.border
                )}
              >
                <div className={cn("mb-4 text-[10px] font-bold tracking-[0.2em] uppercase font-mono", branch.color)}>
                  {p.year} Projection
                </div>
                <h3 className="mb-3 text-lg font-bold tracking-tight text-white/90 font-display">
                  {p.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/60 font-sans tracking-tight">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 pt-8 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] font-mono tracking-[0.3em] text-white/30">
          COMPUTED VIA AGENTIC REASONING
        </p>
        
        {decision && (
          <button 
            onClick={() => setDecision(null)}
            className="text-[9px] font-mono tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase flex items-center gap-2"
          >
            ← Recalculate Timeline
          </button>
        )}
      </div>
    </motion.div>
  );
}
