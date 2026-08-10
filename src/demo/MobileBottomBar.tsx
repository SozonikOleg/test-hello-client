import { Link } from 'react-router-dom'
import Menu from '../menu'
import {
  IconClients,
  IconInventory,
  IconPayments,
  IconReports,
  IconShop,
  IconTasks,
  IconTickets,
  IconTrends,
} from './icons'
import { mobileTabClass, MobileTabIcon } from './mobileUi'

type MatchRoute = (path: string) => boolean

function mobileSubLinkClass(active: boolean) {
  return `flex w-full items-center rounded-xl px-3 py-3 text-[15px] ${
    active
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] active:bg-[#f5f7fa]'
  }`
}

interface MobileBottomBarProps {
  match: MatchRoute
  inventoryActive: boolean
}

/**
 * Mobile tab bar — 8 tabs, one active highlight (route-based only).
 */
export function MobileBottomBar({
  match,
  inventoryActive,
}: MobileBottomBarProps) {
  return (
    <Menu.List
      className="flex w-full items-end justify-between gap-0 px-0.5 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]"
      aria-label="Primary"
    >
      <Menu.Item isActive={match('/trends')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/trends"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconTrends />
              </MobileTabIcon>
              Trends
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Item isActive={match('/tasks')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/tasks"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconTasks />
              </MobileTabIcon>
              Tasks
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Item isActive={match('/tickets')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/tickets"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconTickets />
              </MobileTabIcon>
              Tickets
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Item isActive={match('/payments')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/payments"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconPayments />
              </MobileTabIcon>
              Payments
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Item isActive={match('/clients')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/clients"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconClients />
              </MobileTabIcon>
              Clients
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Submenu isActive={inventoryActive}>
        <Menu.SubmenuTrigger>
          {(props) => (
            <button
              type="button"
              className={mobileTabClass(inventoryActive)}
              aria-expanded={props['aria-expanded']}
              aria-controls={props['aria-controls']}
              id={props.id}
              ref={props.ref}
              onClick={props.onClick}
              onKeyDown={props.onKeyDown}
            >
              <MobileTabIcon active={inventoryActive}>
                <IconInventory />
              </MobileTabIcon>
              Inventory
            </button>
          )}
        </Menu.SubmenuTrigger>
        <Menu.SubmenuContent className="fixed inset-x-3 z-[60] flex flex-col gap-1 rounded-2xl border border-[#e8ebf0] bg-white p-2 shadow-xl bottom-[calc(4.85rem+env(safe-area-inset-bottom))]">
          <Menu.Item isActive={match('/inventory/products')}>
            {(props) => (
              <Link
                to="/inventory/products"
                className={mobileSubLinkClass(props['data-active'])}
                aria-current={props['aria-current']}
              >
                Products
              </Link>
            )}
          </Menu.Item>
          <Menu.Item isActive={match('/inventory/orders')}>
            {(props) => (
              <Link
                to="/inventory/orders"
                className={mobileSubLinkClass(props['data-active'])}
                aria-current={props['aria-current']}
              >
                Orders
              </Link>
            )}
          </Menu.Item>
          <Menu.Item isActive={match('/inventory/suppliers')}>
            {(props) => (
              <Link
                to="/inventory/suppliers"
                className={mobileSubLinkClass(props['data-active'])}
                aria-current={props['aria-current']}
              >
                Suppliers
              </Link>
            )}
          </Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>

      <Menu.Item isActive={match('/shop')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/shop"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconShop />
              </MobileTabIcon>
              Shop
            </Link>
          )
        }}
      </Menu.Item>

      <Menu.Item isActive={match('/reports')}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to="/reports"
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              <MobileTabIcon active={active}>
                <IconReports />
              </MobileTabIcon>
              Reports
            </Link>
          )
        }}
      </Menu.Item>
    </Menu.List>
  )
}
