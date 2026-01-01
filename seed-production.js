// Force production database connection
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_upQYZghE74bj@ep-patient-hill-ad1ia1f2.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"

// Run the seed file
require('./prisma/seed.js')