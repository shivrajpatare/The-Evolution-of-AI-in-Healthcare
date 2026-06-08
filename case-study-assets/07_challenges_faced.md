# 07. Challenges Faced

## Challenge 1: Tailwind CSS Theme Variables Breakdown
*   **The Issue:** A `CssSyntaxError` occurred indicating `Cannot apply unknown utility class 'text-foreground'` in `globals.css` during the Next.js Turbopack build.
*   **The Cause:** Tailwind's utility generation failed because the root CSS variables were not properly defined within the `@theme` block.
*   **The Fix:** I updated the `globals.css` file to strictly define `--color-foreground` and `--color-background` inside the `@theme` directive.

## Challenge 2: React Syntax Typos in 3D Components
*   **The Issue:** The build failed parsing `ThreeBackground.tsx`.
*   **The Cause:** An accidental duplication of a closing tag (`</group> group>`) caused JSX parser failure.
*   **The Fix:** Removed the errant text to fix the build chain.

## Challenge 3: Port Collisions & Zombie Processes
*   **The Issue:** `npm run dev` kept failing due to ports being in use.
*   **The Cause:** The development server was hanging in the background during hot reloads or AI test runs.
*   **The Fix:** Automated a `taskkill /IM node.exe /F` command to forcefully clear zombie processes before starting the server.
