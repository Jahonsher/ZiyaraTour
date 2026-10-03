// Credentials stay on the server. Success means Telegram accepted the lead.
export async function sendBookingToTelegram(data) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: controller.signal })
    const result = await response.json()
    return response.ok && result.ok ? { ok: true } : { ok: false, reason: result.reason || 'request-failed' }
  } catch { return { ok: false, reason: 'network-error' } }
  finally { clearTimeout(timeout) }
}
