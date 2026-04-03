'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

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
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

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

  // Close on Escape or click outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClickOutside = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

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
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Accessibility settings"
        ref={panelRef}
        className={`
          fixed bottom-24 left-5 z-[9999] w-72
          max-h-[min(520px,calc(100vh-120px))] flex flex-col
          rounded-2xl border border-white/10
          bg-dark-900/97 backdrop-blur-xl
          shadow-2xl shadow-black/50
          transition-all duration-300 ease-out
          ${open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
      >
        {/* Header — always visible */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/10">
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
                Reset
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-bold"
              aria-label="Close accessibility menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
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
      </div>

      {/* Floating trigger button */}
      <div className="fixed bottom-5 left-5 z-[9999] flex flex-col items-center gap-1">
        {/* Label tag */}
        {!open && (
          <span className="text-[10px] font-semibold tracking-widest uppercase text-white bg-dark-800/90 px-2 py-0.5 rounded-full border border-white/20 select-none">
            Accessibility
          </span>
        )}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Open accessibility menu"
          aria-expanded={open}
          ref={triggerRef}
          aria-haspopup="dialog"
          title="Accessibility options"
          className={`
            relative w-14 h-14 rounded-full
            flex items-center justify-center
            shadow-[0_4px_20px_rgba(0,0,0,0.45)]
            transition-all duration-300
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white
            ${open
              ? 'scale-105 rotate-12'
              : 'hover:scale-105'
            }
            ${isModified ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''}
          `}
          style={{ background: open ? '#1a56ff' : '#0047CC' }}
        >
          {/* Accessibility icon — blue circle with dynamic white figure (matches ISA standard) */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            aria-hidden="true"
          >
            {/* Blue circle background */}
            <circle cx="50" cy="50" r="50" fill={open ? '#1a56ff' : '#0047CC'} />
            {/* Head */}
            <circle cx="50" cy="22" r="8" fill="white" />
            {/* Body leaning forward */}
            <path
              d="M50 32 L44 55 L32 70 M50 32 L58 50 L72 48"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Arm raised forward */}
            <path
              d="M56 40 L70 32"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Leg forward */}
            <path
              d="M44 55 L36 72 L46 78"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Wheelchair wheel */}
            <circle cx="62" cy="74" r="13" stroke="white" strokeWidth="5" fill="none" />
            {/* Wheel spokes */}
            <line x1="62" y1="61" x2="62" y2="87" stroke="white" strokeWidth="3" />
            <line x1="49" y1="74" x2="75" y2="74" stroke="white" strokeWidth="3" />
          </svg>

          {isModified && (
            <span
              className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-yellow-400 border-2 border-white"
              aria-label="Accessibility settings active"
            />
          )}
        </button>
      </div>
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
