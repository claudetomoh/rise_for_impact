'use client'

/**
 * /programs/fellowship/apply
 *
 * Multi-step fellowship application form.
 * Draft persistence: creates a DB record on step 1 submission, stores the cuid in
 * localStorage so the user can resume. All subsequent step saves are PUT requests.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

import StepIndicator from '@/components/fellowship/StepIndicator'
import WordCountTextarea from '@/components/fellowship/WordCountTextarea'
import FormStepLayout, {
  FieldRow,
  SectionHeading,
  TextInput,
  SelectInput,
  RadioGroup,
  ShortTextarea,
} from '@/components/fellowship/FormStepLayout'

import { EMPTY_FORM, ApplicationFormData } from '@/types/fellowship'
import { getActiveCohortConfig, getActiveCohortCopy } from '@/lib/fellowship-config'

const TOTAL_STEPS = 9
const DRAFT_STORAGE_KEY = 'rfi_fellowship_draft_id'
const COHORT_SLUG = 'cameroon-2026'

const cohortConfig = getActiveCohortConfig()
const copy = getActiveCohortCopy()

// ─── Word limits ──────────────────────────────────────────────────────────────
const WORD_LIMITS = {
  initiativeSummary: 100,
  ledInitiativeSummary: 100,
  essayLeadership: 200,
  essayCommunityProblem: 200,
  passItOnResponse: 150,
  contributionExplanation: 100,
}

function countWords(text: string) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

// ─── Step Validators ──────────────────────────────────────────────────────────

function validateStep(step: number, data: ApplicationFormData): string[] {
  const errs: string[] = []
  if (step === 2) {
    if (!data.fullName.trim()) errs.push('Full name is required.')
    if (!data.dateOfBirth) errs.push('Date of birth is required.')
    if (!data.email.trim()) errs.push('Email address is required.')
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.push('Please enter a valid email address.')
    if (!data.phone.trim()) errs.push('Phone / WhatsApp number is required.')
    if (!data.country.trim()) errs.push('Country is required.')
    if (!data.region.trim()) errs.push('Region is required.')
    if (!data.cityTown.trim()) errs.push('City / Town is required.')
    if (!data.currentStatus) errs.push('Please indicate what best describes you.')
  }
  if (step === 3) {
    if (!data.canAttendBuea) errs.push('Please confirm your availability for the in-person session.')
    if (!data.bueaAccommodationStatus) errs.push('Please select your accommodation situation.')
    if (!data.canCommitFourMonths) errs.push('Please confirm your mentorship commitment.')
  }
  if (step === 4) {
    if (!data.hasCurrentInitiative) errs.push('Please answer the initiative question.')
    if (data.hasCurrentInitiative === 'yes' && countWords(data.initiativeSummary) > WORD_LIMITS.initiativeSummary)
      errs.push('Initiative description exceeds 100-word limit.')
    if (!data.impactArea) errs.push('Please select your primary impact area.')
    if (!data.hasLedInitiative) errs.push('Please answer the leadership question.')
    if (data.hasLedInitiative === 'yes' && countWords(data.ledInitiativeSummary) > WORD_LIMITS.ledInitiativeSummary)
      errs.push('Leadership description exceeds 100-word limit.')
  }
  if (step === 5) {
    if (!data.essayLeadership.trim()) errs.push('Essay 1 response is required.')
    if (countWords(data.essayLeadership) > WORD_LIMITS.essayLeadership)
      errs.push('Essay 1 exceeds the 200-word limit.')
  }
  if (step === 6) {
    if (!data.essayCommunityProblem.trim()) errs.push('Essay 2 response is required.')
    if (countWords(data.essayCommunityProblem) > WORD_LIMITS.essayCommunityProblem)
      errs.push('Essay 2 exceeds the 200-word limit.')
  }
  if (step === 7) {
    if (!data.passItOnResponse.trim()) errs.push('Pass It On response is required.')
    if (countWords(data.passItOnResponse) > WORD_LIMITS.passItOnResponse)
      errs.push('Pass It On response exceeds the 150-word limit.')
  }
  if (step === 8) {
    if (!data.contributionWilling) errs.push('Please respond to the contribution question.')
  }
  if (step === 9) {
    if (!data.motivationOneSentence.trim()) errs.push('Motivation sentence is required.')
    if (!data.declareAttendBuea) errs.push('Please confirm all declarations.')
    if (!data.declareTransportAccom) errs.push('Please confirm all declarations.')
    if (!data.declareCommitProgram) errs.push('Please confirm all declarations.')
    if (!data.declareCompetitiveProc) errs.push('Please confirm all declarations.')
    if (!data.declareActiveParticip) errs.push('Please confirm all declarations.')
  }
  return errs
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FellowshipApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ApplicationFormData>(EMPTY_FORM)
  const [draftId, setDraftId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [stepErrors, setStepErrors] = useState<string[]>([])
  const [submitError, setSubmitError] = useState<string>('')
  const errorsRef = useRef<HTMLDivElement>(null)

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!savedId) return
    fetch(`/api/fellowship/applications/${savedId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || data.isSubmitted) return
        setDraftId(savedId)
        setStep(data.progressStep || 1)
        // Map DB booleans back to 'yes'/'no' strings for form
        setForm(mapDbToForm(data))
      })
      .catch(() => {})
  }, [])

  const field = useCallback(
    <K extends keyof ApplicationFormData>(key: K) =>
      (value: ApplicationFormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value })),
    []
  )

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Auto-save to API (create or update)
  const saveDraft = useCallback(
    async (data: ApplicationFormData, currentStep: number): Promise<string | null> => {
      setIsSaving(true)
      setSaveStatus('idle')
      try {
        const payload = mapFormToApi(data, currentStep)

        if (!draftId) {
          // First time — create draft
          const res = await fetch('/api/fellowship/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, cohortSlug: COHORT_SLUG }),
          })
          if (!res.ok) throw new Error('Failed to create draft')
          const created = await res.json()
          localStorage.setItem(DRAFT_STORAGE_KEY, created.id)
          setDraftId(created.id)
          setSaveStatus('saved')
          return created.id
        } else {
          const res = await fetch(`/api/fellowship/applications/${draftId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (!res.ok) throw new Error('Failed to update draft')
          setSaveStatus('saved')
          return draftId
        }
      } catch {
        setSaveStatus('error')
        return draftId
      } finally {
        setIsSaving(false)
        setTimeout(() => setSaveStatus('idle'), 3000)
      }
    },
    [draftId]
  )

  const handleNext = async () => {
    const errs = validateStep(step, form)
    if (errs.length > 0) {
      setStepErrors(errs)
      setTimeout(() => errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
      return
    }
    setStepErrors([])
    const id = await saveDraft(form, step + 1)
    if (!id && step > 1) return  // save failed, block
    setStep((s) => s + 1)
    scrollToTop()
  }

  const handleBack = () => {
    setStepErrors([])
    setStep((s) => s - 1)
    scrollToTop()
  }

  const handleManualSave = async () => {
    await saveDraft(form, step)
  }

  const handleSubmit = async () => {
    const errs = validateStep(9, form)
    if (errs.length > 0) {
      setStepErrors(errs)
      return
    }
    setStepErrors([])
    setIsSubmitting(true)
    setSubmitError('')

    // Save final step data first
    const id = await saveDraft(form, 9)
    if (!id) {
      setIsSubmitting(false)
      setSubmitError('Failed to save your application. Please try again.')
      return
    }

    try {
      const res = await fetch(`/api/fellowship/applications/${id}/submit`, { method: 'POST' })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Submission failed')
      }
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      router.push('/programs/fellowship/confirmation')
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  // Coming Soon gate — applications open April 15, 2026
  const APP_OPEN_DATE = new Date('2026-04-15T00:00:00Z')
  const isApplicationOpen = new Date() >= APP_OPEN_DATE

  if (!isApplicationOpen) {
    return (
      <div className="min-h-screen bg-dark-950">
        {/* Branded header */}
        <header className="sticky top-0 z-30 bg-dark-950/90 backdrop-blur-sm border-b border-white/8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/programs/fellowship" className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back to Fellowship</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.jpeg" alt="Rise for Impact" width={28} height={28} className="rounded-full" />
              <span className="text-sm font-semibold text-white hidden sm:block">Rise for Impact</span>
            </Link>
            <div className="w-24" />
          </div>
        </header>
        <main className="flex items-center justify-center min-h-[calc(100vh-56px)] px-4 py-16">
          <div className="text-center max-w-xl mx-auto">
            <div className="mb-8">
              <Image src="/images/logo.jpeg" alt="Rise for Impact" width={72} height={72} className="rounded-2xl mx-auto shadow-xl shadow-black/40" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-semibold text-yellow-400 tracking-widest uppercase">Applications not yet open</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Coming Soon</h1>
            <p className="text-dark-200 leading-relaxed mb-3">
              Applications for <span className="text-white font-semibold">Rise for Impact Fellowship — Cohort 1 (Cameroon)</span> open on
            </p>
            <div className="inline-block px-8 py-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 mb-8">
              <p className="text-2xl font-bold text-yellow-300">April 15, 2026</p>
            </div>
            <p className="text-sm text-dark-400 mb-10 max-w-sm mx-auto">
              Check back on the opening date to submit your application. In the meantime, explore what the fellowship involves.
            </p>
            <Link
              href="/programs/fellowship"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-dark-950 font-semibold transition-colors text-sm"
            >
              Explore the Fellowship <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Branded header */}
      <header className="sticky top-0 z-30 bg-dark-950/90 backdrop-blur-sm border-b border-white/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/programs/fellowship"
            className="text-sm text-dark-400 hover:text-white flex items-center gap-1 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Fellowship
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.jpeg" alt="Rise for Impact" width={28} height={28} className="rounded-full" />
            <span className="text-sm font-semibold text-white hidden sm:block">Rise for Impact</span>
          </Link>
          {/* Save status indicator */}
          {step > 1 ? (
            <button
              onClick={handleManualSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : saveStatus === 'saved' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              ) : saveStatus === 'error' ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save failed' : 'Save'}
            </button>
          ) : (
            <div className="w-14" />
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        {/* Step errors */}
        {stepErrors.length > 0 && (
          <div
            ref={errorsRef}
            className="mb-6 bg-red-900/20 border border-red-800/60 rounded-lg p-4"
            role="alert"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-400 mb-1">
                  Please fix the following before continuing:
                </p>
                <ul className="text-sm text-red-300 space-y-0.5 list-disc list-inside">
                  {stepErrors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step panels */}
        <div className="bg-dark-900 rounded-2xl border border-dark-800 p-6 sm:p-8">
          {step === 1 && <Step1Overview />}
          {step === 2 && <Step2Personal form={form} set={field} />}
          {step === 3 && <Step3Logistics form={form} set={field} />}
          {step === 4 && <Step4ShortResponses form={form} set={field} />}
          {step === 5 && <Step5Essay1 form={form} set={field} />}
          {step === 6 && <Step6Essay2 form={form} set={field} />}
          {step === 7 && <Step7PassItOn form={form} set={field} />}
          {step === 8 && <Step8Commitment form={form} set={field} />}
          {step === 9 && (
            <Step9Declaration
              form={form}
              set={field}
              submitError={submitError}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-dark-700 text-sm font-medium text-dark-300 hover:bg-dark-800 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={step === 1 ? () => { setStep(2); scrollToTop() } : handleNext}
              disabled={isSaving}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/20 transition-all disabled:opacity-60"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {step === 1 ? 'Start Application' : 'Continue'}
              {step !== 1 && !isSaving && <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isSaving}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/20 transition-all disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </button>
          )}
        </div>

        {/* Draft recovery note */}
        {step === 1 && (
          <p className="mt-4 text-center text-xs text-dark-600">
            Your progress is saved automatically. You can return to this page to continue where you left off.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Step 1: Overview ─────────────────────────────────────────────────────────

function Step1Overview() {
  return (
    <FormStepLayout title={copy.introTitle}>
      {/* Main intro */}
      <div className="space-y-3">
        <p className="text-dark-200 leading-relaxed text-sm">
          {copy.introParagraph}
        </p>
        <p className="text-dark-200 text-sm">
          A fellowship is not just a training program. It is a guided experience that combines learning, mentorship, and real-world application.
        </p>
        <p className="text-sm font-medium text-white">
          The fellowship includes:
        </p>
        <ul className="space-y-1 pl-4">
          {copy.fellowshipBullets.map((b, i) => (
            <li key={i} className="text-sm text-dark-200 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <p className="text-sm text-dark-200 mt-2">
          Participants will develop leadership capacity, gain clarity, build ideas into actionable initiatives, and apply what they learn within their communities.
        </p>
      </div>

      {/* Pass It On */}
      <div className="mt-4 bg-amber-900/15 border border-amber-800/40 rounded-xl p-5">
        <h3 className="text-sm font-bold text-amber-300 mb-2">
            {copy.passItOnTitle}
          </h3>
          <p className="text-sm text-amber-400 mb-3">{copy.passItOnParagraph}</p>
          <p className="text-sm text-amber-400 mb-1">Participants will work in teams to:</p>
          <ul className="space-y-1 pl-4">
            {copy.passItOnBullets.map((b, i) => (
              <li key={i} className="text-sm text-amber-400 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Logistics — soft fee mention */}
      <div className="mt-2">
        <h3 className="text-sm font-bold text-white mb-2">
          {copy.logisticsTitle}
        </h3>
        <p className="text-sm text-dark-400 italic mb-2">
          {copy.softContributionLine}
        </p>
        <p className="text-sm text-dark-200">{copy.logisticsParagraph}</p>
      </div>

      {/* Eligibility */}
      <div className="mt-2">
        <h3 className="text-sm font-bold text-white mb-2">
          {copy.eligibilityTitle}
        </h3>
        <ul className="space-y-1.5 pl-4">
          {copy.eligibilityPoints.map((p, i) => (
            <li key={i} className="text-sm text-dark-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Before you apply */}
      <div className="mt-2 bg-dark-800 rounded-xl p-5 border border-dark-700">
        <h3 className="text-sm font-bold text-white mb-2">
          {copy.beforeYouApplyTitle}
        </h3>
        <ul className="space-y-1.5 pl-4">
          {copy.beforeYouApplyPoints.map((p, i) => (
            <li key={i} className="text-sm text-dark-400 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-2 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </FormStepLayout>
  )
}

// ─── Step 2: Personal Information ────────────────────────────────────────────

type FieldSetter = <K extends keyof ApplicationFormData>(key: K) => (value: ApplicationFormData[K]) => void

function Step2Personal({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  // Auto-calc age from DOB
  const handleDob = (val: string) => {
    set('dateOfBirth')(val)
    if (val) {
      const dob = new Date(val)
      const today = new Date()
      let age = today.getFullYear() - dob.getFullYear()
      const m = today.getMonth() - dob.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
      set('age')(age > 0 ? age : null)
    }
  }

  return (
    <FormStepLayout title="Personal Information">
      <FieldRow id="fullName" label="Full Name" required>
        <TextInput id="fullName" value={form.fullName} onChange={set('fullName')} required placeholder="Enter your full name" />
      </FieldRow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow id="dateOfBirth" label="Date of Birth" required>
          <TextInput id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleDob} required />
        </FieldRow>
        <FieldRow id="age" label="Age" hint="Auto-calculated from date of birth">
          <TextInput id="age" value={form.age !== null ? String(form.age) : ''} onChange={() => {}} disabled placeholder="Auto-filled" />
        </FieldRow>
      </div>
      <FieldRow id="gender" label="Gender (optional)">
        <SelectInput
          id="gender"
          value={form.gender}
          onChange={set('gender') as (v: string) => void}
          placeholder="Prefer not to say"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'non-binary', label: 'Non-binary' },
            { value: 'prefer-not-to-say', label: 'Prefer not to say' },
          ]}
        />
      </FieldRow>
      <FieldRow id="email" label="Email Address" required>
        <TextInput id="email" type="email" value={form.email} onChange={set('email') as (v: string) => void} required placeholder="your@email.com" />
      </FieldRow>
      <FieldRow id="phone" label="Phone Number / WhatsApp" required>
        <TextInput id="phone" type="tel" value={form.phone} onChange={set('phone') as (v: string) => void} required placeholder="+237 6xx xxx xxx" />
      </FieldRow>

      <SectionHeading title="Location" />
      <FieldRow id="country" label="Country" required>
        <TextInput id="country" value={form.country} onChange={set('country') as (v: string) => void} required placeholder="Cameroon" />
      </FieldRow>
      <FieldRow id="region" label="Region" required>
        <TextInput id="region" value={form.region} onChange={set('region') as (v: string) => void} required placeholder="e.g. South West Region" />
      </FieldRow>
      <FieldRow id="cityTown" label="City / Town" required>
        <TextInput id="cityTown" value={form.cityTown} onChange={set('cityTown') as (v: string) => void} required placeholder="e.g. Buea" />
      </FieldRow>

      <SectionHeading title="Background" />
      <FieldRow id="currentStatus" label="What best describes you?" required>
        <SelectInput
          id="currentStatus"
          value={form.currentStatus}
          onChange={set('currentStatus') as (v: string) => void}
          required
          placeholder="Select an option"
          options={[
            { value: 'student', label: 'Student' },
            { value: 'graduate', label: 'Graduate' },
            { value: 'entrepreneur', label: 'Entrepreneur' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </FieldRow>
      <FieldRow id="schoolOrganization" label="Name of School / Organisation (optional)">
        <TextInput id="schoolOrganization" value={form.schoolOrganization} onChange={set('schoolOrganization') as (v: string) => void} placeholder="e.g. University of Buea" />
      </FieldRow>
    </FormStepLayout>
  )
}

// ─── Step 3: Logistics & Availability ───────────────────────────────────────

function Step3Logistics({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  return (
    <FormStepLayout title="Logistics & Availability">
      <FieldRow id="canAttendBuea" label="Will you be able to attend the 2-day in-person session in Buea?" required>
        <RadioGroup
          id="canAttendBuea"
          value={form.canAttendBuea}
          onChange={set('canAttendBuea') as (v: string) => void}
          required
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
      </FieldRow>

      <FieldRow id="bueaAccommodationStatus" label="What best describes your accommodation situation in Buea?" required>
        <SelectInput
          id="bueaAccommodationStatus"
          value={form.bueaAccommodationStatus}
          onChange={set('bueaAccommodationStatus') as (v: string) => void}
          required
          placeholder="Select an option"
          options={[
            { value: 'live-in-buea', label: 'I currently live in Buea' },
            { value: 'have-place', label: 'I have a place to stay in Buea' },
            { value: 'own-arrangements', label: 'I will make my own arrangements' },
            { value: 'not-sure', label: 'I am not sure yet' },
          ]}
        />
      </FieldRow>

      <FieldRow id="canCommitFourMonths" label="Are you able to commit to the full 4-month mentorship program?" required>
        <RadioGroup
          id="canCommitFourMonths"
          value={form.canCommitFourMonths}
          onChange={set('canCommitFourMonths') as (v: string) => void}
          required
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
      </FieldRow>
    </FormStepLayout>
  )
}

// ─── Step 4: Short Responses ─────────────────────────────────────────────────

function Step4ShortResponses({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  return (
    <FormStepLayout title="Experience & Interests">
      {/* Initiative */}
      <FieldRow id="hasCurrentInitiative" label="Do you currently have an idea or initiative you are working on?" required>
        <RadioGroup
          id="hasCurrentInitiative"
          value={form.hasCurrentInitiative}
          onChange={set('hasCurrentInitiative') as (v: string) => void}
          required
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
      </FieldRow>
      {form.hasCurrentInitiative === 'yes' && (
        <div className="pl-0 sm:pl-4 border-l-2 border-primary-500/30">
          <WordCountTextarea
            id="initiativeSummary"
            label="Briefly describe it"
            value={form.initiativeSummary}
            onChange={set('initiativeSummary') as (v: string) => void}
            maxWords={100}
            rows={4}
            placeholder="Describe your idea or initiative in a few sentences…"
          />
        </div>
      )}

      {/* Impact area */}
      <FieldRow id="impactArea" label="What area are you most interested in creating impact in?" required>
        <SelectInput
          id="impactArea"
          value={form.impactArea}
          onChange={set('impactArea') as (v: string) => void}
          required
          placeholder="Select an area"
          options={[
            { value: 'education', label: 'Education' },
            { value: 'health', label: 'Health' },
            { value: 'environment', label: 'Environment' },
            { value: 'technology', label: 'Technology' },
            { value: 'community-development', label: 'Community Development' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </FieldRow>

      {/* Led initiative */}
      <FieldRow id="hasLedInitiative" label="Have you ever led or participated in any initiative or project?" required>
        <RadioGroup
          id="hasLedInitiative"
          value={form.hasLedInitiative}
          onChange={set('hasLedInitiative') as (v: string) => void}
          required
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
      </FieldRow>
      {form.hasLedInitiative === 'yes' && (
        <div className="pl-0 sm:pl-4 border-l-2 border-primary-500/30">
          <WordCountTextarea
            id="ledInitiativeSummary"
            label="Briefly explain"
            value={form.ledInitiativeSummary}
            onChange={set('ledInitiativeSummary') as (v: string) => void}
            maxWords={100}
            rows={4}
            placeholder="What did you do, and what was the outcome?"
          />
        </div>
      )}
    </FormStepLayout>
  )
}

// ─── Step 5: Essay 1 ─────────────────────────────────────────────────────────

function Step5Essay1({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  return (
    <FormStepLayout title={copy.essay1Title}>
      <WordCountTextarea
        id="essayLeadership"
        label="Your response"
        prompt={copy.essay1Prompt}
        value={form.essayLeadership}
        onChange={set('essayLeadership') as (v: string) => void}
        maxWords={200}
        required
        rows={10}
        placeholder="Write your response here…"
      />
    </FormStepLayout>
  )
}

// ─── Step 6: Essay 2 ─────────────────────────────────────────────────────────

function Step6Essay2({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  return (
    <FormStepLayout title={copy.essay2Title}>
      <WordCountTextarea
        id="essayCommunityProblem"
        label="Your response"
        prompt={copy.essay2Prompt}
        value={form.essayCommunityProblem}
        onChange={set('essayCommunityProblem') as (v: string) => void}
        maxWords={200}
        required
        rows={10}
        placeholder="Write your response here…"
      />
    </FormStepLayout>
  )
}

// ─── Step 7: Pass It On ──────────────────────────────────────────────────────

function Step7PassItOn({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  return (
    <FormStepLayout title={copy.passItOnEssayTitle}>
      <WordCountTextarea
        id="passItOnResponse"
        label="Your response"
        prompt={copy.passItOnEssayPrompt}
        value={form.passItOnResponse}
        onChange={set('passItOnResponse') as (v: string) => void}
        maxWords={150}
        required
        rows={8}
        placeholder="Write your response here…"
      />
    </FormStepLayout>
  )
}

// ─── Step 8: Commitment ──────────────────────────────────────────────────────

function Step8Commitment({ form, set }: { form: ApplicationFormData; set: FieldSetter }) {
  const config = cohortConfig
  return (
    <FormStepLayout title={copy.contributionFullTitle}>
      {/* Full contribution explanation — revealed here for the first time */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 space-y-3">
        <p className="text-sm text-dark-200">{copy.contributionFullParagraph}</p>
        <div>
          <p className="text-sm font-semibold text-white mb-1">
            The contribution of{' '}
            <span className="text-primary-500">
              {config.contributionAmount.toLocaleString()} {config.contributionCurrency}
            </span>{' '}
            covers:
          </p>
          <ul className="space-y-1 pl-4">
            {config.contributionCoverageItems.map((item, i) => (
              <li key={i} className="text-sm text-dark-200 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-1">
            Participants are also responsible for:
          </p>
          <ul className="space-y-1 pl-4">
            {config.participantResponsibilities.map((item, i) => (
              <li key={i} className="text-sm text-dark-200 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FieldRow
        id="contributionWilling"
        label={`If selected, are you willing and able to make this commitment contribution of ${config.contributionAmount.toLocaleString()} ${config.contributionCurrency}?`}
        required
      >
        <RadioGroup
          id="contributionWilling"
          value={form.contributionWilling}
          onChange={set('contributionWilling') as (v: string) => void}
          required
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        />
      </FieldRow>

      {form.contributionWilling === 'no' && (
        <div className="pl-0 sm:pl-4 border-l-2 border-dark-700">
          <FieldRow id="contributionExplanation" label="Please briefly explain your situation (optional)">
            <WordCountTextarea
              id="contributionExplanation"
              label=""
              value={form.contributionExplanation}
              onChange={set('contributionExplanation') as (v: string) => void}
              maxWords={100}
              rows={4}
              placeholder="Your response will be considered during the review process."
            />
          </FieldRow>
        </div>
      )}
    </FormStepLayout>
  )
}

// ─── Step 9: Declaration & Submit ────────────────────────────────────────────

function Step9Declaration({
  form,
  set,
  submitError,
  isSubmitting,
}: {
  form: ApplicationFormData
  set: FieldSetter
  submitError: string
  isSubmitting: boolean
}) {
  const checks: Array<{ key: keyof ApplicationFormData; text: string }> = [
    { key: 'declareAttendBuea', text: copy.declarationCheckboxes[0] },
    { key: 'declareTransportAccom', text: copy.declarationCheckboxes[1] },
    { key: 'declareCommitProgram', text: copy.declarationCheckboxes[2] },
    { key: 'declareCompetitiveProc', text: copy.declarationCheckboxes[3] },
    { key: 'declareActiveParticip', text: copy.declarationCheckboxes[4] },
  ]

  return (
    <FormStepLayout title="Commitment Confirmation">
      {/* Declarations */}
      <div className="space-y-3">
        {checks.map(({ key, text }) => (
          <label
            key={key}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={form[key] as boolean}
              onChange={(e) => set(key)(e.target.checked as ApplicationFormData[typeof key])}
              className="mt-1 w-4 h-4 rounded accent-primary-500 flex-shrink-0"
            />
            <span className="text-sm text-dark-200 group-hover:text-white transition-colors">
              {text}
            </span>
          </label>
        ))}
      </div>

      {/* Final motivation */}
      <FieldRow id="motivationOneSentence" label="In one sentence, what drives you to create impact?" required>
        <ShortTextarea
          id="motivationOneSentence"
          value={form.motivationOneSentence}
          onChange={set('motivationOneSentence') as (v: string) => void}
          required
          rows={2}
          placeholder="Share your motivation in a single sentence…"
        />
      </FieldRow>

      {submitError && (
        <div className="bg-red-900/20 border border-red-800/60 rounded-lg p-4 flex items-start gap-2" role="alert">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-300">{submitError}</p>
        </div>
      )}

      {!isSubmitting && (
        <p className="text-xs text-dark-500 text-center pt-2">
          By submitting, you confirm all the information provided is accurate and complete.
        </p>
      )}
    </FormStepLayout>
  )
}

// ─── Mapping helpers ─────────────────────────────────────────────────────────

/** Convert form string 'yes'/'no' values to booleans for the API */
function mapFormToApi(form: ApplicationFormData, currentStep: number) {
  return {
    ...form,
    progressStep: currentStep,
    canAttendBuea: form.canAttendBuea === 'yes' ? true : form.canAttendBuea === 'no' ? false : null,
    canCommitFourMonths: form.canCommitFourMonths === 'yes' ? true : form.canCommitFourMonths === 'no' ? false : null,
    hasCurrentInitiative: form.hasCurrentInitiative === 'yes' ? true : form.hasCurrentInitiative === 'no' ? false : null,
    hasLedInitiative: form.hasLedInitiative === 'yes' ? true : form.hasLedInitiative === 'no' ? false : null,
    contributionWilling: form.contributionWilling === 'yes' ? true : form.contributionWilling === 'no' ? false : null,
    dateOfBirth: form.dateOfBirth || null,
    age: form.age,
  }
}

/** Convert DB booleans back to 'yes'/'no'/'' strings for the form */
function mapDbToForm(db: Record<string, unknown>): ApplicationFormData {
  const boolToStr = (v: unknown) => (v === true ? 'yes' : v === false ? 'no' : '')
  return {
    fullName: (db.fullName as string) || '',
    dateOfBirth: db.dateOfBirth ? (db.dateOfBirth as string).slice(0, 10) : '',
    age: (db.age as number | null) ?? null,
    gender: (db.gender as string) || '',
    email: (db.email as string) || '',
    phone: (db.phone as string) || '',
    country: (db.country as string) || 'Cameroon',
    region: (db.region as string) || '',
    cityTown: (db.cityTown as string) || '',
    currentStatus: (db.currentStatus as string) || '',
    schoolOrganization: (db.schoolOrganization as string) || '',
    canAttendBuea: boolToStr(db.canAttendBuea),
    bueaAccommodationStatus: (db.bueaAccommodationStatus as string) || '',
    canCommitFourMonths: boolToStr(db.canCommitFourMonths),
    hasCurrentInitiative: boolToStr(db.hasCurrentInitiative),
    initiativeSummary: (db.initiativeSummary as string) || '',
    impactArea: (db.impactArea as string) || '',
    hasLedInitiative: boolToStr(db.hasLedInitiative),
    ledInitiativeSummary: (db.ledInitiativeSummary as string) || '',
    essayLeadership: (db.essayLeadership as string) || '',
    essayCommunityProblem: (db.essayCommunityProblem as string) || '',
    passItOnResponse: (db.passItOnResponse as string) || '',
    contributionWilling: boolToStr(db.contributionWilling),
    contributionExplanation: (db.contributionExplanation as string) || '',
    motivationOneSentence: (db.motivationOneSentence as string) || '',
    declareAttendBuea: Boolean(db.declareAttendBuea),
    declareTransportAccom: Boolean(db.declareTransportAccom),
    declareCommitProgram: Boolean(db.declareCommitProgram),
    declareCompetitiveProc: Boolean(db.declareCompetitiveProc),
    declareActiveParticip: Boolean(db.declareActiveParticip),
  }
}
