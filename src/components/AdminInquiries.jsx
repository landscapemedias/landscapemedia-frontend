import { useEffect, useState, useMemo } from 'react'
import {
  RefreshCw,
  Search,
  Download,
  Mail,
  Phone,
  MapPin,
  Video,
  Calendar,
  Clock,
  Building2,
  User,
  Copy,
  Check,
  ExternalLink,
  Inbox,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Users
} from 'lucide-react'
import { BRAND } from '../data/site'

const API_GET_URL = 'https://landscape-media-ow1m.vercel.app/api/v1/user/get-user-inquiry'

export default function AdminInquiries({ onBack }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [copiedId, setCopiedId] = useState(null)
  const [lastRefreshed, setLastRefreshed] = useState(null)

  const fetchInquiries = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_GET_URL)
      const data = await res.json()
      if (res.ok && data.status === 1 && Array.isArray(data.data)) {
        // Sort newest first by createdAt if present
        const sorted = [...data.data].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        setInquiries(sorted)
        setLastRefreshed(new Date())
      } else {
        throw new Error(data.msg || 'Failed to fetch inquiries')
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err)
      setError(err.message || 'Unable to load inquiries. Please check your internet or API connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  // Quick stats
  const stats = useMemo(() => {
    const total = inquiries.length
    const today = new Date().toDateString()
    const todayCount = inquiries.filter((item) => {
      if (!item.createdAt) return false
      return new Date(item.createdAt).toDateString() === today
    }).length

    const inPersonCount = inquiries.filter((item) =>
      /person/i.test(item.howShouldWeMeet || '')
    ).length
    const videoCallCount = inquiries.filter((item) =>
      /video/i.test(item.howShouldWeMeet || '')
    ).length
    const phoneCallCount = inquiries.filter((item) =>
      /phone|tel/i.test(item.howShouldWeMeet || '')
    ).length

    return { total, todayCount, inPersonCount, videoCallCount, phoneCallCount }
  }, [inquiries])

  // Filtered inquiries
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return inquiries.filter((item) => {
      // Filter by meeting type
      if (typeFilter !== 'ALL') {
        const meet = (item.howShouldWeMeet || '').toLowerCase()
        if (typeFilter === 'VIDEO' && !meet.includes('video')) return false
        if (typeFilter === 'PERSON' && !meet.includes('person')) return false
        if (typeFilter === 'PHONE' && !meet.includes('phone') && !meet.includes('tel')) return false
      }

      // Filter by query
      if (!q) return true
      return (
        (item.personName || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.companyName || '').toLowerCase().includes(q) ||
        (item.phone || '').toLowerCase().includes(q) ||
        (item.requiredService || '').toLowerCase().includes(q) ||
        (item.pickDay || '').toLowerCase().includes(q)
      )
    })
  }, [inquiries, search, typeFilter])

  // Copy full inquiry details
  const handleCopy = (item, id) => {
    const text = [
      `Client: ${item.personName || 'N/A'}`,
      `Company: ${item.companyName || 'N/A'}`,
      `Email: ${item.email || 'N/A'}`,
      `Phone: ${item.phone || 'N/A'}`,
      `Meeting: ${item.howShouldWeMeet || 'N/A'}`,
      `Booking Date: ${item.pickDay || 'N/A'} at ${item.chooseTime || 'N/A'}`,
      `Required Services / Notes: ${item.requiredService || 'N/A'}`,
      `Submitted: ${item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}`
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // Export CSV
  const handleExportCSV = () => {
    if (!inquiries.length) return
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Meeting Type',
      'Booking Day',
      'Booking Time',
      'Services / Notes',
      'Submitted At'
    ]

    const rows = inquiries.map((item) => [
      `"${(item.personName || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.companyName || '').replace(/"/g, '""')}"`,
      `"${(item.howShouldWeMeet || '').replace(/"/g, '""')}"`,
      `"${(item.pickDay || '').replace(/"/g, '""')}"`,
      `"${(item.chooseTime || '').replace(/"/g, '""')}"`,
      `"${(item.requiredService || '').replace(/"/g, '""')}"`,
      `"${item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `landscape-inquiries-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Helper for meeting icons
  const getMeetingIcon = (type = '') => {
    const t = type.toLowerCase()
    if (t.includes('video')) return <Video size={14} />
    if (t.includes('phone') || t.includes('tel')) return <Phone size={14} />
    return <MapPin size={14} />
  }

  return (
    <div className="admin-container">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-nav">
          <div className="admin-logo-group">
            <button
              onClick={() => {
                if (onBack) onBack()
                else window.location.href = '/'
              }}
              className="admin-btn"
              title="Return to home website"
            >
              <ArrowLeft size={16} />
              <span>Back to Site</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#f3efe3' }}>
                Landscape Media<span style={{ color: '#b8e86a' }}>.</span>
              </span>
              <span className="admin-badge">
                <span className="admin-pulse-dot" />
                Inquiry Hub
              </span>
            </div>
          </div>

          <div className="admin-actions">
            <button
              onClick={handleExportCSV}
              disabled={!inquiries.length}
              className="admin-btn"
              title="Download CSV spreadsheet"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="admin-btn primary"
              title="Refresh inquiries"
            >
              <RefreshCw size={15} className={loading ? 'admin-loading-spinner' : ''} style={{ animation: loading ? 'adminSpin 1s linear infinite' : 'none' }} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-content">
        {/* Metric Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Inbox size={24} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stats.total}</span>
              <span className="admin-stat-label">Total Inquiries</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
              <Sparkles size={24} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stats.todayCount}</span>
              <span className="admin-stat-label">Received Today</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Video size={24} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stats.videoCallCount}</span>
              <span className="admin-stat-label">Video Calls</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(251, 146, 60, 0.12)', color: '#fb923c' }}>
              <MapPin size={24} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stats.inPersonCount}</span>
              <span className="admin-stat-label">In-Person Meetings</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Search + Filter Pills */}
        <div className="admin-toolbar">
          <div className="admin-search-box">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by client name, email, company, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-filter-pills">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`admin-pill ${typeFilter === 'ALL' ? 'active' : ''}`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setTypeFilter('PERSON')}
              className={`admin-pill ${typeFilter === 'PERSON' ? 'active' : ''}`}
            >
              In Person ({stats.inPersonCount})
            </button>
            <button
              onClick={() => setTypeFilter('VIDEO')}
              className={`admin-pill ${typeFilter === 'VIDEO' ? 'active' : ''}`}
            >
              Video Call ({stats.videoCallCount})
            </button>
            <button
              onClick={() => setTypeFilter('PHONE')}
              className={`admin-pill ${typeFilter === 'PHONE' ? 'active' : ''}`}
            >
              Phone Call ({stats.phoneCallCount})
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderRadius: 14,
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            marginBottom: 24,
            fontSize: 14
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button
              onClick={fetchInquiries}
              style={{
                marginLeft: 'auto',
                padding: '6px 14px',
                borderRadius: 8,
                background: '#ef4444',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && inquiries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div className="admin-loading-spinner" style={{ width: 44, height: 44, borderWidth: 4 }} />
            <p style={{ marginTop: 18, color: '#9ab4a3', fontSize: 15 }}>Loading latest inquiries...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Inbox size={28} />
            </div>
            <h3 className="admin-empty-title">
              {search || typeFilter !== 'ALL' ? 'No matching inquiries found' : 'No inquiries yet'}
            </h3>
            <p className="admin-empty-desc">
              {search || typeFilter !== 'ALL'
                ? 'Try adjusting your search query or removing the filters to see more results.'
                : 'When potential clients submit the booking form on your website, their inquiries will appear here in real time.'}
            </p>
            {(search || typeFilter !== 'ALL') && (
              <button
                onClick={() => { setSearch(''); setTypeFilter('ALL') }}
                className="admin-btn primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Inquiries Cards List */}
        {!loading && filtered.length > 0 && (
          <div className="admin-inquiries-grid">
            {filtered.map((item, idx) => {
              const uniqueKey = item.id || item._id || idx
              const isCopied = copiedId === uniqueKey
              const createdAtFormatted = item.createdAt
                ? new Date(item.createdAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })
                : 'Date not recorded'

              return (
                <div key={uniqueKey} className="admin-card">
                  {/* Col 1: Client & Company */}
                  <div className="admin-card-col">
                    <div className="admin-client-name">
                      <User size={18} style={{ color: '#b8e86a' }} />
                      <span>{item.personName || 'Unnamed Client'}</span>
                    </div>

                    {item.companyName && item.companyName !== 'N/A' && (
                      <div className="admin-client-company">
                        <Building2 size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
                        {item.companyName}
                      </div>
                    )}

                    <div className="admin-client-contacts">
                      {item.email && item.email !== 'N/A' && (
                        <a href={`mailto:${item.email}`} className="admin-contact-link">
                          <Mail size={14} />
                          <span>{item.email}</span>
                        </a>
                      )}
                      {item.phone && item.phone !== 'N/A' && (
                        <a href={`tel:${item.phone}`} className="admin-contact-link">
                          <Phone size={14} />
                          <span>{item.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Col 2: Meeting details & Schedule */}
                  <div className="admin-card-col">
                    <span className="admin-meeting-badge">
                      {getMeetingIcon(item.howShouldWeMeet)}
                      <span>{item.howShouldWeMeet || 'Meeting'}</span>
                    </span>

                    <div className="admin-slot-info" style={{ marginTop: 8 }}>
                      <div className="admin-slot-date">
                        <Calendar size={15} style={{ color: '#b8e86a' }} />
                        <span>{item.pickDay || 'Day not specified'}</span>
                      </div>
                      <div className="admin-slot-time">
                        <Clock size={14} />
                        <span>{item.chooseTime || 'Time not specified'} (EST)</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 3: Required Services & Message */}
                  <div className="admin-card-col">
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ab4a3' }}>
                      Required Services
                    </span>
                    <div className="admin-service-tags">
                      {(item.requiredService || 'General Inquiry').split(',').map((tag, sIdx) => (
                        <span key={sIdx} className="admin-tag">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Col 4: Timestamp & Quick Action */}
                  <div className="admin-card-actions">
                    <button
                      onClick={() => handleCopy(item, uniqueKey)}
                      className={`admin-copy-btn ${isCopied ? 'copied' : ''}`}
                      title="Copy lead details to clipboard"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? 'Copied!' : 'Copy Info'}</span>
                    </button>

                    <div className="admin-date-stamp">
                      Received: {createdAtFormatted}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
