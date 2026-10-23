import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.js'
import DestinationCard from '../components/DestinationCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function DestinationsPage() {
  const { t } = useI18n()
  return (
    <div className="relative pt-28 sm:pt-32 pb-16 overflow-hidden">
      <div className="blob w-[340px] h-[340px] bg-brand-200/40 -top-10 -right-20 animate-blob" />
      <div className="blob w-[280px] h-[280px] bg-accent-200/40 bottom-20 -left-20 animate-blob" style={{ animationDelay: '5s' }} />

      <div className="container-x relative">
        <Reveal as="header" className="max-w-2xl mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink-900">{t('nav.destinations')}</h1>
          <p className="mt-3 text-slate-600">{t('sections.destinations.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <Reveal key={d.id} variant="zoom" delay={(i % 6) * 90} threshold={0.1}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
