/**
 * Headless menu — behavior and accessibility only.
 *
 * - No CSS/Tailwind here: consumers pass `className` on Panel, List, Item, etc.
 * - No router/storage: pass `isActive`, `expanded`, `open` from outside.
 * - Hooks/data: `useMenu()`, `data-layout`, `data-presentation` for styling.
 *
 * Styling (Tailwind): `shared/ui/hello-client-menu`, `shared/ui/mobile-shell`.
 * Router / localStorage: `features/menu-router`, `widgets/app-shell`.
 * Public path for reviewers: `src/menu/` re-exports this slice.
 */

import { Menu } from './Menu'
import { MenuPanel } from './MenuPanel'
import { MenuList } from './MenuList'
import { MenuItem } from './MenuItem'
import { MenuToggle } from './MenuToggle'
import { MenuSubmenu } from './MenuSubmenu'
import { MenuSubmenuTrigger } from './MenuSubmenuTrigger'
import { MenuSubmenuContent } from './MenuSubmenuContent'

export { Menu } from './Menu'
export { useMenu } from './context'
export type { MenuLayout, MenuContextValue } from './context'
export type { MenuProps } from './Menu'
export type { MenuItemProps, MenuItemRenderProps } from './MenuItem'
export type { MenuToggleProps, MenuToggleRenderProps } from './MenuToggle'
export type { MenuSubmenuProps } from './MenuSubmenu'
export type {
  MenuSubmenuTriggerProps,
  MenuSubmenuTriggerRenderProps,
} from './MenuSubmenuTrigger'
export type { MenuSubmenuContentProps } from './MenuSubmenuContent'

/** Compound component namespace (JSX-friendly API). */
const MenuCompound = Object.assign(Menu, {
  Panel: MenuPanel,
  List: MenuList,
  Item: MenuItem,
  Toggle: MenuToggle,
  Submenu: MenuSubmenu,
  SubmenuTrigger: MenuSubmenuTrigger,
  SubmenuContent: MenuSubmenuContent,
})

export default MenuCompound
