# 03. Research Notes

## Market & Competitor Analysis
*   **Standard Web Timelines:** Often utilize basic vertical lines with static text. Lack deep interactivity or cinematic flair.
*   **FDA Medical Device Databases:** Highly comprehensive but extremely dense and inaccessible for non-technical users.
*   **Academic Reviews:** Thorough, but static and quickly outdated.

## Design Research & Inspiration
*   **Target Aesthetic:** Apple Keynote presentations, Stripe editorial pages.
*   **Design Concept:** "Atmospheric Intelligence" - deep navy (#050816), electric cyan (#00F2FF), mesh gradients, and glassmorphic panels.

## AI / Technical Research
*   **Inference Engine:** Evaluated OpenAI vs Groq. Selected Groq's LPU infrastructure for the `llama-3.1-8b-instant` model to achieve sub-second latency for the Oracle.AI chatbot, ensuring the cinematic immersion was not broken by long loading times.
*   **Frontend Framework:** Explored Next.js 16 (Turbopack) during initial prototyping, but eventually migrated to Vite + React for simpler static deployment and faster local HMR for animation tuning.
