import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        about: resolve(__dirname, 'about.html'),
        support: resolve(__dirname, 'support.html'),
      },
      output: {
        manualChunks: {
          three: ['three']
        }
      }
    }
  }
});
