/**
 * Infraestructura de internacionalización del portafolio.
 *
 * Arquitectura:
 * - El español es el idioma por defecto y se sirve en la raíz: `/`, `/trabajo`, …
 *   (un middleware reescribe internamente esas rutas a `/es/*`).
 * - El inglés vive bajo `/en`: `/en`, `/en/trabajo`, …
 * - Todas las páginas viven bajo `app/[locale]/` y reciben el locale por params.
 * - Este archivo centraliza el tipo `Locale`, los helpers de ruta/locale y el
 *   diccionario de textos de "chrome" reutilizables (navegación, header, footer,
 *   selector de idioma, CTAs comunes, etiquetas de sección de los case studies).
 * - El contenido largo —cases, posts, trayectoria, uses— se localiza en sus
 *   propios archivos de datos (`*.en.ts`); no vive en este diccionario.
 */

export type Locale = 'es' | 'en'

export const locales: Locale[] = ['es', 'en']
export const defaultLocale: Locale = 'es'

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'es' || value === 'en'
}

/** Normaliza un valor arbitrario a un Locale válido (cae al default si no lo es). */
export function toLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale
}

/**
 * Prefija una ruta interna con el locale.
 * En español (idioma por defecto) la ruta queda sin prefijo.
 * En inglés, se le antepone `/en`.
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return locale === 'en' ? `/en${clean}` : clean || '/'
}

/** Devuelve la misma ruta en el otro idioma — para el selector de idioma. */
export function alternatePath(path: string, to: Locale): string {
  const withoutEn = path.replace(/^\/en(?=\/|$)/, '') || '/'
  return localizedPath(withoutEn, to)
}

type UIStrings = {
  htmlLang: string
  ogLocale: string
  langName: string
  nav: {
    work: string
    writing: string
    about: string
    lab: string
    contact: string
    uses: string
  }
  header: {
    openMenu: string
    closeMenu: string
    menuLabel: string
    current: string
  }
  langSwitch: {
    ariaToEs: string
    ariaToEn: string
  }
  footer: {
    taglinePre: string
    taglineAccent: string
    taglinePost: string
    location: string
    navHeading: string
    contactHeading: string
    builtWith: string
  }
  caseChrome: {
    backToWork: string
    backToHome: string
    nextProject: string
    seeAllWork: string
    letsTalk: string
  }
  caseSection: {
    context: string
    discovery: string
    challenge: string
    decisions: string
    execution: string
    results: string
    takeaways: string
  }
  caseMeta: {
    company: string
    team: string
    platform: string
    stack: string
    role: string
    present: string
  }
  meta: {
    title: string
    titleTemplate: string
    description: string
    ogDescription: string
    twitterDescription: string
  }
}

export const ui: Record<Locale, UIStrings> = {
  es: {
    htmlLang: 'es',
    ogLocale: 'es_CL',
    langName: 'Español',
    nav: {
      work: 'Trabajo',
      writing: 'Escribo',
      about: 'Sobre mí',
      lab: 'Lab',
      contact: 'Contacto',
      uses: 'Uses',
    },
    header: {
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menuLabel: 'Menú de navegación',
      current: 'ahora',
    },
    langSwitch: {
      ariaToEs: 'Ver el sitio en español',
      ariaToEn: 'View this site in English',
    },
    footer: {
      taglinePre: 'Diseño y escalo productos digitales ',
      taglineAccent: 'complejos',
      taglinePost: '.',
      location:
        'Santiago, Chile · GMT-3. Trabajo remoto con equipos de Estados Unidos y Latinoamérica.',
      navHeading: 'Navegación',
      contactHeading: 'Contacto',
      builtWith: 'Diseñado y construido por Christian Del Barco · Next.js',
    },
    caseChrome: {
      backToWork: 'Volver a todo el trabajo',
      backToHome: 'Volver al inicio',
      nextProject: '¿Seguimos con otro proyecto?',
      seeAllWork: 'Ver todo el trabajo',
      letsTalk: 'Hablemos',
    },
    caseSection: {
      context: 'El contexto',
      discovery: 'Discovery',
      challenge: 'El desafío',
      decisions: 'Decisiones',
      execution: 'Ejecución',
      results: 'Resultados',
      takeaways: 'Aprendizajes',
    },
    caseMeta: {
      company: 'Empresa',
      team: 'Equipo',
      platform: 'Plataforma',
      stack: 'Stack',
      role: 'Rol',
      present: 'Presente',
    },
    meta: {
      title: 'Christian Del Barco — Senior Product Designer',
      titleTemplate: '%s · Christian Del Barco',
      description:
        'Senior Product Designer + UX Engineer con 7+ años liderando diseño en SaaS, B2B y marketplaces para mercados de EE.UU. y LATAM.',
      ogDescription:
        'Senior Product Designer + UX Engineer. SaaS, B2B y marketplaces. Design systems + React.',
      twitterDescription: 'SaaS, B2B y marketplaces. Design systems + React.',
    },
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    langName: 'English',
    nav: {
      work: 'Work',
      writing: 'Writing',
      about: 'About',
      lab: 'Lab',
      contact: 'Contact',
      uses: 'Uses',
    },
    header: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menuLabel: 'Navigation menu',
      current: 'now',
    },
    langSwitch: {
      ariaToEs: 'Ver el sitio en español',
      ariaToEn: 'View this site in English',
    },
    footer: {
      taglinePre: 'I design and scale ',
      taglineAccent: 'complex',
      taglinePost: ' digital products.',
      location:
        'Santiago, Chile · GMT-3. Working remotely with teams across the US and Latin America.',
      navHeading: 'Navigation',
      contactHeading: 'Contact',
      builtWith: 'Designed and built by Christian Del Barco · Next.js',
    },
    caseChrome: {
      backToWork: 'Back to all work',
      backToHome: 'Back to home',
      nextProject: 'On to the next project?',
      seeAllWork: 'See all work',
      letsTalk: "Let's talk",
    },
    caseSection: {
      context: 'Context',
      discovery: 'Discovery',
      challenge: 'The challenge',
      decisions: 'Decisions',
      execution: 'Execution',
      results: 'Results',
      takeaways: 'Takeaways',
    },
    caseMeta: {
      company: 'Company',
      team: 'Team',
      platform: 'Platform',
      stack: 'Stack',
      role: 'Role',
      present: 'Present',
    },
    meta: {
      title: 'Christian Del Barco — Senior Product Designer',
      titleTemplate: '%s · Christian Del Barco',
      description:
        'Senior Product Designer and UX Engineer with 7+ years leading design for SaaS, B2B, and marketplace products across the US and Latin America.',
      ogDescription:
        'Senior Product Designer and UX Engineer. SaaS, B2B, and marketplaces. Design systems + React.',
      twitterDescription: 'SaaS, B2B, and marketplaces. Design systems + React.',
    },
  },
}

/** Atajo: devuelve el set de strings de UI para un locale. */
export function getUI(locale: Locale): UIStrings {
  return ui[locale]
}
