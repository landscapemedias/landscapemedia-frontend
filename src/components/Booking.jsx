import { useMemo, useState } from 'react'
import { MapPin, Video, Phone, Mail, Clock, Calendar, CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { BRAND } from '../data/site'
import { Btn, Words } from './ui'
import { useLanguage } from '../context/LanguageContext'

const ICONS = {
  MapPin,
  Video,
  Phone,
}

const SLOTS = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']

function getGoogleCalendarUrl(date, time, type, name) {
  if (!date || !time) return '#'
  const [t, ap] = time.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0

  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  const e = new Date(d.getTime() + 30 * 60000)
  const f = (x) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const title = encodeURIComponent(`${BRAND.name} ${BRAND.word} - ${type}`)
  const details = encodeURIComponent(`${type} with ${name} · Landscape Media Strategy Call`)
  const location = encodeURIComponent(type.toLowerCase().includes('person') ? BRAND.address : 'Online Strategy Session')

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${f(d)}/${f(e)}&details=${details}&location=${location}`
}

function ics(date, time, type, name) {
  if (!date || !time) return
  const [t, ap] = time.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  const e = new Date(d.getTime() + 30 * 60000)
  const f = (x) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Landscape Media//Strategy Call//EN',
    'BEGIN:VEVENT',
    `DTSTART:${f(d)}`,
    `DTEND:${f(e)}`,
    `SUMMARY:${BRAND.name} ${BRAND.word} - ${type}`,
    `DESCRIPTION:${type} with ${name}\\nLandscape Media Strategy Session`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }))
  a.download = 'landscape-media-strategy-call.ics'
  a.click()
}

export default function Booking() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [type, setType] = useState('site')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [picks, setPicks] = useState([])
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { t, lang } = useLanguage()
  const data = t.booking || {}
  const info = t.contact || {}
  const interests = info.interests || []

  const types = (data.types || []).map((tp) => ({
    ...tp,
    icon: ICONS[tp.iconName] || MapPin,
  }))

  const wd = lang === 'es' ? ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const locale = lang === 'es' ? 'es-ES' : 'en-US'

  const days = useMemo(() => {
    const first = view.getDay()
    const n = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    return [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))]
  }, [view])

  const ok = (d) => d && d > today && d.getDay() !== 0 && d.getDay() !== 6
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1)
  const valid = date && time && form.name.trim() && /\S+@\S+\.\S+/.test(form.email)
  const T = types.find((item) => item.k === type) || types[0] || { label: 'In person' }
  const label = date?.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || submitting) return
    setSubmitting(true)
    setSubmitError('')

    const selectedServices = picks.length > 0 ? picks.join(', ') : 'General Inquiry'
    const payload = {
      howShouldWeMeet: T.label || 'In Person',
      pickDay: label || (date ? date.toISOString().split('T')[0] : 'Not specified'),
      chooseTime: time || 'Not specified',
      personName: form.name.trim(),
      email: form.email.trim(),
      companyName: form.company.trim() || 'N/A',
      phone: form.phone.trim() || 'N/A',
      requiredService: form.message.trim() ? `${selectedServices} | Note: ${form.message.trim()}` : selectedServices,
    }

    try {
      const res = await fetch('https://landscape-media.vercel.app/api/v1/user/add-user-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (res.ok && result.status === 1) {
        setDone(true)
      } else {
        throw new Error(result.msg || 'Error al enviar la consulta. Intente de nuevo.')
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err)
      setSubmitError(
        lang === 'es'
          ? 'No pudimos registrar su consulta en este momento. Por favor inténtelo de nuevo o contáctenos directamente.'
          : 'Could not register your inquiry at this moment. Please try again or reach out directly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const confirmedHeading = (data.confirmedTitle || "You're booked, {name}.").replace('{name}', form.name.split(' ')[0])
  const confirmedText = (data.confirmedBody || '{type} on {date} at {time} EST. Your booking request has been successfully received; we will confirm at {email}.')
    .replace('{type}', T.label)
    .replace('{date}', label || '')
    .replace('{time}', time)
    .replace('{email}', form.email)

  return (
    <section className="section booking dark" id="book">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <span className="eyebrow" data-reveal="">{data.eyebrow}</span>
            <h2 className="h-display h-lg" style={{ marginTop: 18 }}>
              <Words text={data.title1} />
              <br />
              <Words text={data.title2} delay={0.15} className="ital" />
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ '--d': '0.2s' }}>
            {data.lead}
          </p>
        </div>

        <ul className="bk-info" data-reveal="">
          {[
            { icon: Phone, label: info.callLabel, value: BRAND.phone, href: BRAND.phoneHref },
            { icon: Mail, label: info.emailLabel, value: BRAND.email, href: `mailto:${BRAND.email}` },
            { icon: MapPin, label: info.visitLabel, value: BRAND.address },
            { icon: Clock, label: info.hoursLabel, value: t.nav?.hours || BRAND.hours },
          ].map((w) => {
            const inner = (
              <>
                <span className="bk-info-ico"><w.icon size={18} /></span>
                <span><small>{w.label}</small><b>{w.value}</b></span>
              </>
            )
            return <li key={w.label}>{w.href ? <a href={w.href}>{inner}</a> : <div>{inner}</div>}</li>
          })}
        </ul>

        <form className="bk-app" onSubmit={submit} data-reveal="scale">
          {done ? (
            <div className="bk-done">
              <svg viewBox="0 0 80 80" className="bk-sprout">
                <path d="M40 76 V40" />
                <path d="M40 46 C40 30 50 20 68 18 C68 36 58 46 40 46Z" />
                <path d="M40 54 C40 42 30 34 14 33 C14 46 24 54 40 54Z" />
              </svg>
              <h3 className="h-display">{confirmedHeading}</h3>
              <p>{confirmedText}</p>
              <div className="bk-done-act">
                <a
                  href={getGoogleCalendarUrl(date, time, T.label, form.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bk-btn-gcal"
                  title="Add to Google Calendar"
                >
                  <CalendarPlus size={18} />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  className="bk-btn-ics"
                  onClick={() => ics(date, time, T.label, form.name)}
                  title="Download .ics for Apple Calendar or Outlook"
                >
                  <Calendar size={18} />
                  <span>Apple / Outlook (.ics)</span>
                </button>

                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setForm({ name: '', email: '', company: '', phone: '', message: '' })
                    setPicks([])
                    setDate(null)
                    setTime('')
                    setDone(false)
                  }}
                  title={lang === 'es' ? 'Enviar una nueva consulta' : 'Submit a new booking request'}
                >
                  {lang === 'es' ? 'Nueva solicitud' : 'Submit new request'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bk-col">
                <span className="bk-step">{data.step1 || '01 · How should we meet?'}</span>
                <div className="bk-types">
                  {types.map((tp) => (
                    <button type="button" key={tp.k} className={type === tp.k ? 'on' : ''} onClick={() => setType(tp.k)}>
                      <tp.icon size={18} />
                      <b>{tp.label}</b>
                      <small>{tp.sub}</small>
                    </button>
                  ))}
                </div>

                <span className="bk-step">{data.step2 || '02 · Pick a day'}</span>
                <div className="bk-cal">
                  <div className="bk-cal-head">
                    <button type="button" disabled={!canPrev} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} aria-label="Previous month">
                      <ChevronLeft size={18} />
                    </button>
                    <b>{view.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</b>
                    <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} aria-label="Next month">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="bk-grid">
                    {wd.map((w) => (
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
                <span className="bk-step">{data.step3 || '03 · Choose a time (EST)'}</span>
                <div className={`bk-slots ${date ? '' : 'off'}`}>
                  {SLOTS.map((s) => (
                    <button type="button" key={s} disabled={!date} className={time === s ? 'on' : ''} onClick={() => setTime(s)}>
                      {s}
                    </button>
                  ))}
                </div>

                <span className="bk-step">{data.step4 || '04 · Your details'}</span>
                <div className="bk-fields">
                  <input placeholder={data.fullName || 'Full name *'} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input placeholder={data.email || 'Email *'} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input placeholder={data.company || 'Company name'} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <input placeholder={data.phone || 'Phone'} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <span className="bk-step">{data.step5 || '05 · Your project'}</span>
                <div className="bk-picks">
                  {interests.map((x) => (
                    <button
                      type="button"
                      key={x}
                      className={`chip ${picks.includes(x) ? 'on' : ''}`}
                      onClick={() => setPicks(picks.includes(x) ? picks.filter((p) => p !== x) : [...picks, x])}
                    >
                      {x}
                    </button>
                  ))}
                </div>
                <textarea className="bk-msg" rows={3} placeholder={info.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

                {submitError && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    {submitError}
                  </div>
                )}

                <div className="bk-sum">
                  <span>
                    {date ? (
                      <>
                        <b>{T.label}</b> · {label}
                        {time && ` · ${time}`}
                      </>
                    ) : (
                      data.selectDayTime || 'Select a day and time'
                    )}
                  </span>
                  <Btn type="submit" disabled={!valid || submitting}>
                    {submitting
                      ? (lang === 'es' ? 'Enviando...' : 'Submitting...')
                      : (data.submit || 'Confirm booking')}
                  </Btn>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
