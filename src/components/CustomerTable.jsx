
import { useState } from 'react'
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Phone,
  Building2
} from 'lucide-react'

const initials = name =>
  name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase()

const colors = ['lavender', 'peach', 'mint', 'blue', 'pink', 'yellow']
// CustomerTable component receives data and functions through props
export default function CustomerTable({
  customers,
  total = customers.length,
  onAdd,
  onEdit,
  onDelete,
  search,
  setSearch,
  status,
  setStatus
}) {
  const [requestedPage, setPage] = useState(1)
  const [menuId, setMenuId] = useState(null)

  const pageSize = 6
  const pages = Math.max(1, Math.ceil(customers.length / pageSize))
  const page = Math.min(requestedPage, pages)
  const visible = customers.slice((page - 1) * pageSize, page * pageSize)
  // Calculate the starting customer number
  // If there are no customers, display 0
  const from = customers.length ? (page - 1) * pageSize + 1 : 0
  const to = Math.min(page * pageSize, customers.length)    // Calculate the ending customer number

  // Display the customer table
  return (
    <section className="panel" id="customers">

      <div className="panel-heading">
        <div>
          <h2>All customers</h2>
          <p>Manage your customer relationships in one place.</p>
        </div>

        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={17} /> Add customer
        </button>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <Search size={17} />
          <input
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search customers..."
          />
        </div>

        <select
          className="filter-select"
          value={status}
          onChange={e => {
            setStatus(e.target.value)
            setPage(1)
          }}
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="Select all customers" /></th>
              <th>NAME</th>
              <th>STATUS</th>
              <th>PHONE NUMBER</th>
              <th>COMPANY</th>
              <th>DATE ADDED</th>
              <th> ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((c, i) => (
              <tr key={c.id}>

                <td>
                  <input type="checkbox" aria-label={`Select ${c.name}`} />
                </td>

                <td>
                  <div className="customer-cell">
                    <div className={`customer-avatar ${colors[(pageSize * (page - 1) + i) % colors.length]}`}>
                      {initials(c.name)}
                    </div>

                    <div className="customer-contact">
                      <strong>{c.name}</strong>
                      <small>
                        <Mail size={13} />
                        {c.email || 'No email'}
                      </small>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={`status-pill ${c.status.toLowerCase()}`}>
                    <i />{c.status}
                  </span>
                </td>

                <td>
                  <div className="contact-detail">
                    <Phone size={14} />
                    <span>{c.phone || 'No phone'}</span>
                  </div>
                </td>

                <td>
                  <div className="contact-detail company-detail">
                    <Building2 size={15} />
                    <span>{c.company || 'No company'}</span>
                  </div>
                </td>

                <td className="muted-cell">
                  {c.dateAdded
                    ? new Date(c.dateAdded + 'T00:00:00').toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                      )
                    : 'No date'}
                </td>

                <td className="actions-cell">
                  <div className="row-menu-wrap">
                    <button
                      className="icon-button row-menu"
                      onClick={() => setMenuId(menuId === c.id ? null : c.id)}
                      aria-label={`Actions for ${c.name}`}
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {menuId === c.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => {
                          onEdit(c)
                          setMenuId(null)
                        }}>
                          <Pencil size={14} /> Edit
                        </button>

                        <button
                          className="delete-action"
                          onClick={() => {
                            onDelete(c)
                            setMenuId(null)
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}

            {visible.length === 0 && (
              <tr>
                <td colSpan="7">
                  <div className="empty-state">
                    <Users size={26} />
                    <strong>No customers found</strong>
                    <span>Try changing your search or filters.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing <strong>{from}–{to}</strong> of <strong>{customers.length}</strong> customers
          {customers.length !== total && <> (filtered from {total})</>}
        </span>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span>Page {page} of {pages}</span>

          <button
            className="page-btn"
            disabled={page >= pages}
            onClick={() => setPage(p => p + 1)}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </section>
  )
}
