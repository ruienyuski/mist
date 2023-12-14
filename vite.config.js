import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/mist/',
  // server: {
  //   proxy: {
  //     '/apipath': {
  //       target: loadEnv('', process.cwd()).VITE_APP_URL,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/apipath/, '')
  //     },
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
