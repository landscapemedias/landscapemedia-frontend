import { useEffect, useMemo, useRef, useState } from 'react'
import { RotateCcw, Phone, QrCode, DoorOpen, CalendarCheck } from 'lucide-react'
import { IMG } from '../data/site'
import { Words } from './ui'

const W = 800
const ROADS = [110, 270, 430]
const X0 = 70
const X1 = 730
const STREETS = ['Maple Ave', 'Oak Street', 'Birch Lane']
const SERVICES = ['Spring cleanup', 'Weekly mowing plan', 'Mulch & beds', 'Leaf cleanup', 'Hedge trimming', 'Snow contract']
const RUN = 11000
const ROW = X1 - X0
const TURN = ROADS[1] - ROADS[0]
const TOTAL = ROW * 3 + TURN * 2
const TOTAL_DOORS = 2500

function distAt(row, x) {
  const base = row * (ROW + TURN)
  return base + (row % 2 === 0 ? x - X0 : X1 - x)
}

function pointAt(d) {
  for (let r = 0; r < 3; r++) {
    const base = r * (ROW + TURN)
    if (d <= base + ROW) {
      const k = d - base
      return r % 2 === 0 ? { x: X0 + k, y: ROADS[r], a: 0 } : { x: X1 - k, y: ROADS[r], a: 180 }
    }
    if (r < 2 && d <= base + ROW + TURN) {
      const k = d - base - ROW
      return { x: r % 2 === 0 ? X1 : X0, y: ROADS[r] + k, a: 90 }
    }
  }
  return { x: X1, y: ROADS[2], a: 0 }
}

const ROUTE = `M${X0} ${ROADS[0]} H${X1} V${ROADS[1]} H${X0} V${ROADS[2]} H${X1}`

function useHouses() {
  return useMemo(() => {
    const out = []
    ROADS.forEach((y, r) => {
      for (let c = 0; c < 12; c++) {
        const x = 100 + c * 55
        ;[-1, 1].forEach((side) => {
          const i = out.length
          out.push({
            x,
            y: y + side * 42,
            side,
            d: distAt(r, x) / TOTAL,
            booked: (i * 7 + r * 3) % 11 === 0,
            addr: `${12 + c * 4 + (side > 0 ? 1 : 0)} ${STREETS[r]}`,
            svc: SERVICES[(i * 5) % SERVICES.length],
            hue: ['#e9d9c0', '#d8e4d0', '#e6d4cf', '#dcdfe8'][(i * 3) % 4],
          })
        })
      }
    })
    return out
  }, [])
}

