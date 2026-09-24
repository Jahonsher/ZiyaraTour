import { useI18n } from '../i18n/I18nContext.jsx'
import Reveal from './Reveal.jsx'

const SERVICES = [
  { key: 'tours',     icon: 'route' },
  { key: 'hotels',    icon: 'bed' },
  { key: 'visa',      icon: 'passport' },
  { key: 'transport', icon: 'car' },
  { key: 'flights',   icon: 'plane' },
  { key: 'guides',    icon: 'compass' },
]

const ICONS = {
  route: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15"/><circle cx="18" cy="5" r="3"/></svg>
  ),
  bed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17V7"/><path d="M22 17v-4a4 4 0 00-4-4H6"/><path d="M2 17h20"/><path d="M2 20v-3"/><path d="M22 20v-3"/><circle cx="7" cy="12" r="2"/></svg>
  ),
  passport: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 18h8"/></svg>
  ),
  car: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14l-1.5-6h-11L5 17z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 11l1-3h12l1 3"/></svg>
  ),
  plane: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.1L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.1.3l.7-.4c.4-.2.6-.6.5-1.1z"/></svg>
  ),
  compass: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
}

export default function Services() {
  const { t } = useI18n()
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <div className="section-eyebrow">{t('sections.services.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('sections.services.title')}</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{t('sections.services.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} variant="up" delay={i * 90}>
              <div className="relative p-6 bg-white rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-pop transition-all duration-500 hover:-translate-y-2 group overflow-hidden h-full">
                <div className="pointer-events-none absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-brand-50 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    {ICONS[s.icon]}
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg text-ink-900 group-hover:text-brand-700 transition-colors">
                    {t(`services.${s.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {t(`services.${s.key}.text`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
