import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.js'
import DestinationCard from './DestinationCard.jsx'
import Reveal from './Reveal.jsx'

export default function Destinations() {
  const { t } = useI18n()

  return (
    <section className="relative py-16 sm:py-24 bg-slate-50 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="blob w-[300px] h-[300px] bg-brand-300/30 -top-20 -left-20 animate-blob" />
      <div className="blob w-[280px] h-[280px] bg-accent-300/30 bottom-0 -right-20 animate-blob" style={{ animationDelay: '4s' }} />

      <div className="container-x relative">
        <Reveal className="text-center mb-12">
          <div className="section-eyebrow">{t('sections.destinations.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('sections.destinations.title')}</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{t('sections.destinations.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <Reveal key={d.id} variant="zoom" delay={(i % 3) * 100} threshold={0.1}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
