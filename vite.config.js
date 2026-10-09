import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Single source of truth for the version shown on the site: package.json.
const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

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

// Link-preview scrapers need an absolute og:image URL, but the domain isn't
// in the repo. Use VITE_SITE_URL if set, else Vercel's production domain at
// build time; with neither, drop the image tags rather than ship a broken one.
function siteUrlInHtml() {
  return {
    name: 'site-url-in-html',
    transformIndexHtml(html) {
      const host = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
      if (!host) return html.split('\n').filter((line) => !line.includes('__SITE_URL__')).join('\n');
      const base = /^https?:\/\//.test(host) ? host : `https://${host}`;
      return html.replaceAll('__SITE_URL__', base.replace(/\/$/, ''));
    },
  };
}

// Lists every file of the build (precache.json) and stamps the build id into the
// service worker, so each deploy is a new worker and knows which files to keep
// for offline use (see public/sw.js).
function precacheManifest() {
  return {
    name: 'precache-manifest',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist');
      const assetsDir = path.join(dist, 'assets');
      if (!fs.existsSync(assetsDir)) return;
      const files = fs.readdirSync(assetsDir)
        .filter((name) => /\.(js|css|woff2?)$/.test(name))
        .map((name) => ({ url: `/assets/${name}`, size: fs.statSync(path.join(assetsDir, name)).size }))
        .sort((a, b) => a.size - b.size);
      const id = crypto.createHash('sha1').update(files.map((f) => f.url).join('|')).digest('hex').slice(0, 10);
      fs.writeFileSync(path.join(dist, 'precache.json'), JSON.stringify({ id, files }));
      const sw = path.join(dist, 'sw.js');
      if (fs.existsSync(sw)) fs.writeFileSync(sw, fs.readFileSync(sw, 'utf8').replace('__BUILD_ID__', id));
    },
  };
}

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [
    tailwindcss(),
    vercelApiDev(),
    siteUrlInHtml(),
    precacheManifest(),
  ],
  resolve: {
    // every 'firebase/database' import goes through the offline layer
    alias: [{ find: /^firebase\/database$/, replacement: path.resolve('src/offline/rtdb.js') }],
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}', 'packages/**/*.test.js'],
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
