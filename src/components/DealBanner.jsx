import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import tours from '../data/tours.json'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'

function useCountdown(days) {
  const [end] = useState(() => Date.now() + days * 24 * 60 * 60 * 1000)
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, end - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff / 3600000) % 24)
  const m = Math.floor((diff / 60000) % 60)
  const s = Math.floor((diff / 1000) % 60)
  return { d, h, m, s }
}

function TimeBox({ v, label }) {
  return (
    <div className="flex flex-col items-center min-w-[62px] rounded-xl bg-white/10 backdrop-blur px-3 py-2 border border-white/15 hover:bg-white/15 hover:border-accent-400/60 transition-all">
      <span key={v} className="font-display font-extrabold text-2xl leading-none tabular-nums animate-fade-up">
        {String(v).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-white/70">{label}</span>
    </div>
  )
}

export default function DealBanner() {
  const { t, localize } = useI18n()
  const deal = site.deal
  const tour = tours.find((tt) => tt.slug === deal.tourSlug)
  const { d, h, m, s } = useCountdown(deal.endsInDays)

  if (!tour) return null

  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
       <Reveal variant="up">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-ink-900 text-white shadow-pop group">
          <div className="absolute inset-0">
            <Img src={deal.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1200ms]" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/70 to-transparent" />
            <div className="blob w-[300px] h-[300px] bg-accent-500/25 -bottom-16 -right-16 animate-blob" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16">
            <div>
              <span className="chip bg-accent-500 text-white uppercase font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {t('deals.eyebrow')}
              </span>
              <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {t('deals.title')}
              </h2>
              <p className="mt-3 text-white/80 text-lg max-w-lg">{t('deals.subtitle')}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-white/60 line-through text-lg">${tour.oldPrice || tour.priceFrom + 200}</span>
                <span className="font-display font-extrabold text-5xl text-accent-400">${tour.priceFrom}</span>
                <span className="chip bg-accent-500 text-white font-bold">−{deal.discountPct}%</span>
              </div>

              <div className="mt-6 flex items-center gap-2 sm:gap-3">
                <TimeBox v={d} label="days" />
                <span className="text-white/40 font-bold">:</span>
                <TimeBox v={h} label="hrs" />
                <span className="text-white/40 font-bold">:</span>
                <TimeBox v={m} label="min" />
                <span className="text-white/40 font-bold">:</span>
                <TimeBox v={s} label="sec" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/book?tour=${tour.slug}`} className="btn-primary btn-shine group">
                  {t('deals.cta')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </Link>
                <Link to={`/tours/${tour.slug}`} className="btn border border-white/40 text-white hover:bg-white/10 hover:border-white transition-all hover:scale-[1.02]">
                  {t('tour.details')}
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-2xl overflow-hidden group/img">
                <Img src={tour.cover} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover/img:scale-110" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-ink-900 rounded-2xl p-4 shadow-pop w-56 animate-float">
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">{t('tour.from')}</div>
                <div className="font-display font-extrabold text-2xl">${tour.priceFrom}</div>
                <div className="text-xs text-slate-500">{tour.duration.days} {t('tour.days')} · {tour.destinations.length} cities</div>
              </div>
            </div>
          </div>
        </div>
       </Reveal>
      </div>
    </section>
  )
}
