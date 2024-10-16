import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'MindEcho',
      short_name: 'MindEcho',
      description: 'MindEcho empowers your emotional journey with mood logging, personalized quotes, and insightful resources for a happier, healthier you.',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: './pages/auth/auth.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})