# Kawa Tooling Systems 

A high-performance, multi-page corporate website for Kawa Tooling Systems, a precision engineering and heavy-duty manufacturing firm. 

This project is built with a focus on **premium aesthetics**, **interactive 3D elements**, and **blazing-fast performance** using a modern, lightweight frontend stack.

## 🚀 Tech Stack

- **Framework & Bundling:** [Vite](https://vitejs.dev/) + Rollup
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3)
- **3D Graphics:** [Three.js](https://threejs.org/) (Custom 3D gear animations with mouse parallax)
- **Interactivity:** Vanilla JavaScript (ES6 Modules)
- **Icons & Typography:** Google Material Symbols, Google Fonts

## ✨ Key Features

- **Interactive 3D Backgrounds:** A fully custom Three.js canvas featuring animated, interlocking metallic gears that respond to scroll depth and mouse movement for a premium industrial feel.
- **Scroll Reveal Animations:** IntersectionObserver-based animations that smoothly fade and slide elements into view as the user scrolls.
- **Multi-Page Architecture:** Fully routed and optimized 5-page setup (`index.html`, `about.html`, `products.html`, `solutions.html`, `support.html`).
- **Dynamic Content Modules:**
  - **Product Filtering:** JavaScript-powered category filtering for the product grid with smooth view transitions.
  - **Process Timeline:** Interactive stepper showing the manufacturing process with dynamic image swapping.
  - **Technical Hub:** Tabbed interface displaying hard engineering specifications, material grades, and machine park details.
- **Aggressive Build Optimization:** Code-splitting configuration via Vite `manualChunks` to isolate heavy libraries (Three.js) from the lightweight application logic, keeping the main JS bundle under 10KB.

## 🛠️ Local Development

### Prerequisites
- Node.js (v24.15.0 or higher recommended, as specified in `.nvmrc`)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The site will be available locally at `http://localhost:5173` with Hot Module Replacement (HMR).*

3. **Build for production:**
   ```bash
   npm run build
   ```
   *This command compiles Tailwind CSS, minifies HTML/JS, splits chunks, and outputs the highly optimized static files into the `/dist` directory.*

4. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## 🏗️ Architecture Notes

- **`main.js`**: The central nervous system of the site. It handles the mobile menu toggle, scroll reveal observers, dynamic number counters, product filtering, process step swapping, and tech hub tab switching. All DOM interactivity is consolidated here to eliminate inline scripts.
- **`three-scene.js`**: Isolates the Three.js logic. Uses explicit named imports (`import { Scene, PerspectiveCamera... } from 'three'`) to aid in module resolution and tree-shaking.
- **`vite.config.js`**: Custom configuration to support the multi-page HTML setup and manual chunking for the `three` vendor package.

## 🌐 Deployment

This project outputs entirely static assets (HTML, CSS, JS) and can be deployed directly to any static hosting provider like **Vercel**, **Netlify**, or **GitHub Pages**.

**To deploy to Vercel:**
1. Connect this repository to your Vercel account.
2. Ensure the Framework Preset is set to **Vite**.
3. Deploy! Vercel will automatically run `npm run build` and serve the `/dist` folder.
