'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, Save, Plus, RefreshCw, CheckCircle2, AlertCircle, Settings } from 'lucide-react'

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
  introCopy: null,
  eligibilityCopy: null,
  logisticsCopy: null,
}

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
        if (data.length > 0 && !selected) {
          selectCohort(data[0])
        }
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

  const field = <K extends keyof typeof form>(key: K) => (
    (v: (typeof form)[K]) => setForm((prev) => ({ ...prev, [key]: v }))
  )

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fellowship Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage cohorts and application settings</p>
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
            <p className="text-sm text-gray-400 px-1">No cohorts yet. Create one to get started.</p>
          )}
          {cohorts.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCohort(c)}
              className={`w-full text-left px-3 py-3 rounded-xl border text-sm transition-all ${
                selected?.id === c.id && !isCreating
                  ? 'border-primary-500 bg-primary-500/5 text-gray-900 dark:text-white'
                  : 'border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-dark-600'
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

        {/* Edit form */}
        <div className="lg:col-span-3 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Settings className="w-4 h-4" />
            <h2 className="text-sm font-bold">{isCreating ? 'New Cohort' : 'Edit Cohort'}</h2>
          </div>

          {/* Basic */}
          <Fieldset title="Basic Information">
            <Row2>
              <LabeledInput label="Cohort Name *" value={form.name} onChange={(v) => field('name')(v)} placeholder="e.g. Cameroon Cohort 2027" />
              <LabeledInput label="Slug *" value={form.slug} onChange={(v) => field('slug')(v)} placeholder="e.g. cameroon-2027" hint="URL-safe, unique identifier" />
            </Row2>
            <Row2>
              <LabeledInput label="Year" type="number" value={String(form.year)} onChange={(v) => field('year')(parseInt(v))} />
              <LabeledSelect
                label="Status"
                value={form.status}
                onChange={(v) => field('status')(v)}
                options={[
                  { value: 'upcoming', label: 'Upcoming' },
                  { value: 'open', label: 'Open' },
                  { value: 'closed', label: 'Closed' },
                  { value: 'archived', label: 'Archived' },
                ]}
              />
            </Row2>
            <Row2>
              <LabeledInput label="Country" value={form.country} onChange={(v) => field('country')(v)} />
              <LabeledInput label="Venue City" value={form.venueCity} onChange={(v) => field('venueCity')(v)} />
            </Row2>
          </Fieldset>

          {/* Dates */}
          <Fieldset title="Dates">
            <Row2>
              <LabeledInput label="Application Opens" type="datetime-local" value={form.applicationOpenDate?.slice(0, 16) || ''} onChange={(v) => field('applicationOpenDate')(v || null)} />
              <LabeledInput label="Application Closes" type="datetime-local" value={form.applicationCloseDate?.slice(0, 16) || ''} onChange={(v) => field('applicationCloseDate')(v || null)} />
            </Row2>
            <Row2>
              <LabeledInput label="In-Person Start" type="date" value={form.inPersonStartDate?.slice(0, 10) || ''} onChange={(v) => field('inPersonStartDate')(v || null)} />
              <LabeledInput label="In-Person End" type="date" value={form.inPersonEndDate?.slice(0, 10) || ''} onChange={(v) => field('inPersonEndDate')(v || null)} />
            </Row2>
            <LabeledInput label="Mentorship Duration Text" value={form.mentorshipDurationText} onChange={(v) => field('mentorshipDurationText')(v)} placeholder="e.g. 4 months" />
          </Fieldset>

          {/* Contribution */}
          <Fieldset title="Contribution">
            <Row2>
              <LabeledInput label="Contribution Amount" type="number" value={String(form.contributionAmount)} onChange={(v) => field('contributionAmount')(parseInt(v))} />
              <LabeledInput label="Currency" value={form.contributionCurrency} onChange={(v) => field('contributionCurrency')(v)} placeholder="FCFA" />
            </Row2>
            <LabeledInput label="Contribution Label" value={form.contributionLabel} onChange={(v) => field('contributionLabel')(v)} placeholder="Commitment Contribution" />
            <LabeledTextarea label="Contribution Description (optional)" value={form.contributionDescription || ''} onChange={(v) => field('contributionDescription')(v || null)} rows={3} />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.transportationCovered} onChange={(e) => field('transportationCovered')(e.target.checked)} className="accent-primary-500" />
                Transportation covered
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.accommodationCovered} onChange={(e) => field('accommodationCovered')(e.target.checked)} className="accent-primary-500" />
                Accommodation covered
              </label>
            </div>
          </Fieldset>

          {/* Copy overrides */}
          <Fieldset title="Copy Overrides (optional)">
            <LabeledTextarea label="Intro Copy" value={form.introCopy || ''} onChange={(v) => field('introCopy')(v || null)} rows={4} placeholder="Override default intro text…" />
            <LabeledTextarea label="Eligibility Copy" value={form.eligibilityCopy || ''} onChange={(v) => field('eligibilityCopy')(v || null)} rows={4} placeholder="Override default eligibility criteria…" />
            <LabeledTextarea label="Logistics Copy" value={form.logisticsCopy || ''} onChange={(v) => field('logisticsCopy')(v || null)} rows={3} placeholder="Override default logistics text…" />
          </Fieldset>

          {/* Save */}
          <div className="flex items-center justify-between pt-2">
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1.5 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" /> Saved
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center gap-1.5 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" /> Failed to save
              </span>
            )}
            {saveStatus === 'idle' && <span />}

            <button
              onClick={save}
              disabled={isSaving || !form.name || !form.slug}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isCreating ? 'Create Cohort' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Local helpers ─────────────────────────────────────────────────────────

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

function LabeledInput({
  label, value, onChange, type = 'text', placeholder, hint,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; hint?: string }) {
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

function LabeledSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
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

function LabeledTextarea({
  label, value, onChange, rows = 3, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
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

