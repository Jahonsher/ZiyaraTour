import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import site from '../data/site.json'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import Icon from './Icon.jsx'

const NAV = [['/', 'nav.home'], ['/tours', 'nav.tours'], ['/destinations', 'nav.destinations'], ['/about', 'nav.about'], ['/contact', 'nav.contact']]
export default function Header() {
  const { t, lang } = useI18n()
  const c = experience[lang]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const toggle = useRef(null)
  useEffect(() => { setOpen(false) }, [location.pathname, location.search])
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 12)
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  useEffect(() => {
    function escape(e) { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() } }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container-x header-inner">
      <Link to="/" className="brand-lockup"><span className="brand-icon"><Icon name="compass" size={27} /></span><span>Ziyara<span>Tour</span><small>TRAVEL WITH A STORY</small></span></Link>
      <nav className="desktop-nav" aria-label={c.menu}>{NAV.map(([to, key]) => <NavLink key={to} to={to} end={to === '/'}>{t(key)}</NavLink>)}</nav>
      <div className="header-actions"><LanguageSwitcher /><Link to="/book" className="header-cta">{c.submit}<Icon size={16} /></Link><button ref={toggle} className="menu-toggle" aria-label={c.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={24} /></button></div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav container-x" aria-label={c.menu}>{NAV.map(([to, key]) => <NavLink key={to} to={to} end={to === '/'}>{t(key)}</NavLink>)}<Link to="/book" className="btn-primary">{c.consult}<Icon /></Link><a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>{site.contact.phone}</a></nav>}
  </header>
}
