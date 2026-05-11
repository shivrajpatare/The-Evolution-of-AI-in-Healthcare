import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ERAS } from "../data/eras";
import { ITEMS } from "../data/items";
import { Card } from "./Card";
import { FutureForecast } from "./FutureForecast";
import { cn } from "../utils/cn";

// Extracted Node component
const AxisNode = ({ color, isLandmark }) => (
  <div className="relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-background border border-white/10 rounded-full z-20">
    {isLandmark && (
      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
    )}
    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-colors duration-500" style={{ backgroundColor: color }} />
  </div>
);

// Era Divider component
const EraDivider = ({ era }) => {
  const e = ERAS[era];
  return (
    <div className="relative flex items-center justify-center w-full my-20 z-20">
      <div className="absolute w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${e.c}40, transparent)` }} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative px-6 py-2.5 rounded-full flex items-center gap-3 backdrop-blur-md border"
        style={{ backgroundColor: `${e.g}80`, borderColor: e.b, boxShadow: `0 0 30px ${e.g}` }}
      >
        <span className="text-xl">{e.icon}</span>
        <span className="text-sm font-bold tracking-widest uppercase font-mono" style={{ color: e.c }}>{e.label}</span>
        <span className="text-xs opacity-60 font-mono text-white/70">{e.years}</span>
      </motion.div>
    </div>
  );
};

export function Timeline() {
  const [openCard, setOpenCard] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Build render list with era dividers
  const groups = useMemo(() => {
    const g = [];
    let lastEra = null;
    ITEMS.forEach((m, i) => {
      if (m.era !== lastEra) {
        g.push({ type: "era", era: m.era });
        lastEra = m.era;
      }
      g.push({ type: "m", m, idx: i });
    });
    return g;
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-20 z-10" ref={containerRef}>
      
      {/* Invisible backdrop to close card when clicking outside */}
      {openCard && (
        <div 
          className="fixed inset-0 z-40 cursor-pointer"
          onClick={() => setOpenCard(null)}
        />
      )}

      <div className="relative flex flex-col items-center">
        {/* Central Axis Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-slate-800/50 hidden md:block">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        {groups.map((g, gi) => {
          if (g.type === "era") return <EraDivider key={gi} era={g.era} />;
          
          const { m, idx } = g;
          const k = `${m.year}-${idx}`;
          const side = idx % 2 === 0 ? "left" : "right";
          const e = ERAS[m.era];

          return (
            <div 
              key={k} 
              className={cn(
                "relative flex flex-col md:flex-row items-center w-full mb-12 md:mb-24 group transition-all duration-500",
                openCard && openCard !== k ? "opacity-10 blur-[2px] pointer-events-none scale-[0.98]" : "z-50"
              )}
            >
              {/* Mobile Axis Node (hidden on desktop) */}
              <div className="md:hidden absolute left-0 top-[40px] w-2 h-full bg-slate-800/50"></div>
              
              {/* Desktop Axis Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[40px] justify-center items-center">
                <AxisNode color={e.c} isLandmark={m.lm} />
              </div>

              <Card 
                m={m} 
                side={side} 
                open={openCard === k} 
                onToggle={() => setOpenCard(o => o === k ? null : k)} 
              />
            </div>
          );
        })}

        {ITEMS.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <h3 className="text-xl font-display font-medium text-slate-300 mb-2">No milestones found</h3>
            <p className="text-slate-500 font-sans max-w-sm text-sm">We couldn't find any historical events.</p>
          </motion.div>
        )}
      </div>

      <FutureForecast />
    </div>
  );
}
