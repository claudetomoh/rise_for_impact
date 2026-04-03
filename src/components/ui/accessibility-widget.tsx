'use client'

import { useState, useEffect, useCallback } from 'react'

interface A11ySettings {
  fontSize: number        // multiplier steps: -2 to +4
  highContrast: boolean
  dyslexiaFont: boolean
  textSpacing: boolean
  reduceMotion: boolean
  highlightLinks: boolean
  bigCursor: boolean
}

const DEFAULT_SETTINGS: A11ySettings = {
  fontSize: 0,
  highContrast: false,
  dyslexiaFont: false,
  textSpacing: false,
  reduceMotion: false,
  highlightLinks: false,
  bigCursor: false,
}

const STORAGE_KEY = 'rfi-a11y-settings'

function applySettings(settings: A11ySettings) {
  const html = document.documentElement

  // Font size — each step = 10% scaling on root
  const baseSize = 16
  const newSize = baseSize + settings.fontSize * 2
  html.style.fontSize = `${newSize}px`

  // Boolean feature classes
  html.classList.toggle('a11y-high-contrast', settings.highContrast)
  html.classList.toggle('a11y-dyslexia', settings.dyslexiaFont)
  html.classList.toggle('a11y-text-spacing', settings.textSpacing)
  html.classList.toggle('a11y-reduce-motion', settings.reduceMotion)
  html.classList.toggle('a11y-highlight-links', settings.highlightLinks)
  html.classList.toggle('a11y-big-cursor', settings.bigCursor)
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as A11ySettings
        setSettings(parsed)
        applySettings(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist + apply whenever settings change
  useEffect(() => {
    if (!mounted) return
    applySettings(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings, mounted])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggle = useCallback(<K extends keyof A11ySettings>(key: K) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const reset = useCallback(() => {
    const next = { ...DEFAULT_SETTINGS }
    setSettings(next)
    document.documentElement.style.fontSize = '16px'
    applySettings(next)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const isModified =
    settings.fontSize !== 0 ||
    settings.highContrast ||
    settings.dyslexiaFont ||
    settings.textSpacing ||
    settings.reduceMotion ||
    settings.highlightLinks ||
    settings.bigCursor

  if (!mounted) return null

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility settings"
        className={`
          fixed bottom-20 left-4 z-[9999] w-72
          rounded-2xl border border-white/10
          bg-dark-900/95 backdrop-blur-xl
          shadow-2xl shadow-black/40
          transition-all duration-300 ease-out
          ${open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">♿</span>
            <span className="font-semibold text-white text-sm tracking-wide">
              Accessibility
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isModified && (
              <button
                onClick={reset}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                aria-label="Reset all accessibility settings"
              >
                Reset all
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-dark-300 hover:text-white transition-colors"
              aria-label="Close accessibility menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Font size */}
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-xs font-medium text-dark-300 uppercase tracking-widest mb-3">
            Text Size
          </p>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setSettings(p => ({ ...p, fontSize: Math.max(-2, p.fontSize - 1) }))}
              disabled={settings.fontSize <= -2}
              className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-lg font-bold text-dark-200 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease text size"
            >
              A<span className="text-xs align-top">−</span>
            </button>

            {/* Steps indicator */}
            <div className="flex gap-1">
              {[-2, -1, 0, 1, 2, 3, 4].map(step => (
                <button
                  key={step}
                  onClick={() => setSettings(p => ({ ...p, fontSize: step }))}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    settings.fontSize === step
                      ? 'bg-emerald-400'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Text size ${step > 0 ? '+' : ''}${step * 2}px`}
                />
              ))}
            </div>

            <button
              onClick={() => setSettings(p => ({ ...p, fontSize: Math.min(4, p.fontSize + 1) }))}
              disabled={settings.fontSize >= 4}
              className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-lg font-bold text-dark-200 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Increase text size"
            >
              A<span className="text-sm align-top">+</span>
            </button>
          </div>
        </div>

        {/* Toggle options */}
        <div className="px-5 py-3 grid grid-cols-2 gap-2">
          <ToggleCard
            icon="🔆"
            label="High Contrast"
            active={settings.highContrast}
            onClick={() => toggle('highContrast')}
          />
          <ToggleCard
            icon="🔤"
            label="Dyslexia Font"
            active={settings.dyslexiaFont}
            onClick={() => toggle('dyslexiaFont')}
          />
          <ToggleCard
            icon="↔"
            label="Text Spacing"
            active={settings.textSpacing}
            onClick={() => toggle('textSpacing')}
          />
          <ToggleCard
            icon="⏸"
            label="Stop Animations"
            active={settings.reduceMotion}
            onClick={() => toggle('reduceMotion')}
          />
          <ToggleCard
            icon="🔗"
            label="Highlight Links"
            active={settings.highlightLinks}
            onClick={() => toggle('highlightLinks')}
          />
          <ToggleCard
            icon="🖱"
            label="Big Cursor"
            active={settings.bigCursor}
            onClick={() => toggle('bigCursor')}
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/8">
          <p className="text-xs text-dark-400 text-center">
            Settings saved automatically
          </p>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open accessibility menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Accessibility options"
        className={`
          fixed bottom-4 left-4 z-[9999]
          w-12 h-12 rounded-full
          flex items-center justify-center
          shadow-lg shadow-black/30
          transition-all duration-300
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
          ${open
            ? 'bg-emerald-500 scale-110 rotate-12'
            : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-110'
          }
          ${isModified ? 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-dark-950' : ''}
        `}
      >
        {/* Wheelchair / universal access icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
          aria-hidden="true"
        >
          <circle cx="12" cy="4" r="1.5" />
          <path d="M9 8.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5V13h2.5a1 1 0 0 1 0 2H15v1.5a4.5 4.5 0 1 1-6.93-3.79L7.5 10.5H9V8.5z" />
        </svg>
        {isModified && (
          <span
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-yellow-400 border border-dark-900"
            aria-label="Accessibility settings active"
          />
        )}
      </button>
    </>
  )
}

// ── Sub-component: individual toggle card ────────────────────────────────────
interface ToggleCardProps {
  icon: string
  label: string
  active: boolean
  onClick: () => void
}

function ToggleCard({ icon, label, active, onClick }: ToggleCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl
        border text-center transition-all duration-200 cursor-pointer
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400
        ${active
          ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
          : 'bg-white/5 border-white/8 text-dark-300 hover:bg-white/10 hover:text-white hover:border-white/20'
        }
      `}
    >
      <span className="text-xl leading-none" aria-hidden="true">{icon}</span>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </button>
  )
}
