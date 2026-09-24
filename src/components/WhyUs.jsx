import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'

const FEATURES = [
  { key: 'local', icon: '🏛️' },
  { key: 'flex',  icon: '🎯' },
  { key: 'safe',  icon: '🛡️' },
  { key: 'value', icon: '💎' },
]

export default function WhyUs() {
  const { t } = useI18n()
  return (
    <section className="py-16 sm:py-24 bg-ink-900 text-white overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="container-x relative">
        <div className="text-center mb-12">
          <div className="text-accent-400 font-semibold uppercase tracking-widest text-xs">{t('sections.why.eyebrow')}</div>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl">{t('sections.why.title')}</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">{t('sections.why.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.key} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-display font-bold text-lg">{t(`why.${f.key}.title`)}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{t(`why.${f.key}.text`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {site.stats.map((s) => (
            <div key={s.value}>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
