import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Sparkles, ArrowUpRight } from 'lucide-react'
import '../styles/LeadMath.css'

export default function LeadMath({ onTriggerBooking }) {
  const [leads, setLeads] = useState(25)
  const [avgTicket, setAvgTicket] = useState(14500)
  const [closeRate, setCloseRate] = useState(30)

  const monthlyJobs = Math.round(leads * (closeRate / 100))
  const monthlyRevenue = monthlyJobs * avgTicket
  const annualRevenue = monthlyRevenue * 12

  return (
    <section className="section lead-math" id="calculator">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">Interactive Landscape ROI Simulator</span>
            <h2 className="h-display">
              Calculate the power of <br />
              <span className="serif">3D visual media on close rates.</span>
            </h2>
          </div>
          <p>
            When landscape contractors present photorealistic 3D renders instead of flat 2D lines, homeowner closing rates surge from 18% to over 35%. See what that means for your bottom line.
          </p>
        </header>

        <div className="lead-math__box" data-reveal>
          <div className="lead-math__controls">
            <div className="lead-math__slider-group">
              <div className="lead-math__slider-header">
                <label>Monthly Inquiries / Bids</label>
                <span className="lead-math__val-tag">{leads} Leads / Mo</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="lead-math__slider"
                data-cursor="Slide"
              />
              <div className="lead-math__scale">
                <span>5 Bids</span>
                <span>50 Bids</span>
                <span>100 Bids</span>
              </div>
            </div>

            <div className="lead-math__slider-group">
              <div className="lead-math__slider-header">
                <label>Average Landscape Contract Size</label>
                <span className="lead-math__val-tag">${avgTicket.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3500"
                max="50000"
                step="500"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="lead-math__slider"
                data-cursor="Slide"
              />
              <div className="lead-math__scale">
                <span>$3,500 (Lawn/Sod)</span>
                <span>$25,000 (Patio)</span>
                <span>$50,000+ (Full Estate)</span>
              </div>
            </div>

            <div className="lead-math__slider-group">
              <div className="lead-math__slider-header">
                <label>Contract Close Rate (With 3D Renders)</label>
                <span className="lead-math__val-tag">{closeRate}% Close</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="lead-math__slider"
                data-cursor="Slide"
              />
              <div className="lead-math__scale">
                <span>10% (Flat quote)</span>
                <span>35% (3D visual)</span>
                <span>60% (High-trust)</span>
              </div>
            </div>
          </div>

          <div className="lead-math__results">
            <div className="lead-math__res-head">
              <div className="badge-tag">
                <TrendingUp className="w-3.5 h-3.5 text-emerald" />
                <span>Projected Performance</span>
              </div>
              <span className="lead-math__jobs-badge">{monthlyJobs} Won Jobs / Month</span>
            </div>

            <div className="lead-math__hero-metric">
              <span className="lead-math__metric-lbl">Projected Annual Pipeline</span>
              <div className="lead-math__metric-val">${(annualRevenue / 1000).toFixed(0)}k <small>/ yr</small></div>
              <p className="lead-math__metric-sub">
                Generates approx <strong>${(monthlyRevenue / 1000).toFixed(1)}k/month</strong> in signed landscape contracts.
              </p>
            </div>

            <div className="lead-math__breakdown">
              <div className="lead-math__stat-card">
                <span>Closed Contracts</span>
                <strong>{monthlyJobs * 12} / year</strong>
              </div>
              <div className="lead-math__stat-card">
                <span>Visual Conversion</span>
                <strong className="text-leaf">+{closeRate - 15}% Lift</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={onTriggerBooking}
              className="btn btn--primary lead-math__cta"
              data-magnetic
            >
              <span>Integrate 3D Visuals Into Your Bids</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
