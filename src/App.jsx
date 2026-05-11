import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/timeline.css";
import { Background } from "./components/Background";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { Chatbot } from "./components/Chatbot";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial loading sequence for cinematic effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
      <Background />
      
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 border-2 rounded-full border-primary/20 border-t-primary animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero />
        <Timeline />
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 py-12 mt-20 border-t border-white/10 bg-[#000000]">
        <div className="flex flex-col items-center justify-between gap-6 px-8 mx-auto max-w-7xl md:flex-row">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">System Online</span>
          </div>
          <div className="text-[11px] text-white/40 font-mono tracking-wider">
            Designed for the future of healthcare. © 2026.
          </div>
        </div>
      </footer>

      {/* Persistent Chatbot */}
      <Chatbot />
    </div>
  );
}
