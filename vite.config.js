import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 8002,
      proxy: {
        "/api": {
          target: env.VITE_BASEURL,
          changeOrigin: true,
        },
      },
    },
    build: {
      // Enable code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            "react-vendor": ["react", "react-dom", "react-router"],
            "antd-vendor": ["antd", "@ant-design/icons"],
            "query-vendor": ["@tanstack/react-query"],
            "chart-vendor": ["highcharts", "highcharts-react-official", "recharts"],
            "utils-vendor": ["axios", "dayjs", "zustand"],
          },
        },
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Source maps for production debugging
      sourcemap: mode === "development",
    },
    optimizeDeps: {
      // Pre-bundle dependencies for faster dev server
      include: [
        "react",
        "react-dom",
        "react-router",
        "antd",
        "@ant-design/icons",
        "@tanstack/react-query",
        "axios",
        "dayjs",
        "zustand",
        "clsx",
        "zod",
      ],
    },
  };
});
