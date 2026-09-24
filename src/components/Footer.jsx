import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'

export default function Footer() {
  const { t, localize } = useI18n()

  return (
    <footer className="bg-ink-900 text-white/85 mt-16">
      <div className="container-x py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-white">
            <img src={site.logo} alt="ZiyaraTour" className="w-10 h-10 rounded-xl bg-white p-1 object-contain" />
            ZiyaraTour
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{t('footer.tagline')}</p>
          <p className="mt-4 text-sm text-white/60">{localize(site.contact.address)}</p>
          <div className="mt-4 space-y-1 text-sm text-white/70">
            <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="block hover:text-white">{site.contact.phone}</a>
            <a href={`tel:${site.contact.phone2.replace(/\s/g, '')}`} className="block hover:text-white">{site.contact.phone2}</a>
            <a href={`mailto:${site.contact.email}`} className="block hover:text-white">{site.contact.email}</a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{t('footer.explore')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tours" className="hover:text-white transition">{t('nav.tours')}</Link></li>
            <li><Link to="/destinations" className="hover:text-white transition">{t('nav.destinations')}</Link></li>
            <li><Link to="/book" className="hover:text-white transition">{t('nav.book')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{t('footer.company')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">{t('nav.about')}</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">{t('nav.contact')}</Link></li>
          </ul>
          {site.partners && site.partners.length > 0 && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Partners</div>
              <div className="flex gap-3 flex-wrap items-center">
                {site.partners.map((p) => (
                  <a key={p.id} href={p.url} target="_blank" rel="noreferrer"
                    className="bg-white/95 rounded-lg p-2 hover:bg-white transition" title={p.name}>
                    <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{t('footer.follow')}</h4>
          <div className="flex gap-3">
            <a href={site.contact.telegram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.036 15.803l-.363 5.116c.52 0 .746-.223 1.017-.492l2.44-2.33 5.06 3.703c.928.51 1.586.242 1.836-.86l3.328-15.578h.001c.293-1.377-.498-1.914-1.4-1.58L1.02 9.34c-1.34.51-1.32 1.25-.228 1.582l4.876 1.52 11.323-7.13c.533-.36 1.02-.16.62.2z"/></svg>
            </a>
            <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-500 flex items-center justify-center transition" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.9 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.3-1.7 4.9-5 5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.9-1.7-5-5-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.3 1.7-4.9 5-5 1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.5a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
            </a>
            <a href={site.contact.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7v-2.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8h3.2z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} ZiyaraTour.uz | {t('footer.rights')}</p>
          <p>{t('footer.made')}</p>
        </div>
      </div>
    </footer>
  )
}
