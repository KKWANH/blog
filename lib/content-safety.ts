import path from 'node:path'

export function safeContentSegments(segments: string[]) {
  return segments.length > 0 && segments.length <= 24 && segments.every((segment) =>
    typeof segment === 'string' && segment.length > 0 && segment.length <= 200 &&
    segment !== '.' && segment !== '..' && !segment.startsWith('.') && !/[/\\:\u0000-\u001f\u007f]/.test(segment),
  )
}
export function pathWithin(root: string, file: string) {
  const relative = path.relative(root, file)
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..' + path.sep))
}
