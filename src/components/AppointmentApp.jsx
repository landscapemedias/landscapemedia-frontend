import { useMemo, useState } from 'react'
import { Calendar, Clock, MapPin, Video, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import '../styles/AppointmentApp.css'

const MEETING_SLOTS = [
  '09:00 AM EST',
  '11:30 AM EST',
  '02:00 PM EST',
  '04:30 PM EST'
]

function getUpcomingWorkdays(count) {
  const days = []
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  while (days.length < count) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(new Date(d))
    }
  }
  return days
}

export default function AppointmentApp() {
  const workdays = useMemo(() => getUpcomingWorkdays(8), [])
  const [meetingType, setMeetingType] = useState('onsite')
  const [selectedDayIdx, setSelectedDayIdx] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(MEETING_SLOTS[1])
  const [confirmed, setConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    scope: 'Complete Landscape 3D Master Plan & Hardscaping',
  })

  const activeDay = workdays[selectedDayIdx]
  const dayDisplay = activeDay
    ? activeDay.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : ''

  const handleBook = (e) => {
    e.preventDefault()
    setConfirmed(true)
  }

  return (
    <section className="section appt-app" id="appointment">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">Interactive Reservation Desk</span>
            <h2 className="h-display">
              Reserve your design consultation. <br />
              <span className="serif">On-site or virtual 3D session.</span>
            </h2>
          </div>
          <p>
            Choose between an in-person field measurement with our lead landscape architect or a high-definition virtual CAD screen-share to review your property renders.
          </p>
        </header>

        <div className="appt-app__box" data-reveal>
          {confirmed ? (
            <div className="appt-app__success">
              <div className="appt-app__success-icon">
                <CheckCircle2 className="w-10 h-10 text-leaf" />
              </div>
              <h3>Consultation Reserved!</h3>
              <p>
                We have registered your session for <strong>{dayDisplay} at {selectedSlot}</strong>. 
                A calendar invite and preparation checklist have been sent to <strong>{formData.email || 'your email'}</strong>.
              </p>
              <div className="appt-app__success-details">
                <div><span>Meeting Type:</span><strong>{meetingType === 'onsite' ? 'On-Site Field Visit' : 'Virtual 3D Review'}</strong></div>
                <div><span>Representative:</span><strong>Senior Landscape Architect</strong></div>
                <div><span>Cost:</span><strong>$0 (Complimentary)</strong></div>
              </div>
              <button
                type="button"
                onClick={() => setConfirmed(false)}
                className="btn btn--primary"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="appt-app__grid">
              <div className="appt-app__picker-panel">
                <div className="appt-app__step">
                  <label className="appt-app__step-lbl">Step 1: Choose Meeting Mode</label>
                  <div className="appt-app__types">
                    <button
                      type="button"
                      onClick={() => setMeetingType('onsite')}
                      className={`appt-app__type-btn ${meetingType === 'onsite' ? 'is-active' : ''}`}
                    >
                      <MapPin className="w-4 h-4 text-emerald" />
                      <div>
                        <strong>On-Site Property Walk</strong>
                        <span>Laser scan & soil check</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeetingType('virtual')}
                      className={`appt-app__type-btn ${meetingType === 'virtual' ? 'is-active' : ''}`}
                    >
                      <Video className="w-4 h-4 text-emerald" />
                      <div>
                        <strong>Virtual 3D Studio Review</strong>
                        <span>Live screen-share session</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="appt-app__step">
                  <label className="appt-app__step-lbl">Step 2: Select Date</label>
                  <div className="appt-app__days-scroll">
                    {workdays.map((d, idx) => {
                      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
                      const dateNum = d.getDate()
                      const monthName = d.toLocaleDateString('en-US', { month: 'short' })
                      const isSelected = selectedDayIdx === idx
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDayIdx(idx)}
                          className={`appt-app__day-pill ${isSelected ? 'is-active' : ''}`}
                        >
                          <span className="appt-app__day-wk">{dayName}</span>
                          <span className="appt-app__day-num">{dateNum}</span>
                          <span className="appt-app__day-mo">{monthName}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="appt-app__step">
                  <label className="appt-app__step-lbl">Step 3: Select Available Time Window</label>
                  <div className="appt-app__slots">
                    {MEETING_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`appt-app__slot-btn ${selectedSlot === slot ? 'is-active' : ''}`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="appt-app__form-panel">
                <form onSubmit={handleBook} className="appt-app__form">
                  <div className="appt-app__summary-bar">
                    <Calendar className="w-4 h-4 text-leaf" />
                    <span>{dayDisplay} · {selectedSlot} · {meetingType === 'onsite' ? 'On-Site' : 'Virtual'}</span>
                  </div>

                  <div className="appt-app__field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="appt-app__row">
                    <div className="appt-app__field">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="marcus@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="appt-app__field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="appt-app__field">
                    <label>{meetingType === 'onsite' ? 'Property Address *' : 'Project Location / City *'}</label>
                    <input
                      type="text"
                      required
                      placeholder="128 Valley Crest Blvd, Austin TX"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="appt-app__field">
                    <label>Scope of Interest</label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    >
                      <option>Complete Landscape 3D Master Plan & Hardscaping</option>
                      <option>Corten Steel Edging & Retaining Wall Installation</option>
                      <option>Smart Eco-Irrigation & Sod Turf Replacement</option>
                      <option>Digital Media Production for Landscape Contractors</option>
                      <option>Outdoor Fire Pit & Slate Patio Living Space</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary appt-app__submit"
                    data-magnetic
                  >
                    <span>Confirm Consultation Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="appt-app__guarantee">
                    <ShieldCheck className="w-4 h-4 text-emerald" />
                    <span>Zero commitment. Cancel or reschedule anytime in 1-click.</span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
