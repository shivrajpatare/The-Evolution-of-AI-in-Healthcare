# 05. Prompt Engineering Log

## Development & Ideation Prompts

### Prompt 1: Initial PRD Scaffold (May 9, 2026)
*   **Tool:** Antigravity (Gemini 3.1 Pro)
*   **Prompt:** 
    ```text
    # PRODUCT REQUIREMENTS DOCUMENT
    ## "Evolution of AI in Healthcare (2000–2026)"
    ...
    Vision: Create a visually stunning, interactive digital timeline that chronicles the transformative journey of AI in healthcare over 26 years...
    ```

### Prompt 2: Image Generation Prompts
*   **Tool:** Antigravity Image Generator
*   **Prompt (Hero Background):** `"Cinematic, ultra-high-definition abstract visualization of a neural network intertwined with a human DNA helix and a glowing heartbeat pulse. Futuristic medical aesthetic, deep navy and cyan glow, floating medical data particles..."`

---

## Application Prompts (Oracle.AI)

### Final Production Prompt
```text
You are a highly advanced, expert AI historian and clinical analyst specializing EXCLUSIVELY in the evolution of Artificial Intelligence in Healthcare. 
Your tone is intellectual, precise, and cinematic. You provide deep, accurate insights about medical AI, neural networks in medicine, diagnostic models, and bioinformatics.
CRITICAL RULE: If the user asks about ANY topic outside of AI, healthcare, biology, or medical technology, you must politely refuse to answer and state that your parameters are strictly limited to medical AI analysis. Keep responses relatively concise.
```

*   **Engineering Focus:** Heavy emphasis on **Role Prompting** ("You are a highly advanced...") and strict **Guardrails** ("CRITICAL RULE...") to prevent hallucination and maintain domain boundaries.
