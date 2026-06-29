import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generateSitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    generateSitemap({
      hostname: 'https://www.sumitkasaudhan.in',
      dynamicRoutes: ['/', '/admin'],
    }),
  ],

  build: {
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react'

          // Router
          if (
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run')
          ) return 'vendor-router'

          // Framer Motion — biggest, keep isolated
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'

          // Icons
          if (id.includes('node_modules/react-icons')) return 'vendor-icons'

          // EmailJS
          if (
            id.includes('node_modules/@emailjs') ||
            id.includes('node_modules/emailjs')
          ) return 'vendor-email'

          // Particles
          if (
            id.includes('node_modules/tsparticles') ||
            id.includes('node_modules/@tsparticles')
          ) return 'vendor-particles'

          // Lenis
          if (id.includes('node_modules/lenis')) return 'vendor-lenis'

          // Everything else in node_modules
          if (id.includes('node_modules')) return 'vendor-misc'
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-router-dom',
    ],
  },
})