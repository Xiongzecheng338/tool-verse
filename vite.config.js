import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core'),
      '@data': resolve(__dirname, 'src/data'),
      '@ui': resolve(__dirname, 'src/ui'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@tools': resolve(__dirname, 'src/tools')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-chart': ['chart.js'],
          'vendor-marked': ['marked'],
          'vendor-qrcode': ['qrcode'],
          'vendor-three': ['three']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 8080,
    open: true
  }
});
