import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const NAV = [
  { to: '/',            key: 'nav.home' },
  { to: '/tours',       key: 'nav.tours' },
  { to: '/destinations', key: 'nav.destinations' },
  { to: '/about',       key: 'nav.about' },
  { to: '/contact',     key: 'nav.contact' },
]

export default function Header({ transparent = false }) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [loc.pathname])

  const solid = !transparent || scrolled
  const headerClass = solid
    ? 'bg-white/95 backdrop-blur border-b border-slate-100 text-ink-800'
    : 'bg-transparent text-white'
  const linkClass = solid
    ? 'text-ink-700 hover:text-brand-700'
    : 'text-white/85 hover:text-white'

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition ${headerClass}`}>
      {/* top strip with phone */}
      <div className={`hidden md:block text-xs ${solid ? 'bg-ink-900 text-white/80' : 'bg-black/30 text-white/80 backdrop-blur'}`}>
        <div className="container-x flex justify-between items-center h-8">
          <div className="flex gap-4">
            <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="hover:text-white inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>
              {site.contact.phone}
            </a>
            <a href={`tel:${site.contact.phone2.replace(/\s/g, '')}`} className="hover:text-white hidden lg:inline">
              {site.contact.phone2}
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-white hidden lg:inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={site.contact.telegram} target="_blank" rel="noreferrer" className="hover:text-white">Telegram</a>
            <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>

      <div className="container-x flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl group">
          <img src={site.logo} alt="ZiyaraTour" className="w-10 h-10 rounded-xl object-contain bg-white p-1 shadow-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          <span className={solid ? 'text-ink-900' : 'text-white'}>ZiyaraTour</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-full text-sm font-semibold transition ${linkClass} ${
                  isActive ? (solid ? 'text-brand-700' : 'text-white') : ''
                } after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                }`
              }>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant={solid ? 'light' : 'dark'} />
          <Link to="/book" className="hidden sm:inline-flex btn-primary btn-shine !py-2.5 !px-5 text-sm hover:scale-105 transition-transform">
            {t('nav.book')}
          </Link>
          <button className={`lg:hidden p-2 rounded-lg ${solid ? 'text-ink-800' : 'text-white'}`}
            onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (<><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>) : (<><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>)}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="container-x py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg font-semibold ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-800'}`
                }>
                {t(item.key)}
              </NavLink>
            ))}
            <Link to="/book" className="btn-primary mt-2 justify-center">{t('nav.book')}</Link>
            <div className="pt-3 mt-2 border-t border-slate-100 text-sm text-slate-600 space-y-1">
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="block">{site.contact.phone}</a>
              <a href={`tel:${site.contact.phone2.replace(/\s/g, '')}`} className="block">{site.contact.phone2}</a>
              <a href={`mailto:${site.contact.email}`} className="block">{site.contact.email}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
