export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-xl items-center px-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-wellbe-50"
            aria-hidden="true"
          >
            <svg
              className="h-6 w-6 text-wellbe-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <path d="M12 21V9" strokeLinecap="round" />
              <path d="M12 13c-4-1-6-3.5-6-7 4 0 6 2 6 7Z" />
              <path d="M12 16c4-1 6-3.5 6-7-4 0-6 2-6 7Z" />
              <path d="M12 9C10 5 11 3 13 2c2 3 1 5-1 7Z" />
            </svg>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-wellbe-900">
              Resource Centre
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}
