import { Image, Clapperboard, Globe, CalendarDays, PhoneCall, Headphones, Building2 } from 'lucide-react'
import { BRAND } from '../data/site'
import { useInView, useMouse } from '../hooks'
import { Words } from './ui'
import BrandLogo from './BrandLogo'

const CHIPS = [
  { icon: Image, t: 'Flyers' },
  { icon: PhoneCall, t: 'Vanity numbers', lt: true },
  { icon: Headphones, t: 'Live answering' },
  { icon: Building2, t: 'Melville mailbox', lt: true },
  { icon: Globe, t: 'Showcase website' },
  { icon: CalendarDays, t: 'Calendar & apps', lt: true },
  { icon: Clapperboard, t: 'Reels & video' },
]

export default function BrandReveal() {
  const [ref, seen] = useInView({ threshold: 0.35 })
  const m = useMouse()

  return (
    <section className="section brand" id="brand">
      <div className="wrap">
        <div className="br-head">
          <span className="eyebrow" data-reveal="">Meet the brand</span>
          <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
            <Words text="Media that grows" />
            <br />
            <Words text="landscape companies." delay={0.15} className="ital" />
          </h2>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {BRAND.name} {BRAND.word} provides full-scale digital services exclusively for landscape companies. From showcasing your finest plants, perennials and estate designs to building websites, client booking apps, viral reels, vanity numbers and 24/7 live answering.
          </p>
        </div>

        <div className={`br-stage ${seen ? 'in' : ''}`} ref={ref}>
          <div className="br-sheet" style={{ transform: `rotateY(${m.x * 5}deg) rotateX(${m.y * -4}deg)` }}>
            <span className="br-crop tl" />
            <span className="br-crop tr" />
            <span className="br-crop bl" />
            <span className="br-crop br" />
            <span className="br-label a">Primary mark · 2026</span>
            <span className="br-label b">Wordmark</span>
            <span className="br-label c">Device: your work, on every screen</span>
            <span className="br-label d">Sub-mark · Media</span>
            <div className="br-logo">
              <BrandLogo play={seen} />
            </div>
          </div>
          {CHIPS.map((c, i) => (
            <span
              key={c.t}
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
            The digital services studio built <em>only</em> for landscape companies.
            <small>From rare plants, lush perennial gardens and sod installations to snow removal and glass verandas. We bring your outdoor craftsmanship into the modern digital world with stunning media and seamless booking technology.</small>
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
