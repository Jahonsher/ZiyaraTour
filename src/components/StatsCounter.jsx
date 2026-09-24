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
    <section ref={ref} className="py-14 sm:py-20 bg-slate-50">
      <div className="container-x">
        <div className="text-center mb-10">
          <div className="section-eyebrow">{t('counter.eyebrow')}</div>
          <h2 className="section-title mt-2">{t('counter.title')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((it) => (
            <div key={it.labelKey} className="relative bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 text-center shadow-card overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-brand-50" />
              <div className="relative">
                <div className="text-3xl">{it.icon}</div>
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
