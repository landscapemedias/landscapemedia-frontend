import { Image, Clapperboard, Share2, Mail, Globe, CalendarDays, Smartphone } from 'lucide-react'
import { BRAND } from '../data/site'
import { useInView, useMouse } from '../hooks'
import { Words } from './ui'
import BrandLogo from './BrandLogo'

const CHIPS = [
  { icon: Image, t: 'Flyers' },
  { icon: Clapperboard, t: 'Reels', lt: true },
  { icon: Share2, t: 'Social media' },
  { icon: Mail, t: 'Email marketing', lt: true },
  { icon: Globe, t: 'Showcase website' },
  { icon: CalendarDays, t: 'Appointment calendar', lt: true },
  { icon: Smartphone, t: 'Booking apps' },
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
            {BRAND.name} {BRAND.word} is a branding and media studio for landscape companies. Flyers, reels, social media, email, websites and booking apps, all from one team.
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
            The first media studio built <em>only</em> for landscape companies.
            <small>Snow removal, tree cutting, weekly maintenance, micro organic farms, green houses, glass verandas and design firms. If it grows outside, we make it look good online.</small>
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
