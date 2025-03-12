import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/static": "http://localhost:3000",
      "/api": "http://localhost:3000",
      "/sitemap.xml": "http://localhost:3000",
      "/robots.txt": "http://localhost:3000",
      // proxy requests to Express server
    },
  },
});
