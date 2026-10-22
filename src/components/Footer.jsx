import { useMemo, useState } from 'react'
import { Mail, Phone, MapPin, Clock, ArrowUp, Instagram, Facebook, Youtube, Linkedin, Check, ShieldCheck } from 'lucide-react'
import { BRAND, NAV, SERVICES, IMG } from '../data/site'
import { Btn, Logo } from './ui'
import { scrollToId } from '../hooks'

const SOCIAL = [
  { i: Instagram, l: 'Instagram' },
  { i: Facebook, l: 'Facebook' },
  { i: Youtube, l: 'YouTube' },
  { i: Linkedin, l: 'LinkedIn' },
]

function Skyline() {
  const trees = useMemo(() => {
    let s = 5
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: 34 }, (_, i) => ({ x: i * 44 + r() * 20, h: 40 + r() * 60, p: r() > 0.5 }))
  }, [])
  return (
    <svg className="ft-sky" viewBox="0 0 1500 160" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 110 C200 70 360 120 560 90 C760 60 900 110 1100 86 C1280 66 1400 96 1500 84 L1500 160 L0 160Z" fill="var(--moss)" />
      <g fill="var(--forest)">
        {trees.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${120})`}>
            <g className="sway" style={{ animationDelay: `${-i * 0.4}s` }}>
              {t.p ? (
                <path d={`M0 ${-t.h} L${t.h * 0.3} 0 L${-t.h * 0.3} 0Z`} />
              ) : (
                <>
                  <rect x="-2" y={-t.h * 0.4} width="4" height={t.h * 0.4} />
                  <circle cy={-t.h * 0.6} r={t.h * 0.3} />
                </>
              )}
            </g>
          </g>
        ))}
      </g>
      <path d="M0 130 C240 112 520 136 760 124 C1000 112 1240 138 1500 122 L1500 160 L0 160Z" fill="var(--ink)" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="footer">
      <Skyline />
      <div className="ft-body dark">
        <div className="wrap">
          <div className="ft-cta" data-reveal="scale">
            <img src={IMG.lush} alt="" aria-hidden="true" />
            <div className="ft-cta-in">
              <span className="eyebrow">Digital services for landscape companies</span>
              <h2 className="h-display">
                Ready to make your <em>finest work</em> famous?
              </h2>
              <div className="ft-cta-act">
                <Btn variant="light" onClick={() => scrollToId('book')}>Book a strategy call</Btn>
                <a className="ft-call" href={BRAND.phoneHref}>
                  <span><Phone size={18} /></span>
                  <span>
                    <small>{BRAND.slogan}</small>
                    <b>{BRAND.phone}</b>
                  </span>
                </a>
              </div>
              <ul className="ft-trust">
                <li><Check size={14} /> Free brand & media audit</li>
                <li><Check size={14} /> Landscape industry only</li>
                <li><Check size={14} /> No long contracts</li>
              </ul>
            </div>
          </div>

          <div className="ft-grid">
            <div className="ft-brand">
              <Logo light />
              <p>The full-suite digital services agency built exclusively for landscape companies. Websites that showcase your finest plants, viral video reels, client booking apps, vanity telephone numbers, and 24/7 live answering.</p>
              <form
                className={`ft-news ${sent ? 'sent' : ''}`}
                onSubmit={(e) => {
                  e.preventDefault()
                  if (/\S+@\S+\.\S+/.test(email)) setSent(true)
                }}
              >
                <label htmlFor="ft-email">Monthly marketing ideas for landscape companies</label>
                <div>
                  <input id="ft-email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={sent} />
                  <button type="submit" disabled={sent}>{sent ? <Check size={18} /> : 'Subscribe'}</button>
                </div>
                {sent && <small>Thanks. You are on the list.</small>}
              </form>
            </div>

            <div className="ft-col">
              <h4>Services</h4>
              {SERVICES.map((s) => (
                <a key={s.n} href="#services" onClick={go('services')}>{s.name}</a>
              ))}
            </div>

            <div className="ft-col">
              <h4>Company</h4>
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>
              ))}
            </div>

            <div className="ft-col ft-contact">
              <h4>Contact</h4>
              <a href={`mailto:${BRAND.email}`}><Mail size={16} /> {BRAND.email}</a>
              <a href={BRAND.tollFreeHref}><Phone size={16} /> Toll-free: {BRAND.tollFree}</a>
              <a href={BRAND.directPhoneHref}><Phone size={16} /> Direct: {BRAND.directPhone}</a>
              <span><MapPin size={16} /> {BRAND.address}</span>
              <span><Clock size={16} /> {BRAND.hours}</span>
              <div className="ft-social">
                {SOCIAL.map(({ i: I, l }) => (
                  <a key={l} href="#top" aria-label={l} onClick={go('top')}><I size={18} /></a>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-word" aria-hidden="true">
            <div className="ft-word-track">
              <span className="ft-word-part">{BRAND.name}</span>
              <span className="ft-word-part">{BRAND.word}</span>
            </div>
          </div>

          <div className="ft-cert">
            <ShieldCheck size={22} />
            <p>
              <b>Landscape digital specialists.</b> Digital services, plant and garden showcases, websites, client booking apps, 24/7 live answering, vanity phone lines, and Melville NY office & mailbox.
            </p>
          </div>

          <div className="ft-bottom">
            <span>© {new Date().getFullYear()} {BRAND.name} {BRAND.word}™, Inc. All rights reserved.</span>
            <span className="ft-legal">
              <a href="#top" onClick={go('top')}>Privacy</a>
              <a href="#top" onClick={go('top')}>Terms</a>
            </span>
            <button className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
