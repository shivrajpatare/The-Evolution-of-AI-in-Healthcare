export function Ticker() {
  const txt = [
    "CLINICAL DECISION SUPPORT · BOSTON 2000",
    "FIRST CAD MAMMOGRAPHY · FDA 2001",
    "HUMAN GENOME PROJECT · NIH 2003",
    "IBM WATSON · NEW YORK 2011",
    "ALEXNET · TORONTO 2012",
    "DEEPMIND NHS PARTNERSHIP · LONDON 2014",
    "STANFORD DERMATOLOGY · CALIFORNIA 2016",
    "GOOGLE RETINOPATHY · INDIA 2017",
    "IDX-DR AUTONOMOUS AI · IOWA 2018",
    "ALPHAFOLD2 · LONDON 2021",
    "MED-PALM 2 · MOUNTAIN VIEW 2023",
    "AGENTIC AI · GLOBAL 2026",
  ].join("  ●  ");
  return (
    <div style={{
      overflow: "hidden", whiteSpace: "nowrap",
      borderTop: "1px solid rgba(79,195,247,0.1)",
      borderBottom: "1px solid rgba(79,195,247,0.1)",
      padding: "8px 0", background: "rgba(79,195,247,0.03)", marginBottom: 52
    }}>
      <div style={{
        display: "inline-block", animation: "ticker 35s linear infinite",
        fontFamily: "var(--mono)", fontSize: 9.5,
        color: "rgba(79,195,247,0.55)", letterSpacing: ".12em", fontWeight: 700
      }}>
        {txt}{"  ●  "}{txt}
      </div>
    </div>
  );
}
