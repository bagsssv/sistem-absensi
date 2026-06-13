import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sistem-absensi/', // ← TAMBAHIN INI! (sesuai nama repo lu)
})
