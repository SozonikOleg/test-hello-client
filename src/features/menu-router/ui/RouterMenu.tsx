/**
 * RouterMenu — product component over HeadlessMenu.
 *
 * Wraps headless primitives with React Router (`Link`, active path) and HelloClient styling.
 * Business layer only declares `label`, `to`, and optional `icon` — no render props or handlers.
 */
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import HeadlessMenu from '@/shared/ui/menu'
import {
  navIconClass,
  navItemClass,
  SidebarLabel,
  subLinkClass,
  submenuIconClass,
  submenuTriggerClass,
  SubDot,
  mobileSubLinkClass,
} from '@/shared/ui/hello-client-menu'
import { mobileTabClass, MobileTabIcon } from '@/shared/ui/mobile-shell'
import { IconMore } from '@/shared/ui/icons'
import { useMenuRouteState } from '../model/useMenuRouteState'

export type RouterMenuLayout = 'sidebar' | 'mobile-tabs' | 'mobile-overflow'

type RouterMenuMobilePlacement = 'tab' | 'overflow'

interface RouterMenuContextValue {
  layout: RouterMenuLayout
}

const RouterMenuContext = createContext<RouterMenuContextValue | null>(null)
const RouterMenuGroupContext = createContext(false)

function useRouterMenuContext() {
  const ctx = useContext(RouterMenuContext)
  if (!ctx) {
    throw new Error('RouterMenu components must be used within <RouterMenu>')
  }
  return ctx
}

function shouldRenderItem(
  layout: RouterMenuLayout,
  mobile: RouterMenuMobilePlacement,
) {
  if (layout === 'sidebar') return true
  if (layout === 'mobile-tabs') return mobile === 'tab'
  return mobile === 'overflow'
}

function extractItemPaths(children: ReactNode): string[] {
  const paths: string[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as { to?: string; children?: ReactNode }
    if (typeof props.to === 'string') paths.push(props.to)
    if (props.children) paths.push(...extractItemPaths(props.children))
  })
  return paths
}

const sidebarListClass =
  'flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-2'
const mobileTabsListClass =
  'flex w-full items-end justify-between gap-0 px-0.5 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]'
const submenuContentClass =
  'flex flex-col gap-0.5 data-[presentation=inline]:mt-1.5 data-[presentation=inline]:pl-12 data-[presentation=flyout]:min-w-[200px] data-[presentation=flyout]:rounded-xl data-[presentation=flyout]:border data-[presentation=flyout]:border-[#e8ebf0] data-[presentation=flyout]:bg-white data-[presentation=flyout]:p-2 data-[presentation=flyout]:shadow-lg data-[presentation=flyout]:[&_a:hover]:bg-[#eef4ff] data-[presentation=flyout]:[&_a:hover]:text-[#2563eb]'
const mobileSubmenuContentClass =
  'fixed inset-x-3 z-[60] flex flex-col gap-1 rounded-2xl border border-[#e8ebf0] bg-white p-2 shadow-xl bottom-[calc(4.85rem+env(safe-area-inset-bottom))]'
const mobileOverflowContentClass =
  'fixed right-3 top-14 z-50 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-[#e8ebf0] bg-white p-2 shadow-xl'

export interface RouterMenuProps {
  layout?: RouterMenuLayout
  className?: string
  children: ReactNode
  'aria-label'?: string
}

function RouterMenuRoot({
  layout = 'sidebar',
  className,
  children,
  'aria-label': ariaLabel,
}: RouterMenuProps) {
  const ctx = useMemo(() => ({ layout }), [layout])

  const listClass =
    layout === 'sidebar'
      ? sidebarListClass
      : layout === 'mobile-tabs'
        ? mobileTabsListClass
        : undefined

  if (layout === 'mobile-overflow') {
    return (
      <RouterMenuContext.Provider value={ctx}>
        <RouterMenuOverflowShell aria-label={ariaLabel}>
          {children}
        </RouterMenuOverflowShell>
      </RouterMenuContext.Provider>
    )
  }

  return (
    <RouterMenuContext.Provider value={ctx}>
      <HeadlessMenu.List
        className={className ?? listClass}
        aria-label={ariaLabel}
      >
        {children}
      </HeadlessMenu.List>
    </RouterMenuContext.Provider>
  )
}

function RouterMenuOverflowShell({
  children,
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  'aria-label'?: string
}) {
  const { pathname } = useMenuRouteState()
  const paths = extractItemPaths(children)
  const isActive = paths.some((path) => pathname === path)

  return (
    <HeadlessMenu.Submenu isActive={isActive}>
      <HeadlessMenu.SubmenuTrigger>
        {(props) => (
          <button
            type="button"
            className={`rounded-lg p-2 ${isActive ? 'bg-[#eef4ff] text-[#2563eb]' : 'text-[#6b7280]'}`}
            aria-label={ariaLabel ?? 'More sections'}
            {...props}
          >
            <IconMore />
          </button>
        )}
      </HeadlessMenu.SubmenuTrigger>
      <HeadlessMenu.SubmenuContent className={mobileOverflowContentClass}>
        {children}
      </HeadlessMenu.SubmenuContent>
    </HeadlessMenu.Submenu>
  )
}

export interface RouterMenuItemProps {
  label: string
  to: string
  icon?: ComponentType
  /** Mobile placement: primary bottom tabs (`tab`) or header overflow (`overflow`). Desktop always shows all items. */
  mobile?: RouterMenuMobilePlacement
}

