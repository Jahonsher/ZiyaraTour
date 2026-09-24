import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import Reveal from './Reveal.jsx'

export default function CTA() {
  const { t } = useI18n()
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 text-white p-8 sm:p-14 shadow-xl bg-[length:200%_200%] animate-gradient-x">
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-2xl animate-blob" />
            <div className="absolute -left-10 -bottom-20 w-64 h-64 rounded-full bg-black/20 blur-2xl animate-blob" style={{ animationDelay: '4s' }} />
            {/* Rotating decorative ring */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl">{t('sections.cta.title')}</h2>
                <p className="mt-3 text-white/85 text-lg">{t('sections.cta.subtitle')}</p>
              </div>
              <Link to="/book" className="btn btn-shine group bg-white text-brand-800 hover:bg-white !py-4 !px-7 font-bold hover:scale-105 transition-transform">
                {t('sections.cta.btn')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
