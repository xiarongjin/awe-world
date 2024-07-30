import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import pugPlugin from './plugins/pugTohtmlPlugin'

export default defineConfig({
  plugins: [pugPlugin(), UnoCSS()]
})
