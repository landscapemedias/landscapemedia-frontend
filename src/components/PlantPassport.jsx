import { useEffect, useState } from 'react'
import { Sun, Droplets, Thermometer, QrCode, BellRing, CalendarCheck, Search, WandSparkles, RefreshCw, MessageSquareText, Leaf } from 'lucide-react'
import { IMG } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const STEP_ICONS = [Search, WandSparkles, CalendarCheck, QrCode, BellRing, RefreshCw]
const PLANT_IMGS = [IMG.flowers, IMG.path, IMG.lush, IMG.garden, IMG.seedlings, IMG.canopy]

export default function PlantPassport() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const { t } = useLanguage()
  const data = t.plantPassport || {}

  const plants = (data.plants || []).map((p, i) => ({
    ...p,
    img: PLANT_IMGS[i] || IMG.flowers,
  }))

  const P = plants[active] || plants[0] || {
    name: '', latin: '', tone: '#e4def5', light: '', water: '', zone: '',
    bloom: '', sms: '', next: '', when: '', reel: '', img: IMG.flowers,
  }

  const journey = data.journey || []

  useEffect(() => {
    if (!auto || !plants.length) return
    const id = setInterval(() => setActive((a) => (a + 1) % plants.length), 4800)
    return () => clearInterval(id)
  }, [auto, plants.length])

  const pick = (i) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <section className="section pp" id="digital">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} delay={0.12} className="ital" />
              <br />
              <Words text={data.title3} delay={0.24} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <div className="pp-stage" style={{ '--tone': P.tone }}>
          <ul className="pp-list" data-reveal="">
            {plants.map((p, i) => (
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
                  <img src={P.img} alt={`${P.name}`} />
                  <span className="pp-badge">
                    <QrCode size={12} /> {data.badge}
                  </span>
                </div>
                <div className="pp-body">
                  <b className="pp-name">{P.name}</b>
                  <small className="pp-latin">{P.latin}</small>
                  <div className="pp-care">
                    <span><Sun size={14} /><em>{data.lightLabel}</em>{P.light}</span>
                    <span><Droplets size={14} /><em>{data.waterLabel}</em>{P.water}</span>
                    <span><Thermometer size={14} /><em>{data.growsLabel}</em>{P.zone}</span>
                  </div>
                  <div className="pp-next">
                    <BellRing size={16} />
                    <span>
                      <small>{data.nextVisitLabel}</small>
                      <b>{P.next}</b>
                    </span>
                    <time>{P.when}</time>
                  </div>
                  <div className="pp-actions">
                    <span className="pp-btn" onClick={() => scrollToId('book')}>{data.bookVisitBtn}</span>
                    <span className="pp-btn ghost">{data.careGuideBtn}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pp-sms" key={`sms-${P.k}`}>
              <span className="pp-sms-ico"><MessageSquareText size={15} /></span>
              <span>
                <small>{data.smsFromLandscaper}</small>
                {P.sms}
              </span>
            </div>
            <div className="pp-reel" key={`reel-${P.k}`}>
              <span className="pp-dot" /> {data.reelPrefix} {P.reel}
            </div>
          </div>

          <div className="pp-facts" data-reveal="" style={{ '--d': '0.15s' }}>
            <span className="pp-facts-k"><Leaf size={14} /> {P.bloom}</span>
            <p>{data.factsText}</p>
            <div className="pp-stats">
              <div><b>{data.stat1Num}</b><span>{data.stat1Label}</span></div>
              <div><b>{data.stat2Num}</b><span>{data.stat2Label}</span></div>
              <div><b>{data.stat3Num}</b><span>{data.stat3Label}</span></div>
            </div>
          </div>
        </div>

        <div className="pp-journey">
          <div className="pp-j-head" data-reveal="">
            <span className="eyebrow">{data.journeyEyebrow}</span>
          </div>
          <ol className="pp-steps">
            {journey.map((s, i) => {
              const I = STEP_ICONS[i] || QrCode
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
            <p>{data.wantThisText}</p>
            <Btn onClick={() => scrollToId('book')}>{data.bookCallBtn}</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
