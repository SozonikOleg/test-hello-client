import { useState } from 'react'
import { HeadlessMenu } from '@/shared/ui/menu'
import { navItemClass, navIconClass } from '@/shared/ui/hello-client-menu'
import { IconTasks, IconTrends } from '@/shared/ui/icons'

type SectionId = 'trends' | 'tasks'

/**
 * HeadlessMenu without router — same compound API, `isActive` from local state.
 * Swap `useState` for `useMenuRouteState()` + `RouterMenu` when routing is needed.
 */
export function StateDrivenMenuExample() {
  const [active, setActive] = useState<SectionId>('trends')

  return (
    <div className="mx-auto max-w-md rounded-xl border border-[#e8ebf0] bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm text-[#6b7280]">
        HeadlessMenu (no router): current section is{' '}
        <strong className="text-[#1a1d26]">{active}</strong>
      </p>
      <HeadlessMenu aria-label="State-driven demo">
        <HeadlessMenu.Panel className="rounded-lg border border-[#eef0f4]">
          <HeadlessMenu.List className="flex flex-col gap-0.5 p-2">
            <HeadlessMenu.Item isActive={active === 'trends'}>
              {(props) => (
                <button
                  type="button"
                  className={navItemClass(props['data-active'])}
                  onClick={() => setActive('trends')}
                  aria-current={props['aria-current']}
                >
                  <span className={navIconClass(props['data-active'])}>
                    <IconTrends />
                  </span>
                  Trends
                </button>
              )}
            </HeadlessMenu.Item>
            <HeadlessMenu.Item isActive={active === 'tasks'}>
              {(props) => (
                <button
                  type="button"
                  className={navItemClass(props['data-active'])}
                  onClick={() => setActive('tasks')}
                  aria-current={props['aria-current']}
                >
                  <span className={navIconClass(props['data-active'])}>
                    <IconTasks />
                  </span>
                  Tasks
                </button>
              )}
            </HeadlessMenu.Item>
          </HeadlessMenu.List>
        </HeadlessMenu.Panel>
      </HeadlessMenu>
    </div>
  )
}
