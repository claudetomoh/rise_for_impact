'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ClipboardList,
  User,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  Globe,
  Heart,
  CheckSquare,
  ChevronRight,
  Info,
} from 'lucide-react'

// ─── Question definitions (mirrors the live application form) ─────────────────

const STEPS = [
  {
    number: 1,
    title: 'Overview & Social Follow',
    icon: Info,
    colour: 'bg-blue-100 text-blue-700 border-blue-200',
    badge: 'bg-blue-50 text-blue-600',
    description: 'No form fields on this step. Applicants read the program overview, eligibility criteria, and Pass It On requirement. They must follow Rise for Impact on LinkedIn and/or Facebook before clicking "Start Application".',
    questions: [],
  },
  {
    number: 2,
    title: 'Personal Information',
    icon: User,
    colour: 'bg-violet-100 text-violet-700 border-violet-200',
    badge: 'bg-violet-50 text-violet-600',
    description: 'Basic personal and contact details.',
    questions: [
      { field: 'fullName', label: 'Full Name', type: 'Text input', required: true },
      { field: 'dateOfBirth', label: 'Date of Birth', type: 'Date picker', required: true },
      { field: 'age', label: 'Age', type: 'Auto-calculated from date of birth', required: false },
      { field: 'gender', label: 'Gender', type: 'Dropdown (Male / Female / Non-binary / Prefer not to say)', required: false, note: 'Optional' },
      { field: 'email', label: 'Email Address', type: 'Email input', required: true },
      { field: 'phone', label: 'Phone Number / WhatsApp', type: 'Tel input', required: true },
      { field: 'country', label: 'Country', type: 'Text input', required: true },
      { field: 'region', label: 'Region', type: 'Text input', required: true },
      { field: 'cityTown', label: 'City / Town', type: 'Text input', required: true },
      {
        field: 'currentStatus',
        label: 'What best describes you?',
        type: 'Dropdown',
        required: true,
        options: ['Student', 'Graduate', 'Entrepreneur', 'Other'],
      },
      { field: 'schoolOrganization', label: 'Name of School / Organisation', type: 'Text input', required: false, note: 'Optional' },
    ],
  },
  {
    number: 3,
    title: 'Logistics & Availability',
    icon: Calendar,
    colour: 'bg-amber-100 text-amber-700 border-amber-200',
    badge: 'bg-amber-50 text-amber-600',
    description: 'Confirms the applicant can meet the practical requirements of the fellowship.',
    questions: [
      {
        field: 'canAttendBuea',
        label: 'Will you be able to attend the 2-day in-person session in Buea?',
        type: 'Yes / No',
        required: true,
      },
      {
        field: 'bueaAccommodationStatus',
        label: 'What best describes your accommodation situation in Buea?',
        type: 'Dropdown',
        required: true,
        options: [
          'I currently live in Buea',
          'I have a place to stay in Buea',
          'I will make my own arrangements',
          'I am not sure yet',
        ],
      },
      {
        field: 'canCommitFourMonths',
        label: 'Are you able to commit to the full 4-month mentorship program?',
        type: 'Yes / No',
        required: true,
      },
    ],
  },
  {
    number: 4,
    title: 'Experience & Interests',
    icon: MessageSquare,
    colour: 'bg-teal-100 text-teal-700 border-teal-200',
    badge: 'bg-teal-50 text-teal-600',
    description: 'Short-response questions about the applicant\'s background, interests, and any existing initiatives.',
    questions: [
      {
        field: 'hasCurrentInitiative',
        label: 'Do you currently have an idea or initiative you are working on?',
        type: 'Yes / No',
        required: true,
      },
      {
        field: 'initiativeSummary',
        label: 'Briefly describe it',
        type: 'Short essay — max 100 words',
        required: false,
        note: 'Only shown if "Yes" above. Prompt: "Describe your idea or initiative in a few sentences…"',
      },
      {
        field: 'impactArea',
        label: 'What area are you most interested in creating impact in?',
        type: 'Dropdown',
        required: true,
        options: ['Education', 'Health', 'Environment', 'Technology', 'Community Development', 'Other'],
      },
      {
        field: 'hasLedInitiative',
        label: 'Have you ever led or participated in any initiative or project?',
        type: 'Yes / No',
        required: true,
      },
      {
        field: 'ledInitiativeSummary',
        label: 'Briefly explain',
        type: 'Short essay — max 100 words',
        required: false,
        note: 'Only shown if "Yes" above. Prompt: "What did you do, and what was the outcome?"',
      },
    ],
  },
  {
    number: 5,
    title: 'Essay 1 — Leadership & Initiative',
    icon: FileText,
    colour: 'bg-orange-100 text-orange-700 border-orange-200',
    badge: 'bg-orange-50 text-orange-600',
    description: 'First essay question. Max 200 words.',
    questions: [
      {
        field: 'essayLeadership',
        label: 'Describe a moment where you took initiative, showed leadership, or made a decision that had an impact.',
        subLabel: 'What did you do, what challenges did you face, and what did you learn?',
        type: 'Long essay — max 200 words',
        required: true,
      },
    ],
  },
  {
    number: 6,
    title: 'Essay 2 — Impact & Problem Solving',
    icon: Globe,
    colour: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    badge: 'bg-cyan-50 text-cyan-600',
    description: 'Second essay question. Max 200 words.',
    questions: [
      {
        field: 'essayCommunityProblem',
        label: 'Identify a problem in your community that matters to you.',
        subLabel: 'Explain why it is important and how you would approach creating change or contributing to a solution.',
        type: 'Long essay — max 200 words',
        required: true,
      },
    ],
  },
  {
    number: 7,
    title: 'Community Impact — Pass It On',
    icon: Heart,
    colour: 'bg-rose-100 text-rose-700 border-rose-200',
    badge: 'bg-rose-50 text-rose-600',
    description: 'Essay about the mandatory Pass It On community requirement. Max 150 words.',
    questions: [
      {
        field: 'passItOnResponse',
        label: 'The fellowship includes a mandatory Pass It On team project.',
        subLabel: 'How would you contribute to organising a session that shares knowledge or creates impact in your community?',
        type: 'Essay — max 150 words',
        required: true,
      },
    ],
  },
  {
    number: 8,
    title: 'Participation Commitment',
    icon: MapPin,
    colour: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    badge: 'bg-indigo-50 text-indigo-600',
    description: 'Applicants are told the full details of the 10,000 FCFA commitment contribution and asked if they can make it.',
    questions: [
      {
        field: 'contributionWilling',
        label: 'If selected, are you willing and able to make the commitment contribution of 10,000 FCFA?',
        type: 'Yes / No',
        required: true,
      },
      {
        field: 'contributionExplanation',
        label: 'Please briefly explain your situation',
        type: 'Short essay — max 100 words',
        required: false,
        note: 'Only shown if "No" above. Will be considered during the review process.',
      },
    ],
  },
  {
    number: 9,
    title: 'Commitment Confirmation & Declaration',
    icon: CheckSquare,
    colour: 'bg-green-100 text-green-700 border-green-200',
    badge: 'bg-green-50 text-green-600',
    description: 'Final step. Five declaration checkboxes and a closing motivation sentence.',
    questions: [
      {
        field: 'declareAttendBuea',
        label: 'I confirm that I can attend the in-person session in Buea',
        type: 'Checkbox — required',
        required: true,
      },
      {
        field: 'declareTransportAccom',
        label: 'I understand I am responsible for my transportation and accommodation',
        type: 'Checkbox — required',
        required: true,
      },
      {
        field: 'declareCommitProgram',
        label: 'I can commit to the 4-month mentorship program',
        type: 'Checkbox — required',
        required: true,
      },
      {
        field: 'declareCompetitiveProc',
        label: 'I understand this is a competitive selection process',
        type: 'Checkbox — required',
        required: true,
      },
      {
        field: 'declareActiveParticip',
        label: 'I am willing to actively participate in all fellowship activities',
        type: 'Checkbox — required',
        required: true,
      },
      {
        field: 'motivationOneSentence',
        label: 'In one sentence, what drives you to create impact?',
        type: 'Short text — 1–2 sentences',
        required: true,
      },
    ],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FellowshipQuestionsPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/admin/fellowship/applications"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Applications
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">Form Questions</span>
      </div>

      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
          <ClipboardList className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fellowship Application — Form Questions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Complete reference of every question shown to applicants across all 9 steps.
            Use this alongside individual application reviews.
          </p>
        </div>
      </div>

      {/* Step cards */}
      <div className="space-y-6">
        {STEPS.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.number}
              className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl overflow-hidden"
            >
              {/* Step header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-dark-800">
                <span className="w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.number}
                </span>
                <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                <h2 className="text-sm font-bold text-gray-900 dark:text-white flex-1">{step.title}</h2>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.badge}`}>
                  {step.questions.length === 0 ? 'Info only' : `${step.questions.length} question${step.questions.length !== 1 ? 's' : ''}`}
                </span>
              </div>

              <div className="px-5 py-4">
                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{step.description}</p>

                {/* Questions */}
                {step.questions.length > 0 && (
                  <div className="space-y-3">
                    {step.questions.map((q, qi) => (
                      <div
                        key={q.field}
                        className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-700"
                      >
                        {/* Number */}
                        <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-400 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {qi + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          {/* Label */}
                          <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{q.label}</p>
                          {/* Sub-label (essay prompts) */}
                          {'subLabel' in q && q.subLabel && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed italic">{q.subLabel}</p>
                          )}
                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 font-mono">
                              {q.type}
                            </span>
                            {q.required ? (
                              <span className="text-xs px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/40">
                                Required
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-dark-600">
                                Optional
                              </span>
                            )}
                            <span className="text-xs text-gray-400 dark:text-gray-600 font-mono">field: {q.field}</span>
                          </div>
                          {/* Options */}
                          {'options' in q && q.options && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {q.options.map((opt) => (
                                <span key={opt} className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300">
                                  {opt}
                                </span>
                              ))}
                            </div>
                          )}
                          {/* Note */}
                          {'note' in q && q.note && (
                            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Info className="w-3 h-3 flex-shrink-0" />
                              {q.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        <strong className="text-gray-700 dark:text-gray-300">Note:</strong> These questions are for reference only. To edit the form questions, update{' '}
        <code className="px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded text-xs">src/lib/fellowship-config.ts</code> (for essay prompts and copy) and{' '}
        <code className="px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded text-xs">src/app/programs/fellowship/apply/page.tsx</code> (for form fields).
        Cohort settings (dates, amounts, status) are manageable from the{' '}
        <Link href="/admin/fellowship/settings" className="text-emerald-600 dark:text-emerald-400 underline hover:no-underline">Settings</Link> page.
      </div>
    </div>
  )
}
