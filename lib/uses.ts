import type { Locale } from './i18n'
import { usesEn } from './uses.en'

export type UseItem = {
  name: string
  description: string
  url?: string
}

export type UseCategory = {
  name: string
  items: UseItem[]
}

export const uses: UseCategory[] = [
  {
    name: 'Hardware',
    items: [
      { name: 'MacBook Pro 14" M3 Pro', description: 'Donde pasa casi todo el trabajo. 18GB de RAM, 1TB.' },
      { name: 'LG UltraFine 4K 24"', description: 'Segundo monitor para tener Figma y el navegador a la vez.' },
      { name: 'Keychron K3 Pro', description: 'Mecánico de perfil bajo, más cómodo que el del laptop para sesiones largas.' },
      { name: 'Logitech MX Master 3S', description: 'El scroll horizontal suave hace una diferencia real en Figma.' },
    ],
  },
  {
    name: 'Diseño',
    items: [
      { name: 'Figma', description: 'Mi herramienta por defecto: UI, prototipos, especificaciones y design systems.', url: 'https://figma.com' },
      { name: 'FigJam', description: 'Para workshops de discovery, journey maps y arquitectura de información.' },
      { name: 'Linear', description: 'Tareas y roadmaps. Más rápido que Jira para equipos pequeños.', url: 'https://linear.app' },
      { name: 'Notion', description: 'Documentación del design system y notas de research.', url: 'https://notion.so' },
    ],
  },
  {
    name: 'Desarrollo',
    items: [
      { name: 'VS Code', description: 'Mi editor principal, con GitHub Copilot y las extensiones de Tailwind, ESLint y Prettier.', url: 'https://code.visualstudio.com' },
      { name: 'Cursor', description: 'Para cuando trabajo cerca del límite de lo que sé técnicamente.', url: 'https://cursor.com' },
      { name: 'iTerm2 + Oh My Zsh', description: 'Terminal con un autocompletado decente.' },
      { name: 'GitHub', description: 'Mis repositorios públicos y privados.', url: 'https://github.com/Mistercitos' },
    ],
  },
  {
    name: 'Tipografías',
    items: [
      { name: 'Inter', description: 'Para títulos y cuerpo de texto. Fuente variable con ejes de peso y tamaño óptico.', url: 'https://rsms.me/inter/' },
      { name: 'Newsreader', description: 'La serif editorial que uso para acentos y para el blog. También variable.', url: 'https://fonts.google.com/specimen/Newsreader' },
      { name: 'JetBrains Mono', description: 'Para los bloques de código.', url: 'https://www.jetbrains.com/lp/mono/' },
    ],
  },
  {
    name: 'Lecturas',
    items: [
      { name: 'Refactoring UI · Adam Wathan & Steve Schoger', description: 'El libro que más le recomiendo a ingenieros que quieren entender de diseño.' },
      { name: 'Shape Up · Basecamp', description: 'Bueno para discutir ciclos de producto. No tanto para seguirlo al pie de la letra.' },
      { name: 'Inspired · Marty Cagan', description: 'Mi marco mental para el product discovery y para entender los roles de producto, diseño e ingeniería.' },
    ],
  },
]

/** Devuelve las categorías de uses para un locale. */
export function getUses(locale: Locale): UseCategory[] {
  return locale === 'en' ? usesEn : uses
}
