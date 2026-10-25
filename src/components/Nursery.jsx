import { useState } from 'react'
import {
  Palette, Globe, CalendarCheck, Smartphone, Printer, Clapperboard, MessageCircleHeart, Mail,
  Phone, Headphones, Building2, BarChart3, Plus, Check, ArrowUpRight,
} from 'lucide-react'
import { Btn, Words } from './ui'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [Palette, Globe, CalendarCheck, Smartphone, Printer, Clapperboard, MessageCircleHeart, Mail, Phone, Headphones, Building2, BarChart3]
const WIDE = new Set(['02', '04', '09', '10'])

const BRANCHES = [
  'M0 34 C120 18 240 44 380 30 C520 16 640 40 780 28 C900 18 1020 38 1200 24',
  'M0 26 C140 40 260 16 400 30 C540 44 660 20 800 32 C940 42 1060 18 1200 30',
]
const TWIGS = [
  { x: 150, d: 'M150 30 C162 14 176 8 194 4' },
  { x: 470, d: 'M470 26 C480 44 498 52 520 54' },
  { x: 700, d: 'M700 34 C712 18 730 12 752 10' },
  { x: 1010, d: 'M1010 28 C1022 46 1040 54 1062 56' },
]
const LEAVES = [
  [196, 4, -30], [176, 10, 20], [522, 54, 40], [500, 50, -10], [754, 10, -40], [734, 14, 10],
  [1064, 56, 30], [1044, 52, -20], [300, 34, 70], [880, 24, -60], [60, 30, 50], [1150, 26, -35],
]

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Branch({ k }) {
  return (
    <svg className="ns-branch" viewBox="0 0 1200 64" preserveAspectRatio="none" aria-hidden="true">
      <path className="ns-wood" pathLength="1" d={BRANCHES[k % 2]} />
      {TWIGS.map((t) => (
        <path key={t.x} className="ns-twig" pathLength="1" d={t.d} />
      ))}
      {LEAVES.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path className="ns-leaf" style={{ '--i': i }} d="M0 0 C6 -10 18 -12 26 -6 C18 2 6 4 0 0Z" />
        </g>
      ))}
    </svg>
  )
}

function toRows(list) {
  const rows = []
  let row = []
  let span = 0
  list.forEach((s, i) => {
    const w = WIDE.has(s.n) ? 2 : 1
    if (span + w > 4) {
      rows.push(row)
      row = []
      span = 0
    }
    row.push({ s, i })
    span += w
  })
  if (row.length) rows.push(row)
  return rows
}

export default function Nursery() {
  const [open, setOpen] = useState(null)
  const { t } = useLanguage()
  const data = t.services
  const cardLabels = data.card || {}
  const rows = toRows(data.list || [])

  return (
    <section className="section nursery" id="services">
      <div className="ns-orb a" aria-hidden="true" />
      <div className="ns-orb b" aria-hidden="true" />
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

        {rows.map((row, r) => (
          <div className="ns-row" key={r} data-reveal="">
            <Branch k={r} />
            <div className="ns-grid">
              {row.map(({ s, i }, j) => {
                const Icon = ICONS[i] || Globe
                const wide = WIDE.has(s.n)
                const isOpen = wide || open === i
                return (
                  <div className={`ns-hang ${wide ? 'wide' : ''}`} key={s.n} style={{ '--i': i, '--j': j }}>
                    <span className="ns-rope" aria-hidden="true" />
                    {wide && <span className="ns-rope two" aria-hidden="true" />}
                    <article
                      className={`ns-card ${wide ? 'wide' : ''} ${isOpen ? 'open' : ''}`}
                      onPointerMove={spot}
                      onClick={() => !wide && setOpen(open === i ? null : i)}
                    >
                      <span className="ns-glow" aria-hidden="true" />
                      <span className="ns-num" aria-hidden="true">{s.n}</span>
                      <div className="ns-top">
                        <span className="ns-ico"><Icon size={24} strokeWidth={1.8} /></span>
                        {!wide && (
                          <button type="button" className="ns-toggle" aria-expanded={isOpen} aria-label={cardLabels.whatsIncluded}>
                            <Plus size={18} />
                          </button>
                        )}
                      </div>
                      <div className="ns-main">
                        <small className="ns-tagline">{s.tag}</small>
                        <h3 className="ns-name">{s.name}</h3>
                        <p className="ns-latin">{s.latin}</p>
                        <div className="ns-meta">
                          <span><em>{cardLabels.format}</em>{s.season}</span>
                          <span><em>{cardLabels.turnaround}</em>{s.freq}</span>
                        </div>
                      </div>
                      <div className="ns-more">
                        <div>
                          <ul>
                            {s.items.map((it) => (
                              <li key={it}><Check size={14} strokeWidth={3} /> {it}</li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            className="ns-ask"
                            onClick={(e) => {
                              e.stopPropagation()
                              scrollToId('book')
                            }}
                          >
                            {cardLabels.requestService?.replace(' →', '')} <ArrowUpRight size={15} />
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="ns-foot" data-reveal="">
          <p>{data.footText}</p>
          <Btn onClick={() => scrollToId('book')}>{data.auditBtn}</Btn>
        </div>
      </div>
    </section>
  )
}
