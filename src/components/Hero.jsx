import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const HERO_IMG = '/images/hero-bg.jpg'

const CHIPS = ['samarkand', 'bukhara', 'khiva', 'tashkent']

export default function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover kenburns" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/90 via-ink-900/60 to-brand-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.35),transparent_45%)]" />

        {/* Animated gradient blobs */}
        <div className="blob w-[420px] h-[420px] bg-accent-500/40 top-[-80px] left-[-80px] animate-blob" />
        <div className="blob w-[380px] h-[380px] bg-brand-500/40 bottom-[-60px] right-[10%] animate-blob" style={{ animationDelay: '3s' }} />
        <div className="blob w-[300px] h-[300px] bg-fuchsia-500/25 top-[40%] left-[55%] animate-blob" style={{ animationDelay: '6s' }} />
      </div>

      {/* Decorative floating badge — trust element */}
      <div className="hidden lg:block absolute right-8 top-28 z-10 animate-float">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-pop w-56">
          <div className="flex items-center gap-2">
            <div className="flex text-accent-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
              ))}
            </div>
            <span className="text-ink-900 font-bold text-sm">4.9 / 5</span>
          </div>
          <p className="mt-1 text-xs text-ink-700">from 20,000+ happy travellers</p>
        </div>
      </div>

      <div className="relative container-x pt-32 pb-40 sm:pt-40 sm:pb-48 lg:pt-48 lg:pb-56">
        <span className="inline-flex items-center gap-2 chip bg-white/10 backdrop-blur border border-white/20 text-white animate-fade-up" style={{ animationDelay: '0ms' }}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-accent-400 animate-pulse-ring" />
            <span className="relative w-2 h-2 rounded-full bg-accent-400" />
          </span>
          {t('hero.eyebrow')}
        </span>

        <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl max-w-3xl leading-[1.02] animate-fade-up" style={{ animationDelay: '120ms' }}>
          {t('hero.title')}
          <span className="block mt-2">
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient-animated">
                {t('hero.titleHighlight')}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
                <path d="M2 6 Q75 0 150 5 T298 6" stroke="rgb(249,115,22)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 animate-fade-up" style={{ animationDelay: '260ms' }}>
          {t('hero.subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <Link to="/tours" className="btn-primary btn-shine group">
            {t('hero.cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/book" className="btn border border-white/40 text-white hover:bg-white/10 hover:border-white transition-all hover:scale-[1.02]">
            {t('hero.secondary')}
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 animate-fade-up" style={{ animationDelay: '540ms' }}>
          <span className="text-white/60 text-sm mr-1">Trending →</span>
          {CHIPS.map((c, i) => (
            <Link key={c} to={`/tours?destination=${c}`}
              style={{ animationDelay: `${640 + i * 80}ms` }}
              className="chip bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/15 transition-all backdrop-blur hover:-translate-y-0.5 hover:border-accent-400/60 animate-fade-up">
              <span className="w-1 h-1 rounded-full bg-accent-400" />
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </Link>
          ))}
        </div>

        {/* Animated scroll indicator */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/70 animate-bounce-soft">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
