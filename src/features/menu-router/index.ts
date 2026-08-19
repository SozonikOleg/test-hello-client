/**
 * Consumer layer: connect headless `HeadlessMenu` to app-specific state (router, styling).
 * Nothing here imports headless menu internals — only the public API.
 */
export { useMenuRouteState } from './model/useMenuRouteState'
export { RouterMenu } from './ui/RouterMenu'
export type {
  RouterMenuLayout,
  RouterMenuProps,
  RouterMenuItemProps,
  RouterMenuGroupProps,
} from './ui/RouterMenu'
export { StateDrivenMenuExample } from './ui/StateDrivenMenu.example'
