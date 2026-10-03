import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import site from '../data/site.json'
import BookingForm from './BookingForm.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
export default function LeadSection({ standalone = false, preselect = '' }) {
  const { lang } = useI18n()
  const c = experience[lang]
  const Heading = standalone ? 'h1' : 'h2'
  return <section id="plan" className={`lead-section ${standalone ? 'lead-standalone' : ''}`}><div className="container-x"><div className="lead-layout">
    <Reveal className="lead-copy"><span className="section-eyebrow">{c.leadEyebrow}</span><Heading>{c.leadTitle}</Heading><p>{c.leadIntro}</p><div className="lead-benefits">{[c.local, c.personal, c.noPayment].map(text => <span key={text}><Icon name="check" size={18} />{text}</span>)}</div><div className="lead-contact"><span>{c.contactDirect}</span><a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}><Icon name="phone" />{site.contact.phone}</a><a href={site.contact.telegram} target="_blank" rel="noreferrer">Telegram <Icon size={16} /></a></div><div className="lead-decoration" aria-hidden="true"><Icon name="compass" size={125} /><span>YOUR JOURNEY.<br />OUR PASSION.</span></div></Reveal>
    <Reveal className="lead-form-card" delay={100}><div className="form-card-heading"><span className="step-icon"><Icon name="plane" size={22} /></span><div><h2>{c.leadHeading}</h2><p>{c.leadSubtitle}</p></div></div><BookingForm key={preselect} preselect={preselect} /><p className="lead-disclaimer">{c.leadNote}</p></Reveal>
  </div></div></section>
}
