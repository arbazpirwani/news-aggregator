import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /guardian/* → https://content.guardianapis.com/*
      '/guardian': {
        target: 'https://content.guardianapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/guardian/, ''),
      },
      // (Similarly for NewsAPI and NYT if you want)
    },
  },
});