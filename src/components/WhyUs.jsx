import { Award, ShieldCheck, MapPin, Sprout } from 'lucide-react'
import { WHY, IMG } from '../data/site'
import { Words } from './ui'
import { useInView, useCountUp } from '../hooks'

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
  return (
    <section className="section why">
      <div className="wrap wy-grid">
        <div className="wy-left">
          <span className="eyebrow" data-reveal="">Why choose us</span>
          <h2 className="h-display h-lg" style={{ margin: '18px 0 22px' }}>
            <Words text="Care you can see." />
            <br />
            <Words text="Service you can count on." delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="">
            Outdoor property care should be straightforward, reliable and backed by proven craftsmanship. That is why property managers and homeowners trust our crews year after year.
          </p>
          <div className="wy-photo" data-reveal="scale">
            <img src={IMG.crew} alt="Crew member caring for a residential lawn" />
            <div className="wy-badge">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="var(--sprout)" />
              </svg>
              <span>
                <b>ISA certified & OSHA compliant</b>
                <small>Full liability coverage</small>
              </span>
            </div>
          </div>
        </div>
        <div className="wy-right">
          <div className="wy-cards">
            {WHY.map((w, i) => {
              const I = ICONS[i]
              return (
                <div className="wy-card" key={w.t} data-reveal="" style={{ '--d': `${i * 0.08}s` }}>
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
            <Count n={46} s="+" label="Years of local service" run={seen} />
            <Count n={45} s=" ac" label="Largest campus managed" run={seen} />
            <Count n={350} s="" label="Lots in one community" run={seen} />
            <Count n={24} s="/7" label="Emergency response" run={seen} />
          </div>
        </div>
      </div>
    </section>
  )
}
