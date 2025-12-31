# Blog Rich Media - Developer Guide

## Technical Implementation Details

This document provides in-depth technical information about the rich media blog implementation for developers who need to maintain, extend, or integrate with this feature.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Admin Dashboard                       │
│                 /admin/blogs/page.tsx                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Blog List ←→ Create Form ←→ Media Gallery Manager    │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ API Calls
┌─────────────────────────────────────────────────────────┐
│                  API Layer                               │
│            /api/blogs/route.ts                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GET /api/blogs      → Fetch all posts                 │
│  POST /api/blogs     → Create new post                 │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ Prisma ORM
┌─────────────────────────────────────────────────────────┐
│                Database Layer                            │
│              SQLite (dev.db)                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  blog_posts table                                       │
│  ├─ id (INTEGER, PK, AUTO)                             │
│  ├─ title (TEXT)                                       │
│  ├─ excerpt (TEXT)                                     │
│  ├─ content (TEXT) ← NEW                               │
│  ├─ category (TEXT)                                    │
│  ├─ url (TEXT)                                         │
│  ├─ image (TEXT)                                       │
│  ├─ author (TEXT)                                      │
│  ├─ date (TEXT)                                        │
│  ├─ media_gallery (TEXT) ← NEW (JSON string)          │
│  └─ created_at (DATETIME)                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Data Models

### TypeScript Interfaces

```typescript
// Media item in gallery
interface MediaItem {
  id: string          // Timestamp-based unique ID
  type: 'image' | 'video'
  url: string         // File path or video URL
  caption?: string    // Optional descriptive text
}

// Blog post entity
interface BlogPost {
  id: number
  title: string
  excerpt: string
  content?: string           // Full article text
  category: string
  url: string               // External link
  image: string             // Featured image
  author: string
  date: string
  mediaGallery?: MediaItem[] // Parsed from JSON
  createdAt: string
}
```

### Prisma Schema

```prisma
model BlogPost {
  id           Int      @id @default(autoincrement())
  title        String
  excerpt      String?
  content      String?                    // NEW FIELD
  category     String?
  url          String?
  image        String?
  author       String?
  date         String?
  mediaGallery String?  @map("media_gallery")  // NEW FIELD
  createdAt    DateTime @default(now()) @map("created_at")

  @@map("blog_posts")
}
```

### Database Schema (SQLite)

```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,              -- NEW COLUMN
  category TEXT,
  url TEXT,
  image TEXT,
  author TEXT,
  date TEXT,
  media_gallery TEXT,        -- NEW COLUMN (stores JSON)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Component Structure

### Main Component: BlogsManagementPage

**File:** `src/app/admin/blogs/page.tsx`

**State Management:**

```typescript
const [blogs, setBlogs] = useState<BlogPost[]>([])
const [isLoading, setIsLoading] = useState(true)
const [showForm, setShowForm] = useState(false)

// Media gallery state
const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([])
const [newMediaUrl, setNewMediaUrl] = useState('')
const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image')
const [newMediaCaption, setNewMediaCaption] = useState('')

