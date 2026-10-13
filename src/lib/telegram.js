export async function sendBookingToTelegram(data) {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15000),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.ok !== true) return { ok: false, reason: result.reason || 'delivery-failed' }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network-error' }
  }
}
