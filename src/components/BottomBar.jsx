import { useEffect, useState } from 'react'
import { Home, Leaf, CalendarPlus, Images, Menu } from 'lucide-react'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'

export default function BottomBar() {
  const [active, setActive] = useState('top')
  const [menu, setMenu] = useState(false)
  const { t } = useLanguage()
  const data = t.bottomBar || {}

  const tabs = [
    { id: 'top', label: data.home || 'Home', icon: Home },
    { id: 'services', label: data.services || 'Services', icon: Leaf },
    { id: 'book', label: data.book || 'Book', icon: CalendarPlus, main: true },
    { id: 'mockups', label: data.mockups || 'Mockups', icon: Images },
    { id: 'menu', label: data.menu || 'Menu', icon: Menu },
  ]

  useEffect(() => {
    const on = () => {
      let cur = 'top'
      ;['services', 'mockups', 'book'].forEach((id) => {
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
      {tabs.map((tab) => {
        const on = tab.id === 'menu' ? menu : !menu && active === tab.id
        return (
          <button key={tab.id} className={`bb-tab ${tab.main ? 'main' : ''} ${on ? 'on' : ''}`} onClick={() => tap(tab.id)} aria-label={tab.label}>
            <span className="bb-ico">
              <tab.icon size={tab.main ? 22 : 20} strokeWidth={on ? 2.4 : 2} />
            </span>
            <small>{tab.label}</small>
          </button>
        )
      })}
    </nav>
  )
}
