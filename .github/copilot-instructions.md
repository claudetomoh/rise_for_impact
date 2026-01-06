# Rise for Impact - AI Coding Agent Instructions

## Project Overview
Rise for Impact is a **production-deployed** Next.js 16 full-stack application for a pan-African youth-led organization. Built with TypeScript, Prisma ORM (PostgreSQL), NextAuth.js authentication, and Framer Motion animations. **Deployed on Vercel** with analytics and speed insights enabled.

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 16 (App Router) with TypeScript
- **Database**: PostgreSQL with Prisma ORM (pooled + direct connections)
- **Auth**: NextAuth.js v4 with JWT + credentials provider
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for all UI animations
- **State**: Client-side React hooks (useState, useEffect) - **no Zustand or React Query**
- **Email**: Resend API for notifications & confirmations
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Vercel Analytics + Speed Insights
- **SEO**: Auto-generated sitemap.xml and robots.txt

### Project Structure
```
src/
├── app/              # Next.js App Router
│   ├── api/         # REST API routes (17 endpoints)
│   │   ├── admin/   # Admin-specific routes
│   │   ├── blogs/   # Blog CRUD operations
│   │   ├── opportunities/ # Opportunities management
│   │   ├── volunteers/    # Volunteer applications
│   │   ├── newsletter/    # Email subscriptions
│   │   ├── upload/        # Image upload handler
│   │   └── search/        # Global search endpoint
│   ├── admin/       # Protected admin dashboard
│   │   ├── login/   # Admin authentication
│   │   ├── dashboard/ # Stats & overview
│   │   ├── blogs/   # Blog management with rich media
│   │   ├── opportunities/ # Opportunity management
│   │   └── volunteers/ # Application reviews
│   └── [pages]/     # Public pages (blog, programs, etc.)
├── components/
│   ├── sections/    # Page sections (hero, programs, team, etc.)
│   ├── ui/          # Reusable UI components (17+ components)
│   │   ├── global-search.tsx  # Cmd+K search modal
│   │   ├── share-buttons.tsx  # Social sharing
│   │   ├── theme-toggle.tsx   # Dark mode switcher
│   │   └── image-upload.tsx   # File upload with preview
│   ├── animations/  # Motion wrapper components
│   │   ├── motion-wrappers.tsx # FadeIn, SlideIn, etc.
│   │   └── parallax-background.tsx # Scroll effects
│   ├── effects/     # Visual effects (particles, magnetic, etc.)
│   └── layout/      # Layout components (navbar, footer)
├── lib/             # Utilities and configs
│   ├── auth.ts      # NextAuth configuration
│   ├── prisma.ts    # Prisma singleton (dev/prod aware)
│   ├── email-notifications.ts  # Resend email functions
│   └── utils.ts     # cn() helper for Tailwind
├── types/           # TypeScript type definitions
└── styles/          # Global CSS
```

## Database Models (Prisma)

### Core Models
- `Program` - Climate action programs with application tracking
- `Opportunity` - External opportunities (scholarships, grants, etc.)
- `BlogPost` - Blog articles with **rich media galleries** (JSON-stored)
- `TeamMember` - Team members (executives, board, coordinators)
- `MediaAsset` - Media hub content
- `Application` - General application submissions
- `VolunteerApplication` - Detailed volunteer applications
- `NewsletterSubscriber` - Email list with active status
- `Admin` - Admin accounts with password reset tokens

### Critical Naming Convention
**Always use snake_case for DB columns** (mapped with `@map()` in schema):
```typescript
// ✅ Correct
applicationUrl String? @map("application_url")
createdAt DateTime @map("created_at")

// ❌ Wrong - will cause DB errors
applicationUrl String?
createdAt DateTime
```

### Blog Media Gallery Structure
Blog posts support JSON-stored media galleries:
```typescript
interface MediaItem {
  id: string          // Timestamp-based ID
  type: 'image' | 'video'
  url: string         // File path or YouTube/Vimeo URL
  caption?: string
}
// Stored as: mediaGallery String? @map("media_gallery")
```

