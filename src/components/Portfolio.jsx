import { useState } from 'react'
import { Play, Globe, Smartphone, Clapperboard } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

const MEDIA = {
  greenline: { type: 'web', img: IMG.cover, url: 'greenlinegrounds.com' },
  northfield: { type: 'app', img: IMG.snow },
  highoak: { type: 'video', img: IMG.canopy },
  clearview: { type: 'web', img: IMG.glass, url: 'clearviewverandas.com' },
  rootsprout: { type: 'app', img: IMG.micro },
  glasshouse: { type: 'video', img: IMG.greenhouse },
}

const TYPE_ICONS = { web: Globe, app: Smartphone, video: Clapperboard }

function Media({ m, alt }) {
  if (m.video) return <video src={m.video} poster={m.img} autoPlay muted loop playsInline />
  return <img src={m.img} alt={alt} loading="lazy" />
}

function Browser({ m, it, data }) {
  return (
    <div className="pf-browser">
      <span className="pf-bar">
        <i /><i /><i />
        <em>{m.url}</em>
      </span>
      <div className="pf-site">
        <div className="pf-scroll">
          <div className="pf-hero">
            <Media m={m} alt={`${data.types.web} ${it.client}`} />
            <span className="pf-nav">
              <b>{it.client}</b>
              <small>{(data.siteNav || []).join(' · ')}</small>
            </span>
            <span className="pf-head">
              <strong>{it.head}</strong>
              <u>{data.siteCta}</u>
            </span>
          </div>
          <div className="pf-tiles">
            {[IMG.path, IMG.lush, IMG.pool].map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
          <div className="pf-lines"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  )
}

function Phone({ m, it, data }) {
  return (
    <div className="pf-phone">
      <span className="pf-notch" />
      <div className="pf-app">
        <div className="pf-app-hero">
          <Media m={m} alt={`${data.types.app} ${it.client}`} />
          <small>{data.appGreeting}</small>
        </div>
        <div className="pf-app-card">
          <small>{data.appNext}</small>
          <b>{it.head}</b>
          <u>{data.appBook}</u>
        </div>
        <div className="pf-app-grid"><i /><i /><i /><i /></div>
      </div>
    </div>
  )
}

function Reel({ m, it, data }) {
  return (
    <div className="pf-reel">
      <Media m={m} alt={`${data.types.video} ${it.client}`} />
      {!m.video && (
        <span className="pf-play" aria-label={data.play}>
          <Play size={20} fill="currentColor" />
        </span>
      )}
      <span className="pf-reel-cap">
        <b>@{it.client.toLowerCase().replace(/[^a-z]/g, '')}</b>
        <small>{it.head}</small>
      </span>
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const data = t.portfolio || {}
  const [filter, setFilter] = useState('all')

  const items = (data.items || [])
    .map((it) => ({ it, m: MEDIA[it.k] }))
    .filter(({ m }) => m && (filter === 'all' || m.type === filter))

  return (
    <section className="section portfolio dark" id="portfolio">
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

        <div className="pf-filters" role="tablist" data-reveal="">
          {(data.filters || []).map((f) => (
            <button key={f.k} type="button" role="tab" aria-selected={filter === f.k} className={filter === f.k ? 'on' : ''} onClick={() => setFilter(f.k)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="pf-grid" data-reveal="">
          {items.map(({ it, m }, i) => {
            const Icon = TYPE_ICONS[m.type]
            const Frame = m.type === 'web' ? Browser : m.type === 'app' ? Phone : Reel
            return (
              <article key={it.k} className={`pf-card t-${m.type}`} style={{ '--i': i }}>
                <div className="pf-stage">
                  <Frame m={m} it={it} data={data} />
                </div>
                <div className="pf-meta">
                  <span className="pf-type"><Icon size={14} /> {data.types?.[m.type]}</span>
                  <b>{it.client}</b>
                  <span className="pf-result">{it.result}</span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="pf-tech" data-reveal="">
          <span>{data.techTitle}</span>
          <ul>
            {(data.tech || []).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
