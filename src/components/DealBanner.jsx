import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import tours from '../data/tours.js'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'

export default function DealBanner() {
  const { t, localize } = useI18n()
  const tour = tours.find(item => item.slug === site.deal?.tourSlug)
  if (!tour) return null
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-ink-900 text-white shadow-pop group">
            <div className="absolute inset-0">
              <Img src={tour.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/70 to-transparent" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16">
              <div>
                <span className="chip bg-accent-500 text-white uppercase font-bold tracking-widest">{t('deals.eyebrow')}</span>
                <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">{localize(tour.title)}</h2>
                <p className="mt-3 text-white/80 text-lg max-w-lg">{localize(tour.shortDescription)}</p>
                <div className="mt-6">
                  <div className="text-sm text-white/70">{t('tour.from')}</div>
                  <span className="font-display font-extrabold text-5xl text-accent-400">${tour.priceFrom}</span>
                  <span className="ml-2 text-sm text-white/70">/ {t('tour.person')}</span>
                </div>
                <p className="mt-4 text-xs text-white/70">{localize(tour.availabilityNote || site.priceNote)}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/book?tour=${tour.slug}`} className="btn-primary btn-shine">{t('deals.cta')}</Link>
                  <Link to={`/tours/${tour.slug}`} className="btn border border-white/40 text-white hover:bg-white/10">{t('tour.details')}</Link>
                </div>
              </div>
              <div className="relative hidden lg:block min-h-80 rounded-2xl overflow-hidden">
                <Img src={tour.cover} alt={localize(tour.title)} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-white text-ink-900 rounded-2xl p-4 shadow-pop">
                  <p className="font-semibold">{tour.duration.days} {t('tour.days')} / {tour.duration.nights} {t('tour.nights')}</p>
                  <p className="mt-1 text-sm text-slate-500">{tour.destinations.length} {t('tour.cities')}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
