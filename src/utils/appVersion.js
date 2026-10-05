// Version shown on the public pages. Injected at build time from package.json
// (see `define` in vite.config.js); falls back to "dev" outside a Vite build.
export const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';
export const APP_VERSION_LABEL = `v${APP_VERSION}`;
