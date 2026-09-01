import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = dirname(fileURLToPath(import.meta.url))

function htFallback() {
  const rewrite = (req, _res, next) => {
    const url = req.url?.split('?')[0] ?? ''
    if (url === '/ht' || url === '/ht/') {
      req.url = '/ht/index.html'
    }
    next()
  }

  return {
    name: 'ht-fallback',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), htFallback()],
  build: {
    rollupOptions: {
      input: {
        creators: resolve(root, 'index.html'),
        business: resolve(root, 'business/index.html'),
        emily: resolve(root, 'emily/index.html'),
        ht: resolve(root, 'ht/index.html'),
        htPrivacy: resolve(root, 'ht/privacy/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})

