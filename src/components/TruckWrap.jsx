import { useEffect, useId, useRef, useState } from 'react'
import { Globe, Smartphone, Clapperboard, Palette } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

const WRAP_STYLES = [
  { k: 'web', icon: Globe, img: IMG.cover, c1: '#234b34', c2: '#b8e86a', ink: '#f3efe3', sky: ['#bfe6f2', '#f4f8e6'], hill: ['#8fc46a', '#5f9a48'], fx: 'pollen' },
  { k: 'app', icon: Smartphone, img: IMG.garden, c1: '#16314f', c2: '#9fd3ff', ink: '#ffffff', sky: ['#c9d8e6', '#eef3f7'], hill: ['#9cc7a0', '#6c9f7a'], fx: 'pollen' },
  { k: 'video', icon: Clapperboard, img: IMG.canopy, c1: '#4a2f1b', c2: '#f4c35a', ink: '#fff6e4', sky: ['#f6c99a', '#fbecd6'], hill: ['#d9822b', '#a5521f'], fx: 'leaves' },
  { k: 'brand', icon: Palette, img: IMG.greenhouse, c1: '#0f4f4a', c2: '#e2f7b5', ink: '#f3efe3', sky: ['#cfeee6', '#f6fbef'], hill: ['#76b8a0', '#3f8a72'], fx: 'pollen' },
]

const HILL_A = 'M0 200 V120 C120 60 220 140 340 90 C460 40 560 130 680 80 C800 30 900 110 1000 120 V200Z'
const HILL_B = 'M0 200 V140 C90 110 180 160 300 120 C420 80 520 150 640 120 C760 90 880 150 1000 140 V200Z'

function Hills({ d, fill, cls }) {
  return (
    <div className={`tw-hills ${cls}`} aria-hidden="true">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d={d} style={{ fill }} />
        </svg>
      ))}
    </div>
  )
}

function Trees({ color }) {
  const trees = [40, 150, 210, 380, 460, 620, 700, 860, 930]
  return (
    <div className="tw-hills tw-trees" aria-hidden="true">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 1000 200" preserveAspectRatio="none">
          {trees.map((x, j) => (
            <g key={j} transform={`translate(${x} ${200 - (j % 3) * 6})`}>
              <rect x="-3" y="-30" width="6" height="30" fill="#4a3424" />
              <ellipse cx="0" cy={-48 - (j % 2) * 10} rx={20 + (j % 3) * 4} ry={30 + (j % 2) * 10} style={{ fill: color }} />
            </g>
          ))}
        </svg>
      ))}
    </div>
  )
}

function Device({ w, uid }) {
  if (w.k === 'app') {
    return (
      <g transform="translate(372 52)">
        <rect width="62" height="122" rx="12" fill="#111" />
        <clipPath id={`${uid}-ph-${w.k}`}><rect x="5" y="6" width="52" height="110" rx="8" /></clipPath>
        <g clipPath={`url(#${uid}-ph-${w.k})`}>
          <rect x="5" y="6" width="52" height="110" fill="#fff" />
          <image href={w.img} x="5" y="6" width="52" height="50" preserveAspectRatio="xMidYMid slice" />
          <rect x="10" y="62" width="34" height="6" rx="3" fill={w.c1} />
          <rect x="10" y="74" width="24" height="10" rx="5" fill={w.c2} />
          {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={10 + c * 22} y={90 + r * 13} width="19" height="10" rx="3" fill="#e2f1d4" />))}
        </g>
      </g>
    )
  }
  if (w.k === 'video') {
    return (
      <g transform="translate(366 50)">
        <rect width="74" height="126" rx="10" fill="#111" opacity="0.85" />
        <circle cx="37" cy="63" r="18" fill="rgba(255,255,255,.85)" />
        <path d="M32 53 L48 63 L32 73Z" fill={w.c1} />
        <rect x="8" y="104" width="40" height="5" rx="2.5" fill="#fff" />
        <rect x="8" y="113" width="26" height="4" rx="2" fill="rgba(255,255,255,.6)" />
        <circle cx="64" cy="14" r="4" fill="#ff4d4d" />
      </g>
    )
  }
  if (w.k === 'brand') {
    return (
      <g transform="translate(352 62)">
        <rect width="100" height="100" rx="20" fill="#fff" />
        <path d="M30 70 C30 46 46 30 70 30 C70 54 54 70 30 70Z" fill={w.c1} />
        {[w.c1, w.c2, '#f4c35a', '#4f8a4b'].map((c, i) => <circle key={c} cx={22 + i * 19} cy="88" r="6" fill={c} />)}
      </g>
    )
  }
  return (
    <g transform="translate(340 56)">
      <rect width="118" height="96" rx="8" fill="#fff" />
      <rect width="118" height="14" rx="8" fill="#eef0ea" />
      {[0, 1, 2].map((i) => <circle key={i} cx={9 + i * 8} cy="7" r="2.6" fill={i ? '#cfd5c8' : '#f08a7a'} />)}
      <image href={w.img} x="4" y="16" width="110" height="46" preserveAspectRatio="xMidYMid slice" />
      <rect x="8" y="68" width="66" height="7" rx="3" fill={w.c1} />
      <rect x="8" y="80" width="38" height="10" rx="5" fill={w.c2} />
    </g>
  )
}

