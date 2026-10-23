import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import Img from './Img.jsx'

export default function DestinationCard({ destination: d }) {
  const { t, localize } = useI18n()
  const name = localize(d.name)
  const landmark = localize(d.landmark)

  return (
    <article>
      <Link
        to={d.tours > 0 ? `/tours?destination=${d.id}` : '/contact'}
        className="img-reveal relative rounded-3xl overflow-hidden group aspect-[4/5] sm:aspect-[4/3] shadow-card block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      >
        <Img
          src={d.image}
          alt={landmark ? `${name} — ${landmark}` : name}
          label={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[900ms]"
          style={{ objectPosition: d.imagePosition || 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-brand-500/20 via-transparent to-accent-500/20" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
          {d.tours > 0 && <div className="text-xs uppercase tracking-widest text-white/75 mb-1">{d.tours} {t('destinations.toursCount')}</div>}
          <h3 className="font-display font-bold text-xl sm:text-2xl">{name}</h3>
          {landmark && <p className="mt-1 text-sm text-white/90">{landmark}</p>}
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
            {t(d.tours > 0 ? 'destinations.explore' : 'destinations.enquire')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </Link>
      {d.imageCredit && (
        <p className="mt-2 px-1 text-[11px] leading-relaxed text-slate-500">
          <a href={d.imageCredit.source} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-700">© {d.imageCredit.author}</a>
          {' · '}<a href={d.imageCredit.licenseUrl} target="_blank" rel="noreferrer" className="hover:underline">{d.imageCredit.license}</a>
        </p>
      )}
    </article>
  )
}
