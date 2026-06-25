'use client'

import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0

    // dark theme: white dust on black — max possible contrast, untouched.
    // light theme: against the toned hero (~L 0.82-0.88) low alpha always
    // reads as invisible regardless of hue, so instead of dampening alpha
    // we boost it slightly and use a darker slate so dots actually register.
    let fill = '#ffffff'
    let alphaScale = 1
    const readTheme = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      fill = light ? '#475569' : '#ffffff'
      alphaScale = light ? 1.2 : 1
    }
    readTheme()
    const themeObserver = new MutationObserver(readTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    let w = 0,
      h = 0

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    let particles: P[] = []

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = Math.floor(rect.width)
      h = Math.floor(rect.height)
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const init = () => {
      const count = Math.floor((w * h) / 3500) // 밀도 기반
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.2,
        a: Math.random() * 0.5 + 0.15,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = fill
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
        ctx.globalAlpha = p.a * alphaScale
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }

    const onResize = () => {
      resize()
      init()
    }

    onResize()
    step()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
}
