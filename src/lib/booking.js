export function formatPhone(value) {
  const cleaned = value.replace(/[^\d+\s()-]/g, '')
  const digits = cleaned.replace(/\D/g, '')
  if (!digits) return cleaned.includes('+') ? '+' : ''
  if (digits.startsWith('998')) {
    const rest = digits.slice(3, 12)
    return ['+998', rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(Boolean).join(' ')
  }
  return `+${digits.slice(0, 15)}`
}

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, '')
  return /^\+[\d\s()-]+$/.test(value) && digits.length >= 8 && digits.length <= 15 && (!digits.startsWith('998') || digits.length === 12)
}

export function todayLocal() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
