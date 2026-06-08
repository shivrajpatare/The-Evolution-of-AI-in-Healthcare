# 04. Architecture Decisions

## Initial Architecture vs Final Architecture
The project underwent a significant architectural evolution:
1.  **Prototype (Next.js 16 + Turbopack):** Initially scaffolded using Next.js with `layout.tsx` and `page.tsx`. Used React Three Fiber for a 3D particle background.
2.  **Monolith to Modular (Vite):** The project was transitioned to Vite for lighter, purely client-side rendering. The logic was split into highly modular components (`Timeline.jsx`, `Chatbot.jsx`, `Hero.jsx`).
3.  **Security Pivot:** The Groq API call was originally handled client-side. Before production, it was abstracted into a Vercel Serverless Function (`api/chat.js`) to secure the API keys.

## Animation Engine: Framer Motion & Lenis
*   **Why Chosen:** Framer Motion was selected for its scroll-linked telemetry and cubic-bezier easing capabilities. Lenis was used in the prototype for luxurious smooth scrolling.
*   **Alternatives Evaluated:** Pure CSS animations were deemed insufficient for the complex SVG line drawing and scroll-reactive node illumination required.

## AI Inference: Groq + Llama 3.1
*   **Why Chosen:** To power the Oracle.AI chatbot. Groq provides ultra-fast LPU inference, which is critical for an embedded conversational UI. 
*   **Alternatives Evaluated:** OpenAI GPT-4. (Rejected due to higher latency which broke the "instant" cinematic feel).
