import { useRef } from 'react'
import { useScrollProgress } from '../hooks'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

export default function Process() {
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  const k = Math.min(1, Math.max(0, (p - 0.2) / 0.55))
  const { t } = useLanguage()
  const data = t.process || {}
  const steps = data.steps || []

  return (
    <section className="section process" id="process" ref={ref}>
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
          <h2 className="h-display h-lg">
            <Words text={data.title1} /> <Words text={data.title2} delay={0.12} className="ital" />
          </h2>
        </div>
        <div className="pr-list">
          <div className="pr-vine">
            <span style={{ transform: `scaleY(${k})` }} />
          </div>
          {steps.map((s, i) => (
            <div key={s.n || i} className={`pr-step ${k > i / steps.length ? 'on' : ''}`}>
              <span className="pr-dot">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" />
                </svg>
              </span>
              <span className="pr-n">{s.n} · {s.s}</span>
              <h3 className="h-display">{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
