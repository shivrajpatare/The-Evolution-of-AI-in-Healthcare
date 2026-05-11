import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      
      {/* Premium Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 text-[11px] font-medium tracking-widest uppercase border rounded-full text-white/70 border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      >
        <span className="relative flex items-center justify-center w-1.5 h-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-blue-400"></span>
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        </span>
        MIT School of Computing · 2026
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="max-w-5xl font-display text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8"
      >
        The Evolution of AI <br className="hidden md:block"/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500">in Healthcare</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="max-w-2xl mx-auto text-lg md:text-xl font-sans font-normal leading-relaxed text-slate-400 mb-16 tracking-tight"
      >
        From deterministic expert systems to autonomous agentic intelligence. 
        A quarter-century of breakthroughs transforming human diagnosis and treatment.
      </motion.p>

      {/* Ultra-minimal Real ECG Animation */}
      <div className="flex items-center justify-center max-w-sm mt-8 opacity-70">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 20 L80 20 L85 10 L95 35 L105 5 L115 25 L120 20 L200 20"
            stroke="url(#ecg-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ 
              pathLength: { duration: 1.5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.5 }
            }}
          />
          <defs>
            <linearGradient id="ecg-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
      </motion.div>
    </div>
  );
}
