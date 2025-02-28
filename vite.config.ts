/// <reference types="vitest" /> # allows reference to vitest types

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/clarks-notion",
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8'
    }
  },
  plugins: [react()],
})
