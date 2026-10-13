import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import Reveal from './Reveal.jsx'

export default function Newsletter() {
  const { t } = useI18n()
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white p-8 sm:p-14">
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-brand-600/30 blur-3xl animate-blob" />
            <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl animate-blob" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="chip bg-white/10 text-white border border-white/15">{t('newsletter.eyebrow')}</span>
                <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl">{t('newsletter.title')}</h2>
                <p className="mt-3 text-white/70 max-w-md">{t('newsletter.subtitle')}</p>
              </div>
              <div className="md:justify-self-end flex flex-col gap-3 w-full md:max-w-sm">
                <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="btn-primary btn-shine text-center">{t('newsletter.cta')}</a>
                <a href={site.contact.telegram} target="_blank" rel="noreferrer" className="btn border border-white/30 text-white hover:bg-white/10 text-center">Telegram</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
