import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react'
const icons = { total: Users, active: UserCheck, inactive: UserX } // Create an object to map each customer type 

// StatCard component
// Receives statistics information through props

export default function StatCard({ type, label, value, note }) {
  const Icon = icons[type] || Users
  return <div className="stat-card">
    <div className="stat-top">
      <span>{label}</span><span className={`stat-icon ${type}`}><Icon size={19} /></span>
    </div>
    <div className="stat-value color=green">{value}</div>
    <div className="stat-note"><span className="trend">
      <TrendingUp size={14} /> {note}</span><span>vs. last month</span>
    </div>
  </div>
}
