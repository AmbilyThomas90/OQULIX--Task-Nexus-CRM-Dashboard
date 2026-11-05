
import { useMemo } from 'react'
import { CalendarDays, Sparkles } from 'lucide-react'
import StatCard from '../components/StatCard'

// Array containing different background colors for customer avatars
const avatarTones = ['lavender', 'peach', 'mint', 'blue']

// Get customer initials
const initials = (name = '') =>
  name
    .split(' ')
    .map((x) => x[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

// Check check whether a customer was added
const isWithinDays = (date, days) => {
  if (!date) return false
  // Convert customer date into a JavaScript Date object
  const dateAdded = new Date(date + 'T00:00:00')
  const today = new Date()

  const difference = today - dateAdded

  return (
    difference >= 0 &&
    difference <= days * 24 * 60 * 60 * 1000
  )
}
// Dashboard component
export default function Dashboard({ customers = [], onViewAll }) {

  // Calculate dashboard statistics
  const stats = useMemo(() => {

    const active = customers.filter(
      (c) => c.status === 'Active'
    ).length

    const recent = [...customers]
      .sort(
        (a, b) =>
          new Date(b.dateAdded) - new Date(a.dateAdded)
      )
      .slice(0, 5)   // Display only the first five customers

    return {
      total: customers.length,

      active,

      inactive: customers.length - active,

      newThisWeek: customers.filter(
        (c) => isWithinDays(c.dateAdded, 7)
      ).length,

      activePct: customers.length
        ? Math.round((active / customers.length) * 100)
        : 0,

      recent,
    }

  }, [customers])

  return (
    <>
      {/* Welcome section */}
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            CUSTOMER RELATIONSHIPS
          </div>

          <h1>Dashboard</h1>

          <p>
            Welcome back, Alex. Here's what's happening with your customers.
          </p>
        </div>
      </div>

      {/* Customer statistics */}
      <div className="stats-grid">

        <StatCard
          type="total"
          label="Total customers"
          value={stats.total}
          note="All customers"
        />

        <StatCard
          type="active"
          label="Active customers"
          value={stats.active}
          note="Currently active"
        />

        <StatCard
          type="inactive"
          label="Inactive customers"
          value={stats.inactive}
          note="Currently inactive"
        />

      </div>

      {/* Customer overview heading */}
      <div className="section-title-row">

        <div>
          <h2>Customer overview</h2>
          <p>Complete details of your customers.</p>
        </div>

        {/* All customers button */}
        <div className="date-chip">
          <CalendarDays size={15} />

          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            All customers
          </button>
        </div>

      </div>

      {/* Customer details */}
      <div className="overview-grid">

        <div className="recent-card">

          <div className="recent-heading">
            <div>
              <h3>Customer details</h3>
              <p>Recently added customers</p>
            </div>
          </div>

          <div className="recent-list">

            {stats.recent.length === 0 ? (

              <p className="recent-empty">
                No customers yet. Add your first customer to see details here.
              </p>

            ) : (

              stats.recent.map((c, i) => (

                <div className="recent-item" key={c.id}>

                  {/* Customer avatar */}
                  <div
                    className={`customer-avatar ${
                      avatarTones[i % avatarTones.length]
                    }`}
                  >
                    {initials(c.name)}
                  </div>

                  {/* Customer information */}
                  <div className="recent-info">
                    <strong>{c.name}</strong>

                    <small>
                      {c.company || 'No company'}
                    </small>

                    <small>
                      {c.email || 'No email available'}
                    </small>
                  </div>

                  {/* Customer status and date */}
                  <div className="customer-details-right">

                    <span
                      className={`status-badge ${
                        c.status === 'Active'
                          ? 'active'
                          : 'inactive'
                      }`}
                    >
                      {c.status}
                    </span>

                    <span className="recent-date">
                      {c.dateAdded
                        ? new Date(
                            c.dateAdded + 'T00:00:00'
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'No date'}   // Display fallback text if date is missing
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>
        </div>

      </div>
    </>
  )
}
