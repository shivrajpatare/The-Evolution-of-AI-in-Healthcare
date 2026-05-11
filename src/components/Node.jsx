export function Node({ c, g, lm, vis }) {
  const sz = lm ? 19 : 13;
  return (
    <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0 }}>
      {vis && lm && <>
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%",
          border: `1.5px solid ${c}`, animation: "pulseRing 2.2s ease-out infinite"
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%",
          border: `1px solid ${c}`, animation: "pulseRing2 2.2s ease-out .6s infinite"
        }} />
      </>}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: sz, height: sz, borderRadius: "50%",
        background: vis ? c : "rgba(100,120,160,0.3)",
        border: `3px solid #060C1A`,
        boxShadow: vis ? `0 0 0 3px ${g},0 0 20px ${c}99` : "none",
        transition: "all .5s ease",
        animation: vis ? "nodeBreath 3s ease-in-out infinite" : "none",
      }} />
    </div>
  );
}
