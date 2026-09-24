import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import BookingForm from '../components/BookingForm.jsx'
import site from '../data/site.json'
import Reveal from '../components/Reveal.jsx'

export default function Book() {
  const { t, localize } = useI18n()
  const [params] = useSearchParams()
  const preselect = params.get('tour') || ''

  return (
    <div className="relative pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen overflow-hidden">
      <div className="blob w-[360px] h-[360px] bg-brand-200/50 -top-16 -right-24 animate-blob" />
      <div className="blob w-[300px] h-[300px] bg-accent-200/40 bottom-10 -left-20 animate-blob" style={{ animationDelay: '5s' }} />

      <div className="container-x relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal variant="right" className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 sm:p-10 hover:shadow-pop transition-shadow">
              <div className="section-eyebrow">{t('nav.book')}</div>
              <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-ink-900">{t('book.title')}</h1>
              <p className="mt-3 text-slate-600">{t('book.subtitle')}</p>

              <div className="mt-8">
                <BookingForm preselect={preselect} />
              </div>
            </div>
          </Reveal>

          <Reveal variant="left" delay={150} className="lg:col-span-2">
            <aside className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white p-6 sm:p-8">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-600/30 blur-3xl animate-blob" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-500/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
                <div className="relative">
                  <h3 className="font-display font-bold text-xl">{t('contact.title')}</h3>
                  <p className="mt-2 text-white/70 text-sm">{t('contact.subtitle')}</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex gap-3 group">
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent-500 group-hover:scale-110">📞</span>
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.phone')}</div>
                        <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="font-semibold hover:text-accent-300 transition-colors">
                          {site.contact.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3 group">
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent-500 group-hover:scale-110">✉️</span>
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.email')}</div>
                        <a href={`mailto:${site.contact.email}`} className="font-semibold hover:text-accent-300 transition-colors">
                          {site.contact.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3 group">
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent-500 group-hover:scale-110">📍</span>
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.address')}</div>
                        <div className="font-semibold">{localize(site.contact.address)}</div>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <a href={site.contact.telegram} target="_blank" rel="noreferrer"
                      className="btn btn-shine bg-accent-500 hover:bg-accent-600 text-white w-full group">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:-rotate-12"><path d="M9 15.8l-.4 5.1c.6 0 .8-.2 1.1-.5l2.4-2.3 5 3.7c1 .5 1.6.3 1.9-.9l3.3-15.5c.3-1.4-.5-1.9-1.4-1.6L1 9.3c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5L17 5.3c.5-.4 1-.2.6.2z"/></svg>
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
