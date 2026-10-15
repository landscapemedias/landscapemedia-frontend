import { useState } from 'react'
import { ArrowUpRight, ShieldCheck, Box, SlidersHorizontal, Download } from 'lucide-react'
import { IMG } from '../media.js'
import '../styles/ProductLibrary.css'

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'edging', name: 'Steel Edging' },
  { id: 'planters', name: 'Corten Planters' },
  { id: 'walls', name: 'Retaining Walls' },
  { id: 'firepits', name: 'Fire Pits' },
  { id: 'beds', name: 'Garden Beds' },
]

const PRODUCTS = [
  {
    id: 'edge-100',
    title: 'Heavy-Duty Corten Steel Lawn Edging',
    category: 'edging',
    grade: 'Weathering Alloy ASTM A588',
    dimensions: '14 Gauge · 4" Height · 10ft Sections',
    image: IMG.prodEdging,
    tag: 'Contractor Standard',
    desc: 'Self-patinating oxide coating providing a perpetual weed shield and lawn separation that never rot or shifts.',
    cad: 'DWG / STEP available',
  },
  {
    id: 'planter-sq',
    title: 'Architectural Geometric Cube Planters',
    category: 'planters',
    grade: '3mm Welded Corten Steel',
    dimensions: '36" x 36" x 30" Depth',
    image: IMG.prodPlanter,
    tag: 'Luxury Spec',
    desc: 'Internal structural bracing with built-in drainage weep risers and optional automated subsurface drip connection.',
    cad: 'BIM / Revit 2026',
  },
  {
    id: 'wall-basalt',
    title: 'Interlocking Modular Retaining Systems',
    category: 'walls',
    grade: 'Chiseled Basalt & Reinforced Steel',
    dimensions: '12" Face · Engineered to 8ft Gravity',
    image: IMG.prodWall,
    tag: 'Structural Grade',
    desc: 'Permeable backfill drainage design certified for critical hillside stabilization and terraced garden elevations.',
    cad: 'PE Stamp Ready',
  },
  {
    id: 'fire-table',
    title: 'Monolithic Linear Fire Table',
    category: 'firepits',
    grade: 'Hardened Natural Basalt & Brass Burner',
    dimensions: '72" Length · 120,000 BTU Electronic Ignition',
    image: IMG.prodFirepit,
    tag: 'Outdoor Living',
    desc: 'Push-button spark ignition, flame-fail sensor, and glass wind screen compatible with natural gas or liquid propane.',
    cad: 'CSA Certified',
  },
  {
    id: 'bed-tiered',
    title: 'Modular Corten Raised Herb & Vegetable Bed',
    category: 'beds',
    grade: 'Food-Safe Organic Soil Barrier',
    dimensions: '8ft x 4ft x 24" Ergonomic Height',
    image: IMG.prodBed,
    tag: 'Urban Farm',
    desc: 'Fast interlocking keyhole assembly. Eliminates back bending while providing accelerated root temperature warming.',
    cad: 'Assembly Guide PDF',
  },
  {
    id: 'edge-flex',
    title: 'FlexCurve Tree Ring & Path Border',
    category: 'edging',
    grade: 'Cold-Rolled Carbon Steel with Hammer Stakes',
    dimensions: '3/16" Thick · Radius down to 3ft',
    image: IMG.prodFlex,
    tag: 'Clean Edges',
    desc: 'Engineered for serpentine garden walkways, mulch retention, and clean mower-wheel edging tracks.',
    cad: 'CAD Detail Sheet',
  },
]

export default function ProductLibrary({ onSelectProduct }) {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === activeCat)

  return (
    <section className="section prod-lib" id="products">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">Outdoor Hardware & Materials</span>
            <h2 className="h-display">
              Commercial-grade landscape products. <br />
              <span className="serif">Specified for modern projects.</span>
            </h2>
          </div>
          <p>
            Explore our verified steel edging systems, modular planters, retaining masonry, and outdoor fire features used by premier landscape contractors across the country.
          </p>
        </header>

        <div className="prod-lib__filters" data-reveal>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCat(cat.id)}
              className={`prod-lib__filter-btn ${activeCat === cat.id ? 'is-active' : ''}`}
              data-magnetic
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="prod-lib__grid">
          {filtered.map((prod) => (
            <div key={prod.id} className="prod-card" data-reveal data-cursor="Inspect">
              <div className="prod-card__media">
                <img src={prod.image} alt={prod.title} className="prod-card__img" />
                <span className="prod-card__tag">{prod.tag}</span>
              </div>

              <div className="prod-card__body">
                <div className="prod-card__meta">
                  <span className="prod-card__grade">{prod.grade}</span>
                  <span className="prod-card__dim">{prod.dimensions}</span>
                </div>

                <h3 className="prod-card__title">{prod.title}</h3>
                <p className="prod-card__desc">{prod.desc}</p>

                <div className="prod-card__foot">
                  <span className="prod-card__cad">
                    <Download className="w-3.5 h-3.5" />
                    <span>{prod.cad}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectProduct?.(prod)}
                    className="prod-card__btn"
                    data-magnetic
                  >
                    <span>Request Spec</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
