import { Image, Clapperboard, Globe, CalendarDays, PhoneCall, Headphones, Building2 } from 'lucide-react'
import { BRAND } from '../data/site'
import { useInView, useMouse } from '../hooks'
import { Words } from './ui'
import BrandLogo from './BrandLogo'
import { useLanguage } from '../context/LanguageContext'

const CHIP_ICONS = [Image, PhoneCall, Headphones, Building2, Globe, CalendarDays, Clapperboard]

export default function BrandReveal() {
  const [ref, seen] = useInView({ threshold: 0.35 })
  const m = useMouse()
  const { t } = useLanguage()
  const data = t.brandReveal

  const chips = (data.chips || []).map((c, i) => ({
    ...c,
    icon: CHIP_ICONS[i] || Globe,
  }))

  return (
    <section className="section brand" id="brand">
      <div className="wrap">
        <div className="br-head">
          <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
          <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
            <Words text={data.title1} />
            <br />
            <Words text={data.title2} delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <div className={`br-stage ${seen ? 'in' : ''}`} ref={ref}>
          <div className="br-sheet" style={{ transform: `rotateY(${m.x * 5}deg) rotateX(${m.y * -4}deg)` }}>
            <span className="br-crop tl" />
            <span className="br-crop tr" />
            <span className="br-crop bl" />
            <span className="br-crop br" />
            <span className="br-label a">{data.labels?.a || 'Primary mark · 2026'}</span>
            <span className="br-label b">{data.labels?.b || 'Wordmark'}</span>
            <span className="br-label c">{data.labels?.c || 'Device: your work, on every screen'}</span>
            <span className="br-label d">{data.labels?.d || 'Sub-mark · Media'}</span>
            <div className="br-logo">
              <BrandLogo play={seen} />
            </div>
          </div>
          {chips.map((c, i) => (
            <span
              key={c.t + i}
              className={`br-chip c${i} ${c.lt ? 'lt' : ''}`}
              style={{ '--i': i, marginLeft: m.x * (14 + i * 4), marginTop: m.y * (10 + i * 3) }}
            >
              <i>
                <c.icon size={15} />
              </i>
              {c.t}
            </span>
          ))}
        </div>

        <div className="br-foot">
          <p className="br-first" data-reveal="">
            {data.footFirst} <em>{data.footEmphasis}</em> {data.footAfter}
            <small>{data.footSmall}</small>
          </p>
          <div className="br-swatches" data-reveal="" style={{ '--d': '0.1s' }}>
            {BRAND.colors.map((c) => (
              <div className="br-sw" key={c.k}>
                <span style={{ '--c': c.hex }} />
                <small>
                  <b>{c.k}</b>
                  {c.hex}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
