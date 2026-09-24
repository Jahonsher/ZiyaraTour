import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.json'
import Img from './Img.jsx'

export default function Destinations() {
  const { t, localize } = useI18n()

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container-x">
        <div className="text-center mb-12">
          <div className="section-eyebrow">{t('sections.destinations.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('sections.destinations.title')}</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{t('sections.destinations.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {destinations.slice(0, 4).map((d, idx) => (
            <Link
              key={d.id}
              to={`/tours?destination=${d.id}`}
              className={`relative rounded-3xl overflow-hidden group shadow-card ${
                idx === 0 ? 'col-span-2 lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto' : 'aspect-[3/4]'
              }`}
            >
              <Img
                src={d.image}
                alt={localize(d.name)}
                label={localize(d.name)}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-white/70 mb-1">
                  {d.tours} {t('destinations.toursCount')}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl">{localize(d.name)}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/90 group-hover:gap-2 transition-all">
                  {t('destinations.explore')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {destinations.slice(4).map((d) => (
            <Link key={d.id} to={`/tours?destination=${d.id}`} className="relative rounded-2xl overflow-hidden group aspect-[3/4] shadow-card">
              <Img src={d.image} alt={localize(d.name)} label={localize(d.name)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="text-xs uppercase tracking-widest text-white/70 mb-1">{d.tours} {t('destinations.toursCount')}</div>
                <h3 className="font-display font-bold text-lg">{localize(d.name)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
