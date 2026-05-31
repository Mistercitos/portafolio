'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  prefetch?: boolean
  scroll?: boolean
  onMouseEnter?: () => void
}

/**
 * Link que envuelve la navegación de Next.js en document.startViewTransition.
 * Combinado con view-transition-name en elementos compartidos, produce
 * shared element transitions seamless entre rutas.
 *
 * Fallbacks elegantes:
 * - Browser sin View Transitions API → navegación normal
 * - prefers-reduced-motion: reduce → navegación instantánea
 * - Modifier keys / middle click → comportamiento default del browser
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  style,
  prefetch = true,
  scroll = true,
  onMouseEnter,
}: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Respetar modifier keys y middle click
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    e.preventDefault()

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !reduceMotion
    ) {
      document.startViewTransition(() => {
        router.push(href, { scroll })
      })
    } else {
      router.push(href, { scroll })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      className={className}
      style={style}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
