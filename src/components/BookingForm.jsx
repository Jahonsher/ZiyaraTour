import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import tours from '../data/tours.json'
import { isTelegramConfigured, sendBookingToTelegram } from '../lib/telegram.js'

const initial = {
  name: '',
  phone: '',
  email: '',
  tour: '',
  date: '',
  guests: 2,
  message: '',
  agree: true,
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
    if (!form.name.trim() || !form.phone.trim() || !form.agree) return

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
        <input required disabled={disabled} type="tel" className="input" value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder={t('book.form.phonePh')} />
      </div>
      <div>
        <label className="label">{t('book.form.email')}</label>
        <input disabled={disabled} type="email" className="input" value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder={t('book.form.emailPh')} />
      </div>
      <div>
        <label className="label">{t('book.form.tour')}</label>
        <select disabled={disabled} className="input" value={form.tour}
          onChange={(e) => update('tour', e.target.value)}>
          <option value="">{t('book.form.tourPh')}</option>
          {tours.map((tt) => (
            <option key={tt.id} value={tt.slug}>{localize(tt.title)}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">{t('book.form.date')}</label>
        <input disabled={disabled} type="date" className="input" value={form.date}
          onChange={(e) => update('date', e.target.value)} />
      </div>
      <div>
        <label className="label">{t('book.form.guests')}</label>
        <input disabled={disabled} type="number" min="1" max="30" className="input" value={form.guests}
          onChange={(e) => update('guests', Number(e.target.value))} />
      </div>
      <div className="sm:col-span-2">
        <label className="label">{t('book.form.message')}</label>
        <textarea disabled={disabled} rows="4" className="input" value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={t('book.form.messagePh')} />
      </div>

      <div className="sm:col-span-2 flex items-start gap-2 text-sm text-slate-600">
        <input id="agree" type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
        <label htmlFor="agree">{t('book.form.agree')}</label>
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={disabled || !form.agree}
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
