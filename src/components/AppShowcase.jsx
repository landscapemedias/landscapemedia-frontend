import { useEffect, useState } from 'react'
import { Home, Truck, ClipboardCheck, CalendarPlus, Bell, Zap, CreditCard, Check, Star, Smartphone, Leaf as LeafIco, MapPin, Battery, Wifi, Signal } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { useMouse } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const FEAT_ICONS = [Home, Truck, ClipboardCheck, CalendarPlus]
const NOTE_ICONS = [Truck, Check, CreditCard, Zap]

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

function ScreenHome({ labels = {} }) {
  return (
    <div className="scr scr-home">
      <div className="sh-top">
        <div>
          <small>{labels.goodMorning || 'Good morning'}</small>
          <b>Sarah</b>
        </div>
        <span className="sh-bell">
          <Bell size={15} />
          <i />
        </span>
      </div>
      <div className="sh-next">
        <small>{labels.nextVisit || 'Next visit'}</small>
        <b>{labels.weeklyMaint || 'Weekly maintenance'}</b>
        <span>{labels.scheduleThu || 'Thu, 8:30 AM · Crew 4'}</span>
        <LeafIco size={60} className="sh-leaf" />
      </div>
      <div className="sh-score">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" className="r0" />
          <circle cx="30" cy="30" r="25" className="r1" />
        </svg>
        <div>
          <b>92</b>
          <small>{labels.propertyHealth || 'Property health'}</small>
        </div>
      </div>
      <div className="sh-grid">
        {[
          [CalendarPlus, labels.book || 'Book'],
          [ClipboardCheck, labels.reports || 'Reports'],
          [Zap, labels.stormSos || 'Storm SOS'],
          [CreditCard, labels.pay || 'Pay'],
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

function ScreenTrack({ labels = {} }) {
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
          <b>12</b> {labels.minRemaining || 'min'}
        </span>
      </div>
      <div className="st-card">
        <span className="st-av">
          <img src={IMG.crew} alt="" />
        </span>
        <div>
          <b>{labels.crewName || 'Crew 4 · Marco'}</b>
          <small>
            <Star size={10} fill="currentColor" /> 4.9 · {labels.certified || 'ISA certified'}
          </small>
        </div>
        <span className="st-call">
          <MapPin size={14} />
        </span>
      </div>
      <div className="st-steps">
        <span className="done">{labels.leftYard || 'Left yard'}</span>
        <span className="now">{labels.onTheWay || 'On the way'}</span>
        <span>{labels.arrived || 'Arrived'}</span>
      </div>
    </div>
  )
}

function ScreenReport({ labels = {} }) {
  const tasks = labels.tasks || ['Lawn mowed & edged', 'Beds weeded & mulched', 'Shrubs pruned', 'Debris cleared']
  return (
    <div className="scr scr-report">
      <b className="sr-h">{labels.visitReport || 'Visit report'}</b>
      <small className="sr-d">{labels.timeSpent || 'Thu, Oct 15 · 2h 10m'}</small>
      <div className="sr-pics">
        <span>
          <img src={IMG.garden} alt="" />
          <i>{labels.before || 'Before'}</i>
        </span>
        <span>
          <img src={IMG.path} alt="" />
          <i>{labels.after || 'After'}</i>
        </span>
      </div>
      <ul className="sr-list">
        {tasks.map((t, i) => (
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

function ScreenBook({ labels = {} }) {
  const services = labels.services || ['Tree pruning', 'Seasonal cleanup', 'Lawn aeration']
  return (
    <div className="scr scr-book">
      <b className="sr-h">{labels.bookService || 'Book a service'}</b>
      <div className="sb-list">
        {services.map((t, i) => (
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
        <span>{labels.confirmBooking || 'Confirm booking'}</span>
        <Check size={14} strokeWidth={3} />
      </span>
    </div>
  )
}

function PhoneView({ idx, className = '', style, data }) {
  const renderScreen = () => {
    switch (idx) {
      case 0: return <ScreenHome labels={data.screenHome} />
      case 1: return <ScreenTrack labels={data.screenTrack} />
      case 2: return <ScreenReport labels={data.screenReport} />
      case 3: return <ScreenBook labels={data.screenBook} />
      default: return <ScreenHome labels={data.screenHome} />
    }
  }

  return (
    <div className={`phone ${className}`} style={style}>
      <div className="ph-btn l1" />
      <div className="ph-btn l2" />
      <div className="ph-btn r1" />
      <div className="ph-screen">
        <div className="ph-island" />
        <StatusBar />
        <div className="ph-view" key={idx}>
          {renderScreen()}
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
  const { t } = useLanguage()
  const data = t.appShowcase || {}

  const features = (data.features || []).map((f, i) => ({
    ...f,
    icon: FEAT_ICONS[i] || Home,
  }))

  const notes = (data.notes || []).map((n, i) => ({
    ...n,
    icon: NOTE_ICONS[i] || Bell,
  }))

  useEffect(() => {
    if (hold) return
    const id = setInterval(() => setIdx((i) => (i + 1) % 4), 4200)
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
          <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
          <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
            <Words text={data.title1} />
            <br />
            <Words text={data.title2} delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
          <div className="as-feats" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
            {features.map((f, i) => (
              <button key={f.t || i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
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
                <small>{data.availableOn || 'Available on'}</small>
                <b>iPhone</b>
              </span>
            </span>
            <span>
              <Smartphone size={18} />
              <span>
                <small>{data.availableOn || 'Available on'}</small>
                <b>Android</b>
              </span>
            </span>
          </div>
        </div>

        <div className="as-stage" data-reveal="scale">
          <div className="as-tilt" style={{ transform: `rotateY(${m.x * 14}deg) rotateX(${m.y * -10}deg)` }}>
            <PhoneView idx={(idx + 3) % 4} className="back left" data={data} />
            <PhoneView idx={(idx + 1) % 4} className="back right" data={data} />
            <PhoneView idx={idx} className="front" data={data} />
            {notes.map((n, i) => (
              <div key={n.t || i} className={`as-note ${n.c} ${i === idx ? 'on' : ''}`}>
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
