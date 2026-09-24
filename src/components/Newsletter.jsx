import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import Reveal from './Reveal.jsx'

export default function Newsletter() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ kind: 'idle', msg: '' })

  function submit(e) {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) {
      setState({ kind: 'error', msg: t('newsletter.invalid') })
      return
    }
    setState({ kind: 'success', msg: t('newsletter.success') })
    setEmail('')
  }

  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
       <Reveal variant="up">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white p-8 sm:p-14">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-brand-600/30 blur-3xl animate-blob" />
          <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl animate-blob" style={{ animationDelay: '5s' }} />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="chip bg-white/10 text-white border border-white/15 backdrop-blur">
                <span className="inline-block animate-bounce-soft">✉️</span> {t('newsletter.eyebrow')}
              </span>
              <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl">
                {t('newsletter.title')}
              </h2>
              <p className="mt-3 text-white/70 max-w-md">{t('newsletter.subtitle')}</p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3 md:justify-self-end w-full md:max-w-md">
              <div className="flex gap-2 bg-white rounded-full p-1.5 shadow-pop focus-within:ring-4 focus-within:ring-accent-400/30 transition-all">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 bg-transparent px-4 py-2.5 text-ink-800 placeholder:text-slate-400 focus:outline-none"
                />
                <button type="submit" className="btn-primary btn-shine !py-2.5 !px-5 whitespace-nowrap">
                  {t('newsletter.cta')}
                </button>
              </div>
              {state.kind === 'success' && (
                <p className="text-emerald-300 text-sm animate-fade-up">✓ {state.msg}</p>
              )}
              {state.kind === 'error' && (
                <p className="text-rose-300 text-sm animate-fade-up">✕ {state.msg}</p>
              )}
            </form>
          </div>
        </div>
       </Reveal>
      </div>
    </section>
  )
}
