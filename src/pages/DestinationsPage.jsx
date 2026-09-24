import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import destinations from '../data/destinations.json'
import Img from '../components/Img.jsx'

export default function DestinationsPage() {
  const { t, localize } = useI18n()
  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="container-x">
        <header className="max-w-2xl mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink-900">{t('nav.destinations')}</h1>
          <p className="mt-3 text-slate-600">{t('sections.destinations.subtitle')}</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {destinations.map((d) => (
            <Link key={d.id} to={`/tours?destination=${d.id}`} className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-card">
              <Img src={d.image} alt={localize(d.name)} label={localize(d.name)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="text-xs uppercase tracking-widest text-white/70">{d.tours} {t('destinations.toursCount')}</div>
                <div className="mt-1 font-display font-bold text-xl sm:text-2xl">{localize(d.name)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
