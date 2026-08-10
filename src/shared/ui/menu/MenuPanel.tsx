import type { HTMLAttributes, ReactNode } from 'react'
import { useMenuContext } from './context'

export interface MenuPanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

/**
 * Semantic shell: `<nav>` on desktop (sidebar), same landmark on mobile
 * (consumer usually positions it as a bottom bar).
 */
export function MenuPanel({ children, ...rest }: MenuPanelProps) {
  const { layout, navId, ariaLabel } = useMenuContext('Menu.Panel')

  return (
    <nav
      id={navId}
      aria-label={ariaLabel}
      data-menu-root=""
      data-layout={layout}
      {...rest}
    >
      {children}
    </nav>
  )
}
