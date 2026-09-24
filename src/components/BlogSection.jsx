import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'

export default function BlogSection() {
  const { t, localize } = useI18n()
  const posts = site.blog || []
  if (posts.length === 0) return null

  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="section-eyebrow">{t('blog.eyebrow')}</div>
            <h2 className="section-title mt-2">{t('blog.title')}</h2>
            <p className="mt-3 text-slate-600 max-w-2xl">{t('blog.subtitle')}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.id} variant="up" delay={i * 120}>
            <article className="card group flex flex-col tilt-hover h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Img src={p.image} alt={localize(p.title)} label={localize(p.title)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[900ms]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-3 left-3 chip bg-white/95 text-brand-800 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {localize(p.category)}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{p.readMin} {t('blog.min')}</span>
                </div>
                <h3 className="mt-3 font-display font-bold text-lg text-ink-900 group-hover:text-brand-700 transition line-clamp-2">
                  {localize(p.title)}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{localize(p.excerpt)}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                      {p.author.charAt(0)}
                    </div>
                    <span>{p.author}</span>
                  </div>
                  <span className="text-brand-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('blog.readMore')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
