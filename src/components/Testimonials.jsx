import { useId, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import testimonials from '../data/testimonials.json'
import Reveal from './Reveal.jsx'

export default function Testimonials({ showAll = false, headingLevel: Heading = 'h2' }) {
  const { t, localize } = useI18n()
  const [expanded, setExpanded] = useState(showAll)
  const gridId = useId()
  const sectionRef = useRef(null)
  const visible = expanded ? testimonials : testimonials.slice(0, 3)

  function toggleReviews() {
    if (expanded) sectionRef.current?.scrollIntoView({ block: 'start' })
    setExpanded((value) => !value)
  }

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 scroll-mt-24" data-testid="testimonials">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <div className="section-eyebrow">{t('sections.testimonials.eyebrow')}</div>
          <Heading className="section-title mt-2">{t('sections.testimonials.title')}</Heading>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-relaxed">
            {t('sections.testimonials.subtitle')}
          </p>
        </Reveal>

        <div id={gridId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((review, index) => (
            <Reveal key={review.id} delay={(index % 3) * 100}>
              <figure className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-pop hover:border-brand-200">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="chip bg-brand-50 text-brand-700">
                    {t('sections.testimonials.guestReview')}
                  </span>
                  <svg aria-hidden="true" className="text-accent-500/40 shrink-0" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 5h7v7a7 7 0 0 1-7 7v-3a4 4 0 0 0 4-4H4V5zm10 0h7v7a7 7 0 0 1-7 7v-3a4 4 0 0 0 4-4h-4V5z" />
                  </svg>
                </div>
                <blockquote className="text-slate-700 leading-relaxed flex-1">
                  <p>{localize(review.text)}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                  <span aria-hidden="true" className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-ink-900 text-sm break-words">{localize(review.name)}</div>
                    <div className="mt-1 text-xs text-slate-500 leading-relaxed">{localize(review.context)}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button type="button" className="btn-secondary" aria-expanded={expanded} aria-controls={gridId} onClick={toggleReviews}>
            {t(expanded ? 'sections.testimonials.showLess' : 'sections.testimonials.showAll')}
            <span aria-hidden="true" className="text-brand-500 text-xs">{expanded ? '−' : `+${testimonials.length - 3}`}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
