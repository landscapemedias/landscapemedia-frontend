import { useState } from 'react'
import { Home, Building2, Check } from 'lucide-react'
import { ESTIMATE_SERVICES } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'

const FREQ = [
  { k: 'weekly', label: 'Weekly', f: 1 },
  { k: 'bi', label: 'Every 2 weeks', f: 0.62 },
  { k: 'monthly', label: 'Monthly', f: 0.38 },
]

const fmt = (n) => `$${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function Estimate() {
  const [type, setType] = useState('res')
  const [size, setSize] = useState(12000)
  const [picks, setPicks] = useState(['mow', 'beds'])
  const [freq, setFreq] = useState('weekly')

  const toggle = (k) => setPicks(picks.includes(k) ? picks.filter((p) => p !== k) : [...picks, k])
  const base = ESTIMATE_SERVICES.filter((s) => picks.includes(s.k)).reduce((a, s) => a + s.rate, 0)
  const sizeF = Math.sqrt(size / 5000)
  const typeF = type === 'com' ? 1.35 : 1
  const freqF = FREQ.find((f) => f.k === freq).f
  const monthly = base * sizeF * typeF * freqF * 4.3
  const low = monthly * 0.85
  const high = monthly * 1.15
  const pct = ((size - 2000) / (200000 - 2000)) * 100
  const growth = Math.min(1, monthly / 4000)

  return (
    <section className="section estimate dark" id="estimate">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Instant estimate</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Know your budget" />
              <br />
              <Words text="before we visit." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Pick your property type, size and services for a ballpark monthly range. Your exact price comes after a free site visit.
          </p>
        </div>

        <div className="es-grid" data-reveal="">
          <div className="es-form">
            <span className="es-label">Property type</span>
            <div className="es-type">
              <button className={type === 'res' ? 'on' : ''} onClick={() => setType('res')}>
                <Home size={20} /> Residential
              </button>
              <button className={type === 'com' ? 'on' : ''} onClick={() => setType('com')}>
                <Building2 size={20} /> Commercial
              </button>
            </div>

            <label className="es-size">
              <span className="es-label">
                Landscaped area <b>{size.toLocaleString('en-US')} sq ft</b>
              </span>
              <input type="range" min={2000} max={200000} step={1000} value={size} onChange={(e) => setSize(+e.target.value)} style={{ '--p': `${pct}%` }} />
            </label>

            <span className="es-label">Services</span>
            <div className="es-svcs">
              {ESTIMATE_SERVICES.map((s) => (
                <button key={s.k} className={picks.includes(s.k) ? 'on' : ''} onClick={() => toggle(s.k)}>
                  <i>
                    <Check size={12} strokeWidth={3.5} />
                  </i>
                  {s.label}
                </button>
              ))}
            </div>

            <span className="es-label">Visit frequency</span>
            <div className="es-freq">
              {FREQ.map((f) => (
                <button key={f.k} className={freq === f.k ? 'on' : ''} onClick={() => setFreq(f.k)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="es-out">
            <div className="es-scene" aria-hidden="true">
              <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMax meet">
                <path d="M0 140 C80 128 220 128 300 140 L300 160 L0 160Z" fill="var(--moss)" />
                {[40, 90, 150, 210, 260].map((x, i) => (
                  <g key={x} transform={`translate(${x} 138)`}>
                    <g className="es-tree" style={{ transform: `scale(${0.35 + growth * 0.75 * (i % 2 ? 0.8 : 1)})`, transitionDelay: `${i * 0.06}s` }}>
                      <rect x="-3" y="-36" width="6" height="36" fill="var(--bark)" />
                      <circle cy="-50" r="24" fill={i % 2 ? 'var(--leaf)' : 'var(--sprout)'} />
                      <circle cx="-14" cy="-40" r="14" fill={i % 2 ? 'var(--fern)' : 'var(--leaf)'} />
                      <circle cx="14" cy="-42" r="15" fill={i % 2 ? 'var(--fern)' : 'var(--leaf)'} />
                    </g>
                  </g>
                ))}
              </svg>
            </div>
            <small>Estimated monthly range</small>
            <div className="es-price">
              {picks.length ? (
                <>
                  <b>{fmt(low)}</b>
                  <span>to</span>
                  <b>{fmt(high)}</b>
                </>
              ) : (
                <b className="es-none">Pick a service</b>
              )}
            </div>
            <ul className="es-inc">
              <li>Certified, insured crews</li>
              <li>Photo report after every visit</li>
              <li>Complete site cleanup</li>
            </ul>
            <Btn variant="light" onClick={() => scrollToId('book')}>Get my exact quote</Btn>
            <p className="es-fine">A ballpark for planning only. Final pricing depends on site conditions and is confirmed in writing after your free site visit.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
