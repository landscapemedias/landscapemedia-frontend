import { useMemo } from 'react'
import { Check, Image, Clapperboard, Share2, Mail, ArrowUpRight } from 'lucide-react'
import { IMG } from '../data/site'
import { Words, Btn } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const NICHE_ASSETS = [
  { img: IMG.snow, hue: '#dfe9f1' },
  { img: IMG.canopy, hue: '#e3eedb' },
  { img: IMG.trimmer, hue: '#e9f5d4' },
  { img: IMG.micro, hue: '#eef6dc' },
  { img: IMG.greenhouse, hue: '#e6f2e1' },
  { img: IMG.glass, hue: '#e8eef0' },
  { img: IMG.plans, hue: '#f3ecdc' },
]

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
        <circle cx="-24" cy="8" r="6" fill="#b8e86a" />
        <circle cx="-4" cy="8" r="6" fill="#b8e86a" />
        <path d="M-28 -4 H-10" stroke="#b8e86a" strokeWidth="2" />
      </g>
    </svg>
  )
}

function SproutScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx micro">
      <rect width="400" height="300" fill="#f1f7e4" />
      <path d="M0 240 C100 236 300 236 400 240 L400 300 L0 300Z" fill="#4d3420" />
      <g className="sp-tray">
        <rect x="50" y="220" width="300" height="28" rx="6" fill="#2a1c10" />
        {Array.from({ length: 18 }).map((_, i) => (
          <g key={i} transform={`translate(${72 + i * 15} 220)`} className="sp-sprout" style={{ animationDelay: `${(i % 5) * 0.25}s` }}>
            <line x1="0" y1="0" x2="0" y2="-28" stroke="#8fc46a" strokeWidth="2.5" />
            <circle cx="-4" cy="-30" r="5" fill="#b8e86a" />
            <circle cx="4" cy="-30" r="5" fill="#b8e86a" />
          </g>
        ))}
      </g>
    </svg>
  )
}

function GreenhouseScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx green">
      <defs>
        <linearGradient id="ghSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfeee6" />
          <stop offset="1" stopColor="#f3efe3" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ghSky)" />
      <path d="M0 240 H400 V300 H0Z" fill="#3f8a72" />
      <g className="gh-frame">
        <path d="M80 240 V130 L200 60 L320 130 V240Z" fill="rgba(255,255,255,.35)" stroke="#0c1f17" strokeWidth="3" />
        <line x1="200" y1="60" x2="200" y2="240" stroke="#0c1f17" strokeWidth="2" />
        <line x1="140" y1="95" x2="140" y2="240" stroke="#0c1f17" strokeWidth="1.5" />
        <line x1="260" y1="95" x2="260" y2="240" stroke="#0c1f17" strokeWidth="1.5" />
        <line x1="80" y1="130" x2="320" y2="130" stroke="#0c1f17" strokeWidth="2" />
        <line x1="80" y1="185" x2="320" y2="185" stroke="#0c1f17" strokeWidth="1.5" />
      </g>
      <g className="gh-plants">
        {[100, 140, 180, 220, 260].map((x) => (
          <ellipse key={x} cx={x} cy="235" rx="14" ry="20" fill="#76b852" />
        ))}
      </g>
    </svg>
  )
}

function VerandaScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx glass">
      <defs>
        <linearGradient id="vrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9dfb8" />
          <stop offset="1" stopColor="#e4eeea" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#vrSky)" />
      <circle cx="80" cy="90" r="34" fill="#f4a24a" opacity=".7" />
      <path d="M0 230 C120 226 280 226 400 230 L400 300 L0 300Z" fill="#355746" />
      <g className="vr-house">
        <rect x="180" y="80" width="220" height="150" fill="#2b3b33" />
        <polygon points="180,80 320,30 400,60 400,80" fill="#1b2822" />
      </g>
      <g className="vr-veranda">
        <polygon points="80,140 220,110 220,230 80,230" fill="rgba(255,255,255,.45)" stroke="#0c1f17" strokeWidth="2.5" />
        <line x1="150" y1="125" x2="150" y2="230" stroke="#0c1f17" strokeWidth="2" />
        <line x1="80" y1="175" x2="220" y2="170" stroke="#0c1f17" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

