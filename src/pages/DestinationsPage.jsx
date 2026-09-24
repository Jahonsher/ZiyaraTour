import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.json'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'

export default function DestinationsPage() {
  const { t, localize } = useI18n()
  return (
    <div className="relative pt-28 sm:pt-32 pb-16 overflow-hidden">
      <div className="blob w-[340px] h-[340px] bg-brand-200/40 -top-10 -right-20 animate-blob" />
      <div className="blob w-[280px] h-[280px] bg-accent-200/40 bottom-20 -left-20 animate-blob" style={{ animationDelay: '5s' }} />

      <div className="container-x relative">
        <Reveal as="header" className="max-w-2xl mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink-900">{t('nav.destinations')}</h1>
          <p className="mt-3 text-slate-600">{t('sections.destinations.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {destinations.map((d, i) => (
            <Reveal key={d.id} variant="zoom" delay={(i % 6) * 90} threshold={0.1}>
              <Link to={`/tours?destination=${d.id}`} className="img-reveal group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-card block tilt-hover">
                <Img src={d.image} alt={localize(d.name)} label={localize(d.name)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[900ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-brand-500/30 via-transparent to-accent-500/30" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-white/70">{d.tours} {t('destinations.toursCount')}</div>
                  <div className="mt-1 font-display font-bold text-xl sm:text-2xl">{localize(d.name)}</div>
                  <span className="img-reveal-caption mt-2 inline-flex items-center gap-1 text-sm text-white/90">
                    {t('destinations.explore')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
