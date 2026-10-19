import { useRef } from 'react'
import { useScrollProgress } from '../hooks'
import { IMG } from '../data/site'

const STAGES = [
  {
    k: 'Seed', n: '01', t: 'Brand identity', img: IMG.seedlings, alt: 'Seedling trays in a nursery',
    d: 'Logo, colors, type and truck wraps. The DNA every flyer, reel and page grows from.',
    chips: ['Logo & wordmark', 'Truck wraps', 'Brand guide'], when: 'Weeks 1 to 3',
  },
  {
    k: 'Roots', n: '02', t: 'Website & booking calendar', img: IMG.hands, alt: 'Hands planting a young plant in soil',
    d: 'Nobody sees roots, yet everything stands on them. Your site and 24/7 calendar catch every lead.',
    chips: ['Showcase website', 'Online calendar', 'Quote forms'], when: 'Weeks 3 to 5',
  },
  {
    k: 'Shoots', n: '03', t: 'Reels, social & flyers', img: IMG.sprout, alt: 'Young green sprout breaking through soil',
    d: 'Visible growth, every single week. Content that pushes through the noise of your town.',
    chips: ['Weekly reels', 'Door hangers', 'Social calendar'], when: 'Every week',
  },
  {
    k: 'Bloom', n: '04', t: 'Booked solid', img: IMG.flowers, alt: 'Garden in full bloom',
    d: 'Calls, booked site visits and signed maintenance plans. The part your neighbours notice.',
    chips: ['Booked visits', 'Signed plans', 'Monthly report'], when: 'Season after season',
  },
]

const ROOTS = [
  'M200 330 C196 380 172 410 150 460 C138 488 128 520 110 556',
  'M200 330 C206 384 232 420 258 468 C270 492 286 520 300 552',
  'M200 330 C200 390 204 450 198 520 C196 540 200 560 200 580',
  'M176 420 C150 430 120 428 84 446',
  'M240 440 C268 446 300 440 330 456',
  'M150 460 C130 470 104 500 92 520',
  'M258 468 C286 476 312 500 326 518',
]

const LEAVES = [
  { at: 0.28, x: 200, y: 268, r: -38, s: 1 },
  { at: 0.36, x: 200, y: 232, r: 38, s: 1 },
  { at: 0.46, x: 202, y: 190, r: -44, s: 1.15 },
  { at: 0.55, x: 202, y: 156, r: 44, s: 1.15 },
  { at: 0.64, x: 200, y: 122, r: -40, s: 0.95 },
]

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

function Plant({ p }) {
  const roots = clamp((p - 0.12) / 0.4)
  const stem = clamp((p - 0.24) / 0.42)
  const bloom = clamp((p - 0.72) / 0.2)
  return (
    <svg viewBox="0 0 400 600" className="root-svg" aria-hidden="true">
      <defs>
        <linearGradient id="root-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b4a2f" />
          <stop offset="0.45" stopColor="#4d3420" />
          <stop offset="1" stopColor="#2a1c10" />
        </linearGradient>
        <radialGradient id="root-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#b8e86a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#b8e86a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="70" r={60 + bloom * 70} fill="url(#root-glow)" opacity={bloom} />

      <rect x="0" y="330" width="400" height="270" fill="url(#root-soil)" />
      <path d="M0 330 C80 320 140 336 200 328 C270 320 330 338 400 326 L400 342 L0 342Z" fill="#7d5a3a" />
      <path d="M0 330 C80 320 140 336 200 328 C270 320 330 338 400 326" className="root-grass" />
      {[[40, 400, 7], [330, 380, 9], [90, 520, 6], [300, 560, 8], [250, 410, 4], [140, 380, 5], [360, 500, 5]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r * 1.4} ry={r} className="root-pebble" />
      ))}
      <g className="root-layers">
        <path d="M0 420 C120 412 280 428 400 418" />
        <path d="M0 500 C120 510 260 494 400 506" />
      </g>

      <ellipse cx="200" cy="334" rx="11" ry="7" className="root-seed" style={{ opacity: 1 - stem * 0.7 }} />

      <g className="root-roots">
        {ROOTS.map((d, i) => {
          const k = clamp(roots * 1.5 - i * 0.12)
          return <path key={i} d={d} pathLength="1" style={{ strokeDashoffset: 1 - k, strokeWidth: i < 3 ? 4 : 2.4 }} />
        })}
      </g>

      <path className="root-stem" d="M200 330 C196 290 206 250 200 210 C194 170 206 130 200 84" pathLength="1" style={{ strokeDashoffset: 1 - stem }} />

      {LEAVES.map((l, i) => {
        const k = clamp((p - l.at) / 0.08)
        return (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
            <path className="root-leaf" d="M0 0 C10 -26 40 -34 58 -30 C52 -10 30 8 0 0Z" style={{ transform: `scale(${(l.r < 0 ? -1 : 1) * k}, ${k})` }} />
          </g>
        )
      })}

      <g className="root-flower" style={{ transform: `translate(200px, 82px) scale(${bloom}) rotate(${bloom * 90 - 90}deg)` }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-22" rx="11" ry="22" transform={`rotate(${i * 45})`} className="root-petal" />
        ))}
        <circle r="12" className="root-core" />
      </g>
    </svg>
  )
}

export default function GrowthRoots() {
  const ref = useRef(null)
  const p = useScrollProgress(ref, 'pin')
  const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))
  const leads = Math.round(clamp((p - 0.5) / 0.45) * 148)

  return (
    <section className="root-sec" ref={ref} id="growth" style={{ '--p': p }}>
      <div className="root-sticky">
        <div className="wrap root-grid">
          <div className="root-left">
            <span className="eyebrow">How brands grow</span>
            <h2 className="h-display h-md root-title">
              Every landscape brand <em>starts as a seed.</em>
            </h2>
            <div className="root-stage-wrap">
              <Plant p={p} />
              <div className="root-meter">
                <small>Leads this month</small>
                <b>{leads}</b>
                <span className="root-meter-bar"><i style={{ transform: `scaleX(${leads / 148})` }} /></span>
              </div>
              <span className="root-depth">{Math.round(p * 120)} cm</span>
            </div>
          </div>

          <div className="root-right">
            <div className="root-cards">
              {STAGES.map((s, i) => (
                <article key={s.k} className={`root-card ${i === idx ? 'on' : ''} ${i < idx ? 'past' : ''}`} aria-hidden={i !== idx}>
                  <div className="root-photo">
                    <img src={s.img} alt={s.alt} loading="lazy" />
                    <span className="root-photo-tag">{s.when}</span>
                  </div>
                  <div className="root-copy">
                    <span className="root-k">
                      <i>{s.n}</i> {s.k}
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                    <div className="root-chips">
                      {s.chips.map((c, j) => (
                        <span key={c} style={{ '--j': j }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <ol className="root-steps">
              {STAGES.map((s, i) => (
                <li key={s.k} className={i <= idx ? 'on' : ''}>
                  <span />
                  {s.k}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
