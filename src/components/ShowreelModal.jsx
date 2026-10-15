import { X, Play, Volume2, Shield } from 'lucide-react'
import { IMG } from '../media.js'
import '../styles/ShowreelModal.css'

export default function ShowreelModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="reel-modal" onClick={onClose} aria-modal="true" role="dialog">
      <div className="reel-modal__box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="reel-modal__close"
          aria-label="Close Showreel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="reel-modal__video-wrap">
          <img
            src={IMG.reelCover}
            alt="Landscape Work 2026 Landscape Reel"
            className="reel-modal__thumb"
          />
          <div className="reel-modal__overlay">
            <div className="reel-modal__play-btn">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <div className="reel-modal__hud">
              <div className="reel-modal__pill">
                <span className="reel-modal__dot" />
                <span>4K CINEMATIC REEL · 2026</span>
              </div>
              <h4>Architectural Hardscaping & Drone Site Survey</h4>
            </div>
          </div>
        </div>

        <div className="reel-modal__meta">
          <div>
            <strong>Landscape Work Showcase</strong>
            <p>Featuring Corten Steel Edging, 3D Elevation Modeling & Flagstone Fire Pits</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn--primary"
          >
            Close Showreel
          </button>
        </div>
      </div>
    </div>
  )
}
