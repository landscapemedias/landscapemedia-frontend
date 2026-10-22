import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, Printer, Clapperboard, Mail, Play, Headphones, PhoneCall } from 'lucide-react'
import { IMG, BRAND, HERO_TOASTS } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId, useMouse } from '../hooks'

const ICONS = [CalendarCheck, Headphones, PhoneCall, Printer, Clapperboard, Mail]

function seeded(n) {
  let s = n
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function Trees({ count, y, h, color, seed, sway }) {
  const items = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: count }, (_, i) => ({
      x: (i / count) * 1500 - 30 + r() * 40,
      s: 0.6 + r() * 0.7,
      t: r() > 0.45 ? 'pine' : 'round',
      d: r() * -6,
    }))
  }, [count, seed])
  return (
    <g fill={color}>
      {items.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${y}) scale(${t.s})`}>
          <g className={sway ? 'sway' : ''} style={{ animationDelay: `${t.d}s` }}>
            {t.t === 'pine' ? (
              <>
                <rect x="-2.5" y={-h * 0.25} width="5" height={h * 0.25} />
                <path d={`M0 ${-h} L${h * 0.28} ${-h * 0.45} L${h * 0.14} ${-h * 0.45} L${h * 0.36} ${-h * 0.15} L${-h * 0.36} ${-h * 0.15} L${-h * 0.14} ${-h * 0.45} L${-h * 0.28} ${-h * 0.45}Z`} />
              </>
            ) : (
              <>
                <rect x="-2.5" y={-h * 0.4} width="5" height={h * 0.4} />
                <circle cx="0" cy={-h * 0.62} r={h * 0.3} />
                <circle cx={-h * 0.16} cy={-h * 0.5} r={h * 0.2} />
                <circle cx={h * 0.18} cy={-h * 0.52} r={h * 0.21} />
              </>
            )}
          </g>
        </g>
      ))}
    </g>
  )
}

function Grass() {
  const blades = useMemo(() => {
    const r = seeded(7)
    return Array.from({ length: 180 }, (_, i) => ({ x: (i / 180) * 1460 - 10, h: 14 + r() * 26, c: r() * 10 - 5, d: r() * -4 }))
  }, [])
  return (
    <g className="grass" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none">
      {blades.map((b, i) => (
        <path key={i} className="blade" style={{ animationDelay: `${b.d}s` }} d={`M${b.x} 322 Q${b.x + b.c} ${322 - b.h * 0.6} ${b.x + b.c * 1.6} ${322 - b.h}`} />
      ))}
    </g>
  )
}

export default function Hero() {
  const m = useMouse()
  const [y, setY] = useState(0)
  const [toast, setToast] = useState(0)

  useEffect(() => {
    let raf = 0
    const on = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0
        setY(window.scrollY)
      })
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setToast((t) => (t + 1) % HERO_TOASTS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const layer = (k, ky = 0) => ({ transform: `translate3d(${m.x * k}px, ${y * ky}px, 0)` })
  const T = HERO_TOASTS[toast]
  const Icon = ICONS[toast % ICONS.length] || CalendarCheck

  return (
    <section className="hero" id="top">
      <div className="hero-sun" style={{ transform: `translate3d(${m.x * -30}px, ${y * 0.3 + m.y * -20}px, 0)` }} />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow" data-reveal="">Digital Services & Media for Landscape Companies</span>
          <h1 className="h-display h-xl hero-title">
            <Words text="We grow" delay={0.1} />
            <br />
            <Words text="landscape" delay={0.25} />
            <br />
            <span className="split-words" data-reveal="" style={{ '--d': '0.4s' }}>
              <span className="w"><span style={{ '--i': 0 }}><em>brands.</em></span></span>
            </span>
            <span className="hero-sprout" aria-hidden="true">
              <svg viewBox="0 0 60 60">
                <path className="hs-stem" d="M30 58 C30 46 30 38 30 28" />
                <path className="hs-l1" d="M30 36 C30 24 38 16 52 14 C52 28 44 36 30 36Z" />
                <path className="hs-l2" d="M30 42 C30 32 22 26 10 25 C10 36 18 42 30 42Z" />
              </svg>
            </span>
          </h1>
          <p className="lead hero-lead" data-reveal="" style={{ '--d': '0.7s' }}>
            Complete digital services for landscape companies. We turn your finest plants, garden designs, and outdoor craftsmanship into booking-ready websites, cinematic video reels, client apps, and high-ticket customer acquisition.
          </p>
          <div className="hero-actions" data-reveal="" style={{ '--d': '0.85s' }}>
            <Btn onClick={() => scrollToId('book')}>Book a strategy call</Btn>
            <button className="hero-play" onClick={() => scrollToId('mockups')} data-cursor="Watch">
              <span className="hp-ring">
                <Play size={16} fill="currentColor" />
              </span>
              See the mockups
            </button>
          </div>
          <ul className="hero-trust" data-reveal="" style={{ '--d': '1s' }}>
            <li>Digital services</li>
            <li>Plant & garden media</li>
            <li>24/7 Live answering</li>
            <li>Vanity numbers</li>
          </ul>
        </div>

        <div className="hero-visual" data-reveal="scale" style={{ '--d': '0.3s' }}>
          <div className="hero-arch" style={{ transform: `translate3d(${m.x * -14}px, ${m.y * -10}px, 0)` }}>
            <img src={IMG.cover} alt="Landscaped estate garden photographed for a client showcase" style={{ transform: `scale(1.15) translate3d(${m.x * 12}px, ${y * 0.06}px, 0)` }} />
            <div className="arch-shine" />
            <div className="arch-tag">
              <span>Now filming</span>
              <b>Estate garden reel</b>
            </div>
          </div>
          <div className="hero-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="circ" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#circ">BRANDING · REELS · SOCIAL · EMAIL · APPS ·</textPath>
              </text>
            </svg>
            <span className="hb-core">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="var(--sprout)" />
              </svg>
            </span>
          </div>
          <div className="hero-toast" key={toast} style={{ transform: `translate3d(${m.x * 24}px, ${m.y * 16}px, 0)` }}>
            <span className="ht-ico">
              <Icon size={18} />
            </span>
            <span className="ht-txt">
              <b>{T.title}</b>
              <small>{T.sub}</small>
            </span>
            <span className="ht-val">{T.value}</span>
          </div>
          <div className="hero-stat" style={{ transform: `translate3d(${m.x * 34}px, ${m.y * 22}px, 0)` }}>
            <small>Average lead growth</small>
            <b>
              3<span>x leads</span>
            </b>
            <svg viewBox="0 0 120 36" className="hs-spark">
              <path d="M0 30 L15 26 L30 28 L45 20 L60 22 L75 14 L90 16 L105 6 L120 4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="hero-land" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="land-svg">
          <g style={layer(-10, -0.02)}>
            <path d="M0 170 C180 120 320 150 480 130 C660 108 760 150 940 128 C1120 106 1260 140 1440 120 L1440 320 L0 320Z" fill="#d6e8c8" />
            <Trees count={26} y={150} h={50} color="#b8d6a6" seed={3} />
          </g>
          <g style={layer(-22, -0.04)}>
            <path d="M0 210 C200 170 360 200 560 180 C760 160 900 205 1100 185 C1260 170 1360 190 1440 180 L1440 320 L0 320Z" fill="#8fbf7a" />
            <Trees count={18} y={200} h={70} color="#5f9a55" seed={11} sway />
          </g>
          <g style={layer(-38, -0.06)}>
            <path d="M0 255 C220 220 420 250 640 236 C860 222 1020 260 1240 244 C1340 238 1400 246 1440 244 L1440 320 L0 320Z" fill="var(--moss)" />
            <Trees count={11} y={250} h={96} color="#24503a" seed={23} sway />
          </g>
          <g style={layer(-60, 0)}>
            <path d="M0 300 C240 278 520 298 760 288 C1000 278 1220 300 1440 290 L1440 320 L0 320Z" fill="var(--ink)" />
            <Grass />
          </g>
        </svg>
      </div>
    </section>
  )
}
