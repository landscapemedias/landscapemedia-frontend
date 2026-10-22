import { useEffect, useRef, useState } from 'react'
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'

const START = 330
const END = 1290
const toT = (min) => (min - START) / (END - START)

const STOPS = [
  {
    min: 370, k: 'Sunrise', icon: Sunrise, img: IMG.hills, alt: 'Misty green hills at sunrise',
    shoot: 'Dew on fresh stripes, mist over the lawn, crews rolling out.', use: 'Maintenance plan ads',
    grade: 'rgba(255, 196, 140, 0.18)', glow: '#f6b98a',
  },
  {
    min: 750, k: 'Midday', icon: Sun, img: IMG.poolModern, alt: 'Modern house with a pool under a clear blue sky',
    shoot: 'Hard light for crisp hardscape, pools and clean architecture.', use: 'Showcase website',
    grade: 'rgba(160, 210, 255, 0.06)', glow: '#fff1b8',
  },
  {
    min: 1120, k: 'Golden hour', icon: Sunset, img: IMG.forest, alt: 'Warm evening light through a forest path',
    shoot: 'Warm, long shadows. People, gardens and lifestyle moments.', use: 'Reels & social',
    grade: 'rgba(255, 150, 60, 0.22)', glow: '#f4a24a',
  },
  {
    min: 1250, k: 'Blue hour', icon: Moon, img: IMG.lake, alt: 'Villa with a glowing pool and landscape lighting at night',
    shoot: 'Landscape lighting on, pools glowing, verandas lit from inside.', use: 'Luxury brochures',
    grade: 'rgba(40, 70, 160, 0.22)', glow: '#7aa2ff',
  },
].map((s) => ({ ...s, t: toT(s.min) }))

function weights(t) {
  if (t <= STOPS[0].t) return STOPS.map((_, i) => (i === 0 ? 1 : 0))
  const last = STOPS.length - 1
  if (t >= STOPS[last].t) return STOPS.map((_, i) => (i === last ? 1 : 0))
  const j = STOPS.findIndex((s, i) => t >= s.t && t < STOPS[i + 1].t)
  const k = (t - STOPS[j].t) / (STOPS[j + 1].t - STOPS[j].t)
  const e = k * k * (3 - 2 * k)
  return STOPS.map((_, i) => (i === j ? 1 - e : i === j + 1 ? e : 0))
}

const clock = (t) => {
  const m = Math.round(START + t * (END - START))
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export default function GoldenHour() {
  const secRef = useRef(null)
  const [t, setT] = useState(STOPS[2].t)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const drag = useRef(null)

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
      setT((x) => (x + dt / 16000) % 1)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [auto, visible])

  const w = weights(t)
  const active = w.indexOf(Math.max(...w))
  const stop = STOPS[active]
  const night = Math.max(0, (t - 0.86) / 0.14)
  const dawn = Math.max(0, 1 - t / 0.08)

  const ang = Math.PI * (1 - t)
  const sx = 50 + Math.cos(ang) * 44
  const sy = 92 - Math.sin(ang) * 78

  const scrub = (clientX) => {
    const r = drag.current.getBoundingClientRect()
    setT(Math.min(1, Math.max(0, (clientX - r.left) / r.width)))
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
            <span className="eyebrow" data-reveal="">Botanical & Architectural Photography</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Same garden." />
              <br />
              <Words text="Different hour." className="ital" delay={0.15} />
              <br />
              <Words text="Different sale." delay={0.3} />
            </h2>
          </div>
          <p className="lead" data-reveal="">
            Digital media depends on lighting. Drag through the day to see how we film your plants, manicured turf and architectural gardens to sell recurring maintenance and high-end outdoor living.
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
            {STOPS.map((s, i) => (
              <img
                key={s.k}
                src={s.img}
                alt=""
                className="sun-img"
                loading="lazy"
                style={{ opacity: w[i], transform: `scale(${1.08 - w[i] * 0.08}) translateX(${(t - s.t) * -12}%)` }}
              />
            ))}
            <div className="sun-grade" style={{ background: stop.grade }} />
            <div className="sun-rays" />

            <div className="sun-card" key={stop.k}>
              <span className="sun-card-k">
                <stop.icon size={16} /> {stop.k}
              </span>
              <p>{stop.shoot}</p>
              <span className="sun-card-use">Best for: {stop.use}</span>
            </div>

            <div className="sun-clock">
              <b>{clock(t)}</b>
              <small>{auto ? 'Time-lapse · drag to scrub' : 'Scrubbing'}</small>
            </div>
          </div>

          <div className="sun-rail">
            <input
              type="range"
              min="0"
              max="1000"
              value={Math.round(t * 1000)}
              onChange={(e) => {
                setAuto(false)
                setT(+e.target.value / 1000)
              }}
              aria-label="Time of day"
              aria-valuetext={`${clock(t)}, ${stop.k}`}
              style={{ '--v': `${t * 100}%` }}
            />
            <div className="sun-ticks">
              {STOPS.map((s, i) => {
                const I = s.icon
                return (
                  <button
                    key={s.k}
                    type="button"
                    className={i === active ? 'on' : ''}
                    style={{ left: `${s.t * 100}%` }}
                    onClick={() => {
                      setAuto(false)
                      setT(s.t)
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
              {auto ? 'Pause time-lapse' : 'Play time-lapse'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
