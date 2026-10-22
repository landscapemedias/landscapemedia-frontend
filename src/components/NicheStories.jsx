import { useMemo } from 'react'
import { Check, Image, Clapperboard, Share2, Mail, ArrowUpRight } from 'lucide-react'
import { NICHES } from '../data/site'
import { Words, Btn } from './ui'
import { scrollToId } from '../hooks'

function seeded(n) {
  let s = n
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function SnowScene() {
  const flakes = useMemo(() => {
    const r = seeded(4)
    return Array.from({ length: 40 }, () => ({ x: r() * 400, d: r() * -6, t: 4 + r() * 4, s: 1 + r() * 2.4 }))
  }, [])
  return (
    <svg viewBox="0 0 400 300" className="nsx snow">
      <defs>
        <linearGradient id="snSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14283a" />
          <stop offset="1" stopColor="#35576e" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#snSky)" />
      <circle cx="330" cy="60" r="20" fill="#f3efe3" opacity=".9" />
      <g className="sn-house">
        <path d="M60 210 V150 L120 110 L180 150 V210Z" fill="#0c1f17" />
        <path d="M52 154 L120 104 L188 154 L120 96Z" fill="#f7f9fb" />
        <rect x="104" y="170" width="22" height="40" fill="#f4c35a" className="sn-win" />
        <rect x="140" y="160" width="20" height="18" fill="#f4c35a" className="sn-win d2" />
      </g>
      <path d="M0 210 C120 200 280 204 400 198 L400 300 L0 300Z" fill="#eef4f8" />
      <path className="sn-drive" d="M126 212 L170 300 L250 300 L150 212Z" fill="#3b4a52" />
      <g className="sn-truck">
        <rect x="-46" y="-26" width="44" height="22" rx="4" fill="#b8e86a" />
        <rect x="-30" y="-40" width="24" height="16" rx="3" fill="#0c1f17" />
        <path d="M0 -24 L14 -30 L14 0 L0 -6Z" fill="#f4c35a" />
        <circle cx="-36" cy="-2" r="7" fill="#0c1f17" />
        <circle cx="-12" cy="-2" r="7" fill="#0c1f17" />
        <circle className="sn-beacon" cx="-18" cy="-42" r="3" fill="#f4c35a" />
      </g>
      <g className="sn-flakes">
        {flakes.map((f, i) => (
          <circle key={i} cx={f.x} cy="-10" r={f.s} fill="#fff" style={{ animationDelay: `${f.d}s`, animationDuration: `${f.t}s` }} />
        ))}
      </g>
    </svg>
  )
}

function TreeScene() {
  const chips = [0, 1, 2, 3, 4, 5]
  return (
    <svg viewBox="0 0 400 300" className="nsx tree">
      <rect width="400" height="300" fill="#dcefd2" />
      <circle cx="70" cy="60" r="26" fill="#f4c35a" opacity=".8" />
      <g className="tr-crane">
        <rect x="300" y="60" width="10" height="200" fill="#c9784a" />
        <path d="M305 64 L197 38" stroke="#c9784a" strokeWidth="8" strokeLinecap="round" />
        <rect x="292" y="250" width="30" height="20" rx="3" fill="#0c1f17" />
      </g>
      <path d="M0 262 C120 254 280 256 400 260 L400 300 L0 300Z" fill="#4f8a4b" />
      <rect x="186" y="170" width="22" height="94" fill="#6b4a2f" />
      <path className="tr-cut" d="M182 172 H212" stroke="#f3efe3" strokeWidth="3" strokeDasharray="4 4" />
      <g className="tr-top">
        <line x1="197" y1="40" x2="197" y2="96" stroke="#0c1f17" strokeWidth="2" className="tr-rope" />
        <rect x="188" y="120" width="18" height="52" fill="#6b4a2f" />
        <circle cx="197" cy="110" r="44" fill="#2e5e3e" />
        <circle cx="166" cy="128" r="30" fill="#4f8a4b" />
        <circle cx="228" cy="126" r="32" fill="#4f8a4b" />
        <circle cx="197" cy="86" r="28" fill="#76b852" />
      </g>
      <g className="tr-chips">
        {chips.map((c) => (
          <rect key={c} x="196" y="172" width="5" height="5" fill="#c9a37a" style={{ '--c': c }} />
        ))}
      </g>
      <g className="tr-saw">
        <rect x="214" y="164" width="34" height="14" rx="4" fill="#f4c35a" />
        <rect x="196" y="168" width="22" height="6" rx="2" fill="#9aa39d" />
      </g>
    </svg>
  )
}

function MowScene() {
  const stripes = [0, 1, 2, 3, 4, 5, 6]
  return (
    <svg viewBox="0 0 400 300" className="nsx mow">
      <rect width="400" height="300" fill="#e6f3d3" />
      <path d="M0 96 L400 96 L400 300 L0 300Z" fill="#5f9a55" />
      {stripes.map((s) => (
        <rect key={s} className="mw-stripe" x="0" y={96 + s * 30} width="400" height="30" fill={s % 2 ? '#4f8a4b' : '#76b852'} style={{ '--s': s }} />
      ))}
      <g className="mw-mower">
        <rect x="-30" y="-14" width="34" height="20" rx="5" fill="#0c1f17" />
        <rect x="-26" y="-10" width="18" height="6" rx="2" fill="#b8e86a" />
        <path d="M-28 -12 L-46 -40" stroke="#0c1f17" strokeWidth="4" strokeLinecap="round" />
        <circle cx="-22" cy="8" r="5" fill="#333" />
        <circle cx="-2" cy="8" r="5" fill="#333" />
      </g>
      <g className="mw-cal" transform="translate(212 0)">
        <rect x="14" y="14" width="164" height="62" rx="12" fill="#fff" />
        {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
          <g key={i} transform={`translate(${30 + i * 30} 30)`}>
            <rect width="24" height="32" rx="6" className={`mw-day ${i === 1 || i === 3 ? 'on' : ''}`} style={{ '--i': i }} />
            <text x="12" y="21" textAnchor="middle">{d}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function SproutScene() {
  const cells = useMemo(() => {
    const out = []
    for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) out.push({ x: 64 + c * 38, y: 170 + r * 34, d: (r * 8 + c) * 0.08 })
    return out
  }, [])
  return (
    <svg viewBox="0 0 400 300" className="nsx sprout">
      <rect width="400" height="300" fill="#f3efe3" />
      <g className="sp-sun">
        <circle cx="330" cy="64" r="26" fill="#f4c35a" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="328" y="22" width="4" height="12" rx="2" fill="#f4c35a" transform={`rotate(${a} 330 64)`} />
        ))}
      </g>
      <rect x="44" y="150" width="312" height="120" rx="12" fill="#6b4a2f" />
      <rect x="52" y="158" width="296" height="104" rx="8" fill="#3d2a1a" />
      {cells.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y + 22})`} className="sp-plant" style={{ '--d': `${c.d}s` }}>
          <path className="sp-stem" d="M0 0 V-22" stroke="#76b852" strokeWidth="2.5" strokeLinecap="round" />
          <path className="sp-leaf l" d="M0 -20 C-4 -30 -14 -30 -16 -24 C-12 -18 -4 -18 0 -20Z" fill="#b8e86a" />
          <path className="sp-leaf r" d="M0 -20 C4 -30 14 -30 16 -24 C12 -18 4 -18 0 -20Z" fill="#9ad66a" />
        </g>
      ))}
      <g className="sp-tag">
        <rect x="40" y="84" width="140" height="40" rx="20" fill="#0c1f17" />
        <text x="110" y="109" textAnchor="middle">100% organic</text>
      </g>
    </svg>
  )
}

function GreenhouseScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx gh">
      <rect width="400" height="300" fill="#e2f0ea" />
      <path d="M0 250 C120 244 280 244 400 250 L400 300 L0 300Z" fill="#4f8a4b" />
      <g className="gh-glass">
        <path d="M90 250 V150 L200 80 L310 150 V250Z" fill="rgba(184,232,106,.22)" />
        <path d="M90 150 L200 80 L310 150Z" fill="rgba(255,255,255,.45)" />
      </g>
      <g className="gh-frame" fill="none" stroke="#2e5e3e" strokeWidth="4" strokeLinejoin="round">
        <path d="M90 250 V150 L200 80 L310 150 V250Z" />
        <path d="M145 250 V115 M200 250 V80 M255 250 V115 M90 200 H310 M90 150 H310" />
      </g>
      {[110, 160, 230, 280].map((x, i) => (
        <g key={x} className="gh-plant" style={{ '--i': i }} transform={`translate(${x} 250)`}>
          <rect x="-12" y="-14" width="24" height="14" rx="2" fill="#c9784a" />
          <circle cy="-30" r="16" fill={i % 2 ? '#76b852' : '#4f8a4b'} />
          <circle cx="-9" cy="-22" r="10" fill="#9ad66a" />
        </g>
      ))}
      <rect className="gh-shine" x="0" y="60" width="40" height="200" fill="rgba(255,255,255,.5)" />
    </svg>
  )
}

function VerandaScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx ver">
      <defs>
        <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c48a" />
          <stop offset="1" stopColor="#f3e3d0" />
        </linearGradient>
        <clipPath id="vClip">
          <rect x="150" y="96" width="220" height="150" />
        </clipPath>
      </defs>
      <rect width="400" height="300" fill="url(#vSky)" />
      <circle className="v-sun" cx="300" cy="150" r="30" fill="#f4a35a" />
      <rect x="20" y="60" width="140" height="200" fill="#e6dfcb" />
      <rect x="44" y="100" width="40" height="56" fill="#0c1f17" opacity=".75" />
      <path d="M0 246 H400 V300 H0Z" fill="#4f8a4b" />
      <path d="M150 96 L370 120" stroke="#0c1f17" strokeWidth="6" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="v-pane" x={150 + i * 55} y="100" width="55" height="146" fill="rgba(200,230,240,.42)" stroke="#0c1f17" strokeWidth="3" style={{ '--i': i }} />
      ))}
      <g clipPath="url(#vClip)">
        <rect className="v-shine" x="120" y="80" width="30" height="200" fill="rgba(255,255,255,.6)" transform="skewX(-20)" />
      </g>
      <g className="v-chair">
        <rect x="200" y="214" width="34" height="8" rx="3" fill="#6b4a2f" />
        <rect x="204" y="222" width="4" height="22" fill="#6b4a2f" />
        <rect x="226" y="222" width="4" height="22" fill="#6b4a2f" />
        <circle cx="300" cy="230" r="16" fill="#76b852" />
        <rect x="292" y="232" width="16" height="14" fill="#c9784a" />
      </g>
    </svg>
  )
}

function PlanScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx plan">
      <defs>
        <pattern id="pGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="rgba(255,255,255,.12)" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="#1f4f6b" />
      <rect width="400" height="300" fill="url(#pGrid)" />
      <g className="pl-draw" fill="none" stroke="#e8f3f8" strokeWidth="2.5">
        <path d="M50 50 H250 V200 H50Z" />
        <path d="M50 130 H150 V200" />
        <path d="M150 50 V100 H250" />
        <circle cx="100" cy="90" r="22" />
        <path d="M270 70 C330 60 360 120 330 170 C300 220 260 220 270 250" strokeDasharray="6 6" />
        <path d="M60 230 H240 M60 224 V236 M240 224 V236" />
      </g>
      <g className="pl-trees">
        {[[200, 160], [220, 130], [180, 170]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="#76b852" style={{ '--i': i }} />
        ))}
      </g>
      <g className="pl-stamp">
        <rect x="236" y="150" width="140" height="52" rx="8" fill="none" stroke="#b8e86a" strokeWidth="4" />
        <text x="306" y="184" textAnchor="middle">APPROVED</text>
      </g>
    </svg>
  )
}

const SCENES = [SnowScene, TreeScene, MowScene, SproutScene, GreenhouseScene, VerandaScene, PlanScene]
const CH = [
  { icon: Image, k: 'Flyer', f: 'head' },
  { icon: Clapperboard, k: 'Reel', f: 'reel' },
  { icon: Share2, k: 'Post', f: 'post' },
  { icon: Mail, k: 'Email', f: 'mail' },
]

export default function NicheStories() {
  return (
    <section className="section nstories" id="niches">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Specialized Digital Media</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Digital media for every" />
              <br />
              <Words text="service you sell." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Lawn maintenance, organic plant farms, tree surgery, greenhouses, and snow removal each have unique buyers. We build dedicated digital playbooks with targeted visuals, reels, and landing pages for each service you sell.
          </p>
        </div>

        <nav className="nx-jump" data-reveal="">
          {NICHES.map((n, i) => (
            <a key={n.k} href={`#niche-${i}`} onClick={(e) => { e.preventDefault(); scrollToId(`niche-${i}`) }}>
              <small>0{i + 1}</small>
              {n.short}
            </a>
          ))}
        </nav>

        <div className="nx-list">
          {NICHES.map((n, i) => {
            const Scene = SCENES[i]
            return (
              <article key={n.k} id={`niche-${i}`} className={`nx-row ${i % 2 ? 'flip' : ''}`}>
                <div className="nx-scene" data-reveal="scale" style={{ '--hue': n.hue }}>
                  <Scene />
                  <span className="nx-badge">{n.badge}</span>
                  <span className="nx-stat">
                    <b>{n.stat[0]}</b>
                    <small>{n.stat[1]}</small>
                  </span>
                </div>
                <div className="nx-body">
                  <span className="nx-num" data-reveal="">0{i + 1} / 0{NICHES.length}</span>
                  <h3 className="h-display" data-reveal="" style={{ '--d': '0.05s' }}>{n.k}</h3>
                  <p data-reveal="" style={{ '--d': '0.1s' }}>{n.lead}</p>
                  <ul className="nx-points" data-reveal="" style={{ '--d': '0.15s' }}>
                    {n.points.map((p, k) => (
                      <li key={p} style={{ '--i': k }}>
                        <span><Check size={13} strokeWidth={3} /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="nx-media" data-reveal="" style={{ '--d': '0.2s' }}>
                    {CH.map((c, k) => (
                      <div key={c.k} className="nx-m" style={{ '--i': k }}>
                        <c.icon size={15} />
                        <small>{c.k}</small>
                        <b>{n[c.f]}</b>
                      </div>
                    ))}
                  </div>
                  <div data-reveal="" style={{ '--d': '0.25s' }}>
                    <Btn onClick={() => scrollToId('book')}>Grow my {n.short.toLowerCase()} business</Btn>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="nx-more" data-reveal="">
          <p>Sell something else outdoors? Hardscape, irrigation, pools, fencing, lighting.</p>
          <button onClick={() => scrollToId('book')}>
            We build a playbook for it <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
