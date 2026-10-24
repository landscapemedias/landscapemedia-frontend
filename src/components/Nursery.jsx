import { useState } from 'react'
import { Sun, Droplets, Sprout, RotateCw, Check } from 'lucide-react'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const TONES = ['#e2f7b5', '#f3efe3', '#d8ecd0', '#f6e7c4']

export default function Nursery() {
  const [flip, setFlip] = useState(null)
  const { t } = useLanguage()
  const data = t.services
  const cardLabels = data.card || {}
  const list = data.list || []

  return (
    <section className="section nursery" id="services">
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

        <div className="ns-rail" aria-hidden="true">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0 20 C200 6 400 34 600 18 C800 4 1000 32 1200 16" />
          </svg>
        </div>

        <div className="ns-grid" data-reveal="">
          {list.map((s, i) => (
            <div
              key={s.n}
              className={`ns-tag ${flip === i ? 'flipped' : ''}`}
              style={{ '--i': i, '--tone': TONES[i % 4] }}
            >
              <span className="ns-string" />
              <div
                className="ns-card"
                role="button"
                tabIndex={0}
                onClick={() => setFlip(flip === i ? null : i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFlip(flip === i ? null : i))}
                aria-pressed={flip === i}
                data-cursor={flip === i ? 'Close' : 'Flip'}
              >
                <span className="ns-face front">
                  <span className="ns-hole" />
                  <span className="ns-top">
                    <small>No. {s.n}</small>
                    <Sprout size={18} />
                  </span>
                  <span className="ns-name">{s.name}</span>
                  <span className="ns-latin">{s.latin}</span>
                  <span className="ns-care">
                    <span>
                      <Sprout size={14} />
                      <em>{cardLabels.format || 'Format'}</em>
                      <b>{s.season}</b>
                    </span>
                    <span>
                      <Droplets size={14} />
                      <em>{cardLabels.turnaround || 'Turnaround'}</em>
                      <b>{s.freq}</b>
                    </span>
                    <span>
                      <Sun size={14} />
                      <em>{cardLabels.team || 'Team'}</em>
                      <b>{s.team}</b>
                    </span>
                  </span>
                  <span className="ns-flip">
                    <RotateCw size={13} /> {cardLabels.whatsIncluded || "What's included"}
                  </span>
                </span>
                <span className="ns-face back">
                  <span className="ns-hole" />
                  <small>No. {s.n} · {cardLabels.includedTag || 'Included'}</small>
                  <span className="ns-name sm">{s.name}</span>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}>
                        <Check size={14} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="ns-ask"
                    onClick={(e) => {
                      e.stopPropagation()
                      scrollToId('book')
                    }}
                  >
                    {cardLabels.requestService || 'Request this service →'}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="ns-foot" data-reveal="">
          <p>{data.footText}</p>
          <Btn onClick={() => scrollToId('book')}>{data.auditBtn}</Btn>
        </div>
      </div>
    </section>
  )
}
