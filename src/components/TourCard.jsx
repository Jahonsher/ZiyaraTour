import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import Img from './Img.jsx'
import destinations from '../data/destinations.json'

const BADGE_STYLES = {
  bestseller: 'bg-accent-500 text-white',
  hotdeal:    'bg-rose-500 text-white',
  new:        'bg-emerald-500 text-white',
}

export default function TourCard({ tour }) {
  const { t, localize } = useI18n()
  const [liked, setLiked] = useState(false)

  const firstCity = destinations.find((d) => d.id === tour.destinations?.[0])
  const cityLabel = firstCity ? localize(firstCity.name) : ''

  const discount = tour.oldPrice
    ? Math.round(100 - (tour.priceFrom / tour.oldPrice) * 100)
    : null

  function toggleLike(e) {
    e.preventDefault()
    e.stopPropagation()
    setLiked((v) => !v)
  }

  return (
    <Link to={`/tours/${tour.slug}`} className="card group flex flex-col relative">
      <div className="relative aspect-[5/4] overflow-hidden rounded-t-2xl">
        <Img
          src={tour.cover}
          alt={localize(tour.title)}
          label={localize(tour.title)}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-[900ms]"
        />

        {/* subtle bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/60 to-transparent" />

        {/* top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {tour.badge && (
            <span className={`chip shadow-sm ${BADGE_STYLES[tour.badge] || 'bg-brand-600 text-white'}`}>
              {t(`card.${tour.badge}`)}
            </span>
          )}
          {discount && discount > 0 && (
            <span className="chip bg-white text-rose-600 shadow-sm font-bold">
              −{discount}%
            </span>
          )}
        </div>

        {/* top-right wishlist */}
        <button onClick={toggleLike}
          aria-label={t('card.wishlist')}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition ${
            liked ? 'bg-rose-500 text-white' : 'bg-white/95 text-slate-600 hover:text-rose-500'
          }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* bottom-left city pin */}
        {cityLabel && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-semibold drop-shadow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
            {cityLabel}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* rating row */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex text-accent-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(tour.rating) ? 'currentColor' : '#e2e8f0'}>
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.2L2 10l7.1-1.1z"/>
              </svg>
            ))}
          </div>
          <span className="font-semibold text-ink-800">{tour.rating}</span>
          <span>({tour.reviews})</span>
        </div>

        <h3 className="mt-2 font-display font-bold text-lg text-ink-900 group-hover:text-brand-700 transition line-clamp-2 min-h-[3.25rem]">
          {localize(tour.title)}
        </h3>

        {/* facts row */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {tour.duration.days} {t('tour.days')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            {tour.groupSize.min}–{tour.groupSize.max}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 20l-5.4 2.8 1-6L.2 12.4l6-.9L9 6l2.8 5.5 6 .9-4.4 4.4 1 6z"/></svg>
            {t(`categories.${tour.category}`)}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t('tour.from')}</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-accent-600">
                ${tour.priceFrom}
              </span>
              {tour.oldPrice && (
                <span className="text-sm text-slate-400 line-through">${tour.oldPrice}</span>
              )}
            </div>
            <div className="text-[11px] text-slate-500">{t('card.person')}</div>
          </div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
