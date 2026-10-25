import { Star, Quote } from 'lucide-react'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

function Card({ r }) {
  return (
    <figure className="ts-card">
      <Quote size={24} className="ts-q" />
      <span className="ts-stars" aria-label="5/5">
        {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={14} fill="currentColor" />)}
      </span>
      <blockquote>{r.q}</blockquote>
      <figcaption>
        <span className="ts-avatar">{r.n[0]}</span>
        <span>
          <b>{r.n}</b>
          <small>{r.c}</small>
        </span>
        {r.s && <em>{r.s}</em>}
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse }) {
  return (
    <div className={`ts-row ${reverse ? 'rev' : ''}`}>
      <div className="ts-track">
        {[...items, ...items].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const data = t.portfolio || {}
  const reviews = data.reviews || []
  const half = Math.ceil(reviews.length / 2)

  return (
    <section className="section testimonials" id="testimonials">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.reviewsEyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.reviewsTitle || ''} />
            </h2>
          </div>
          <div className="ts-side" data-reveal="" style={{ '--d': '0.2s' }}>
            <p className="lead">{data.reviewsLead}</p>
            <div className="ts-score">
              <b>4.9</b>
              <span>
                <span className="ts-stars">
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                </span>
                <small>{data.reviewsStat}</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ts-rows" data-reveal="">
        <Row items={reviews.slice(0, half)} />
        <Row items={reviews.slice(half)} reverse />
      </div>
    </section>
  )
}
