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
  const matchPrefix = (prefix: string) => pathname.startsWith(prefix)

  return { pathname, match, matchPrefix }
}
