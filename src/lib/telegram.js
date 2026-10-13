const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID
const BRAND = import.meta.env.VITE_BRAND_NAME || 'ZiyaraTour'

export function isTelegramConfigured() {
  return Boolean(TOKEN && CHAT_ID)
}

function escapeHtml(s = '') {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/**
 * Format a booking form payload into an HTML Telegram message.
 * Payload keys: name, phone, email, tour, date, guests, message, lang, page
 */
export function buildBookingMessage(data) {
  const rows = [
    `<b>🧳 New booking — ${escapeHtml(BRAND)}</b>`,
    '',
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.email ? `<b>Email:</b> ${escapeHtml(data.email)}` : null,
    data.tour ? `<b>Tour:</b> ${escapeHtml(data.tour)}` : null,
    data.date ? `<b>Date:</b> ${escapeHtml(data.date)}` : null,
    data.guests ? `<b>Guests:</b> ${escapeHtml(String(data.guests))}` : null,
    data.message ? `\n<b>Message:</b>\n${escapeHtml(data.message)}` : null,
    '',
    `<i>Lang: ${escapeHtml(data.lang || '—')} · Page: ${escapeHtml(data.page || '/')}` +
      ` · ${new Date().toLocaleString()}</i>`,
  ]
  return rows.filter(Boolean).join('\n')
}

/**
 * Sends a message directly to the Telegram Bot API from the browser.
 * Note: token is embedded in the frontend bundle. For maximum security,
 * proxy through a serverless function later.
 */
export async function sendBookingToTelegram(data) {
  if (!isTelegramConfigured()) {
    return { ok: false, reason: 'not-configured' }
  }
  const text = buildBookingMessage(data)
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.ok) {
      return { ok: false, reason: json.description || `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: err?.message || 'network-error' }
  }
}
