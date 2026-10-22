import { useEffect, useState } from 'react'
import { Phone, Mail, Clock } from 'lucide-react'
import { NAV, BRAND } from '../data/site'
import { Logo, Btn } from './ui'
import { scrollToId } from '../hooks'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let last = window.scrollY
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > last && y > 500)
      last = y
      const h = document.documentElement.scrollHeight - innerHeight
      setProgress(h > 0 ? y / h : 0)
      let cur = ''
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.45) cur = id
      })
      setActive(cur)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    window.dispatchEvent(new CustomEvent('app-menu-state', { detail: open }))
  }, [open])

  useEffect(() => {
    const t = () => setOpen((o) => !o)
    window.addEventListener('app-menu', t)
    return () => window.removeEventListener('app-menu', t)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${hidden && !open ? 'hide' : ''} ${open ? 'open' : ''}`}>
        <div className="nav-top">
          <div className="nav-top-in">
            <span className="nav-live">
              <i />
              Digital services for landscape companies · Spring cleaning, Fall collection, snow removal & winterizing
            </span>
            <span className="nav-top-links">
              <a href={BRAND.phoneHref}><Phone size={13} /> {BRAND.phone}</a>
              <a href={`mailto:${BRAND.email}`}><Mail size={13} /> {BRAND.email}</a>
              <span><Clock size={13} /> {BRAND.hours}</span>
            </span>
          </div>
        </div>
        <div className="nav-bar">
          <a href="#top" className="nav-logo" onClick={go('top')} aria-label={`${BRAND.name} ${BRAND.word} home`}>
            <Logo delay={3.7} />
          </a>
          <nav className="nav-links" aria-label="Main">
            {NAV.slice(0, 5).map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? 'on' : ''}>
                <span data-t={l.label}>{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <Btn variant="sm" href="#book" onClick={go('book')}>
              Book a strategy call
            </Btn>
            <a className="nav-call" href={BRAND.phoneHref} aria-label="Call us">
              <Phone size={18} />
            </a>
            <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
          <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <div className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="menu-grass" />
        <ul>
          {[{ id: 'top', label: 'Home' }, ...NAV].map((l, i) => (
            <li key={l.id} style={{ '--i': i }}>
              <a href={`#${l.id}`} onClick={go(l.id)}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <a href={BRAND.phoneHref}>{BRAND.phone}</a>
        </div>
      </div>
    </>
  )
}
