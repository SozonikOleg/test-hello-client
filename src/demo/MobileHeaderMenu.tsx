import { Link } from 'react-router-dom'
import Menu from '../menu'
import { IconKnowledge, IconMore, IconSettings, IconTender } from './icons'

type MatchRoute = (path: string) => boolean

interface MobileHeaderMenuProps {
  match: MatchRoute
  overflowActive: boolean
}

/** Secondary routes (Tender, Settings, KB) — header menu on mobile. */
export function MobileHeaderMenu({
  match,
  overflowActive,
}: MobileHeaderMenuProps) {
  return (
    <Menu.Submenu isActive={overflowActive}>
      <Menu.SubmenuTrigger>
        {(props) => (
          <button
            type="button"
            className={`rounded-lg p-2 ${overflowActive ? 'bg-[#eef4ff] text-[#2563eb]' : 'text-[#6b7280]'}`}
            aria-label="More sections"
            {...props}
          >
            <IconMore />
          </button>
        )}
      </Menu.SubmenuTrigger>
      <Menu.SubmenuContent className="fixed right-3 top-14 z-50 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-[#e8ebf0] bg-white p-2 shadow-xl">
        <Menu.Item isActive={match('/tender')}>
          {(props) => (
            <Link
              to="/tender"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconTender />
              Tender
            </Link>
          )}
        </Menu.Item>
        <Menu.Item isActive={match('/settings')}>
          {(props) => (
            <Link
              to="/settings"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconSettings />
              Settings
            </Link>
          )}
        </Menu.Item>
        <Menu.Item isActive={match('/knowledge')}>
          {(props) => (
            <Link
              to="/knowledge"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] ${
                props['data-active']
                  ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                  : 'text-[#3d4452]'
              }`}
              {...props}
            >
              <IconKnowledge />
              Knowledge Base
            </Link>
          )}
        </Menu.Item>
      </Menu.SubmenuContent>
    </Menu.Submenu>
  )
}
