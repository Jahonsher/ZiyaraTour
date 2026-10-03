import { useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import tours from '../data/tours.json'
import site from '../data/site.json'
import { sendBookingToTelegram } from '../lib/telegram.js'
import Icon from './Icon.jsx'

const initial = { name: '', phone: '+998 ', tour: '', date: '', guests: '', message: '', website: '', consent: false }
export default function BookingForm({ preselect = '' }) {
  const { t, lang, localize } = useI18n()
  const c = experience[lang]
  const location = useLocation()
  const id = useId()
  const [form, setForm] = useState({ ...initial, tour: preselect })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const sending = useRef(false)
  const nameRef = useRef(null), phoneRef = useRef(null)
  const disabled = status === 'sending'
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  function update(key, value) { setForm(old => ({ ...old, [key]: value })); setErrors(old => ({ ...old, [key]: undefined })) }
  async function submit(event) {
    event.preventDefault()
    if (sending.current) return
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = c.nameError
    const digits = form.phone.replace(/\D/g, '')
    if (!/^\+[\d\s()\-]+$/.test(form.phone) || digits.length < 8 || digits.length > 15 || (digits.startsWith('998') && digits.length !== 12)) nextErrors.phone = c.phoneError
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { (nextErrors.name ? nameRef : phoneRef).current?.focus(); return }
    sending.current = true
    setStatus('sending')
    const selected = tours.find(tour => tour.slug === form.tour)
    const params = new URLSearchParams(location.search)
    const result = await sendBookingToTelegram({ ...form, name: form.name.trim(), tour: selected ? localize(selected.title) : '', lang, page: location.pathname, source: params.get('utm_source') || '' })
    sending.current = false
    setStatus(result.ok ? 'success' : result.reason === 'not-configured' ? 'not-configured' : 'error')
    if (result.ok) setForm({ ...initial, tour: preselect })
  }
  if (status === 'success') return <div className="lead-success" role="status" aria-live="polite"><span><Icon name="check" size={32} /></span><h3>{c.successTitle}</h3><p>{c.success}</p><button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>{c.again}</button></div>
  return <form onSubmit={submit} className="booking-form" aria-busy={disabled}>
    <div className="form-field"><label className="label" htmlFor={`${id}-name`}>{t('book.form.name')} <span>*</span></label><input ref={nameRef} id={`${id}-name`} name="name" autoComplete="name" required maxLength={80} disabled={disabled} className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder={t('book.form.namePh')} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-error` : undefined} />{errors.name && <p className="field-error" id={`${id}-name-error`}>{errors.name}</p>}</div>
    <div className="form-field"><label className="label" htmlFor={`${id}-phone`}>{t('book.form.phone')} <span>*</span></label><input ref={phoneRef} id={`${id}-phone`} name="phone" autoComplete="tel" required type="tel" inputMode="tel" maxLength={30} disabled={disabled} className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+998 90 123 45 67" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-error` : undefined} />{errors.phone && <p className="field-error" id={`${id}-phone-error`}>{errors.phone}</p>}</div>
    <div className="form-field form-wide"><label className="label" htmlFor={`${id}-tour`}>{t('book.form.tour')} <small>({c.optional})</small></label><select id={`${id}-tour`} name="tour" className="input" value={form.tour} disabled={disabled} onChange={e => update('tour', e.target.value)}><option value="">{c.undecided}</option>{tours.map(tour => <option key={tour.id} value={tour.slug}>{localize(tour.title)}</option>)}</select></div>
    <div className="form-field"><label className="label" htmlFor={`${id}-date`}>{t('book.form.date')} <small>({c.optional})</small></label><input id={`${id}-date`} name="date" type="date" min={today} className="input" value={form.date} disabled={disabled} onChange={e => update('date', e.target.value)} /></div>
    <div className="form-field"><label className="label" htmlFor={`${id}-guests`}>{t('book.form.guests')}</label><input id={`${id}-guests`} name="guests" type="number" min="1" max="100" step="1" placeholder="2" className="input" value={form.guests} disabled={disabled} onChange={e => update('guests', e.target.value)} /></div>
    <div className="form-field form-wide"><label className="label" htmlFor={`${id}-message`}>{t('book.form.message')} <small>({c.optional})</small></label><textarea id={`${id}-message`} name="message" rows="3" maxLength={1000} className="input" value={form.message} disabled={disabled} onChange={e => update('message', e.target.value)} placeholder={t('book.form.messagePh')} /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => update('website', e.target.value)} /></div>
    <label className="consent-label form-wide"><input name="consent" type="checkbox" required checked={form.consent} disabled={disabled} onChange={e => update('consent', e.target.checked)} /><span>{c.consent}</span></label>
    <button type="submit" className="btn-primary form-wide form-submit" disabled={disabled}>{disabled ? <><span className="loading-spinner" />{t('book.form.sending')}</> : <>{c.submit}<Icon /></>}</button>
    {(status === 'error' || status === 'not-configured') && <div role="alert" className="form-error form-wide"><p>{t(status === 'not-configured' ? 'book.form.missingConfig' : 'book.form.error')}</p><a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>{site.contact.phone}</a><a href={site.contact.telegram} target="_blank" rel="noreferrer">Telegram ↗</a></div>}
  </form>
}
