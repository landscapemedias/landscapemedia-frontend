import { Fragment } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BRAND } from '../data/site'

export function Words({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const parts = text.split(' ')
  return (
    <Tag className={`split-words ${className}`} data-reveal="" style={{ '--d': `${delay}s` }}>
      {parts.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span style={{ '--i': i }}>{w}</span>
          </span>
          {i < parts.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}

export function Btn({ children, variant = '', href, onClick, type = 'button', icon = true, ...rest }) {
  const cls = `btn ${variant}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="ico">
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} type={type} onClick={onClick} {...rest}>
      {inner}
    </button>
  )
}

export function LeafMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="var(--ink)" />
      <path d="M32 52V30" stroke="var(--sprout)" strokeWidth="4" strokeLinecap="round" />
      <path className="lm-a" d="M32 34c0-10 7-17 18-18 0 11-7 18-18 18z" fill="var(--sprout)" />
      <path className="lm-b" d="M32 40c0-8-6-13-15-14 0 9 6 14 15 14z" fill="var(--leaf)" />
      <path d="M14 52h36" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'light' : ''}`}>
      <LeafMark />
      <span className="logo-t">
        <b>
          {BRAND.name}<em>{BRAND.word}</em>
        </b>
        <i>{BRAND.line}</i>
      </span>
    </span>
  )
}

export function Leaf({ size = 16, fill = 'currentColor', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill={fill} />
      <path d="M4 20L14 10" stroke="rgba(0,0,0,.25)" strokeWidth="1.2" />
    </svg>
  )
}
