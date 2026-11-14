import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH lets the same code run at the domain root (Netlify, local dev → "/")
// or in a sub-folder (GitHub Pages → "/daftari-lidyoon-website/").
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
