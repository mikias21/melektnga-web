import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  logLevel: 'error',
  plugins: [
    react(),
    tailwindcss(),
  ]
});