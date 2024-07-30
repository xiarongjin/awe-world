// uno.config.ts
import fs from 'node:fs/promises'
import { defineConfig } from 'unocss'
import {
  presetAttributify,
  presetUno,
  presetIcons,
  transformerVariantGroup
} from 'unocss'
import extractorPug from './plugins/extractorPug'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
export default defineConfig({
  content: {
    filesystem: ['src/index.pug', 'src/**/*.pug'],
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|pug)($|\?)/]
    }
  },
  extractors: [extractorPug()],
  presets: [
    presetIcons({
      customizations: {
        iconCustomizer(collection, icon, props) {
          if (collection === 'my-hobby') {
            props.width = '40px'
            props.height = '40px'
          }
        }
      },
      collections: {
        'my-hobby': FileSystemIconLoader('src/assets/images')
      }
    }),
    presetUno(),
    presetAttributify()
  ],
  transformers: [transformerVariantGroup()]
})
