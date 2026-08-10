import { createContext, useContext } from 'react'

export type MenuLayout = 'sidebar-expanded' | 'sidebar-collapsed' | 'mobile'

export interface MenuContextValue {
  /** Sidebar shows labels (true) or icons-only (false). Ignored on mobile. */
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  /** Viewport is below mobileBreakpoint. */
  isMobile: boolean
  /** Derived layout mode for styling hooks. */
  layout: MenuLayout
  /** Id of submenu flyout open in collapsed desktop mode (null = none). */
  flyoutSubmenuId: string | null
  setFlyoutSubmenuId: (id: string | null) => void
  /** Mobile: id of submenu sheet/popover open after tapping a branch. */
  mobileSubmenuId: string | null
  setMobileSubmenuId: (id: string | null) => void
  /** Stable id for aria-labelledby on the root nav. */
  navId: string
  generateSubmenuId: () => string
  ariaLabel: string
}

export const MenuContext = createContext<MenuContextValue | null>(null)

export function useMenuContext(component: string): MenuContextValue {
  const ctx = useContext(MenuContext)
  if (!ctx) {
    throw new Error(`${component} must be used within <Menu>`)
  }
  return ctx
}

/** Optional hook for styled consumers (toggle UI, custom chrome). */
export function useMenu(): MenuContextValue {
  return useMenuContext('useMenu')
}

export interface SubmenuContextValue {
  submenuId: string
  /** Branch is active (e.g. current route is under this section). */
  isActive: boolean
  /** Submenu panel is visible (inline accordion, flyout, or mobile overlay). */
  open: boolean
  setOpen: (open: boolean) => void
  /** Trigger element ref for flyout positioning (consumer may read via callback). */
  triggerElement: HTMLElement | null
  setTriggerElement: (el: HTMLElement | null) => void
}

export const SubmenuContext = createContext<SubmenuContextValue | null>(null)

export function useSubmenuContext(component: string): SubmenuContextValue {
  const ctx = useContext(SubmenuContext)
  if (!ctx) {
    throw new Error(`${component} must be used within <Menu.Submenu>`)
  }
  return ctx
}
