import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TourCard from '../components/TourCard.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import tours from '../data/tours.json'
import destinations from '../data/destinations.json'

const CATEGORIES = ['all', 'cultural', 'pilgrimage', 'city', 'adventure']

export default function Tours() {
  const { t, localize } = useI18n()
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState('all')

  const destination = params.get('destination') || ''
  const duration = params.get('duration') || ''

  const filtered = useMemo(() => {
    return tours.filter((tour) => {
      if (category !== 'all' && tour.category !== category) return false
      if (destination && !tour.destinations.includes(destination)) return false
      if (duration) {
        const d = tour.duration.days
        if (duration === '1-3' && !(d >= 1 && d <= 3)) return false
        if (duration === '4-6' && !(d >= 4 && d <= 6)) return false
        if (duration === '7-10' && !(d >= 7 && d <= 10)) return false
        if (duration === '10+' && !(d > 10)) return false
      }
      return true
    })
  }, [category, destination, duration])

  function clear() {
    setParams({})
    setCategory('all')
  }

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="container-x">
        <header className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink-900">{t('nav.tours')}</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">{t('sections.featured.subtitle')}</p>
        </header>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                category === c
                  ? 'bg-brand-600 text-white border-brand-600 shadow-cta'
                  : 'bg-white text-ink-700 border-slate-200 hover:border-brand-300'
              }`}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
          {(destination || duration) && (
            <button onClick={clear} className="ml-auto text-sm text-brand-700 font-semibold underline underline-offset-4">
              Clear filters
            </button>
          )}
        </div>

        {(destination || duration) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {destination && (
              <span className="chip bg-brand-50 text-brand-800">
                {localize(destinations.find((d) => d.id === destination)?.name)}
              </span>
            )}
            {duration && <span className="chip bg-brand-50 text-brand-800">{duration} {t('tour.days')}</span>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            <p className="text-xl">😕</p>
            <p className="mt-2">{t('misc.notFound')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
