'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle2,
  User,
  MapPin,
  Calendar,
  FileText,
  Star,
  AlertCircle,
} from 'lucide-react'

import { SCORE_CATEGORIES, type ReviewScores, type FinalRecommendation } from '@/types/fellowship'

interface FullApplication {
  id: string
  status: string
  cohort: { name: string; slug: string }
  // Personal
  fullName: string | null
  dateOfBirth: string | null
  age: number | null
  gender: string | null
  email: string | null
  phone: string | null
  country: string | null
  region: string | null
  cityTown: string | null
  currentStatus: string | null
  schoolOrganization: string | null
  // Logistics
  canAttendBuea: boolean | null
  bueaAccommodationStatus: string | null
  canCommitFourMonths: boolean | null
  // Short
  hasCurrentInitiative: boolean | null
  initiativeSummary: string | null
  impactArea: string | null
  hasLedInitiative: boolean | null
  ledInitiativeSummary: string | null
  // Essays
  essayLeadership: string | null
  essayCommunityProblem: string | null
  passItOnResponse: string | null
  // Commitment
  contributionWilling: boolean | null
  contributionExplanation: string | null
  // Declaration
  motivationOneSentence: string | null
  declareAttendBuea: boolean
  declareTransportAccom: boolean
  declareCommitProgram: boolean
  declareCompetitiveProc: boolean
  declareActiveParticip: boolean
  submittedAt: string | null
  createdAt: string
  review: {
    id: string
    reviewerName: string | null
    scoreCommitmentAvailability: number
    scoreLeadershipInitiative: number
    scoreProblemAwareness: number
    scoreClarityComm: number
    scoreExecutionPotential: number
    scorePassItOn: number
    totalScore: number
    notes: string | null
    finalRecommendation: string
  } | null
}

const RECOMMENDATION_OPTIONS: { value: FinalRecommendation; label: string; colour: string }[] = [
  { value: 'pending', label: 'Review Pending', colour: 'text-gray-600' },
  { value: 'shortlist', label: 'Shortlist', colour: 'text-amber-600' },
  { value: 'interview', label: 'Interview', colour: 'text-purple-600' },
  { value: 'accepted', label: 'Accepted', colour: 'text-green-600' },
  { value: 'rejected', label: 'Rejected', colour: 'text-red-600' },
]

