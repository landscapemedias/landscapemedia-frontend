import { Award, ShieldCheck, MapPin, Sprout } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { useInView, useCountUp } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [Award, ShieldCheck, MapPin, Sprout]

function Count({ n, s, label, run }) {
  const v = useCountUp(n, run)
  return (
    <div className="wy-count">
      <b>{v}{s}</b>
      <span>{label}</span>
    </div>
  )
}

export default function WhyUs() {
  const [ref, seen] = useInView({ threshold: 0.3 })
  const { t } = useLanguage()
  const data = t.whyUs || {}
  const cards = data.cards || []
  const counts = data.counts || []

  return (
    <section className="section why">
      <div className="wrap wy-grid">
        <div className="wy-left">
          <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
          <h2 className="h-display h-lg" style={{ margin: '18px 0 22px' }}>
            <Words text={data.title1} />
            <br />
            <Words text={data.title2} delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="">
            {data.lead}
          </p>
          <div className="wy-photo" data-reveal="scale">
            <img src={IMG.path} alt="Manicured garden path lined with trimmed hedges and camellias" />
            <div className="wy-badge">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="var(--sprout)" />
              </svg>
              <span>
                <b>{data.badgeText}</b>
                <small>{data.badgeSub}</small>
              </span>
            </div>
          </div>
        </div>
        <div className="wy-right">
          <div className="wy-cards">
            {cards.map((w, i) => {
              const I = ICONS[i] || Award
              return (
                <div className="wy-card" key={w.t || i} data-reveal="" style={{ '--d': `${i * 0.08}s` }}>
                  <span className="wy-ico"><I size={22} /></span>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                  <span className="wy-k">{w.k}</span>
                  <span className="wy-n">0{i + 1}</span>
                </div>
              )
            })}
          </div>
          <div className="wy-counts" ref={ref}>
            <Count n={8} s="" label={counts[0]?.label || 'Media channels, one team'} run={seen} />
            <Count n={7} s="" label={counts[1]?.label || 'Landscape niches served'} run={seen} />
            <Count n={3} s="x" label={counts[2]?.label || 'Average lead growth'} run={seen} />
            <Count n={24} s="/7" label={counts[3]?.label || 'Online booking'} run={seen} />
          </div>
        </div>
      </div>
    </section>
  )
}
