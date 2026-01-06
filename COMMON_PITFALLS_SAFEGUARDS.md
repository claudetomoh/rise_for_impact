# Common Pitfalls - Implementation & Safeguards

This document outlines the safeguards implemented to prevent common development pitfalls in the Rise for Impact codebase.

## ✅ Implemented Safeguards

### 1. Prisma Singleton Pattern

**Pitfall**: Creating multiple PrismaClient instances leads to connection pool exhaustion.

**Solution**: Centralized singleton pattern with comprehensive documentation.

**Files**:
- [`src/lib/prisma.ts`](../src/lib/prisma.ts) - Enhanced with JSDoc comments and type safety
- Fixed violations in:
  - `src/app/api/admin/reset-password/route.ts`
  - `src/app/api/admin/forgot-password/route.ts`

**Usage**:
```typescript
// ✅ Correct
import { prisma } from '@/lib/prisma'
const users = await prisma.user.findMany()

// ❌ Wrong
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

---

### 2. Environment Variable Validation

**Pitfall**: Missing or invalid environment variables cause runtime errors in production.

**Solution**: Zod-based validation with descriptive error messages at application startup.

**File**: [`src/lib/env.ts`](../src/lib/env.ts)

**Features**:
- Validates all required environment variables
- Provides type-safe access to env vars
- Throws descriptive errors before app starts
- Validates formats (URLs, email addresses, API key patterns)

**Usage**:
```typescript
import { env, isProduction, isDevelopment } from '@/lib/env'

// Type-safe access
const apiKey = env.RESEND_API_KEY
const dbUrl = env.DATABASE_URL

if (isProduction) {
  // Production-only code
}
```

**Required Variables**:
- `DATABASE_URL` - PostgreSQL pooled connection
- `DIRECT_URL` - PostgreSQL direct connection
- `NEXTAUTH_SECRET` - Must be 32+ characters
- `NEXTAUTH_URL` - Valid URL
- `RESEND_API_KEY` - Must start with "re_"
- `CONTACT_EMAIL` - Valid email address

---

### 3. Server vs Client Component Mixing

**Pitfall**: Using hooks or browser APIs in server components causes errors.

**Solution**: Helper functions and documentation for safe client/server code.

**File**: [`src/lib/component-guards.ts`](../src/lib/component-guards.ts)

**Utilities**:
- `assertClientComponent()` - Throws error if called on server
- `isServer()` / `isClient()` - Check execution context
- `safeWindow()` / `safeDocument()` - Safe browser API access
- Type guards: `ClientComponent<P>`, `ServerComponent<P>`

**Example**:
```tsx
'use client' // Required for client-side logic

import { assertClientComponent } from '@/lib/component-guards'

export function MyComponent() {
  assertClientComponent() // Validates at runtime
  const [state, setState] = useState(0)
  return <div>{state}</div>
}
```

---

### 4. File Upload Constraints

**Pitfall**: Unvalidated uploads allow malicious files and DOS attacks.

**Solution**: Centralized validation with security checks.

**File**: [`src/lib/file-validation.ts`](../src/lib/file-validation.ts)

**Features**:
- Type validation (MIME type + extension matching)
- Size validation (10MB max)
- Safe filename generation (prevents path traversal)
- Format helpers for user feedback

**Constraints**:
- **Max Size**: 10MB
- **Allowed Types**: JPEG, JPG, PNG, GIF, WEBP
- **Security**: Extension must match MIME type
- **Safe Filenames**: Timestamp prefix + sanitized name

**Usage**:
```typescript
import { validateFile, generateSafeFilename } from '@/lib/file-validation'

const validation = validateFile(file)
if (!validation.success) {
  return NextResponse.json({ error: validation.error }, { status: 400 })
}

const safeName = generateSafeFilename(file.name)
// Returns: "1704567890123_my-photo.jpg"
```

**Updated Routes**:
- [`src/app/api/upload/route.ts`](../src/app/api/upload/route.ts) - Now uses centralized validation

---

## Verification Checklist

Use this checklist when adding new features:

### Database Operations
- [ ] Importing `prisma` from `@/lib/prisma`?
- [ ] Never using `new PrismaClient()`?
- [ ] Wrapping DB calls in try-catch blocks?

### Environment Variables
- [ ] Using `env` from `@/lib/env` instead of `process.env`?
- [ ] Added new vars to validation schema?
- [ ] Updated `.env.example`?

### Components
- [ ] Added `'use client'` for hooks/events?
- [ ] Using `safeWindow()` for browser APIs?
- [ ] Not mixing server and client logic?

### File Uploads
- [ ] Using `validateFile()` before processing?
- [ ] Using `generateSafeFilename()` for storage?
- [ ] Enforcing size and type limits?

---

## Testing Safeguards

### Test Prisma Singleton
```bash
# Search for violations
grep -r "new PrismaClient" src/
# Should only appear in src/lib/prisma.ts
```

### Test Environment Validation
```bash
# Start app with missing env var
# Should fail with descriptive error
npm run dev
```

### Test File Upload
```bash
# Try uploading:
# - File > 10MB (should fail)
# - .exe file (should fail)
# - .jpg with .txt extension (should fail)
```

---

## Future Improvements

Consider adding:
- [ ] Rate limiting per user (currently per IP)
- [ ] File virus scanning integration
- [ ] Database query performance monitoring
- [ ] Automated security scanning in CI/CD
- [ ] TypeScript strict mode enforcement

---

## Resources

- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Next.js Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [OWASP File Upload Security](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [Zod Validation Documentation](https://zod.dev/)
