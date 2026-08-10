import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'
import { PlaceholderPage } from './PlaceholderPage'
import { ProductsRoutePage } from './ProductsRoutePage'

export function DemoApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/inventory/products" replace />}
      />
      <Route
        path="/*"
        element={
          <AppShell>
            <Routes>
              <Route path="trends" element={<PlaceholderPage title="Trends" />} />
              <Route path="tasks" element={<PlaceholderPage title="Tasks" />} />
              <Route path="tickets" element={<PlaceholderPage title="Tickets" />} />
              <Route path="payments" element={<PlaceholderPage title="Payments" />} />
              <Route path="clients" element={<PlaceholderPage title="Clients" />} />
              <Route
                path="inventory/products"
                element={<ProductsRoutePage />}
              />
              <Route
                path="inventory/orders"
                element={<PlaceholderPage title="Orders" />}
              />
              <Route
                path="inventory/suppliers"
                element={<PlaceholderPage title="Suppliers" />}
              />
              <Route path="shop" element={<PlaceholderPage title="Shop" />} />
              <Route path="reports" element={<PlaceholderPage title="Reports" />} />
              <Route path="tender" element={<PlaceholderPage title="Tender" />} />
              <Route path="settings" element={<PlaceholderPage title="Settings" />} />
              <Route
                path="knowledge"
                element={<PlaceholderPage title="Knowledge Base" />}
              />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  )
}
