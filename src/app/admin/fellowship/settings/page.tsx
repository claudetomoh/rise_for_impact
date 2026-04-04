'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Loader2, Save, Plus, CheckCircle2, AlertCircle, Settings,
  FileText, ClipboardList, ScrollText, Users2, Shield,
} from 'lucide-react'
import { getActiveCohortCopy, getActiveCohortConfig } from '@/lib/fellowship-config'

// ─── Default copy / config from static config ────────────────────────────────

const DEFAULT_COPY   = getActiveCohortCopy()
const DEFAULT_CONFIG = getActiveCohortConfig()

// ─── Types ────────────────────────────────────────────────────────────────────

interface Cohort {
  id: number
  name: string
  slug: string
  year: number
  country: string
  city: string
  venueCity: string
  applicationOpenDate: string | null
  applicationCloseDate: string | null
  fellowshipStartDate: string | null
  inPersonStartDate: string | null
  inPersonEndDate: string | null
  mentorshipDurationText: string
  status: string
  contributionAmount: number
  contributionCurrency: string
  contributionLabel: string
  contributionDescription: string | null
  transportationCovered: boolean
  accommodationCovered: boolean
  // Age eligibility
  ageMin: number | null
  ageMax: number | null
  // Program content
  fellowshipBulletsJson: string | null
  passItOnTitle: string | null
  passItOnParagraph: string | null
  passItOnBulletsJson: string | null
  contributionFullTitle: string | null
  contributionFullParagraph: string | null
  // Eligibility
  eligibilityPointsJson: string | null
  beforeYouApplyJson: string | null
  // Essays
  essay1Title: string | null
  essay1Prompt: string | null
  essay2Title: string | null
  essay2Prompt: string | null
  passItOnEssayTitle: string | null
  passItOnEssayPrompt: string | null
  // Declaration
  declarationCheckboxesJson: string | null
  // Copy overrides
  introCopy: string | null
  eligibilityCopy: string | null
  logisticsCopy: string | null
  _count?: { applications: number }
}

const EMPTY_COHORT: Omit<Cohort, 'id' | '_count'> = {
  name: '',
  slug: '',
  year: new Date().getFullYear(),
  country: 'Cameroon',
  city: 'Buea',
  venueCity: 'Buea',
  applicationOpenDate: null,
  applicationCloseDate: null,
  fellowshipStartDate: null,
  inPersonStartDate: null,
  inPersonEndDate: null,
  mentorshipDurationText: '4 months',
  status: 'upcoming',
  contributionAmount: 10000,
  contributionCurrency: 'FCFA',
  contributionLabel: 'Commitment Contribution',
  contributionDescription: null,
  transportationCovered: false,
  accommodationCovered: false,
  ageMin: null,
  ageMax: null,
  fellowshipBulletsJson: null,
  passItOnTitle: null,
  passItOnParagraph: null,
  passItOnBulletsJson: null,
  contributionFullTitle: null,
  contributionFullParagraph: null,
  eligibilityPointsJson: null,
  beforeYouApplyJson: null,
  essay1Title: null,
  essay1Prompt: null,
  essay2Title: null,
  essay2Prompt: null,
  passItOnEssayTitle: null,
  passItOnEssayPrompt: null,
  declarationCheckboxesJson: null,
  introCopy: null,
  eligibilityCopy: null,
  logisticsCopy: null,
}

// ─── Helpers for JSON array fields ────────────────────────────────────────────

/** JSON string → newline-separated text (for textarea display) */
function jsonToLines(json: string | null, fallback: string[]): string {
  if (!json) return fallback.join('\n')
  try { return (JSON.parse(json) as string[]).join('\n') } catch { return fallback.join('\n') }
}

