import { useEffect, useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, Play, Phone, Check, CalendarDays, Mail, Music2, Snowflake, TreePine, Scissors, Sprout, Warehouse, PanelsTopLeft, Ruler } from 'lucide-react'
import { IMG } from '../data/site'
import { Words, Btn } from './ui'
import { scrollToId, useMouse } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [Snowflake, TreePine, Scissors, Sprout, Warehouse, PanelsTopLeft, Ruler]
const NICHE_ASSETS = [
  { img: IMG.snow, hue: '#dfe9f1' },
  { img: IMG.canopy, hue: '#e3eedb' },
  { img: IMG.trimmer, hue: '#e9f5d4' },
  { img: IMG.micro, hue: '#eef6dc' },
  { img: IMG.greenhouse, hue: '#e6f2e1' },
  { img: IMG.glass, hue: '#e8eef0' },
  { img: IMG.plans, hue: '#f3ecdc' },
]

const handle = (s) => '@' + (s || '').toLowerCase().replace(/[^a-z]/g, '')

function Laptop({ n, labels, sampleImages }) {
  return (
    <div className="mk-laptop">
      <div className="mk-lid">
        <div className="mk-site">
          <div className="mk-site-nav">
            <b>{n.company}</b>
            <span>{labels.laptopServices || 'Services'}</span>
            <span>{labels.laptopWork || 'Our work'}</span>
            <span>{labels.laptopReviews || 'Reviews'}</span>
            <i>{labels.laptopBookNow || 'Book now'}</i>
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
            <small>{labels.laptopFinest || 'Showcase our finest work'}</small>
            <div>
              {sampleImages.slice(0, 4).map((img, idx) => (
                <img key={idx} src={img} alt="" />
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

function Flyer({ n, labels }) {
  return (
    <div className="mk-flyer">
      <div className="mk-fl-top">
        <small>{n.company}</small>
        <span className="mk-fl-badge">{n.badge}</span>
      </div>
      <h4>{n.head}</h4>
      <img src={n.img} alt="" />
      <ul>
        {(n.points || []).slice(0, 3).map((p) => (
          <li key={p}><Check size={11} strokeWidth={3} /> {p}</li>
        ))}
      </ul>
      <div className="mk-fl-cta">
        <Phone size={12} /> {n.offer}
      </div>
      <div className="mk-fl-tabs">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <span key={idx}>{labels.callNow || 'Call now'}</span>
        ))}
      </div>
    </div>
  )
}

function Post({ n, labels }) {
  return (
    <div className="mk-post">
      <div className="mk-post-top">
        <i />
        <b>{handle(n.company)}</b>
        <small>{labels.sponsored || 'Sponsored'}</small>
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

function Email({ n, labels }) {
  return (
    <div className="mk-mail">
      <div className="mk-mail-top">
        <Mail size={14} />
        <b>{n.company}</b>
        <small>9:02 AM</small>
      </div>
      <h5>{n.mail}</h5>
      <p>{(n.lead || '').split('.')[0]}.</p>
      <span className="mk-mail-btn">{n.offer}</span>
      <div className="mk-mail-stats">
        <span><b>41%</b> {labels.opened || 'opened'}</span>
        <span><b>9%</b> {labels.clicked || 'clicked'}</span>
      </div>
    </div>
  )
}

function Calendar({ n, labels }) {
  return (
    <div className="mk-cal">
      <div className="mk-cal-top">
        <CalendarDays size={15} />
        <b>{labels.appCalTitle || 'Appointment calendar'}</b>
      </div>
      <div className="mk-cal-days">
        {['M', 'T', 'W', 'T', 'F'].map((d, idx) => (
          <span key={idx} className={idx === 2 ? 'on' : ''}>
            <small>{d}</small>
            {18 + idx}
          </span>
        ))}
      </div>
      <div className="mk-cal-slot">
        <i />
        <span>
          <b>{n.short}</b>
          <small>{labels.wedBooked || 'Wed, 9:30 AM · Booked online'}</small>
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
  const { t } = useLanguage()
  const data = t.mockups || {}
  const nichesList = t.niches?.list || []

  const niches = nichesList.map((x, idx) => ({
    ...NICHE_ASSETS[idx],
    ...x,
  }))

  const n = niches[i] || niches[0] || {}
  const sampleImages = NICHE_ASSETS.map((a) => a.img)

  useEffect(() => {
    if (hold || !niches.length) return
    const id = setInterval(() => setI((x) => (x + 1) % niches.length), 5200)
    return () => clearInterval(id)
  }, [hold, niches.length])

  const px = (k) => ({ translate: `${m.x * k}px ${m.y * k * 0.7}px` })

  return (
    <section className="section mockups dark" id="mockups" style={{ '--hue': n.hue }}>
      <div className="mk-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <div className="mk-tabs" role="tablist" data-reveal="" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {niches.map((x, k) => {
            const I = ICONS[k] || Sprout
            return (
              <button key={x.k || k} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                <I size={16} />
                {x.short}
                {k === i && !hold && <i className="mk-tab-bar" key={i} />}
              </button>
            )
          })}
        </div>

        <div className="mk-stage-wrap" data-reveal="scale">
          <div className="mk-stage" key={i}>
            <div className="mk-item mk-i-laptop" style={{ ...px(-10), '--k': 0 }}><Laptop n={n} labels={data} sampleImages={sampleImages} /></div>
            <div className="mk-item mk-i-flyer" style={{ ...px(22), '--k': 1 }}><Flyer n={n} labels={data} /></div>
            <div className="mk-item mk-i-phone" style={{ ...px(30), '--k': 2 }}><Reel n={n} /></div>
            <div className="mk-item mk-i-post" style={{ ...px(16), '--k': 3 }}><Post n={n} labels={data} /></div>
            <div className="mk-item mk-i-mail" style={{ ...px(-24), '--k': 4 }}><Email n={n} labels={data} /></div>
            <div className="mk-item mk-i-cal" style={{ ...px(-34), '--k': 5 }}><Calendar n={n} labels={data} /></div>
          </div>
        </div>

        <div className="mk-foot" data-reveal="">
          <p>
            <b>{n.company}</b> {data.footPrefix}
          </p>
          <Btn variant="light" onClick={() => scrollToId('book')}>{data.cta}</Btn>
        </div>
      </div>
    </section>
  )
}
