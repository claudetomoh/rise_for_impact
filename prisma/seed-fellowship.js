const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const cohort = await prisma.fellowshipCohort.upsert({
        where: { slug: 'cameroon-2026' },
        update: {},
        create: {
            slug: 'cameroon-2026',
            name: 'RISE for Impact Fellowship — Cameroon Cohort 2026',
            year: 2026,
            country: 'Cameroon',
            city: 'Yaoundé',
            venueCity: 'Yaoundé',
            status: 'open',
            applicationOpenDate: new Date('2026-04-15T00:00:00.000Z'),
            applicationCloseDate: new Date('2026-05-31T23:59:59.000Z'),
            inPersonStartDate: new Date('2026-07-20T00:00:00.000Z'),
            inPersonEndDate: new Date('2026-07-25T00:00:00.000Z'),
            contributionAmount: 10000,
            contributionCurrency: 'FCFA',
            contributionDescription: 'A one-time commitment contribution of 10,000 FCFA is required upon acceptance to cover materials, facilitation, and community resources for the duration of the program.',
        },
    })
    console.log('✅ Fellowship cohort seeded:', cohort.id, '-', cohort.slug)
}

main()
    .catch((e) => { console.error('❌ Error:', e.message);
        process.exit(1) })
    .finally(() => prisma.$disconnect())