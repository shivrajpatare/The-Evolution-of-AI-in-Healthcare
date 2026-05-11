import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Vercel-like sharp grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 mix-blend-screen"></div>
      
      {/* Spotlight Mouse Follow Glow (Stark white/gray for premium tech feel) */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.08] bg-white pointer-events-none"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.8 }}
      />
      
      {/* Subtle overlay to fade the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
    </div>
  );
}
