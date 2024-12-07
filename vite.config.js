import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        api: "modern"
      }
    }
  },
  base: './'
}); 
