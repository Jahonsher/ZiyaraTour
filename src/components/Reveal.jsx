import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  variant = 'up',
  threshold = 0.15,
  once = true,
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  const base = 'transition-all duration-700 ease-out will-change-transform'
  const hidden = {
    up:    'opacity-0 translate-y-8',
    down:  'opacity-0 -translate-y-8',
    left:  'opacity-0 translate-x-8',
    right: 'opacity-0 -translate-x-8',
    zoom:  'opacity-0 scale-95',
    fade:  'opacity-0',
  }[variant] || 'opacity-0 translate-y-8'
  const visible = 'opacity-100 translate-x-0 translate-y-0 scale-100'

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`${base} ${shown ? visible : hidden} ${className}`}
    >
      {children}
    </Tag>
  )
}
