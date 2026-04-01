import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/chat-api": {
        target: "https://staging.chatapi.io.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat-api/, "")
      },
      "/api": {
        target: "http://103.124.92.230:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
