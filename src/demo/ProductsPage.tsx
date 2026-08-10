import { useState } from 'react'
import {
  IconChevronTree,
  IconExpand,
  IconMore,
  IconSearch,
} from './icons'

function CategoriesTree({
  activeId,
  setActiveId,
}: {
  activeId: string
  setActiveId: (id: string) => void
}) {
  const [openDalys, setOpenDalys] = useState(true)
  const [openScreens, setOpenScreens] = useState(false)

  return (
    <ul className="space-y-0.5 text-[15px] text-[#3d4452]" role="list">
      <li>
        <button
          type="button"
          onClick={() => setActiveId('all')}
          className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left ${
            activeId === 'all'
              ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
              : 'hover:bg-[#f5f7fa]'
          }`}
        >
          All categories
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => setActiveId('1111')}
          className={`flex w-full items-center rounded-lg px-3 py-2.5 pl-8 text-left ${
            activeId === '1111'
              ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
              : 'hover:bg-[#f5f7fa]'
          }`}
        >
          1111
        </button>
      </li>
      <li>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label={openDalys ? 'Collapse Dalys' : 'Expand Dalys'}
            onClick={() => setOpenDalys((v) => !v)}
            className="rounded p-1 text-[#9aa3b2] hover:bg-[#f5f7fa]"
          >
            <span
              className={`inline-block transition-transform ${openDalys ? 'rotate-90' : ''}`}
            >
              <IconChevronTree />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveId('dalys')}
            className={`flex flex-1 items-center justify-between rounded-lg py-2 pr-2 text-left ${
              activeId === 'dalys'
                ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                : 'hover:bg-[#f5f7fa]'
            }`}
          >
            <span>Dalys</span>
            <IconMore />
          </button>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-0.5 pl-6">
          <button
            type="button"
            aria-label={openScreens ? 'Collapse Экраны' : 'Expand Экраны'}
            onClick={() => setOpenScreens((v) => !v)}
            className="rounded p-1 text-[#9aa3b2] hover:bg-[#f5f7fa]"
          >
            <span
              className={`inline-block transition-transform ${openScreens ? 'rotate-90' : ''}`}
            >
              <IconChevronTree />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveId('screens')}
            className={`flex flex-1 items-center justify-between rounded-lg py-2 pr-2 text-left ${
              activeId === 'screens'
                ? 'bg-[#eef4ff] font-medium text-[#2563eb]'
                : 'hover:bg-[#f5f7fa]'
            }`}
          >
            <span>Экраны</span>
            <IconMore />
          </button>
        </div>
      </li>
    </ul>
  )
}

export function ProductsCategoriesPanel({
  variant = 'desktop',
}: {
  variant?: 'desktop' | 'mobile-sheet'
}) {
  const [activeId, setActiveId] = useState('all')

  if (variant === 'mobile-sheet') {
    return (
      <div className="px-1 py-2">
        <CategoriesTree activeId={activeId} setActiveId={setActiveId} />
      </div>
    )
  }

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-[#e8ebf0] bg-white px-5 py-6 lg:block">
      <h2 className="mb-5 text-[22px] font-semibold leading-tight text-[#1a1d26]">
        Products and categories
      </h2>
      <CategoriesTree activeId={activeId} setActiveId={setActiveId} />
    </aside>
  )
}

export function ProductsTablePanel() {
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <div className="relative flex min-w-0 flex-1 flex-col bg-white md:bg-white">
      <div className="flex flex-col gap-3 border-b border-[#e8ebf0] px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-4">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setCategoriesOpen(true)}
            className="shrink-0 rounded-full border border-[#e2e6ee] bg-[#f8f9fb] px-3 py-1.5 text-[13px] font-medium text-[#2563eb]"
          >
            Categories
          </button>
          <span className="truncate text-[15px] font-semibold text-[#1a1d26]">
            Products
          </span>
        </div>
        <div className="relative max-w-md flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border border-[#e2e6ee] bg-[#f8f9fb] py-2.5 pl-10 pr-4 text-[15px] text-[#1a1d26] outline-none placeholder:text-[#9aa3b2] focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f5f7fa]"
            aria-label="Expand"
          >
            <IconExpand />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f5f7fa]"
            aria-label="More actions"
          >
            <IconMore />
          </button>
        </div>
      </div>

      <div className="overflow-auto px-4 py-4 md:px-6">
        <table className="w-full min-w-[280px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-[#e8ebf0] text-[#6b7280]">
              <th className="w-10 pb-3 font-normal">
                <input
                  type="checkbox"
                  className="size-4 rounded border-[#cfd5df]"
                  aria-label="Select all"
                />
              </th>
              <th className="pb-3 font-medium">SKU</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#f0f2f5] text-[#1a1d26]">
              <td className="py-3.5">
                <input
                  type="checkbox"
                  className="size-4 rounded border-[#cfd5df]"
                  aria-label="Select GBH 2-28 F"
                />
              </td>
              <td className="py-3.5">GBH 2-28 F</td>
            </tr>
          </tbody>
        </table>
      </div>

      {categoriesOpen ? (
        <>
          <button
            type="button"
            aria-label="Close categories"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setCategoriesOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[70dvh] overflow-y-auto rounded-t-2xl border border-[#e8ebf0] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-xl lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1a1d26]">
                Products and categories
              </h3>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm text-[#2563eb]"
                onClick={() => setCategoriesOpen(false)}
              >
                Done
              </button>
            </div>
            <ProductsCategoriesPanel variant="mobile-sheet" />
          </div>
        </>
      ) : null}
    </div>
  )
}
