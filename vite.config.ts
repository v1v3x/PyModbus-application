import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    strictPort: true,
    host: true, // Listen on all network interfaces
  },
  plugins: [
    react({
      jsxImportSource: "react",
      tsDecorators: true,
      plugins: [["@swc/plugin-styled-components", {}]],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
