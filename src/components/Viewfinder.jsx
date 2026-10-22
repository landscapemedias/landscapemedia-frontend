import { useEffect, useRef, useState } from 'react'
import { IMG } from '../data/site'
import { Words } from './ui'

const SHOTS = [
  { img: IMG.crew, alt: 'Landscape crew working on a client property', t: 'Crew in action', c: 'Greenline Grounds', lens: '35mm', f: 'f/2.8', iso: 200, use: 'Website hero' },
  { img: IMG.canopy, alt: 'Tall tree canopy seen from below', t: 'Crane removal, 60 sec reel', c: 'High Oak Tree Care', lens: '24mm', f: 'f/8', iso: 100, use: 'Instagram reel' },
  { img: IMG.snow, alt: 'Snow covered property after a storm', t: 'Overnight plow route', c: 'Northfield Snow Co.', lens: '50mm', f: 'f/1.8', iso: 3200, use: 'Storm alert email' },
  { img: IMG.greenhouse, alt: 'Greenhouse full of young plants', t: 'Build day 1 to 30', c: 'Glasshouse Growers', lens: '16mm', f: 'f/5.6', iso: 400, use: 'Build series' },
  { img: IMG.micro, alt: 'Close up of fresh microgreens', t: 'Seed to harvest', c: 'Root & Sprout Farms', lens: '100mm macro', f: 'f/4', iso: 320, use: 'Harvest box page' },
  { img: IMG.glass, alt: 'Glass veranda opening onto a garden', t: 'Veranda reveal at sunset', c: 'Clearview Verandas', lens: '24mm', f: 'f/11', iso: 100, use: 'Luxury brochure' },
]

const DWELL = 4800

function useVisible(ref) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return v
}

function Timecode({ run }) {
  const [f, setF] = useState(0)
  useEffect(() => {
    if (!run) return
    const id = setInterval(() => setF((x) => x + 1), 1000 / 24)
    return () => clearInterval(id)
  }, [run])
  const pad = (n) => String(n).padStart(2, '0')
  const s = Math.floor(f / 24)
  return <span className="vfx-tc">{`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`}</span>
}

export default function Viewfinder() {
  const frameRef = useRef(null)
  const visible = useVisible(frameRef)
  const [i, setI] = useState(0)
  const [snap, setSnap] = useState(0)
  const [hold, setHold] = useState(false)
  const shot = SHOTS[i]

  const go = (n) => {
    setI((n + SHOTS.length) % SHOTS.length)
    setSnap((x) => x + 1)
  }

  useEffect(() => {
    if (!visible || hold) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => go(i + 1), DWELL)
    return () => clearTimeout(id)
  }, [i, visible, hold])

  return (
    <section className="section dark vfx" id="on-location">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Cinematography & Digital Media</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="No stock footage." />
              <br />
              <Words text="Ever." className="ital" delay={0.2} />
            </h2>
          </div>
          <p className="lead" data-reveal="">
            Our video crew arrives on your properties with cinema cameras and drones. We capture real plantings, lush gardens, tree work and hardscape transformations into viral reels, website showcases and digital ad creative.
          </p>
        </div>

        <div
          className={`vfx-frame ${visible ? 'live' : ''}`}
          ref={frameRef}
          data-reveal="scale"
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
        >
          {SHOTS.map((s, n) => (
            <img key={n} src={s.img} alt={s.alt} className={`vfx-img ${n === i ? 'on' : ''}`} loading="lazy" />
          ))}

          <div className="vfx-iris" key={`iris-${snap}`} aria-hidden="true" />
          <div className="vfx-flash" key={`flash-${snap}`} aria-hidden="true" />

          <div className="vfx-hud" aria-hidden="true">
            <i className="vfx-thirds" />
            <i className="vfx-corner tl" />
            <i className="vfx-corner tr" />
            <i className="vfx-corner bl" />
            <i className="vfx-corner br" />

            <div className="vfx-top">
              <span className="vfx-rec">
                <b /> REC
              </span>
              <Timecode run={visible} />
              <span className="vfx-spec">4K · 24 fps · ISO {shot.iso}</span>
            </div>

            <div className="vfx-focus" key={`af-${snap}`}>
              <span>AF</span>
            </div>

            <div className="vfx-meters">
              {Array.from({ length: 2 }).map((_, c) => (
                <span key={c} className="vfx-meter">
                  {Array.from({ length: 12 }).map((_, b) => (
                    <i key={b} style={{ '--b': b, '--c': c }} />
                  ))}
                </span>
              ))}
            </div>

            <div className="vfx-bottom">
              <div className="vfx-slate" key={`slate-${snap}`}>
                <small>
                  Shot {String(i + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')} · {shot.c}
                </small>
                <b>{shot.t}</b>
              </div>
              <div className="vfx-exp">
                <span>{shot.lens}</span>
                <span>{shot.f}</span>
                <span className="vfx-use">→ {shot.use}</span>
              </div>
            </div>
          </div>

          <div className="vfx-nav">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous shot">‹</button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next shot">›</button>
          </div>
        </div>

        <div className="vfx-strip" role="tablist" aria-label="Shot list">
          {SHOTS.map((s, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              className={`vfx-thumb ${n === i ? 'on' : ''}`}
              onClick={() => go(n)}
            >
              <img src={s.img} alt="" loading="lazy" />
              <span className="vfx-thumb-t">{s.c}</span>
              {n === i && <i className="vfx-prog" key={`p-${snap}`} style={{ animationDuration: `${DWELL}ms`, animationPlayState: visible && !hold ? 'running' : 'paused' }} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
