import { Check, Globe, Smartphone, Sparkles } from 'lucide-react'
import { IMG } from '../data/site'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

function WebArt() {
  return (
    <div className="of-browser" aria-hidden="true">
      <span className="of-bar"><i /><i /><i /></span>
      <span className="of-site">
        <img src={IMG.cover} alt="" loading="lazy" />
        <b />
        <em />
        <u />
      </span>
    </div>
  )
}

function AppArt() {
  return (
    <div className="of-phone" aria-hidden="true">
      <span className="of-notch" />
      <img src={IMG.garden} alt="" loading="lazy" />
      <span className="of-app-card"><b /><em /></span>
      <span className="of-app-row"><i /><i /><i /><i /></span>
    </div>
  )
}

export default function Offer() {
  const { t } = useLanguage()
  const data = t.offer || {}

  return (
    <section className="section offer" id="offer">
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

        <div className="of-grid">
          {(data.plans || []).map((p, i) => {
            const Icon = p.k === 'app' ? Smartphone : Globe
            return (
              <article key={p.k} className={`of-card ${p.hot ? 'hot' : ''}`} data-reveal="" style={{ '--d': `${i * 0.1}s` }}>
                {p.hot && <span className="of-hot">{data.badgeHot}</span>}
                <div className="of-art">{p.k === 'app' ? <AppArt /> : <WebArt />}</div>
                <div className="of-body">
                  <span className="of-tag"><Icon size={16} /> {p.tag}</span>
                  <div className="of-price">
                    <small>{data.from}</small>
                    <b><sup>$</sup>{p.price}</b>
                    <small>USD</small>
                  </div>
                  <p>{p.d}</p>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}><Check size={15} strokeWidth={3} /> {it}</li>
                    ))}
                  </ul>
                  <Btn variant={p.hot ? 'light' : ''} onClick={() => scrollToId('book')}>{data.cta}</Btn>
                </div>
              </article>
            )
          })}
        </div>

        <div className="of-extras" data-reveal="">
          <span><Sparkles size={16} /> {data.extrasTitle}</span>
          <ul>
            {(data.extras || []).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
