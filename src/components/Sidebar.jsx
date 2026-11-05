import { LayoutDashboard, Users, Settings, HelpCircle, X } from 'lucide-react'

export default function Sidebar({ page, onNavigate, open, onClose, customerCount = 0 }) {
  const link = (id) => `nav-link ${page === id ? 'active' : ''}`

  // Return the Sidebar UI
  return <>
    {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark">N</div>
        <span className="brand-name">nexus<span>.</span></span>
        <button className="icon-button mobile-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button></div>
      {/* <div className="workspace"><div className="workspace-avatar">S</div><div><strong>Studio workspace</strong><small>Free plan</small></div><span className="chevron">⌄</span></div> */}
      <p className="nav-label">WORKSPACE</p>
         {/* Sidebar navigation links */}
      <nav className="nav-links">
         {/* Dashboard navigation button */}
        <button className={link('dashboard')} onClick={() => onNavigate('dashboard')} aria-current={page === 'dashboard' ? 'page' : undefined}><LayoutDashboard size={19} /> Dashboard</button>
        <button className={link('customers')} onClick={() => onNavigate('customers')} aria-current={page === 'customers' ? 'page' : undefined}><Users size={19} /> Customers <span className="nav-count">{customerCount}</span></button>
      </nav>
      <div className="sidebar-bottom">
        {/* <a className="nav-link" href="#settings"><Settings size={18}/> Settings</a>
        <a className="nav-link" href="#help"><HelpCircle size={18}/> Help & support</a> */}
        <div className="profile-card">
          <div className="profile-avatar">AT</div>
          <div className="profile-info"><strong>Alex Taylor</strong><small>alex@studio.com</small></div>
          <span className="dots">···</span></div>
      </div>
    </aside>
  </>
}
