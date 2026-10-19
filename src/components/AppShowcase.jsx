import { useEffect, useState } from 'react'
import { Home, Truck, ClipboardCheck, CalendarPlus, Bell, Zap, CreditCard, Check, Star, Smartphone, Leaf as LeafIco, MapPin, Battery, Wifi, Signal } from 'lucide-react'
import { IMG, BRAND } from '../data/site'
import { Words } from './ui'
import { useMouse } from '../hooks'

const FEATURES = [
  { icon: Home, t: 'Property dashboard', d: 'Next visit, property health score and every service in one place.' },
  { icon: Truck, t: 'Live crew tracking', d: 'See your crew on the map and get a heads up before they arrive.' },
  { icon: ClipboardCheck, t: 'Photo visit reports', d: 'Before and after photos with a checklist after every visit.' },
  { icon: CalendarPlus, t: 'Book in seconds', d: 'Request pruning, cleanups or a storm crew with two taps.' },
]

const NOTES = [
  { icon: Truck, t: 'Crew arriving in 12 min', c: 'a' },
  { icon: Check, t: 'Visit report ready', c: 'b' },
  { icon: CreditCard, t: 'Invoice paid · $240', c: 'c' },
  { icon: Zap, t: 'Storm alert for Melville', c: 'd' },
]

function StatusBar() {
  return (
    <div className="ph-status">
      <span>9:41</span>
      <span className="ph-icons">
        <Signal size={11} />
        <Wifi size={11} />
        <Battery size={13} />
      </span>
    </div>
  )
}

