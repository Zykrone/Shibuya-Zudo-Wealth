import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Shibuya-Zudo-Wealth/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Toutes les requêtes qui commencent par /api sont renvoyées au backend sur le port 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

