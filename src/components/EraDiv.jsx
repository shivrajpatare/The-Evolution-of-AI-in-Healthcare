import { ERAS } from "../data/eras";

export function EraDiv({ era }) {
  const e = ERAS[era];
  return (
    <div style={{
      position: "relative", display: "flex", alignItems: "center",
      justifyContent: "center", margin: "52px 0 28px"
    }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg,transparent,${e.c}2a,transparent)`
      }} />
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "9px 22px", borderRadius: 40,
        background: e.g, border: `1.5px solid ${e.b}`,
        fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
        color: e.c, letterSpacing: ".12em", textTransform: "uppercase",
        position: "relative", zIndex: 2,
        boxShadow: `0 0 20px ${e.g}`,
      }}>
        <span style={{ fontSize: 15 }}>{e.icon}</span>
        <span>{e.label}</span>
        <span style={{ opacity: .5 }}>·</span>
        <span>{e.years}</span>
      </div>
    </div>
  );
}
