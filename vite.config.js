import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createLeadHandler } from './server/lead-handler.js'

export default defineConfig(({ mode }) => {
  const handler = createLeadHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } })
  const mount = (server) => { server.middlewares.use('/api/lead', handler) }
  return {
  plugins: [react(), { name: 'local-lead-api', configureServer: mount, configurePreviewServer: mount }],
  server: {
    host: true,
    port: 5173,
  },
  }
})
