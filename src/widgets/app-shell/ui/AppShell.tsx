import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Menu, { useMenu } from '@/shared/ui/menu'
import {
  RouterDesktopSidebar,
  RouterMobileBottomBar,
  RouterMobileOverflowMenu,
  useMenuRouteState,
} from '@/features/menu-router'
import {
  MobileFab,
  MobileMainSurface,
  MobileMenuBackdrop,
  MobileSupplierHeader,
} from '@/shared/ui/mobile-shell'
import { ProductsCategoriesPanel } from '@/pages/products'

const EXPANDED_STORAGE_KEY = 'hello-client-menu-expanded'

/** Restores sidebar width preference; headless `Menu` still owns runtime expanded state. */
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

/**
 * Application shell: layout chrome and persistence.
 * Menu ↔ router wiring: `features/menu-router`. Shell: `widgets/app-shell`.
 */
function AppShellFrame({ children }: { children: ReactNode }) {
  const { pathname } = useMenuRouteState()
  const { isMobile, mobileSubmenuId, setMobileSubmenuId } = useMenu()

  // Close mobile branch overlay after navigation (integration components use `Link`).
  useEffect(() => {
    setMobileSubmenuId(null)
  }, [pathname, setMobileSubmenuId])

  // Page chrome driven by route — separate from menu highlight logic in integration/.
  const showCategories = pathname === '/inventory/products'
  const showMobileFab =
    isMobile &&
    (pathname.startsWith('/inventory/suppliers') || pathname === '/clients')

  return (
    <>
      <MobileMenuBackdrop
        open={isMobile && mobileSubmenuId !== null}
        onClose={() => setMobileSubmenuId(null)}
      />

      <div className="flex h-[100dvh] overflow-hidden bg-white text-[#1a1d26]">
        {isMobile ? (
          <Menu.Panel className="fixed inset-x-0 bottom-0 z-50 bg-white">
            <RouterMobileBottomBar />
          </Menu.Panel>
        ) : (
          <Menu.Panel className="group/menu flex h-full shrink-0 flex-col border-r border-[#e8ebf0] bg-white transition-[width] data-[layout=sidebar-expanded]:w-[272px] data-[layout=sidebar-collapsed]:w-[72px]">
            <RouterDesktopSidebar />
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
                <RouterMobileOverflowMenu />
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
      // Persist collapse toggle alongside router (external state pattern from the brief).
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
