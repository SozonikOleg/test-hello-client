/**
 * Consumer layer: connect headless `Menu` to app-specific state (router, etc.).
 * Nothing here is imported from `shared/ui/menu` internals — only the public API.
 */
export { useMenuRouteState } from './model/useMenuRouteState'
export {
  RouterDesktopSidebar,
  RouterMobileBottomBar,
  RouterMobileOverflowMenu,
} from './ui/RouterMenuIntegration'
export { StateDrivenMenuExample } from './ui/StateDrivenMenu.example'
