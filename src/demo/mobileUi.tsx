import type { ReactNode } from 'react'
import { useMenu } from '../menu'

/** Dims content when a mobile branch menu is open. */
export function MobileMenuBackdrop() {
  const { layout, mobileSubmenuId, setMobileSubmenuId } = useMenu()

  if (layout !== 'mobile' || !mobileSubmenuId) return null

  return (
    <button
      type="button"
      aria-label="Close menu"
      className="fixed inset-0 z-40 bg-black/20"
      onClick={() => setMobileSubmenuId(null)}
    />
  )
}

export function mobileTabClass(active: boolean) {
  return [
    'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-0.5 py-2 text-[10px] leading-tight transition-colors',
    active
      ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
      : 'text-[#3d4452] hover:bg-[#f5f7fa] active:bg-[#eef4ff]',
  ].join(' ')
}

export function MobileTabIcon({
  active,
  children,
}: {
  active: boolean
  children: ReactNode
}) {
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center transition-colors ${
        active ? 'text-[#2563eb]' : 'text-[#1a1d26]'
      }`}
    >
      {children}
    </span>
  )
}

export function MobileMainSurface({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-white via-white to-[#e8ebf0] pb-[calc(4.85rem+env(safe-area-inset-bottom))] md:bg-white md:pb-0">
      {children}
    </div>
  )
}
