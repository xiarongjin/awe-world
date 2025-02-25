import path from 'node:path'
import { readdir } from 'node:fs/promises'
import { createReadStream } from 'fs'
export const extractorAssets = () => {
  let server
  return {
    name: 'extractor-assets',
    order: 'order',
    async configureServer(_server) {
      server = _server
    },
    transformIndexHtml(code, id) {
      if (id.originalUrl) {
        return code.replace(/(src=("|'))@assets(\/.*?("|'))/g, (match) => {
          return match.replace('@assets', '/src/assets')
        })
      }
    }
  }
}
