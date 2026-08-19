/**
 * Business-level navigation — declarative menu markup only.
 * Router, active state, and styling live in `RouterMenu` (features/menu-router).
 */
import { RouterMenu } from '@/features/menu-router'
import {
  IconClients,
  IconInventory,
  IconKnowledge,
  IconPayments,
  IconReports,
  IconSettings,
  IconShop,
  IconTasks,
  IconTender,
  IconTickets,
  IconTrends,
} from '@/shared/ui/icons'

export function AppMenuNav() {
  return (
    <>
      <RouterMenu.Item label="Trends" to="/trends" icon={IconTrends} />
      <RouterMenu.Item label="Tasks" to="/tasks" icon={IconTasks} />
      <RouterMenu.Item label="Tickets" to="/tickets" icon={IconTickets} />
      <RouterMenu.Item label="Payments" to="/payments" icon={IconPayments} />
      <RouterMenu.Item label="Clients" to="/clients" icon={IconClients} />

      <RouterMenu.Group
        label="Inventory"
        icon={IconInventory}
        matchPrefix="/inventory"
      >
        <RouterMenu.Item label="Products" to="/inventory/products" />
        <RouterMenu.Item label="Orders" to="/inventory/orders" />
        <RouterMenu.Item label="Suppliers" to="/inventory/suppliers" />
      </RouterMenu.Group>

      <RouterMenu.Item label="Shop" to="/shop" icon={IconShop} />
      <RouterMenu.Item label="Reports" to="/reports" icon={IconReports} />

      <RouterMenu.Item
        label="Tender"
        to="/tender"
        icon={IconTender}
        mobile="overflow"
      />
      <RouterMenu.Item
        label="Settings"
        to="/settings"
        icon={IconSettings}
        mobile="overflow"
      />
      <RouterMenu.Item
        label="Knowledge Base"
        to="/knowledge"
        icon={IconKnowledge}
        mobile="overflow"
      />
    </>
  )
}
