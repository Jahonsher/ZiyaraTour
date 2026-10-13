import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import Img from './Img.jsx'

export default function InstagramClips({ clips = [] }) {
  const { t, localize } = useI18n()
  const [activeCode, setActiveCode] = useState(null)
  if (!clips.length) return null

  return (
    <section data-testid="instagram-clips">
      <div className="section-eyebrow">Instagram · @ziyarattour</div>
      <h2 className="mt-2 font-display font-bold text-2xl text-ink-900">{t('instagram.title')}</h2>
      <p className="mt-3 text-sm text-slate-600">{t('instagram.subtitle')}</p>
      <div className="mt-5 grid sm:grid-cols-2 gap-5">
        {clips.map(clip => (
          <article key={clip.code} className="min-w-0 rounded-2xl border border-slate-100 shadow-card overflow-hidden bg-white">
            <div className={`relative max-h-[600px] bg-slate-50 ${clip.landscape && activeCode !== clip.code ? 'aspect-video' : 'aspect-[9/16]'}`}>
              {activeCode === clip.code ? (
                <iframe
                  src={`https://www.instagram.com/p/${encodeURIComponent(clip.code)}/embed/`}
                  title={localize(clip.title)}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allow="encrypted-media; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button type="button" onClick={() => setActiveCode(clip.code)} className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500" aria-label={`${t('instagram.play')}: ${localize(clip.title)}`}>
                  <Img src={clip.poster} alt={localize(clip.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full bg-white/95 text-brand-700 shadow-pop flex items-center justify-center transition-transform group-hover:scale-110">
                      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7V5z" /></svg>
                    </span>
                  </span>
                  <span className="absolute bottom-5 inset-x-5 text-white text-sm font-semibold">{t('instagram.play')}</span>
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-ink-900 text-sm">{localize(clip.title)}</h3>
              <a href={clip.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-brand-700 font-semibold text-sm hover:text-accent-600">
                {t('instagram.open')} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
