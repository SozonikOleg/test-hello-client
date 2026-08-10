export function MobileEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 pb-24 pt-8 text-center md:hidden">
      <svg
        className="mb-6 h-36 w-36 text-[#1a1d26]/80"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M55 130 85 95l20 18 35-45 20 15"
        />
        <circle cx="130" cy="72" r="6" fill="currentColor" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M78 138h44M70 148h60"
        />
      </svg>
      <p className="text-[17px] font-medium text-[#1a1d26]">Here is empty</p>
    </div>
  )
}

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <MobileEmptyState />
      <p className="sr-only">{title}</p>
      <div className="hidden flex-1 items-center justify-center bg-[#fafbfc] p-8 text-center md:flex">
        <div>
          <p className="text-lg font-medium text-[#1a1d26]">{title}</p>
          <p className="mt-2 text-sm text-[#6b7280]">Empty section</p>
        </div>
      </div>
    </div>
  )
}
