import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'vue',
        },
      },
    },
    minify: false,
    lib: {
      entry: './src/entry.ts',
      name: 'ViteUi',
      fileName: 'vite-ui',
      formats: ['umd', 'iife', 'es'],
    },
  },
})
