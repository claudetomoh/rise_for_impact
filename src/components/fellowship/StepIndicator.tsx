'use client'

/**
 * StepIndicator — shows current progress through the multi-step application.
 */

const STEP_LABELS = [
  'Overview',
  'Personal',
  'Logistics',
  'Responses',
  'Essay 1',
  'Essay 2',
  'Pass It On',
  'Commitment',
  'Declaration',
]

interface StepIndicatorProps {
  currentStep: number  // 1-indexed
  totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact bar */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-dark-400">
            {STEP_LABELS[currentStep - 1]}
          </span>
        </div>
        <div className="w-full bg-dark-800 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-primary-500 transition-all duration-500"
            style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: step dots */}
      <div className="hidden sm:flex items-center gap-0 mb-8 overflow-x-auto pb-1">
        {STEP_LABELS.slice(0, totalSteps).map((label, idx) => {
          const step = idx + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep
          const isUpcoming = step > currentStep

          return (
            <div key={step} className="flex items-center flex-shrink-0">
              {/* Node */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary-500 text-white'
                      : isCurrent
                      ? 'bg-primary-500 text-white ring-4 ring-primary-500/20'
                      : 'bg-dark-800 text-dark-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium text-center max-w-[52px] leading-tight ${
                    isCurrent
                      ? 'text-white'
                      : isCompleted
                      ? 'text-primary-500'
                      : 'text-dark-500'
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {idx < totalSteps - 1 && (
                <div
                  className={`h-px w-6 mx-1 flex-shrink-0 transition-all duration-300 ${
                    step < currentStep ? 'bg-primary-500' : 'bg-dark-800'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
