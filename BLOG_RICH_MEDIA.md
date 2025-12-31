# Rich Media Blog Editor - Feature Documentation

## Overview
The blog management system now supports rich content including full-text articles, multiple images, and video embeds. This upgrade transforms simple blog entries into comprehensive multimedia posts.

---

## New Features

### 1. **Full Content Editor**
- Large text area for complete blog post content (12 rows)
- Supports line breaks and paragraph formatting
- Monospaced font for better text editing experience
- Markdown-style formatting supported

**Usage:** Write the full article content directly in the "Full Content" textarea. Use double line breaks to separate paragraphs.

---

### 2. **Media Gallery**
A comprehensive media management system that supports both images and videos.

#### **Supported Media Types:**

**📷 Images:**
- Upload images to `/public/images/` directory
- Use external image URLs (https://...)
- Relative paths supported (`/images/blog-image.jpg`)
- Displays in responsive grid layout

**🎥 Videos:**
- YouTube URLs automatically converted to embeds
- Vimeo URLs automatically converted to embeds
- Supports both standard and short YouTube URLs
- Aspect ratio maintained (16:9)

#### **Supported Video URL Formats:**
```
YouTube:
  - https://www.youtube.com/watch?v=VIDEO_ID
  - https://youtu.be/VIDEO_ID

Vimeo:
  - https://vimeo.com/VIDEO_ID
```

---

### 3. **Media Gallery Interface**

#### **Adding Media:**
1. Click "📷 Add Image" or "🎥 Add Video" button
2. Enter the media URL (image path or video URL)
3. Optionally add a caption for context
4. Click "+ Add to Gallery" to add the item

#### **Gallery Display:**
- Grid layout (1-3 columns depending on screen size)
- Each media item shows a preview:
  - **Images:** Full preview with aspect-ratio maintained
  - **Videos:** Embedded iframe with playback controls
- Captions displayed below media (if provided)
- Media type badge (📷 Image or 🎥 Video) in bottom-left corner
- Hover to reveal delete button (red X in top-right)

#### **Removing Media:**
- Hover over any media item
- Click the red X button that appears
- Item is immediately removed from gallery

---

## Database Schema

The `blog_posts` table now includes:

| Column | Type | Description |
|--------|------|-------------|
| `content` | TEXT | Full blog post content |
| `media_gallery` | TEXT | JSON string of media items |

**MediaItem Structure:**
```typescript
interface MediaItem {
  id: string          // Unique identifier (timestamp)
  type: 'image' | 'video'
  url: string         // Image path or video URL
  caption?: string    // Optional caption
}
```

---

## Blog List Enhancements

The admin blog list now displays:

### **Title Column:**
- Blog post title
- Excerpt preview
- **✓ Has full content** indicator (if content exists)

### **Media Column:**
- **📷 {count}** badge for images (purple)
- **🎥 {count}** badge for videos (pink)
- "No media" text if gallery is empty

---

## Example Usage

### Creating a Rich Media Blog Post:

1. **Fill in Basic Info:**
   - Title: "Climate Action Success in Kenya"
   - Category: "Climate Action"
   - Author: "Jane Doe"
   - Date: Select date
   - External URL: (optional Medium link)

2. **Add Featured Image:**
   - Use ImageUpload component or enter URL
   - Example: `/images/kenya-climate.jpg`

3. **Write Full Content:**
   ```
   In 2024, Rise for Impact launched a groundbreaking...
   
   Our team worked with 50 local communities...
   
   The results exceeded all expectations...
   ```

4. **Build Media Gallery:**
   - Click "📷 Add Image"
   - URL: `/images/kenya-team.jpg`
   - Caption: "Team with local community leaders"
   - Click "+ Add to Gallery"
   
   - Click "🎥 Add Video"
   - URL: `https://youtube.com/watch?v=abc123`
   - Caption: "Project documentary"
   - Click "+ Add to Gallery"

5. **Submit:**
   - Click "Create Blog Post"
   - Gallery is saved as JSON in database
   - Blog appears in list with media count badges

---

## Technical Implementation

### **Video Embed Conversion:**
The system automatically converts video URLs to embed format:

```typescript
// YouTube watch URL → Embed URL
https://youtube.com/watch?v=abc123
↓
https://www.youtube.com/embed/abc123

// YouTube short URL → Embed URL
https://youtu.be/abc123
↓
https://www.youtube.com/embed/abc123

// Vimeo URL → Player URL
https://vimeo.com/123456
↓
https://player.vimeo.com/video/123456
```

### **Data Storage:**
Media gallery is stored as JSON string:
```json
[
  {
    "id": "1234567890",
    "type": "image",
    "url": "/images/photo.jpg",
    "caption": "Team photo"
  },
  {
    "id": "1234567891",
    "type": "video",
    "url": "https://youtube.com/watch?v=abc123",
    "caption": "Project video"
  }
]
```

### **Parsing in Table:**
```typescript
let mediaCount = 0
let imageCount = 0
let videoCount = 0

if (blog.mediaGallery) {
  try {
    const gallery = JSON.parse(blog.mediaGallery)
    mediaCount = gallery.length
    imageCount = gallery.filter(m => m.type === 'image').length
    videoCount = gallery.filter(m => m.type === 'video').length
  } catch (e) {
    // Invalid JSON, ignore
  }
}
```

---

## Best Practices

### **For Images:**
1. Upload images to `/public/images/blogs/` directory for organization
2. Use descriptive filenames: `kenya-climate-action-2024.jpg`
3. Optimize images before upload (recommended: < 500KB per image)
4. Add captions for accessibility and context

### **For Videos:**
1. Upload videos to YouTube or Vimeo first
2. Use descriptive captions explaining video content
3. Test video URLs before adding to ensure they're public
4. Consider adding both a video and thumbnail image

### **For Content:**
1. Write engaging, well-structured content
2. Use double line breaks for paragraph separation
3. Keep excerpt concise (2-3 sentences)
4. Full content should be comprehensive (500+ words recommended)

---

## Accessibility Features

- **Alt text:** Images use caption as alt text (or generic description)
- **ARIA labels:** Buttons have proper labels for screen readers
- **Keyboard navigation:** All controls are keyboard accessible
- **Hover states:** Clear visual feedback for interactive elements
- **Color contrast:** Badge colors meet WCAG AA standards

---

## Future Enhancements

Potential improvements for future versions:

1. **Image Upload:** Direct file upload instead of URL entry
2. **WYSIWYG Editor:** Rich text editor (TinyMCE/Quill) for content
3. **Gallery Reordering:** Drag-and-drop to reorder media items
4. **Image Editing:** Crop, resize, and filters built-in
5. **Video Thumbnails:** Custom thumbnail selection for videos
6. **Media Library:** Centralized library of uploaded media
7. **Markdown Support:** Native markdown rendering for content
8. **Preview Mode:** Preview blog post before publishing

---

## Testing Checklist

- [ ] Create blog post with only text content
- [ ] Add single image to gallery
- [ ] Add multiple images (3+) to verify grid layout
- [ ] Add YouTube video with standard URL format
- [ ] Add YouTube video with short URL format (youtu.be)
- [ ] Add Vimeo video
- [ ] Add image with caption
- [ ] Add video with caption
- [ ] Remove media item using delete button
- [ ] Create post with mixed images and videos
- [ ] Verify media count badges in blog list
- [ ] Verify "Has full content" indicator appears
- [ ] Test responsive layout on mobile/tablet
- [ ] Verify hover states on media items
- [ ] Test with invalid video URL
- [ ] Test with empty gallery

---

## API Reference

### **POST /api/blogs**
Creates a new blog post with rich media.

**Request Body:**
```typescript
{
  title: string
  excerpt: string
  content?: string
  category: string
  url?: string
  image: string
  author: string
  date: string
  mediaGallery?: string  // JSON stringified array of MediaItem[]
}
```

**Response:**
```typescript
{
  id: number
  title: string
  excerpt: string
  content?: string
  category: string
  url?: string
  image: string
  author: string
  date: string
  mediaGallery?: string
  createdAt: string
}
```

---

## Troubleshooting

### **Video Not Displaying:**
- Verify URL is public and accessible
- Check if video is available in your region
- Ensure URL format matches supported formats
- Try opening the embed URL directly in browser

### **Image Not Loading:**
- Check if image file exists in `/public/images/`
- Verify URL path is correct (starts with `/images/`)
- Check file permissions
- Verify image file type is supported (jpg, png, gif, webp)

### **Gallery Not Saving:**
- Check browser console for errors
- Verify database has `media_gallery` column
- Ensure JSON is valid (no parsing errors)
- Check API endpoint is accessible

### **Delete Button Not Appearing:**
- Hover over media item
- Check if CSS is loaded correctly
- Verify `group` and `group-hover:` classes are working
- Try refreshing the page

---

## Summary

The rich media blog editor transforms Rise for Impact's blog management from simple entries to comprehensive multimedia articles. With support for full content, multiple images, and video embeds, content creators can now tell compelling stories that engage audiences through text, visuals, and video.

**Key Benefits:**
- 📝 Full article content support
- 📷 Multiple images per post
- 🎥 YouTube and Vimeo integration
- 🎨 Visual gallery management
- 📊 Media count tracking
- ♿ Accessibility compliant
- 📱 Fully responsive design

Navigate to **Admin Dashboard → Blog Management** to start creating rich media blog posts!
