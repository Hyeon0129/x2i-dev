'use client'

import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0

    // dark theme: white dust on black — max possible contrast, untouched.
    // light theme: a darker flat dot against the toned (non-white) hero
    // background. Per-particle shadowBlur was tried for a "star glow" look
    // but tanked frame rate (canvas shadow effects are expensive at this
    // particle count) — flat fills only, no shadow, no per-frame color branching.
    let fill = '#ffffff'
    let alphaScale = 1
    const readTheme = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      fill = light ? '#1f2433' : '#ffffff'
      alphaScale = light ? 1.4 : 1
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
      const nextW = Math.floor(rect.width)
      const nextH = Math.floor(rect.height)
      // Mobile browsers fire `resize` repeatedly while scrolling (the
      // dynamic toolbar hiding/showing changes the viewport size), so this
      // fires far more often than an actual layout change — skip the
      // (relatively expensive) canvas resize + particle re-init when the
      // size hasn't actually moved.
      if (nextW === w && nextH === h) return false
      w = nextW
      h = nextH
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      return true
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

    const startLoop = () => {
      if (!raf) raf = requestAnimationFrame(step)
    }
    const stopLoop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onResize = () => {
      if (resize()) init()
    }

    // Debounced: without this, mobile scroll-triggered resize storms (see
    // above) were re-running getBoundingClientRect + regenerating the
    // whole particle array dozens of times per scroll gesture — the actual
    // source of the reported lag, made worse once a second HeroParticles
    // instance was added for the light-theme hero.
    let resizeTimer = 0
    const onResizeDebounced = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(onResize, 150)
    }

    // Only animate while actually on/near screen — the light-theme hero's
    // canvas otherwise keeps redrawing every frame even while the user has
    // scrolled well past it (e.g. down in the History section).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop()
        else stopLoop()
      },
      { rootMargin: '200px' }
    )
    io.observe(canvas)

    onResize()
    window.addEventListener('resize', onResizeDebounced)
    return () => {
      stopLoop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResizeDebounced)
      io.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
}
