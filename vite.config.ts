import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import pugPlugin from './plugins/pugTohtmlPlugin'
import path from 'path'
import { fontPlugin } from './plugins/fontPlugin'
import { extractorAssets } from './plugins/assetsPlugin'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [pugPlugin(), UnoCSS(), fontPlugin(), extractorAssets()],
  assetsInclude: ['src/assets/fonts/*.ttf'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
