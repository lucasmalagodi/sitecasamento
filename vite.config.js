import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'https://paulaelucas.site/api/presenca'
      : 'http://localhost:3000/api/presenca')
  }
});