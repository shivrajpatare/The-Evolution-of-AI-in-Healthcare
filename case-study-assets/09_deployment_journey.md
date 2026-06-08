# 09. Deployment Journey

## Environment Setup
*   **Local Setup:** Node.js, `npm run dev` running on localhost:5174 (Vite) and localhost:3000 (Next.js iteration).
*   **Secrets Management:** The Groq API key (`VITE_GROQ_API_KEY`) was kept in `.env.local` locally. In production, it was securely injected into Vercel's Environment Variables panel.

## Production Architecture
*   **Frontend Deployment:** The static Vite application is hosted on Vercel's Global Edge Network.
*   **Backend Serverless API:** `api/chat.js` is deployed as a Vercel Serverless Function to keep the `GROQ_API_KEY` hidden from the client browser.
*   **Routing:** `vercel.json` is configured to rewrite `/api/(.*)` to the serverless backend, and all other requests to `/index.html` to support client-side SPA routing.
