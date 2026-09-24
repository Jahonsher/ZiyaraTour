import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import BookingForm from '../components/BookingForm.jsx'
import site from '../data/site.json'

export default function Book() {
  const { t, localize } = useI18n()
  const [params] = useSearchParams()
  const preselect = params.get('tour') || ''

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container-x">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-card border border-slate-100 p-6 sm:p-10">
            <div className="section-eyebrow">{t('nav.book')}</div>
            <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-ink-900">{t('book.title')}</h1>
            <p className="mt-3 text-slate-600">{t('book.subtitle')}</p>

            <div className="mt-8">
              <BookingForm preselect={preselect} />
            </div>
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl bg-ink-900 text-white p-6 sm:p-8">
              <h3 className="font-display font-bold text-xl">{t('contact.title')}</h3>
              <p className="mt-2 text-white/70 text-sm">{t('contact.subtitle')}</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">📞</span>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.phone')}</div>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="font-semibold">
                      {site.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">✉️</span>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.email')}</div>
                    <a href={`mailto:${site.contact.email}`} className="font-semibold">
                      {site.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">📍</span>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-widest">{t('contact.address')}</div>
                    <div className="font-semibold">{localize(site.contact.address)}</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <a href={site.contact.telegram} target="_blank" rel="noreferrer"
                  className="btn bg-accent-500 hover:bg-accent-600 text-white w-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 15.8l-.4 5.1c.6 0 .8-.2 1.1-.5l2.4-2.3 5 3.7c1 .5 1.6.3 1.9-.9l3.3-15.5c.3-1.4-.5-1.9-1.4-1.6L1 9.3c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5L17 5.3c.5-.4 1-.2.6.2z"/></svg>
                  Telegram
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
