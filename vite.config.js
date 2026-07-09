import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  build: {
    // grammarData.js is a legitimate ~565kB content chunk (grammar topics/
    // exercises), lazy-loaded only on grammar routes — not on the critical
    // path for Dashboard/Library/Practice/Stats. Raised so the build stops
    // warning about a chunk that's already correctly isolated.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/react-router|\/react\/|\/react-dom\//.test(id)) return 'vendor-react';
          if (id.includes('firebase')) return 'vendor-firebase';
          if (id.includes('framer-motion')) return 'vendor-motion';
        },
      },
    },
  },
});

