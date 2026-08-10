export function MobileFab({ label = 'The supplier' }: { label?: string }) {
  return (
    <button
      type="button"
      className="fixed right-4 z-40 flex items-center gap-2 rounded-2xl bg-[#1e293b] px-4 py-3 text-[14px] font-medium text-white shadow-lg bottom-[calc(5.25rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <span
        className="flex size-6 items-center justify-center rounded-full bg-white/15 text-lg leading-none"
        aria-hidden
      >
        +
      </span>
      {label}
    </button>
  )
}
