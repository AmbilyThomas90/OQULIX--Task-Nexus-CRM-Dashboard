import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import CustomerTable from '../components/CustomerTable'
// Customers component
// Receives customer data and functions 
export default function Customers({ customers, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
 // useMemo calculates the filtered customer list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return customers
      .filter((c) => status === 'All' || c.status === status)
      .filter((c) => `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(q))
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
  }, [customers, search, status])

// Return the Customers page UI
  return <>
    <div className="welcome-row">
      <div>
        <div className="eyebrow"><Sparkles size={14}/> CUSTOMER RELATIONSHIPS</div>
        <h1>Customers</h1>
        <p>Search, filter and manage your customers.</p>
      </div>
     
    </div>

    <CustomerTable
      customers={filtered}
      total={customers.length}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      search={search}
      setSearch={setSearch}
      status={status}
      setStatus={setStatus}
    />
  </>
}
