import { useI18n } from '../i18n/I18nContext.jsx'
import CTA from '../components/CTA.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'
import site from '../data/site.json'

const team = [
  { name: 'Kamalova Makhsuda', image: 'kamalova-makhsuda.jpg', role: 'ceo', width: 1065, height: 1280 },
  { name: 'Yunusova Shahzoda', image: 'yunusova-shahzoda.jpg', role: 'headManager', width: 1065, height: 1280 },
  { name: 'Esonboyev Bakhodir', image: 'esonboyev-bakhodir.jpg', role: 'manager', width: 1024, height: 1280 },
]

function SectionTitle({ eyebrow, title }) {
  return <div className="max-w-3xl mb-8"><div className="section-eyebrow">{eyebrow}</div><h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-ink-900 leading-tight">{title}</h2></div>
}

export default function About() {
  const { t } = useI18n()
  const content = t('aboutProfile')
  return (
    <div className="pt-28 sm:pt-32">
      <section className="relative container-x pb-16 overflow-hidden">
        <div className="blob w-[300px] h-[300px] bg-brand-200/40 -top-10 -left-24 animate-blob" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal variant="right">
            <div className="section-eyebrow">{content.eyebrow}</div>
            <h1 className="mt-2 font-display font-bold text-4xl sm:text-5xl text-ink-900 leading-tight">ZIYARA TOUR</h1>
            <p className="mt-4 text-xl font-display font-semibold text-brand-700">{content.tagline}</p>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">{content.intro.map(p => <p key={p}>{p}</p>)}</div>
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-3"><span className="font-display text-3xl font-bold text-brand-700">2018</span><span className="text-sm text-ink-900">{content.since}</span></div>
          </Reveal>
          <Reveal variant="left" delay={150}>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-card"><Img src="/images/destinations/bukhara.webp" alt={t('about.imageBukhara')} width={2400} height={1480} className="w-full h-full object-cover" /></div>
          </Reveal>
        </div>
      </section>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow={content.teamEyebrow} title={content.teamTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => <Reveal key={member.role} delay={i * 100}>
              <article className="h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
                <Img src={`/images/team/${member.image}`} alt={member.name} width={member.width} height={member.height} className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-6"><h3 className="font-display font-bold text-xl text-ink-900">{member.name}</h3><p className="mt-2 text-brand-700 font-medium">{content.roles[member.role]}</p></div>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>
      <section className="container-x py-16 sm:py-20">
        <SectionTitle eyebrow={content.servicesEyebrow} title={content.servicesTitle} />
        <div className="grid gap-5 md:grid-cols-2">
          {content.services.map((service, i) => <Reveal key={service.title} delay={i * 60}>
            <article className="h-full rounded-3xl border border-slate-200 p-6 sm:p-8"><span className="text-sm font-semibold tracking-widest text-brand-600">0{i + 1}</span><h3 className="mt-3 font-display text-xl font-bold text-ink-900">{service.title}</h3><p className="mt-3 leading-relaxed text-slate-600">{service.text}</p></article>
          </Reveal>)}
        </div>
      </section>
      <section className="bg-ink-900 py-16 sm:py-20 text-white">
        <div className="container-x">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">MICE & Business Travel</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">{content.projectsTitle}</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-slate-300">{content.projectsIntro}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{content.projects.map(project => <article key={project.title} className="rounded-2xl border border-white/15 bg-white/5 p-6"><h3 className="font-display text-xl font-bold">{project.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{project.text}</p></article>)}</div>
          <p className="mt-8 max-w-4xl leading-relaxed text-slate-300">{content.projectsOutro}</p>
        </div>
      </section>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-x"><SectionTitle eyebrow={content.strengthsEyebrow} title={content.strengthsTitle} /><ul className="grid gap-5 md:grid-cols-2">{content.strengths.map(text => <li key={text} className="flex items-start gap-3 text-slate-700 leading-relaxed"><span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white text-sm">✓</span><span>{text}</span></li>)}</ul></div>
      </section>
      <section className="container-x py-16 sm:py-20">
        <SectionTitle eyebrow={content.missionEyebrow} title="Connecting Cultures. Inspiring Journeys. Building Partnerships." />
        <div className="max-w-4xl space-y-4 text-slate-700 leading-relaxed">{content.mission.map(p => <p key={p}>{p}</p>)}</div>
        <div className="mt-10 rounded-3xl border border-slate-200 p-6 sm:p-8">
          <p className="font-display font-bold text-xl text-ink-900">ZIYARA TOUR — Your Faithful Discovery</p>
          <p className="mt-3 text-slate-600">DMC | Inbound & Outbound Tourism | Ziyarat Tours | MICE | Business Travel</p>
          <p className="mt-4 text-sm text-slate-600">GOLDEN PATH LACORE MChJ · {content.location}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-brand-700 font-semibold">
            <a className="hover:underline" href="https://www.ziyaratour.uz" target="_blank" rel="noopener noreferrer">www.ziyaratour.uz</a>
            <a className="hover:underline" href="https://www.instagram.com/ziyaratour.uz/" target="_blank" rel="noopener noreferrer">@ziyaratour.uz</a>
            {[site.contact.phone, site.contact.phone2].map(phone => <a key={phone} className="hover:underline" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>)}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </div>
  )
}