function RouterMenuItem({
  label,
  to,
  icon: Icon,
  mobile = 'tab',
}: RouterMenuItemProps) {
  const { layout } = useRouterMenuContext()
  const nested = useContext(RouterMenuGroupContext)
  const { match } = useMenuRouteState()

  if (!shouldRenderItem(layout, mobile)) return null

  const isActive = match(to)

  if (layout === 'sidebar') {
    if (nested) {
      return (
        <HeadlessMenu.Item isActive={isActive}>
          {(props) => (
            <Link
              to={to}
              className={subLinkClass(props['data-active'])}
              {...props}
            >
              <SubDot active={props['data-active']} />
              {label}
            </Link>
          )}
        </HeadlessMenu.Item>
      )
    }

    return (
      <HeadlessMenu.Item isActive={isActive}>
        {(props) => (
          <Link
            to={to}
            className={navItemClass(props['data-active'])}
            {...props}
          >
            {Icon ? (
              <span className={navIconClass(props['data-active'])}>
                <Icon />
              </span>
            ) : null}
            <SidebarLabel>{label}</SidebarLabel>
          </Link>
        )}
      </HeadlessMenu.Item>
    )
  }

  if (layout === 'mobile-tabs') {
    if (nested) {
      return (
        <HeadlessMenu.Item isActive={isActive}>
          {(props) => (
            <Link
              to={to}
              className={mobileSubLinkClass(props['data-active'])}
              aria-current={props['aria-current']}
            >
              {label}
            </Link>
          )}
        </HeadlessMenu.Item>
      )
    }

    return (
      <HeadlessMenu.Item isActive={isActive}>
        {(props) => {
          const active = props['data-active']
          return (
            <Link
              to={to}
              className={mobileTabClass(active)}
              aria-current={props['aria-current']}
            >
              {Icon ? (
                <MobileTabIcon active={active}>
                  <Icon />
                </MobileTabIcon>
              ) : null}
              {label}
            </Link>
          )
        }}
      </HeadlessMenu.Item>
    )
  }

  // mobile-overflow — flat items inside the "More" submenu
  return (
    <HeadlessMenu.Item isActive={isActive}>
      {(props) => (
        <Link
          to={to}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
            props['data-active']
              ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
              : 'text-[#3d4452]'
          }`}
          {...props}
        >
          {Icon ? <Icon /> : null}
          {label}
        </Link>
      )}
    </HeadlessMenu.Item>
  )
}

export interface RouterMenuGroupProps {
  label: string
  icon?: ComponentType
  /** Prefix match for branch active state (e.g. `/inventory`). */
  matchPrefix: string
  mobile?: RouterMenuMobilePlacement
  children: ReactNode
}

function RouterMenuGroup({
  label,
  icon: Icon,
  matchPrefix,
  mobile = 'tab',
  children,
}: RouterMenuGroupProps) {
  const { layout } = useRouterMenuContext()
  const { matchPrefix: matchPathPrefix } = useMenuRouteState()

  if (!shouldRenderItem(layout, mobile)) return null

  const isActive = matchPathPrefix(matchPrefix)

  if (layout === 'sidebar') {
    return (
      <RouterMenuGroupContext.Provider value={true}>
        <HeadlessMenu.Submenu isActive={isActive}>
          <HeadlessMenu.SubmenuTrigger>
            {(props) => (
              <button
                type="button"
                className={`${submenuTriggerClass(props['data-active'], props['data-open'], props['data-layout'])} w-full`}
                onMouseEnter={props.onMouseEnter}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                aria-expanded={props['aria-expanded']}
                aria-controls={props['aria-controls']}
                id={props.id}
                ref={props.ref}
                data-menu-submenu-trigger=""
                data-active={props['data-active'] ? '' : undefined}
                data-layout={props['data-layout']}
                data-open={props['data-open'] ? '' : undefined}
              >
                {Icon ? (
                  <span
                    className={submenuIconClass(
                      props['data-active'],
                      props['data-open'],
                      props['data-layout'],
                    )}
                  >
                    <Icon />
                  </span>
                ) : null}
                <SidebarLabel>{label}</SidebarLabel>
              </button>
            )}
          </HeadlessMenu.SubmenuTrigger>
          <HeadlessMenu.SubmenuContent className={submenuContentClass}>
            {children}
          </HeadlessMenu.SubmenuContent>
        </HeadlessMenu.Submenu>
      </RouterMenuGroupContext.Provider>
    )
  }

  if (layout === 'mobile-tabs') {
    return (
      <RouterMenuGroupContext.Provider value={true}>
        <HeadlessMenu.Submenu isActive={isActive}>
          <HeadlessMenu.SubmenuTrigger>
            {(props) => (
              <button
                type="button"
                className={mobileTabClass(isActive)}
                aria-expanded={props['aria-expanded']}
                aria-controls={props['aria-controls']}
                id={props.id}
                ref={props.ref}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
              >
                {Icon ? (
                  <MobileTabIcon active={isActive}>
                    <Icon />
                  </MobileTabIcon>
                ) : null}
                {label}
              </button>
            )}
          </HeadlessMenu.SubmenuTrigger>
          <HeadlessMenu.SubmenuContent className={mobileSubmenuContentClass}>
            {children}
          </HeadlessMenu.SubmenuContent>
        </HeadlessMenu.Submenu>
      </RouterMenuGroupContext.Provider>
    )
  }

  return null
}

export const RouterMenu = Object.assign(RouterMenuRoot, {
  Item: RouterMenuItem,
  Group: RouterMenuGroup,
})
