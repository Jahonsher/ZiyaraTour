import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import Reveal from './Reveal.jsx'

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5 text-accent-500">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t, localize } = useI18n()

  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <div className="section-eyebrow">{t('sections.testimonials.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('sections.testimonials.title')}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {site.testimonials.map((tst, i) => (
            <Reveal key={tst.id} variant={i % 2 === 0 ? 'up' : 'down'} delay={i * 130}>
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-pop hover:border-brand-200 group h-full">
                <svg className="absolute -top-3 left-6 text-brand-600 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7H5a3 3 0 00-3 3v4a3 3 0 003 3h1v2a1 1 0 001 1 8 8 0 008-8v-1a4 4 0 00-4-4H9zm11 0h-4a3 3 0 00-3 3v4a3 3 0 003 3h1v2a1 1 0 001 1 8 8 0 008-8v-1a4 4 0 00-4-4h-2z" opacity=".2"/></svg>
                <Stars n={tst.rating} />
                <p className="mt-3 text-slate-700 leading-relaxed">"{localize(tst.text)}"</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img src={tst.avatar} alt={tst.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-500 group-hover:scale-110" />
                  <div>
                    <div className="font-semibold text-ink-900 text-sm">{tst.name}</div>
                    <div className="text-xs text-slate-500">{localize(tst.country)}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
