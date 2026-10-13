import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function LanguageSwitcher({ variant = 'light' }) {
  const { lang, setLang, langs } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = langs.find((l) => l.code === lang) || langs[0]

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const trigger =
    variant === 'dark'
      ? 'text-white/90 hover:text-white'
      : 'text-ink-800 hover:text-brand-700'

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition ${trigger}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">🌐</span>
        <span>{current.short}</span>
        <svg className={`w-3 h-3 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-card border border-slate-100 py-1 z-50 animate-fade-up"
        >
          {langs.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-brand-50 ${
                  l.code === lang ? 'text-brand-700 font-semibold' : 'text-ink-800'
                }`}
              >
                <span>{l.label}</span>
                <span className="text-xs text-slate-400">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
