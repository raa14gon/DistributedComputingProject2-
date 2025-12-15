import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/ergast': {
        target: 'https://api.jolpi.ca',
        changeOrigin: true
      },
      '/wiki': {
        target: 'https://en.wikipedia.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wiki/, '/api/rest_v1')
      }
    }
  }
})
