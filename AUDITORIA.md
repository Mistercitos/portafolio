# Auditoría del portafolio — chrisdelbarco.design

Repositorio: https://github.com/Mistercitos/portafolio
Stack: Next.js 16.2.6 (App Router + Turbopack), React 19, TypeScript 5.7, Tailwind 4, Framer Motion 12.
Fecha: 1 de junio de 2026.

## Resumen

El proyecto está en muy buen estado: compila sin errores, pasa `tsc --noEmit` limpio (0 errores de tipos) y la arquitectura de i18n (español sin prefijo + inglés bajo `/en`) está bien pensada. El error 404 que reportaste tiene una causa raíz concreta y ya está corregido. Abajo va el detalle y otros hallazgos menores.

## Hallazgo crítico — el 404 al cambiar de idioma (CORREGIDO)

**Síntoma:** al cambiar de idioma aparece un 404 y en consola "Failed to load resource: 404".

**Causa raíz:** el selector de idioma (`app/components/LanguageSwitch.tsx`) calcula la ruta del otro idioma con `alternatePath()` de `lib/i18n.ts`, usando el `usePathname()` actual. En producción, como el español se sirve por una reescritura interna del proxy (`/` → `/es`), `usePathname()` devuelve la ruta YA reescrita (`/es`, `/es/trabajo`, …). Pero `alternatePath` solo sabía quitar el prefijo `/en`, no `/es`. Resultado:

- Estando en la home ES, el enlace "EN" apuntaba a `/en/es` → ruta inexistente → **404**.
- El enlace "ES" apuntaba a `/es`, una URL que no debería existir de cara al público.

Se ve claramente en el HTML servido en producción: `[es](/es)[en](/en/es)`.

**Fix aplicado (`lib/i18n.ts`):** `alternatePath` ahora normaliza AMBOS prefijos de locale antes de reconstruir la ruta:

```ts
const withoutLocale = path.replace(/^\/(es|en)(?=\/|$)/, '') || '/'
```

Verificado: `/es` → ES:`/` · EN:`/en`; `/es/trabajo` → ES:`/trabajo` · EN:`/en/trabajo`. Ya no se genera `/en/es`.

## Hallazgo medio — la URL `/es` quedaba accesible (CORREGIDO)

El español nunca debería exponerse con prefijo `/es` (la canónica es la raíz). Antes, entrar a `/es` directamente podía romper o duplicar contenido. Se añadió una guarda en `proxy.ts` que redirige cualquier `/es*` a su equivalente sin prefijo:

```ts
if (pathname === '/es' || pathname.startsWith('/es/')) {
  const url = req.nextUrl.clone()
  url.pathname = pathname.replace(/^\/es/, '') || '/'
  return NextResponse.redirect(url)
}
```

## Hallazgos menores (recomendados, no aplicados)

1. **Falta favicon / iconos.** No hay `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` ni `manifest`. `/favicon.ico` en producción devuelve HTML en vez de un icono, lo que genera un 404/recurso roto en consola en algunos navegadores. Recomendación: agregar `app/icon.svg` (o `.png`) y `app/apple-icon.png`; Next genera los `<link>` automáticamente.

2. **Inconsistencia canónica www vs no-www.** Las canónicas y `robots.ts`/`sitemap.ts` usan `https://chrisdelbarco.design` (sin www), pero el dominio redirige a `https://www.chrisdelbarco.design`. Conviene elegir una sola forma en Vercel (Domains → redirigir www → apex, o viceversa) para que canónica y dominio servido coincidan. Mejora SEO.

3. **Script `lint` roto.** `package.json` usa `next lint`, eliminado en Next 16. Migrar a ESLint CLI: `"lint": "eslint ."` (con `eslint.config.mjs` flat config) o ejecutar `npx @next/codemod@latest next-lint-to-eslint-cli .`.

4. **README desactualizado.** Dice "Next.js 15" y describe una estructura (`app/layout.tsx`, `app/work/`) que ya no corresponde a la actual (`app/[locale]/…`, `app/[locale]/trabajo/`). Actualizar para reflejar Next 16 e i18n.

5. **`/api/og` (runtime edge).** Funciona en producción (Vercel sirve las fuentes). En entornos sin red la generación de OG falla; no afecta producción.

## Verificaciones ejecutadas

- `tsc --noEmit`: 0 errores.
- `next build`: exitoso (34 rutas generadas; ES + EN para cada página).
- Reproducción del 404 contra el sitio en vivo y simulación de `alternatePath` antes/después del fix.

## Archivos modificados

- `lib/i18n.ts` — fix de `alternatePath`.
- `proxy.ts` — redirección de `/es*` a la raíz.
