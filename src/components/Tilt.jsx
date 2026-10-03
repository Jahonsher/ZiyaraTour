import { useRef } from 'react'
export default function Tilt({ children, className = '' }) {
  const ref = useRef(null)
  function move(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    ref.current.style.setProperty('--tilt-x', `${-(event.clientY - box.top - box.height / 2) / box.height * 7}deg`)
    ref.current.style.setProperty('--tilt-y', `${(event.clientX - box.left - box.width / 2) / box.width * 9}deg`)
  }
  function reset() {
    ref.current.style.setProperty('--tilt-x', '0deg')
    ref.current.style.setProperty('--tilt-y', '0deg')
  }
  return <div className={`tilt-stage ${className}`} onPointerMove={move} onPointerLeave={reset}><div ref={ref} className="tilt-surface">{children}</div></div>
}
