import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import tours from '../data/tours.json'
import TourCard from './TourCard.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
export default function FeaturedTours() {
  const { lang } = useI18n()
  const c = experience[lang]
  return <section id="journeys" className="featured-section"><div className="container-x"><div className="section-heading"><Reveal><span className="section-eyebrow">{c.toursEyebrow}</span><h2 className="section-title">{c.toursTitle}</h2><p>{c.toursIntro}</p></Reveal><Link className="outline-link" to="/tours">{c.explore}<Icon size={18} /></Link></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{tours.filter(tour => tour.featured).slice(0, 3).map((tour, i) => <Reveal key={tour.id} delay={i * 90}><TourCard tour={tour} /></Reveal>)}</div></div></section>
}
