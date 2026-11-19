import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // public/assets guarda o kit de design (CSS, JS e fotos); o bundle do app vai para /static
  build: { assetsDir: 'static' },
  // pastas de trabalho das verificações de design (perfil do Chrome, capturas) ficam fora do watcher
  server: { watch: { ignored: ['**/.taste-skill/**', '**/shots/**', '**/dist/**'] } },
})
