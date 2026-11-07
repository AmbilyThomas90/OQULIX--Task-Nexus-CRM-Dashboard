import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CustomerModal from './components/CustomerModal'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import { mockCustomers } from './data/mockCustomers'
// Key used to store customer data in the browser's LocalStorage
const STORAGE_KEY = 'nexus-crm-customers'
const PAGES = {
  dashboard: { title: 'Dashboard' },
  customers: { title: 'Customers' },
}
// Load customer data from LocalStorage
function readCustomers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : mockCustomers
  } catch { return mockCustomers }
}

export default function App() {
  const [customers, setCustomers] = useState(readCustomers)
  const [page, setPage] = useState('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(customers)) }, [customers])

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  // Navigate between Dashboard and Customers pages
  const navigate = (next) => { setPage(next); setSidebarOpen(false); window.scrollTo({ top: 0 }) }

  const openAdd = () => { setEditing(null); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }
  // Edit an existing customer
  const editCustomer = (customer) => { setEditing(customer); setModalOpen(true) } 
// Save a new customer or update an existing customer
  const saveCustomer = (data) => {
    if (editing) {
      setCustomers((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c)))
      notify('Customer details updated successfully.')
    } else {
      setCustomers((prev) => [{ id: Date.now(), ...data, dateAdded: new Date().toISOString().slice(0, 10) }, ...prev])
      notify('New customer added successfully.')
    }
    closeModal()
  }
 // Delete a customer from the customer list
  const deleteCustomer = (customer) => {
    if (window.confirm(`Delete ${customer.name}? This action cannot be undone.`)) {
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id))
      notify('Customer deleted.')
    }
  }

  

  return <div className="app-shell">
    <Sidebar
      page={page}
      onNavigate={navigate}
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      customerCount={customers.length}
    />
    <main className="main-area">
      <Header title={PAGES[page].title} onMenu={() => setSidebarOpen(true)} />
      <div className="page-content">
        {page === 'dashboard' ? (
          <Dashboard
            customers={customers}
            onAdd={openAdd}
          
            onViewAll={() => navigate('customers')}
          />
        ) : (
          <Customers
            customers={customers}
            onAdd={openAdd}
            onEdit={editCustomer}
            onDelete={deleteCustomer}
           
          />
        )}
        <footer className="footer"><span>© 2026 Nexus CRM. Built for better relationships.</span><span>Made with care <span className="heart">♥</span></span></footer>
      </div>
    </main>
    <CustomerModal
      open={modalOpen}
      customer={editing}
      customers={customers}
      onClose={closeModal}
      onSave={saveCustomer}
    />

    {toast && <div className="toast">✓ {toast}</div>}
  </div>
}
