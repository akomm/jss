import warning from 'warning'

const semiWithNl = /;\n/

/**
 * Naive CSS parser.
 * - Supports only rule body (no selectors)
 * - Requires semicolon and new line after the value (except of last line)
 * - No nested rules support
 */
export default cssText => {
  const style = {}
  const split = cssText.split(semiWithNl)
  for (let i = 0; i < split.length; i++) {
    const decl = (split[i] || '').trim()

    if (!decl) continue
    const colonIndex = decl.indexOf(':')
    if (colonIndex === -1) {
      warning(false, 'Malformed CSS string "%s"', decl)
      continue
    }
    const prop = decl.substr(0, colonIndex).trim()
    const value = decl.substr(colonIndex + 1).trim()
    style[prop] = value
  }
  return style
}