function WrapArt({ w, uid }) {
  return (
    <g>
      <rect x="30" y="30" width="440" height="210" fill={w.c1} />
      <g clipPath={`url(#${uid}-diag)`}>
        <image href={w.img} x="200" y="30" width="270" height="210" preserveAspectRatio="xMidYMid slice" />
        <rect x="200" y="30" width="270" height="210" fill={w.c1} opacity="0.18" />
      </g>
      <path d="M196 240 L318 30 L344 30 L222 240Z" fill={w.c2} />
      <path d="M232 240 L354 30 L362 30 L240 240Z" fill={w.c2} opacity="0.5" />
      <g transform="translate(62 58)">
        <path d="M0 34C0 14 14 0 34 0c0 20-14 34-34 34z" fill={w.c2} />
        <path d="M0 34L20 14" stroke={w.c1} strokeWidth="2.4" />
      </g>
      <text x="64" y="112" className="tw-tag" fill={w.c2}>WEB · APPS · REELS · VIDEO · FOTO</text>
      <Device w={w} uid={uid} />
      <text x="62" y="140" className="tw-name" fill={w.ink}>{w.name[0]}</text>
      <text x="62" y="176" className="tw-name" fill={w.c2}>{w.name[1]}</text>
      <text x="64" y="202" className="tw-tag" fill={w.ink}>{w.tag}</text>
      <rect x="62" y="212" width="132" height="20" rx="10" fill={w.c2} />
      <text x="128" y="226" className="tw-phone" fill={w.c1} textAnchor="middle">{w.phone}</text>
      <g transform="translate(418 186)">
        <rect width="40" height="40" rx="6" fill="#fff" />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3, 4].map((c) =>
            (r * 7 + c * 3) % 4 !== 0 || (r % 4 === 0 && c % 4 === 0) ? (
              <rect key={`${r}-${c}`} x={5 + c * 6} y={5 + r * 6} width="5" height="5" fill={w.c1} />
            ) : null
          )
        )}
      </g>
    </g>
  )
}

function Wheel({ x }) {
  return (
    <g transform={`translate(${x} 268)`}>
      <circle r="40" fill="#141414" />
      <circle r="31" fill="#2a2a2a" />
      <g className="tw-spin">
        <circle r="20" fill="#b9bfc4" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect key={a} x="-2.5" y="-19" width="5" height="14" rx="2" fill="#6d7378" transform={`rotate(${a})`} />
        ))}
        <circle r="6" fill="#4b5055" />
      </g>
    </g>
  )
}

function useVisible(ref) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.25 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return v
}

