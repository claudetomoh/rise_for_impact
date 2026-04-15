'use client'

import { ReactNode } from 'react'

interface FormStepLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/** Consistent header + card wrapper for each form step */
export default function FormStepLayout({ title, subtitle, children }: FormStepLayoutProps) {
  return (
    <div>
      {/* Step header */}
      <div className="mb-8 pb-6 border-b border-dark-800/60">
        <div className="flex items-center gap-3">
          <span className="block w-1 h-7 rounded-full bg-gradient-to-b from-primary-400 to-primary-600 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && (
          <p className="mt-2 text-sm text-dark-300 leading-relaxed ml-4">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">{children}</div>
    </div>
  )
}

/** Reusable text input */
export function FieldRow({
  id,
  label,
  required,
  children,
  hint,
  error,
}: {
  id: string
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-200 tracking-wide">
        {label}
        {required && <span className="text-primary-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-dark-500 italic">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/** Reusable section divider inside a step */
export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="pt-6 pb-1">
      <div className="flex items-center gap-2.5">
        <span className="block w-0.5 h-4 rounded-full bg-primary-500 flex-shrink-0" />
        <h3 className="text-xs font-bold text-dark-300 uppercase tracking-widest">{title}</h3>
      </div>
    </div>
  )
}

/** Standard text / email / tel / date input */
export function TextInput({
  id,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
  error,
  disabled,
}: {
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
  error?: string
  disabled?: boolean
}) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-dark-800/80 placeholder-dark-500/70 focus:outline-none focus:ring-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
        error
          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
          : 'border-dark-700/80 focus:ring-primary-500/25 focus:border-primary-500/60 hover:border-dark-600'
      }`}
    />
  )
}

/** Select dropdown */
export function SelectInput({
  id,
  value,
  onChange,
  options,
  required,
  placeholder,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm bg-dark-800/80 focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
          value ? 'text-white' : 'text-dark-500'
        } ${
          error
            ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
            : 'border-dark-700/80 focus:ring-primary-500/25 focus:border-primary-500/60 hover:border-dark-600'
        }`}
      >
        <option value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

/** Radio group (Yes / No and other two-option sets) */
export function RadioGroup({
  id,
  value,
  onChange,
  options,
  required,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3" role="radiogroup">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border cursor-pointer transition-all text-sm font-semibold flex-1 select-none ${
            value === opt.value
              ? 'border-primary-500/80 bg-primary-500/10 text-primary-300'
              : 'border-dark-700/80 text-dark-400 hover:border-dark-500 hover:text-dark-200 hover:bg-white/[0.03]'
          }`}
        >
          <input
            type="radio"
            name={id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            required={required}
            className="sr-only"
          />
          {value === opt.value && (
            <span className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
          )}
          {opt.label}
        </label>
      ))}
      {error && (
        <p className="text-xs text-red-500 w-full" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/** Short textarea (max 100 words style) */
export function ShortTextarea({
  id,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
  rows?: number
  error?: string
}) {
  return (
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-dark-800/80 placeholder-dark-500/70 focus:outline-none focus:ring-2 transition-all resize-none ${
        error
          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
          : 'border-dark-700/80 focus:ring-primary-500/25 focus:border-primary-500/60 hover:border-dark-600'
      }`}
    />
  )
}
