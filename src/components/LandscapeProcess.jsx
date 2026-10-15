import { useState } from 'react'
import { Compass, Sparkles, Hammer, Droplets, CheckCircle, ArrowRight } from 'lucide-react'
import { IMG } from '../media.js'
import '../styles/LandscapeProcess.css'

const STEPS = [
  {
    step: '01',
    icon: Compass,
    title: 'Laser Topography & Soil Telemetry',
    lead: 'Site elevation scans accurate to within 1/8th inch.',
    desc: 'Before breaking ground, our FAA-certified drone pilots and surveyors capture comprehensive elevation slope maps, drainage flow vectors, and solar exposure metrics.',
    deliverables: ['3D Point Cloud Mesh', 'Drainage Runoff Map', 'Tree Root Boundary Scan'],
    img: IMG.processLaser,
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'Unreal Engine 5 Botanical Renders',
    lead: 'Inspect plant maturity in summer, autumn, and night illumination.',
    desc: 'We place every native perennial, Corten planter, and stone step in high-definition virtual reality so stakeholders walk their future sanctuary before materials are dispatched.',
    deliverables: ['4K Photorealistic Stills', '360° VR Walkthrough', 'Permit-Ready CAD Sheets'],
    img: IMG.processUnreal,
  },
  {
    step: '03',
    icon: Hammer,
    title: 'Corten Steel & Basalt Execution',
    lead: 'Laser-cut metal fabrication meets master stonemasonry.',
    desc: 'Our dedicated in-house craftsmen install structural retaining walls, interlocking paver joints, and weathering Corten steel edging with sub-surface anchoring.',
    deliverables: ['ASTM A588 Alloy Edges', 'Level-Graded Basalt Terraces', 'Zero-Settling Compacted Base'],
    img: IMG.processBuild,
  },
  {
    step: '04',
    icon: Droplets,
    title: 'Smart Eco-Irrigation Handover',
    lead: 'WiFi micro-drip networks that slash water bills by 40%.',
    desc: 'We commission automated backflow valves, pressure-compensated drippers, and smartphone controls, backed by our 24-month craftsmanship warranty.',
    deliverables: ['Smartphone App Integration', 'Rain Sensor Commissioning', '2-Year Structural Warranty'],
    img: IMG.processIrrigation,
  },
]

export default function LandscapeProcess({ onTriggerConsultation }) {
  const [currentStep, setCurrentStep] = useState(0)
  const active = STEPS[currentStep]
  const Icon = active.icon

  return (
    <section className="section process-sec" id="process">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">End-to-End Methodology</span>
            <h2 className="h-display">
              Four steps from site survey <br />
              <span className="serif">to architectural reality.</span>
            </h2>
          </div>
          <p>
            We eliminate contractor ambiguity with a rigorous engineering lifecycle. Every project follows our verified 4-phase standard.
          </p>
        </header>

        <div className="process-sec__stepper" data-reveal>
          <div className="process-sec__bar">
            {STEPS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`process-sec__step-tab ${currentStep === idx ? 'is-active' : ''}`}
                data-magnetic
              >
                <span className="process-sec__step-num">{s.step}</span>
                <span className="process-sec__step-title">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="process-sec__stage">
            <div className="process-sec__info">
              <div className="process-sec__icon-head">
                <div className="process-sec__icon-box">
                  <Icon className="w-5 h-5 text-emerald" />
                </div>
                <span className="badge-tag">PHASE {active.step} OF 04</span>
              </div>

              <h3>{active.title}</h3>
              <p className="process-sec__lead">{active.lead}</p>
              <p className="process-sec__desc">{active.desc}</p>

              <div className="process-sec__deliverables">
                <strong>Phase Milestones:</strong>
                <ul>
                  {active.deliverables.map((d, i) => (
                    <li key={i}>
                      <CheckCircle className="w-3.5 h-3.5 text-leaf" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onTriggerConsultation}
                className="btn btn--primary process-sec__cta"
                data-magnetic
              >
                <span>Initiate Phase 01 on Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="process-sec__media">
              <img src={active.img} alt={active.title} className="process-sec__img" />
              <div className="process-sec__vignette" />
              <div className="process-sec__media-overlay">
                <span>Phase {active.step} in Field</span>
                <h4>{active.lead}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
