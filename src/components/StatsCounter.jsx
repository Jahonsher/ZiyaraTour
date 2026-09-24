import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const ITEMS = [
  { icon: '✈️', num: 20000, suffix: '+', labelKey: 'stats.travellers' },
  { icon: '🗺️', num: 60,    suffix: '+', labelKey: 'stats.tours' },
  { icon: '🌟', num: 4.9,   suffix: '',  labelKey: 'stats.rating' },
  { icon: '🏛️', num: 15,    suffix: '+', labelKey: 'stats.years' },
]

function useInView(ref) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!ref.current || seen) return
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSeen(true),
      { threshold: 0.3 },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, seen])
  return seen
}

function Count({ target, suffix, active }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const isFloat = target % 1 !== 0
    const dur = 1200
    const start = performance.now()
    let raf
    function step(now) {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(isFloat ? +(target * eased).toFixed(1) : Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  const formatted = target >= 1000 ? n.toLocaleString() : n
  return (
    <span>{formatted}{suffix}</span>
  )
}

export default function StatsCounter() {
  const { t } = useI18n()
  const ref = useRef(null)
  const seen = useInView(ref)

  return (
    <section ref={ref} className="relative py-14 sm:py-20 bg-slate-50 overflow-hidden">
      <div className="blob w-[260px] h-[260px] bg-accent-200/40 -top-10 right-1/3 animate-blob" />
      <div className="container-x relative">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="section-eyebrow">{t('counter.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('counter.title')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((it, i) => (
            <div
              key={it.labelKey}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`relative bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 text-center shadow-card overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-pop hover:border-brand-200 group ${
                seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-brand-50 group-hover:bg-accent-100 group-hover:scale-125 transition-all duration-500" />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-50/60 to-transparent" />
              <div className="relative">
                <div className="text-3xl inline-block group-hover:animate-bounce-soft">{it.icon}</div>
                <div className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-ink-900">
                  <Count target={it.num} suffix={it.suffix} active={seen} />
                </div>
                <div className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">
                  {t(it.labelKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
