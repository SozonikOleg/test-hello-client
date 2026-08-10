import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useMenuContext } from './context'

export interface MenuToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode | ((state: MenuToggleRenderProps) => ReactNode)
}

export interface MenuToggleRenderProps {
  'data-menu-toggle': ''
  'data-layout': string
  'aria-expanded': boolean
  'aria-controls': string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Collapses / expands the desktop sidebar. Hidden on mobile via consumer styles.
 * `aria-expanded` reflects whether labels are visible (inverse of icon-only mode).
 */
export function MenuToggle({ children, onClick, ...rest }: MenuToggleProps) {
  const { expanded, setExpanded, layout, navId } = useMenuContext('Menu.Toggle')

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded)
    onClick?.(event)
  }

  const toggleProps: MenuToggleRenderProps = {
    'data-menu-toggle': '',
    'data-layout': layout,
    'aria-expanded': expanded,
    'aria-controls': navId,
    onClick: handleClick,
  }

  if (typeof children === 'function') {
    return <>{children(toggleProps)}</>
  }

  return (
    <button type="button" {...toggleProps} {...rest} onClick={handleClick}>
      {children}
    </button>
  )
}
