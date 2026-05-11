# The Evolution of AI in Healthcare: An Interactive Historiography

## Abstract
This project serves as a comprehensive, interactive digital historiography documenting the integration and evolution of Artificial Intelligence (AI) within clinical and healthcare environments from 2000 to the projected future. It departs from standard static documentation by utilizing a dynamic, scroll-linked chronological interface, integrated large language model (LLM) reasoning, and probabilistic branching simulations for future forecasting.

## Architecture & Technical Stack
The system is constructed using a modern, decoupled React architecture designed for high-fidelity rendering and computational efficiency.

- **Frontend Framework**: Vite / React 18
- **Styling & Layout**: Tailwind CSS (Strict Utility-Class Methodology)
- **Motion & Physics**: Framer Motion (Scroll-linked telemetry, layout transitions, and SVG path rendering)
- **LLM Integration**: Groq API (Llama-3.1-8b-instant model)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Typography Engine**: Space Grotesk (Display) and Manrope (Body)

## Core System Modules

### 1. Chronological Timeline Engine
The central data structure is rendered via a scroll-driven vertical axis. Each clinical milestone is encapsulated within an interactive node. Upon expansion, the node utilizes a strict grid-based architectural layout to present the milestone alongside a simulated "Clinical Efficacy Report" terminal output. Focus state management automatically centers the active node within the viewport while applying a backdrop blur to minimize cognitive load.

### 2. The Oracle.AI Protocol
A domain-restricted conversational interface is embedded within the application. Powered by the Groq LPU inference engine and the Llama 3.1 model, the agent is strictly prompt-engineered to act as a medical AI historian. It is explicitly programmed to refuse non-domain inquiries. The agent parses markdown responses into structured HTML in real-time.

### 3. Probabilistic Divergence Point (Future Forecasting)
The timeline concludes at the current epoch (2026) and introduces a "Decision Matrix." Users are required to select between two systemic regulatory approaches (Strict Global Regulation vs. Open-Source Acceleration). The system computes the selection and dynamically generates a divergent, multi-decade probabilistic forecast representing the resulting socio-technological trajectory.

## Local Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shivrajpatare/The-Evolution-of-AI-in-Healthcare.git
   cd The-Evolution-of-AI-in-Healthcare
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and supply a valid Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Initialize Development Server**
   ```bash
   npm run dev
   ```
   The application will deploy locally at `http://localhost:5174/`. Note: The Vite configuration includes a proxy directive (`/api/groq`) to circumvent browser-level Cross-Origin Resource Sharing (CORS) restrictions during local development.

## License
This software is provided for academic and historical review. Standard MIT License applies.
