import { Trees, Compass, Layers, Camera, Smartphone, Droplets, ArrowUpRight } from 'lucide-react'
import '../styles/Services.css'

const CAPABILITIES = [
  {
    icon: Compass,
    title: '3D Photorealistic Landscape Modeling',
    tag: 'Architectural Media',
    desc: 'Full-scale virtual walk-throughs, sunlight angle analysis, plant growth simulations, and municipal permit CAD packages.',
    meta: 'Unreal Engine 5 · 4K Textures · 48h Turnaround',
  },
  {
    icon: Layers,
    title: 'Corten Steel & Architectural Fabrication',
    tag: 'Outdoor Products',
    desc: 'Heavy-gauge weathering steel edging, modular cube planters, and zero-maintenance rain garden borders specified for contractors.',
    meta: 'ASTM A588 Alloy · Laser Cut Tolerances',
  },
  {
    icon: Trees,
    title: 'Turf Renovation & Botanical Curation',
    tag: 'Softscaping',
    desc: 'Championship grade sod installation, microclover lawn alternatives, and drought-hardy native perennial ecosystems.',
    meta: 'Pet-Safe Organic Nutrients · Laser Graded',
  },
  {
    icon: Camera,
    title: 'Drone Cinematography & Site Media',
    tag: 'Media Production',
    desc: '4K aerial elevation surveys, pre-and-post construction time-lapses, and marketing reels designed to win commercial bids.',
    meta: 'FAA Part 107 Certified Pilots · HDR Video',
  },
  {
    icon: Droplets,
    title: 'Smart WiFi Drip & Micro-Irrigation',
    tag: 'Water Tech',
    desc: 'Weather-sensing automatic manifold controllers, pressure-compensated drip emitters, and smart phone leak notifications.',
    meta: 'EPA WaterSense Partner · 40% Water Savings',
  },
  {
    icon: Smartphone,
    title: 'Contractor Digital Platforms & Bidding Apps',
    tag: 'Growth Systems',
    desc: 'Modern web portals, real-time client cost calculators, and CRM integrations built exclusively for landscape businesses.',
    meta: 'Precast Architecture · High-Velocity Leads',
  },
]

export default function Services({ onSelectService }) {
  return (
    <section className="section services-sec" id="services">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">Studio Capabilities</span>
            <h2 className="h-display">
              Built for high-end landscapes. <br />
              <span className="serif">From site soil to digital screen.</span>
            </h2>
          </div>
          <p>
            We bridge physical contracting with modern media technology. Whether crafting outdoor spaces or equipping contractors with digital 3D tools, our standards remain uncompromising.
          </p>
        </header>

        <div className="services-sec__grid">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div 
                key={i} 
                className="service-card" 
                data-reveal 
                style={{ '--d': `${i * 0.08}s` }}
                data-cursor="Inspect"
              >
                <div className="service-card__head">
                  <div className="service-card__icon-box">
                    <Icon className="w-5 h-5 text-emerald" />
                  </div>
                  <span className="service-card__tag">{cap.tag}</span>
                </div>

                <h3 className="service-card__title">{cap.title}</h3>
                <p className="service-card__desc">{cap.desc}</p>

                <div className="service-card__foot">
                  <span className="service-card__meta">{cap.meta}</span>
                  <button 
                    type="button" 
                    onClick={() => onSelectService?.(cap.title)}
                    className="service-card__link"
                    data-magnetic
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
