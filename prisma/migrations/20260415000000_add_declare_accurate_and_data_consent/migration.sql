-- Add declare_accurate and declare_data_consent columns to fellowship_applications
-- These columns were added to schema.prisma but never applied to the production database.
-- Using IF NOT EXISTS so this is safe to run on databases that already have the columns.

ALTER TABLE "fellowship_applications"
  ADD COLUMN IF NOT EXISTS "declare_accurate" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "fellowship_applications"
  ADD COLUMN IF NOT EXISTS "declare_data_consent" BOOLEAN NOT NULL DEFAULT false;
