'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-emerald-500/40 text-dark-300 hover:text-white text-sm font-medium transition-all mt-6 print:hidden"
    >
      <Printer className="w-4 h-4" />
      Download / Print Report
    </button>
  )
}
