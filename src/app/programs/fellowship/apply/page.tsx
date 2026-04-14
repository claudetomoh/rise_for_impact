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
  Users,
} from 'lucide-react'

import StepIndicator from '@/components/fellowship/StepIndicator'
import WordCountTextarea from '@/components/fellowship/WordCountTextarea'
import DownloadGuideButton from '@/components/fellowship/DownloadGuideButton'
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

// Static defaults — overridden at runtime by DB values fetched from /api/fellowship/cohorts/active
const STATIC_CONFIG = getActiveCohortConfig()
const STATIC_COPY   = getActiveCohortCopy()

// Module-level live config — mutated on first DB fetch, triggers re-render via forceUpdate
let LIVE_COPY   = STATIC_COPY
let LIVE_CONFIG = STATIC_CONFIG

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
    if (!data.declareAccurate) errs.push('Please confirm that all information provided is accurate.')
    if (!data.declareDataConsent) errs.push('Please confirm your consent to data processing.')
  }
  return errs
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FellowshipApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ApplicationFormData>(EMPTY_FORM)
  // Trigger re-render after DB config loads
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    fetch('/api/fellowship/cohorts/active')
      .then((r) => (r.ok ? r.json() : null))
      .then((db) => {
        if (!db) return
        const arr = (json: string | null, fallback: string[]): string[] => {
          if (!json) return fallback
          try { return JSON.parse(json) as string[] } catch { return fallback }
        }
        LIVE_COPY = {
          ...STATIC_COPY,
          fellowshipBullets:         arr(db.fellowshipBulletsJson,      STATIC_COPY.fellowshipBullets),
          passItOnTitle:             db.passItOnTitle             ?? STATIC_COPY.passItOnTitle,
          passItOnParagraph:         db.passItOnParagraph         ?? STATIC_COPY.passItOnParagraph,
          passItOnBullets:           arr(db.passItOnBulletsJson,         STATIC_COPY.passItOnBullets),
          eligibilityPoints:         arr(db.eligibilityPointsJson,       STATIC_COPY.eligibilityPoints),
          beforeYouApplyPoints:      arr(db.beforeYouApplyJson,          STATIC_COPY.beforeYouApplyPoints),
          contributionFullTitle:     db.contributionFullTitle     ?? STATIC_COPY.contributionFullTitle,
          contributionFullParagraph: db.contributionFullParagraph ?? STATIC_COPY.contributionFullParagraph,
          declarationCheckboxes:     arr(db.declarationCheckboxesJson,   STATIC_COPY.declarationCheckboxes),
          essay1Title:               db.essay1Title               ?? STATIC_COPY.essay1Title,
          essay1Prompt:              db.essay1Prompt              ?? STATIC_COPY.essay1Prompt,
          essay2Title:               db.essay2Title               ?? STATIC_COPY.essay2Title,
          essay2Prompt:              db.essay2Prompt              ?? STATIC_COPY.essay2Prompt,
          passItOnEssayTitle:        db.passItOnEssayTitle        ?? STATIC_COPY.passItOnEssayTitle,
          passItOnEssayPrompt:       db.passItOnEssayPrompt       ?? STATIC_COPY.passItOnEssayPrompt,
        }
        LIVE_CONFIG = {
          ...STATIC_CONFIG,
          contributionAmount:   db.contributionAmount   ?? STATIC_CONFIG.contributionAmount,
          contributionCurrency: db.contributionCurrency ?? STATIC_CONFIG.contributionCurrency,
          ageMin: db.ageMin ?? STATIC_CONFIG.ageMin,
          ageMax: db.ageMax ?? STATIC_CONFIG.ageMax,
        }
        forceUpdate((n) => n + 1)
      })
      .catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [draftId, setDraftId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [stepErrors, setStepErrors] = useState<string[]>([])
  const [submitError, setSubmitError] = useState<string>('')
  const errorsRef = useRef<HTMLDivElement>(null)
  // Social follow gate — required before proceeding past step 1
  const [followLinkedIn, setFollowLinkedIn] = useState(false)
  const [followFacebook, setFollowFacebook] = useState(false)

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

  // Applications are OPEN
  const isApplicationOpen = true

  if (!isApplicationOpen) {
    return (
      <div className="min-h-screen bg-dark-950">
        {/* Letterhead header */}
        <header className="bg-dark-900 border-b border-white/8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="grid grid-cols-3 gap-2 items-center">
              {/* Ghana HQ */}
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-white leading-tight">1 University Avenue, Berekuso</p>
                <p className="text-xs text-dark-400">Eastern Region, Ghana</p>
              </div>
              {/* Center logo */}
              <Link href="/" className="flex flex-col items-center gap-1.5">
                <Image src="/images/logo.jpeg" alt="Rise for Impact" width={44} height={44} className="rounded-xl shadow-lg" />
                <span className="text-xs font-bold text-white tracking-wide">Rise for Impact</span>
              </Link>
              {/* Cameroon HQ */}
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white leading-tight">Chapelle Obili, Yaounde</p>
                <p className="text-xs text-dark-400">Centre Region, Cameroon</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/8 text-center">
              <p className="text-xs text-dark-400 italic">A structured leadership &amp; impact development programme for young Africans ready to move from potential to action</p>
            </div>
          </div>
          {/* Back nav */}
          <div className="border-t border-white/8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-9 flex items-center">
              <Link href="/programs/fellowship" className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
                Back to Fellowship
              </Link>
            </div>
          </div>
        </header>

        {/* Hero banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src="/images/backgrounds/fellowship.jpeg"
            alt="Rise for Impact Fellowship"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/40 to-dark-950" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-semibold text-yellow-300 tracking-widest uppercase">Applications not yet open</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg">Rise for Impact Fellowship</h1>
            <p className="text-dark-300 text-sm mt-2 drop-shadow">Cohort 1 — Buea, Cameroon · 2026</p>
          </div>
        </div>

        <main className="px-4 py-12">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-block px-8 py-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 mb-6">
              <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-1">Applications open</p>
              <p className="text-3xl font-bold text-yellow-300">April 15, 2026</p>
            </div>

            <p className="text-dark-300 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Mark your calendar. While you wait, download the complete application guide — it covers the full fellowship programme and every question on the form so you can prepare your responses in advance.
            </p>

            {/* Download Guide CTA */}
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">Prepare Before You Apply</h3>
                  <p className="text-xs text-dark-400 mb-4 leading-relaxed">
                    Download the official RFI Fellowship Application Guide — a full walkthrough of the programme, all 9 sections, every question and essay prompt, plus tips on what we look for in successful candidates.
                  </p>
                  <DownloadGuideButton variant="primary" size="sm" />
                </div>
              </div>
            </div>

            {/* Save & continue note */}
            <div className="bg-dark-900/60 border border-dark-800 rounded-xl p-4 mb-8 flex items-start gap-3 text-left">
              <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white mb-0.5">Save & continue anytime</p>
                <p className="text-xs text-dark-400 leading-relaxed">
                  Once applications open, your progress is saved automatically at every step. You can close the page and pick up right where you left off.
                </p>
              </div>
            </div>

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
      {/* Letterhead header */}
      <header className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-sm border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="grid grid-cols-3 gap-2 items-center">
            {/* Ghana HQ */}
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">1 University Avenue, Berekuso</p>
              <p className="text-[10px] text-dark-400">Eastern Region, Ghana</p>
            </div>
            {/* Center logo */}
            <Link href="/" className="flex flex-col items-center gap-1">
              <Image src="/images/logo.jpeg" alt="Rise for Impact" width={36} height={36} className="rounded-xl" />
              <span className="text-[10px] font-bold text-white tracking-wide">Rise for Impact</span>
            </Link>
            {/* Cameroon HQ */}
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">Chapelle Obili, Yaounde</p>
              <p className="text-[10px] text-dark-400">Centre Region, Cameroon</p>
            </div>
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-white/8 text-center">
            <p className="text-[10px] text-dark-500 italic">A structured leadership &amp; impact development programme — from potential to action</p>
          </div>
        </div>
        {/* Nav / save row */}
        <div className="border-t border-white/8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
            <Link href="/programs/fellowship" className="text-xs text-dark-400 hover:text-white flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-3 h-3" /> Fellowship
            </Link>
            {step > 1 ? (
              <button onClick={handleManualSave} disabled={isSaving} className="flex items-center gap-1 text-xs text-dark-400 hover:text-white transition-colors disabled:opacity-50">
                {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : saveStatus === 'saved' ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : saveStatus === 'error' ? <AlertCircle className="w-3 h-3 text-red-400" /> : <Save className="w-3 h-3" />}
                {saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save failed' : 'Save'}
              </button>
            ) : <div />}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-8 sm:pb-12">
        {/* Hero strip — visible only on step 1 */}
        {step === 1 && (
          <div className="relative rounded-2xl overflow-hidden mb-8 h-44 md:h-56">
            <Image
              src="/images/backgrounds/fellowship.jpeg"
              alt="Rise for Impact Fellowship"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-dark-950/20" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-3 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-semibold text-yellow-300 tracking-wider uppercase">Cohort 1 · 40 spots only · Buea, Cameroon</span>
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white drop-shadow">Rise for Impact Fellowship</h2>
              <p className="text-dark-300 text-xs mt-1">9-step application · Progress saved automatically</p>
            </div>
          </div>
        )}

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
          {step === 1 && <Step1Overview followLinkedIn={followLinkedIn} setFollowLinkedIn={setFollowLinkedIn} followFacebook={followFacebook} setFollowFacebook={setFollowFacebook} />}
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
              onClick={step === 1 ? () => {
                if (!followLinkedIn && !followFacebook) {
                  setStepErrors(['Please follow Rise for Impact on LinkedIn and/or Facebook before starting your application.'])
                  return
                }
                setStepErrors([])
                setStep(2)
                scrollToTop()
              } : handleNext}
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

        {/* Save & continue note */}
        {step === 1 && (
          <div className="mt-5 bg-dark-900/50 border border-dark-800 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white mb-0.5">Save &amp; continue anytime</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                Your progress is saved automatically as you move through each step. You can close this page and return later — your answers will be waiting for you right where you left off.
              </p>
            </div>
          </div>
        )}
        {step > 1 && saveStatus === 'saved' && (
          <p className="mt-3 text-center text-xs text-primary-500 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Progress saved
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Step 1: Overview ─────────────────────────────────────────────────────────

interface SocialFollowProps {
  followLinkedIn: boolean
  setFollowLinkedIn: (v: boolean) => void
  followFacebook: boolean
  setFollowFacebook: (v: boolean) => void
}

function Step1Overview({ followLinkedIn, setFollowLinkedIn, followFacebook, setFollowFacebook }: SocialFollowProps) {
  return (
    <FormStepLayout title={LIVE_COPY.introTitle}>
      {/* ── Social media follow requirement ── */}
      <div className="mb-2 bg-blue-950/40 border border-blue-700/40 rounded-xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-0.5">Follow Rise for Impact <span className="text-xs font-normal text-red-400 ml-1">* Required</span></h3>
            <p className="text-xs text-dark-400">Follow us on at least one platform to continue with your application.</p>
          </div>
        </div>
        <div className="space-y-2.5 pl-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={followLinkedIn}
              onChange={e => setFollowLinkedIn(e.target.checked)}
              className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 cursor-pointer"
            />
            <span className="text-sm text-dark-200 group-hover:text-white transition-colors">
              I follow Rise for Impact on{' '}
              <a href="https://www.linkedin.com/company/rise-for-impact" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300" onClick={e => e.stopPropagation()}>LinkedIn</a>
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={followFacebook}
              onChange={e => setFollowFacebook(e.target.checked)}
              className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 cursor-pointer"
            />
            <span className="text-sm text-dark-200 group-hover:text-white transition-colors">
              I follow Rise for Impact on{' '}
              <a href="https://www.facebook.com/share/1HVFiDupbD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300" onClick={e => e.stopPropagation()}>Facebook</a>
            </span>
          </label>
        </div>
        {!followLinkedIn && !followFacebook && (
          <p className="mt-3 text-xs text-red-400/80 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
            You must follow us on at least one platform before starting
          </p>
        )}
      </div>
      {/* Cohort size notice */}
      <div className="mb-2 bg-primary-950/50 border border-primary-700/40 rounded-xl p-4 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Users className="w-3.5 h-3.5 text-primary-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-0.5">Only 40 young people will be selected for Cohort 1</p>
          <p className="text-xs text-dark-400 leading-relaxed">
            This is a small, intentional cohort. We are selecting just <span className="text-white font-semibold">40 fellows</span> for this first cycle to ensure every participant receives meaningful mentorship and support. Apply only if you are genuinely ready to commit.
          </p>
        </div>
      </div>
      {/* Main intro */}
      <div className="space-y-3">
        <p className="text-dark-200 leading-relaxed text-sm">
          {LIVE_COPY.introParagraph}
        </p>
        <p className="text-dark-200 text-sm">
          A fellowship is not just a training program. It is a guided experience that combines learning, mentorship, and real-world application.
        </p>
        <p className="text-sm font-medium text-white">
          The fellowship includes:
        </p>
        <ul className="space-y-1 pl-4">
          {LIVE_COPY.fellowshipBullets.map((b, i) => (
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
            {LIVE_COPY.passItOnTitle}
          </h3>
          <p className="text-sm text-amber-400 mb-3">{LIVE_COPY.passItOnParagraph}</p>
          <p className="text-sm text-amber-400 mb-1">Participants will work in teams to:</p>
          <ul className="space-y-1 pl-4">
            {LIVE_COPY.passItOnBullets.map((b, i) => (
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
          {LIVE_COPY.logisticsTitle}
        </h3>
        <p className="text-sm text-dark-400 italic mb-2">
          {LIVE_COPY.softContributionLine}
        </p>
        <p className="text-sm text-dark-200">{LIVE_COPY.logisticsParagraph}</p>
      </div>

      {/* Eligibility */}
      <div className="mt-2">
        <h3 className="text-sm font-bold text-white mb-2">
          {LIVE_COPY.eligibilityTitle}
        </h3>
        <ul className="space-y-1.5 pl-4">
          {LIVE_COPY.eligibilityPoints.map((p, i) => (
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
          {LIVE_COPY.beforeYouApplyTitle}
        </h3>
        <ul className="space-y-1.5 pl-4 mb-5">
          {LIVE_COPY.beforeYouApplyPoints.map((p, i) => (
            <li key={i} className="text-sm text-dark-400 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-2 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        {/* Download guide prompt */}
        <div className="border-t border-dark-700 pt-4">
          <p className="text-xs text-dark-400 mb-3">Want to review all questions before filling them in? Download the free application guide.</p>
          <DownloadGuideButton variant="outline" size="sm" />
        </div>
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
    <FormStepLayout title={LIVE_COPY.essay1Title}>
      <WordCountTextarea
        id="essayLeadership"
        label="Your response"
        prompt={LIVE_COPY.essay1Prompt}
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
    <FormStepLayout title={LIVE_COPY.essay2Title}>
      <WordCountTextarea
        id="essayCommunityProblem"
        label="Your response"
        prompt={LIVE_COPY.essay2Prompt}
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
    <FormStepLayout title={LIVE_COPY.passItOnEssayTitle}>
      <WordCountTextarea
        id="passItOnResponse"
        label="Your response"
        prompt={LIVE_COPY.passItOnEssayPrompt}
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
  const config = LIVE_CONFIG
  return (
    <FormStepLayout title={LIVE_COPY.contributionFullTitle}>
      {/* Full contribution explanation — revealed here for the first time */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 space-y-3">
        <p className="text-sm text-dark-200">{LIVE_COPY.contributionFullParagraph}</p>
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
  const checks: Array<{ key: keyof ApplicationFormData; text: string; highlight?: boolean }> = [
    { key: 'declareAttendBuea', text: LIVE_COPY.declarationCheckboxes[0] },
    { key: 'declareTransportAccom', text: LIVE_COPY.declarationCheckboxes[1] },
    { key: 'declareCommitProgram', text: LIVE_COPY.declarationCheckboxes[2] },
    { key: 'declareCompetitiveProc', text: LIVE_COPY.declarationCheckboxes[3] },
    { key: 'declareActiveParticip', text: LIVE_COPY.declarationCheckboxes[4] },
    { key: 'declareAccurate', text: LIVE_COPY.declarationCheckboxes[5], highlight: true },
    { key: 'declareDataConsent', text: LIVE_COPY.declarationCheckboxes[6], highlight: true },
  ]

  return (
    <FormStepLayout title="Commitment Confirmation">
      {/* Declarations */}
      <div className="space-y-3">
        {checks.map(({ key, text, highlight }) => (
          <label
            key={key}
            className={`flex items-start gap-3 cursor-pointer group rounded-lg p-2 -mx-2 transition-colors ${
              highlight ? 'bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20' : 'hover:bg-white/3'
            }`}
          >
            <input
              type="checkbox"
              checked={form[key] as boolean}
              onChange={(e) => set(key)(e.target.checked as ApplicationFormData[typeof key])}
              className="mt-1 w-4 h-4 rounded accent-primary-500 flex-shrink-0"
            />
            <span className={`text-sm transition-colors ${
              highlight ? 'text-amber-200 group-hover:text-amber-100 font-medium' : 'text-dark-200 group-hover:text-white'
            }`}>
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
    declareAccurate: Boolean(db.declareAccurate),
    declareDataConsent: Boolean(db.declareDataConsent),
  }
}
