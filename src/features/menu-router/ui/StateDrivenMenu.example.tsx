import { useState } from 'react'
import Menu from '@/shared/ui/menu'
import { navItemClass, navIconClass } from '@/shared/ui/hello-client-menu'
import { IconTasks, IconTrends } from '@/shared/ui/icons'

type SectionId = 'trends' | 'tasks'

/**
 * Minimal second consumer: same compound components, `isActive` from `useState`.
 * Replace `setActive` with `useMenuRouteState().match` to switch to React Router.
 */
export function StateDrivenMenuExample() {
  const [active, setActive] = useState<SectionId>('trends')

  return (
    <div className="mx-auto max-w-md rounded-xl border border-[#e8ebf0] bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm text-[#6b7280]">
        Consumer-driven state (no router): current section is{' '}
        <strong className="text-[#1a1d26]">{active}</strong>
      </p>
      <Menu aria-label="State-driven demo">
        <Menu.Panel className="rounded-lg border border-[#eef0f4]">
          <Menu.List className="flex flex-col gap-0.5 p-2">
            <Menu.Item isActive={active === 'trends'}>
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
            </Menu.Item>
            <Menu.Item isActive={active === 'tasks'}>
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
            </Menu.Item>
          </Menu.List>
        </Menu.Panel>
      </Menu>
    </div>
  )
}
