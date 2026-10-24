import { useRef, useState } from 'react'
import { Smartphone, Sparkles, MoveHorizontal } from 'lucide-react'
import { IMG } from '../data/site'
import { useLanguage } from '../context/LanguageContext'

export default function BeforeAfter() {
  const ref = useRef(null)
  const [p, setP] = useState(50)
  const [touched, setTouched] = useState(false)
  const { t } = useLanguage()
  const ba = t.projects?.beforeAfter || {}

  const move = (x) => {
    const r = ref.current.getBoundingClientRect()
    setP(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }
  const down = (e) => {
    setTouched(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    move(e.clientX)
  }

  return (
    <div className="ba" data-reveal="scale">
      <div
        className={`ba-frame ${touched ? '' : 'hint'}`}
        ref={ref}
        onPointerDown={down}
        onPointerMove={(e) => e.buttons && move(e.clientX)}
        style={{ '--p': `${p}%` }}
        data-cursor="Drag"
      >
        <img src={IMG.cover} alt="Estate terrace as an unedited phone photo" className="ba-img before" draggable="false" />
        <div className="ba-after">
          <img src={IMG.cover} alt="Same estate terrace after professional shoot and edit" className="ba-img after" draggable="false" />
          <div className="ba-brand">
            <b>{ba.title}</b>
            <small>{ba.tag}</small>
          </div>
        </div>
        <span className="ba-tag l"><Smartphone size={14} /> {ba.phonePhoto}</span>
        <span className="ba-tag r"><Sparkles size={14} /> {ba.shootEdit}</span>
        <span className="ba-line">
          <i><MoveHorizontal size={18} /></i>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(p)}
          onChange={(e) => { setTouched(true); setP(+e.target.value) }}
          aria-label={ba.sliderText || 'Compare before and after'}
        />
      </div>
      <div className="ba-copy">
        <b>{ba.sameJob}</b>
        <span>{ba.dragSlider}</span>
      </div>
    </div>
  )
}
