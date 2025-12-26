import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  publicDir: '../../public',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: '../../dist/dashboard',
    emptyOutDir: true,
  },
});

