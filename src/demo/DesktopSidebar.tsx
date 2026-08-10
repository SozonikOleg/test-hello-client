import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Menu, { useMenu } from '../menu'
import {
  IconClients,
  IconCollapseSidebar,
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
} from './icons'

type MatchRoute = (path: string) => boolean

function SidebarLabel({ children }: { children: ReactNode }) {
  const { layout } = useMenu()
  if (layout === 'sidebar-collapsed') return null
  return <span className="truncate">{children}</span>
}

function BrandMark() {
  const { layout } = useMenu()
  if (layout === 'sidebar-collapsed') {
    return (
      <span className="text-xl font-bold text-[#2563eb]" aria-hidden>
        H
      </span>
    )
  }
  return (
    <span className="text-[26px] font-bold leading-none text-[#2563eb]">
      HelloClient
    </span>
  )
}

function navItemClass(active: boolean, flyoutOpen = false) {
  const highlighted = active || flyoutOpen
  return [
    'group/nav flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] leading-none transition-colors',
    'group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:px-2',
    highlighted
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] hover:bg-[#f5f7fa] group-data-[layout=sidebar-collapsed]/menu:hover:bg-[#eef4ff] group-data-[layout=sidebar-collapsed]/menu:hover:font-medium group-data-[layout=sidebar-collapsed]/menu:hover:text-[#2563eb]',
  ].join(' ')
}

function navIconClass(active: boolean, flyoutOpen = false) {
  const highlighted = active || flyoutOpen
  return [
    'shrink-0 transition-colors',
    highlighted
      ? 'text-[#2563eb]'
      : 'text-[#6b7280] group-data-[layout=sidebar-collapsed]/menu:group-hover/nav:text-[#2563eb]',
  ].join(' ')
}

function subLinkClass(active: boolean) {
  return `flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-3 text-[15px] transition-colors ${
    active
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] hover:bg-[#f5f7fa]'
  }`
}

function submenuTriggerClass(
  active: boolean,
  open: boolean,
  layout: string,
) {
  // В развёрнутом меню — только inline-accordion, без «dropdown»-подсветки по open.
  const flyoutOpen = layout === 'sidebar-collapsed' && open
  return navItemClass(active, flyoutOpen)
}

function submenuIconClass(active: boolean, open: boolean, layout: string) {
  const flyoutOpen = layout === 'sidebar-collapsed' && open
  return navIconClass(active, flyoutOpen)
}

function SubDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`size-1.5 shrink-0 rounded-full ${
        active ? 'bg-[#2563eb]' : 'bg-[#c5cad3]'
      }`}
    />
  )
}

interface DesktopSidebarProps {
  match: MatchRoute
  inventoryActive: boolean
}

export function DesktopSidebar({ match, inventoryActive }: DesktopSidebarProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="px-6 pb-3 pt-6 group-data-[layout=sidebar-collapsed]/menu:flex group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:px-3">
        <BrandMark />
      </div>

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

          <Menu.SubmenuContent className="flex flex-col gap-0.5 data-[presentation=inline]:pl-9 data-[presentation=flyout]:min-w-[200px] data-[presentation=flyout]:rounded-xl data-[presentation=flyout]:border data-[presentation=flyout]:border-[#e8ebf0] data-[presentation=flyout]:bg-white data-[presentation=flyout]:p-2 data-[presentation=flyout]:shadow-lg data-[presentation=flyout]:[&_a:hover]:bg-[#eef4ff] data-[presentation=flyout]:[&_a:hover]:text-[#2563eb]">
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

      <div className="mt-auto border-t border-[#eef0f4] px-3 py-3">
        <Menu.Toggle>
          {(props) => (
            <button
              type="button"
              className="flex w-full items-center justify-start rounded-lg p-2 text-[#6b7280] hover:bg-[#f5f7fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563eb] group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:hover:bg-[#eef4ff] group-data-[layout=sidebar-collapsed]/menu:hover:text-[#2563eb]"
              aria-label={
                props['aria-expanded'] ? 'Collapse sidebar' : 'Expand sidebar'
              }
              {...props}
            >
              <span className={props['aria-expanded'] ? '' : 'rotate-180'}>
                <IconCollapseSidebar />
              </span>
            </button>
          )}
        </Menu.Toggle>
      </div>
    </div>
  )
}
