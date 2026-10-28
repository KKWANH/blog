export class HttpInputError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

export function sameOriginJson(request: Request, origin: string) {
  const fetchSite = request.headers.get('sec-fetch-site')
  return request.headers.get('origin') === origin &&
    (!fetchSite || fetchSite === 'same-origin' || fetchSite === 'none') &&
    request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() === 'application/json'
}

export async function readJsonBody(request: Request, maximumBytes: number, timeoutMs = 5000): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') throw new HttpInputError('Use an application/json request.', 415)
  const length = request.headers.get('content-length')
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > maximumBytes)) throw new HttpInputError('This request is too large.', 413)
  if (!request.body) throw new HttpInputError('Send a JSON body.', 400)
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  let timedOut = false
  const timer = setTimeout(() => { timedOut = true; void reader.cancel().catch(() => {}) }, timeoutMs)
  try {
    while (true) {
      const result = await reader.read()
      if (result.done) break
      size += result.value.byteLength
      if (size > maximumBytes) { await reader.cancel(); throw new HttpInputError('This request is too large.', 413) }
      chunks.push(result.value)
    }
    if (timedOut) throw new HttpInputError('The request body timed out.', 408)
    const body = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body)) }
    catch { throw new HttpInputError('Send valid UTF-8 JSON.', 400) }
  } catch (error) {
    if (error instanceof HttpInputError) throw error
    throw new HttpInputError('The request body could not be read.', 400)
  } finally { clearTimeout(timer); reader.releaseLock() }
}
