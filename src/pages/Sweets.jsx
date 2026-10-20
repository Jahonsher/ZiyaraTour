import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Sweets() {
  const { t } = useI18n()
  return (
    <div className="pt-32 sm:pt-40 pb-8">
      <section className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-eyebrow">{t('sweets.eyebrow')}</div>
          <h1 className="section-title mt-3">{t('sweets.title')}</h1>
          <p className="mt-4 text-slate-500 leading-relaxed">{t('sweets.subtitle')}</p>
        </div>

        <div className="relative isolate overflow-hidden mt-10 sm:mt-14 max-w-3xl mx-auto rounded-[2rem] border border-orange-100 bg-gradient-to-b from-orange-50/70 via-white to-white px-6 py-14 sm:py-20 text-center">
          <div aria-hidden="true" className="absolute -top-20 -right-20 -z-10 w-64 h-64 rounded-full bg-orange-100/50 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-20 -z-10 w-64 h-64 rounded-full bg-brand-100/30 blur-3xl" />
          <div aria-hidden="true" className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_8px_40px_rgba(249,115,22,0.09)] ring-1 ring-orange-100">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="m18 25-9-5 3 12-3 12 9-5m28-14 9-5-3 12 3 12-9-5" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" strokeLinejoin="round" />
              <rect x="17" y="19" width="30" height="26" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
              <path d="m26 21-5 17m15-17-8 22m15-18-6 18" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" />
              <path d="M47 7v6m-3-3h6M14 52v5m-2.5-2.5h5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
              <circle cx="51" cy="50" r="2" fill="#c7d2fe" />
              <circle cx="14" cy="13" r="2" fill="#fed7aa" />
            </svg>
          </div>
          <span className="inline-flex mt-7 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">{t('sweets.badge')}</span>
          <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-ink-900">{t('sweets.emptyTitle')}</h2>
          <p className="mt-3 mx-auto max-w-md text-sm sm:text-base leading-relaxed text-slate-500">{t('sweets.emptyText')}</p>
          <Link to="/" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors">
            <span aria-hidden="true">←</span>{t('sweets.back')}
          </Link>
        </div>
      </section>
    </div>
  )
}
