const MAX_BYTES = 12000
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export function validateLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const limits = { name: 80, phone: 30, tour: 200, date: 10, message: 1000, lang: 5, page: 200, source: 100, website: 200 }
  const data = {}
  for (const [key, max] of Object.entries(limits)) {
    if (input[key] !== undefined && typeof input[key] !== 'string') return null
    data[key] = (input[key] || '').trim()
    if (data[key].length > max) return null
  }
  const digits = data.phone.replace(/\D/g, '')
  if (data.name.length < 2 || !/^\+[\d\s()\-]+$/.test(data.phone) || digits.length < 8 || digits.length > 15) return null
  if (digits.startsWith('998') && digits.length !== 12) return null
  if (input.consent !== true) return null
  if (!['uz', 'uzc', 'ru', 'en'].includes(data.lang)) return null
  if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date)) return null
  data.guests = input.guests === '' || input.guests === undefined ? '' : Number(input.guests)
  if (data.guests !== '' && (!['number', 'string'].includes(typeof input.guests) || !Number.isInteger(data.guests) || data.guests < 1 || data.guests > 100)) return null
  return data
}

export function buildLeadMessage(data, brand = 'ZiyaraTour') {
  return [
    `<b>🌿 New travel enquiry — ${escapeHtml(brand)}</b>`,
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    `<b>Tour:</b> ${escapeHtml(data.tour || 'Help me choose')}`,
    data.date && `<b>Preferred date:</b> ${escapeHtml(data.date)}`,
    data.guests && `<b>Travellers:</b> ${data.guests}`,
    data.message && `<b>Message:</b> ${escapeHtml(data.message)}`,
    `<b>Language:</b> ${escapeHtml(data.lang)}`,
    `<b>Page:</b> ${escapeHtml(data.page)}`,
    data.source && `<b>Source:</b> ${escapeHtml(data.source)}`,
    '<i>Customer agreed to be contacted about this enquiry.</i>',
  ].filter(Boolean).join('\n')
}

async function readBody(req) {
  if (Number(req.headers?.['content-length']) > MAX_BYTES) throw new Error('too-large')
  if (req.body !== undefined) {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    if (Buffer.byteLength(raw) > MAX_BYTES) throw new Error('too-large')
    return JSON.parse(raw)
  }
  const chunks = []
  let bytes = 0
  for await (const chunk of req) {
    bytes += Buffer.byteLength(chunk)
    if (bytes > MAX_BYTES) throw new Error('too-large')
    chunks.push(Buffer.from(chunk))
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export function createLeadHandler({ env = process.env, fetchImpl = globalThis.fetch, now = Date.now } = {}) {
  // Best-effort per-instance throttling. Use platform WAF limits for global enforcement.
  const attempts = new Map()
  return async function handler(req, res) {
    const send = (status, body) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(body))
    }
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(405, { ok: false, reason: 'method-not-allowed' }) }
    if (!String(req.headers?.['content-type'] || '').toLowerCase().startsWith('application/json')) return send(415, { ok: false, reason: 'invalid-content-type' })
    let input
    try { input = await readBody(req) } catch (error) { return send(error.message === 'too-large' ? 413 : 400, { ok: false, reason: 'invalid-body' }) }
    const data = validateLead(input)
    if (!data || data.website) return send(400, { ok: false, reason: 'invalid-lead' })
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return send(503, { ok: false, reason: 'not-configured' })
    const time = now()
    for (const [key, value] of attempts) if (value.until <= time) attempts.delete(key)
    const address = String(req.headers?.['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
    const attempt = attempts.get(address) || { count: 0, until: time + 600000 }
    if (attempt.count >= 5 || attempts.size >= 10000) { res.setHeader('Retry-After', '600'); return send(429, { ok: false, reason: 'too-many-requests' }) }
    attempt.count++
    attempts.set(address, attempt)
    try {
      const response = await fetchImpl(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: buildLeadMessage(data, env.BRAND_NAME || 'ZiyaraTour'), parse_mode: 'HTML', disable_web_page_preview: true }),
        signal: AbortSignal.timeout(10000),
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true) return send(502, { ok: false, reason: 'delivery-failed' })
      return send(200, { ok: true })
    } catch { return send(502, { ok: false, reason: 'delivery-failed' }) }
  }
}
