import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5177,
    strictPort: false, // Allow fallback to another port if 5177 is in use
    host: true,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    }
  }
})
