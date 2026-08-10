import type { HTMLAttributes, ReactNode } from 'react'
import { useMenuContext } from './context'

export interface MenuListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
}

/** Vertical list in sidebar modes; horizontal row on mobile (styling is external). */
export function MenuList({ children, ...rest }: MenuListProps) {
  const { layout } = useMenuContext('Menu.List')

  return (
    <ul data-menu-list="" data-layout={layout} role="list" {...rest}>
      {children}
    </ul>
  )
}
