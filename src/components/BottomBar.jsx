import { useEffect, useState } from 'react'
import { Home, Leaf, CalendarPlus, Images, Menu } from 'lucide-react'
import { scrollToId } from '../hooks'

const TABS = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Leaf },
  { id: 'book', label: 'Book', icon: CalendarPlus, main: true },
  { id: 'projects', label: 'Projects', icon: Images },
  { id: 'menu', label: 'Menu', icon: Menu },
]

export default function BottomBar() {
  const [active, setActive] = useState('top')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const on = () => {
      let cur = 'top'
      ;['services', 'projects', 'book'].forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.5) cur = id
      })
      setActive(cur)
    }
    const m = (e) => setMenu(e.detail)
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('app-menu-state', m)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('app-menu-state', m)
    }
  }, [])

  const tap = (id) => {
    if (navigator.vibrate) navigator.vibrate(8)
    if (id === 'menu') {
      window.dispatchEvent(new CustomEvent('app-menu'))
      return
    }
    if (menu) window.dispatchEvent(new CustomEvent('app-menu'))
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else scrollToId(id)
  }

  return (
    <nav className="bbar" aria-label="App navigation">
      {TABS.map((t) => {
        const on = t.id === 'menu' ? menu : !menu && active === t.id
        return (
          <button key={t.id} className={`bb-tab ${t.main ? 'main' : ''} ${on ? 'on' : ''}`} onClick={() => tap(t.id)} aria-label={t.label}>
            <span className="bb-ico">
              <t.icon size={t.main ? 22 : 20} strokeWidth={on ? 2.4 : 2} />
            </span>
            <small>{t.label}</small>
          </button>
        )
      })}
    </nav>
  )
}
