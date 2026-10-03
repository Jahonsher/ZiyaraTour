import test from 'node:test'
import assert from 'node:assert/strict'
import { Readable } from 'node:stream'
import { createLeadHandler, validateLead } from '../server/lead-handler.js'

const lead = { name: 'Ali Valiyev', phone: '+998 90 123 45 67', tour: 'Silk Road', lang: 'uz', page: '/book', date: '2027-04-15', guests: '3', message: 'Family trip', consent: true }
const env = { TELEGRAM_BOT_TOKEN: 'test-secret', TELEGRAM_CHAT_ID: 'test-chat' }
async function request(handler, body = lead, options = {}) {
  const req = options.stream ? Readable.from([JSON.stringify(body)]) : { body }
  Object.assign(req, { method: options.method || 'POST', headers: { 'content-type': 'application/json', ...options.headers }, socket: { remoteAddress: '127.0.0.1' } })
  const res = { headers: {}, setHeader(key, value) { this.headers[key] = value }, end(body) { this.body = JSON.parse(body) } }
  await handler(req, res)
  return res
}
test('only confirmed Telegram delivery returns success; fields are escaped', async () => {
  let payload
  const handler = createLeadHandler({ env, fetchImpl: async (url, options) => { assert.equal(url, 'https://api.telegram.org/bottest-secret/sendMessage'); payload = JSON.parse(options.body); return { ok: true, json: async () => ({ ok: true }) } } })
  const response = await request(handler, { ...lead, name: '<Ali & family>', message: '<b>hello</b>' }, { stream: true })
  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, { ok: true })
  assert.match(payload.text, /&lt;Ali &amp; family&gt;/)
  assert.match(payload.text, /&lt;b&gt;hello&lt;\/b&gt;/)
  assert.match(payload.text, /2027-04-15/)
  assert.match(payload.text, /Travellers:<\/b> 3/)
})
test('missing configuration fails honestly without making a request', async () => {
  const handler = createLeadHandler({ env: {}, fetchImpl: () => { throw new Error('must not call') } })
  const response = await request(handler)
  assert.equal(response.statusCode, 503)
  assert.equal(response.body.reason, 'not-configured')
})
test('rejects invalid phones, dates, consent, oversized text and bot fields', async () => {
  const handler = createLeadHandler({ env, fetchImpl: () => { throw new Error('must not call') } })
  for (const invalid of [{ phone: '+998 90' }, { phone: 'abcdefghijk' }, { name: ' ' }, { guests: '2.5' }, { guests: 101 }, { guests: true }, { date: '2027-02-30' }, { consent: false }, { message: 'x'.repeat(1001) }, { website: 'spam.test' }]) {
    assert.equal((await request(handler, { ...lead, ...invalid })).statusCode, 400)
  }
  assert.ok(validateLead({ ...lead, phone: '+44 20 7946 0958' }))
})
test('Telegram errors and network failures never appear as successful delivery', async () => {
  for (const fetchImpl of [async () => ({ ok: false, json: async () => ({ ok: false, description: 'secret upstream info' }) }), async () => ({ ok: true, json: async () => ({ ok: false }) }), async () => { throw new Error('test-secret') }]) {
    const response = await request(createLeadHandler({ env, fetchImpl }))
    assert.equal(response.statusCode, 502)
    assert.deepEqual(response.body, { ok: false, reason: 'delivery-failed' })
  }
})
test('rate limits repeated submissions and permits requests after the window', async () => {
  let time = 0
  const handler = createLeadHandler({ env, now: () => time, fetchImpl: async () => ({ ok: true, json: async () => ({ ok: true }) }) })
  for (let i = 0; i < 5; i++) assert.equal((await request(handler)).statusCode, 200)
  assert.equal((await request(handler)).statusCode, 429)
  time = 600001
  assert.equal((await request(handler)).statusCode, 200)
})
test('enforces request method, JSON type, valid JSON and body size', async () => {
  const handler = createLeadHandler({ env: {} })
  assert.equal((await request(handler, lead, { method: 'GET' })).statusCode, 405)
  assert.equal((await request(handler, lead, { headers: { 'content-type': 'text/plain' } })).statusCode, 415)
  assert.equal((await request(handler, '{broken')).statusCode, 400)
  assert.equal((await request(handler, { ...lead, message: 'x'.repeat(13000) })).statusCode, 413)
})
