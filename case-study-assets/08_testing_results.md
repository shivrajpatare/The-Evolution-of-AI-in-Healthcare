# 08. Testing & Evaluation Results

## AI Evaluation
*   **Methodology:** The system prompt for Oracle.AI strictly limits the chatbot to healthcare AI history. 
*   **Adversarial Tests:** The prompt contains explicit rules: "If the user asks about ANY topic outside of AI, healthcare, biology, or medical technology, you must politely refuse to answer". During local testing, this boundary was proven to successfully deflect non-domain queries.

## Performance & QA Testing
*   **Automated Browser Verification:** An AI Browser Subagent was utilized to test the application sequentially (`ai_healthcare_timeline_demo`, `entire_system_run_final`). 
*   **Testing Checklist:**
    1. Verify cinematic hero section loads without visual tearing.
    2. Test scroll-linked animations for timeline nodes.
    3. Ensure click-to-expand modals open flawlessly.
    4. Verify the Future Forecast section ("The Divergence Point").
*   **API Latency:** Groq's API returned completions in < 800ms, ensuring the conversational UI felt "instantaneous" and matched the high-end physics animations.
