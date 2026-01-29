import { createContext, useContext } from 'react'
import { dictionaries } from '../i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ lang, children }) {
  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useI18n must be used inside LanguageProvider')
  }
  return ctx
}
