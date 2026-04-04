'use client'

/**
 * DownloadGuideButton
 *
 * Generates and downloads a comprehensive, branded PDF guide for the
 * Rise for Impact Fellowship application. The PDF covers:
 *   – Fellowship overview & why it exists
 *   – Three-phase program structure
 *   – What participants gain
 *   – Eligibility criteria & who should apply
 *   – Key logistics, dates, and contribution details
 *   – Full preview of all 9 application steps / questions
 *
 * Uses jsPDF (already in the project dependencies).
 */

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DownloadGuideButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

// ─── Colour palette (RGB) ─────────────────────────────────────────────────────

const C = {
  PRIMARY:    [22, 163, 74]   as [number, number, number],  // green-600
  PRIMARY_LT: [220, 252, 231] as [number, number, number],  // green-100
  ACCENT:     [217, 119, 6]   as [number, number, number],  // amber-600
  ACCENT_LT:  [254, 243, 199] as [number, number, number],  // amber-100
  DARK:       [15, 23, 42]    as [number, number, number],  // slate-950
  DARK2:      [30, 41, 59]    as [number, number, number],  // slate-800
  MID:        [71, 85, 105]   as [number, number, number],  // slate-600
  LIGHT:      [148, 163, 184] as [number, number, number],  // slate-400
  BG:         [248, 250, 252] as [number, number, number],  // slate-50
  WHITE:      [255, 255, 255] as [number, number, number],
  PHASE1:     [22,  163,  74] as [number, number, number],  // green
  PHASE2:     [217, 119,   6] as [number, number, number],  // amber
  PHASE3:     [5,  150, 105]  as [number, number, number],  // emerald
}

const PAGE_W = 210
const PAGE_H = 297
const M = 18           // margin
const CW = PAGE_W - M * 2   // content width (174)

// ─── Helper ───────────────────────────────────────────────────────────────────

function loadLogoBase64(): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('no canvas')); return }
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/jpeg'))
    }
    img.onerror = reject
    img.src = '/images/logo.jpeg'
  })
}

// ─── Main generator ───────────────────────────────────────────────────────────

