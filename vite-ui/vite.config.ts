import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
export default defineConfig({
  plugins: [vue(), vueJsx(), Unocss()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'vue',
        },
        // assetFileNames: `assets/[name].css`,
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
