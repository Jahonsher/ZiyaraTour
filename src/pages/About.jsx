import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import CTA from '../components/CTA.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Reveal from '../components/Reveal.jsx'

export default function About() {
  const { t } = useI18n()
  return (
    <div className="pt-28 sm:pt-32">
      <section className="relative container-x pb-16 overflow-hidden">
        <div className="blob w-[300px] h-[300px] bg-brand-200/40 -top-10 -left-24 animate-blob" />
        <div className="blob w-[260px] h-[260px] bg-accent-200/40 top-40 -right-16 animate-blob" style={{ animationDelay: '4s' }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal variant="right">
            <div className="section-eyebrow">{t('about.eyebrow')}</div>
            <h1 className="mt-2 font-display font-bold text-4xl sm:text-5xl text-ink-900 leading-tight">
              {t('about.title')}
            </h1>
            <p className="mt-6 text-slate-700 leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-slate-700 leading-relaxed">{t('about.p2')}</p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {site.stats.map((s, i) => (
                <Reveal key={s.value} variant="up" delay={i * 100}>
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-card hover:border-brand-200 group">
                    <div className="font-display font-extrabold text-2xl text-ink-900 group-hover:text-brand-700 transition-colors">{s.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">{t(s.labelKey)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal variant="left" delay={150}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-card group">
                <img
                  src="/images/tours/silk-road.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl overflow-hidden shadow-pop hidden sm:block animate-float ring-4 ring-white">
                <img
                  src="/images/tours/middle-ages.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 relative">
          <Reveal>
            <div className="section-eyebrow">{t('about.partnersTitle')}</div>
            <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-ink-900">
              {t('about.partnersTitle')}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            <Reveal variant="zoom" delay={0}>
              <div className="flex items-center justify-center bg-white border border-slate-100 rounded-2xl p-6 shadow-card h-32 transition-all duration-500 hover:-translate-y-2 hover:shadow-pop hover:border-brand-200 group">
                <img
                  src="/images/iiau-partner.png"
                  alt="IICAS"
                  className="max-h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Reveal>
            {[1, 2, 3, 4].map((i) => (
              <Reveal key={i} variant="zoom" delay={i * 90}>
                <div className="flex items-center justify-center bg-white border border-slate-100 rounded-2xl p-6 shadow-card h-32 transition-all duration-500 hover:-translate-y-2 hover:shadow-pop hover:border-brand-200 group">
                  <img
                    src={`/images/partners/partner-${i}.jpg`}
                    alt={`Partner ${i}`}
                    className="max-h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </div>
  )
}