function PlanScene() {
  return (
    <svg viewBox="0 0 400 300" className="nsx plan">
      <rect width="400" height="300" fill="#203a30" />
      <g stroke="#2f5446" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`x-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`y-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      <g className="pl-lines" fill="none" stroke="#b8e86a" strokeWidth="2.5">
        <rect x="70" y="60" width="180" height="180" rx="8" />
        <path d="M120 60 V240 M70 150 H250" strokeDasharray="4 4" />
        <circle cx="160" cy="150" r="50" stroke="#e2f7b5" />
      </g>
      <g className="pl-trees">
        {[[200, 160], [220, 130], [180, 170]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="#76b852" style={{ '--i': i }} />
        ))}
      </g>
      <g className="pl-stamp">
        <rect x="236" y="150" width="140" height="52" rx="8" fill="none" stroke="#b8e86a" strokeWidth="4" />
        <text x="306" y="184" textAnchor="middle" fill="#b8e86a" fontSize="16" fontWeight="bold">APPROVED</text>
      </g>
    </svg>
  )
}

const SCENES = [SnowScene, TreeScene, MowScene, SproutScene, GreenhouseScene, VerandaScene, PlanScene]

export default function NicheStories() {
  const { t, lang } = useLanguage()
  const data = t.niches || {}
  const list = data.list || []

  const niches = list.map((n, idx) => ({
    ...NICHE_ASSETS[idx],
    ...n,
  }))

  const ch = [
    { icon: Image, k: lang === 'es' ? 'Folleto' : 'Flyer', f: 'head' },
    { icon: Clapperboard, k: 'Reel', f: 'reel' },
    { icon: Share2, k: lang === 'es' ? 'Publicación' : 'Post', f: 'post' },
    { icon: Mail, k: lang === 'es' ? 'Correo' : 'Email', f: 'mail' },
  ]

  return (
    <section className="section nstories" id="niches">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <nav className="nx-jump" data-reveal="">
          {niches.map((n, i) => (
            <a key={n.k || i} href={`#niche-${i}`} onClick={(e) => { e.preventDefault(); scrollToId(`niche-${i}`) }}>
              <small>0{i + 1}</small>
              {n.short}
            </a>
          ))}
        </nav>

        <div className="nx-list">
          {niches.map((n, i) => {
            const Scene = SCENES[i] || SnowScene
            return (
              <article key={n.k || i} id={`niche-${i}`} className={`nx-row ${i % 2 ? 'flip' : ''}`}>
                <div className="nx-scene" data-reveal="scale" style={{ '--hue': n.hue }}>
                  <Scene />
                  <span className="nx-badge">{n.badge}</span>
                  <span className="nx-stat">
                    <b>{n.stat?.[0]}</b>
                    <small>{n.stat?.[1]}</small>
                  </span>
                </div>
                <div className="nx-body">
                  <span className="nx-num" data-reveal="">0{i + 1} / 0{niches.length}</span>
                  <h3 className="h-display" data-reveal="" style={{ '--d': '0.05s' }}>{n.k}</h3>
                  <p data-reveal="" style={{ '--d': '0.1s' }}>{n.lead}</p>
                  <ul className="nx-points" data-reveal="" style={{ '--d': '0.15s' }}>
                    {(n.points || []).map((p, k) => (
                      <li key={p} style={{ '--i': k }}>
                        <span><Check size={13} strokeWidth={3} /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="nx-media" data-reveal="" style={{ '--d': '0.2s' }}>
                    {ch.map((c, k) => (
                      <div key={c.k} className="nx-m" style={{ '--i': k }}>
                        <c.icon size={15} />
                        <small>{c.k}</small>
                        <b>{n[c.f]}</b>
                      </div>
                    ))}
                  </div>
                  <div data-reveal="" style={{ '--d': '0.25s' }}>
                    <Btn onClick={() => scrollToId('book')}>
                      {data.growBusinessBtn ? `${data.growBusinessBtn} ${(n.short || '').toLowerCase()}` : `Grow my ${(n.short || '').toLowerCase()} business`}
                    </Btn>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="nx-more" data-reveal="">
          <p>{data.moreText}</p>
          <button onClick={() => scrollToId('book')}>
            {data.buildPlaybookBtn} <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
