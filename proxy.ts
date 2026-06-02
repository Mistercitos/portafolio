import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware de internacionalización.
 *
 * Modelo de rutas:
 * - Español = idioma por defecto, se sirve SIN prefijo (`/`, `/trabajo`, …).
 *   El middleware lo reescribe internamente a `/es/*` para que coincida con
 *   `app/[locale]/`; la URL que ve el usuario nunca lleva `/es`.
 * - Inglés = se sirve bajo `/en` (`/en`, `/en/trabajo`, …) y pasa directo.
 *
 * Detección de idioma:
 * - Si existe la cookie `NEXT_LOCALE`, manda esa preferencia.
 * - Si no, se mira el header `Accept-Language` del navegador.
 * - Un visitante cuyo idioma preferido es inglés y que entra a una ruta sin
 *   prefijo es redirigido a su equivalente en `/en`.
 */

const COOKIE = 'NEXT_LOCALE'
const SUPPORTED = ['es', 'en'] as const
type Locale = (typeof SUPPORTED)[number]

function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null
  // "en-US,en;q=0.9,es;q=0.8" → ["en-us", "en", "es"]
  const tags = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean)
  for (const tag of tags) {
    if (tag.startsWith('en')) return 'en'
    if (tag.startsWith('es')) return 'es'
  }
  return null
}

function preferredLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(COOKIE)?.value
  if (cookie === 'es' || cookie === 'en') return cookie
  return fromAcceptLanguage(req.headers.get('accept-language')) ?? 'es'
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Rutas en inglés: ya llevan el prefijo /en → coinciden con [locale]=en.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next()
  }

  // El español NO debe exponerse con prefijo `/es`. Si alguien llega a `/es*`
  // (enlace viejo, bookmark, SEO), lo redirigimos a la versión canónica sin prefijo.
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/es/, '') || '/'
    return NextResponse.redirect(url)
  }

  // Rutas sin prefijo = territorio español. Decidir según preferencia.
  const preferred = preferredLocale(req)

  if (preferred === 'en') {
    // Visitante de habla inglesa que cae en una URL sin prefijo → llevarlo a /en.
    const url = req.nextUrl.clone()
    url.pathname = `/en${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  // Español: reescritura interna a /es/* (la URL visible queda sin prefijo).
  const url = req.nextUrl.clone()
  url.pathname = `/es${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Excluye archivos internos de Next, la API, las rutas de metadata y
  // cualquier archivo con extensión (imágenes, fuentes, etc.).
  matcher: ['/((?!_next/|api/|robots.txt|sitemap.xml|.*\\.).*)'],
}