export default function TruckWrap() {
  const uid = useId().replace(/:/g, '')
  const secRef = useRef(null)
  const visible = useVisible(secRef)
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(0)
  const [wipe, setWipe] = useState(1)
  const [hold, setHold] = useState(false)
  const [seen, setSeen] = useState(0)
  const raf = useRef(0)
  const { t } = useLanguage()
  const data = t.trucks

  const wraps = (data.wraps || []).map((w, i) => ({
    ...WRAP_STYLES[i],
    ...w,
  }))

  const pick = (n, user = false) => {
    if (user) setHold(true)
    if (n === cur || wipe < 1) return
    setPrev(cur)
    setCur(n)
    const t0 = performance.now()
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 1300)
      setWipe(k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2)
      if (k < 1) raf.current = requestAnimationFrame(step)
    }
    setWipe(0)
    raf.current = requestAnimationFrame(step)
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  useEffect(() => {
    if (!visible || hold) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => pick((cur + 1) % wraps.length), 5200)
    return () => clearTimeout(id)
  }, [visible, hold, cur, wipe, wraps.length])

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setSeen((s) => s + 3 + Math.floor(Math.random() * 9)), 120)
    return () => clearInterval(id)
  }, [visible])

  const w = wraps[cur] || WRAP_STYLES[0]
  const p = wraps[prev] || WRAP_STYLES[0]
  const edge = 30 + wipe * 440
  const painting = wipe > 0 && wipe < 1

  const specs = data.specs || [
    { k: '01 · Read in 2 seconds', p: "Name, one offer and a phone number. Nothing a driver behind you can't read at a red light." },
    { k: '02 · Your real work on it', p: 'We print your own job photos on the panel, not stock. Neighbours recognise the street.' },
    { k: '03 · Palette for', p: '' },
  ]

  return (
    <section className="section tw" id="truck-wrap" ref={secRef}>
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title} />
            </h2>
          </div>
          <p className="lead" data-reveal="">
            {data.lead}
          </p>
        </div>

        <div className="tw-tabs" role="tablist" aria-label="Choose a wrap" data-reveal="">
          {wraps.map((x, i) => {
            const I = x.icon
            return (
              <button
                key={x.k}
                type="button"
                role="tab"
                aria-selected={i === cur}
                className={i === cur ? 'on' : ''}
                onClick={() => pick(i, true)}
                style={{ '--c': x.c2, '--b': x.c1 }}
              >
                <I size={16} /> {x.label}
              </button>
            )
          })}
        </div>

        <div
          className={`tw-stage fx-${w.fx} ${visible ? 'run' : ''}`}
          data-reveal="scale"
          style={{ '--sky1': w.sky[0], '--sky2': w.sky[1], '--c1': w.c1, '--c2': w.c2 }}
        >
          <span className="tw-sun" aria-hidden="true" />
          <Hills d={HILL_A} fill={w.hill[1]} cls="far" />
          <Hills d={HILL_B} fill={w.hill[0]} cls="near" />
          <Trees color={w.hill[1]} />
          <div className="tw-road" aria-hidden="true" />

          <div className="tw-fx" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
              <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${(i % 7) * 0.9}s`, '--s': `${0.6 + (i % 4) * 0.25}`, '--t': `${5 + (i % 5)}s` }} />
            ))}
          </div>

          <div className="tw-truck">
            <svg viewBox="0 0 720 320" role="img" aria-label={`Box truck wrapped for ${w.name.join(' ')}`}>
              <defs>
                <clipPath id={`${uid}-box`}>
                  <rect x="30" y="30" width="440" height="210" rx="14" />
                </clipPath>
                <clipPath id={`${uid}-wipe`}>
                  <rect x="30" y="30" width={edge - 30} height="210" />
                </clipPath>
                <clipPath id={`${uid}-diag`}>
                  <path d="M330 30 H470 V240 H208Z" />
                </clipPath>
              </defs>

              <ellipse cx="370" cy="300" rx="340" ry="14" fill="rgba(0,0,0,.22)" />

              <g clipPath={`url(#${uid}-box)`}>
                <WrapArt w={p} uid={uid} />
                <g clipPath={`url(#${uid}-wipe)`}>
                  <WrapArt w={w} uid={uid} />
                </g>
                <rect x="30" y="30" width="440" height="210" fill="none" stroke="rgba(0,0,0,.15)" strokeWidth="2" />
                <path d="M30 60 H470" stroke="rgba(255,255,255,.12)" strokeWidth="3" />
              </g>

              {painting && (
                <g className="tw-roller">
                  <rect x={edge - 6} y="22" width="12" height="226" rx="6" fill={w.c2} />
                  <rect x={edge - 2} y="10" width="4" height="14" fill="#333" />
                  <circle cx={edge} cy="8" r="6" fill="#333" />
                  {[40, 80, 120, 160, 200].map((y, i) => (
                    <circle key={y} cx={edge + 12 + ((i * 7) % 10)} cy={y + (wipe * 300 + i * 13) % 20} r={2 + (i % 3)} fill={w.c2} opacity="0.7" />
                  ))}
                </g>
              )}

              <path className="tw-cab" style={{ fill: w.c1 }} d="M476 92 H600 C622 92 636 104 646 124 L690 196 C696 206 698 214 698 226 V258 C698 266 692 270 684 270 H476Z" />
              <path d="M498 108 H596 C608 108 616 114 622 124 L656 184 H498Z" fill="#cfe6f2" />
              <path d="M520 108 L548 108 L512 184 L498 184 L498 150Z" fill="rgba(255,255,255,.55)" />
              <path d="M586 196 V262" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
              <rect x="560" y="206" width="18" height="5" rx="2.5" fill="rgba(255,255,255,.6)" />
              <g transform="translate(508 206)">
                <path className="tw-cab-leaf" style={{ fill: w.c2 }} d="M0 26C0 11 11 0 26 0c0 15-11 26-26 26z" />
              </g>
              <rect x="684" y="204" width="14" height="16" rx="4" fill="#fff4c2" />
              <rect x="690" y="236" width="16" height="22" rx="4" fill="#1d1d1d" />
              <rect x="30" y="240" width="660" height="20" rx="6" fill="#1d1d1d" />
              <Wheel x={150} />
              <Wheel x={588} />
              <g className="tw-exhaust">
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx="20" cy="254" r={8 + i * 4} style={{ animationDelay: `${i * 0.35}s` }} />
                ))}
              </g>
            </svg>
          </div>

          <div className="tw-hud">
            <small>{data.impressions}</small>
            <b>{seen.toLocaleString()}</b>
          </div>
        </div>

        <div className="tw-specs">
          <div className="tw-spec" data-reveal="">
            <span className="tw-spec-k">{specs[0]?.k}</span>
            <p>{specs[0]?.p}</p>
          </div>
          <div className="tw-spec" data-reveal="" style={{ '--d': '0.08s' }}>
            <span className="tw-spec-k">{specs[1]?.k}</span>
            <p>{specs[1]?.p}</p>
          </div>
          <div className="tw-spec swatch" data-reveal="" style={{ '--d': '0.16s' }}>
            <span className="tw-spec-k">{specs[2]?.k} {w.name.join(' ')}</span>
            <div className="tw-swatches" key={w.k}>
              {[w.c1, w.c2, w.ink].map((c, i) => (
                <span key={c} style={{ background: c, '--i': i }}>
                  <small>{c.toUpperCase()}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
