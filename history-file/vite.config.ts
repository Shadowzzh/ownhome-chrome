import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import copy from 'rollup-plugin-copy'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";\n`,
        charset: false
      }
    }
  },

  plugins: [
    react(),

    copy({
      targets: [
        { src: 'src/manifest.json', dest: 'dist' },

        { src: 'src/assets', dest: 'dist' }
      ],

      hook: 'writeBundle'
    })
  ],

  build: {
    rollupOptions: {
      input: ['index.html', 'src/background.ts', 'src/contentScript.ts'],

      output: {
        chunkFileNames: '[name].[hash].js',

        assetFileNames: '[name].[hash].[ext]',

        entryFileNames: '[name].js',

        dir: 'dist'
      }
    }
  }
})
