
import { useEffect, useState } from 'react'
import { X, CalendarDays } from 'lucide-react'

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0]

// Initial empty form values
const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Active',
  dateAdded: today
}

export default function CustomerModal({
  open,
  customer,
  onClose,
  onSave
}) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(
        customer
          ? {
              name: customer.name || '',
              email: customer.email || '',
              phone: customer.phone || '',
              company: customer.company || '',
              status: customer.status || 'Active',
              dateAdded: customer.dateAdded || today
            }
          : { ...emptyForm, dateAdded: today }
      )

      setErrors({})
    }
  }, [open, customer])

  if (!open) return null

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()

    const next = {}
   // Validate customer name
    if (!form.name.trim()) {
      next.name = 'Please enter the customer name.'
    }
 // Validate email address using a regular expression
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
// Validate phone number
    if (!form.phone.trim()) {
      next.phone = 'Please enter a phone number.'
    }
 // Validate company name
    if (!form.company.trim()) {
      next.company = 'Please enter a company name.'
    }

    setErrors(next)

    if (Object.keys(next).length === 0) {
      onSave({
        ...form,
        dateAdded: customer?.dateAdded || today
      })
    }
  }
  // Display the customer modal UI
  return (
    <div
      className="modal-backdrop"
      onMouseDown={e =>
        e.target === e.currentTarget && onClose()
      }
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="modal-title">
              {customer ? 'Edit customer' : 'Add new customer'}
            </h2>

            <p>
              {customer
                ? 'Update customer information below.'
                : 'Add a new contact to your customer list.'}
            </p>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="form-grid">

            <label>
              Full name
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="e.g. Olivia Rhye"
              />
              {errors.name && (
                <small className="error">{errors.name}</small>
              )}
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="name@company.com"
              />
              {errors.email && (
                <small className="error">{errors.email}</small>
              )}
            </label>

            <label>
              Phone number
              <input
                name="phone"
                value={form.phone}
                onChange={update}
                placeholder="+91 9876543210"
              />
              {errors.phone && (
                <small className="error">{errors.phone}</small>
              )}
            </label>

            <label>
              Company name
              <input
                name="company"
                value={form.company}
                onChange={update}
                placeholder="Company Ltd."
              />
              {errors.company && (
                <small className="error">{errors.company}</small>
              )}
            </label>

            <label className="full-field">
              Status
              <select
                name="status"
                value={form.status}
                onChange={update}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <label className="full-field">
              <span className="date-label">
                <CalendarDays size={15} />
                Date added
              </span>

              <input
                type="date"
                name="dateAdded"
                value={form.dateAdded}
                readOnly
                className="today-date-input"
              />
              <small className="date-hint">
                Today's date is automatically added.
              </small>
            </label>

          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              type="submit"
            >
              {customer ? 'Save changes' : 'Add customer'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
