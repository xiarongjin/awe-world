import type { Extractor } from 'unocss'
import type { Options } from 'pug'
import Pug from 'pug'

const regexVueTemplate =
  /<template.*?lang=['"]pug['"][^>]*>([\s\S]*?)<\/template>/g

export default function extractorPug(options: Options = {}): Extractor {
  async function compile(code: string, id: string) {
    try {
      const string = Pug.compile(code, {
        filename: id,
        doctype: 'html',
        ...options
      })()

      return string
      // other build processes will catch pug errors
    } catch {}
  }

  return {
    name: 'pug',
    order: -1,
    async extract(ctx) {
      if (!ctx.id) return
      if (ctx.id.endsWith('.pug') || ctx.id.includes('?vue&type=template')) {
        try {
          ctx.code = (await compile(ctx.code, ctx.id)) || ctx.code
        } catch {}
      } else if (ctx.id.endsWith('.vue')) {
        const matches = Array.from(ctx.code.matchAll(regexVueTemplate))
        let tail = ''
        for (const match of matches) {
          if (match && match[1])
            tail += `\n${await compile(match[1].trim(), ctx.id)}`
        }
        if (tail) ctx.code = `${ctx.code}\n\n${tail}`
      } else if (ctx.id.endsWith('.html')) {
      }
      return undefined
    }
  }
}
