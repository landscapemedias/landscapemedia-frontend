import { useEffect, useRef, useState } from 'react'
import { Layers, MoveHorizontal, Check, Compass, Sparkles } from 'lucide-react'
import { IMG } from '../media.js'
import '../styles/BlueprintToRender.css'

const PROJECTS = [
  {
    id: 'estate',
    title: 'Highland Sloping Estate',
    type: 'Multi-Tier Hardscape & Native Beds',
    dimensions: '6,400 SQ FT · 4 LEVEL GRADING',
    cadDetails: 'DWG #LD-2026-A · REV 3 · SCALE 1:50',
    blueprintSvg: (
      <svg className="b2r__svg" viewBox="0 0 500 320" aria-hidden="true">
        <defs>
          <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadGrid)" />
        <g stroke="#4ade80" strokeWidth="1.5" fill="none">
          <path d="M 60 70 L 260 40 L 440 90 L 240 140 Z" strokeDasharray="3 3" />
          <path d="M 60 70 L 60 190 L 240 250 L 240 140" />
          <path d="M 240 250 L 440 200 L 440 90" />
          <path d="M 110 130 L 190 155 L 190 230" stroke="#86efac" />
          <path d="M 270 170 L 390 140 L 390 190" stroke="#86efac" />
          <circle cx="160" cy="90" r="18" stroke="#22c55e" strokeDasharray="2 2" />
          <circle cx="340" cy="110" r="22" stroke="#22c55e" strokeDasharray="2 2" />
          <circle cx="270" cy="80" r="14" stroke="#22c55e" strokeDasharray="2 2" />
        </g>
        <g stroke="#ffffff" strokeWidth="1" strokeDasharray="4 2">
          <line x1="40" y1="70" x2="40" y2="190" />
          <line x1="34" y1="70" x2="46" y2="70" />
          <line x1="34" y1="190" x2="46" y2="190" />
        </g>
        <text x="18" y="135" fill="#86efac" fontSize="10" fontFamily="monospace">ELEV: +14.5'</text>
        <text x="60" y="295" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="monospace">TIER 1 BASALT RETAINING WALL</text>
        <text x="310" y="295" fill="#86efac" fontSize="11" fontFamily="monospace">ZONE-3 DRIP</text>
      </svg>
    ),
    renderImage: IMG.blueprintEstate,
    specs: ['Laser Elevation Survey', 'Basalt Stone Retaining Wall', 'Smart WiFi Drip Valves', 'Native Bluegrass Sod'],
  },
  {
    id: 'corten',
    title: 'Corten Steel & Zen Courtyard',
    type: 'Minimalist Architectural Edge',
    dimensions: '2,200 SQ FT · RAIN GARDEN',
    cadDetails: 'DWG #CS-8812-B · SCALE 1:25',
    blueprintSvg: (
      <svg className="b2r__svg" viewBox="0 0 500 320" aria-hidden="true">
        <defs>
          <pattern id="cadGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadGrid2)" />
        <g stroke="#4ade80" strokeWidth="1.5" fill="none">
          <rect x="80" y="60" width="340" height="180" rx="8" strokeDasharray="4 2" />
          <rect x="120" y="90" width="120" height="120" stroke="#86efac" />
          <circle cx="320" cy="150" r="45" stroke="#22c55e" />
          <path d="M 80 200 L 420 200" stroke="#f59e0b" strokeWidth="2" />
        </g>
        <text x="90" y="45" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="monospace">WEATHERING CORTEN CURVE R=12.0</text>
        <text x="135" y="155" fill="#86efac" fontSize="10" fontFamily="monospace">RAKED GRAVEL</text>
        <text x="295" y="155" fill="#86efac" fontSize="10" fontFamily="monospace">BASIN</text>
      </svg>
    ),
    renderImage: IMG.blueprintCorten,
    specs: ['3mm Atmospheric Corten Alloy', 'Zero-Splash Fountain Recirculator', 'Black River Polished Pebbles', 'Japanese Maple Specimen'],
  },
  {
    id: 'pergola',
    title: 'Pergola Terrace & Fire Lounge',
    type: 'Outdoor Living Architecture',
    dimensions: '3,800 SQ FT · ALFRESCO DINE',
    cadDetails: 'DWG #PT-4401-C · SCALE 1:40',
    blueprintSvg: (
      <svg className="b2r__svg" viewBox="0 0 500 320" aria-hidden="true">
        <defs>
          <pattern id="cadGrid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadGrid3)" />
        <g stroke="#4ade80" strokeWidth="1.5" fill="none">
          <path d="M 90 70 L 390 70 L 340 220 L 40 220 Z" />
          <line x1="140" y1="70" x2="90" y2="220" stroke="#86efac" />
          <line x1="190" y1="70" x2="140" y2="220" stroke="#86efac" />
          <line x1="240" y1="70" x2="190" y2="220" stroke="#86efac" />
          <line x1="290" y1="70" x2="240" y2="220" stroke="#86efac" />
          <line x1="340" y1="70" x2="290" y2="220" stroke="#86efac" />
          <circle cx="210" cy="145" r="26" stroke="#f59e0b" strokeWidth="2" />
        </g>
        <text x="160" y="150" fill="#f59e0b" fontSize="10" fontFamily="monospace">GAS FIRE PIT</text>
        <text x="60" y="270" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="monospace">BLUETONE FLAGGING OVER COMPACTED CRUSH</text>
      </svg>
    ),
    renderImage: IMG.blueprintPergola,
    specs: ['Structural Cedar Timber Frame', 'Granite Prep Countertop', 'Natural Bluestone Pavers', 'Low-Voltage Riser Lights'],
  },
]

