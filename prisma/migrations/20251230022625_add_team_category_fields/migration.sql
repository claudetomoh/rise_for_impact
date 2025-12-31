-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team_members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'coordinators',
    "country" TEXT,
    "country_flag" TEXT,
    "focus" TEXT,
    "image" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_team_members" ("bio", "country", "created_at", "focus", "id", "image", "linkedin", "name", "role") SELECT "bio", "country", "created_at", "focus", "id", "image", "linkedin", "name", "role" FROM "team_members";
DROP TABLE "team_members";
ALTER TABLE "new_team_members" RENAME TO "team_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
