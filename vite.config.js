import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        creators: resolve(root, 'index.html'),
        business: resolve(root, 'business/index.html'),
        emily: resolve(root, 'emily/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
