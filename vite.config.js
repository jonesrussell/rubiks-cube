import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
}); 
