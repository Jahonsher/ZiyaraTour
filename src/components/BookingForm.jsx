import { useId, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import tours from '../data/tours.js'
import site from '../data/site.json'
import { sendBookingToTelegram } from '../lib/telegram.js'
import { formatPhone, isValidPhone, todayLocal } from '../lib/booking.js'

export default function BookingForm({ preselect = '' }) {
  const { t, lang, localize } = useI18n()
  const loc = useLocation()
  const [params] = useSearchParams()
  const id = useId()
  const requestedDate = params.get('date') || ''
  const requestedGuests = Number(params.get('guests'))
  const initial = {
    name: '', phone: '+998 ', tour: preselect, message: '', consent: false, website: '',
    date: /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) && requestedDate >= todayLocal() ? requestedDate : '',
    guests: Number.isInteger(requestedGuests) && requestedGuests > 0 && requestedGuests <= 100 ? String(requestedGuests) : '',
  }
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ state: 'idle', key: '' })
  const disabled = status.state === 'sending'

  function update(key, value) {
    setForm(current => ({ ...current, [key]: value }))
    if (status.state !== 'sending') setStatus({ state: 'idle', key: '' })
  }

  async function submit(event) {
    event.preventDefault()
    if (disabled) return
    const fail = key => setStatus({ state: 'error', key })
    if (form.name.trim().length < 2) return fail('book.form.invalidName')
    if (!isValidPhone(form.phone)) return fail('book.form.invalidPhone')
    if (form.date && form.date < todayLocal()) return fail('book.form.invalidDate')
    if (!form.consent) return fail('book.form.consentRequired')
    setStatus({ state: 'sending', key: '' })
    const selected = tours.find(tour => tour.slug === form.tour || tour.id === form.tour)
    const result = await sendBookingToTelegram({
      ...form, name: form.name.trim(), tour: selected ? localize(selected.title) : form.tour,
      lang, page: loc.pathname, source: selected?.sourceUrl || 'Website',
    })
    if (result.ok) {
      setStatus({ state: 'success', key: 'book.form.success' })
      setForm(initial)
    } else {
      fail(result.reason === 'not-configured' ? 'book.form.missingConfig' : 'book.form.error')
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="booking-form">
      <div>
        <label htmlFor={`${id}-name`} className="label">{t('book.form.name')} *</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={80} disabled={disabled} className="input" value={form.name}
          onChange={event => update('name', event.target.value)} placeholder={t('book.form.namePh')} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className="label">{t('book.form.phone')} *</label>
        <input id={`${id}-phone`} name="phone" autoComplete="tel" required disabled={disabled} type="tel" inputMode="tel" maxLength={30} className="input" value={form.phone}
          onChange={event => update('phone', formatPhone(event.target.value))} placeholder={t('book.form.phonePh')}
          aria-invalid={status.key === 'book.form.invalidPhone'} aria-describedby={status.state === 'error' ? `${id}-error` : undefined} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-tour`} className="label">{t('book.form.tour')}</label>
        <select id={`${id}-tour`} name="tour" disabled={disabled} className="input" value={form.tour} onChange={event => update('tour', event.target.value)}>
          <option value="">{t('book.form.tourPh')}</option>
          {tours.map(tour => <option key={tour.id} value={tour.slug}>{localize(tour.title)}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-date`} className="label">{t('book.form.date')}</label>
        <input id={`${id}-date`} name="date" type="date" min={todayLocal()} disabled={disabled} className="input" value={form.date} onChange={event => update('date', event.target.value)} />
      </div>
      <div>
        <label htmlFor={`${id}-guests`} className="label">{t('book.form.guests')}</label>
        <input id={`${id}-guests`} name="guests" type="number" min="1" max="100" step="1" disabled={disabled} className="input" value={form.guests} onChange={event => update('guests', event.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className="label">{t('book.form.message')}</label>
        <textarea id={`${id}-message`} name="message" disabled={disabled} rows="4" maxLength={1000} className="input" value={form.message}
          onChange={event => update('message', event.target.value)} placeholder={t('book.form.messagePh')} />
      </div>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={event => update('website', event.target.value)} />
      <label className="sm:col-span-2 flex items-start gap-2 text-sm text-slate-600">
        <input name="consent" type="checkbox" required disabled={disabled} checked={form.consent} onChange={event => update('consent', event.target.checked)} className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
        <span>{t('book.form.agree')}</span>
      </label>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
        <button type="submit" disabled={disabled} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          {t(disabled ? 'book.form.sending' : 'book.form.submit')}
        </button>
        <span className="text-xs text-slate-500">{t('book.form.requiredHint')}</span>
      </div>
      {status.state === 'success' && <div role="status" className="sm:col-span-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm">{t(status.key)}</div>}
      {status.state === 'error' && <div id={`${id}-error`} role="alert" className="sm:col-span-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 p-4 text-sm">
        <p>{t(status.key)}</p>
        {(status.key === 'book.form.missingConfig' || status.key === 'book.form.error') && <a href={site.contact.telegram} target="_blank" rel="noreferrer" className="mt-2 inline-flex font-semibold underline">{t('book.form.directContact')}</a>}
      </div>}
    </form>
  )
}
