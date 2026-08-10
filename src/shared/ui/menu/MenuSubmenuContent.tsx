import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { useMenuContext } from './context'
import { useSubmenuContext } from './context'

export interface MenuSubmenuContentProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
}

const FLYOUT_CLOSE_DELAY_MS = 280

/**
 * Container for nested Menu.Item nodes. Visibility is driven by layout:
 * inline accordion, desktop flyout (portaled above page), or mobile overlay.
 */
export function MenuSubmenuContent({
  children,
  style,
  ...rest
}: MenuSubmenuContentProps) {
  const menu = useMenuContext('Menu.SubmenuContent')
  const submenu = useSubmenuContext('Menu.SubmenuContent')
  const contentRef = useRef<HTMLUListElement>(null)
  const contentId = `${submenu.submenuId}-content`

  const presentation =
    menu.layout === 'sidebar-expanded'
      ? 'inline'
      : menu.layout === 'sidebar-collapsed'
        ? 'flyout'
        : 'mobile'

  // Consumers target `data-[presentation=inline|flyout|mobile]` for layout-specific CSS.
  const [flyoutPos, setFlyoutPos] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    if (presentation !== 'flyout' || !submenu.open || !submenu.triggerElement) {
      return
    }

    const updatePosition = () => {
      const rect = submenu.triggerElement!.getBoundingClientRect()
      setFlyoutPos({
        top: rect.top,
        left: rect.right + 8,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [presentation, submenu.open, submenu.triggerElement])

  // Close flyout on Escape and outside pointer down (collapsed desktop).
  useEffect(() => {
    if (!submenu.open || menu.layout !== 'sidebar-collapsed') return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menu.setFlyoutSubmenuId(null)
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const trigger = submenu.triggerElement
      if (contentRef.current?.contains(target)) return
      if (trigger?.contains(target)) return
      menu.setFlyoutSubmenuId(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [
    submenu.open,
    submenu.triggerElement,
    menu.layout,
    menu.setFlyoutSubmenuId,
  ])

  // Mobile overlay: same outside-click + escape behavior.
  useEffect(() => {
    if (!submenu.open || menu.layout !== 'mobile') return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menu.setMobileSubmenuId(null)
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const trigger = submenu.triggerElement
      if (contentRef.current?.contains(target)) return
      if (trigger?.contains(target)) return
      menu.setMobileSubmenuId(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [
    submenu.open,
    submenu.triggerElement,
    menu.layout,
    menu.setMobileSubmenuId,
  ])

  // Keep flyout open while pointer travels from trigger to portaled panel.
  useEffect(() => {
    if (menu.layout !== 'sidebar-collapsed' || !submenu.open) return

    const node = contentRef.current
    const trigger = submenu.triggerElement
    if (!node || !trigger) return

    let closeTimer: ReturnType<typeof setTimeout> | null = null

    const scheduleClose = () => {
      closeTimer = setTimeout(
        () => menu.setFlyoutSubmenuId(null),
        FLYOUT_CLOSE_DELAY_MS,
      )
    }

    const cancelClose = () => {
      if (closeTimer) clearTimeout(closeTimer)
    }

    node.addEventListener('mouseenter', cancelClose)
    node.addEventListener('mouseleave', scheduleClose)
    trigger.addEventListener('mouseleave', scheduleClose)
    trigger.addEventListener('mouseenter', cancelClose)

    return () => {
      cancelClose()
      node.removeEventListener('mouseenter', cancelClose)
      node.removeEventListener('mouseleave', scheduleClose)
      trigger.removeEventListener('mouseleave', scheduleClose)
      trigger.removeEventListener('mouseenter', cancelClose)
    }
  }, [
    menu.layout,
    menu.setFlyoutSubmenuId,
    submenu.open,
    submenu.triggerElement,
  ])

  if (!submenu.open && presentation !== 'inline') {
    return null
  }

  const flyoutStyle: CSSProperties | undefined =
    presentation === 'flyout'
      ? {
          position: 'fixed',
          top: flyoutPos.top,
          left: flyoutPos.left,
          zIndex: 60,
        }
      : undefined

  const list = (
    <ul
      ref={contentRef}
      id={contentId}
      data-menu-submenu-content=""
      data-layout={menu.layout}
      data-presentation={presentation}
      data-state={submenu.open ? 'open' : 'closed'}
      role="list"
      hidden={presentation === 'inline' && !submenu.open ? true : undefined}
      aria-labelledby={`${submenu.submenuId}-trigger`}
      style={{ ...flyoutStyle, ...style }}
      {...rest}
    >
      {children}
    </ul>
  )

  if (presentation === 'flyout' && submenu.open) {
    return createPortal(list, document.body)
  }

  return list
}
