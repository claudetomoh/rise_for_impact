# 📧 Newsletter & Email Notification System

## Complete Guide for Rise for Impact

---

## 📋 Table of Contents

1. [Newsletter System Overview](#newsletter-system-overview)
2. [How Users Subscribe](#how-users-subscribe)
3. [Managing Subscribers](#managing-subscribers)
4. [Automated Notifications](#automated-notifications)
5. [Email Service Setup](#email-service-setup)
6. [Testing the System](#testing-the-system)
7. [Troubleshooting](#troubleshooting)

---

## 📬 Newsletter System Overview

### **What It Does:**
- Collects email subscriptions from visitors on your website
- Stores subscriber data in the database
- Sends welcome emails automatically
- Sends notifications when new content is published
- Sends congratulations emails when applications are approved
- Manages subscriber status (active/inactive)

### **Technology Stack:**
- **Database**: SQLite (Prisma ORM)
- **Email Service**: Resend (https://resend.com)
- **Backend**: Next.js API routes
- **Frontend**: React components

---

## 🎯 How Users Subscribe

### **Subscription Points:**

1. **Homepage CTA Section** (Call-to-Action)
   - Located at the bottom of the homepage
   - Prominent newsletter signup form
   - Instant welcome email upon subscription

2. **Footer** (All Pages)
   - Newsletter form in the footer
   - Accessible from every page

### **Subscription Flow:**

```
User enters email
    ↓
Validation (check if valid email)
    ↓
Duplicate check (already subscribed?)
    ↓
Save to database (newsletter_subscribers table)
    ↓
Send welcome email via Resend
    ↓
Confirmation message shown to user
```

### **Welcome Email Includes:**
- Warm welcome message
- Overview of what to expect (monthly updates)
- Links to programs and resources
- Unsubscribe option

---

## 👥 Managing Subscribers

### **Admin Panel Access:**
Navigate to: **`/admin/newsletter`**

### **Features Available:**

#### **1. View All Subscribers**
- Complete list of email addresses
- Subscription dates and times
- Active/Inactive status indicators

#### **2. Statistics Dashboard**
- **Total Subscribers**: All-time count
- **Active Subscribers**: Currently receiving emails
- **Inactive Subscribers**: Opted out or deactivated

#### **3. Search & Filter**
- Search by email address
- Filter by status (All/Active/Inactive)

#### **4. Status Management**
- Toggle subscriber status with one click
- Active = Receives all notifications
- Inactive = No emails sent (but stays in database)

#### **5. Delete Subscribers**
- Permanently remove subscribers
- Confirmation required for safety
- GDPR compliance (right to be forgotten)

#### **6. CSV Export**
- Download complete subscriber list
- Includes: Email, Subscription Date, Status
- Use for external email campaigns or backup

### **How to Manage:**

```bash
1. Login to admin panel (/admin/login)
2. Click "Newsletter" in the navigation
3. Use search/filter to find specific subscribers
4. Click "Active/Inactive" to toggle status
5. Click "Delete" to remove permanently
6. Click "Export CSV" to download list
```

---

## 🔔 Automated Notifications

### **1. New Blog Post Published**

**Trigger:** When admin creates a new blog post via `/admin/blogs`

**What Happens:**
1. Blog post is saved to database
2. System fetches all **active** newsletter subscribers
3. Sends beautifully formatted email to all subscribers
4. Email includes:
   - Blog title and featured image
   - Excerpt/preview
   - Author name and date
   - "Read Full Article" button
   - Social media links

**Implementation:**
```typescript
// File: src/app/api/blogs/route.ts
// Automatically triggers when POST request creates a blog
notifySubscribersNewBlog({
  title: blogPost.title,
  excerpt: blogPost.excerpt,
  image: blogPost.image,
  url: blogPost.url,
  author: blogPost.author,
})
```

**Email Sending Strategy:**
- Sends in batches of 50 emails (prevents rate limiting)
- 1-second delay between batches
- Runs asynchronously (doesn't block blog creation)
- If email fails, blog post still gets created

---

### **2. Application Received - Instant Confirmation** ✨ NEW!

**Trigger:** When someone submits an application via `/get-involved` or any application form

**What Happens:**
1. Application is saved to database
2. **Instant confirmation email sent immediately** to applicant
3. Email includes:
   - Confirmation that application was received
   - What to expect next (review timeline: 5-7 business days)
   - Next steps information
   - "Explore Our Programs" button
   - Contact information for questions

**Special Case - Donations:**
If the application type includes "donation" or "donor", a special thank you email is sent instead:
- Thank you message with heart emoji 💚
- List of what their donation supports
- Impact information
- "See Your Impact" button
- Tax receipt information notice
- Donation contact details

**Implementation:**
```typescript
// File: src/app/api/apply/route.ts
// Automatically triggers when application is submitted
const isDonation = body.type?.toLowerCase().includes('donation')
notifyApplicationReceived({
  name: body.name,
  email: body.email,
  type: body.type,
  isDonation,
})
```

**Key Features:**
- ✅ **Instant delivery** - Email sent immediately upon submission
- ✅ **No-reply automatic** - Runs in background, doesn't block submission
- ✅ **Smart detection** - Automatically detects if it's a donation
- ✅ **Beautiful templates** - Professional HTML emails with branding
- ✅ **Error handling** - If email fails, application still succeeds

---

### **3. Volunteer Application Received - Instant Confirmation** ✨ NEW!

**Trigger:** When someone submits a volunteer application via `/get-involved`

**What Happens:**
1. Volunteer application saved to database
2. **Instant confirmation email sent immediately**
3. Email includes:
   - Confirmation of volunteer application received
   - Their specific role they applied for
   - Review timeline (5-7 business days)
   - What to expect next
   - "Explore Our Programs" button
   - Contact information

**Implementation:**
```typescript
// File: src/app/api/volunteers/route.ts
// Automatically triggers when volunteer applies
notifyApplicationReceived({
  name: body.fullName,
  email: body.email,
  type: `Volunteer - ${body.role}`,
  isDonation: false,
})
```

---

### **4. Application Approved**

**Trigger:** When admin changes application status to "approved" in `/admin/applications`

**What Happens:**
1. Application status updated in database
2. System checks if new status is "approved"
3. Sends congratulations email to applicant
4. Email includes:
   - Personalized greeting
   - Approval confirmation
   - Next steps (onboarding, WhatsApp group, etc.)
   - "Explore Programs" button
   - Contact information

**Implementation:**
```typescript
// File: src/app/api/applications/[id]/route.ts
// Triggers when status is changed to 'approved'
if (body.status === 'approved') {
  notifyApplicationApproved({
    name: application.name,
    email: application.email,
    type: application.type,
  })
}
```

**Email Contents:**
- 🎉 Celebration header
- Personalized message with applicant name
- Application type they applied for
- Clear next steps in a highlighted box
- Team contact information
- Link to programs page

---

### **5. Volunteer Application Approved**

**Trigger:** When admin approves a volunteer via `/admin/volunteers`

**What Happens:**
1. Volunteer status updated to "approved"
2. Welcome email sent to volunteer
3. Email includes:
   - Welcome to the team message
   - Their specific role (Graphic Designer, Content Writer, etc.)
   - Getting started checklist
   - Slack/Discord invitation info
   - Volunteer coordinator contact

**Implementation:**
```typescript
// File: src/app/api/volunteers/[id]/route.ts
// Triggers when status is changed to 'approved'
if (body.status === 'approved') {
  notifyVolunteerApproved({
    fullName: volunteer.fullName,
    email: volunteer.email,
    role: volunteer.role,
  })
}
```

---

## 📧 Email Flow Summary

### **Application Journey:**

```
User submits application
    ↓
✅ INSTANT: "Application Received" confirmation email
    ↓
Admin reviews application (5-7 days)
    ↓
Admin approves in admin panel
    ↓
🎉 "Application Approved" congratulations email
    ↓
Onboarding process begins
```

### **Donation Journey:**

```
Donor submits donation info
    ↓
💚 INSTANT: "Thank You for Your Donation" email
    ↓
Admin processes donation
    ↓
Tax receipt sent separately
    ↓
Ongoing impact updates
```

### **Volunteer Journey:**

```
User applies to volunteer
    ↓
✅ INSTANT: "Volunteer Application Received" confirmation
    ↓
Admin reviews application (5-7 days)
    ↓
Admin approves in /admin/volunteers
    ↓
🙋 "Welcome to the Team" email with onboarding
    ↓
Volunteer coordinator reaches out
```

---

## 🔧 Email Service Setup

### **Resend Email Service Configuration:**

#### **1. Create Resend Account**
- Go to: https://resend.com
- Sign up for free account
- Free tier includes: **100 emails/day**, **3,000 emails/month**

#### **2. Get API Key**
```bash
1. Login to Resend dashboard
2. Go to Settings → API Keys
3. Click "Create API Key"
4. Copy the key (starts with 're_...')
```

#### **3. Add to Environment Variables**
Create/update `.env` file:

```env
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=https://riseforimpact.org
```

#### **4. Verify Domain (Optional but Recommended)**
For production use:
```bash
1. Go to Resend dashboard → Domains
2. Click "Add Domain"
3. Enter: riseforimpact.org
4. Add DNS records to your domain provider
5. Wait for verification (can take 24-48 hours)
```

**Benefits of verified domain:**
- Emails sent from: `noreply@riseforimpact.org`
- Better deliverability (less spam)
- Professional appearance
- Higher sending limits

#### **5. Testing in Development**
Without domain verification:
- Emails sent from: `onboarding@resend.dev`
- Only works for testing
- Emails might go to spam

---

## 🧪 Testing the System

### **Test Newsletter Subscription:**

1. **Go to homepage** → Scroll to CTA section
2. **Enter test email** (use your real email for testing)
3. **Click Subscribe**
4. **Check inbox** for welcome email
5. **Verify in admin** → `/admin/newsletter` → Should see your email

### **Test Blog Notification:**

1. **Login to admin** → `/admin/blogs`
2. **Create new blog post** with:
   - Title: "Test Blog Post"
   - Excerpt: "This is a test notification"
   - Author: Your name
   - Image: Any image
3. **Submit the blog**
4. **Check your email** (as a subscribed user)
5. **Verify email contains**:
   - Blog title and image
   - Excerpt
   - "Read Full Article" button

### **Test Application Approval:**

1. **Create test application** via `/get-involved`
2. **Login to admin** → `/admin/applications`
3. **Find your application** in the list
4. **Change status dropdown** → Select "approved"
5. **Check email** for approval notification
6. **Verify email contains**:
   - Congratulations message
   - Next steps
   - Contact information

### **Test Volunteer Approval:**

1. **Submit volunteer application** via `/get-involved` → Volunteer track
2. **Login to admin** → `/admin/volunteers`
3. **Find your application**
4. **Change status** → "approved"
5. **Check email** for welcome message

---

## 🔍 Troubleshooting

### **Problem: Emails Not Sending**

**Solution 1: Check API Key**
```bash
# Verify .env file has correct key
RESEND_API_KEY=re_...

# Restart dev server after adding key
npm run dev
```

**Solution 2: Check Rate Limits**
- Free tier: 100 emails/day, 3,000/month
- Check Resend dashboard for usage
- Upgrade plan if needed

**Solution 3: Check Email Format**
```javascript
// Email must be valid format
✅ test@example.com
❌ test@
❌ test.com
```

---

### **Problem: Emails Going to Spam**

**Solutions:**
1. **Verify domain** (see setup instructions above)
2. **Check SPF/DKIM records** in Resend dashboard
3. **Test with different email providers**
4. **Avoid spam trigger words** in subject lines

---

### **Problem: No Subscribers Showing**

**Check:**
1. Database file exists: `prisma/dev.db`
2. Table created: Run `npx prisma db push`
3. Newsletter form is working (test subscription)
4. Admin is authenticated (login required)

---

### **Problem: Can't Access Admin Panel**

**Solution:**
```bash
# 1. Check if admin user exists
# 2. Login at /admin/login
# 3. Default credentials (if seeded):
Email: admin@riseforimpact.org
Password: admin123

# 4. Reset password if needed via database
```

---

## 📊 Monitoring & Analytics

### **Track Newsletter Performance:**

1. **Subscriber Growth**
   - Check admin panel daily/weekly
   - Export CSV for analysis
   - Track active vs inactive ratio

2. **Email Deliverability**
   - Resend dashboard shows delivery rates
   - Monitor bounces and spam reports
   - Keep list clean (remove bounced emails)

3. **Engagement**
   - Track link clicks (future enhancement)
   - Monitor unsubscribe rates
   - A/B test email content

---

## 🚀 Future Enhancements

### **Planned Features:**

1. **Manual Newsletter Campaigns**
   - Compose custom emails in admin
   - Schedule send times
   - Templates library

2. **Segmentation**
   - Tag subscribers by interests
   - Send targeted emails
   - Filter by location/program

3. **Analytics Dashboard**
   - Open rates
   - Click rates
   - Conversion tracking

4. **Unsubscribe Page**
   - Self-service unsubscribe
   - Preference center
   - Re-subscription option

---

## 📞 Support

For technical issues:
- **Developer**: Check server logs (`console.log` output)
- **Resend Support**: https://resend.com/support
- **Documentation**: This file + Resend docs

For business questions:
- **Contact**: info@riseforimpact.org

---

## 🎯 Quick Reference

### **Admin URLs:**
- Newsletter Management: `/admin/newsletter`
- Applications: `/admin/applications`
- Volunteers: `/admin/volunteers`
- Content (Blogs): `/admin/blogs`
- Dashboard: `/admin/dashboard`

### **API Endpoints:**
- Newsletter Subscribe: `POST /api/newsletter`
- Get Subscribers: `GET /api/newsletter`
- Update Subscriber: `PATCH /api/newsletter?id={id}`
- Delete Subscriber: `DELETE /api/newsletter?id={id}`

### **Database Tables:**
- `newsletter_subscribers`: Email subscribers
- `applications`: Program applications
- `volunteer_applications`: Volunteer applications
- `blog_posts`: Blog content

---

**Last Updated:** December 30, 2025  
**Version:** 3.0 - Instant Confirmation Emails Added  
**Status:** ✅ Fully Implemented & Tested
