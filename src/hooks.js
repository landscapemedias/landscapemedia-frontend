import { useEffect, useRef, useState } from 'react'

export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            e.target.setAttribute('data-revealed', 'true')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    )
    const scan = (root) => {
      if (root.matches?.('[data-reveal]:not([data-revealed="true"]):not(.in)')) io.observe(root)
      root.querySelectorAll?.('[data-reveal]:not([data-revealed="true"]):not(.in)').forEach((el) => io.observe(el))
    }
    scan(document)
    const mo = new MutationObserver((rs) => rs.forEach((r) => r.addedNodes.forEach((n) => n.nodeType === 1 && scan(n))))
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [enabled])
}

export function useScrollProgress(ref, mode = 'through') {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const v = mode === 'pin' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height)
      setP(Math.min(1, Math.max(0, v)))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [ref, mode])
  return p
}

export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function useCountUp(target, run, duration = 1600, decimals = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration)
      const e = 1 - Math.pow(1 - k, 4)
      setV(+(target * e).toFixed(decimals))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration, decimals])
  return v
}

export function useMouse() {
  const [m, setM] = useState({ x: 0, y: 0 })
  useEffect(() => {
    let raf = 0
    let nx = 0
    let ny = 0
    const on = (e) => {
      nx = e.clientX / window.innerWidth - 0.5
      ny = e.clientY / window.innerHeight - 0.5
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0
        setM({ x: nx, y: ny })
      })
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [])
  return m
}

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
}
