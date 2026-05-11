import { useState, useEffect, useRef } from "react";

export function Counter({ to, suffix = "" }) {
  const [v, setV] = useState(0), ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = Date.now(), dur = 1800;
      const tick = () => {
        const p = Math.min(1, (Date.now() - t0) / dur), ease = 1 - Math.pow(1 - p, 3);
        setV(Math.round(ease * to)); if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); ob.disconnect();
    }, { threshold: .5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}