/** Newline-separated text → JSON string (for DB save) */
function linesToJson(text: string): string {
  return JSON.stringify(text.split('\n').map((s) => s.trim()).filter(Boolean))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FellowshipSettingsPage() {
  const { status } = useSession()
  const router = useRouter()
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [selected, setSelected] = useState<Cohort | null>(null)
  const [form, setForm] = useState<Omit<Cohort, 'id' | '_count'>>(EMPTY_COHORT)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') fetchCohorts()
  }, [status])

  const fetchCohorts = () => {
    setIsLoading(true)
    fetch('/api/fellowship/cohorts')
      .then((r) => r.json())
      .then((data) => {
        setCohorts(data)
        if (data.length > 0 && !selected) selectCohort(data[0])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const selectCohort = (c: Cohort) => {
    setSelected(c)
    setIsCreating(false)
    const { id: _id, _count: _c, ...rest } = c
    setForm(rest)
  }

  const startCreate = () => {
    setSelected(null)
    setIsCreating(true)
    setForm({ ...EMPTY_COHORT })
  }

  const f = <K extends keyof typeof form>(key: K) =>
    (v: (typeof form)[K]) => setForm((prev) => ({ ...prev, [key]: v }))

  const save = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    try {
      let res: Response
      if (isCreating) {
        res = await fetch('/api/fellowship/cohorts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else if (selected) {
        res = await fetch(`/api/fellowship/cohorts/${selected.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else return
      if (!res.ok) throw new Error()
      setSaveStatus('saved')
      await fetchCohorts()
      setIsCreating(false)
    } catch {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fellowship Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage cohorts, form questions, essay prompts, and all application content</p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Cohort
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Cohort list */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1">Cohorts</p>
          {cohorts.length === 0 && (
            <p className="text-sm text-gray-400 px-1">No cohorts yet.</p>
          )}
          {cohorts.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCohort(c)}
              className={`w-full text-left px-3 py-3 rounded-xl border text-sm transition-all ${
                selected?.id === c.id && !isCreating
                  ? 'border-primary-500 bg-primary-500/5 text-gray-900 dark:text-white'
                  : 'border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500 mt-0.5 capitalize">{c.status} · {c._count?.applications ?? 0} apps</div>
            </button>
          ))}
          {isCreating && (
            <div className="px-3 py-3 rounded-xl border border-primary-500 bg-primary-500/5 text-sm text-gray-900 dark:text-white">
              <div className="font-medium">{form.name || 'New Cohort'}</div>
              <div className="text-xs text-gray-500 mt-0.5">Creating…</div>
            </div>
          )}
        </div>

        {/* Edit form — multiple cards, each with its own Save button */}
        <div className="lg:col-span-3 space-y-5">

          {/* ── 1. Basic Information, Dates, Age, Contribution ── */}
          <Section icon={<Settings className="w-4 h-4" />} title={isCreating ? 'New Cohort' : 'Basic Settings'}>
            <Fieldset title="Basic Information">
              <Row2>
                <LabeledInput label="Cohort Name *" value={form.name} onChange={f('name')} placeholder="e.g. Cameroon Cohort 2027" />
                <LabeledInput label="Slug *" value={form.slug} onChange={f('slug')} placeholder="e.g. cameroon-2027" hint="URL-safe, unique identifier" />
              </Row2>
              <Row2>
                <LabeledInput label="Year" type="number" value={String(form.year)} onChange={(v) => f('year')(parseInt(v))} />
                <LabeledSelect
                  label="Status"
                  value={form.status}
                  onChange={f('status')}
                  options={[
                    { value: 'upcoming', label: 'Upcoming' },
                    { value: 'open', label: 'Open' },
                    { value: 'closed', label: 'Closed' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                />
              </Row2>
              <Row2>
                <LabeledInput label="Country" value={form.country} onChange={f('country')} />
                <LabeledInput label="Venue City" value={form.venueCity} onChange={f('venueCity')} />
              </Row2>
            </Fieldset>

            <Fieldset title="Dates">
              <Row2>
                <LabeledInput label="Application Opens" type="datetime-local" value={form.applicationOpenDate?.slice(0, 16) || ''} onChange={(v) => f('applicationOpenDate')(v || null)} />
                <LabeledInput label="Application Closes" type="datetime-local" value={form.applicationCloseDate?.slice(0, 16) || ''} onChange={(v) => f('applicationCloseDate')(v || null)} />
              </Row2>
              <Row2>
                <LabeledInput label="In-Person Start" type="date" value={form.inPersonStartDate?.slice(0, 10) || ''} onChange={(v) => f('inPersonStartDate')(v || null)} />
                <LabeledInput label="In-Person End" type="date" value={form.inPersonEndDate?.slice(0, 10) || ''} onChange={(v) => f('inPersonEndDate')(v || null)} />
              </Row2>
              <LabeledInput label="Mentorship Duration Text" value={form.mentorshipDurationText} onChange={f('mentorshipDurationText')} placeholder="e.g. 4 months" />
            </Fieldset>

            <Fieldset title="Age Eligibility">
              <Row2>
                <LabeledInput label="Minimum Age" type="number" value={form.ageMin != null ? String(form.ageMin) : ''} onChange={(v) => f('ageMin')(v ? parseInt(v) : null)} placeholder={`Default: ${DEFAULT_CONFIG.ageMin}`} />
                <LabeledInput label="Maximum Age" type="number" value={form.ageMax != null ? String(form.ageMax) : ''} onChange={(v) => f('ageMax')(v ? parseInt(v) : null)} placeholder={`Default: ${DEFAULT_CONFIG.ageMax}`} />
              </Row2>
            </Fieldset>

            <Fieldset title="Contribution">
              <Row2>
                <LabeledInput label="Contribution Amount" type="number" value={String(form.contributionAmount)} onChange={(v) => f('contributionAmount')(parseInt(v))} />
                <LabeledInput label="Currency" value={form.contributionCurrency} onChange={f('contributionCurrency')} placeholder="FCFA" />
              </Row2>
              <LabeledInput label="Contribution Label" value={form.contributionLabel} onChange={f('contributionLabel')} placeholder="Commitment Contribution" />
              <LabeledTextarea label="Contribution Description" value={form.contributionDescription || ''} onChange={(v) => f('contributionDescription')(v || null)} rows={3} />
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={form.transportationCovered} onChange={(e) => f('transportationCovered')(e.target.checked)} className="accent-primary-500" />
                  Transportation covered
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={form.accommodationCovered} onChange={(e) => f('accommodationCovered')(e.target.checked)} className="accent-primary-500" />
                  Accommodation covered
                </label>
              </div>
              <LabeledInput label="Contribution Step Title" value={form.contributionFullTitle || ''} onChange={(v) => f('contributionFullTitle')(v || null)} placeholder={`Default: ${DEFAULT_COPY.contributionFullTitle}`} hint="Shown at the top of the Contribution step (Step 8)" />
              <LabeledTextarea label="Contribution Step Paragraph" value={form.contributionFullParagraph || ''} onChange={(v) => f('contributionFullParagraph')(v || null)} rows={3} placeholder={`Default: ${DEFAULT_COPY.contributionFullParagraph}`} />
            </Fieldset>
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

          {/* ── 2. Program Description ── */}
          <Section icon={<FileText className="w-4 h-4" />} title="Program Description">
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              These appear on the fellowship landing page and application intro screens.
              Leave blank to keep the built-in defaults.
            </p>
            <Fieldset title="What the Fellowship Includes (Step 1 intro bullets)">
              <LabeledListTextarea
                label="Fellowship Bullets — one per line"
                value={jsonToLines(form.fellowshipBulletsJson, DEFAULT_COPY.fellowshipBullets)}
                onChange={(v) => f('fellowshipBulletsJson')(v.trim() ? linesToJson(v) : null)}
                rows={4}
                placeholder={DEFAULT_COPY.fellowshipBullets.join('\n')}
              />
            </Fieldset>
            <Fieldset title="Pass It On Section (Step 5)">
              <LabeledInput label="Pass It On Title" value={form.passItOnTitle || ''} onChange={(v) => f('passItOnTitle')(v || null)} placeholder={`Default: ${DEFAULT_COPY.passItOnTitle}`} />
              <LabeledTextarea label="Pass It On Paragraph" value={form.passItOnParagraph || ''} onChange={(v) => f('passItOnParagraph')(v || null)} rows={3} placeholder={`Default: ${DEFAULT_COPY.passItOnParagraph}`} />
              <LabeledListTextarea
                label="Pass It On Bullets — one per line"
                value={jsonToLines(form.passItOnBulletsJson, DEFAULT_COPY.passItOnBullets)}
                onChange={(v) => f('passItOnBulletsJson')(v.trim() ? linesToJson(v) : null)}
                rows={4}
                placeholder={DEFAULT_COPY.passItOnBullets.join('\n')}
              />
            </Fieldset>
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

          {/* ── 3. Eligibility & Requirements ── */}
          <Section icon={<Shield className="w-4 h-4" />} title="Eligibility & Requirements">
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Shown on the Before You Apply screen (Step 2). One requirement per line.
            </p>
            <Fieldset title="Eligibility Criteria">
              <LabeledListTextarea
                label="Eligibility Points — one per line"
                value={jsonToLines(form.eligibilityPointsJson, DEFAULT_COPY.eligibilityPoints)}
                onChange={(v) => f('eligibilityPointsJson')(v.trim() ? linesToJson(v) : null)}
                rows={6}
                placeholder={DEFAULT_COPY.eligibilityPoints.join('\n')}
              />
            </Fieldset>
            <Fieldset title="Before You Apply">
              <LabeledListTextarea
                label="Before You Apply Points — one per line"
                value={jsonToLines(form.beforeYouApplyJson, DEFAULT_COPY.beforeYouApplyPoints)}
                onChange={(v) => f('beforeYouApplyJson')(v.trim() ? linesToJson(v) : null)}
                rows={5}
                placeholder={DEFAULT_COPY.beforeYouApplyPoints.join('\n')}
              />
            </Fieldset>
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

          {/* ── 4. Essay Prompts ── */}
          <Section icon={<ScrollText className="w-4 h-4" />} title="Essay Prompts">
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              These are the essay questions shown to applicants. Editing here changes what applicants see on the form.
            </p>
            <Fieldset title="Essay 1 — Steps 6 · 200-word limit">
              <LabeledInput label="Essay 1 Title" value={form.essay1Title || ''} onChange={(v) => f('essay1Title')(v || null)} placeholder={`Default: ${DEFAULT_COPY.essay1Title}`} />
              <LabeledTextarea label="Essay 1 Prompt" value={form.essay1Prompt || ''} onChange={(v) => f('essay1Prompt')(v || null)} rows={5} placeholder={`Default:\n${DEFAULT_COPY.essay1Prompt}`} />
            </Fieldset>
            <Fieldset title="Essay 2 — Step 7 · 200-word limit">
              <LabeledInput label="Essay 2 Title" value={form.essay2Title || ''} onChange={(v) => f('essay2Title')(v || null)} placeholder={`Default: ${DEFAULT_COPY.essay2Title}`} />
              <LabeledTextarea label="Essay 2 Prompt" value={form.essay2Prompt || ''} onChange={(v) => f('essay2Prompt')(v || null)} rows={5} placeholder={`Default:\n${DEFAULT_COPY.essay2Prompt}`} />
            </Fieldset>
            <Fieldset title="Pass It On Essay — Step 8 · 150-word limit">
              <LabeledInput label="Pass It On Essay Title" value={form.passItOnEssayTitle || ''} onChange={(v) => f('passItOnEssayTitle')(v || null)} placeholder={`Default: ${DEFAULT_COPY.passItOnEssayTitle}`} />
              <LabeledTextarea label="Pass It On Essay Prompt" value={form.passItOnEssayPrompt || ''} onChange={(v) => f('passItOnEssayPrompt')(v || null)} rows={5} placeholder={`Default:\n${DEFAULT_COPY.passItOnEssayPrompt}`} />
            </Fieldset>
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

          {/* ── 5. Declaration Checkboxes ── */}
          <Section icon={<ClipboardList className="w-4 h-4" />} title="Declaration Checkboxes">
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              These are the confirmation statements applicants must tick before submitting (Step 9).
              One statement per line.
            </p>
            <LabeledListTextarea
              label="Declaration Statements — one per line"
              value={jsonToLines(form.declarationCheckboxesJson, DEFAULT_COPY.declarationCheckboxes)}
              onChange={(v) => f('declarationCheckboxesJson')(v.trim() ? linesToJson(v) : null)}
              rows={8}
              placeholder={DEFAULT_COPY.declarationCheckboxes.join('\n')}
            />
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

          {/* ── 6. Copy Overrides ── */}
          <Section icon={<Users2 className="w-4 h-4" />} title="Copy Overrides (optional)">
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Free-text overrides for the intro, eligibility summary, and logistics note shown on the application page header. Leave blank to use built-in defaults.
            </p>
            <LabeledTextarea label="Intro Copy" value={form.introCopy || ''} onChange={(v) => f('introCopy')(v || null)} rows={4} placeholder="Override default intro text…" />
            <LabeledTextarea label="Eligibility Copy" value={form.eligibilityCopy || ''} onChange={(v) => f('eligibilityCopy')(v || null)} rows={4} placeholder="Override default eligibility criteria…" />
            <LabeledTextarea label="Logistics Copy" value={form.logisticsCopy || ''} onChange={(v) => f('logisticsCopy')(v || null)} rows={3} placeholder="Override default logistics text…" />
            <SaveBar isSaving={isSaving} saveStatus={saveStatus} isCreating={isCreating} formName={form.name} formSlug={form.slug} onSave={save} />
          </Section>

        </div>
      </div>
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-6 space-y-5">
      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 pb-2 border-b border-gray-100 dark:border-dark-800">
        {icon}
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      {children}
    </div>
  )
}

// ─── Save bar ─────────────────────────────────────────────────────────────────

function SaveBar({ isSaving, saveStatus, isCreating, formName, formSlug, onSave }: {
  isSaving: boolean
  saveStatus: 'idle' | 'saved' | 'error'
  isCreating: boolean
  formName: string
  formSlug: string
  onSave: () => void
}) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-800">
      <span className="text-xs">
        {saveStatus === 'saved' && (
          <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3 h-3" /> Saved</span>
        )}
        {saveStatus === 'error' && (
          <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-3 h-3" /> Failed to save</span>
        )}
      </span>
      <button
        onClick={onSave}
        disabled={isSaving || !formName || !formSlug}
        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isCreating ? 'Create Cohort' : 'Save Changes'}
      </button>
    </div>
  )
}

// ─── Field helpers ────────────────────────────────────────────────────────────

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-dark-800 pb-1">{title}</h3>
      {children}
    </div>
  )
}

function Row2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

function LabeledInput({ label, value, onChange, type = 'text', placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; hint?: string
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
      />
    </div>
  )
}

function LabeledSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function LabeledTextarea({ label, value, onChange, rows = 3, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none"
      />
    </div>
  )
}

/** Textarea for JSON-array fields — shows current items, one per line */
function LabeledListTextarea({ label, value, onChange, rows = 4, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <p className="text-xs text-gray-400">Each line becomes one bullet / item. Blank lines are ignored.</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 font-mono resize-y"
      />
    </div>
  )
}

