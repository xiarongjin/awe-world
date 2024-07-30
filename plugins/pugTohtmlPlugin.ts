import path from 'path'
import { compileFile } from 'pug'
import { parseVariantGroup } from 'unocss'
import type { Plugin as VitePlugin } from 'vite'

export default function ({ pugOptions = {}, pugLocals = {} } = {}): VitePlugin {
  const plugin: VitePlugin = {
    name: 'vite-plugin-pug-transformer',

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.pug')) {
        server.ws.send({
          type: 'full-reload'
        })

        return []
      }
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html, { filename }) {
        const updatedHtml = html.replace(
          /<template(.|\n)*?data-type="pug"(.|\n)*?(\/>|<\/template>)/g,
          (matchedString) => {
            const [, rawTemplatePath] =
              matchedString.match(/data-src=["'](.*?)["']/) || []

            if (!rawTemplatePath) {
              throw new Error(
                `Template path not specified for ${matchedString}`
              )
            }
            const entryFileDir = filename.replace(/(.*)\/.*\.html$/, '$1')
            const templateFilePath = path.join(entryFileDir, rawTemplatePath)
            const string = compileFile(templateFilePath, { pretty: true })(
              pugLocals
            )
            const obj = parseVariantGroup(string)
            return obj.expanded
          }
        )
        return updatedHtml
      }
    }
  }

  return plugin
}
