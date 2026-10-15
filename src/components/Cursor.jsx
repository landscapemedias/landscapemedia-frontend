import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [mode, setMode] = useState('')
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return
    document.documentElement.classList.add('has-cursor')
    let x = innerWidth / 2
    let y = innerHeight / 2
    let rx = x
    let ry = y
    let raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      const t = e.target.closest('[data-cursor], a, button, input, textarea, select, label')
      if (!t) {
        setMode('')
        setLabel('')
        return
      }
      const c = t.getAttribute('data-cursor')
      if (c) {
        setMode('label')
        setLabel(c)
      } else if (t.matches('input, textarea, select')) {
        setMode('text')
        setLabel('')
      } else {
        setMode('hover')
        setLabel('')
      }
    }
    const down = () => ring.current?.classList.add('down')
    const up = () => ring.current?.classList.remove('down')
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div className="cur-dot" ref={dot} />
      <div className={`cur-ring ${mode}`} ref={ring}>
        <span className="cur-leaf">
          <svg viewBox="0 0 24 24">
            <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" />
          </svg>
        </span>
        <span className="cur-label">{label}</span>
      </div>
    </>
  )
}
