import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import Reveal from './Reveal.jsx'

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
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-600/30 blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl animate-blob" style={{ animationDelay: '5s' }} />

      <div className="container-x relative">
        <Reveal className="text-center mb-12">
          <div className="text-accent-400 font-semibold uppercase tracking-widest text-xs">{t('sections.why.eyebrow')}</div>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl">{t('sections.why.title')}</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">{t('sections.why.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.key} variant="up" delay={i * 100}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition-all duration-500 hover:bg-white/10 hover:border-accent-400/40 hover:-translate-y-2 group h-full relative overflow-hidden">
                <div className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full bg-accent-500/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
                <div className="relative">
                  <div className="text-3xl inline-block transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">{f.icon}</div>
                  <h3 className="mt-3 font-display font-bold text-lg group-hover:text-accent-300 transition-colors">{t(`why.${f.key}.title`)}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{t(`why.${f.key}.text`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {site.stats.map((s, i) => (
            <Reveal key={s.value} variant="zoom" delay={i * 100}>
              <div className="font-display font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{t(s.labelKey)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
