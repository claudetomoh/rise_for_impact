# Rise for Impact - SEO Setup Instructions

## ✅ What's Been Implemented

### 1. Enhanced Metadata
- **Title**: Optimized for search engines with key terms
- **Description**: Compelling 160-character description with stats
- **Keywords**: 12 targeted keywords for African youth leadership
- **Open Graph**: Perfect sharing on Facebook, LinkedIn
- **Twitter Cards**: Optimized previews on Twitter
- **Robots**: Proper indexing instructions for search engines

### 2. Structured Data (Schema.org)
- Organization schema with your details
- Helps Google show rich results
- Improves knowledge panel chances

### 3. Sitemap (Auto-generated)
- **Location**: `/sitemap.xml`
- Lists all pages for Google to crawl
- Updates automatically

### 4. Robots.txt (Auto-generated)
- **Location**: `/robots.txt`
- Tells search engines what to index
- Blocks admin/API routes

---

## 🚀 Next Steps (After Deployment)

### 1. Google Search Console (15 minutes)
1. Go to https://search.google.com/search-console
2. Add property: `riseforimpact.org`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://riseforimpact.org/sitemap.xml`
5. Wait 3-7 days for Google to index

### 2. Update Verification Code
In `src/app/layout.tsx`, replace:
```typescript
verification: {
  google: 'your-google-verification-code', // ← Add your real code here
},
```

### 3. Update URLs
Replace `https://riseforimpact.org` with your actual domain in:
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### 4. Update Social Media Handles
In `src/app/layout.tsx`, update:
```typescript
twitter: {
  creator: '@riseforimpact', // ← Your Twitter handle
},
sameAs: [
  'https://twitter.com/riseforimpact', // ← Your actual links
  'https://linkedin.com/company/riseforimpact',
  'https://instagram.com/riseforimpact',
],
```

---

## 📊 How to Measure Success

### Week 1-2: Setup
- Google Search Console shows your site
- Pages appear in Google search for "Rise for Impact"

### Month 1:
- Rank for brand name searches
- 10-50 organic visitors/week

### Month 3:
- Rank for "youth leadership Africa"
- 100-200 organic visitors/week
- Social shares generate traffic

### Month 6:
- Top 10 for multiple keywords
- 500+ organic visitors/week
- Growing backlinks

---

## 💡 Pro Tips

### Content is King
- Add blog posts (helps SEO massively)
- Student testimonials (real stories)
- Impact reports (data-driven content)

### Get Backlinks
- University websites linking to you
- Partner organizations
- Media coverage
- Guest posts

### Social Signals
- Share website content regularly
- Encourage members to share
- Use hashtags consistently

### Technical Health
- Fast loading (✅ you have this)
- Mobile-friendly (✅ you have this)
- HTTPS when deployed
- Regular updates

---

## 🎯 Keywords to Target

**Primary:**
- Rise for Impact
- African youth leadership
- Youth empowerment Africa

**Secondary:**
- Student leadership programs Africa
- Climate action youth Africa
- Pan-African youth movement
- Leadership training Africa

**Long-tail:**
- "How to join youth leadership programs in Africa"
- "Youth-led organizations in Africa"
- "African student empowerment initiatives"

---

## Need Help?

1. **Google Search Console Setup**: Follow their verification wizard
2. **Analytics**: Consider Google Analytics 4 (separate setup)
3. **Performance**: Use Google PageSpeed Insights to test
4. **Social Sharing**: Test with https://www.opengraph.xyz/

---

**Your site is now SEO-ready!** 🎉 
Deploy it, submit to Google, and start sharing on social media!