function ScreenHome() {
  return (
    <div className="scr scr-home">
      <div className="sh-top">
        <div>
          <small>Good morning</small>
          <b>Sarah</b>
        </div>
        <span className="sh-bell">
          <Bell size={15} />
          <i />
        </span>
      </div>
      <div className="sh-next">
        <small>Next visit</small>
        <b>Weekly maintenance</b>
        <span>Thu, 8:30 AM · Crew 4</span>
        <LeafIco size={60} className="sh-leaf" />
      </div>
      <div className="sh-score">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" className="r0" />
          <circle cx="30" cy="30" r="25" className="r1" />
        </svg>
        <div>
          <b>92</b>
          <small>Property health</small>
        </div>
      </div>
      <div className="sh-grid">
        {[
          [CalendarPlus, 'Book'],
          [ClipboardCheck, 'Reports'],
          [Zap, 'Storm SOS'],
          [CreditCard, 'Pay'],
        ].map(([I, l], i) => (
          <span key={l} style={{ '--i': i }}>
            <I size={16} />
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScreenTrack() {
  return (
    <div className="scr scr-track">
      <div className="st-map">
        <svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="220" fill="#e7efdf" />
          <path d="M0 160 C60 150 90 190 200 170 L200 220 L0 220Z" fill="#cfe2c0" />
          <g stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round">
            <path d="M-10 60 L210 80" />
            <path d="M70 -10 L90 230" />
            <path d="M150 -10 L130 230" />
          </g>
          <path id="route" d="M30 200 C60 170 80 120 86 90 C92 60 120 70 140 40" className="st-route" />
          <circle cx="140" cy="40" r="16" fill="rgba(46,94,62,.18)" className="st-ping" />
          <circle cx="140" cy="40" r="7" fill="var(--moss)" />
          <g className="st-truck">
            <circle r="11" fill="var(--ink)" />
            <path d="M-5 -2h6v5h-6z M1 0h3l2 2v1h-5z" fill="var(--sprout)" />
          </g>
        </svg>
        <span className="st-eta">
          <b>12</b> min
        </span>
      </div>
      <div className="st-card">
        <span className="st-av">
          <img src={IMG.crew} alt="" />
        </span>
        <div>
          <b>Crew 4 · Marco</b>
          <small>
            <Star size={10} fill="currentColor" /> 4.9 · ISA certified
          </small>
        </div>
        <span className="st-call">
          <MapPin size={14} />
        </span>
      </div>
      <div className="st-steps">
        <span className="done">Left yard</span>
        <span className="now">On the way</span>
        <span>Arrived</span>
      </div>
    </div>
  )
}

function ScreenReport() {
  return (
    <div className="scr scr-report">
      <b className="sr-h">Visit report</b>
      <small className="sr-d">Thu, Oct 15 · 2h 10m</small>
      <div className="sr-pics">
        <span>
          <img src={IMG.garden} alt="" />
          <i>Before</i>
        </span>
        <span>
          <img src={IMG.path} alt="" />
          <i>After</i>
        </span>
      </div>
      <ul className="sr-list">
        {['Lawn mowed & edged', 'Beds weeded & mulched', 'Shrubs pruned', 'Debris cleared'].map((t, i) => (
          <li key={t} style={{ '--i': i }}>
            <span>
              <Check size={10} strokeWidth={4} />
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div className="sr-rate">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={16} fill="currentColor" style={{ '--i': i }} />
        ))}
      </div>
    </div>
  )
}

function ScreenBook() {
  return (
    <div className="scr scr-book">
      <b className="sr-h">Book a service</b>
      <div className="sb-list">
        {['Tree pruning', 'Seasonal cleanup', 'Lawn aeration'].map((t, i) => (
          <span key={t} className={i === 0 ? 'on' : ''}>
            <LeafIco size={14} />
            {t}
            <i />
          </span>
        ))}
      </div>
      <div className="sb-days">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <span key={d} className={i === 2 ? 'on' : ''}>
            <small>{d}</small>
            <b>{19 + i}</b>
          </span>
        ))}
      </div>
      <div className="sb-times">
        {['9:00', '11:30', '2:00'].map((t, i) => (
          <span key={t} className={i === 1 ? 'on' : ''}>
            {t}
          </span>
        ))}
      </div>
      <span className="sb-btn">
        <span>Confirm booking</span>
        <Check size={14} strokeWidth={3} />
      </span>
    </div>
  )
}

const SCREENS = [ScreenHome, ScreenTrack, ScreenReport, ScreenBook]

function Phone({ idx, className = '', style }) {
  const S = SCREENS[idx]
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="ph-btn l1" />
      <div className="ph-btn l2" />
      <div className="ph-btn r1" />
      <div className="ph-screen">
        <div className="ph-island" />
        <StatusBar />
        <div className="ph-view" key={idx}>
          <S />
        </div>
        <div className="ph-tabs">
          {[Home, Truck, ClipboardCheck, CalendarPlus].map((I, i) => (
            <span key={i} className={i === idx ? 'on' : ''}>
              <I size={15} />
            </span>
          ))}
        </div>
        <div className="ph-home" />
      </div>
    </div>
  )
}

export default function AppShowcase() {
  const [idx, setIdx] = useState(0)
  const [hold, setHold] = useState(false)
  const m = useMouse()

  useEffect(() => {
    if (hold) return
    const id = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 4200)
    return () => clearInterval(id)
  }, [hold])

  return (
    <section className="section appshow" id="app">
      <div className="as-bg" aria-hidden="true">
        <span className="as-ring r1" />
        <span className="as-ring r2" />
        <span className="as-ring r3" />
      </div>
      <div className="wrap as-grid">
        <div className="as-copy">
          <span className="eyebrow" data-reveal="">Booking apps & appointment calendars</span>
          <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
            <Words text="Your brand," />
            <br />
            <Words text="on their home screen." delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            We build branded booking apps for landscape companies. Your clients book weekly or monthly maintenance, track crews, read visit reports and pay, and you stop chasing phone calls.
          </p>
          <div className="as-feats" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
            {FEATURES.map((f, i) => (
              <button key={f.t} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
                <span className="as-ico">
                  <f.icon size={18} />
                </span>
                <span className="as-txt">
                  <b>{f.t}</b>
                  <small>{f.d}</small>
                </span>
                <i className="as-bar" />
              </button>
            ))}
          </div>
          <div className="as-stores" data-reveal="">
            <span>
              <Smartphone size={18} />
              <span>
                <small>Available on</small>
                <b>iPhone</b>
              </span>
            </span>
            <span>
              <Smartphone size={18} />
              <span>
                <small>Available on</small>
                <b>Android</b>
              </span>
            </span>
          </div>
        </div>

        <div className="as-stage" data-reveal="scale">
          <div className="as-tilt" style={{ transform: `rotateY(${m.x * 14}deg) rotateX(${m.y * -10}deg)` }}>
            <Phone idx={(idx + 3) % 4} className="back left" />
            <Phone idx={(idx + 1) % 4} className="back right" />
            <Phone idx={idx} className="front" />
            {NOTES.map((n, i) => (
              <div key={n.t} className={`as-note ${n.c} ${i === idx ? 'on' : ''}`}>
                <span>
                  <n.icon size={14} />
                </span>
                {n.t}
              </div>
            ))}
          </div>
          <div className="as-floor" />
        </div>
      </div>
    </section>
  )
}
