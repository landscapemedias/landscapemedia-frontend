import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let raf
    const t0 = performance.now()
    const dur = 2600
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100))
      if (k < 1) raf = requestAnimationFrame(step)
      else {
        setTimeout(() => setLeaving(true), 350)
        setTimeout(onDone, 1350)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className={`preloader ${leaving ? 'leave' : ''}`} aria-hidden="true">
      <div className="pl-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="pl-inner">
        <div className="pl-brand">
          <BrandLogo light />
        </div>
        <div className="pl-bar">
          <span style={{ transform: `scaleX(${n / 100})` }} />
        </div>
        <div className="pl-meta">
          <span>Growing landscape brands</span>
          <span>{String(n).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
