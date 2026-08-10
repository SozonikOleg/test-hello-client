import {
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { mergeProps } from './mergeProps'
import { useMenuContext } from './context'
import { useSubmenuContext } from './context'

export interface MenuSubmenuTriggerProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode | ((props: MenuSubmenuTriggerRenderProps) => ReactNode)
}

export interface MenuSubmenuTriggerRenderProps {
  'data-menu-submenu-trigger': ''
  'data-active': boolean
  'data-layout': string
  'data-open': boolean
  id: string
  'aria-expanded': boolean
  'aria-controls': string
  onClick: (event: MouseEvent<HTMLElement>) => void
  onMouseEnter: (event: MouseEvent<HTMLElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  ref: (node: HTMLElement | null) => void
}

/**
 * Opens/closes nested items. In collapsed sidebar, also opens the flyout on hover.
 */
export function MenuSubmenuTrigger({
  children,
  onClick,
  onMouseEnter,
  onKeyDown,
  ...rest
}: MenuSubmenuTriggerProps) {
  const menu = useMenuContext('Menu.SubmenuTrigger')
  const submenu = useSubmenuContext('Menu.SubmenuTrigger')
  const contentId = `${submenu.submenuId}-content`

  const setRef = (node: HTMLElement | null) => {
    submenu.setTriggerElement(node)
  }

  const openFlyout = () => {
    if (menu.layout === 'sidebar-collapsed') {
      menu.setFlyoutSubmenuId(submenu.submenuId)
    }
  }

  const toggle = (event: MouseEvent<HTMLElement>) => {
    if (menu.layout === 'sidebar-expanded') {
      submenu.setOpen(!submenu.open)
    } else if (menu.layout === 'sidebar-collapsed') {
      menu.setFlyoutSubmenuId(submenu.open ? null : submenu.submenuId)
    } else {
      submenu.setOpen(!submenu.open)
    }
    onClick?.(event)
  }

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    // Hover opens flyout only when the sidebar is icon-only (collapsed desktop).
    if (menu.layout === 'sidebar-collapsed') {
      openFlyout()
    }
    onMouseEnter?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle(event as unknown as MouseEvent<HTMLElement>)
    }
    if (event.key === 'Escape' && submenu.open) {
      submenu.setOpen(false)
    }
    onKeyDown?.(event)
  }

  const triggerProps: MenuSubmenuTriggerRenderProps = {
    'data-menu-submenu-trigger': '',
    'data-active': submenu.isActive,
    'data-layout': menu.layout,
    'data-open': submenu.open,
    id: `${submenu.submenuId}-trigger`,
    'aria-expanded': submenu.open,
    'aria-controls': contentId,
    onClick: toggle,
    onMouseEnter: handleMouseEnter,
    onKeyDown: handleKeyDown,
    ref: setRef,
  }

  if (typeof children === 'function') {
    return <>{children(triggerProps)}</>
  }

  if (isValidElement(children)) {
    return cloneElement(
      children as ReactElement<HTMLAttributes<HTMLElement>>,
      mergeProps(
        {
          ...triggerProps,
          ref: setRef,
        } as HTMLAttributes<HTMLElement>,
        (children as ReactElement<HTMLAttributes<HTMLElement>>).props,
      ),
    )
  }

  return (
    <button type="button" {...triggerProps} {...rest}>
      {children}
    </button>
  )
}
