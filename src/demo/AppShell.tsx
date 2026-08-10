import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Menu, { useMenu } from '../menu'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileBottomBar } from './MobileBottomBar'
import { MobileFab } from './MobileFab'
import { MobileHeaderMenu } from './MobileHeaderMenu'
import { MobileSupplierHeader } from './MobileSupplierHeader'
import { MobileMainSurface, MobileMenuBackdrop } from './mobileUi'
import { ProductsCategoriesPanel } from './ProductsPage'

const EXPANDED_STORAGE_KEY = 'hello-client-menu-expanded'

function readExpandedPreference(): boolean {
  try {
    const raw = localStorage.getItem(EXPANDED_STORAGE_KEY)
    if (raw === 'false') return false
    if (raw === 'true') return true
  } catch {
    /* private mode */
  }
  return true
}

function AppShellFrame({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const { isMobile, setMobileSubmenuId } = useMenu()

  useEffect(() => {
    setMobileSubmenuId(null)
  }, [pathname, setMobileSubmenuId])

  const match = (path: string) => pathname === path
  const inventoryActive = pathname.startsWith('/inventory')
  const showCategories = pathname === '/inventory/products'
  const overflowActive =
    match('/tender') || match('/settings') || match('/knowledge')
  const showMobileFab =
    isMobile &&
    (pathname.startsWith('/inventory/suppliers') || match('/clients'))

  return (
    <>
      <MobileMenuBackdrop />

      <div className="flex h-[100dvh] overflow-hidden bg-white text-[#1a1d26]">
        {isMobile ? (
          <Menu.Panel className="fixed inset-x-0 bottom-0 z-50 bg-white">
            <MobileBottomBar match={match} inventoryActive={inventoryActive} />
          </Menu.Panel>
        ) : (
          <Menu.Panel className="group/menu flex h-full shrink-0 flex-col border-r border-[#e8ebf0] bg-white transition-[width] data-[layout=sidebar-expanded]:w-[272px] data-[layout=sidebar-collapsed]:w-[72px]">
            <DesktopSidebar match={match} inventoryActive={inventoryActive} />
          </Menu.Panel>
        )}

        {showCategories && !isMobile ? (
          <ProductsCategoriesPanel variant="desktop" />
        ) : null}

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          {isMobile ? (
            <>
              <MobileSupplierHeader />
              <div className="absolute right-3 top-3 z-10">
                <MobileHeaderMenu
                  match={match}
                  overflowActive={overflowActive}
                />
              </div>
              {showMobileFab ? <MobileFab /> : null}
            </>
          ) : null}

          {isMobile ? (
            <MobileMainSurface>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                {children}
              </div>
            </MobileMainSurface>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {children}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Menu
      aria-label="HelloClient"
      defaultExpanded={readExpandedPreference()}
      onExpandedChange={(expanded) => {
        try {
          localStorage.setItem(EXPANDED_STORAGE_KEY, String(expanded))
        } catch {
          /* ignore */
        }
      }}
    >
      <AppShellFrame>{children}</AppShellFrame>
    </Menu>
  )
}
