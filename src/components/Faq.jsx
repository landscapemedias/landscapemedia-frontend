import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQ } from '../data/site'
import { Words } from './ui'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq">
      <div className="wrap faq-grid">
        <div>
          <span className="eyebrow" data-reveal="">FAQ</span>
          <h2 className="h-display h-md" style={{ marginTop: 18 }}>
            <Words text="Good questions," /> <Words text="straight answers." delay={0.12} className="ital" />
          </h2>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`} data-reveal="" style={{ '--d': `${i * 0.05}s` }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <i>
                  <Plus size={18} />
                </i>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
