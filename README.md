# Nexus CRM Dashboard

A responsive Mini CRM Dashboard built with React, Vite, JavaScript, Tailwind CSS and browser LocalStorage.

## Features
- Dashboard summary: total, active and inactive customers
- Customer table with name/email/company search and status filter
- Add, edit and delete customers
- Form validation for required fields and email format
- LocalStorage persistence (data survives page refresh)
- Recently added customers and customer growth visualization
- Separate Dashboard and Customers pages switched from the sidebar
- Responsive sidebar and layout for mobile/tablet/desktop
- Initial mock customer records

## Requirements
- Node.js 18+ (recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

Live Demo

## Deploy (Cloudflare)
Live Application:https://oqulix--task-nexus-crm-dashboard.pages.dev/
## Project structure
```text
src/
  pages/            Page-level views
    Dashboard.jsx   Stats, customer growth chart and recently added list
    Customers.jsx   Search/status filtering and the customer table
  components/       Reusable UI components
  data/             Initial mock customer data
  App.jsx           Shared state, CRUD logic, page navigation and layout
  main.jsx          React entry point
  index.css         Tailwind directives and custom responsive styling
```

## Implementation notes
- `useState` manages customers, filters, modal state and UI feedback.
- `useEffect` persists the customer list to LocalStorage.
- `useMemo` derives the filtered customer list efficiently.
- Customer records use a unique numeric `id`; new customers get the current date.
- The initial mock data is used only when no saved LocalStorage data exists. To reset the demo, clear the `nexus-crm-customers` key in browser LocalStorage and refresh.

## Before submission
- Run `npm install` and `npm run build`.
- Test add, edit, delete, search, filters and refresh persistence.
- Replace the sample profile name/email if desired.
- Add your own GitHub repository and deployed URL to your submission message.
