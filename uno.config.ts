// uno.config.ts
import { defineConfig } from 'unocss'
import {
  presetAttributify,
  presetUno,
  presetIcons,
  transformerVariantGroup
} from 'unocss'
import extractorPug from './plugins/extractorPug'
export default defineConfig({
  content: {
    filesystem: ['src/index.pug', 'src/**/*.pug'],
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|pug)($|\?)/]
    }
  },
  extractors: [extractorPug()],
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerVariantGroup()]
})
