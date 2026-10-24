import { useRef } from 'react'
import { useScrollProgress, useInView, useCountUp } from '../hooks'
import { IMG } from '../data/site'
import { useLanguage } from '../context/LanguageContext'

function Stat({ n, suffix, label, run, dec = 0 }) {
  const v = useCountUp(n, run, 1800, dec)
  return (
    <div className="mf-stat">
      <b>
        {v}
        <span>{suffix}</span>
      </b>
      <small>{label}</small>
    </div>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  const [statsRef, seen] = useInView({ threshold: 0.4 })
  const { t } = useLanguage()
  const data = t.manifesto

  const words = (data.text || '').split(' ')
  const k = Math.min(1, Math.max(0, (p - 0.18) / 0.45))
  const lit = Math.floor(k * words.length)

  const stats = data.stats || [
    { n: 8, suffix: ' channels', label: 'Brand, print, video, social, email, web, calendar & app' },
    { n: 24, suffix: '/7', label: 'Online booking on your appointment calendar' },
    { n: 100, suffix: '%', label: 'Focused on the landscape industry' },
    { n: 7, suffix: ' niches', label: 'From snow removal to glass verandas' },
  ]

  return (
    <section className="section dark manifesto" ref={ref}>
      <div className="wrap">
        <span className="eyebrow">{data.eyebrow}</span>
        <p className="mf-text">
          {words.map((w, i) => (
            <span key={i} className={i < lit ? 'lit' : ''}>
              {w}{' '}
            </span>
          ))}
        </p>
        <div className="mf-row">
          <div className="mf-photos" data-reveal="">
            <img src={IMG.hands} alt="Hands planting a young plant in soil" className="mfp a" style={{ transform: `translateY(${(0.5 - p) * 60}px) rotate(-6deg)` }} />
            <img src={IMG.seedlings} alt="Seedling trays in a nursery" className="mfp b" style={{ transform: `translateY(${(0.5 - p) * -40}px) rotate(5deg)` }} />
            <img src={IMG.sprout} alt="Young green sprout" className="mfp c" style={{ transform: `translateY(${(0.5 - p) * 90}px) rotate(-2deg)` }} />
          </div>
          <div className="mf-stats" ref={statsRef}>
            {stats.map((s, i) => (
              <Stat key={i} n={s.n} suffix={s.suffix} label={s.label} run={seen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
