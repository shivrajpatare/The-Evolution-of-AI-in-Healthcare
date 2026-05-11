export function Ecg() {
  return (
    <svg width="100%" height="64" viewBox="0 0 900 64" preserveAspectRatio="none" style={{ display: "block", opacity: .75 }}>
      <defs>
        <linearGradient id="eg" x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(79,195,247,0)" />
          <stop offset="15%" stopColor="rgba(79,195,247,.85)" />
          <stop offset="50%" stopColor="rgba(129,201,149,.85)" />
          <stop offset="85%" stopColor="rgba(179,157,219,.85)" />
          <stop offset="100%" stopColor="rgba(179,157,219,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,32 L50,32 L65,32 L72,20 L80,55 L88,32 L105,32
           L120,32 L127,20 L135,55 L143,32 L160,32 L170,5 L178,60 L186,32 L210,32
           L240,32 L247,20 L255,55 L263,32 L280,32
           L320,32 L335,32 L342,20 L350,55 L358,32 L375,32 L385,5 L393,60 L401,32 L425,32
           L460,32 L467,20 L475,55 L483,32 L500,32
           L540,32 L555,32 L562,20 L570,55 L578,32 L595,32 L605,5 L613,60 L621,32 L645,32
           L680,32 L687,20 L695,55 L703,32 L720,32
           L760,32 L775,32 L782,20 L790,55 L798,32 L815,32 L825,5 L833,60 L841,32 L865,32
           L900,32"
        fill="none" stroke="url(#eg)" strokeWidth="1.8" strokeLinecap="round"
        style={{
          strokeDasharray: 1600, strokeDashoffset: 1600,
          animation: "ecgDraw 2.8s ease forwards, ecgLoop 4.5s linear 2.8s infinite"
        }}
      />
    </svg>
  );
}
