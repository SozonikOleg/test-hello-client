import type { SVGProps } from 'react'

/** Stroke icons aligned with HelloClient reference (presentation only). */
const stroke: SVGProps<SVGSVGElement> = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconTrends() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
    </svg>
  )
}

export function IconTasks() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  )
}

export function IconTickets() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M4 9h16v6H4z" />
      <path d="M9 9v6M15 9v6" />
    </svg>
  )
}

export function IconPayments() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

export function IconClients() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="12" cy="10" r="3.5" />
      <path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" />
    </svg>
  )
}

export function IconInventory() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M4 7h16v12H4z" />
      <path d="M4 11h16M9 7V5h6v2" />
    </svg>
  )
}

export function IconShop() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
      <path d="M3 5h2l2.5 10h9L19 8H7" />
    </svg>
  )
}

export function IconReports() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M6 19V9M12 19V5M18 19v-7" />
    </svg>
  )
}

export function IconTender() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 3v18M5 8h14M7 12h10M9 16h6" />
    </svg>
  )
}

export function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function IconKnowledge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M5 5h12a2 2 0 0 1 2 2v10H7a2 2 0 0 0-2 2V5z" />
      <path d="M5 19h14" />
    </svg>
  )
}

export function IconCollapseSidebar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M11 6 5 12l6 6M19 6v12" />
    </svg>
  )
}

export function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  )
}

export function IconMore() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconExpand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M8 16V8h8M16 16l-6-6" />
    </svg>
  )
}

export function IconChevronTree() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function IconMoreMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  )
}