async function generatePDF() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  let logoB64: string | null = null
  try { logoB64 = await loadLogoBase64() } catch { /* proceed without logo */ }

  let pageNum = 0

  // ── Shared utilities ──────────────────────────────────────────────────────

  const newPage = () => {
    if (pageNum > 0) doc.addPage()
    pageNum++
  }

  /** Persistent header on pages 2+ */
  const addRunningHeader = () => {
    doc.setFillColor(...C.DARK)
    doc.rect(0, 0, PAGE_W, 11, 'F')
    if (logoB64) {
      try { doc.addImage(logoB64, 'JPEG', M, 3, 6, 6, undefined, 'FAST') } catch { /* */ }
    }
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text('RISE FOR IMPACT FELLOWSHIP', M + 8, 7.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.LIGHT)
    doc.text('Application Guide — Cameroon Cohort 2026', M + 60, 7.5)
    doc.setTextColor(...C.LIGHT)
    doc.text(`Page ${pageNum}`, PAGE_W - M, 7.5, { align: 'right' })
  }

  /** Footer */
  const addFooter = () => {
    doc.setFillColor(...C.BG)
    doc.rect(0, PAGE_H - 8, PAGE_W, 8, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.LIGHT)
    doc.text('riseforimpact.org  •  info@riseforimpact.org', PAGE_W / 2, PAGE_H - 3, { align: 'center' })
  }

  /** Section heading bar */
  const sectionBar = (label: string, y: number, color: [number, number, number] = C.PRIMARY) => {
    doc.setFillColor(...color)
    doc.rect(M, y, CW, 8, 'F')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(label.toUpperCase(), M + 4, y + 5.3)
    return y + 8
  }

  /** Wrapped body text; returns new Y */
  const bodyText = (text: string, x: number, y: number, opts?: {
    maxWidth?: number; color?: [number, number, number]; size?: number; style?: string
  }) => {
    const maxW = opts?.maxWidth ?? CW
    const size = opts?.size ?? 9.5
    const color = opts?.color ?? C.DARK2
    const style = opts?.style ?? 'normal'
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, maxW) as string[]
    doc.text(lines, x, y)
    return y + lines.length * (size * 0.37) + 1
  }

  /** Bullet item; returns new Y */
  const bullet = (text: string, y: number, indent = 0, color: [number, number, number] = C.PRIMARY) => {
    const bx = M + indent + 1
    const tx = bx + 5
    doc.setFillColor(...color)
    doc.circle(bx + 1.2, y - 1, 1.2, 'F')
    doc.setFontSize(9.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK2)
    const lines = doc.splitTextToSize(text, CW - indent - 6) as string[]
    doc.text(lines, tx, y)
    return y + lines.length * 3.5 + 1.5
  }

  /** Horizontal rule */
  const rule = (y: number, color: [number, number, number] = C.BG) => {
    doc.setDrawColor(...color)
    doc.setLineWidth(0.3)
    doc.line(M, y, M + CW, y)
    return y + 3
  }

  /** Labelled info row (key: value) */
  const infoRow = (label: string, value: string, y: number) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.MID)
    doc.text(label, M, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK)
    doc.text(value, M + 35, y)
    return y + 5.5
  }

  /** Question block for application preview */
  const questionBlock = (
    label: string,
    question: string,
    y: number,
    noteLines = 4,
    hint?: string,
  ): number => {
    if (y > PAGE_H - 45) {
      addFooter()
      newPage()
      addRunningHeader()
      y = 18
    }
    // label
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.PRIMARY)
    doc.text(label, M, y)
    y += 4

    // question text
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.DARK)
    const qLines = doc.splitTextToSize(question, CW) as string[]
    doc.text(qLines, M, y)
    y += qLines.length * 3.7 + 2

    if (hint) {
      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(...C.MID)
      const hLines = doc.splitTextToSize(hint, CW) as string[]
      doc.text(hLines, M, y)
      y += hLines.length * 3 + 2
    }

    // note lines
    for (let i = 0; i < noteLines; i++) {
      doc.setDrawColor(200, 210, 220)
      doc.setLineWidth(0.2)
      doc.line(M, y, M + CW, y)
      y += 6
    }
    return y + 3
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 1 — COVER
  // ════════════════════════════════════════════════════════════════════════════
  newPage()

  // Top hero band
  doc.setFillColor(...C.DARK)
  doc.rect(0, 0, PAGE_W, 80, 'F')

  // Green accent stripe
  doc.setFillColor(...C.PRIMARY)
  doc.rect(0, 78, PAGE_W, 3, 'F')

  // Logo
  if (logoB64) {
    try {
      doc.addImage(logoB64, 'JPEG', M, 14, 24, 24, undefined, 'FAST')
    } catch { /* */ }
  }

  // Tagline badge
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M + 29, 14, 55, 7, 2, 2, 'F')
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('COHORT 1  ·  CAMEROON  ·  2026', M + 31, 18.8)

  // Main title
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('RISE FOR IMPACT', M, 53)
  doc.setFontSize(26)
  doc.text('FELLOWSHIP', M, 63)

  // Subtitle
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.PRIMARY_LT)
  doc.text('Application Guide & Program Overview', M, 73)

  // White content area
  doc.setFillColor(...C.WHITE)
  doc.rect(0, 83, PAGE_W, PAGE_H - 83, 'F')

  // Info box
  doc.setFillColor(...C.BG)
  doc.roundedRect(M, 90, CW, 46, 4, 4, 'F')
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, 90, 3, 46, 1, 1, 'F')

  let y = 97
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.PRIMARY)
  doc.text('IMPORTANT DATES', M + 7, y)
  y += 6

  y = infoRow('Applications open:', 'April 15, 2026', y + 1)
  y = infoRow('Applications close:', '30 April 2026', y)
  y = infoRow('Program location:', 'Buea, Cameroon', y)
  y = infoRow('In-person dates:', 'June 2026 (TBC)', y)
  y = infoRow('Program duration:', '~5 months (kick-off + 4 months mentorship)', y)
  y = infoRow('Eligibility:', 'Ages 16–30, based in Cameroon', y)

  // What this guide covers
  y = 145
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('What this guide contains', M, y)
  y += 8

  const guideContents = [
    'Full fellowship overview — what it is and why it was created',
    'Program structure across three phases',
    'What participants are expected to gain',
    'Eligibility criteria and who should apply',
    'Logistics, commitment contribution, and key expectations',
    'A complete preview of all 9 application steps and questions',
  ]
  guideContents.forEach(item => {
    y = bullet(item, y, 0, C.PRIMARY)
  })

  y += 4
  doc.setFillColor(...C.ACCENT_LT)
  doc.roundedRect(M, y, CW, 14, 3, 3, 'F')
  doc.setFillColor(...C.ACCENT)
  doc.roundedRect(M, y, 3, 14, 1, 1, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.ACCENT)
  doc.text('Tip:', M + 7, y + 5.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  doc.text(
    'Read the full guide and draft your essay responses before starting your online application.',
    M + 17, y + 5.5,
    { maxWidth: CW - 22 }
  )
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.MID)
  doc.text('Your answers must be written directly in the application form.', M + 7, y + 11)

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 2 — ABOUT THE FELLOWSHIP
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('01  About the Fellowship', y) + 7

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('What is the Rise for Impact Fellowship?', M, y)
  y += 8

  y = bodyText(
    'The Rise for Impact Fellowship is a structured leadership and impact development program designed to equip young people with the skills, mindset, and support needed to create meaningful change in their communities.',
    M, y, { size: 10 }
  ) + 3

  y = bodyText(
    'A fellowship is not just a training program. It is a guided experience that combines learning, mentorship, and real-world application. Fellows are expected to develop an idea, build a project, lead something, and account for it — not just complete modules and collect a certificate.',
    M, y, { size: 10 }
  ) + 5

  // What it includes box
  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 28, 3, 3, 'F')
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, y, 3, 28, 1, 1, 'F')
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.PRIMARY)
  doc.text('THE FELLOWSHIP INCLUDES', M + 7, y + 6)
  let by = y + 12
  const includes = [
    'A 2-day in-person experience in Buea, Cameroon',
    'A 4-month mentorship and guided development journey',
    'A strong focus on real-world impact and community engagement',
  ]
  includes.forEach(item => {
    by = bullet(item, by, 5, C.PRIMARY)
  })
  y += 31

  y = rule(y, C.BG) + 4

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('Why does the fellowship exist?', M, y)
  y += 8

  y = bodyText(
    'Across Africa, many young people have strong ideas and the desire to contribute. But without structured guidance, mentorship, and practical pathways, most of that potential never translates into meaningful action.',
    M, y, { size: 10 }
  ) + 3

  y = bodyText(
    'The fellowship was created to close the gap between aspiration and action — providing a structured pathway from potential to accountable leadership.',
    M, y, { size: 10 }
  ) + 5

  // Gap cards
  const gaps = [
    ['Structured Guidance', 'Develop ideas into action with support at every step'],
    ['Mentorship Access',   'Work with mentors who have real-world experience'],
    ['Practical Skills',    'Build leadership and execution skills through doing, not just learning'],
    ['Accountability',      'Clear checkpoints that make growth visible and measurable'],
  ]
  const cardW = (CW - 5) / 2
  gaps.forEach((g, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const cx = M + col * (cardW + 5)
    const cy = y + row * 22
    doc.setFillColor(...C.BG)
    doc.roundedRect(cx, cy, cardW, 19, 2, 2, 'F')
    doc.setFillColor(...C.PRIMARY)
    doc.roundedRect(cx, cy, cardW, 4, 1, 1, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(g[0], cx + 4, cy + 2.8)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK2)
    const dLines = doc.splitTextToSize(g[1], cardW - 8) as string[]
    doc.text(dLines, cx + 4, cy + 9)
  })
  y += 48

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 3 — PROGRAM STRUCTURE
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('02  Program Structure', y) + 7

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('Three phases, one continuous journey', M, y)
  y += 5
  y = bodyText(
    'The fellowship is structured in three connected phases to ensure depth, continuity, and accountability — not a collection of disconnected events.',
    M, y, { color: C.MID }
  ) + 6

  const phases = [
    {
      num: '01',
      title: 'In-Person Experience',
      tag: 'Kick-off',
      color: C.PHASE1 as [number, number, number],
      items: [
        'Program orientation and foundational leadership sessions',
        'Problem-solving workshops and ideation exercises',
        'Fellows connect and begin shaping their focus areas',
        'Formation of the cohort learning community',
      ],
    },
    {
      num: '02',
      title: 'Mentorship & Guided Development',
      tag: '4 months',
      color: C.PHASE2 as [number, number, number],
      items: [
        'Structured mentorship with assigned guides',
        'Project or initiative development with ongoing feedback',
        'Leadership and execution skills built through practice',
        'Regular accountability checkpoints throughout the journey',
      ],
    },
    {
      num: '03',
      title: 'Application to Real Impact',
      tag: 'Ongoing',
      color: C.PHASE3 as [number, number, number],
      items: [
        'Fellows implement or pilot developed ideas in their communities',
        'Leadership demonstrated in real, documented contexts',
        'Outcomes reviewed against defined goals',
        'Alumni network and continued support after completion',
      ],
    },
  ]

  phases.forEach(phase => {
    const phH = 50
    doc.setFillColor(phase.color[0], phase.color[1], phase.color[2])
    doc.roundedRect(M, y, 14, phH, 2, 2, 'F')
    doc.setFillColor(...C.BG)
    doc.roundedRect(M + 16, y, CW - 16, phH, 2, 2, 'F')

    // Number
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(phase.num, M + 2.5, y + 24, { angle: 0 })

    // Tag
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(phase.tag.toUpperCase(), M + 1, y + 34)

    // Title
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(phase.color[0], phase.color[1], phase.color[2])
    doc.text(phase.title, M + 20, y + 8)

    // Items
    let iy = y + 14
    phase.items.forEach(item => {
      doc.setFontSize(8.5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...C.DARK2)
      doc.circle(M + 22, iy - 1.3, 1, 'F')
      const iLines = doc.splitTextToSize(item, CW - 26) as string[]
      doc.text(iLines, M + 25, iy)
      iy += iLines.length * 3.2 + 2
    })

    y += phH + 5
  })

  // Pass It On
  doc.setFillColor(...C.ACCENT_LT)
  doc.roundedRect(M, y, CW, 32, 3, 3, 'F')
  doc.setFillColor(...C.ACCENT)
  doc.roundedRect(M, y, 3, 32, 1, 1, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.ACCENT)
  doc.text('MANDATORY: PASS IT ON REQUIREMENT', M + 7, y + 7)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  y = bodyText(
    'Every fellow is required to participate in a Pass It On initiative — organising a knowledge-sharing or community impact session to extend the fellowship\'s reach beyond themselves.',
    M + 7, y + 12, { maxWidth: CW - 10, size: 9 }
  )
  y += 12

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 4 — WHAT YOU GAIN  &  WHO SHOULD APPLY
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('03  What Participants Gain', y) + 7

  const gains = [
    ['Leadership Development', C.PHASE1, 'Structured exposure to leadership principles applied in real situations.'],
    ['Practical Skills',       C.PHASE2, 'Project design, communication, problem-solving, and execution skills.'],
    ['Clarity & Direction',    [59, 130, 246] as [number, number, number], 'A clearer picture of personal goals and a defined path forward.'],
    ['Mentorship & Feedback',  [139, 92, 246] as [number, number, number], 'Structured guidance and honest feedback from experienced mentors.'],
    ['Network & Community',    C.PHASE3, 'Connection to peers committed to leadership and positive contribution.'],
    ['Multiplied Reach',       [249, 115, 22] as [number, number, number], 'Support to carry learning beyond yourself into your community.'],
  ]

  const gCardW = (CW - 4) / 3
  gains.forEach((g, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    const gx = M + col * (gCardW + 2)
    const gy = y + row * 28
    const gc = g[1] as [number, number, number]
    doc.setFillColor(...C.BG)
    doc.roundedRect(gx, gy, gCardW, 25, 2, 2, 'F')
    doc.setFillColor(gc[0], gc[1], gc[2])
    doc.rect(gx, gy, gCardW, 5, 'F')
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(g[0] as string, gx + 3, gy + 3.5)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.MID)
    const dLines = doc.splitTextToSize(g[2] as string, gCardW - 6) as string[]
    doc.text(dLines, gx + 3, gy + 10)
  })

  y += 62

  y = rule(y) + 2

  y = sectionBar('04  Who Should Apply', y, C.DARK2) + 7

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('Eligibility Criteria', M, y)
  y += 7

  const eligibility = [
    'Be between 16 and 30 years old',
    'Be based in Cameroon (Cohort 1)',
    'Be available for the 2-day in-person kick-off in Buea and the 4-month mentorship',
    'Demonstrate interest in leadership, personal development, or community impact',
    'Be willing to actively participate and complete all fellowship requirements',
  ]
  eligibility.forEach(e => {
    y = bullet(e, y, 0, C.PRIMARY)
  })

  y += 4

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('Selection Approach', M, y)
  y += 7

  y = bodyText(
    'The fellowship is not selective on the basis of credentials or status. It is selective on the basis of commitment, intention, and readiness to do real work. The program is open to individuals at different experience levels — what matters is demonstrated commitment and willingness to engage seriously.',
    M, y, { size: 10 }
  ) + 6

  // Note box
  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 20, 3, 3, 'F')
  doc.setFillColor(...C.DARK2)
  doc.roundedRect(M, y, 3, 20, 1, 1, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('IMPORTANT NOTES BEFORE APPLYING', M + 7, y + 6)
  const notes = [
    '• This is a competitive selection process — only shortlisted candidates will be contacted',
    '• Incomplete applications will not be reviewed',
    '• Thoughtful, honest responses carry more weight than long answers',
  ]
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  doc.text(notes, M + 7, y + 12)

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 5 — LOGISTICS & KEY DETAILS
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('05  Key Program Details & Logistics', y) + 8

  // Two-column layout
  const colW = (CW - 6) / 2
  const leftX = M
  const rightX = M + colW + 6

  // LEFT — Dates & Location
  doc.setFillColor(...C.BG)
  doc.roundedRect(leftX, y, colW, 52, 3, 3, 'F')
  doc.setFillColor(...C.PRIMARY)
  doc.rect(leftX, y, colW, 8, 'F')
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('DATES & LOCATION', leftX + 4, y + 5.5)
  let ly = y + 14
  const dateInfo: [string, string][] = [
    ['Applications open', 'April 15, 2026'],
    ['Applications close', '30 April 2026'],
    ['In-person kick-off', 'June 2026 (TBC)'],
    ['Mentorship period', '~4 months post-kick-off'],
    ['Location', 'Buea, Cameroon'],
    ['Format', 'In-person + virtual'],
    ['Cohort size', 'Limited intake'],
  ]
  dateInfo.forEach(([label, val]) => {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.MID)
    doc.text(label, leftX + 4, ly)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK)
    doc.text(val, leftX + 4, ly + 4)
    ly += 9
  })

  // RIGHT — Contribution
  doc.setFillColor(...C.BG)
  doc.roundedRect(rightX, y, colW, 52, 3, 3, 'F')
  doc.setFillColor(...C.ACCENT)
  doc.rect(rightX, y, colW, 8, 'F')
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('COMMITMENT CONTRIBUTION', rightX + 4, y + 5.5)
  let ry = y + 14
  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.PRIMARY)
  doc.text('10,000 FCFA', rightX + 4, ry)
  ry += 5
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.MID)
  doc.text('Required from selected participants', rightX + 4, ry)
  ry += 7
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('This covers:', rightX + 4, ry)
  ry += 4
  const covers = ['Feeding during the 2-day session', 'Fellowship t-shirt', 'Workshop materials']
  covers.forEach(c => {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK2)
    doc.circle(rightX + 6, ry - 1.2, 1, 'F')
    doc.text(c, rightX + 9, ry)
    ry += 4.5
  })
  ry += 2
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('You are responsible for:', rightX + 4, ry)
  ry += 4
  const resp = ['Transportation to Buea', 'Accommodation, if applicable']
  resp.forEach(r => {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.MID)
    doc.circle(rightX + 6, ry - 1.2, 1, 'F')
    doc.text(r, rightX + 9, ry)
    ry += 4.5
  })

  y += 58

  // What we expect
  y = sectionBar('What We Expect from Fellows', y, C.DARK2) + 7

  const expectations = [
    'Attend the full 2-day in-person experience in Buea',
    'Commit to the 4-month mentorship journey without dropping out',
    'Actively develop and work on a project, idea, or initiative',
    'Complete all accountability check-ins and reviews',
    'Organise or contribute to a Pass It On session for your community',
    'Maintain honest, open communication with your mentor',
    'Submit a brief account of your Pass It On experience',
  ]
  const col1 = expectations.slice(0, 4)
  const col2 = expectations.slice(4)

  let ey1 = y
  col1.forEach(e => {
    ey1 = bullet(e, ey1, 0, C.PRIMARY)
  })
  y = ey1

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 6 — APPLICATION FORM PREVIEW: intro
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('06  Application Form Preview — All 9 Steps', y, C.DARK) + 8

  // Intro notice
  doc.setFillColor(...C.ACCENT_LT)
  doc.roundedRect(M, y, CW, 22, 3, 3, 'F')
  doc.setFillColor(...C.ACCENT)
  doc.roundedRect(M, y, 3, 22, 1, 1, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.ACCENT)
  doc.text('HOW TO USE THIS SECTION', M + 7, y + 6.5)
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  const usageText = doc.splitTextToSize(
    'The following pages show every question in the online application form before you start. Use the blank lines below each question to draft your answers on paper first. When you are ready, open the online form at riseforimpact.org/programs/fellowship/apply.',
    CW - 12
  ) as string[]
  doc.text(usageText, M + 7, y + 12.5)
  y += 28

  // Save-and-continue note
  doc.setFillColor(...C.PRIMARY_LT)
  doc.roundedRect(M, y, CW, 14, 3, 3, 'F')
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, y, 3, 14, 1, 1, 'F')
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.PRIMARY)
  doc.text('Save & Continue:', M + 7, y + 5.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  doc.text('Your application is saved automatically as you go.', M + 37, y + 5.5)
  doc.setFontSize(8)
  doc.setTextColor(...C.MID)
  doc.text('You can close the browser and return later — your progress will be restored.', M + 7, y + 11)
  y += 20

  // Steps overview table
  const steps = [
    ['Step 1', 'Overview',     'Read the program overview and requirements'],
    ['Step 2', 'Personal',     'Name, date of birth, contact and location details'],
    ['Step 3', 'Logistics',    'In-person session availability and accommodation'],
    ['Step 4', 'Responses',    'Current initiatives, impact area, leadership experience'],
    ['Step 5', 'Essay 1',      'Leadership & Initiative (200 words)'],
    ['Step 6', 'Essay 2',      'Impact & Problem Solving (200 words)'],
    ['Step 7', 'Pass It On',   'Community Impact response (150 words)'],
    ['Step 8', 'Commitment',   'Participation contribution confirmation'],
    ['Step 9', 'Declaration',  'Commitment declaration and final submission'],
  ]

  doc.setFillColor(...C.DARK)
  doc.rect(M, y, CW, 7, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('STEP', M + 3,  y + 4.7)
  doc.text('SECTION',      M + 26, y + 4.7)
  doc.text('DESCRIPTION',  M + 56, y + 4.7)
  y += 7

  steps.forEach((row, i) => {
    const bg = i % 2 === 0 ? C.WHITE : C.BG
    doc.setFillColor(...bg)
    doc.rect(M, y, CW, 7, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.PRIMARY)
    doc.text(row[0], M + 3, y + 4.7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.DARK)
    doc.text(row[1], M + 26, y + 4.7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.MID)
    doc.text(row[2], M + 56, y + 4.7)
    y += 7
  })

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 7 — STEPS 1–3
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  // ── Step 1: Overview ──
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 1  —  Overview', M + 5, y + 6.5)
  y += 13

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.MID)
  doc.text('This step has no form fields. Read the program overview, eligibility, and Pass It On requirement carefully.', M, y, { maxWidth: CW })
  doc.text('Click "Start Application" when you are ready to proceed.', M, y + 6)
  y += 16

  // ── Step 2: Personal Information ──
  doc.setFillColor(...C.DARK2)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 2  —  Personal Information', M + 5, y + 6.5)
  y += 14

  y = questionBlock('Required field', 'Full Name', y, 2)
  y = questionBlock('Required field', 'Date of Birth', y, 2, 'Age is automatically calculated.')
  y = questionBlock('Optional', 'Gender', y, 1, 'Options: Male / Female / Non-binary / Prefer not to say')
  y = questionBlock('Required field', 'Email Address', y, 2)
  y = questionBlock('Required field', 'Phone Number / WhatsApp', y, 2, 'Include country code, e.g. +237 6xx xxx xxx')
  y = questionBlock('Required field', 'Country', y, 1)
  y = questionBlock('Required field', 'Region', y, 1)
  y = questionBlock('Required field', 'City / Town', y, 1)
  y = questionBlock('Required field', 'What best describes you?', y, 1, 'Options: Student / Graduate / Entrepreneur / Other')
  y = questionBlock('Optional', 'Name of School or Organisation', y, 2)

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 8 — STEPS 3–4
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  // ── Step 3: Logistics & Availability ──
  doc.setFillColor(...C.PHASE2)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 3  —  Logistics & Availability', M + 5, y + 6.5)
  y += 14

  y = questionBlock('Required — Yes / No', 'Will you be able to attend the 2-day in-person session in Buea?', y, 2)
  y = questionBlock('Required — Select one', 'What best describes your accommodation situation in Buea?', y, 2,
    'Options: I live in Buea / I have a place to stay / I will make my own arrangements / Not sure yet')
  y = questionBlock('Required — Yes / No', 'Are you able to commit to the full 4-month mentorship program?', y, 2)

  y = rule(y + 3) + 4

  // ── Step 4: Short Responses ──
  doc.setFillColor(...C.PHASE3)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 4  —  Experience & Interests', M + 5, y + 6.5)
  y += 14

  y = questionBlock('Required — Yes / No', 'Do you currently have an idea or initiative you are working on?', y, 3)
  y = questionBlock('If Yes — max 100 words', 'Briefly describe your current idea or initiative.', y, 6,
    'What is it? Who does it serve? Leave blank if not applicable.')
  y = questionBlock('Required — Select one', 'What area are you most interested in creating impact in?', y, 1,
    'Options: Education / Health / Environment / Technology / Community Development / Other')
  y = questionBlock('Required — Yes / No', 'Have you ever led or participated in any initiative or project?', y, 2)
  y = questionBlock('If Yes — max 100 words', 'Briefly explain your past initiative or involvement.', y, 6,
    'What did you do, what was the outcome? Leave blank if not applicable.')

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 9 — ESSAYS (Steps 5–7)
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  // Essay guidance box
  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 18, 3, 3, 'F')
  doc.setFillColor(...C.DARK)
  doc.roundedRect(M, y, 3, 18, 1, 1, 'F')
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('Essay Guidance', M + 7, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  const essayGuidance = doc.splitTextToSize(
    'Be direct, honest, and specific. There is no "right answer" — we are looking for genuine reflection and clear thinking. Stay within the word limits. Focus on quality over length.',
    CW - 12
  ) as string[]
  doc.text(essayGuidance, M + 7, y + 12)
  y += 24

  // ── Step 5: Essay 1 — Leadership & Initiative ──
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 5  —  Essay 1: Leadership & Initiative  (max 200 words)', M + 5, y + 6.5)
  y += 14

  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 16, 2, 2, 'F')
  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  const e1q = doc.splitTextToSize(
    'Describe a moment where you took initiative, showed leadership, or made a decision that had an impact.',
    CW - 6
  ) as string[]
  doc.text(e1q, M + 3, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.MID)
  doc.text('What did you do, what challenges did you face, and what did you learn?', M + 3, y + 12.5)
  y += 20

  // Draft lines
  for (let i = 0; i < 15; i++) {
    doc.setDrawColor(200, 210, 220)
    doc.setLineWidth(0.2)
    doc.line(M, y, M + CW, y)
    y += 6
  }

  y += 5

  // ── Step 6: Essay 2 ──
  doc.setFillColor(...C.DARK2)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 6  —  Essay 2: Impact & Problem Solving  (max 200 words)', M + 5, y + 6.5)
  y += 14

  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 16, 2, 2, 'F')
  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  const e2q = doc.splitTextToSize('Identify a problem in your community that matters to you.', CW - 6) as string[]
  doc.text(e2q, M + 3, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.MID)
  doc.text('Explain why it is important and how you would approach creating change or contributing to a solution.', M + 3, y + 12.5, { maxWidth: CW - 6 })
  y += 20

  for (let i = 0; i < 15; i++) {
    doc.setDrawColor(200, 210, 220)
    doc.setLineWidth(0.2)
    doc.line(M, y, M + CW, y)
    y += 6
  }

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 10 — STEPS 7–9 (Pass It On, Commitment, Declaration)
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  // ── Step 7: Pass It On ──
  doc.setFillColor(249, 115, 22)  // orange
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 7  —  Community Impact: Pass It On  (max 150 words)', M + 5, y + 6.5)
  y += 14

  doc.setFillColor(...C.BG)
  doc.roundedRect(M, y, CW, 20, 2, 2, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(249, 115, 22)
  doc.text('CONTEXT', M + 3, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.DARK2)
  const pitContext = doc.splitTextToSize(
    'The fellowship includes a mandatory Pass It On team project — organising a session to share knowledge or create impact in your community.',
    CW - 6
  ) as string[]
  doc.text(pitContext, M + 3, y + 11)
  y += 24

  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  const p7q = doc.splitTextToSize(
    'How would you contribute to organising a session that shares knowledge or creates impact in your community?',
    CW
  ) as string[]
  doc.text(p7q, M, y)
  y += p7q.length * 4 + 4

  for (let i = 0; i < 10; i++) {
    doc.setDrawColor(200, 210, 220)
    doc.setLineWidth(0.2)
    doc.line(M, y, M + CW, y)
    y += 6
  }

  y += 5

  // ── Step 8: Commitment ──
  doc.setFillColor(...C.PHASE2)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 8  —  Participation Commitment', M + 5, y + 6.5)
  y += 14

  y = questionBlock(
    'Required — Yes / No',
    'If selected, are you willing and able to make the commitment contribution of 10,000 FCFA?',
    y, 2,
    'This covers: feeding during the 2-day session, fellowship t-shirt, workshop materials. You are responsible for transportation and accommodation separately.'
  )
  y = questionBlock('Optional (if No)', 'If you answered No, briefly explain your situation.', y, 4, 'Max 100 words. Will be considered during the review process.')

  y += 4

  // ── Step 9: Declaration ──
  doc.setFillColor(...C.DARK)
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Step 9  —  Commitment Declaration & Final Submission', M + 5, y + 6.5)
  y += 14

  // Checkboxes
  const declarations = [
    'I confirm that I can attend the in-person session in Buea',
    'I understand I am responsible for my transportation and accommodation',
    'I can commit to the full 4-month mentorship program',
    'I understand this is a competitive selection process',
    'I am willing to actively participate in all fellowship activities',
  ]
  declarations.forEach(decl => {
    doc.setDrawColor(...C.MID)
    doc.setLineWidth(0.3)
    doc.rect(M, y - 3.5, 4, 4)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.DARK2)
    const dLines = doc.splitTextToSize(decl, CW - 8) as string[]
    doc.text(dLines, M + 7, y)
    y += dLines.length * 4 + 3
  })

  y += 3
  y = questionBlock(
    'Required — one sentence',
    'In one sentence, what drives you to create impact?',
    y, 3,
    'Write a single clear, honest sentence that captures your motivation.'
  )

  addFooter()

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE 11 — FINAL PAGE
  // ════════════════════════════════════════════════════════════════════════════
  newPage()
  addRunningHeader()
  y = 18

  y = sectionBar('07  Next Steps', y) + 8

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.DARK)
  doc.text('You\'re ready to apply', M, y)
  y += 8

  const nextSteps = [
    ['Draft your essays', 'Use the blank lines in this guide to prepare your responses to all three essay questions (Steps 5, 6, and 7) before starting the online form.'],
    ['Check eligibility', 'Confirm you meet all eligibility criteria: age 16–30, based in Cameroon, and available for the in-person session and 4-month mentorship.'],
    ['Open the application', 'Visit riseforimpact.org/programs/fellowship/apply on or after April 15, 2026 to begin your application.'],
    ['Save your progress', 'Your application is saved automatically as you complete each step. You can close and return at any time before the deadline.'],
    ['Submit before the deadline', 'All applications must be submitted by April 30, 2026. Late or incomplete applications will not be considered.'],
    ['Wait for feedback', 'Only shortlisted candidates will be contacted. There is no need to follow up — we will reach out if you are selected.'],
  ]

  nextSteps.forEach(([title, desc], i) => {
    // Number badge
    doc.setFillColor(...C.PRIMARY)
    doc.circle(M + 4, y - 1.5, 4, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.WHITE)
    doc.text(String(i + 1), M + 4, y + 0.5, { align: 'center' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.DARK)
    doc.text(title, M + 11, y)
    y += 5
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C.MID)
    const dLines = doc.splitTextToSize(desc, CW - 12) as string[]
    doc.text(dLines, M + 11, y)
    y += dLines.length * 3.5 + 6
  })

  // Final call to action
  y += 5
  doc.setFillColor(...C.DARK)
  doc.roundedRect(M, y, CW, 30, 4, 4, 'F')
  doc.setFillColor(...C.PRIMARY)
  doc.roundedRect(M, y, 3, 30, 1, 1, 'F')
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.WHITE)
  doc.text('Rise for Impact Fellowship', M + 9, y + 10)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.PRIMARY_LT)
  doc.text('Applications open April 15, 2026  ·  Close April 30, 2026', M + 9, y + 17)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C.PRIMARY)
  doc.text('riseforimpact.org/programs/fellowship/apply', M + 9, y + 24)

  addFooter()

  // ── Save ──────────────────────────────────────────────────────────────────
  doc.save('RFI-Fellowship-Application-Guide-2026.pdf')
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DownloadGuideButton({ variant = 'primary', size = 'md', className }: DownloadGuideButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      await generatePDF()
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const base =
    variant === 'primary'
      ? 'inline-flex items-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-dark-950 font-semibold transition-all shadow-lg shadow-yellow-500/20'
      : variant === 'secondary'
      ? 'inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold transition-all'
      : 'inline-flex items-center gap-2 rounded-xl border border-yellow-500/40 hover:bg-yellow-500/10 text-yellow-400 font-semibold transition-all'

  const sizeClass = size === 'sm' ? 'px-5 py-2.5 text-sm' : 'px-7 py-3.5 text-sm'

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`${base} ${sizeClass} disabled:opacity-60 ${className ?? ''}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {loading ? 'Generating PDF…' : 'Download Application Guide'}
    </button>
  )
}
