import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/site'
import { Words } from './ui'
import { scrollToId } from '../hooks'

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Case studies & projects</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="See the difference" />
              <br />
              <Words text="professional care makes." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Real outcomes for real properties. How our certified teams maintain safety, preserve valuable trees and improve outdoor grounds.
          </p>
        </div>

        <div className="pj-grid">
          {PROJECTS.map((p, i) => (
            <article key={p.t} className={`pj-card ${i === 0 ? 'big' : ''}`} data-reveal="" style={{ '--d': `${i * 0.08}s` }} onClick={() => scrollToId('book')} data-cursor="View">
              <img src={p.img} alt={p.t} loading="lazy" />
              <span className="pj-shade" />
              <span className="pj-stat">{p.stat}</span>
              <div className="pj-body">
                <small>{p.k}</small>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="pj-link">
                  View project details <ArrowUpRight size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
