import { useEffect, useRef, useState } from 'react'
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

const START = 330
const END = 1290
const toT = (min) => (min - START) / (END - START)

const STOP_BASES = [
  { min: 370, icon: Sunrise, img: IMG.hills, grade: 'rgba(255, 196, 140, 0.18)', glow: '#f6b98a' },
  { min: 750, icon: Sun, img: IMG.poolModern, grade: 'rgba(160, 210, 255, 0.06)', glow: '#fff1b8' },
  { min: 1120, icon: Sunset, img: IMG.forest, grade: 'rgba(255, 150, 60, 0.22)', glow: '#f4a24a' },
  { min: 1250, icon: Moon, img: IMG.lake, grade: 'rgba(40, 70, 160, 0.22)', glow: '#7aa2ff' },
]

function weights(t, stops) {
  if (!stops.length) return []
  if (t <= stops[0].t) return stops.map((_, i) => (i === 0 ? 1 : 0))
  const last = stops.length - 1
  if (t >= stops[last].t) return stops.map((_, i) => (i === last ? 1 : 0))
  const j = stops.findIndex((s, i) => t >= s.t && t < stops[i + 1].t)
  if (j === -1) return stops.map((_, i) => (i === 0 ? 1 : 0))
  const k = (t - stops[j].t) / (stops[j + 1].t - stops[j].t)
  const e = k * k * (3 - 2 * k)
  return stops.map((_, i) => (i === j ? 1 - e : i === j + 1 ? e : 0))
}

const clock = (t) => {
  const m = Math.round(START + t * (END - START))
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export default function GoldenHour() {
  const secRef = useRef(null)
  const drag = useRef(null)
  const { t } = useLanguage()
  const data = t.goldenHour || {}

  const stops = (data.stops || []).map((s, idx) => ({
    ...STOP_BASES[idx],
    ...s,
    t: toT(STOP_BASES[idx].min),
    alt: s.k,
  }))

  const [tVal, setTVal] = useState(stops[2]?.t ?? 0.7)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(secRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || !visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    let last = performance.now()
    const step = (now) => {
      const dt = Math.min(64, now - last)
      last = now
      setTVal((x) => (x + dt / 16000) % 1)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [auto, visible])

  const w = weights(tVal, stops)
  const active = w.length ? w.indexOf(Math.max(...w)) : 0
  const stop = stops[active] || stops[0] || {
    glow: '#f4a24a', grade: 'rgba(255, 150, 60, 0.22)', shoot: '', use: '', k: 'Golden hour',
  }

  const night = Math.max(0, (tVal - 0.86) / 0.14)
  const dawn = Math.max(0, 1 - tVal / 0.08)

  const ang = Math.PI * (1 - tVal)
  const sx = 50 + Math.cos(ang) * 44
  const sy = 92 - Math.sin(ang) * 78

  const scrub = (clientX) => {
    const r = drag.current.getBoundingClientRect()
    setTVal(Math.min(1, Math.max(0, (clientX - r.left) / r.width)))
  }
  const onDown = (e) => {
    setAuto(false)
    e.currentTarget.setPointerCapture(e.pointerId)
    scrub(e.clientX)
  }
  const onMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) scrub(e.clientX)
  }

  return (
    <section
      className="section dark sun"
      id="golden-hour"
      ref={secRef}
      style={{ '--glow': stop.glow, '--sx': `${sx}%`, '--sy': `${sy}%`, '--night': Math.max(night, dawn * 0.6) }}
    >
      <div className="sun-stars" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} className="ital" delay={0.15} />
              <br />
              <Words text={data.title3} delay={0.3} />
            </h2>
          </div>
          <p className="lead" data-reveal="">
            {data.lead}
          </p>
        </div>

        <div className="sun-stage" data-reveal="scale">
          <div className="sun-sky" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="sun-arc">
              <path d="M6 92 A44 78 0 0 1 94 92" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={`sun-orb ${night > 0.4 ? 'moon' : ''}`} style={{ left: `${sx}%`, top: `${sy}%` }} />
          </div>

          <div
            className="sun-frame"
            ref={drag}
            onPointerDown={onDown}
            onPointerMove={onMove}
            role="img"
            aria-label={stop.alt}
          >
            {stops.map((s, i) => (
              <img
                key={s.k || i}
                src={s.img}
                alt=""
                className="sun-img"
                loading="lazy"
                style={{ opacity: w[i] ?? 0, transform: `scale(${1.08 - (w[i] ?? 0) * 0.08}) translateX(${(tVal - s.t) * -12}%)` }}
              />
            ))}
            <div className="sun-grade" style={{ background: stop.grade }} />
            <div className="sun-rays" />

            <div className="sun-card" key={stop.k}>
              <span className="sun-card-k">
                {stop.icon && <stop.icon size={16} />} {stop.k}
              </span>
              <p>{stop.shoot}</p>
              <span className="sun-card-use">{data.bestFor || 'Best for:'} {stop.use}</span>
            </div>

            <div className="sun-clock">
              <b>{clock(tVal)}</b>
              <small>{auto ? (data.timelapseDrag || 'Time-lapse · drag to scrub') : (data.scrubbing || 'Scrubbing')}</small>
            </div>
          </div>

          <div className="sun-rail">
            <input
              type="range"
              min="0"
              max="1000"
              value={Math.round(tVal * 1000)}
              onChange={(e) => {
                setAuto(false)
                setTVal(+e.target.value / 1000)
              }}
              aria-label="Time of day"
              aria-valuetext={`${clock(tVal)}, ${stop.k}`}
              style={{ '--v': `${tVal * 100}%` }}
            />
            <div className="sun-ticks">
              {stops.map((s, i) => {
                const I = s.icon
                return (
                  <button
                    key={s.k || i}
                    type="button"
                    className={i === active ? 'on' : ''}
                    style={{ left: `${s.t * 100}%` }}
                    onClick={() => {
                      setAuto(false)
                      setTVal(s.t)
                    }}
                  >
                    <I size={14} />
                    <span>{s.k}</span>
                    <small>{clock(s.t)}</small>
                  </button>
                )
              })}
            </div>
            <button type="button" className="sun-play" onClick={() => setAuto((a) => !a)}>
              {auto ? (data.pauseBtn || 'Pause time-lapse') : (data.playBtn || 'Play time-lapse')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
