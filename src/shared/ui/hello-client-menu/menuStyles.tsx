import type { ReactNode } from 'react'

/**
 * Presentation helpers for HelloClient demo (Tailwind only).
 * Router / `isActive` wiring: `features/menu-router`.
 */

/** Labels hidden when `Menu.Panel` has `data-layout=sidebar-collapsed` (via `group/menu`). */
export function SidebarLabel({ children }: { children: ReactNode }) {
  return (
    <span className="truncate group-data-[layout=sidebar-collapsed]/menu:hidden">
      {children}
    </span>
  )
}

export function BrandMark() {
  return (
    <>
      <span
        className="hidden text-xl font-bold text-[#2563eb] group-data-[layout=sidebar-collapsed]/menu:inline"
        aria-hidden
      >
        H
      </span>
      <span className="text-[26px] font-bold leading-none text-[#2563eb] group-data-[layout=sidebar-collapsed]/menu:hidden">
        HelloClient
      </span>
    </>
  )
}

export function navItemClass(active: boolean, flyoutOpen = false) {
  const highlighted = active || flyoutOpen
  return [
    'group/nav flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] leading-none transition-colors',
    'group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:px-2',
    highlighted
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] hover:bg-[#f5f7fa] group-data-[layout=sidebar-collapsed]/menu:hover:bg-[#eef4ff] group-data-[layout=sidebar-collapsed]/menu:hover:font-medium group-data-[layout=sidebar-collapsed]/menu:hover:text-[#2563eb]',
  ].join(' ')
}

export function navIconClass(active: boolean, flyoutOpen = false) {
  const highlighted = active || flyoutOpen
  return [
    'shrink-0 transition-colors',
    highlighted
      ? 'text-[#2563eb]'
      : 'text-[#6b7280] group-data-[layout=sidebar-collapsed]/menu:group-hover/nav:text-[#2563eb]',
  ].join(' ')
}

export function subLinkClass(active: boolean) {
  return `flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-3 text-[15px] transition-colors ${
    active
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] hover:bg-[#f5f7fa]'
  }`
}

export function submenuTriggerClass(
  active: boolean,
  open: boolean,
  layout: string,
) {
  // Expanded sidebar: accordion `open` must not look like a flyout dropdown.
  const flyoutOpen = layout === 'sidebar-collapsed' && open
  return navItemClass(active, flyoutOpen)
}

export function submenuIconClass(active: boolean, open: boolean, layout: string) {
  const flyoutOpen = layout === 'sidebar-collapsed' && open
  return navIconClass(active, flyoutOpen)
}

export function SubDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`size-1.5 shrink-0 rounded-full ${
        active ? 'bg-[#2563eb]' : 'bg-[#c5cad3]'
      }`}
    />
  )
}

export function mobileSubLinkClass(active: boolean) {
  return `flex w-full items-center rounded-xl px-3 py-3 text-[15px] ${
    active
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] active:bg-[#f5f7fa]'
  }`
}
