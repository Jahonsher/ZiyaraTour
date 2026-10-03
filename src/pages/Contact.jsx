import { useI18n } from '../i18n/I18nContext.jsx'
import site from '../data/site.json'
import BookingForm from '../components/BookingForm.jsx'
import Reveal from '../components/Reveal.jsx'
import { experience } from '../data/experience.js'

export default function Contact() {
  const { t, lang, localize } = useI18n()
  const c = experience[lang]
  return (
    <div className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
      <div className="blob w-[320px] h-[320px] bg-brand-200/40 -top-10 -left-20 animate-blob" />
      <div className="blob w-[260px] h-[260px] bg-accent-200/40 top-1/2 -right-20 animate-blob" style={{ animationDelay: '5s' }} />

      <div className="container-x relative">
        <Reveal as="header" className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-eyebrow">{t('contact.eyebrow')}</div>
          <h1 className="mt-2 font-display font-bold text-4xl sm:text-5xl text-ink-900">
            {t('contact.title')}
          </h1>
          <p className="mt-3 text-slate-600">{t('contact.subtitle')}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <Reveal variant="up" delay={0}>
            <ContactCard icon="📞" title={t('contact.phone')} value={site.contact.phone}
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`} />
          </Reveal>
          <Reveal variant="up" delay={100}>
            <ContactCard icon="✉️" title={t('contact.email')} value={site.contact.email}
              href={`mailto:${site.contact.email}`} />
          </Reveal>
          <Reveal variant="up" delay={200}>
            <ContactCard icon="📍" title={t('contact.address')} value={localize(site.contact.address)} />
          </Reveal>
        </div>

        <Reveal variant="up" delay={100}>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-card border border-slate-100 p-6 sm:p-10 hover:shadow-pop transition-shadow">
            <h2 className="font-display font-bold text-2xl text-ink-900">{c.leadHeading}</h2>
            <p className="mt-2 text-slate-600">{c.leadSubtitle}</p>
            <div className="mt-6">
              <BookingForm />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex justify-center gap-3" delay={200}>
          <a href={site.contact.telegram} target="_blank" rel="noreferrer"
            className="w-11 h-11 rounded-full bg-brand-100 text-brand-700 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 15.8l-.4 5.1c.6 0 .8-.2 1.1-.5l2.4-2.3 5 3.7c1 .5 1.6.3 1.9-.9l3.3-15.5c.3-1.4-.5-1.9-1.4-1.6L1 9.3c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5L17 5.3c.5-.4 1-.2.6.2z"/></svg>
          </a>
          <a href={site.contact.instagram} target="_blank" rel="noreferrer"
            className="w-11 h-11 rounded-full bg-accent-100 text-accent-700 hover:bg-accent-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.9 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.3-1.7 4.9-5 5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.9-1.7-5-5-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.3 1.7-4.9 5-5 1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.5a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
          </a>
        </Reveal>
      </div>
    </div>
  )
}

function ContactCard({ icon, title, value, href }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag href={href} className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-card hover:border-brand-300 hover:shadow-pop hover:-translate-y-2 transition-all duration-500 block group h-full">
      <div className="text-3xl inline-block transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">{icon}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-slate-500 font-semibold">{title}</div>
      <div className="mt-1 font-semibold text-ink-900 break-words group-hover:text-brand-700 transition-colors">{value}</div>
    </Tag>
  )
}
