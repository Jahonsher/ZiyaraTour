import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import Img from './Img.jsx'
import Icon from './Icon.jsx'
import Tilt from './Tilt.jsx'
import destinations from '../data/destinations.json'

export default function TourCard({ tour }) {
  const { t, lang, localize } = useI18n()
  const c = experience[lang]
  const route = tour.destinations.map(id => localize(destinations.find(d => d.id === id)?.name)).filter(Boolean).join(' · ')
  return <Tilt className="tour-tilt"><article className="journey-card">
    <Link to={`/tours/${tour.slug}`} className="journey-card-image" aria-label={localize(tour.title)}><Img src={tour.cover} alt={localize(tour.title)} className="w-full h-full object-cover" /><span className="journey-duration"><Icon name="clock" size={14} />{tour.duration.days} {t('tour.days')}</span><span className="journey-image-arrow"><Icon /></span></Link>
    <div className="journey-card-content"><p className="journey-route"><Icon name="pin" size={14} /><span>{route}</span></p><h3><Link to={`/tours/${tour.slug}`}>{localize(tour.title)}</Link></h3><p className="journey-description">{localize(tour.shortDescription)}</p><div className="journey-card-bottom"><div><small>{t('tour.from')}</small><strong>{new Intl.NumberFormat(lang === 'uzc' ? 'uz-Cyrl' : lang, { style: 'currency', currency: tour.currency, maximumFractionDigits: 0 }).format(tour.priceFrom)}</strong><span>{t('card.person')}</span></div><Link to={`/book?tour=${encodeURIComponent(tour.slug)}`} className="journey-enquire" aria-label={`${c.submit}: ${localize(tour.title)}`}>{c.submit}<Icon size={16} /></Link></div></div>
  </article></Tilt>
}
