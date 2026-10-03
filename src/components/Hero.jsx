import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import Icon from './Icon.jsx'
import Tilt from './Tilt.jsx'
import TravelGlobe from './TravelGlobe.jsx'

export default function Hero() {
  const { lang } = useI18n()
  const c = experience[lang]
  return <section className="journey-hero">
    <div className="hero-contour" aria-hidden="true" />
    <div className="container-x hero-layout">
      <div className="hero-copy">
        <div className="eyebrow-pill"><span />{c.eyebrow}</div>
        <h1>{c.title}<br /><span className="hero-emphasis">{c.highlight}<svg viewBox="0 0 380 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13Q180-5 377 8M36 17Q203 6 339 14" /></svg></span><br />{c.ending}</h1>
        <p className="hero-intro">{c.intro}</p>
        <div className="hero-actions"><a href="#plan" className="btn-primary">{c.consult}<Icon /></a><Link to="/tours" className="hero-text-link">{c.explore}<Icon size={18} /></Link></div>
        <p className="hero-note"><Icon name="check" size={15} />{c.note}</p>
        <div className="hero-trust"><span><Icon name="globe" />{c.local}</span><span><Icon name="shield" />{c.personal}</span></div>
      </div>
      <div className="hero-art">
        <div className="hero-orbit" aria-hidden="true" />
        <Tilt className="hero-photo-stage">
          <div className="hero-photo"><img src="/images/hero-bg.jpg" alt={c.postcardSub} fetchPriority="high" width="1600" height="770" /><div className="hero-photo-shade" /><div className="hero-photo-caption"><span>UZBEKISTAN / CENTRAL ASIA</span><strong>{c.postcard}</strong><p>{c.postcardSub}</p></div></div>
          <div className="floating-ticket"><span className="ticket-icon"><Icon name="plane" size={23} /></span><div><small>{c.discover}</small><strong>{c.route}</strong></div><span className="ticket-dot" /></div>
        </Tilt>
        <div className="hero-stamp" aria-hidden="true"><Icon name="compass" size={32} /><span>EXPLORE<br />UZBEKISTAN</span></div>
        <TravelGlobe />
        <span className="hero-coordinate" aria-hidden="true">41°18′ N &nbsp; 69°16′ E</span>
      </div>
    </div>
    <div className="container-x"><div className="hero-bottom"><span>01 / UZBEKISTAN</span><a href="#journeys">{c.scroll}<span>↓</span></a><span className="hidden sm:block">THE ART OF TRAVELLING</span></div></div>
  </section>
}
