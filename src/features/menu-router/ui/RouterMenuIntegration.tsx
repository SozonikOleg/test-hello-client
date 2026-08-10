/**
 * React Router ↔ headless Menu wiring (FSD: `features/menu-router`).
 *
 * - `shared/ui/menu` never imports `react-router-dom`.
 * - `Link`, paths, and `isActive` come from here (or `StateDrivenMenu.example.tsx` with `useState`).
 * - Tailwind class helpers: `shared/ui/hello-client-menu`.
 */
import { Link } from 'react-router-dom'
import Menu from '@/shared/ui/menu'
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
  IconMore,
} from '@/shared/ui/icons'
import {
  DesktopSidebarChrome,
  navIconClass,
  navItemClass,
  SidebarLabel,
  subLinkClass,
  submenuIconClass,
  submenuTriggerClass,
  SubDot,
  mobileSubLinkClass,
} from '@/shared/ui/hello-client-menu'
import { mobileTabClass, MobileTabIcon } from '@/shared/ui/mobile-shell'
import { useMenuRouteState } from '../model/useMenuRouteState'

// --- Desktop: full sidebar tree (React Router `Link` + consumer `isActive`) ---

export function RouterDesktopSidebar() {
  const { match, inventoryActive } = useMenuRouteState()

  return (
    <DesktopSidebarChrome>
      <Menu.List className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-2">
        <Menu.Item isActive={match('/trends')}>
          {(props) => (
            <Link
              to="/trends"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconTrends />
              </span>
              <SidebarLabel>Trends</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/tasks')}>
          {(props) => (
            <Link
              to="/tasks"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconTasks />
              </span>
              <SidebarLabel>Tasks</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/tickets')}>
          {(props) => (
            <Link
              to="/tickets"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconTickets />
              </span>
              <SidebarLabel>Tickets</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/payments')}>
          {(props) => (
            <Link
              to="/payments"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconPayments />
              </span>
              <SidebarLabel>Payments</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/clients')}>
          {(props) => (
            <Link
              to="/clients"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconClients />
              </span>
              <SidebarLabel>Clients</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Submenu isActive={inventoryActive}>
          <Menu.SubmenuTrigger>
            {(props) => (
              // Explicit trigger props (no `{...props}`) so desktop styles control flyout vs accordion.
              <button
                type="button"
                className={`${submenuTriggerClass(props['data-active'], props['data-open'], props['data-layout'])} w-full`}
                onMouseEnter={props.onMouseEnter}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                aria-expanded={props['aria-expanded']}
                aria-controls={props['aria-controls']}
                id={props.id}
                ref={props.ref}
                data-menu-submenu-trigger=""
                data-active={props['data-active'] ? '' : undefined}
                data-layout={props['data-layout']}
                data-open={props['data-open'] ? '' : undefined}
              >
                <span
                  className={submenuIconClass(
                    props['data-active'],
                    props['data-open'],
                    props['data-layout'],
                  )}
                >
                  <IconInventory />
                </span>
                <SidebarLabel>Inventory</SidebarLabel>
              </button>
            )}
          </Menu.SubmenuTrigger>

          <Menu.SubmenuContent className="flex flex-col gap-0.5 data-[presentation=inline]:mt-1.5 data-[presentation=inline]:pl-12 data-[presentation=flyout]:min-w-[200px] data-[presentation=flyout]:rounded-xl data-[presentation=flyout]:border data-[presentation=flyout]:border-[#e8ebf0] data-[presentation=flyout]:bg-white data-[presentation=flyout]:p-2 data-[presentation=flyout]:shadow-lg data-[presentation=flyout]:[&_a:hover]:bg-[#eef4ff] data-[presentation=flyout]:[&_a:hover]:text-[#2563eb]">
            <Menu.Item isActive={match('/inventory/products')}>
              {(props) => (
                <Link
                  to="/inventory/products"
                  className={subLinkClass(props['data-active'])}
                  {...props}
                >
                  <SubDot active={props['data-active']} />
                  Products
                </Link>
              )}
            </Menu.Item>
            <Menu.Item isActive={match('/inventory/orders')}>
              {(props) => (
                <Link
                  to="/inventory/orders"
                  className={subLinkClass(props['data-active'])}
                  {...props}
                >
                  <SubDot active={props['data-active']} />
                  Orders
                </Link>
              )}
            </Menu.Item>
            <Menu.Item isActive={match('/inventory/suppliers')}>
              {(props) => (
                <Link
                  to="/inventory/suppliers"
                  className={subLinkClass(props['data-active'])}
                  {...props}
                >
                  <SubDot active={props['data-active']} />
                  Suppliers
                </Link>
              )}
            </Menu.Item>
          </Menu.SubmenuContent>
        </Menu.Submenu>

        <Menu.Item isActive={match('/shop')}>
          {(props) => (
            <Link
              to="/shop"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconShop />
              </span>
              <SidebarLabel>Shop</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/reports')}>
          {(props) => (
            <Link
              to="/reports"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconReports />
              </span>
              <SidebarLabel>Reports</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/tender')}>
          {(props) => (
            <Link
              to="/tender"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconTender />
              </span>
              <SidebarLabel>Tender</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/settings')}>
          {(props) => (
            <Link
              to="/settings"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconSettings />
              </span>
              <SidebarLabel>Settings</SidebarLabel>
            </Link>
          )}
        </Menu.Item>

        <Menu.Item isActive={match('/knowledge')}>
          {(props) => (
            <Link
              to="/knowledge"
              className={navItemClass(props['data-active'])}
              {...props}
            >
              <span className={navIconClass(props['data-active'])}>
                <IconKnowledge />
              </span>
              <SidebarLabel>Knowledge Base</SidebarLabel>
            </Link>
          )}
        </Menu.Item>
      </Menu.List>
    </DesktopSidebarChrome>
  )
}

// --- Mobile: primary tabs (8 slots); only `aria-current` from Menu — avoids double highlight ---

export function RouterMobileBottomBar() {
  const { match, inventoryActive } = useMenuRouteState()

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

// --- Mobile: routes that do not fit the bottom bar (overflow menu) ---

export function RouterMobileOverflowMenu() {
  const { match, overflowActive } = useMenuRouteState()

  return (
    <Menu.Submenu isActive={overflowActive}>
      <Menu.SubmenuTrigger>
        {(props) => (
          <button
            type="button"
            className={`rounded-lg p-2 ${overflowActive ? 'bg-[#eef4ff] text-[#2563eb]' : 'text-[#6b7280]'}`}
            aria-label="More sections"
            {...props}
          >
            <IconMore />
          </button>
        )}
      </Menu.SubmenuTrigger>
      <Menu.SubmenuContent className="fixed right-3 top-14 z-50 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-[#e8ebf0] bg-white p-2 shadow-xl">
        <Menu.Item isActive={match('/tender')}>
          {(props) => (
            <Link
              to="/tender"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconTender />
              Tender
            </Link>
          )}
        </Menu.Item>
        <Menu.Item isActive={match('/settings')}>
          {(props) => (
            <Link
              to="/settings"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconSettings />
              Settings
            </Link>
          )}
        </Menu.Item>
        <Menu.Item isActive={match('/knowledge')}>
          {(props) => (
            <Link
              to="/knowledge"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconKnowledge />
              Knowledge Base
            </Link>
          )}
        </Menu.Item>
      </Menu.SubmenuContent>
    </Menu.Submenu>
  )
}
