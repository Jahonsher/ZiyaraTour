import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import destinations from '../data/destinations.json'
import tours from '../data/tours.json'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
export default function Destinations() {
  const { lang, t, localize } = useI18n()
  const c = experience[lang]
  return <section className="destinations-section"><div className="container-x"><Reveal className="section-heading"><div><span className="section-eyebrow">{t('sections.destinations.eyebrow')}</span><h2 className="section-title">{c.destinationTitle}</h2><p>{c.destinationIntro}</p></div><Icon name="compass" size={52} /></Reveal><div className="destination-grid">{destinations.slice(0, 4).map((destination, i) => <Reveal key={destination.id} delay={i * 70}><Link className="destination-tile" to={`/tours?destination=${destination.id}`}><Img src={destination.image} alt={localize(destination.name)} className="destination-image" /><span className="destination-index">0{i + 1}</span><div className="destination-caption"><small>{tours.filter(tour => tour.destinations.includes(destination.id)).length} {t('destinations.toursCount')}</small><h3>{localize(destination.name)}</h3><span className="destination-arrow"><Icon /></span></div></Link></Reveal>)}</div></div></section>
}
