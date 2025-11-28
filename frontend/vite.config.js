import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),      // enables React JSX
    tailwindcss() // enables Tailwind with Vite
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // optional: if your backend runs on 3000
    },
  },
});
