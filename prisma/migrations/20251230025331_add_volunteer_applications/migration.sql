-- CreateTable
CREATE TABLE "volunteer_applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "city" TEXT,
    "role" TEXT NOT NULL,
    "experience" TEXT,
    "skills" TEXT,
    "availability" TEXT,
    "portfolio" TEXT,
    "linkedin" TEXT,
    "why_volunteer" TEXT,
    "what_can_offer" TEXT,
    "previous_work" TEXT,
    "heard_from" TEXT,
    "additional_info" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
