import { useEffect, useRef } from "react";

export function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    let W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    const pts = Array.from({length:100},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      r:Math.random()*1.5+.4,
      a:Math.random()*.3+.07,
      h:Math.random()>.55?198:Math.random()>.5?270:160,
    }));
    let raf;
    function tick(){
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        p.x=(p.x+p.vx+W)%W; p.y=(p.y+p.vy+H)%H;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.h},90%,70%,${p.a})`; ctx.fill();
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<85){ctx.beginPath();ctx.strokeStyle=`rgba(79,195,247,${.07*(1-d/85)})`;
            ctx.lineWidth=.5;ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        }
      }
      raf=requestAnimationFrame(tick);
    }
    tick();
    const resize=()=>{W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}/>;
}
