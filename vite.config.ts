import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Lovable AI plugin for development mode only
    mode === "development" &&
      (async () => {
        const { componentTagger } = await import("lovable-tagger");
        return componentTagger();
      })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true, // helpful for debugging in Render
  },
  define: {
    "process.env": process.env, // ensures env vars are available
  },
  base: "./", // ensures correct relative paths for Render static deploy
}));