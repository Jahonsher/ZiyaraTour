import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import tours from '../data/tours.json'
import Img from '../components/Img.jsx'
import BookingForm from '../components/BookingForm.jsx'
import Reveal from '../components/Reveal.jsx'

export default function TourDetail() {
  const { slug } = useParams()
  const { t, localize } = useI18n()
  const tour = tours.find((tt) => tt.slug === slug)
  const [activeImg, setActiveImg] = useState(0)

  if (!tour) return <Navigate to="/tours" replace />

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero image */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px]">
          <Img
            src={tour.gallery?.[activeImg] || tour.cover}
            alt={localize(tour.title)}
            label={localize(tour.title)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container-x pb-8 text-white">
              <Link to="/tours" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 group animate-fade-up" style={{ animationDelay: '0ms' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                {t('tour.back')}
              </Link>
              <div className="flex flex-wrap items-center gap-2 mb-3 animate-fade-up" style={{ animationDelay: '120ms' }}>
                <span className="chip bg-white/95 text-brand-800">{t(`categories.${tour.category}`)}</span>
                <span className="chip bg-accent-500/90 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
                  {tour.rating} · {tour.reviews} {t('tour.reviews')}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl max-w-3xl animate-fade-up" style={{ animationDelay: '240ms' }}>{localize(tour.title)}</h1>
              <p className="mt-3 text-white/85 max-w-2xl animate-fade-up" style={{ animationDelay: '360ms' }}>{localize(tour.shortDescription)}</p>
            </div>
          </div>
        </div>
        {tour.gallery && tour.gallery.length > 1 && (
          <div className="container-x -mt-6 relative z-10">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {tour.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    activeImg === i ? 'border-white ring-2 ring-brand-500 scale-105' : 'border-white/60'
                  }`}
                >
                  <Img src={g} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="container-x mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick facts */}
          <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Fact icon="⏱️" label={t('tour.days')} value={`${tour.duration.days} / ${tour.duration.nights}`} />
            <Fact icon="👥" label={t('search.guests')} value={`${tour.groupSize.min}–${tour.groupSize.max}`} />
            <Fact icon="🗺️" label="Cities" value={tour.destinations.length} />
            <Fact icon="⭐" label="Rating" value={tour.rating} />
          </Reveal>

          <Reveal as="section">
            <h2 className="font-display font-bold text-2xl text-ink-900">{t('tour.highlights')}</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {localize(tour.highlights).map((h, i) => (
                <li key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span className="text-slate-700">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="font-display font-bold text-2xl text-ink-900">About the trip</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{localize(tour.description)}</p>
          </Reveal>

          {tour.itinerary && tour.itinerary.length > 0 && (
            <section>
              <Reveal>
                <h2 className="font-display font-bold text-2xl text-ink-900">{t('tour.itinerary')}</h2>
              </Reveal>
              <ol className="mt-4 space-y-4 relative before:absolute before:top-6 before:bottom-6 before:left-6 before:w-px before:bg-gradient-to-b before:from-brand-200 before:via-brand-300 before:to-transparent">
                {tour.itinerary.map((d, i) => (
                  <Reveal key={d.day} variant="right" delay={i * 100}>
                    <li className="flex gap-4 group">
                      <div className="relative w-12 h-12 rounded-2xl bg-brand-600 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-cta transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-accent-500">
                        <span className="text-[10px] uppercase tracking-wider opacity-80">Day</span>
                        <span className="font-bold leading-none">{d.day}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">{localize(d.title)}</h3>
                        <p className="text-slate-600 text-sm mt-1">{localize(d.text)}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}

          {tour.priceTiers && tour.priceTiers.length > 0 && (
            <Reveal as="section">
              <h2 className="font-display font-bold text-2xl text-ink-900">Group pricing</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 shadow-card">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Group size</th>
                      <th className="text-right px-4 py-3 font-semibold">Price / person</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tour.priceTiers.map((row) => (
                      <tr key={row.group} className="border-t border-slate-100 hover:bg-brand-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{row.group} persons</td>
                        <td className="px-4 py-3 text-right font-display font-bold text-accent-600">${row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal variant="right">
              <List title={t('tour.included')} items={localize(tour.included)} tone="ok" />
            </Reveal>
            <Reveal variant="left" delay={120}>
              <List title={t('tour.excluded')} items={localize(tour.excluded)} tone="no" />
            </Reveal>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <Reveal variant="left" delay={100}>
            <div className="rounded-3xl bg-white shadow-card border border-slate-100 p-6 hover:shadow-pop transition-shadow">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{t('tour.from')}</div>
              <div className="font-display font-extrabold text-4xl text-ink-900">
                ${tour.priceFrom}
                <span className="text-sm text-slate-500 font-medium ml-1">/ {t('tour.person')}</span>
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100">
                <h3 className="font-semibold text-ink-900 mb-3">{t('book.title')}</h3>
                <BookingForm preselect={tour.slug} />
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}

function Fact({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-card hover:border-brand-200 hover:bg-white group">
      <div className="text-2xl leading-none inline-block transition-transform duration-500 group-hover:scale-125">{icon}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-slate-500 font-semibold">{label}</div>
      <div className="mt-0.5 font-display font-bold text-ink-900 text-lg">{value}</div>
    </div>
  )
}

function List({ title, items = [], tone = 'ok' }) {
  const color = tone === 'ok' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
  const glyph = tone === 'ok'
    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
  return (
    <div className="rounded-2xl border border-slate-100 p-6">
      <h3 className="font-display font-bold text-ink-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>{glyph}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
