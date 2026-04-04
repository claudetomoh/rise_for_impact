'use client'

import { useCallback } from 'react'

interface WordCountTextareaProps {
  id: string
  label: string
  prompt?: string
  value: string
  onChange: (value: string) => void
  maxWords: number
  required?: boolean
  rows?: number
  placeholder?: string
  error?: string
}

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function WordCountTextarea({
  id,
  label,
  prompt,
  value,
  onChange,
  maxWords,
  required,
  rows = 8,
  placeholder,
  error,
}: WordCountTextareaProps) {
  const wordCount = countWords(value)
  const overLimit = wordCount > maxWords
  const remaining = maxWords - wordCount
  const pct = Math.min((wordCount / maxWords) * 100, 100)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Multi-line prompt rendered with line breaks */}
      {prompt && (
        <div className="bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg p-4">
          {prompt.split('\n').map((line, i) =>
            line.trim() === '' ? (
              <br key={i} />
            ) : (
              <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {line}
              </p>
            )
          )}
        </div>
      )}

      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        aria-describedby={`${id}-counter ${id}-error`}
        className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 dark:text-white bg-white dark:bg-dark-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 transition-colors resize-none ${
          overLimit
            ? 'border-red-400 focus:ring-red-400/30'
            : error
            ? 'border-red-400 focus:ring-red-400/30'
            : 'border-gray-300 dark:border-dark-700 focus:ring-primary-500/30 focus:border-primary-500'
        }`}
      />

      {/* Word count bar */}
      <div id={`${id}-counter`} className="space-y-1" aria-live="polite" aria-atomic="true">
        <div className="h-1 w-full bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              overLimit ? 'bg-red-500' : pct > 85 ? 'bg-amber-500' : 'bg-primary-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-medium ${
              overLimit ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {wordCount} / {maxWords} words
            {overLimit ? ` — ${-remaining} word${-remaining === 1 ? '' : 's'} over limit` : ''}
          </span>
          {!overLimit && remaining <= 30 && (
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              {remaining} word{remaining === 1 ? '' : 's'} remaining
            </span>
          )}
        </div>
      </div>

      {/* Validation error */}
      {(overLimit || error) && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {overLimit ? `Please reduce your response to ${maxWords} words or fewer.` : error}
        </p>
      )}
    </div>
  )
}
