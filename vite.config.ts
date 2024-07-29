import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import pugPlugin from './htmlPlugin'
// import pugPlugin from 'vite-plugin-pug-transformer'
// import WindiCSS from 'vite-plugin-windicss'
import { presetAttributify, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import extractorPug from './extractorPug'

export default defineConfig({
  plugins: [
    pugPlugin({}),
    // WindiCSS(),
    // transformPug(),
    UnoCSS({
      content: {
        filesystem: ['src/index.pug', 'src/**/*.pug'],
        pipeline: {
          include: [
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|pug)($|\?)/
          ]
        }
      },
      extractors: [extractorPug()],
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerVariantGroup()]
    })
  ]
})
