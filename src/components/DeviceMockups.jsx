import { useRef, useState } from 'react'
import { Smartphone, Tablet, Monitor, Sparkles, Check, ArrowRight, Layers, Box, Flame } from 'lucide-react'
import { useScrollProgress } from '../hooks'
import { IMG } from '../media.js'
import '../styles/DeviceMockups.css'

const MOBILE_CATEGORIES = [
  { name: 'Steel Edging', count: '14 Gauge Corten', icon: Layers },
  { name: 'Planters', count: 'Modular Welded Cube', icon: Box },
  { name: 'Retaining Walls', count: 'Interlocking Basalt', icon: Layers },
  { name: 'Fire Pits', count: '120k BTU Electronic', icon: Flame },
]

export default function DeviceMockups({ onSelectDeviceAction }) {
  const ref = useRef(null)
  const progress = useScrollProgress(ref)
  const [activeCat, setActiveCat] = useState(0)

  const phoneShift = (0.5 - progress) * 90
  const tabletShift = (0.5 - progress) * -65
  const desktopShift = (0.5 - progress) * 40

  return (
    <section className="section mockups-sec" id="mockups" ref={ref}>
      <div className="wrap">
        <header className="section-head section-head--center" data-reveal>
          <span className="eyebrow">Multi-Screen Digital Infrastructure</span>
          <h2 className="h-display">
            Your landscape enterprise, <br />
            <span className="serif">synced across every device.</span>
          </h2>
          <p>
            From field crews taking laser elevation measurements on iPads to clients ordering Corten steel planters from their phones, our unified digital ecosystem elevates the modern outdoor contractor.
          </p>
        </header>

        <div className="mockups-stage">
          <div 
            className="mockup-item mockup-item--desktop"
            style={{ transform: `translate3d(0, ${desktopShift}px, 0)` }}
            data-reveal
          >
            <div className="mockup-frame mockup-frame--desktop">
              <div className="mockup-bar">
                <div className="mockup-dots">
                  <span /><span /><span />
                </div>
                <div className="mockup-url">app.landscapework.com/dispatch</div>
              </div>
              <div className="mockup-content mockup-content--desktop">
                <div className="desktop-hud">
                  <div className="desktop-hud__top">
                    <div>
                      <span className="badge-tag">CONTRACTOR DISPATCH</span>
                      <h4>Highland Valley Estate · Crew #03</h4>
                    </div>
                    <span className="desktop-hud__live">● Live Drone Elevation Feed</span>
                  </div>
                  <div className="desktop-hud__grid">
                    <div className="desktop-hud__metric">
                      <span>Total Hardscape Area</span>
                      <strong>4,850 SQ FT</strong>
                    </div>
                    <div className="desktop-hud__metric">
                      <span>Corten Steel Specified</span>
                      <strong>280 Lin. Ft.</strong>
                    </div>
                    <div className="desktop-hud__metric">
                      <span>Estimated Completion</span>
                      <strong>Thu, Oct 22</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="mockup-item mockup-item--tablet"
            style={{ transform: `translate3d(0, ${tabletShift}px, 0) rotate(-2deg)`, '--d': '0.12s' }}
            data-reveal
          >
            <div className="mockup-frame mockup-frame--tablet">
              <div className="tablet-screen">
                <div className="tablet-header">
                  <div className="flex items-center gap-2">
                    <Tablet className="w-4 h-4 text-emerald" />
                    <strong>Field CAD Inspector</strong>
                  </div>
                  <span className="tablet-badge">Laser Topo Connected</span>
                </div>
                <div className="tablet-viewport">
                  <img 
                    src={IMG.deviceFieldInspect} 
                    alt="3D Landscape Inspection" 
                    className="tablet-img"
                  />
                  <div className="tablet-radar">
                    <span className="tablet-radar-circle" />
                    <span className="tablet-radar-pin" style={{ top: '35%', left: '45%' }}>P1</span>
                    <span className="tablet-radar-pin" style={{ top: '65%', left: '60%' }}>P2</span>
                  </div>
                  <div className="tablet-dock">
                    <span>Grade: +4.2%</span>
                    <span>Zone: Rain Garden</span>
                    <span>Soil: Sandy Loam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="mockup-item mockup-item--phone"
            style={{ transform: `translate3d(0, ${phoneShift}px, 0) rotate(3deg)`, '--d': '0.2s' }}
            data-reveal
          >
            <div className="mockup-frame mockup-frame--phone">
              <div className="phone-notch">
                <span className="phone-speaker" />
              </div>
              <div className="phone-screen">
                <div className="phone-app-head">
                  <div>
                    <span className="phone-app-sub">Outdoor Living</span>
                    <h4>Landscape Work</h4>
                  </div>
                  <div className="phone-app-avatar">LW</div>
                </div>

                <div className="phone-banner">
                  <span className="phone-pill">Featured Products</span>
                  <h3>Modern Outdoor Spaces</h3>
                  <small>Architectural Corten & Hardscapes</small>
                </div>

                <div className="phone-cats-title">
                  <span>Shop by Category</span>
                </div>

                <div className="phone-cat-grid">
                  {MOBILE_CATEGORIES.map((c, i) => {
                    const Icon = c.icon
                    const isSel = activeCat === i
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveCat(i)}
                        className={`phone-cat-card ${isSel ? 'is-active' : ''}`}
                      >
                        <div className="phone-cat-icon">
                          <Icon className="w-4 h-4" />
                        </div>
                        <strong>{c.name}</strong>
                        <span>{c.count}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="phone-cta">
                  <button
                    type="button"
                    onClick={onSelectDeviceAction}
                    className="phone-cta-btn"
                  >
                    <span>Instant Project Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
