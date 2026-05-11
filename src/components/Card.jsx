import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Activity, Database, X } from "lucide-react";
import { cn } from "../utils/cn";
import { useRef, useEffect } from "react";

export function Card({ m, side, open, onToggle }) {
  const isLeft = side === "left";
  const cardRef = useRef(null);

  // Auto-scroll to top with padding when opened
  useEffect(() => {
    if (open && cardRef.current) {
      setTimeout(() => {
        const y = cardRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 450); // Wait for most of the layout expansion animation to finish
    }
  }, [open]);

  // Generate a fake terminal hash for aesthetics
  const hash = `SYS.NODE.0x${(m.year * 137).toString(16).toUpperCase()}`;

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={(e) => {
        // Prevent click from bubbling to the background overlay if clicking inside the card
        e.stopPropagation();
        if (!open) onToggle();
      }}
      className={cn(
        "relative w-full group cursor-pointer transition-all duration-700",
        open ? "md:w-[90%] mx-auto z-50 shadow-[0_0_150px_rgba(0,0,0,0.9)]" : "md:w-[calc(50%-40px)] z-10",
        !open && (isLeft ? "md:mr-auto" : "md:ml-auto")
      )}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Connecting Line to Axis (Desktop) - hide when open */}
      {!open && (
        <div 
          className={cn(
            "hidden md:block absolute top-[30px] w-10 h-[1px]",
            isLeft ? "right-[-40px]" : "left-[-40px]"
          )}
          style={{ background: `linear-gradient(${isLeft ? 'to right' : 'to left'}, transparent, rgba(255,255,255,0.2))` }}
        />
      )}

      <motion.div 
        layout
        className={cn(
          "relative overflow-hidden transition-all duration-500 border bg-[#030303]",
          open ? "rounded-xl border-white/20" : "rounded-lg border-white/5 hover:border-white/15"
        )}
      >
        {/* Enormous Watermark Year Background */}
        <div className="absolute font-display font-bold text-[200px] leading-none text-white/[0.02] -top-10 -right-10 pointer-events-none select-none tracking-tighter">
          {m.year}
        </div>

        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center h-2 w-2 relative">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", m.lm ? "bg-red-400" : "bg-blue-400")}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2", m.lm ? "bg-red-500" : "bg-blue-500")}></span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">{hash}</span>
          </div>
          <div className="text-[9px] font-mono text-white/30 tracking-widest truncate ml-4 text-right max-w-[60%]">
            {m.loc}
          </div>
        </div>

        <div className={cn("relative z-10 transition-all duration-500", open ? "p-0" : "p-6")}>
          
          {/* CLOSED STATE LAYOUT */}
          {!open && (
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-3xl font-display font-bold text-white/90 tracking-tighter mb-1">{m.title}</div>
                <div className="text-sm text-white/40 font-sans tracking-tight leading-relaxed">{m.sub}</div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                <div className="text-sm font-mono font-bold text-white/70">{m.year}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1 font-mono">
                  Initialize <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          )}

          {/* OPEN STATE LAYOUT (Editorial Grid) */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]"
              >
                {/* Left Column: Huge typography and metadata */}
                <div className="col-span-1 md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between bg-white/[0.01]">
                  <div>
                    <div className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6">
                      {m.year}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {m.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-[10px] rounded-sm font-mono text-white/60 bg-white/5 border border-white/10 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-8">
                    <a 
                      href={`https://google.com/search?q=${encodeURIComponent(m.title + " " + m.year + " AI Healthcare")}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-between w-full px-4 py-3 text-xs font-mono tracking-widest text-white uppercase transition-colors border border-white/20 bg-white/5 hover:bg-white/10"
                    >
                      Extract Source Data <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Deep content and clinical impact */}
                <div className="col-span-1 md:col-span-7 flex flex-col">
                  <div className="p-8 md:p-12 flex-grow">
                    <h3 className="mb-6 text-3xl md:text-4xl font-bold tracking-tighter leading-tight font-display text-white/90">
                      {m.title}
                    </h3>
                    <p className="text-base md:text-lg font-light leading-relaxed text-white/70 font-sans tracking-tight mb-8">
                      {m.body}
                    </p>
                  </div>

                  {/* Terminal-style Clinical Impact Block */}
                  <div className="p-8 md:p-12 bg-[#000000] border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-white/40">
                      <Activity className="w-3.5 h-3.5 text-white/60" />
                      Clinical Efficacy Report
                    </div>
                    <div className="text-sm md:text-base font-mono leading-relaxed text-white/80 border-l-2 border-white/20 pl-4">
                      {m.impact}
                    </div>
                  </div>
                </div>

                {/* Internal Close Button (Absolute Top Right) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggle(); }}
                  className="absolute top-12 right-6 md:right-12 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
