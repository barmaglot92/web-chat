import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "node:path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  server: {
    cors: false,
    proxy: {
      "/common-api": {
        target: "https://abyrvalg.sexologvasilenko.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common-api/, ""),
      },
      "/chat-api": {
        secure: false,
        target: "http://abyrvalg.sexologvasilenko.com:8082",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat-api/, ""),
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(process.cwd(), "src/lib/index.ts"),
      name: "ChatUI",
      formats: ["es"],
      fileName: (format) => `chat-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        manualChunks: undefined,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
