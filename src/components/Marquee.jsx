import { MARQUEE } from '../data/site'
import { Leaf } from './ui'

function Row({ items, reverse }) {
  const list = [...items, ...items]
  return (
    <div className={`mq-row ${reverse ? 'rev' : ''}`}>
      <div className="mq-track">
        {list.map((t, i) => (
          <span className="mq-item" key={i}>
            {t}
            <Leaf size={22} fill={i % 2 ? 'var(--leaf)' : 'var(--sprout)'} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee dark" aria-label="What we do">
      <Row items={MARQUEE} />
      <Row items={[...MARQUEE].reverse()} reverse />
    </section>
  )
}
