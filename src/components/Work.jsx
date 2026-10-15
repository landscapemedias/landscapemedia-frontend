import { useState } from 'react'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { IMG } from '../media.js'
import '../styles/Work.css'

const WORKS = [
  {
    id: 1,
    title: 'Cascade Ridges Terraced Sanctuary',
    category: 'residential',
    location: 'Travis County, TX',
    scope: 'Tiered Basalt Terraces · Corten Edges',
    duration: '4 Weeks Execution',
    image: IMG.workCascade,
    tags: ['3D CAD Master Plan', 'Chiseled Basalt', 'Drip Zones'],
  },
  {
    id: 2,
    title: 'Monolithic Slate Patio & Outdoor Fire Lounge',
    category: 'hardscape',
    location: 'Greenfield Valley',
    scope: 'Natural Bluestone Pavers · Gas Fire Pit',
    duration: '12 Days Execution',
    image: IMG.workPatio,
    tags: ['Flagstone Pavers', 'Gas Line Hookup', 'Cedar Pergola'],
  },
  {
    id: 3,
    title: 'Championship Kentucky Turf & Native Wildflowers',
    category: 'turf',
    location: 'Pinecrest Country Club Estates',
    scope: 'Laser Level Grading · 8,500 sq ft Sod',
    duration: '5 Days Execution',
    image: IMG.workTurf,
    tags: ['Kentucky Bluegrass', 'WiFi Sprinklers', 'Organic Soil'],
  },
  {
    id: 4,
    title: 'Architectural Corten Edging & Zen Pebble Path',
    category: 'hardscape',
    location: 'Oakridge Hills',
    scope: 'Curved Corten Steel · Bamboo Screen',
    duration: '8 Days Execution',
    image: IMG.workCortenZen,
    tags: ['3mm Weathering Steel', 'River Pebble', 'Japanese Maple'],
  },
]

export default function Work({ onSelectProject }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' 
    ? WORKS 
    : WORKS.filter((w) => w.category === filter)

  return (
    <section className="section work-sec" id="portfolio">
      <div className="wrap">
        <div className="work-sec__head">
          <header className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Executed Projects</span>
              <h2 className="h-display">
                Engineered for longevity. <br />
                <span className="serif">Crafted to inspire.</span>
              </h2>
            </div>
            <p>
              A selection of our recent architectural landscapes and precision outdoor builds across residential estates and commercial outdoor spaces.
            </p>
          </header>

          <div className="work-sec__filter-pills" data-reveal>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Estates' },
              { id: 'hardscape', label: 'Hardscapes' },
              { id: 'turf', label: 'Turf & Sod' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFilter(p.id)}
                className={`work-sec__pill ${filter === p.id ? 'is-active' : ''}`}
                data-magnetic
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="work-sec__grid">
          {filtered.map((item) => (
            <div 
              key={item.id} 
              className="work-card" 
              data-reveal
              data-cursor="View"
              onClick={() => onSelectProject?.(item)}
            >
              <div className="work-card__media">
                <img src={item.image} alt={item.title} className="work-card__img" />
                <div className="work-card__badge-row">
                  <span className="work-card__loc">
                    <MapPin className="w-3.5 h-3.5 text-leaf" />
                    <span>{item.location}</span>
                  </span>
                  <span className="work-card__dur">{item.duration}</span>
                </div>
              </div>

              <div className="work-card__body">
                <div className="work-card__info">
                  <h3 className="work-card__title">{item.title}</h3>
                  <p className="work-card__scope">{item.scope}</p>
                </div>

                <div className="work-card__foot">
                  <div className="work-card__tags">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="badge-tag">{t}</span>
                    ))}
                  </div>
                  <div className="work-card__arrow">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
