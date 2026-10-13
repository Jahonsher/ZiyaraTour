import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createLeadHandler } from './server/lead-handler.js'

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-booking-api',
    configureServer(server) {
      server.middlewares.use('/api/lead', createLeadHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }))
    },
  }],
  server: {
    host: true,
    port: 5173,
  },
}))
