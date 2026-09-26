import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

// `npm run dev` only serves the frontend — Vercel runs api/*.js in
// production. This dev-only plugin mounts those same handlers under /api so
// the functions (TTS, center delete code) work locally too. Server-side env
// vars (MAIL_USER, DELETE_CODE_SECRET, ...) are read from .env / .env.local.
function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const match = url.pathname.match(/^\/api\/([\w-]+)$/);
        // Like Vercel: api/_*.js are shared helpers, not endpoints.
        if (!match || match[1].startsWith('_')) return next();
        const file = path.resolve('api', `${match[1]}.js`);
        if (!fs.existsSync(file)) return next();

        let raw = '';
        for await (const chunk of req) raw += chunk;
        try {
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          req.body = {};
        }
        req.query = Object.fromEntries(url.searchParams);

        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };
        res.send = (data) => { res.end(data); return res; };

        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(req, res);
        } catch (err) {
          console.error(`[api/${match[1]}]`, err);
          if (!res.headersSent) res.status(500).json({ error: err.message });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    vercelApiDev(),
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