// Form data
const [formData, setFormData] = useState({
  title: '',
  excerpt: '',
  category: '',
  url: '',
  image: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  content: '',
})
```

---

## Key Functions

### 1. Media Management

#### Adding Media Items

```typescript
const addMediaItem = () => {
  if (!newMediaUrl.trim()) return
  
  const newItem: MediaItem = {
    id: Date.now().toString(),  // Unique timestamp-based ID
    type: newMediaType,
    url: newMediaUrl,
    caption: newMediaCaption || undefined,
  }
  
  setMediaGallery([...mediaGallery, newItem])
  
  // Reset form
  setNewMediaUrl('')
  setNewMediaCaption('')
}
```

#### Removing Media Items

```typescript
const removeMediaItem = (id: string) => {
  setMediaGallery(mediaGallery.filter(item => item.id !== id))
}
```

#### Video URL Conversion

```typescript
const getVideoEmbedUrl = (url: string): string => {
  // YouTube standard URL
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // YouTube short URL
  else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // Vimeo URL
  else if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${videoId}`
  }
  
  return url
}
```

---

### 2. Form Submission

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        // Convert media gallery to JSON string
        mediaGallery: mediaGallery.length > 0 
          ? JSON.stringify(mediaGallery) 
          : null,
      }),
    })

    if (response.ok) {
      // Reset form and gallery
      setFormData({
        title: '',
        excerpt: '',
        category: '',
        url: '',
        image: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
      })
      setMediaGallery([])
      setShowForm(false)
      fetchBlogs()
    }
  } catch (error) {
    console.error('Error creating blog:', error)
  }
}
```

---

### 3. Gallery Display Logic

```typescript
{mediaGallery.length > 0 && (
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {mediaGallery.map((media) => (
      <div key={media.id} className="relative group border rounded-lg">
        {/* Image Preview */}
        {media.type === 'image' ? (
          <div className="aspect-video relative">
            <img
              src={media.url}
              alt={media.caption || 'Gallery image'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          /* Video Embed */
          <div className="aspect-video relative bg-black">
            <iframe
              src={getVideoEmbedUrl(media.url)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        
        {/* Caption */}
        {media.caption && (
          <p className="px-2 py-1 text-xs text-gray-600">
            {media.caption}
          </p>
        )}
        
        {/* Delete Button */}
        <button
          type="button"
          onClick={() => removeMediaItem(media.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        >
          ✕
        </button>
        
        {/* Type Badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs">
          {media.type === 'image' ? '📷 Image' : '🎥 Video'}
        </div>
      </div>
    ))}
  </div>
)}
```

---

### 4. Blog List Display

```typescript
{blogs.map((blog) => {
  // Parse media gallery
  let mediaCount = 0
  let imageCount = 0
  let videoCount = 0
  
  if (blog.mediaGallery) {
    try {
      const gallery = JSON.parse(blog.mediaGallery)
      mediaCount = gallery.length
      imageCount = gallery.filter((m: MediaItem) => m.type === 'image').length
      videoCount = gallery.filter((m: MediaItem) => m.type === 'video').length
    } catch (e) {
      // Invalid JSON, ignore
    }
  }
  
  return (
    <tr key={blog.id}>
      <td>
        <div>{blog.title}</div>
        <div>{blog.excerpt}</div>
        {blog.content && (
          <div className="text-emerald-600">✓ Has full content</div>
        )}
      </td>
      
      {/* Media count badges */}
      <td>
        {mediaCount > 0 ? (
          <div className="flex gap-2">
            {imageCount > 0 && (
              <span className="bg-purple-100 text-purple-700">
                📷 {imageCount}
              </span>
            )}
            {videoCount > 0 && (
              <span className="bg-pink-100 text-pink-700">
                🎥 {videoCount}
              </span>
            )}
          </div>
        ) : (
          <span className="text-gray-400">No media</span>
        )}
      </td>
    </tr>
  )
})}
```

---

## API Implementation

### GET /api/blogs

**File:** `src/app/api/blogs/route.ts`

```typescript
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
```

### POST /api/blogs

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Prisma automatically handles all fields including new ones
    const blogPost = await prisma.blogPost.create({
      data: body,
    })
    
    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
```

---

## Database Migrations

### Schema Changes

**Before:**
```prisma
model BlogPost {
  id        Int      @id @default(autoincrement())
  title     String
  excerpt   String?
  category  String?
  url       String?
  image     String?
  author    String?
  date      String?
  createdAt DateTime @default(now())
}
```

**After:**
```prisma
model BlogPost {
  id           Int      @id @default(autoincrement())
  title        String
  excerpt      String?
  content      String?    // ← ADDED
  category     String?
  url          String?
  image        String?
  author       String?
  date         String?
  mediaGallery String?    // ← ADDED
  createdAt    DateTime @default(now())
}
```

### Migration Commands

```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Verify schema
npx prisma studio
```

---

## Styling Implementation

### Tailwind CSS Classes

#### Gallery Grid Layout
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
```

#### Media Item Container
```tsx
className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
```

#### Hover-activated Delete Button
```tsx
className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
           opacity-0 group-hover:opacity-100 transition-opacity"
```

#### Media Type Badges
```tsx
// Images
className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium"

// Videos
className="px-2 py-1 bg-pink-100 text-pink-700 rounded font-medium"
```

#### Content Indicator
```tsx
className="text-xs text-emerald-600 mt-1"
```

---

## Performance Considerations

### 1. Image Optimization

**Recommendation:** Use Next.js Image component for optimized loading

```typescript
import Image from 'next/image'

// Replace:
<img src={media.url} alt={media.caption} />

// With:
<Image
  src={media.url}
  alt={media.caption}
  width={400}
  height={300}
  loading="lazy"
/>
```

### 2. Video Embed Optimization

**Current:** Iframe loads immediately
**Future:** Add lazy loading and thumbnail preview

```typescript
const [videoLoaded, setVideoLoaded] = useState(false)

// Show thumbnail first
{!videoLoaded && (
  <img 
    src={thumbnailUrl} 
    onClick={() => setVideoLoaded(true)}
  />
)}

// Load iframe on click
{videoLoaded && (
  <iframe src={embedUrl} />
)}
```

### 3. Gallery Pagination

**Future Enhancement:** Paginate gallery for posts with many media items

```typescript
const ITEMS_PER_PAGE = 9

const paginatedGallery = mediaGallery.slice(
  currentPage * ITEMS_PER_PAGE,
  (currentPage + 1) * ITEMS_PER_PAGE
)
```

---

## Error Handling

### Media Gallery Parsing

```typescript
if (blog.mediaGallery) {
  try {
    const gallery = JSON.parse(blog.mediaGallery)
    // Use gallery data
  } catch (e) {
    console.error('Invalid media gallery JSON:', e)
    // Fallback: Show "No media"
  }
}
```

### Video Embed Errors

```typescript
const getVideoEmbedUrl = (url: string): string => {
  try {
    // URL parsing logic
    return embedUrl
  } catch (error) {
    console.error('Invalid video URL:', error)
    return url // Return original URL as fallback
  }
}
```

### API Error Responses

```typescript
try {
  const response = await fetch('/api/blogs', { method: 'POST', ... })
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  
  const data = await response.json()
  // Success handling
  
} catch (error) {
  console.error('API Error:', error)
  alert('Failed to create blog post. Please try again.')
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// Test media item creation
describe('addMediaItem', () => {
  it('should add image to gallery', () => {
    const media = {
      url: '/images/test.jpg',
      type: 'image',
      caption: 'Test image'
    }
    addMediaItem()
    expect(mediaGallery).toContainEqual(expect.objectContaining(media))
  })
})

// Test video URL conversion
describe('getVideoEmbedUrl', () => {
  it('should convert YouTube URL to embed format', () => {
    const url = 'https://youtube.com/watch?v=abc123'
    const embed = getVideoEmbedUrl(url)
    expect(embed).toBe('https://www.youtube.com/embed/abc123')
  })
})
```

### Integration Tests

```typescript
// Test form submission
describe('Blog post creation', () => {
  it('should create post with media gallery', async () => {
    const formData = {
      title: 'Test Post',
      excerpt: 'Test excerpt',
      content: 'Full content here',
      category: 'Test',
      author: 'Tester',
      date: '2024-01-01',
      mediaGallery: JSON.stringify([
        { id: '1', type: 'image', url: '/test.jpg' }
      ])
    }
    
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    
    expect(response.status).toBe(201)
  })
})
```

### Manual Testing Checklist

- [ ] Create post with text only
- [ ] Add single image to gallery
- [ ] Add multiple images (3+)
- [ ] Add YouTube video (standard URL)
- [ ] Add YouTube video (short URL)
- [ ] Add Vimeo video
- [ ] Add captions to media items
- [ ] Remove media items
- [ ] Submit form with gallery
- [ ] Verify database storage
- [ ] Check blog list display
- [ ] Test responsive layout
- [ ] Verify video embeds work
- [ ] Test with invalid URLs

---

## Security Considerations

### 1. XSS Prevention

**User Input Sanitization:**
```typescript
import DOMPurify from 'dompurify'

const sanitizedContent = DOMPurify.sanitize(formData.content)
```

### 2. URL Validation

**Image URLs:**
```typescript
const isValidImageUrl = (url: string): boolean => {
  // Allow relative paths and HTTPS only
  return url.startsWith('/') || url.startsWith('https://')
}
```

**Video URLs:**
```typescript
const isValidVideoUrl = (url: string): boolean => {
  const allowedDomains = ['youtube.com', 'youtu.be', 'vimeo.com']
  try {
    const urlObj = new URL(url)
    return allowedDomains.some(domain => 
      urlObj.hostname.includes(domain)
    )
  } catch {
    return false
  }
}
```

### 3. JSON Injection Prevention

**Safe JSON Parsing:**
```typescript
const parseMediaGallery = (jsonString: string | null): MediaItem[] => {
  if (!jsonString) return []
  
  try {
    const parsed = JSON.parse(jsonString)
    
    // Validate structure
    if (!Array.isArray(parsed)) return []
    
    // Validate each item
    return parsed.filter(item =>
      item.id &&
      (item.type === 'image' || item.type === 'video') &&
      item.url &&
      typeof item.url === 'string'
    )
  } catch {
    return []
  }
}
```

---

## Future Enhancements

### 1. Direct File Upload

```typescript
const handleImageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const { url } = await response.json()
  setNewMediaUrl(url)
}
```

### 2. Drag-and-Drop Reordering

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

const handleDragEnd = (event) => {
  const { active, over } = event
  
  if (active.id !== over.id) {
    setMediaGallery((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }
}
```

### 3. Rich Text Editor

```typescript
import { Editor } from '@tinymce/tinymce-react'

<Editor
  apiKey="your-api-key"
  init={{
    height: 500,
    plugins: 'link image code',
    toolbar: 'bold italic | link image | code'
  }}
  value={formData.content}
  onEditorChange={(content) => 
    setFormData({ ...formData, content })
  }
/>
```

### 4. Image Compression

```typescript
import imageCompression from 'browser-image-compression'

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  
  try {
    return await imageCompression(file, options)
  } catch (error) {
    console.error('Compression failed:', error)
    return file
  }
}
```

---

## Debugging Tips

### 1. Console Logging

```typescript
// Log media gallery state changes
useEffect(() => {
  console.log('Media Gallery Updated:', mediaGallery)
}, [mediaGallery])

// Log form submission
console.log('Submitting form:', {
  ...formData,
  galleryItems: mediaGallery.length
})
```

### 2. React DevTools

- Inspect component state
- Track prop changes
- Monitor re-renders

### 3. Network Tab

- Verify API requests
- Check response payloads
- Monitor upload sizes

### 4. Database Inspection

```bash
# Open Prisma Studio
npx prisma studio

# Query database directly
sqlite3 prisma/dev.db
.tables
SELECT * FROM blog_posts;
```

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.0.0",
    "@prisma/client": "^5.22.0",
    "next-auth": "^4.24.5"
  },
  "devDependencies": {
    "prisma": "^5.22.0",
    "typescript": "^5.x",
    "@types/react": "^19.x"
  }
}
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Migrate to PostgreSQL/MySQL (SQLite not for production)
- [ ] Set up cloud storage for images (S3, Cloudinary)
- [ ] Implement authentication for admin routes
- [ ] Add CSRF protection
- [ ] Enable rate limiting
- [ ] Set up CDN for media assets
- [ ] Configure video embed restrictions
- [ ] Add content moderation
- [ ] Set up error monitoring (Sentry)
- [ ] Implement analytics
- [ ] Test at scale (100+ posts, large galleries)
- [ ] Optimize bundle size
- [ ] Set up backup strategy

---

## Support

For questions or issues:
- Check error logs in terminal
- Inspect browser console
- Review database with Prisma Studio
- Consult main documentation: `BLOG_RICH_MEDIA.md`

---

**Last Updated:** January 2025  
**Version:** 2.0.0  
**Maintainer:** Rise for Impact Development Team
