import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  build: {
    // grammarData.js is a legitimate ~980kB content chunk (grammar topics/
    // exercises), lazy-loaded only on grammar routes — not on the critical
    // path for Dashboard/Library/Practice/Stats. Raised so the build stops
    // warning about a chunk that's already correctly isolated. Re-check this
    // number occasionally — if grammarData.js keeps growing, splitting it
    // into per-topic dynamic imports (instead of one static object) would
    // cut real payload size, not just silence the warning.
    chunkSizeWarningLimit: 1050,
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

