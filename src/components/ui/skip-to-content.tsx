'use client'

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-semibold"
    >
      Skip to main content
    </a>
  )
}
