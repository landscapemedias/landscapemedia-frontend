import { useState } from 'react'
import { Check } from 'lucide-react'
import { INDUSTRIES } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'

export default function Industries() {
  const [i, setI] = useState(0)
  const D = INDUSTRIES[i]
  return (
    <section className="section industries dark" id="industries">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Industries we serve</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Specialized care for" />
              <br />
              <Words text="every property type." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Whether it is a family home, a corporate campus or a luxury resort, we bring the right expertise, equipment and attention to every landscape.
          </p>
        </div>

        <div className="in-tabs" role="tablist" data-reveal="">
          {INDUSTRIES.map((x, n) => (
            <button key={x.k} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
              <small>{String(n + 1).padStart(2, '0')}</small>
              {x.short}
            </button>
          ))}
        </div>

        <div className="in-panel" key={i}>
          <div className="in-media">
            <img src={D.img} alt={D.k} />
            <div className="in-stat">
              <b>{D.stat[0]}</b>
              <span>{D.stat[1]}</span>
            </div>
          </div>
          <div className="in-body">
            <span className="in-num">{String(i + 1).padStart(2, '0')} / {String(INDUSTRIES.length).padStart(2, '0')}</span>
            <h3 className="h-display">{D.k}</h3>
            <p>{D.lead}</p>
            <ul>
              {D.points.map((p, n) => (
                <li key={p} style={{ '--i': n }}>
                  <span><Check size={14} strokeWidth={3} /></span>
                  {p}
                </li>
              ))}
            </ul>
            <Btn variant="light" onClick={() => scrollToId('book')}>Contact the {D.short.toLowerCase()} team</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
