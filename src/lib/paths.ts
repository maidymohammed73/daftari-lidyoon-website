/**
 * The site can be served from the domain root ("/", e.g. Netlify) or from a sub-folder
 * ("/daftari-lidyoon-website/", e.g. GitHub Pages). Vite sets BASE_URL from `base` in vite.config.ts.
 */
export const BASE = import.meta.env.BASE_URL;

/** Builds a link/asset path that works under any base: url('privacy') → '/daftari-lidyoon-website/privacy'. */
export const url = (path = '') => BASE + path.replace(/^\/+/, '');

/** Current route without the base prefix: '/privacy', '/terms' or '/'. */
export function routePath() {
  const p = window.location.pathname;
  const rest = p.startsWith(BASE) ? p.slice(BASE.length) : p.replace(/^\/+/, '');
  return ('/' + rest).replace(/\/+$/, '').toLowerCase() || '/';
}
