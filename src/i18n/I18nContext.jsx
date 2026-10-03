import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from '../data/translations/en.json'
import ru from '../data/translations/ru.json'
import uz from '../data/translations/uz.json'
import uzc from '../data/translations/uzc.json'

const dictionaries = { en, ru, uz, uzc }

export const LANGS = [
  { code: 'uz',  label: "O'zbekcha", short: 'UZ', flag: '🇺🇿' },
  { code: 'uzc', label: 'Ўзбекча',   short: 'ЎЗ', flag: '🇺🇿' },
  { code: 'ru',  label: 'Русский',   short: 'RU', flag: '🇷🇺' },
  { code: 'en',  label: 'English',   short: 'EN', flag: '🇬🇧' },
]

const STORAGE_KEY = 'ziyaratour.lang'
const DEFAULT_LANG = 'uz'

const I18nContext = createContext(null)

function resolveInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  let saved
  try { saved = window.localStorage.getItem(STORAGE_KEY) } catch { /* Storage may be disabled. */ }
  if (saved && dictionaries[saved]) return saved
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('en')) return 'en'
  return DEFAULT_LANG
}

function walk(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(resolveInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'uzc' ? 'uz-Cyrl' : lang
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch { /* Language still works without storage. */ }
  }, [lang])

  const setLang = useCallback((code) => {
    if (dictionaries[code]) setLangState(code)
  }, [])

  const t = useCallback(
    (key, fallback = '') => {
      const val = walk(dictionaries[lang], key)
      if (val !== undefined) return val
      const enVal = walk(dictionaries.en, key)
      return enVal !== undefined ? enVal : fallback || key
    },
    [lang],
  )

  const localize = useCallback(
    (obj) => {
      if (obj === null || obj === undefined) return ''
      if (typeof obj === 'string') return obj
      return obj[lang] ?? obj.en ?? obj.ru ?? obj.uz ?? ''
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, localize, langs: LANGS }), [lang, setLang, t, localize])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
