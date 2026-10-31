import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import sweets from '../data/sweets.json'
import Reveal from '../components/Reveal.jsx'

function SweetImage({ sweet, hero = false }) {
  return (
    <img
      src={`/images/sweets/${sweet.id}-1000.webp`}
      srcSet={`/images/sweets/${sweet.id}-480.webp ${Math.round(sweet.width * 480 / Math.max(sweet.width, sweet.height))}w, /images/sweets/${sweet.id}-1000.webp ${sweet.width}w`}
      sizes={hero ? '(min-width: 1024px) 560px, 100vw' : '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'}
      alt={`Silk Road Sweets — ${sweet.category === 'gift' ? 'Gift collection' : 'Halva'}`}
      width={sweet.width}
      height={sweet.height}
      loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : 'auto'}
      decoding="async"
      className={`w-full h-full ${hero ? 'object-contain' : 'object-contain transition-transform duration-500 group-hover:scale-105'}`}
    />
  )
}

export default function Sweets() {
  const { t } = useI18n()
  const hero = sweets.find(sweet => sweet.category === 'gift') || sweets[0]
  return (
    <div className="pt-28 sm:pt-36 pb-8">
      <section className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-eyebrow">{t('sweets.eyebrow')}</div>
          <h1 className="section-title mt-3">{t('sweets.title')}</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">{t('sweets.subtitle')}</p>
        </div>
        <div className="mt-10 sm:mt-14 grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-orange-50 border border-orange-100">
          <div className="aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden">
            <SweetImage sweet={hero} hero />
          </div>
          <div className="flex flex-col justify-center items-start p-7 sm:p-12 lg:p-14">
            <span className="section-eyebrow !text-orange-700">{t('sweets.gift')}</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink-900">{t('sweets.heroTitle')}</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{t('sweets.heroText')}</p>
            <a href="#collection" className="btn-primary mt-7">{t('sweets.explore')} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
      <section id="collection" className="container-x pt-16 sm:pt-20 scroll-mt-32">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">{t('sweets.collection')}</h2>
          <span className="text-sm text-slate-500">ZiyaraTour · Silk Road Sweets</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweets.map((sweet, index) => (
            <Reveal key={sweet.id} delay={(index % 3) * 60}>
              <figure className="group h-full overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="aspect-square overflow-hidden bg-slate-50"><SweetImage sweet={sweet} /></div>
                <figcaption className="flex justify-between items-center gap-3 p-5">
                  <span className="font-semibold text-ink-900">{t(`sweets.${sweet.category}`)}</span>
                  <span className="text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-brand-50 p-8 sm:p-10 text-center">
          <p className="font-display text-xl sm:text-2xl font-bold text-ink-900">{t('sweets.caption')}</p>
          <Link to="/contact" className="btn-primary mt-6">{t('sweets.contact')}</Link>
        </div>
      </section>
    </div>
  )
}