export default function FlyerDrop() {
  const houses = useHouses()
  const secRef = useRef(null)
  const [t, setT] = useState(0)
  const [visible, setVisible] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(secRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(1)
      return
    }
    let raf
    let restart
    const t0 = performance.now() - (t >= 1 ? 0 : t) * RUN
    const step = (now) => {
      const k = Math.min(1, (now - t0) / RUN)
      setT(k)
      if (k < 1) raf = requestAnimationFrame(step)
      else restart = setTimeout(() => setRun((x) => x + 1), 4500)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(restart)
    }
  }, [visible, run])

  const replay = () => {
    setT(0)
    setRun((x) => x + 1)
  }

  const van = pointAt(t * TOTAL)
  const dropped = houses.filter((h) => h.d <= t).length
  const booked = houses.filter((h) => h.booked && h.d + 0.06 <= t)
  const doors = Math.round((dropped / houses.length) * TOTAL_DOORS)
  const scans = Math.round(doors * 0.072)
  const calls = Math.round(doors * 0.021)
  const visits = booked.length * 4

  return (
    <section className="section dark fd" id="flyer-drop" ref={secRef}>
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Neighbourhood drops</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="2,500 doors." />
              <br />
              <Words text="One Saturday." className="ital" delay={0.15} />
              <br />
              <Words text="Every call tracked." delay={0.3} />
            </h2>
          </div>
          <p className="lead" data-reveal="">
            We design the door hanger, print it, plan the route and put a tracked QR and phone number on every one. Watch a route run and the bookings come back in.
          </p>
        </div>

        <div className="fd-grid">
          <div className="fd-map" data-reveal="scale">
            <svg viewBox={`0 0 ${W} 540`} aria-label="Animated map of a flyer delivery route through a neighbourhood">
              <defs>
                <pattern id="fd-lawn" width="14" height="14" patternUnits="userSpaceOnUse">
                  <rect width="14" height="14" fill="#2c5a3c" />
                  <circle cx="3" cy="4" r="1" fill="#3b7149" />
                  <circle cx="10" cy="11" r="1" fill="#3b7149" />
                </pattern>
              </defs>
              <rect width={W} height="540" fill="url(#fd-lawn)" />

              {[[30, 190, 22], [770, 190, 18], [770, 350, 18], [30, 350, 16], [770, 500, 22], [230, 24, 13], [600, 24, 14], [420, 510, 14]].map(([x, y, r], i) => (
                <g key={i} className="fd-tree" style={{ animationDelay: `${i * 0.4}s` }}>
                  <circle cx={x} cy={y} r={r} fill="#3f8a4b" />
                  <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.55} fill="#5fa357" />
                </g>
              ))}

              <g className="fd-roads">
                {ROADS.map((y) => (
                  <rect key={y} x="40" y={y - 13} width="720" height="26" rx="13" />
                ))}
                <rect x={X1 - 13} y={ROADS[0]} width="26" height={TURN} />
                <rect x={X0 - 13} y={ROADS[1]} width="26" height={TURN} />
              </g>
              {ROADS.map((y, i) => (
                <text key={y} x={i % 2 ? 712 : 88} y={y + 4} className="fd-street" textAnchor={i % 2 ? 'end' : 'start'}>
                  {STREETS[i].toUpperCase()}
                </text>
              ))}

              <path d={ROUTE} className="fd-route-bg" />
              <path d={ROUTE} className="fd-route" pathLength="1" style={{ strokeDashoffset: 1 - t }} />

              {houses.map((h, i) => {
                const hit = h.d <= t
                const isBooked = h.booked && h.d + 0.06 <= t
                const roofY = h.side < 0 ? h.y - 14 : h.y + 2
                return (
                  <g key={i} className={`fd-house ${hit ? 'hit' : ''} ${isBooked ? 'booked' : ''}`} transform={`translate(${h.x} ${h.y})`}>
                    <rect x="-17" y={h.side < 0 ? -26 : -4} width="34" height="30" rx="4" className="fd-yard" />
                    <rect x="-12" y={roofY - h.y - 2} width="24" height="20" rx="2" style={{ fill: hit ? h.hue : '#6f7f74' }} className="fd-roof" />
                    <path d={`M-12 ${roofY - h.y - 2} L-5 ${roofY - h.y + 8} L-12 ${roofY - h.y + 18} M12 ${roofY - h.y - 2} L5 ${roofY - h.y + 8} L12 ${roofY - h.y + 18} M-5 ${roofY - h.y + 8} H5`} stroke="rgba(0,0,0,.22)" strokeWidth="1.2" fill="none" />
                    <g className="fd-tag" transform={`translate(10 ${h.side < 0 ? 4 : -6})`}>
                      <rect x="-3" y="-6" width="6" height="11" rx="1.5" />
                    </g>
                    {h.booked && (
                      <g className="fd-pin" transform={`translate(0 ${h.side < 0 ? -34 : -12})`}>
                        <circle r="14" className="fd-ping" />
                        <path d="M0 6 C-8 -2 -8 -14 0 -14 C8 -14 8 -2 0 6Z" />
                        <circle cy="-7" r="3" fill="#1b3d2b" />
                      </g>
                    )}
                  </g>
                )
              })}

              <g transform={`translate(${van.x} ${van.y}) rotate(${van.a})`} className="fd-van">
                <circle r="26" className="fd-van-halo" />
                <rect x="-16" y="-9" width="32" height="18" rx="5" fill="#f3efe3" />
                <rect x="6" y="-8" width="9" height="16" rx="3" fill="#b8e86a" />
                <path d="M-12 -9 L0 -9 L-6 9 L-12 9Z" fill="#b8e86a" opacity="0.7" />
              </g>
            </svg>

            <div className="fd-legend">
              <span><i className="l1" /> Route</span>
              <span><i className="l2" /> Hanger delivered</span>
              <span><i className="l3" /> Booked</span>
            </div>
          </div>

          <aside className="fd-side">
            <div className="fd-flyer" data-reveal="">
              <div className="fd-hole" />
              <div className="fd-flyer-photo">
                <img src={IMG.garden} alt="Raised garden bed with fresh spring planting" loading="lazy" />
                <span>Spring is here</span>
              </div>
              <div className="fd-flyer-body">
                <b>Your yard, ready in one visit.</b>
                <p>Spring cleanup, edging & fresh mulch.</p>
                <div className="fd-coupon">
                  <span>
                    <small>Neighbour offer</small>
                    <strong>-20%</strong>
                  </span>
                  <QrCode size={38} />
                </div>
              </div>
            </div>

            <div className="fd-stats">
              {[
                [DoorOpen, doors, 'Doors reached'],
                [QrCode, scans, 'QR scans'],
                [Phone, calls, 'Tracked calls'],
                [CalendarCheck, visits, 'Visits booked'],
              ].map(([I, v, l]) => (
                <div key={l} className="fd-stat">
                  <I size={16} />
                  <b>{v.toLocaleString()}</b>
                  <small>{l}</small>
                </div>
              ))}
              <span className="fd-progress"><i style={{ transform: `scaleX(${t})` }} /></span>
            </div>

            <ul className="fd-feed" aria-live="polite">
              {booked.slice(-3).reverse().map((h) => (
                <li key={h.addr}>
                  <span className="fd-dot" />
                  <span>
                    <b>{h.svc}</b>
                    <small>{h.addr} · from door hanger</small>
                  </span>
                </li>
              ))}
              {booked.length === 0 && <li className="empty">Waiting for the first booking…</li>}
            </ul>

            <button type="button" className="fd-replay" onClick={replay}>
              <RotateCcw size={14} /> Run the route again
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
