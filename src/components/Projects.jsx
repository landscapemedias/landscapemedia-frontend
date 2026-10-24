import { ArrowUpRight } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'
import { scrollToId } from '../hooks'
import BeforeAfter from './BeforeAfter'
import { useLanguage } from '../context/LanguageContext'

const PROJECT_IMGS = [IMG.cover, IMG.snow, IMG.canopy, IMG.glass]

export default function Projects() {
  const { t } = useLanguage()
  const data = t.projects || {}
  const list = (data.list || []).map((p, i) => ({
    ...p,
    img: PROJECT_IMGS[i] || IMG.cover,
  }))

  return (
    <section className="section projects" id="projects">
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

        <BeforeAfter />

        <div className="pj-grid">
          {list.map((p, i) => (
            <article key={p.t} className={`pj-card ${i === 0 ? 'big' : ''}`} data-reveal="" style={{ '--d': `${i * 0.08}s` }} onClick={() => scrollToId('book')} data-cursor="View">
              <img src={p.img} alt={p.t} loading="lazy" />
              <span className="pj-shade" />
              <span className="pj-stat">{p.stat}</span>
              <div className="pj-body">
                <small>{p.k}</small>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="pj-link">
                  {data.viewCase} <ArrowUpRight size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
