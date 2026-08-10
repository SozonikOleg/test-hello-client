import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { MenuContext, type MenuLayout } from './context'
import { useControllableState } from './useControllableState'
import { useMediaQuery } from './useMediaQuery'

export interface MenuProps {
  children: ReactNode
  /** Controlled expanded (wide sidebar with labels). */
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Max width (px) treated as mobile layout. */
  mobileBreakpoint?: number
  /** Accessible name for the navigation landmark. */
  'aria-label'?: string
}

/**
 * Root provider: sidebar collapse state, mobile detection, flyout coordination.
 * No visual output — wrap layout chrome in Menu.Panel / Menu.List etc.
 */
export function Menu({
  children,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  mobileBreakpoint = 768,
  'aria-label': ariaLabel = 'Main',
}: MenuProps) {
  const navId = useId()
  const idRef = useRef(0)
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`)

  const [expanded, setExpanded] = useControllableState({
    prop: expandedProp,
    defaultProp: defaultExpanded,
    onChange: onExpandedChange,
  })

  const [flyoutSubmenuId, setFlyoutSubmenuId] = useControllableState<string | null>({
    defaultProp: null,
  })

  const [mobileSubmenuId, setMobileSubmenuId] = useControllableState<string | null>({
    defaultProp: null,
  })

  // Single source of truth for responsive behavior (see MenuPanel `data-layout`).
  const layout: MenuLayout = isMobile
    ? 'mobile'
    : expanded
      ? 'sidebar-expanded'
      : 'sidebar-collapsed'

  // Flyouts only exist in collapsed desktop mode — clear when leaving it.
  useEffect(() => {
    if (layout !== 'sidebar-collapsed') {
      setFlyoutSubmenuId(null)
    }
  }, [layout, setFlyoutSubmenuId])

  useEffect(() => {
    if (!isMobile) {
      setMobileSubmenuId(null)
    }
  }, [isMobile, setMobileSubmenuId])

  const generateSubmenuId = useCallback(() => {
    idRef.current += 1
    return `menu-submenu-${navId}-${idRef.current}`
  }, [navId])

  const value = useMemo(
    () => ({
      expanded,
      setExpanded,
      isMobile,
      layout,
      flyoutSubmenuId,
      setFlyoutSubmenuId,
      mobileSubmenuId,
      setMobileSubmenuId,
      navId,
      generateSubmenuId,
      ariaLabel,
    }),
    [
      expanded,
      setExpanded,
      isMobile,
      layout,
      flyoutSubmenuId,
      setFlyoutSubmenuId,
      mobileSubmenuId,
      setMobileSubmenuId,
      navId,
      generateSubmenuId,
      ariaLabel,
    ],
  )

  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  )
}
