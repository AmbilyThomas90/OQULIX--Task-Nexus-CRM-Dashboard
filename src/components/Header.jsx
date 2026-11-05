import { Menu, Bell, ChevronDown } from 'lucide-react'
// Header component
export default function Header({ title = 'Customers', onMenu }) {
    // Return the Header UI
  return <header className="topbar"><div className="topbar-left">
    <button className="icon-button menu-button" onClick={onMenu} aria-label="Open navigation">
      <Menu size={20} /></button><span className="breadcrumb-muted">Workspace</span>
    <span className="crumb-slash">/</span><strong>{title}</strong></div>
    <div className="topbar-right">
      <button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><i /></button>
      <div className="topbar-user"><div className="profile-avatar small">AT</div><span>Alex Taylor</span>
        <ChevronDown size={15} /></div></div></header>
}
