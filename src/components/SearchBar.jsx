import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.json'

/**
 * `overlap` mode floats the bar up over the hero (with negative margin).
 * Standalone mode is a simple search band you can drop anywhere.
 */
export default function SearchBar({ overlap = true }) {
  const { t, localize } = useI18n()
  const nav = useNavigate()
  const [q, setQ] = useState({ destination: '', duration: '', date: '', guests: '' })

  function submit(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(q).forEach(([k, v]) => v && params.set(k, v))
    nav(`/tours?${params.toString()}`)
  }

  return (
    <div className={overlap ? 'relative -mt-24 sm:-mt-28 z-20 px-4' : 'py-8'}>
      <form onSubmit={submit} className="container-x">
        <div className="relative bg-white rounded-3xl shadow-pop border border-slate-100 p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_.8fr_auto] gap-2 md:gap-0 md:divide-x md:divide-slate-100">
            <Field icon="📍" label={t('search.destination')}>
              <select value={q.destination} onChange={(e) => setQ({ ...q, destination: e.target.value })}
                className="w-full bg-transparent text-ink-900 font-semibold focus:outline-none">
                <option value="">{t('search.any')}</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{localize(d.name)}</option>
                ))}
              </select>
            </Field>
            <Field icon="⏱️" label={t('search.duration')}>
              <select value={q.duration} onChange={(e) => setQ({ ...q, duration: e.target.value })}
                className="w-full bg-transparent text-ink-900 font-semibold focus:outline-none">
                <option value="">{t('search.any')}</option>
                <option value="1-3">1–3 {t('tour.days')}</option>
                <option value="4-6">4–6 {t('tour.days')}</option>
                <option value="7-10">7–10 {t('tour.days')}</option>
                <option value="10+">10+ {t('tour.days')}</option>
              </select>
            </Field>
            <Field icon="📅" label={t('search.date')}>
              <input type="date" value={q.date} onChange={(e) => setQ({ ...q, date: e.target.value })}
                className="w-full bg-transparent text-ink-900 font-semibold focus:outline-none" />
            </Field>
            <Field icon="👥" label={t('search.guests')}>
              <input type="number" min="1" max="30" placeholder="2"
                value={q.guests} onChange={(e) => setQ({ ...q, guests: e.target.value })}
                className="w-full bg-transparent text-ink-900 font-semibold focus:outline-none placeholder:text-slate-400" />
            </Field>
            <div className="flex items-center md:pl-3">
              <button type="submit" className="btn-primary w-full !py-3.5 md:!py-4 md:!px-6 whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <span className="md:hidden lg:inline">{t('search.search')}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function Field({ icon, label, children }) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-2xl md:rounded-none hover:bg-slate-50 md:hover:bg-transparent transition cursor-pointer">
      <span className="text-xl leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</div>
        <div className="mt-0.5">{children}</div>
      </div>
    </label>
  )
}