## API Routes Patterns

### Authentication Check Pattern
All admin endpoints must verify session:
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... rest of handler
}
```

### Standard API Response Format
```typescript
// Success
return NextResponse.json(data)

// Error
return NextResponse.json(
  { error: 'Error message' },
  { status: 400 }
)
```

### Query Parameters Pattern
Use `searchParams` for filters (see [opportunities/route.ts](src/app/api/opportunities/route.ts)):
```typescript
const { searchParams } = new URL(request.url)
const activeOnly = searchParams.get('activeOnly') === 'true'
const featuredOnly = searchParams.get('featuredOnly') === 'true'

const where: any = {}
if (activeOnly) where.isActive = true
if (featuredOnly) where.isFeatured = true
```

### Form Validation with Zod
API endpoints use Zod for validation:
```typescript
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
})

const body = await request.json()
const validation = newsletterSchema.safeParse(body)
if (!validation.success) {
  return NextResponse.json(
    { error: validation.error.errors[0].message },
    { status: 400 }
  )
}
```

## Component Conventions

### Animation Wrappers
Use pre-built motion wrappers from [animations/motion-wrappers.tsx](src/components/animations/motion-wrappers.tsx):
- `<FadeIn>` - Fade in effect
- `<SlideIn direction="up|down|left|right">` - Slide animations  
- `<ScaleIn>` - Scale animations
- `<StaggerContainer>` + `<StaggerItem>` - Sequential animations

**Never create raw `motion` components**—always use these wrappers.

### Client Components
All interactive components need `'use client'` directive at top. This includes:
- Components using hooks (useState, useEffect, etc.)
- Framer Motion animations
- Event handlers (onClick, onChange, etc.)

### Icon Usage
Use `lucide-react` for all icons. Common imports:
```typescript
import { ArrowRight, Sparkles, Globe, Users, Check } from 'lucide-react'
```

## Authentication & Admin Routes

### Admin Login Credentials
- Email: `admin@riseforimpact.org`
- Password: `admin123`
- Login page: `/admin/login`

### Protected Routes
Admin routes in `src/app/admin/*` use NextAuth session checks. Middleware at [middleware.ts](src/middleware.ts) handles rate limiting (60 req/min).

## Email Notifications

Email functions in [email-notifications.ts](src/lib/email-notifications.ts) using Resend API:
- `sendEmail()` - Send single/batch emails
- `notifySubscribersNewBlog()` - Notify newsletter subscribers
- `sendApplicationConfirmation()` - Applicant confirmations

**Always call notification functions after DB operations** (e.g., new applications, blog posts).

## Styling Guidelines

### Color System
Use semantic colors from [tailwind.config.ts](tailwind.config.ts):
- `primary-*` - Primary brand colors (browns/oranges)
- `accent-*` - Accent colors (oranges)
- `dark-*` - Dark mode grays
- Avoid hardcoded hex colors—use Tailwind classes

### Responsive Design
Mobile-first approach with breakpoints:
```tsx
<div className="text-sm md:text-base lg:text-lg">
```

### Dark Mode
Theme switching via `next-themes`. Use `dark:` prefix:
```tsx
<div className="bg-white dark:bg-gray-900">
```

## Development Commands

```bash
# Development
npm run dev              # Start dev server (port 3005)

# Database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database
npm run db:push          # Push schema changes

# Build
npm run build            # Production build
npm run start            # Production server

# Type checking
npm run type-check       # TypeScript validation
```

## Common Pitfalls

**⚠️ See [COMMON_PITFALLS_SAFEGUARDS.md](../COMMON_PITFALLS_SAFEGUARDS.md) for detailed implementation**

1. **Prisma Client**: Always import from `@/lib/prisma`, never instantiate new `PrismaClient()`
   - ✅ Fixed violations in reset-password and forgot-password routes
   - 📝 Enhanced with JSDoc and type safety
   
2. **Environment Variables**: Use validated `env` from `@/lib/env`, not raw `process.env`
   - ✅ Zod validation at startup catches missing/invalid vars
   - ✅ Type-safe access with descriptive error messages
   
3. **API Error Handling**: Wrap all DB operations in try-catch with proper error responses
   
4. **Image Optimization**: Use Next.js `<Image>` component, not `<img>` (except backgrounds)
   
5. **Server/Client Components**: Use helpers from `@/lib/component-guards`
   - `assertClientComponent()` - Runtime validation
   - `safeWindow()` / `safeDocument()` - Safe browser API access
   
6. **File Uploads**: Use utilities from `@/lib/file-validation`
   - `validateFile()` - Type, size, and security validation
   - `generateSafeFilename()` - Prevents path traversal
   - Max 10MB, allowed types: jpeg, jpg, png, gif, webp

## Deployment & Production

### Environment Variables
Required in production (see [.env.example](.env.example)):
```bash
DATABASE_URL="postgresql://..."     # Pooled connection
DIRECT_URL="postgresql://..."       # Direct connection for migrations
NEXTAUTH_SECRET="..."               # Generate with: openssl rand -base64 32
NEXTAUTH_URL="https://riseforimpact.org"
RESEND_API_KEY="re_..."            # From resend.com
CONTACT_EMAIL="info@riseforimpact.org"
```

### Build Process
```bash
npm run build  # Runs: prisma generate → prisma migrate deploy → next build
```

### Vercel Deployment
- **Auto-deployed** from `main` branch
- Analytics & Speed Insights enabled (see [layout.tsx](src/app/layout.tsx))
- Environment variables configured in Vercel dashboard
- Console logs removed in production (see [next.config.js](next.config.js))

### Production Features
- SEO: Auto-generated `sitemap.xml` and `robots.txt` (see [sitemap.ts](src/app/sitemap.ts))
- PWA: Installable with `manifest.json` in [public/manifest.json](public/manifest.json)
- Rate limiting: 60 requests/min per IP (see [middleware.ts](src/middleware.ts))
- Security headers: X-Frame-Options, X-Content-Type-Options, etc.
- Email notifications: Background tasks via Resend API (don't block responses)

## Key Features Reference

### Global Search (Cmd+K)
Modal search across blogs, programs, team - see [global-search.tsx](src/components/ui/global-search.tsx)

### Rich Media Blogs
Supports image/video galleries stored as JSON - see [BLOG_DEVELOPER_GUIDE.md](BLOG_DEVELOPER_GUIDE.md)

### Email Notifications
All email functions use Resend - see [email-notifications.ts](src/lib/email-notifications.ts):
- Newsletter subscriptions
- Blog post announcements
- Application confirmations
- Contact form submissions

### File Upload System
Admin uploads go to `/public/uploads/` with validation - see [upload/route.ts](src/app/api/upload/route.ts)

## Key Files Reference
- Auth config: [lib/auth.ts](src/lib/auth.ts)
- Prisma singleton: [lib/prisma.ts](src/lib/prisma.ts) ⚠️ **Never instantiate PrismaClient directly**
- Environment validation: [lib/env.ts](src/lib/env.ts) - Use this for env vars
- File upload validation: [lib/file-validation.ts](src/lib/file-validation.ts)
- Component guards: [lib/component-guards.ts](src/lib/component-guards.ts)
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma)
- API examples: [api/opportunities/route.ts](src/app/api/opportunities/route.ts)
- Component patterns: [sections/hero.tsx](src/components/sections/hero.tsx)
- Email templates: [lib/email-notifications.ts](src/lib/email-notifications.ts)

## Testing New Features
1. Start dev server: `npm run dev`
2. Open Prisma Studio: `npm run db:studio` (verify data)
3. Test admin features: Login at `/admin/login`
4. Check email logs in console (Resend API responses)
