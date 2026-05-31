'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

type Props = {
  /** El valor target a animar (e.g. 100, 5000). */
  to: number
  /** Prefix (e.g. "$"). */
  prefix?: string
  /** Suffix (e.g. "+", "K"). */
  suffix?: string
  /** Decimals si quieres mostrar (e.g. 2 → "100.00"). Default 0. */
  decimals?: number
  /** Duración en segundos. Default 1.4. */
  duration?: number
  /** Si el valor a mostrar es un rango ("5K–20K") usa este formatter custom. */
  formatter?: (value: number) => string
}

/**
 * Anima un número de 0 al valor target cuando entra al viewport.
 * Hace una sola corrida (no se rebobina al salir).
 *
 * Para mostrar rangos ("5K–20K") usá <CountUpRange from={5000} to={20000} />
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
  formatter,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  const formatted = formatter ? formatter(display) : display.toFixed(decimals)

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/**
 * Versión para rangos tipo "5K–20K" — anima ambos extremos en paralelo.
 */
export function CountUpRange({
  from,
  to,
  scale = 1,
  suffix = '',
  duration = 1.4,
}: {
  from: number
  to: number
  /** Escala para mostrar (1000 → "K"). Default 1. */
  scale?: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [fromDisplay, setFromDisplay] = useState(reduce ? from : 0)
  const [toDisplay, setToDisplay] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setFromDisplay(from)
      setToDisplay(to)
      return
    }
    const fromCtrl = animate(0, from, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setFromDisplay,
    })
    const toCtrl = animate(0, to, {
      duration: duration * 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setToDisplay,
    })
    return () => {
      fromCtrl.stop()
      toCtrl.stop()
    }
  }, [inView, from, to, duration, reduce])

  const fmt = (n: number) => {
    if (scale === 1000) return `${Math.round(n / 1000)}K`
    return Math.round(n).toLocaleString('es-CL')
  }

  return (
    <span ref={ref}>
      {fmt(fromDisplay)}–{fmt(toDisplay)}
      {suffix}
    </span>
  )
}
