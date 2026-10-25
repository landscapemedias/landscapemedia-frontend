import { useState } from 'react'
import { Home, Building2, Check } from 'lucide-react'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const SERVICE_RATES = {
  vanity: 200,
  answering: 450,
  office: 180,
  social: 450,
  reels: 650,
  flyers: 300,
  email: 250,
  web: 350,
}

const FREQ_FACTORS = {
  weekly: 1,
  bi: 0.72,
  monthly: 0.5,
}

const fmt = (n) => `$${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function Estimate() {
  const [type, setType] = useState('res')
  const [size, setSize] = useState(4)
  const [picks, setPicks] = useState(['reels', 'web'])
  const [freq, setFreq] = useState('weekly')
  const { t } = useLanguage()
  const data = t.estimate || {}

  const services = data.services || []
  const frequencies = data.freq || []

  const toggle = (k) => setPicks(picks.includes(k) ? picks.filter((p) => p !== k) : [...picks, k])
  const base = picks.reduce((a, k) => a + (SERVICE_RATES[k] || 250), 0)
  const sizeF = 0.8 + Math.sqrt(size) * 0.2
  const typeF = type === 'com' ? 1.35 : 1
  const freqF = FREQ_FACTORS[freq] ?? 1
  const monthly = base * sizeF * typeF * freqF
  const low = monthly * 0.85
  const high = monthly * 1.15
  const pct = ((size - 1) / 39) * 100
  const growth = Math.min(1, monthly / 5000)

  const crewUnit = size === 1 ? (data.crewsUnitSingular || 'crew') : (data.crewsUnitPlural || 'crews')

  return (
    <section className="section estimate dark" id="estimate">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <div className="es-grid" data-reveal="">
          <div className="es-form">
            <span className="es-label">{data.focusLabel}</span>
            <div className="es-type">
              <button className={type === 'res' ? 'on' : ''} onClick={() => setType('res')}>
                <Home size={20} /> {data.residential || 'Residential'}
              </button>
              <button className={type === 'com' ? 'on' : ''} onClick={() => setType('com')}>
                <Building2 size={20} /> {data.commercial || 'Commercial'}
              </button>
            </div>

            <label className="es-size">
              <span className="es-label">
                {data.crewsLabel || 'Crews on the road'} <b>{size} {crewUnit}</b>
              </span>
              <input type="range" min={1} max={40} step={1} value={size} onChange={(e) => setSize(+e.target.value)} style={{ '--p': `${pct}%` }} />
            </label>

            <span className="es-label">{data.channelsLabel || 'Channels'}</span>
            <div className="es-svcs">
              {services.map((s) => (
                <button key={s.k} className={picks.includes(s.k) ? 'on' : ''} onClick={() => toggle(s.k)}>
                  <i>
                    <Check size={12} strokeWidth={3.5} />
                  </i>
                  {s.label}
                </button>
              ))}
            </div>

            <span className="es-label">{data.cadenceLabel || 'Content cadence'}</span>
            <div className="es-freq">
              {frequencies.map((f) => (
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
            <small>{data.rangeLabel || 'Estimated monthly range'}</small>
            <div className="es-price">
              {picks.length ? (
                <>
                  <b>{fmt(low)}</b>
                  <span>{data.rangeTo || 'to'}</span>
                  <b>{fmt(high)}</b>
                </>
              ) : (
                <b className="es-none">{data.pickService || 'Pick a service'}</b>
              )}
            </div>
            <ul className="es-inc">
              <li>{data.benefit1 || 'Dedicated account manager'}</li>
              <li>{data.benefit2 || 'Monthly bookings report'}</li>
              <li>{data.benefit3 || 'Cancel any month'}</li>
            </ul>
            <Btn variant="light" onClick={() => scrollToId('book')}>{data.exactPlanBtn || 'Get my exact plan'}</Btn>
            <p className="es-fine">{data.finePrint}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
