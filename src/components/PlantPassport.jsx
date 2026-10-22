import { useEffect, useState } from 'react'
import { Sun, Droplets, Thermometer, QrCode, BellRing, CalendarCheck, Search, WandSparkles, RefreshCw, MessageSquareText, Leaf } from 'lucide-react'
import { PLANTS, CUSTOMER_JOURNEY } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'

const STEP_ICONS = [Search, WandSparkles, CalendarCheck, QrCode, BellRing, RefreshCw]

export default function PlantPassport() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const P = PLANTS[active]

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setActive((a) => (a + 1) % PLANTS.length), 4800)
    return () => clearInterval(id)
  }, [auto])

  const pick = (i) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <section className="section pp" id="digital">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">What your customers get</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Beautiful plants." />
              <br />
              <Words text="Digital service" delay={0.12} className="ital" />
              <br />
              <Words text="that keeps them thriving." delay={0.24} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Your crews plant the garden. We give your customers the digital side: an online plant catalog, a passport for every plant, care reminders and a branded app. Pick a plant to see what the homeowner sees.
          </p>
        </div>

        <div className="pp-stage" style={{ '--tone': P.tone }}>
          <ul className="pp-list" data-reveal="">
            {PLANTS.map((p, i) => (
              <li key={p.k}>
                <button className={`pp-chip ${i === active ? 'on' : ''}`} onClick={() => pick(i)} aria-pressed={i === active} data-cursor="View">
                  <img src={p.img} alt="" loading="lazy" />
                  <span>
                    <b>{p.name}</b>
                    <small>{p.latin}</small>
                  </span>
                  {i === active && auto && <i className="pp-timer" key={active} />}
                </button>
              </li>
            ))}
          </ul>

          <div className="pp-phone-wrap" data-reveal="scale">
            <div className="pp-phone">
              <span className="pp-notch" />
              <div className="pp-screen" key={P.k}>
                <div className="pp-hero">
                  <img src={P.img} alt={`${P.name} planted in a customer garden`} />
                  <span className="pp-badge">
                    <QrCode size={12} /> Plant passport
                  </span>
                </div>
                <div className="pp-body">
                  <b className="pp-name">{P.name}</b>
                  <small className="pp-latin">{P.latin}</small>
                  <div className="pp-care">
                    <span><Sun size={14} /><em>Light</em>{P.light}</span>
                    <span><Droplets size={14} /><em>Water</em>{P.water}</span>
                    <span><Thermometer size={14} /><em>Grows</em>{P.zone}</span>
                  </div>
                  <div className="pp-next">
                    <BellRing size={16} />
                    <span>
                      <small>Next visit</small>
                      <b>{P.next}</b>
                    </span>
                    <time>{P.when}</time>
                  </div>
                  <div className="pp-actions">
                    <span className="pp-btn">Book visit</span>
                    <span className="pp-btn ghost">Care guide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pp-sms" key={`sms-${P.k}`}>
              <span className="pp-sms-ico"><MessageSquareText size={15} /></span>
              <span>
                <small>Text from your landscaper</small>
                {P.sms}
              </span>
            </div>
            <div className="pp-reel" key={`reel-${P.k}`}>
              <span className="pp-dot" /> Reel: {P.reel}
            </div>
          </div>

          <div className="pp-facts" data-reveal="" style={{ '--d': '0.15s' }}>
            <span className="pp-facts-k"><Leaf size={14} /> {P.bloom}</span>
            <p>
              Every plant your crew installs comes with its own digital page, care schedule and photo history. Homeowners stay happy, and you get the next job without making a call.
            </p>
            <div className="pp-stats">
              <div><b>1</b><span>QR tag per plant</span></div>
              <div><b>12</b><span>Care touchpoints a year</span></div>
              <div><b>24/7</b><span>Online booking</span></div>
            </div>
          </div>
        </div>

        <div className="pp-journey">
          <div className="pp-j-head" data-reveal="">
            <span className="eyebrow">The customer journey, fully digital</span>
          </div>
          <ol className="pp-steps">
            {CUSTOMER_JOURNEY.map((s, i) => {
              const I = STEP_ICONS[i]
              return (
                <li className="pp-step" key={s.n} data-reveal="" style={{ '--d': `${i * 0.07}s` }}>
                  <span className="pp-step-top">
                    <span className="pp-step-ico"><I size={20} /></span>
                    <small>{s.n}</small>
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <span className="pp-step-tag">{s.s}</span>
                </li>
              )
            })}
          </ol>
          <div className="ns-foot" data-reveal="">
            <p>
              Want this for <b>your customers</b>? We set up the catalog, plant passports and care reminders in your brand.
            </p>
            <Btn onClick={() => scrollToId('book')}>Book a strategy call</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
