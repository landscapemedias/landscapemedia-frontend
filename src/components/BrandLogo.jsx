import logoImg from '../assets/images/logo.png'
import logoLightImg from '../assets/images/logo-light.png'

export default function BrandLogo({ light = false, play = true, className = '', style }) {
  const src = light ? logoLightImg : logoImg
  return (
    <div className={`blogo ${light ? 'light' : ''} ${play ? 'play' : ''} ${className}`} style={style} role="img" aria-label="Landscape Media">
      <img src={src} alt="" className="bl-sizer" aria-hidden="true" />
      <span className="bl-glow" aria-hidden="true" />
      <img src={src} alt="" className="bl-part bl-phone" aria-hidden="true" />
      <span className="bl-shine" aria-hidden="true" />
      <img src={src} alt="" className="bl-part bl-word" aria-hidden="true" />
      <img src={src} alt="" className="bl-part bl-media" aria-hidden="true" />
      <img src={src} alt="" className="bl-part bl-tm" aria-hidden="true" />
      <svg className="bl-vine" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
        <path className="bl-vine-line" d="M4 14 C80 4 140 22 200 12 C260 2 320 22 396 10" />
        <path className="bl-vine-leaf l1" d="M118 14 C118 6 126 1 136 0 C136 8 128 14 118 14Z" />
        <path className="bl-vine-leaf l2" d="M282 12 C282 4 274 -1 264 -2 C264 6 272 12 282 12Z" />
      </svg>
    </div>
  )
}
