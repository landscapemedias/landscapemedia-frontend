import { useMemo, useState } from 'react'
import { MapPin, Video, Phone, Check, ChevronLeft, ChevronRight, CalendarPlus } from 'lucide-react'
import { BRAND, SERVICES } from '../data/site'
import { Btn, Words } from './ui'

const TYPES = [
  { k: 'site', label: 'Site visit', sub: 'Specialist at your property', icon: MapPin },
  { k: 'video', label: 'Video consult', sub: 'Show us on camera', icon: Video },
  { k: 'phone', label: 'Phone call', sub: 'We call you back', icon: Phone },
]
const SLOTS = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']
const WD = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function ics(date, time, type, name) {
  const [t, ap] = time.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  const e = new Date(d.getTime() + 30 * 60000)
  const f = (x) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${f(d)}`, `DTEND:${f(e)}`, `SUMMARY:${BRAND.name} ${BRAND.word} site visit`, `DESCRIPTION:${type} with ${name}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }))
  a.download = 'site-visit.ics'
  a.click()
}

export default function Booking() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [type, setType] = useState('site')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [picks, setPicks] = useState([])
  const [done, setDone] = useState(false)

  const days = useMemo(() => {
    const first = view.getDay()
    const n = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    return [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))]
  }, [view])

  const ok = (d) => d && d > today && d.getDay() !== 0 && d.getDay() !== 6
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1)
  const valid = date && time && form.name.trim() && /\S+@\S+\.\S+/.test(form.email)
  const T = TYPES.find((t) => t.k === type)
  const label = date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const submit = (e) => {
    e.preventDefault()
    if (valid) setDone(true)
  }

  return (
    <section className="section booking" id="book">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">Book a free site visit</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text="Schedule your" />
              <br />
              <Words text="free site visit." delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            Pick a day and time. A local specialist will visit, assess your trees and grounds, and send you a clear written care plan and quote.
          </p>
        </div>

        <form className="bk-app" onSubmit={submit} data-reveal="scale">
          {done ? (
            <div className="bk-done">
              <svg viewBox="0 0 80 80" className="bk-sprout">
                <path d="M40 76 V40" />
                <path d="M40 46 C40 30 50 20 68 18 C68 36 58 46 40 46Z" />
                <path d="M40 54 C40 42 30 34 14 33 C14 46 24 54 40 54Z" />
              </svg>
              <h3 className="h-display">You're booked, {form.name.split(' ')[0]}.</h3>
              <p>
                {T.label} on <b>{label}</b> at <b>{time}</b> EST. A confirmation is on its way to <b>{form.email}</b>.
              </p>
              <div className="bk-done-act">
                <Btn onClick={() => ics(date, time, T.label, form.name)} icon={false}>
                  <CalendarPlus size={16} style={{ marginRight: 8, verticalAlign: -3 }} />
                  Add to calendar
                </Btn>
                <button type="button" className="btn ghost" onClick={() => { setDone(false); setTime('') }}>
                  Change time
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bk-col">
                <span className="bk-step">01 · How should we meet?</span>
                <div className="bk-types">
                  {TYPES.map((t) => (
                    <button type="button" key={t.k} className={type === t.k ? 'on' : ''} onClick={() => setType(t.k)}>
                      <t.icon size={18} />
                      <b>{t.label}</b>
                      <small>{t.sub}</small>
                    </button>
                  ))}
                </div>

                <span className="bk-step">02 · Pick a day</span>
                <div className="bk-cal">
                  <div className="bk-cal-head">
                    <button type="button" disabled={!canPrev} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} aria-label="Previous month">
                      <ChevronLeft size={18} />
                    </button>
                    <b>{view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</b>
                    <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} aria-label="Next month">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="bk-grid">
                    {WD.map((w) => (
                      <span key={w} className="bk-wd">{w}</span>
                    ))}
                    {days.map((d, i) =>
                      d ? (
                        <button
                          type="button"
                          key={i}
                          disabled={!ok(d)}
                          className={date && d.getTime() === date.getTime() ? 'on' : ''}
                          onClick={() => { setDate(d); setTime('') }}
                        >
                          {d.getDate()}
                        </button>
                      ) : (
                        <span key={i} />
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bk-col">
                <span className="bk-step">03 · Choose a time (EST)</span>
                <div className={`bk-slots ${date ? '' : 'off'}`}>
                  {SLOTS.map((s) => (
                    <button type="button" key={s} disabled={!date} className={time === s ? 'on' : ''} onClick={() => setTime(s)}>
                      {s}
                    </button>
                  ))}
                </div>

                <span className="bk-step">04 · Your details</span>
                <div className="bk-fields">
                  <input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input placeholder="Property address" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="bk-picks">
                  {SERVICES.slice(0, 6).map((s) => (
                    <button
                      type="button"
                      key={s.n}
                      className={`chip ${picks.includes(s.n) ? 'on' : ''}`}
                      onClick={() => setPicks(picks.includes(s.n) ? picks.filter((p) => p !== s.n) : [...picks, s.n])}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                <div className="bk-sum">
                  <span>
                    {date ? (
                      <>
                        <b>{T.label}</b> · {label}
                        {time && ` · ${time}`}
                      </>
                    ) : (
                      'Select a day and time'
                    )}
                  </span>
                  <Btn type="submit" disabled={!valid}>Confirm booking</Btn>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
