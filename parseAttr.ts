import { isValidSelector } from '@unocss/core'
export const defaultIgnoreAttributes = [
  'placeholder',
  'fill',
  'opacity',
  'stroke-opacity'
]
const strippedPrefixes = ['v-bind:', ':']

const splitterRE = /[\s'"`;]+/g
// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-dupe-disjunctions
const elementRE =
  /<[^>\s]*\s((?:'[^']*'|"[^"]*"|`[^`]*`|\{[^}]*\}|=>|[^>]*?)*)/g
const valuedAttributeRE =
  /(\?|(?!\d|-{2}|-\d)[\w\u00A0-\uFFFF:!%.~<-]+)=?(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})?/g

export function parseAttr(originString: string): string {
  const trueToNonValued = false
  let parseString = originString
  return parseString
}
