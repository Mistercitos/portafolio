import { en } from './en'
import { es } from './es'

export const dictionaries = { en, es }

export const getLangFromPath = (pathname) => (pathname.startsWith('/es') ? 'es' : 'en')