export default function BlueprintToRender() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [splitPos, setSplitPos] = useState(50)
  const [isInteracted, setIsInteracted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)
  const activeProject = PROJECTS[selectedIdx]

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setIsVisible(true)
    }, { threshold: 0.3 })

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInteracted || !isVisible) return
    let animFrame = 0
    const start = performance.now()
    const loop = (now) => {
      setSplitPos(50 + Math.sin((now - start) / 1000) * 18)
      animFrame = requestAnimationFrame(loop)
    }
    animFrame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrame)
  }, [isInteracted, isVisible])

  const handlePointerMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setSplitPos(Math.min(95, Math.max(5, pct)))
    setIsInteracted(true)
  }

  return (
    <section className="section b2r" id="renders">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">From Blueprint to Living Reality</span>
            <h2 className="h-display">
              Send us the site sketch. <br />
              <span className="serif">We build the living masterpiece.</span>
            </h2>
          </div>
          <p>
            Whether you have a hand-drawn napkin sketch, a municipal survey, or an architectural CAD file, our digital media engine transforms it into realistic 3D lighting, vegetation models, and build-ready field specifications before a single shovel enters the ground.
          </p>
        </header>

        <div className="b2r__grid">
          <div className="b2r__selector" data-reveal>
            {PROJECTS.map((proj, i) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(i)
                  setSplitPos(50)
                }}
                className={`b2r__project-tab ${selectedIdx === i ? 'is-active' : ''}`}
                data-magnetic
              >
                <div className="b2r__tab-head">
                  <span className="b2r__tab-index">0{i + 1}</span>
                  <h4>{proj.title}</h4>
                </div>
                <p>{proj.type}</p>
                <div className="b2r__tab-meta">
                  <span>{proj.dimensions}</span>
                </div>
              </button>
            ))}

            <div className="b2r__specs-card" data-reveal>
              <div className="b2r__specs-title">
                <Compass className="w-4 h-4 text-emerald" />
                <span>Field Specs Included</span>
              </div>
              <ul className="b2r__specs-list">
                {activeProject.specs.map((spec, idx) => (
                  <li key={idx}>
                    <Check className="w-3.5 h-3.5 text-leaf" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="b2r__stage-wrap" data-reveal style={{ '--d': '0.12s' }}>
            <div 
              className="b2r__stage" 
              ref={containerRef}
              onPointerDown={(e) => handlePointerMove(e.clientX)}
              onPointerMove={(e) => {
                if (e.buttons === 1) handlePointerMove(e.clientX)
              }}
              data-cursor="Drag"
            >
              <div className="b2r__pane b2r__pane--blueprint">
                <div className="b2r__blueprint-canvas">
                  {activeProject.blueprintSvg}
                  <div className="b2r__label-tag b2r__label-tag--left">
                    <span>2D CAD Blueprint</span>
                    <small>{activeProject.cadDetails}</small>
                  </div>
                </div>
              </div>

              <div 
                className="b2r__pane b2r__pane--render"
                style={{ clipPath: `inset(0 0 0 ${splitPos}%)` }}
              >
                <img 
                  src={activeProject.renderImage} 
                  alt={activeProject.title} 
                  className="b2r__render-img"
                />
                <div className="b2r__label-tag b2r__label-tag--right">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-leaf" />
                    <span>Finished 3D Masterpiece</span>
                  </span>
                  <small>Photorealistic Sunlight & Flora Simulation</small>
                </div>
              </div>

              <div 
                className="b2r__handle" 
                style={{ left: `${splitPos}%` }}
              >
                <div className="b2r__handle-line" />
                <div className="b2r__handle-knob">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="b2r__caption">
              <span>Interactive Slider: Drag left or right to compare architectural blueprint with the live finished estate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
