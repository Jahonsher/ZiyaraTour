import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import CTA from '../components/CTA.jsx'
import Testimonials from '../components/Testimonials.jsx'

export default function About() {
  const { t } = useI18n()
  return (
    <div className="pt-28 sm:pt-32">
      <section className="container-x pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="section-eyebrow">{t('about.eyebrow')}</div>
            <h1 className="mt-2 font-display font-bold text-4xl sm:text-5xl text-ink-900 leading-tight">
              {t('about.title')}
            </h1>
            <p className="mt-6 text-slate-700 leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-slate-700 leading-relaxed">{t('about.p2')}</p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {site.stats.map((s) => (
                <div key={s.value} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <div className="font-display font-extrabold text-2xl text-ink-900">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">{t(s.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-card">
              <img
                src="/images/tours/silk-road.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl overflow-hidden shadow-card hidden sm:block">
              <img
                src="/images/tours/middle-ages.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="section-eyebrow">{t('about.partnersTitle')}</div>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-ink-900">
            {t('about.partnersTitle')}
          </h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            <div className="flex items-center justify-center bg-white border border-slate-100 rounded-2xl p-6 shadow-card h-32">
              <img
                src="/images/iiau-partner.png"
                alt="IICAS"
                className="max-h-20 w-auto object-contain"
              />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center bg-white border border-slate-100 rounded-2xl p-6 shadow-card h-32"
              >
                <img
                  src={`/images/partners/partner-${i}.jpg`}
                  alt={`Partner ${i}`}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </div>
  )
}
