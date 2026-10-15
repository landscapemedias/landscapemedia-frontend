import { useEffect, useState } from 'react'
import { BRAND } from '../data/site'

const LEAVES = [
  [100, 62, 16, -20], [78, 74, 13, -50], [122, 74, 14, 30], [64, 96, 12, -70], [138, 98, 13, 60],
  [88, 50, 11, -10], [112, 48, 12, 15], [100, 38, 10, 0], [72, 58, 9, -40], [130, 60, 10, 40],
  [56, 82, 9, -80], [146, 82, 9, 80], [92, 84, 10, -30], [110, 86, 11, 20],
]

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let raf
    const t0 = performance.now()
    const dur = 2200
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100))
      if (k < 1) raf = requestAnimationFrame(step)
      else {
        setTimeout(() => setLeaving(true), 250)
        setTimeout(onDone, 1250)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className={`preloader ${leaving ? 'leave' : ''}`} aria-hidden="true">
      <div className="pl-inner">
        <svg className="pl-tree" viewBox="0 0 200 200">
          <path className="pl-ground" d="M30 170 Q100 160 170 170" />
          <path className="pl-trunk" d="M100 170 C100 150 98 130 100 110 C101 96 100 84 100 70" />
          <path className="pl-br b1" d="M100 120 C90 112 80 104 66 98" />
          <path className="pl-br b2" d="M100 112 C112 104 124 100 138 98" />
          <path className="pl-br b3" d="M100 92 C92 84 84 78 76 74" />
          <path className="pl-br b4" d="M100 88 C110 80 116 78 124 74" />
          {LEAVES.map(([x, y, s, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <path
                className="pl-leaf"
                style={{ animationDelay: `${0.9 + i * 0.07}s` }}
                d={`M0 0 C${s * 0.5} ${-s * 0.6} ${s * 0.5} ${-s * 1.2} 0 ${-s * 1.5} C${-s * 0.5} ${-s * 1.2} ${-s * 0.5} ${-s * 0.6} 0 0Z`}
              />
            </g>
          ))}
        </svg>
        <div className="pl-brand">
          <span>{BRAND.name}</span>
          <em>{BRAND.word}</em>
        </div>
        <div className="pl-bar">
          <span style={{ transform: `scaleX(${n / 100})` }} />
        </div>
        <div className="pl-meta">
          <span>Preparing the grounds</span>
          <span>{String(n).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
