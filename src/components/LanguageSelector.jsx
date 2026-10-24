import { useEffect, useRef, useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const OPTIONS = [
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸', sub: 'Predeterminado' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸', sub: 'Secondary' },
]

export default function LanguageSelector({ compact = false }) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('click', onDocClick)
      document.addEventListener('keydown', onKeyDown)
    }
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const select = (code) => {
    setLang(code)
    setOpen(false)
  }

  const current = OPTIONS.find((o) => o.code === lang) || OPTIONS[0]

  return (
    <div className={`lang-picker ${compact ? 'compact' : ''} ${open ? 'open' : ''}`} ref={menuRef}>
      <button
        type="button"
        className="lang-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar idioma / Select language"
      >
        <span className="lang-globe">
          <Globe size={15} />
        </span>
        <span className="lang-code">{current.short}</span>
        <span className="lang-caret">
          <ChevronDown size={14} />
        </span>
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox">
          <div className="lang-head">
            <small>Idioma / Language</small>
          </div>
          {OPTIONS.map((opt) => {
            const active = opt.code === lang
            return (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={active}
                className={`lang-opt ${active ? 'active' : ''}`}
                onClick={() => select(opt.code)}
              >
                <span className="lang-opt-flag">{opt.flag}</span>
                <div className="lang-opt-txt">
                  <b>{opt.label}</b>
                  <small>{opt.sub}</small>
                </div>
                {active && (
                  <span className="lang-check">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
