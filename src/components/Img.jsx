import { useEffect, useState } from 'react'

const landscapePosters = new Set(['/images/instagram/samarkand.jpg', '/images/instagram/samarkand-heritage.jpg'])

/**
 * <img> with a graceful gradient fallback if the source fails to load.
 * All tour images are hosted externally (see tours.json). If a URL fails,
 * we render a nicely styled placeholder with the destination label.
 */
export default function Img({ src, alt, label = '', className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => { setFailed(false) }, [src])

  if (failed || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center text-white font-display font-bold text-xl ${className}`}
        aria-label={alt}
      >
        <span className="drop-shadow">{label || alt || 'ZiyaraTour'}</span>
      </div>
    )
  }

  if (landscapePosters.has(src)) {
    return (
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={!alt || undefined} className={className} {...rest}>
        <image href={src} width="360" height="640" transform="translate(0 360) rotate(-90)" onError={() => setFailed(true)} />
      </svg>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
