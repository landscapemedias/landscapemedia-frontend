import { useMemo, useRef } from 'react'
import { SEASONS } from '../data/site'
import { useScrollProgress, scrollToId } from '../hooks'
import { Btn } from './ui'

function rand(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function SeasonTree({ season }) {
  const leaves = useMemo(() => {
    const r = rand(42)
    const out = []
    while (out.length < 90) {
      const x = r() * 320 - 160
      const y = r() * 220 - 110
      if ((x * x) / (160 * 160) + (y * y) / (110 * 110) < 1) out.push({ x: 200 + x, y: 170 + y, r: 14 + r() * 16, d: r() })
    }
    return out
  }, [])
  const bare = season.key === 'winter'
  return (
    <svg viewBox="0 0 400 460" className="st-svg">
      <ellipse cx="200" cy="440" rx="170" ry="16" className="st-shadow" />
      <path className="st-ground" d="M20 440 C120 424 280 424 380 440" />
      <g className="st-trunk">
        <path d="M188 440 C190 380 186 330 192 280 C196 250 190 230 194 200 L206 200 C210 230 204 250 208 280 C214 330 210 380 214 440Z" />
        <path d="M194 300 C170 280 140 266 112 250 L116 242 C146 256 176 270 198 288Z" />
        <path d="M206 290 C232 268 262 256 292 240 L296 248 C268 262 236 280 210 302Z" />
        <path d="M196 236 C180 210 160 196 136 182 L140 175 C166 188 188 204 202 228Z" />
        <path d="M204 230 C220 206 240 190 262 176 L266 183 C246 198 226 216 210 240Z" />
        <path d="M198 206 C196 180 200 150 196 120 L204 120 C208 150 204 180 206 206Z" />
      </g>
      <g className="st-canopy">
        {leaves.map((l, i) => (
          <circle
            key={i}
            cx={l.x}
            cy={l.y}
            r={l.r}
            style={{
              fill: season.leaf[i % 3],
              transform: `scale(${bare ? (i % 4 === 0 ? 0.55 : 0) : 1})`,
              transitionDelay: `${l.d * 0.6}s`,
              opacity: bare ? 0.95 : 0.92,
            }}
          />
        ))}
      </g>
      {season.key === 'spring' &&
        [0, 1, 2, 3, 4, 5].map((i) => <circle key={i} className="st-bloom" cx={120 + i * 32} cy={130 + (i % 2) * 70} r="6" style={{ animationDelay: `${i * 0.2}s` }} />)}
      {season.key === 'summer' && <circle className="st-sunglow" cx="330" cy="70" r="34" />}
      {bare && <path className="st-snowcap" d="M40 440 C120 418 280 418 360 440Z" />}
    </svg>
  )
}

function Particles({ kind }) {
  const items = useMemo(() => {
    const r = rand(9)
    return Array.from({ length: 26 }, () => ({ l: r() * 100, d: r() * -12, s: 0.6 + r() * 0.9, t: 8 + r() * 8 }))
  }, [])
  return (
    <div className={`st-parts ${kind}`} aria-hidden="true">
      {items.map((p, i) => (
        <i key={i} style={{ left: `${p.l}%`, animationDelay: `${p.d}s`, animationDuration: `${p.t}s`, '--s': p.s }} />
      ))}
    </div>
  )
}

export default function Seasons() {
  const ref = useRef(null)
  const p = useScrollProgress(ref, 'pin')
  const idx = Math.min(SEASONS.length - 1, Math.floor(p * SEASONS.length))
  const s = SEASONS[idx]
  const local = p * SEASONS.length - idx

  const jump = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((i + 0.08) / SEASONS.length), behavior: 'smooth' })
  }

  return (
    <section className="seasons" id="seasons" ref={ref} style={{ '--sky1': s.sky[0], '--sky2': s.sky[1] }}>
      <div className="st-sticky">
        <Particles kind={s.key} />
        <div className="wrap st-grid">
          <div className="st-head">
            <span className="eyebrow">Year-round care</span>
            <h2 className="h-display h-md">
              Care that follows <em>every</em> season.
            </h2>
            <div className="st-tabs" role="tablist">
              {SEASONS.map((x, i) => (
                <button key={x.key} role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => jump(i)}>
                  <span>{x.name}</span>
                  <small>{x.months}</small>
                  <i style={{ transform: `scaleX(${i < idx ? 1 : i === idx ? local : 0})` }} />
                </button>
              ))}
            </div>
          </div>

          <div className="st-tree">
            <SeasonTree season={s} />
            <div className="st-badge" key={s.key}>
              <b>
                {s.metric.n}
                <span>{s.metric.unit}</span>
              </b>
              <small>{s.metric.label}</small>
            </div>
          </div>

          <div className="st-body" key={s.key}>
            <span className="st-num">0{idx + 1} / 04 · {s.months}</span>
            <h3 className="h-display">{s.title}</h3>
            <p>{s.lead}</p>
            <ul>
              {s.plays.map((pl, i) => (
                <li key={pl.k} style={{ '--i': i }}>
                  <b>{pl.k}</b>
                  <span>{pl.v}</span>
                </li>
              ))}
            </ul>
            <Btn onClick={() => scrollToId('book')}>Plan my {s.name.toLowerCase()} care</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
