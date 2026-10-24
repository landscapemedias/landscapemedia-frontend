import { createContext, useContext, useEffect, useState } from 'react'
import { TRANSLATIONS } from '../data/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('lm_lang')
      return saved === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })

  const setLang = (nextLang) => {
    const valid = nextLang === 'en' ? 'en' : 'es'
    setLangState(valid)
    try {
      localStorage.setItem('lm_lang', valid)
    } catch {}
    document.documentElement.lang = valid
  }

  const toggleLang = () => {
    setLang(lang === 'es' ? 'en' : 'es')
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return {
      lang: 'es',
      setLang: () => {},
      toggleLang: () => {},
      t: TRANSLATIONS.es,
    }
  }
  return ctx
}
