-- AlterTable
ALTER TABLE "admins" ADD COLUMN "reset_token" TEXT;
ALTER TABLE "admins" ADD COLUMN "reset_token_expiry" DATETIME;

-- CreateTable
CREATE TABLE "opportunities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organization" TEXT,
    "deadline" TEXT,
    "eligibility" TEXT,
    "benefits" TEXT,
    "apply_link" TEXT NOT NULL,
    "image" TEXT,
    "categories" TEXT,
    "location" TEXT,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
