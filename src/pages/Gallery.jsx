import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import media from '../data/gallery.json'
import './gallery.css'

function Arrow({ direction = 'right' }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}><path d="M4 12h16M13 5l7 7-7 7" /></svg>
}

function Icon({ video = false }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{video ? <path d="m9 5 11 7-11 7V5Z" /> : <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="8" cy="9" r="1.5" /><path d="m3 17 6-5 4 3 4-5 4 7" /></>}</svg>
}

export default function Gallery() {
  const { t } = useI18n()
  const [type, setType] = useState('photo')
  const [category, setCategory] = useState('all')
  const [limit, setLimit] = useState(18)
  const [activeId, setActiveId] = useState(null)
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const photos = media.filter(item => item.type === 'photo')
  const videoCount = media.length - photos.length
  const filtered = media.filter(item => item.type === type && (category === 'all' || item.category === category))
  const activeIndex = filtered.findIndex(item => item.id === activeId)
  const active = filtered[activeIndex]
  const cover = photos.find(item => item.id.includes('8501714')) || photos[0]
  const inset = photos.find(item => item.id.includes('8501695')) || photos[1]
  const label = (item) => `${t(`gallery.${item.category}`)} · ${String(media.indexOf(item) + 1).padStart(2, '0')}`

  useEffect(() => {
    if (!activeId) return
    const element = dialog.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    closeButton.current?.focus()
    return () => { element.close(); document.body.style.overflow = overflow }
  }, [activeId !== null])

  function changeFilter(nextType, nextCategory) {
    setType(nextType)
    setCategory(nextCategory)
    setLimit(18)
  }
  function step(direction) {
    setActiveId(filtered[(activeIndex + direction + filtered.length) % filtered.length].id)
  }

  return (
    <div className="gallery-page">
      <section className="gallery-hero container-x">
        <div className="gallery-intro">
          <div className="gallery-eyebrow"><span />{t('gallery.eyebrow')}</div>
          <h1>{t('gallery.title')}<br /><em>{t('gallery.highlight')}</em></h1>
          <p>{t('gallery.intro')}</p>
          <a href="#travel-journal" className="gallery-explore">{t('gallery.explore')}<span><Arrow /></span></a>
          <div className="gallery-counts">
            <div><strong>{photos.length}</strong><span>{t('gallery.photos')}</span></div>
            {videoCount > 0 && <div><strong>{videoCount}</strong><span>{t('gallery.videos')}</span></div>}
            <div className="gallery-signature">ZiyaraTour<span>TRAVEL MEMORIES</span></div>
          </div>
        </div>
        {cover && <div className="gallery-cover">
          <img className="gallery-cover-main" src={cover.src} alt={t('gallery.heritage')} width={cover.width} height={cover.height} fetchPriority="high" />
          <div className="gallery-cover-caption"><span>UZBEKISTAN</span><span>01 / ZIYARATOUR</span></div>
          <div className="gallery-stamp" aria-hidden="true"><span>ZIYARA TOUR</span><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="m21 3-6 18-4-8-8-4 18-6ZM11 13 21 3" /></svg><span>EST. MEMORIES</span></div>
          {inset && <div className="gallery-postcard"><img src={inset.thumbnail} alt={t('gallery.moments')} width={inset.width} height={inset.height} /><span>{t('gallery.stamp')}</span></div>}
        </div>}
      </section>

      <section id="travel-journal" className="container-x gallery-journal">
        <div className="gallery-section-top">
          <div><div className="gallery-eyebrow">{t('gallery.collection')}</div><h2>{t('gallery.heading')}</h2><p>{t('gallery.description')}</p></div>
          <div className="gallery-media-switch" role="group" aria-label={t('nav.gallery')}>
            {['photo', 'video'].map(value => <button key={value} aria-pressed={type === value} onClick={() => changeFilter(value, 'all')}><Icon video={value === 'video'} />{t(`gallery.${value}`)}<span>{value === 'photo' ? photos.length : videoCount}</span></button>)}
          </div>
        </div>
        <div className="gallery-filters" role="group" aria-label={t('gallery.collection')}>
          {['all', 'heritage', 'culture', 'moments'].map(value => <button key={value} aria-pressed={category === value} onClick={() => changeFilter(type, value)}>{t(`gallery.${value}`)}</button>)}
          <span className="gallery-result-count" aria-live="polite">{String(filtered.length).padStart(2, '0')} / {t(`gallery.${type}`)}</span>
        </div>

        {filtered.length ? <>
          <div className="gallery-masonry">
            {filtered.slice(0, limit).map((item, index) => <button className="gallery-tile" key={item.id} onClick={() => setActiveId(item.id)} aria-label={`${t(item.type === 'video' ? 'gallery.play' : 'gallery.open')}: ${label(item)}`}>
              {item.type === 'photo' ? <img src={item.thumbnail} alt={label(item)} width={item.width} height={item.height} loading="lazy" decoding="async" /> : <div className="gallery-video-preview">{item.poster ? <img src={item.poster} alt={label(item)} loading="lazy" decoding="async" /> : <video src={item.src} muted playsInline preload="metadata" tabIndex={-1} aria-hidden="true" />}<span className="gallery-play"><Icon video /></span></div>}
              <span className="gallery-tile-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="gallery-tile-caption"><span>{t(`gallery.${item.category}`)}</span><span className="gallery-tile-expand">↗</span></span>
            </button>)}
          </div>
          {filtered.length > limit && <div className="gallery-more"><button className="btn-secondary" onClick={() => setLimit(value => value + 18)}>{t('gallery.more')}<span>↓</span></button><span>{Math.min(limit, filtered.length)} / {filtered.length}</span></div>}
        </> : <div className="gallery-empty"><Icon video={type === 'video'} /><h3>{t('gallery.emptyTitle')}</h3><p>{t('gallery.empty')}</p><button className="btn-secondary" onClick={() => changeFilter('photo', 'all')}>{t('gallery.photo')}<Arrow /></button></div>}
      </section>

      <section className="container-x gallery-cta-wrap"><div className="gallery-cta"><div><div className="gallery-eyebrow">{t('gallery.ctaEyebrow')}</div><h2>{t('gallery.ctaTitle')}</h2><p>{t('gallery.ctaText')}</p></div><Link to="/tours" className="btn-primary">{t('gallery.cta')}<Arrow /></Link></div></section>

      <dialog ref={dialog} className="gallery-lightbox" aria-label={t('nav.gallery')} onCancel={() => setActiveId(null)} onClick={event => { if (event.target === event.currentTarget) setActiveId(null) }} onKeyDown={event => { if (event.target.tagName === 'VIDEO') return; if (event.key === 'ArrowRight') { event.preventDefault(); step(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) } }}>
        {active && <>
          <div className="gallery-lightbox-bar"><span>{label(active)}</span><button ref={closeButton} onClick={() => setActiveId(null)} aria-label={t('gallery.close')}>✕</button></div>
          <div className="gallery-lightbox-stage">
            {filtered.length > 1 && <button className="gallery-prev" onClick={() => step(-1)} aria-label={t('gallery.previous')}><Arrow direction="left" /></button>}
            {active.type === 'photo' ? <img key={active.id} src={active.src} alt={label(active)} /> : <video key={active.id} src={active.src} poster={active.poster} controls playsInline autoPlay preload="metadata" />}
            {filtered.length > 1 && <button className="gallery-next" onClick={() => step(1)} aria-label={t('gallery.next')}><Arrow /></button>}
          </div>
          <div className="gallery-lightbox-count" aria-live="polite">{activeIndex + 1} / {filtered.length}</div>
        </>}
      </dialog>
    </div>
  )
}
