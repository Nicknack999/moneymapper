import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/student-loan": {
        target: "http://192.168.0.39:5000",
        changeOrigin: true
      },
      "/forecast": {
        target: "http://192.168.0.39:5000",
        changeOrigin: true
      },
      "/full-model": {
        target: "http://192.168.0.39:5000",
        changeOrigin: true
      }
    }
  }
});