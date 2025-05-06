import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SkyWatcher/', // GitHub Pages repository name (pvictorlv/SkyWatcher)
  server: {
    port: 53965,
    host: true,
    cors: true,
    allowedHosts: true,
  }
})
