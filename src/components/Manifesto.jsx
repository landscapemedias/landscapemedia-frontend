import { useRef } from 'react'
import { useScrollProgress, useInView, useCountUp } from '../hooks'
import { IMG } from '../data/site'

const TEXT = 'Great landscapes do not happen by accident. They take knowledge, attention to detail and people who care about doing the job properly. For more than four decades our teams have worked with property owners to understand what their landscape needs, and to care for it dependably, all year round.'

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
  const words = TEXT.split(' ')
  const k = Math.min(1, Math.max(0, (p - 0.18) / 0.45))
  const lit = Math.floor(k * words.length)

  return (
    <section className="section dark manifesto" ref={ref}>
      <div className="wrap">
        <span className="eyebrow">Built on experience</span>
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
            <Stat n={46} suffix="+ yrs" label="Of dedicated local service" run={seen} />
            <Stat n={24} suffix="/7" label="Storm and emergency tree response" run={seen} />
            <Stat n={100} suffix="%" label="Licensed, insured and OSHA compliant" run={seen} />
            <Stat n={350} suffix="lots" label="Managed in a single planned community" run={seen} />
          </div>
        </div>
      </div>
    </section>
  )
}
