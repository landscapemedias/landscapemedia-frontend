import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const { t } = useLanguage()
  const data = t.faq || {}
  const list = data.list || []

  return (
    <section className="section faq">
      <div className="wrap faq-grid">
        <div>
          <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
          <h2 className="h-display h-md" style={{ marginTop: 18 }}>
            <Words text={data.title1} /> <Words text={data.title2} delay={0.12} className="ital" />
          </h2>
        </div>
        <div className="faq-list">
          {list.map((f, i) => (
            <div key={f.q || i} className={`faq-item ${open === i ? 'open' : ''}`} data-reveal="" style={{ '--d': `${i * 0.05}s` }}>
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
