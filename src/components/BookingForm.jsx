import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import tours from '../data/tours.json'
import { isTelegramConfigured, sendBookingToTelegram } from '../lib/telegram.js'

const initial = {
  name: '',
  phone: '+998 ',
  tour: '',
  message: '',
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  const rest = digits.startsWith('998') ? digits.slice(3) : digits
  const p1 = rest.slice(0, 2)
  const p2 = rest.slice(2, 5)
  const p3 = rest.slice(5, 7)
  const p4 = rest.slice(7, 9)
  let out = '+998'
  if (p1) out += ' ' + p1
  if (p2) out += ' ' + p2
  if (p3) out += ' ' + p3
  if (p4) out += ' ' + p4
  return out
}

export default function BookingForm({ preselect = '' }) {
  const { t, lang, localize } = useI18n()
  const loc = useLocation()
  const [form, setForm] = useState({ ...initial, tour: preselect })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function submit(e) {
    e.preventDefault()
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (!form.name.trim() || phoneDigits.length < 12) return

    if (!isTelegramConfigured()) {
      setStatus({ state: 'error', message: t('book.form.missingConfig') })
      return
    }

    setStatus({ state: 'sending', message: '' })
    const selected = tours.find((tt) => tt.slug === form.tour || tt.id === form.tour)
    const tourLabel = selected ? localize(selected.title) : form.tour

    const res = await sendBookingToTelegram({
      ...form,
      tour: tourLabel,
      lang,
      page: loc.pathname,
    })

    if (res.ok) {
      setStatus({ state: 'success', message: t('book.form.success') })
      setForm({ ...initial, tour: preselect })
    } else {
      setStatus({ state: 'error', message: res.reason === 'not-configured' ? t('book.form.missingConfig') : t('book.form.error') })
    }
  }

  const disabled = status.state === 'sending'

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="label">{t('book.form.name')} *</label>
        <input required disabled={disabled} className="input" value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder={t('book.form.namePh')} />
      </div>
      <div>
        <label className="label">{t('book.form.phone')} *</label>
        <input required disabled={disabled} type="tel" inputMode="tel" className="input" value={form.phone}
          onChange={(e) => update('phone', formatPhone(e.target.value))}
          onFocus={(e) => { if (!form.phone) update('phone', '+998 '); requestAnimationFrame(() => e.target.setSelectionRange(e.target.value.length, e.target.value.length)) }}
          onKeyDown={(e) => {
            const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End']
            if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return
            if (!/[0-9+\s]/.test(e.key)) e.preventDefault()
          }}
          placeholder={t('book.form.phonePh')} />
      </div>
      <div className="sm:col-span-2">
        <label className="label">{t('book.form.tour')}</label>
        <select disabled={disabled} className="input" value={form.tour}
          onChange={(e) => update('tour', e.target.value)}>
          <option value="">{t('book.form.tourPh')}</option>
          {tours.map((tt) => (
            <option key={tt.id} value={tt.slug}>{localize(tt.title)}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label">{t('book.form.message')}</label>
        <textarea disabled={disabled} rows="4" className="input" value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={t('book.form.messagePh')} />
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={disabled}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          {status.state === 'sending' ? t('book.form.sending') : t('book.form.submit')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
        <span className="text-xs text-slate-500">{t('book.form.requiredHint')}</span>
      </div>

      {status.state === 'success' && (
        <div className="sm:col-span-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm">
          {status.message}
        </div>
      )}
      {status.state === 'error' && (
        <div className="sm:col-span-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 p-4 text-sm">
          {status.message}
        </div>
      )}
    </form>
  )
}
