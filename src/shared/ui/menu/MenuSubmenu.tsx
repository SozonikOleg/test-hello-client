import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  SubmenuContext,
  useMenuContext,
} from './context'
import { useControllableState } from './useControllableState'

export interface MenuSubmenuProps {
  children: ReactNode
  /**
   * Branch active state from consumer (e.g. prefix match on pathname).
   * Keeps parent highlighted and submenu open in expanded mode.
   */
  isActive?: boolean
  /** Controlled open state for accordion / flyout (optional). */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Nested section: accordion (expanded desktop), flyout (collapsed), sheet (mobile).
 */
export function MenuSubmenu({
  children,
  isActive = false,
  open: openProp,
  defaultOpen,
  onOpenChange,
}: MenuSubmenuProps) {
  const menu = useMenuContext('Menu.Submenu')
  const submenuId = useRef<string | null>(null)
  if (submenuId.current === null) {
    submenuId.current = menu.generateSubmenuId()
  }
  const id = submenuId.current

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  const derivedDefaultOpen = defaultOpen ?? isActive

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: derivedDefaultOpen,
    onChange: onOpenChange,
  })

  // Active child routes force the branch open on desktop expanded layout.
  useEffect(() => {
    if (isActive && menu.layout === 'sidebar-expanded') {
      setOpen(true)
    }
  }, [isActive, menu.layout, setOpen])

  // Open state is layout-specific: accordion `open`, global flyout id, or mobile sheet id.
  const flyoutOpen =
    menu.layout === 'sidebar-collapsed' && menu.flyoutSubmenuId === id

  const mobileOpen = menu.layout === 'mobile' && menu.mobileSubmenuId === id

  const visible =
    menu.layout === 'sidebar-expanded'
      ? open
      : menu.layout === 'sidebar-collapsed'
        ? flyoutOpen
        : mobileOpen

  const setVisible = (next: boolean) => {
    if (menu.layout === 'sidebar-expanded') {
      setOpen(next)
      return
    }
    if (menu.layout === 'sidebar-collapsed') {
      menu.setFlyoutSubmenuId(next ? id : null)
      return
    }
    menu.setMobileSubmenuId(next ? id : null)
  }

  const submenuValue = useMemo(
    () => ({
      submenuId: id,
      isActive,
      open: visible,
      setOpen: setVisible,
      triggerElement,
      setTriggerElement,
    }),
    [id, isActive, visible, setVisible, triggerElement],
  )

  return (
    <SubmenuContext.Provider value={submenuValue}>
      <li
        data-menu-submenu=""
        data-active={isActive ? '' : undefined}
        data-layout={menu.layout}
        data-open={visible ? '' : undefined}
        role="none"
        onMouseEnter={() => {
          if (menu.layout === 'sidebar-collapsed') {
            menu.setFlyoutSubmenuId(id)
          }
        }}
      >
        {children}
      </li>
    </SubmenuContext.Provider>
  )
}
