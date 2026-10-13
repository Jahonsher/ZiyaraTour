import { useState } from 'react'

/**
 * <img> with a graceful gradient fallback if the source fails to load.
 * All tour images are hosted externally (see tours.json). If a URL fails,
 * we render a nicely styled placeholder with the destination label.
 */
export default function Img({ src, alt, label = '', className = '', ...rest }) {
  const [failed, setFailed] = useState(false)

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
