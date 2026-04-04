/**
 * fellowship.ts — Shared TypeScript types for the fellowship application system.
 */

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'shortlisted'
  | 'interview'
  | 'accepted'
  | 'rejected'

export type FinalRecommendation =
  | 'pending'
  | 'shortlist'
  | 'interview'
  | 'accepted'
  | 'rejected'

export type CohortStatus = 'upcoming' | 'open' | 'closed' | 'archived'

// ─── Application Form Data ─────────────────────────────────────────────────

/** All form fields, keyed exactly as they are stored. */
export interface ApplicationFormData {
  // Step 2 – Personal Information
  fullName: string
  dateOfBirth: string              // ISO date string "YYYY-MM-DD"
  age: number | null
  gender: string
  email: string
  phone: string
  // Location
  country: string
  region: string
  cityTown: string
  // Background
  currentStatus: string            // Student | Graduate | Entrepreneur | Other
  schoolOrganization: string

  // Step 3 – Logistics
  canAttendBuea: string            // 'yes' | 'no'
  bueaAccommodationStatus: string
  canCommitFourMonths: string      // 'yes' | 'no'

  // Step 4 – Short responses
  hasCurrentInitiative: string     // 'yes' | 'no'
  initiativeSummary: string
  impactArea: string
  hasLedInitiative: string         // 'yes' | 'no'
  ledInitiativeSummary: string

  // Step 5 – Essay 1
  essayLeadership: string

  // Step 6 – Essay 2
  essayCommunityProblem: string

  // Step 7 – Pass It On
  passItOnResponse: string

  // Step 8 – Commitment
  contributionWilling: string      // 'yes' | 'no'
  contributionExplanation: string

  // Step 9 – Declaration
  motivationOneSentence: string
  declareAttendBuea: boolean
  declareTransportAccom: boolean
  declareCommitProgram: boolean
  declareCompetitiveProc: boolean
  declareActiveParticip: boolean
}

export const EMPTY_FORM: ApplicationFormData = {
  fullName: '',
  dateOfBirth: '',
  age: null,
  gender: '',
  email: '',
  phone: '',
  country: 'Cameroon',
  region: '',
  cityTown: '',
  currentStatus: '',
  schoolOrganization: '',
  canAttendBuea: '',
  bueaAccommodationStatus: '',
  canCommitFourMonths: '',
  hasCurrentInitiative: '',
  initiativeSummary: '',
  impactArea: '',
  hasLedInitiative: '',
  ledInitiativeSummary: '',
  essayLeadership: '',
  essayCommunityProblem: '',
  passItOnResponse: '',
  contributionWilling: '',
  contributionExplanation: '',
  motivationOneSentence: '',
  declareAttendBuea: false,
  declareTransportAccom: false,
  declareCommitProgram: false,
  declareCompetitiveProc: false,
  declareActiveParticip: false,
}

// ─── Admin / Review Types ──────────────────────────────────────────────────

export interface ReviewScores {
  scoreCommitmentAvailability: number  // max 20
  scoreLeadershipInitiative: number    // max 20
  scoreProblemAwareness: number        // max 20
  scoreClarityComm: number             // max 15
  scoreExecutionPotential: number      // max 15
  scorePassItOn: number                // max 10
}

export const SCORE_CATEGORIES: Array<{
  key: keyof ReviewScores
  label: string
  max: number
}> = [
  { key: 'scoreCommitmentAvailability', label: 'Commitment & Availability', max: 20 },
  { key: 'scoreLeadershipInitiative', label: 'Leadership & Initiative', max: 20 },
  { key: 'scoreProblemAwareness', label: 'Problem Awareness & Community Insight', max: 20 },
  { key: 'scoreClarityComm', label: 'Clarity & Communication', max: 15 },
  { key: 'scoreExecutionPotential', label: 'Execution Potential', max: 15 },
  { key: 'scorePassItOn', label: 'Pass It On Alignment', max: 10 },
]

// ─── API Response Shape ────────────────────────────────────────────────────

export interface FellowshipApplicationRecord {
  id: string
  cohortId: number
  status: ApplicationStatus
  fullName: string | null
  email: string | null
  phone: string | null
  region: string | null
  cityTown: string | null
  impactArea: string | null
  progressStep: number
  isSubmitted: boolean
  submittedAt: string | null
  createdAt: string
  updatedAt: string
  cohort?: { name: string; slug: string }
  review?: {
    totalScore: number
    finalRecommendation: FinalRecommendation
  } | null
}
