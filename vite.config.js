import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generateSitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    generateSitemap({
      hostname: 'https://www.sumitkasaudhan.in'
    })
  ],
  build: {
    chunkSizeWarningLimit: 750,  // 600 → 750
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Icons
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
          // Three.js core (biggest — isolate it)
          if (id.includes('node_modules/three/')) {
            return 'vendor-three';
          }
          // React Three Fiber + Drei + Postprocessing
          if (id.includes('node_modules/@react-three/fiber') ||
              id.includes('node_modules/@react-three/drei') ||
              id.includes('node_modules/@react-three/postprocessing') ||
              id.includes('node_modules/postprocessing')) {
            return 'vendor-r3f';
          }
          // Maath / troika (drei dependencies)
          if (id.includes('node_modules/maath') ||
              id.includes('node_modules/troika') ||
              id.includes('node_modules/@monogrid')) {
            return 'vendor-r3f';
          }
        }
      }
    }
  }
})