import {
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { mergeProps } from './mergeProps'
import { useMenuContext } from './context'

export interface MenuItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  children: ReactNode | ((props: MenuItemRenderProps) => ReactNode)
  /** Active item (route match, selected id, etc.) — supplied by the consumer. */
  isActive?: boolean
  /** When true on mobile, selecting closes an open branch overlay. */
  closeMobileSubmenuOnSelect?: boolean
}

export interface MenuItemRenderProps {
  'data-menu-item': ''
  'data-active': boolean
  'data-layout': string
  'aria-current': 'page' | undefined
  /** Collapsed sidebar: closes an open flyout so hover highlight moves cleanly. */
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void
}

/**
 * Leaf navigation entry. Pass `isActive` from router or any external store.
 * Use a render prop to attach props to `<Link>` / `<a>` without the menu knowing about routing.
 */
export function MenuItem({
  children,
  isActive = false,
  closeMobileSubmenuOnSelect = true,
  ...rest
}: MenuItemProps) {
  const { layout, setMobileSubmenuId, setFlyoutSubmenuId } =
    useMenuContext('Menu.Item')

  const handleMouseEnter = () => {
    if (layout === 'sidebar-collapsed') {
      setFlyoutSubmenuId(null)
    }
  }

  const itemProps: MenuItemRenderProps = {
    'data-menu-item': '',
    'data-active': isActive,
    'data-layout': layout,
    'aria-current': isActive ? 'page' : undefined,
    onMouseEnter: handleMouseEnter,
  }

  const domItemProps = {
    'data-menu-item': '',
    'data-active': isActive ? ('' as const) : undefined,
    'data-layout': layout,
    'aria-current': itemProps['aria-current'],
    onMouseEnter: handleMouseEnter,
  } satisfies Record<string, string | undefined | (() => void)>

  const handleSelect = () => {
    if (closeMobileSubmenuOnSelect) {
      setMobileSubmenuId(null)
    }
  }

  let content: ReactNode
  if (typeof children === 'function') {
    content = children(itemProps)
  } else if (isValidElement(children)) {
    content = cloneElement(
      children as ReactElement<HTMLAttributes<HTMLElement>>,
      mergeProps(
        domItemProps as HTMLAttributes<HTMLElement>,
        (children as ReactElement<HTMLAttributes<HTMLElement>>).props,
      ),
    )
  } else {
    content = <span {...domItemProps}>{children}</span>
  }

  return (
    <li
      data-menu-item-root=""
      data-active={isActive ? '' : undefined}
      data-layout={layout}
      role="none"
      onClick={handleSelect}
      {...rest}
    >
      {content}
    </li>
  )
}
