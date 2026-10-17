import { useEffect, useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, Play, Phone, Check, CalendarDays, Mail, Music2, Snowflake, TreePine, Scissors, Sprout, Warehouse, PanelsTopLeft, Ruler } from 'lucide-react'
import { NICHES } from '../data/site'
import { Words, Btn } from './ui'
import { scrollToId, useMouse } from '../hooks'

const ICONS = [Snowflake, TreePine, Scissors, Sprout, Warehouse, PanelsTopLeft, Ruler]
const handle = (s) => '@' + s.toLowerCase().replace(/[^a-z]/g, '')

function Laptop({ n }) {
  return (
    <div className="mk-laptop">
      <div className="mk-lid">
        <div className="mk-site">
          <div className="mk-site-nav">
            <b>{n.company}</b>
            <span>Services</span>
            <span>Our work</span>
            <span>Reviews</span>
            <i>Book now</i>
          </div>
          <div className="mk-site-hero">
            <img src={n.img} alt="" />
            <div>
              <small>{n.short}</small>
              <h4>{n.head}</h4>
              <span className="mk-site-btn">{n.offer} →</span>
            </div>
          </div>
          <div className="mk-site-work">
            <small>Showcase our finest work</small>
            <div>
              {NICHES.slice(0, 4).map((x) => (
                <img key={x.k} src={x.img} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mk-base" />
    </div>
  )
}

function Reel({ n }) {
  return (
    <div className="mk-phone">
      <div className="mk-phone-scr">
        <img src={n.img} alt="" className="mk-reel-img" />
        <div className="mk-reel-bars">
          <span className="on" />
          <span />
          <span />
        </div>
        <div className="mk-reel-play">
          <Play size={20} fill="currentColor" />
        </div>
        <div className="mk-reel-side">
          <span><Heart size={18} /><small>4.8k</small></span>
          <span><MessageCircle size={18} /><small>212</small></span>
          <span><Send size={18} /></span>
        </div>
        <div className="mk-reel-cap">
          <b>{handle(n.company)}</b>
          <p>{n.reel}</p>
          <small><Music2 size={11} /> Original audio</small>
        </div>
      </div>
    </div>
  )
}

function Flyer({ n }) {
  return (
    <div className="mk-flyer">
      <div className="mk-fl-top">
        <small>{n.company}</small>
        <span className="mk-fl-badge">{n.badge}</span>
      </div>
      <h4>{n.head}</h4>
      <img src={n.img} alt="" />
      <ul>
        {n.points.slice(0, 3).map((p) => (
          <li key={p}><Check size={11} strokeWidth={3} /> {p}</li>
        ))}
      </ul>
      <div className="mk-fl-cta">
        <Phone size={12} /> {n.offer}
      </div>
      <div className="mk-fl-tabs">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i}>Call now</span>
        ))}
      </div>
    </div>
  )
}

function Post({ n }) {
  return (
    <div className="mk-post">
      <div className="mk-post-top">
        <i />
        <b>{handle(n.company)}</b>
        <small>Sponsored</small>
      </div>
      <div className="mk-post-img">
        <img src={n.img} alt="" />
        <span>{n.offer}</span>
      </div>
      <div className="mk-post-act">
        <Heart size={16} />
        <MessageCircle size={16} />
        <Send size={16} />
        <Bookmark size={16} />
      </div>
      <p><b>{handle(n.company)}</b> {n.post}</p>
    </div>
  )
}

function Email({ n }) {
  return (
    <div className="mk-mail">
      <div className="mk-mail-top">
        <Mail size={14} />
        <b>{n.company}</b>
        <small>9:02 AM</small>
      </div>
      <h5>{n.mail}</h5>
      <p>{n.lead.split('.')[0]}.</p>
      <span className="mk-mail-btn">{n.offer}</span>
      <div className="mk-mail-stats">
        <span><b>41%</b> opened</span>
        <span><b>9%</b> clicked</span>
      </div>
    </div>
  )
}

function Calendar({ n }) {
  return (
    <div className="mk-cal">
      <div className="mk-cal-top">
        <CalendarDays size={15} />
        <b>Appointment calendar</b>
      </div>
      <div className="mk-cal-days">
        {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
          <span key={i} className={i === 2 ? 'on' : ''}>
            <small>{d}</small>
            {18 + i}
          </span>
        ))}
      </div>
      <div className="mk-cal-slot">
        <i />
        <span>
          <b>{n.short}</b>
          <small>Wed, 9:30 AM · Booked online</small>
        </span>
        <Check size={14} strokeWidth={3} />
      </div>
    </div>
  )
}

export default function Mockups() {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const m = useMouse()
  const n = NICHES[i]

  useEffect(() => {
    if (hold) return
    const id = setInterval(() => setI((x) => (x + 1) % NICHES.length), 5200)
    return () => clearInterval(id)
  }, [hold])

  const px = (k) => ({ translate: `${m.x * k}px ${m.y * k * 0.7}px` })

  return (
    <section className="section mockups dark" id="mockups" style={{ '--hue': n.hue }}>
      <div className="mk-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Mockups · see your brand live</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="One brand." />
              <br />
              <Words text="Every screen, every door." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Pick a service your company sells. Watch the website, reel, flyer, social post, email and booking calendar change together. This is the media kit we build for you.
          </p>
        </div>

        <div className="mk-tabs" role="tablist" data-reveal="" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {NICHES.map((x, k) => {
            const I = ICONS[k]
            return (
              <button key={x.k} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                <I size={16} />
                {x.short}
                {k === i && !hold && <i className="mk-tab-bar" key={i} />}
              </button>
            )
          })}
        </div>

        <div className="mk-stage-wrap" data-reveal="scale">
          <div className="mk-stage" key={i}>
            <div className="mk-item mk-i-laptop" style={{ ...px(-10), '--k': 0 }}><Laptop n={n} /></div>
            <div className="mk-item mk-i-flyer" style={{ ...px(22), '--k': 1 }}><Flyer n={n} /></div>
            <div className="mk-item mk-i-phone" style={{ ...px(30), '--k': 2 }}><Reel n={n} /></div>
            <div className="mk-item mk-i-post" style={{ ...px(16), '--k': 3 }}><Post n={n} /></div>
            <div className="mk-item mk-i-mail" style={{ ...px(-24), '--k': 4 }}><Email n={n} /></div>
            <div className="mk-item mk-i-cal" style={{ ...px(-34), '--k': 5 }}><Calendar n={n} /></div>
          </div>
        </div>

        <div className="mk-foot" data-reveal="">
          <p>
            <b>{n.company}</b> is a sample brand. Yours goes here, with your logo, colors, crews and finest work.
          </p>
          <Btn variant="light" onClick={() => scrollToId('book')}>Get my media kit</Btn>
        </div>
      </div>
    </section>
  )
}
