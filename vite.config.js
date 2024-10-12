import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {config} from 'dotenv'

config()

// https://vitejs.dev/config/
export default defineConfig({
  base: '/seafood-chat/', // uncomment for github pages
  // base: '/', // uncomment for nginx
    plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
})
