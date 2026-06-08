# Step-by-Step Guide: How We Built "Timeline AI"

Here is a simple, brief guide showing exactly what steps were taken and what prompts were used from start to finish.

## Step 1: Ideation & Setup
**What you did:** You started by giving the AI a clear vision of what you wanted to build.
**The Prompt You Used:** 
> "PRODUCT REQUIREMENTS DOCUMENT... Vision: Create a visually stunning, interactive digital timeline that chronicles the transformative journey of AI in healthcare over 26 years..."
**What Happened:** The AI read your requirements and created a `DESIGN.md` file. It decided to use a "Cinematic Brutalist" aesthetic (dark navy colors, glass-like cards, and smooth animations) instead of a boring standard template.

## Step 2: Generating the Visuals
**What you did:** You asked the AI to proceed with creating the visual assets.
**The Prompt You Used:** 
> "DO IT" / "PROCEED WITH IT"
**What Happened:** The AI generated highly detailed, futuristic images for the background (like neural networks mixed with DNA) using image generation tools to make the website look like a premium documentary.

## Step 3: Building the Timeline
**What you did:** You instructed the AI to start writing the code.
**The Prompt You Used:** 
> "RUN IT"
**What Happened:** The AI built the website using React and Framer Motion (a tool that makes scrolling super smooth). It created a `milestones.json` file containing 26 major moments in medical AI history (from the year 2000 to 2026). 

## Step 4: Adding the Oracle.AI Chatbot
**What you did:** You wanted an AI chatbot embedded in the timeline that only talks about medical history.
**The System Prompt Used for the Chatbot:**
> "You are a highly advanced, expert AI historian... CRITICAL RULE: If the user asks about ANY topic outside of AI, healthcare, biology, or medical technology, you must politely refuse to answer..."
**What Happened:** We connected the website to Groq's ultra-fast AI (Llama 3.1). Because it needed to be secure, we hid your secret API key inside a special backend file (`api/chat.js`) so hackers couldn't steal it.

## Step 5: Fixing Bugs
**What you did:** During development, the website crashed, and you gave the AI the error log to fix.
**The Prompt You Used:**
> "Error evaluating Node.js code... Cannot apply unknown utility class `text-foreground`"
**What Happened:** The AI found out that the colors weren't defined properly in the CSS file. It quickly fixed the Tailwind CSS settings and also fixed a small typing mistake in the 3D background code.

## Step 6: Final Review & Deployment
**What you did:** You asked for a final test of everything.
**The Prompt You Used:**
> "run the entire system and all services"
**What Happened:** We ran a final test on your local computer to make sure the smooth scrolling, 3D particles, and AI chatbot were working perfectly together. Finally, the code was deployed to the internet using **Vercel**, and your secret API keys were securely saved in Vercel's dashboard.
