import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import TourCard from './TourCard.jsx'
import Reveal from './Reveal.jsx'
import tours from '../data/tours.json'

const TABS = ['all', 'cultural', 'pilgrimage', 'city', 'adventure']

export default function FeaturedTours() {
  const { t } = useI18n()
  const [tab, setTab] = useState('all')

  const list = useMemo(() => {
    const base = tours.filter((tt) => tt.featured || tab !== 'all')
    return tab === 'all' ? tours.filter((tt) => tt.featured) : tours.filter((tt) => tt.category === tab)
  }, [tab])

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <Reveal variant="up">
            <div className="section-eyebrow">{t('sections.featured.eyebrow')}</div>
            <h2 className="section-title mt-2">{t('sections.featured.title')}</h2>
            <p className="mt-3 text-slate-600 max-w-2xl">{t('sections.featured.subtitle')}</p>
          </Reveal>
          <Reveal variant="left" delay={150}>
            <Link to="/tours" className="btn-secondary btn-shine group w-fit">
              {t('nav.tours')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </Link>
          </Reveal>
        </div>

        <Reveal className="flex flex-wrap items-center gap-2 mb-8" delay={200}>
          {TABS.map((c) => (
            <button key={c} onClick={() => setTab(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5 ${
                tab === c
                  ? 'bg-ink-900 text-white border-ink-900 shadow-cta scale-105'
                  : 'bg-white text-ink-700 border-slate-200 hover:border-brand-300 hover:text-brand-700'
              }`}>
              {t(`categories.${c}`)}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.slice(0, 6).map((tour, i) => (
            <Reveal key={tour.id} variant="up" delay={i * 100} threshold={0.1}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
