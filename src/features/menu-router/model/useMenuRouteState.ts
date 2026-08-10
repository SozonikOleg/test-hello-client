import { useLocation } from 'react-router-dom'

/**
 * Maps React Router location → props for headless `Menu.Item` / `Menu.Submenu`.
 * Keep in `features/` (or another consumer slice) — never inside `shared/ui/menu`.
 *
 * Example: `<Menu.Item isActive={match('/tasks')}>` with `<Link to="/tasks">`.
 * For local state instead of routes, see `StateDrivenMenu.example.tsx`.
 */
export function useMenuRouteState() {
  const { pathname } = useLocation()

  const match = (path: string) => pathname === path

  return {
    pathname,
    match,
    inventoryActive: pathname.startsWith('/inventory'),
    overflowActive:
      match('/tender') || match('/settings') || match('/knowledge'),
  }
}
