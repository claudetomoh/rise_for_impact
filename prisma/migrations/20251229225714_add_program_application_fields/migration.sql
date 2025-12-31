-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_programs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "short_desc" TEXT,
    "long_desc" TEXT,
    "description" TEXT,
    "location" TEXT,
    "status" TEXT DEFAULT 'active',
    "applications_open" BOOLEAN NOT NULL DEFAULT false,
    "application_url" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "participants" INTEGER,
    "focus" TEXT,
    "duration" TEXT,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_programs" ("created_at", "duration", "focus", "id", "image", "long_desc", "short_desc", "title") SELECT "created_at", "duration", "focus", "id", "image", "long_desc", "short_desc", "title" FROM "programs";
DROP TABLE "programs";
ALTER TABLE "new_programs" RENAME TO "programs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