export default function FellowshipApplicationDetailPage({ params }: { params: { id: string } }) {
  const { status } = useSession()
  const router = useRouter()
  const [app, setApp] = useState<FullApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  // Review form state
  const [scores, setScores] = useState<ReviewScores>({
    scoreCommitmentAvailability: 0,
    scoreLeadershipInitiative: 0,
    scoreProblemAwareness: 0,
    scoreClarityComm: 0,
    scoreExecutionPotential: 0,
    scorePassItOn: 0,
  })
  const [notes, setNotes] = useState('')
  const [recommendation, setRecommendation] = useState<FinalRecommendation>('pending')
  const [reviewerName, setReviewerName] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch(`/api/fellowship/applications/${params.id}`)
      .then((r) => r.json())
      .then((data: FullApplication) => {
        setApp(data)
        if (data.review) {
          setScores({
            scoreCommitmentAvailability: data.review.scoreCommitmentAvailability,
            scoreLeadershipInitiative: data.review.scoreLeadershipInitiative,
            scoreProblemAwareness: data.review.scoreProblemAwareness,
            scoreClarityComm: data.review.scoreClarityComm,
            scoreExecutionPotential: data.review.scoreExecutionPotential,
            scorePassItOn: data.review.scorePassItOn,
          })
          setNotes(data.review.notes || '')
          setRecommendation(data.review.finalRecommendation as FinalRecommendation)
          setReviewerName(data.review.reviewerName || '')
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [status, params.id])

  const totalScore = Object.entries(scores).reduce((sum, [, v]) => sum + Number(v), 0)

  const saveReview = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    try {
      const res = await fetch(`/api/fellowship/applications/${params.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...scores, notes, finalRecommendation: recommendation, reviewerName }),
      })
      if (!res.ok) throw new Error()
      setSaveStatus('saved')
      // Refresh app to reflect status change
      const updated = await fetch(`/api/fellowship/applications/${params.id}`).then(r => r.json())
      setApp(updated)
    } catch {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  if (isLoading || !app) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    )
  }

  const bool = (v: boolean | null) => v === true ? 'Yes' : v === false ? 'No' : '—'

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
      {/* Back + header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href="/admin/fellowship/applications"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Applications
        </Link>
        <div className="sm:ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">{app.cohort?.name}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{app.fullName || 'Unnamed Applicant'}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{app.email}</p>
        </div>
        <div className="sm:ml-auto flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
            app.status === 'accepted' ? 'bg-green-100 text-green-700' :
            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
            app.status === 'shortlisted' ? 'bg-amber-100 text-amber-700' :
            app.status === 'interview' ? 'bg-purple-100 text-purple-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {app.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: full application */}
        <div className="lg:col-span-2 space-y-4">
          {/* Personal */}
          <Section icon={<User className="w-4 h-4" />} title="Personal Information">
            <Grid2>
              <Field label="Full Name" value={app.fullName} />
              <Field label="Date of Birth" value={app.dateOfBirth ? new Date(app.dateOfBirth).toLocaleDateString() : null} />
              <Field label="Age" value={app.age != null ? String(app.age) : null} />
              <Field label="Gender" value={app.gender} />
              <Field label="Email" value={app.email} />
              <Field label="Phone / WhatsApp" value={app.phone} />
            </Grid2>
          </Section>

          {/* Location */}
          <Section icon={<MapPin className="w-4 h-4" />} title="Location & Background">
            <Grid2>
              <Field label="Country" value={app.country} />
              <Field label="Region" value={app.region} />
              <Field label="City / Town" value={app.cityTown} />
              <Field label="Current Status" value={app.currentStatus} />
              <Field label="School / Organisation" value={app.schoolOrganization} />
            </Grid2>
          </Section>

          {/* Logistics */}
          <Section icon={<Calendar className="w-4 h-4" />} title="Logistics & Availability">
            <Grid2>
              <Field label="Can attend Buea in-person?" value={bool(app.canAttendBuea)} />
              <Field label="Accommodation situation" value={app.bueaAccommodationStatus} />
              <Field label="Can commit 4 months?" value={bool(app.canCommitFourMonths)} />
            </Grid2>
          </Section>

          {/* Short responses */}
          <Section icon={<FileText className="w-4 h-4" />} title="Short Responses">
            <Grid2>
              <Field label="Has current initiative?" value={bool(app.hasCurrentInitiative)} />
              <Field label="Impact area" value={app.impactArea?.replace(/-/g, ' ')} />
              <Field label="Has led initiative?" value={bool(app.hasLedInitiative)} />
            </Grid2>
            {app.initiativeSummary && (
              <EssayBlock label="Initiative description" text={app.initiativeSummary} />
            )}
            {app.ledInitiativeSummary && (
              <EssayBlock label="Leadership experience" text={app.ledInitiativeSummary} />
            )}
          </Section>

          {/* Essays */}
          <Section icon={<Star className="w-4 h-4" />} title="Essays">
            <EssayBlock label="Essay 1 — Leadership & Initiative" text={app.essayLeadership} />
            <EssayBlock label="Essay 2 — Impact & Problem Solving" text={app.essayCommunityProblem} />
            <EssayBlock label="Pass It On Response" text={app.passItOnResponse} />
          </Section>

          {/* Commitment */}
          <Section icon={<CheckCircle2 className="w-4 h-4" />} title="Commitment & Declaration">
            <Grid2>
              <Field label="Contribution willing?" value={bool(app.contributionWilling)} />
            </Grid2>
            {app.contributionExplanation && (
              <EssayBlock label="Contribution explanation" text={app.contributionExplanation} />
            )}
            <EssayBlock label="Motivation (one sentence)" text={app.motivationOneSentence} />
            <div className="mt-3 space-y-1.5">
              {[
                { label: 'Confirms in-person attendance', v: app.declareAttendBuea },
                { label: 'Understands transport/accommodation responsibility', v: app.declareTransportAccom },
                { label: 'Commits to 4-month program', v: app.declareCommitProgram },
                { label: 'Understands competitive process', v: app.declareCompetitiveProc },
                { label: 'Agrees to active participation', v: app.declareActiveParticip },
              ].map(({ label, v }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  {v ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span className={v ? 'text-gray-700 dark:text-gray-300' : 'text-red-500'}>{label}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right: Scoring panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-5 sticky top-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Review & Scoring</h2>

            {/* Reviewer name */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Reviewer</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            {/* Score sliders */}
            <div className="space-y-4 mb-5">
              {SCORE_CATEGORIES.map(({ key, label, max }) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-700 dark:text-gray-300 font-medium">{label}</label>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {scores[key]} <span className="text-gray-400 font-normal">/ {max}</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={max}
                    value={scores[key]}
                    onChange={(e) =>
                      setScores((prev) => ({ ...prev, [key]: parseInt(e.target.value) }))
                    }
                    className="w-full accent-primary-500"
                  />
                </div>
              ))}
            </div>

            {/* Total */}
            <div className={`text-center py-3 rounded-xl mb-4 ${
              totalScore >= 80 ? 'bg-green-50 dark:bg-green-900/20' :
              totalScore >= 60 ? 'bg-amber-50 dark:bg-amber-900/20' :
              'bg-gray-50 dark:bg-dark-800'
            }`}>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalScore}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">out of 100</div>
            </div>

            {/* Recommendation */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Final Recommendation</label>
              <select
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value as FinalRecommendation)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              >
                {RECOMMENDATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Reviewer Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add internal notes here…"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none"
              />
            </div>

            {/* Save */}
            <button
              onClick={saveReview}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving…' : saveStatus === 'saved' ? 'Saved ✓' : 'Save Review'}
            </button>

            {saveStatus === 'error' && (
              <p className="mt-2 text-xs text-red-500 text-center">Failed to save. Please try again.</p>
            )}

            <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-600 text-center">
              Submitted: {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
        {icon}
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-900 dark:text-white capitalize">{value || '—'}</dd>
    </div>
  )
}

function EssayBlock({ label, text }: { label: string; text: string | null | undefined }) {
  if (!text) return null
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3">
        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
