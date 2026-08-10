/** Mobile entity header (reference: supplier card). */
export function MobileSupplierHeader() {
  return (
    <header className="shrink-0 border-b border-[#e8ebf0] bg-white px-4 py-3 md:hidden">
      <div className="flex items-start gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1a1d26] text-[13px] font-semibold text-white"
          aria-hidden
        >
          ТП
        </div>
        <div className="min-w-0 flex-1 text-[13px] leading-snug text-[#3d4452]">
          <p className="font-medium text-[#1a1d26]">Тестовый Поставщик</p>
          <p>Леша</p>
          <p className="truncate text-[#6b7280]">+92 903 838 29</p>
          <a
            href="https://hello.ru"
            className="truncate text-[#2563eb] underline-offset-2 hover:underline"
          >
            https://hello.ru
          </a>
        </div>
      </div>
    </header>
  )
}
