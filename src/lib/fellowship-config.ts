/**
 * fellowship-config.ts
 *
 * Single source of truth for all cohort-specific copy, dates, and settings.
 * To create a new cohort, add a new entry to COHORTS and change ACTIVE_COHORT_SLUG.
 */

export interface CohortConfig {
  slug: string
  name: string
  year: number
  country: string
  city: string
  venueCity: string
  applicationCloseDate: string      // human-readable, e.g. "30 April 2026"
  inPersonDates: string             // e.g. "12–13 June 2026"
  mentorshipDuration: string        // e.g. "4 months"
  contributionAmount: number
  contributionCurrency: string
  contributionCoverageItems: string[]
  participantResponsibilities: string[]
  ageMin: number
  ageMax: number
}

export interface CohortCopy {
  introTitle: string
  introParagraph: string
  fellowshipBullets: string[]
  participantExpectations: string[]
  passItOnTitle: string
  passItOnParagraph: string
  passItOnBullets: string[]
  softContributionLine: string       // shown early — no amount
  logisticsTitle: string
  logisticsParagraph: string
  eligibilityTitle: string
  eligibilityPoints: string[]
  beforeYouApplyTitle: string
  beforeYouApplyPoints: string[]
  contributionFullTitle: string      // shown at step 8
  contributionFullParagraph: string
  declarationCheckboxes: string[]
  essay1Title: string
  essay1Prompt: string
  essay2Title: string
  essay2Prompt: string
  passItOnEssayTitle: string
  passItOnEssayPrompt: string
}

// ─── 2026 Cameroon Cohort Config ──────────────────────────────────────────────

const CAMEROON_2026_CONFIG: CohortConfig = {
  slug: 'cameroon-2026',
  name: 'Cameroon Cohort 2026',
  year: 2026,
  country: 'Cameroon',
  city: 'Buea',
  venueCity: 'Buea',
  applicationCloseDate: '30 April 2026',
  inPersonDates: 'June 2026 (exact dates TBC)',
  mentorshipDuration: '4 months',
  contributionAmount: 10000,
  contributionCurrency: 'FCFA',
  contributionCoverageItems: [
    'feeding during the 2-day in-person experience',
    'fellowship t-shirt',
    'workshop and learning materials',
  ],
  participantResponsibilities: ['transportation', 'accommodation, if applicable'],
  ageMin: 16,
  ageMax: 30,
}

// ─── 2026 Cameroon Cohort Copy ────────────────────────────────────────────────

const CAMEROON_2026_COPY: CohortCopy = {
  introTitle: 'Rise for Impact Fellowship — Cameroon Cohort 2026',
  introParagraph:
    'The Rise for Impact Fellowship is a structured leadership and impact development program designed to equip young people with the skills, mindset, and support needed to create meaningful change in their communities.',
  fellowshipBullets: [
    'a 2-day in-person experience in Buea',
    'a 4-month mentorship and development journey',
    'a strong focus on real-world impact and community engagement',
  ],
  participantExpectations: [
    'Develop leadership capacity',
    'Gain clarity on their direction',
    'Build ideas into actionable initiatives',
    'Apply what they learn within their communities',
  ],
  passItOnTitle: 'Fellowship Requirement — Pass It On',
  passItOnParagraph:
    'All fellows are required to participate in a Pass It On initiative. This is a mandatory component of the program.',
  passItOnBullets: [
    'Organise a knowledge-sharing or community impact session',
    'Share what they have learned',
    'Extend the impact of the fellowship to others',
  ],
  softContributionLine:
    'This is a funded fellowship. Selected participants will be required to make a commitment contribution.',
  logisticsTitle: 'Participation & Logistics',
  logisticsParagraph:
    'The in-person session will take place in Buea, Cameroon. Participants are responsible for transportation and accommodation, if applicable. Applicants should ensure they are able to make the necessary arrangements to attend.',
  eligibilityTitle: 'Eligibility Criteria',
  eligibilityPoints: [
    'Be between 16 and 30 years old',
    'Be based in Cameroon for this cohort',
    'Be available for the 2-day in-person session and 4-month mentorship',
    'Demonstrate interest in leadership, personal development, or community impact',
    'Be willing to actively participate and complete the fellowship',
  ],
  beforeYouApplyTitle: 'Before You Apply',
  beforeYouApplyPoints: [
    'This is a competitive selection process',
    'Only shortlisted candidates will be contacted',
    'Incomplete applications will not be considered',
    'Thoughtful and honest responses are required',
  ],
  // Step 8 — full contribution details
  contributionFullTitle: 'Participation Commitment',
  contributionFullParagraph:
    'The Rise for Impact Fellowship is a funded program. Selected participants are required to make a commitment contribution of 10,000 FCFA.',
  declarationCheckboxes: [
    'I confirm that I can attend the in-person session in Buea',
    'I understand I am responsible for my transportation and accommodation',
    'I can commit to the 4-month mentorship program',
    'I understand this is a competitive selection process',
    'I am willing to actively participate in all fellowship activities',
  ],
  essay1Title: 'Leadership & Initiative',
  essay1Prompt:
    'Describe a moment where you took initiative, showed leadership, or made a decision that had an impact.\n\nWhat did you do, what challenges did you face, and what did you learn?',
  essay2Title: 'Impact & Problem Solving',
  essay2Prompt:
    'Identify a problem in your community that matters to you.\n\nExplain why it is important and how you would approach creating change or contributing to a solution.',
  passItOnEssayTitle: 'Community Impact',
  passItOnEssayPrompt:
    'The fellowship includes a mandatory Pass It On team project.\n\nHow would you contribute to organising a session that shares knowledge or creates impact in your community?',
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const COHORT_CONFIGS: Record<string, CohortConfig> = {
  'cameroon-2026': CAMEROON_2026_CONFIG,
}

export const COHORT_COPY: Record<string, CohortCopy> = {
  'cameroon-2026': CAMEROON_2026_COPY,
}

/** Change this to switch which cohort powers the public /apply page */
export const ACTIVE_COHORT_SLUG = 'cameroon-2026'

export function getActiveCohortConfig(): CohortConfig {
  return COHORT_CONFIGS[ACTIVE_COHORT_SLUG]
}

export function getActiveCohortCopy(): CohortCopy {
  return COHORT_COPY[ACTIVE_COHORT_SLUG]
}
