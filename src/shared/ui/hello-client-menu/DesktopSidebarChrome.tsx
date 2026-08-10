import type { ReactNode } from 'react'
import Menu from '@/shared/ui/menu'
import { IconCollapseSidebar } from '@/shared/ui/icons'
import { BrandMark } from './menuStyles'

/** Desktop shell: brand + toggle footer. `children` = `Menu.List` from integration layer. */
export function DesktopSidebarChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="px-6 pb-3 pt-6 group-data-[layout=sidebar-collapsed]/menu:flex group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:px-3">
        <BrandMark />
      </div>

      {children}

      <div className="mt-auto border-t border-[#eef0f4] px-3 py-3">
        <Menu.Toggle>
          {(props) => (
            <button
              type="button"
              className="flex w-full items-center justify-start rounded-lg p-2 text-[#6b7280] hover:bg-[#f5f7fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563eb] group-data-[layout=sidebar-collapsed]/menu:justify-center group-data-[layout=sidebar-collapsed]/menu:hover:bg-[#eef4ff] group-data-[layout=sidebar-collapsed]/menu:hover:text-[#2563eb]"
              aria-label={
                props['aria-expanded'] ? 'Collapse sidebar' : 'Expand sidebar'
              }
              {...props}
            >
              <span className={props['aria-expanded'] ? '' : 'rotate-180'}>
                <IconCollapseSidebar />
              </span>
            </button>
          )}
        </Menu.Toggle>
      </div>
    </div>
  )
}
