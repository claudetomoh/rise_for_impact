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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-dark-300 leading-relaxed">{subtitle}</p>
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
      <label htmlFor={id} className="block text-sm font-semibold text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-dark-400">{hint}</p>}
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
    <div className="pt-4">
      <h3 className="text-base font-bold text-white border-b border-dark-700 pb-2">
        {title}
      </h3>
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
      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-dark-800 placeholder-dark-500 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
        error
          ? 'border-red-500/60 focus:ring-red-500/20'
          : 'border-dark-700 focus:ring-primary-500/30 focus:border-primary-500'
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
    <select
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-dark-800 focus:outline-none focus:ring-2 transition-colors ${
        error
          ? 'border-red-500/60 focus:ring-red-500/20'
          : 'border-dark-700 focus:ring-primary-500/30 focus:border-primary-500'
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
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium flex-1 ${
            value === opt.value
              ? 'border-primary-500 bg-primary-500/10 text-white'
              : 'border-dark-700 text-dark-400 hover:border-dark-600 hover:text-dark-200'
          }`}
        >
          <input
            type="radio"
            name={id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            required={required}
            className="accent-primary-500"
          />
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
      className={`w-full px-4 py-3 rounded-lg border text-sm text-white bg-dark-800 placeholder-dark-500 focus:outline-none focus:ring-2 transition-colors resize-none ${
        error
          ? 'border-red-500/60 focus:ring-red-500/20'
          : 'border-dark-700 focus:ring-primary-500/30 focus:border-primary-500'
      }`}
    />
  )
}
