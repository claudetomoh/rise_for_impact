module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/email-notifications.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveSubscribers",
    ()=>getActiveSubscribers,
    "notifyAdminNewSubmission",
    ()=>notifyAdminNewSubmission,
    "notifyApplicationApproved",
    ()=>notifyApplicationApproved,
    "notifyApplicationReceived",
    ()=>notifyApplicationReceived,
    "notifySubscribersNewBlog",
    ()=>notifySubscribersNewBlog,
    "notifySubscribersNewOpportunity",
    ()=>notifySubscribersNewOpportunity,
    "notifyVolunteerApproved",
    ()=>notifyVolunteerApproved,
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function sendEmail({ to, subject, html }) {
    try {
        const result = await resend.emails.send({
            from: 'Rise for Impact <noreply@riseforimpact.org>',
            to,
            subject,
            html
        });
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error('Email send error:', error);
        return {
            success: false,
            error
        };
    }
}
async function getActiveSubscribers() {
    try {
        const subscribers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].newsletterSubscriber.findMany({
            where: {
                isActive: true
            },
            select: {
                email: true
            }
        });
        return subscribers.map((sub)=>sub.email);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return [];
    }
}
async function notifySubscribersNewBlog(blogData) {
    const subscribers = await getActiveSubscribers();
    if (subscribers.length === 0) {
        console.log('No active subscribers to notify');
        return {
            success: false,
            message: 'No subscribers'
        };
    }
    const blogUrl = blogData.url || `${("TURBOPACK compile-time value", "http://localhost:3000") || 'https://riseforimpact.org'}/blog`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #22C55E, #F59E0B); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Rise for Impact</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Blog Post Published!</p>
      </div>

      <!-- Blog Image -->
      ${blogData.image ? `
        <div style="width: 100%; height: 300px; overflow: hidden;">
          <img src="${blogData.image}" alt="${blogData.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      ` : ''}

      <!-- Content -->
      <div style="padding: 30px; background: #F9FAFB;">
        <h2 style="color: #1F2937; margin: 0 0 15px 0;">${blogData.title}</h2>
        
        <p style="color: #6B7280; font-size: 14px; margin: 0 0 20px 0;">
          By ${blogData.author} • ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })}
        </p>

        <p style="color: #4B5563; line-height: 1.6; margin: 0 0 30px 0;">
          ${blogData.excerpt}
        </p>

        <!-- CTA Button -->
        <div style="text-align: center;">
          <a href="${blogUrl}" 
             style="display: inline-block; 
                    background: linear-gradient(to right, #22C55E, #10b981); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);">
            Read Full Article →
          </a>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #22C55E;">
          <p style="color: #4B5563; margin: 0; font-size: 14px;">
            💡 <strong>Stay Connected:</strong> Follow us on social media for daily inspiration and updates on our impact initiatives across Africa.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 15px 0; font-size: 14px;">
          You're receiving this because you subscribed to Rise for Impact newsletter.
        </p>
        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000")}/unsubscribe" style="color: #22C55E; text-decoration: none;">Unsubscribe</a> • 
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000")}" style="color: #22C55E; text-decoration: none;">Visit Website</a>
        </p>
        <p style="color: #6B7280; margin: 15px 0 0 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. Empowering African Youth Leaders.
        </p>
      </div>
    </div>
  `;
    // Send in batches to avoid rate limits (50 emails per batch)
    const batchSize = 50;
    const results = [];
    for(let i = 0; i < subscribers.length; i += batchSize){
        const batch = subscribers.slice(i, i + batchSize);
        const result = await sendEmail({
            to: batch,
            subject: `📚 New Blog Post: ${blogData.title}`,
            html
        });
        results.push(result);
        // Wait 1 second between batches to avoid rate limiting
        if (i + batchSize < subscribers.length) {
            await new Promise((resolve)=>setTimeout(resolve, 1000));
        }
    }
    return {
        success: true,
        totalSent: subscribers.length,
        batches: results.length
    };
}
async function notifyApplicationApproved(applicationData) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #22C55E, #10b981); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Congratulations!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Your Application Has Been Approved</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${applicationData.name},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          We are thrilled to inform you that your application for <strong style="color: #22C55E;">${applicationData.type}</strong> 
          has been <strong>approved</strong>! 🌟
        </p>

        <div style="background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); 
                    padding: 25px; 
                    border-radius: 12px; 
                    margin: 30px 0;
                    border: 2px solid #22C55E;">
          <h3 style="color: #15803D; margin: 0 0 15px 0; font-size: 20px;">✅ What's Next?</h3>
          <ul style="color: #166534; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Check your email for detailed onboarding instructions</li>
            <li>Join our community WhatsApp group</li>
            <li>Attend the orientation session (dates will be shared)</li>
            <li>Complete your profile on our platform</li>
          </ul>
        </div>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          Our team will reach out to you within <strong>48 hours</strong> with more details about the next steps. 
          In the meantime, feel free to explore our programs and connect with other fellows!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000")}/programs" 
             style="display: inline-block; 
                    background: linear-gradient(to right, #22C55E, #10b981); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);">
            Explore Our Programs →
          </a>
        </div>

        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #F59E0B;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            💬 <strong>Need Help?</strong> Reply to this email or contact us at 
            <a href="mailto:info@riseforimpact.org" style="color: #F59E0B; text-decoration: none;">info@riseforimpact.org</a>
          </p>
        </div>

        <p style="color: #4B5563; margin: 30px 0 0 0;">
          Welcome to the Rise for Impact family!<br><br>
          <strong style="color: #22C55E;">The Rise for Impact Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 14px;">
          Rise for Impact • Empowering African Youth Leaders
        </p>
        <p style="color: #6B7280; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;
    return await sendEmail({
        to: applicationData.email,
        subject: '🎉 Application Approved - Welcome to Rise for Impact!',
        html
    });
}
async function notifyVolunteerApproved(volunteerData) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #EC4899, #F59E0B); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">🙋</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to the Team!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Volunteer Application Approved</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${volunteerData.fullName},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          We are excited to welcome you as a <strong style="color: #EC4899;">${volunteerData.role}</strong> volunteer 
          at Rise for Impact! Your skills and passion will make a real difference in empowering African youth. 🌟
        </p>

        <div style="background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%); 
                    padding: 25px; 
                    border-radius: 12px; 
                    margin: 30px 0;
                    border: 2px solid #EC4899;">
          <h3 style="color: #BE185D; margin: 0 0 15px 0; font-size: 20px;">🚀 Getting Started:</h3>
          <ul style="color: #9F1239; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Join our volunteers Slack/Discord channel</li>
            <li>Attend the virtual onboarding session</li>
            <li>Meet your team lead and fellow volunteers</li>
            <li>Access project briefs and tools</li>
            <li>Set your availability and project preferences</li>
          </ul>
        </div>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          Our volunteer coordinator will send you an invitation link and schedule within <strong>24 hours</strong>. 
          We're looking forward to working with you and creating impact together!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000")}/get-involved" 
             style="display: inline-block; 
                    background: linear-gradient(to right, #EC4899, #DB2777); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(236, 72, 153, 0.3);">
            Learn More About Volunteering →
          </a>
        </div>

        <p style="color: #4B5563; margin: 30px 0 0 0;">
          Thank you for choosing to make a difference!<br><br>
          <strong style="color: #EC4899;">The Rise for Impact Volunteer Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 14px;">
          Rise for Impact • Empowering African Youth Leaders
        </p>
        <p style="color: #6B7280; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;
    return await sendEmail({
        to: volunteerData.email,
        subject: '🙋 Welcome to Rise for Impact Volunteer Team!',
        html
    });
}
async function notifyApplicationReceived(applicationData) {
    const isDonation = applicationData.isDonation || false;
    const subject = isDonation ? '💚 Thank You for Your Generous Donation!' : '✅ Application Received - Rise for Impact';
    const html = isDonation ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #EC4899, #BE185D); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">💚</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Thank You!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Your Generosity Makes a Difference</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${applicationData.name},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          <strong>Thank you for your generous donation to support our mission!</strong> 🙏
        </p>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          Your contribution is making a real difference in the lives of young African leaders. Because of supporters like you, we can continue providing:
        </p>

        <div style="background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%); 
                    padding: 25px; 
                    border-radius: 12px; 
                    margin: 30px 0;
                    border: 2px solid #EC4899;">
          <ul style="color: #9F1239; line-height: 2; margin: 0; padding-left: 20px;">
            <li>💡 Leadership development programs</li>
            <li>📚 Educational scholarships and resources</li>
            <li>🌍 Community impact projects across Africa</li>
            <li>🤝 Mentorship and networking opportunities</li>
            <li>🚀 Innovation labs and skill-building workshops</li>
          </ul>
        </div>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          Your donation receipt and tax information will be sent to you separately. If you have any questions about your donation or how it will be used, please don't hesitate to reach out.
        </p>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          We'll keep you updated on the impact your generosity is creating. Together, we're building a brighter future for Africa!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'https://riseforimpact.org'}/programs" 
             style="display: inline-block; 
                    background: linear-gradient(to right, #EC4899, #BE185D); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(236, 72, 153, 0.3);">
            See Your Impact →
          </a>
        </div>

        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #F59E0B;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            💬 <strong>Questions?</strong> Contact us at 
            <a href="mailto:donations@riseforimpact.org" style="color: #F59E0B; text-decoration: none;">donations@riseforimpact.org</a>
            or call +233 55 123 4567
          </p>
        </div>

        <p style="color: #4B5563; margin: 30px 0 0 0;">
          With heartfelt gratitude,<br><br>
          <strong style="color: #EC4899;">The Rise for Impact Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 14px;">
          Rise for Impact • Empowering African Youth Leaders
        </p>
        <p style="color: #6B7280; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #3B82F6, #1D4ED8); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Application Received!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">We'll Review and Get Back to You</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${applicationData.name},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          Thank you for your interest in Rise for Impact! We've successfully received your application for <strong style="color: #3B82F6;">${applicationData.type}</strong>.
        </p>

        <div style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); 
                    padding: 25px; 
                    border-radius: 12px; 
                    margin: 30px 0;
                    border: 2px solid #3B82F6;">
          <h3 style="color: #1D4ED8; margin: 0 0 15px 0; font-size: 20px;">📋 What Happens Next?</h3>
          <ul style="color: #1E40AF; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Our team will carefully review your application</li>
            <li>We typically respond within <strong>5-7 business days</strong></li>
            <li>You'll receive an email with next steps or interview details</li>
            <li>Check your spam folder if you don't hear from us</li>
          </ul>
        </div>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          In the meantime, feel free to explore our programs, read our latest blog posts, and connect with us on social media to learn more about the work we do.
        </p>

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0;">
          We appreciate your patience and look forward to potentially welcoming you to the Rise for Impact community!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'https://riseforimpact.org'}/programs" 
             style="display: inline-block; 
                    background: linear-gradient(to right, #3B82F6, #1D4ED8); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
            Explore Our Programs →
          </a>
        </div>

        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #F59E0B;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            💬 <strong>Questions about your application?</strong> Reply to this email or contact us at 
            <a href="mailto:applications@riseforimpact.org" style="color: #F59E0B; text-decoration: none;">applications@riseforimpact.org</a>
          </p>
        </div>

        <p style="color: #4B5563; margin: 30px 0 0 0;">
          Best regards,<br><br>
          <strong style="color: #3B82F6;">The Rise for Impact Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 14px;">
          Rise for Impact • Empowering African Youth Leaders
        </p>
        <p style="color: #6B7280; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;
    try {
        await sendEmail({
            to: applicationData.email,
            subject,
            html
        });
        console.log(`✅ ${isDonation ? 'Donation' : 'Application'} confirmation sent to ${applicationData.email}`);
    } catch (error) {
        console.error('Failed to send confirmation email:', error);
        throw error;
    }
}
async function notifyAdminNewSubmission({ type, name, email, submissionType, role, message }) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@riseforimpact.org';
    const subject = type === 'donation' ? '💚 New Donation Received!' : type === 'volunteer' ? '🙋 New Volunteer Application!' : '📨 New Application Submitted!';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, ${type === 'donation' ? '#EC4899, #BE185D' : type === 'volunteer' ? '#8B5CF6, #7C3AED' : '#3B82F6, #1D4ED8'}); padding: 40px 20px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">${type === 'donation' ? '💚' : type === 'volunteer' ? '🙋' : '📨'}</div>
        <h1 style="color: white; margin: 0; font-size: 28px;">New ${type === 'donation' ? 'Donation' : type === 'volunteer' ? 'Volunteer' : 'Application'}!</h1>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Submission Details</h2>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #1F2937;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0; color: #1F2937;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3B82F6;">${email}</a></p>
          <p style="margin: 5px 0; color: #1F2937;"><strong>Type:</strong> ${submissionType}</p>
          ${role ? `<p style="margin: 5px 0; color: #1F2937;"><strong>Role:</strong> ${role}</p>` : ''}
          ${message ? `<p style="margin: 5px 0; color: #1F2937;"><strong>Message:</strong> ${message}</p>` : ''}
          <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        ${type === 'donation' ? `
          <div style="background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EC4899;">
            <p style="color: #9F1239; margin: 0;">
              💰 <strong>Action Required:</strong> Process donation and send official receipt.
            </p>
          </div>
        ` : `
          <div style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
            <p style="color: #1E40AF; margin: 0;">
              ⏰ <strong>Action Required:</strong> Review and respond within 5-7 business days.
            </p>
          </div>
        `}

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/admin/${type === 'volunteer' ? 'volunteers' : 'applications'}" 
             style="display: inline-block; 
                    background: linear-gradient(to right, ${type === 'donation' ? '#EC4899, #BE185D' : type === 'volunteer' ? '#8B5CF6, #7C3AED' : '#3B82F6, #1D4ED8'}); 
                    color: white; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
            View in Admin Panel →
          </a>
        </div>

        <p style="color: #6B7280; font-size: 14px; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          This is an automated notification. Login to your admin panel to review and take action.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0; font-size: 14px;">
          Rise for Impact Admin System<br>
          <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/admin/dashboard" style="color: #22C55E; text-decoration: none;">Go to Dashboard</a>
        </p>
      </div>
    </div>
  `;
    try {
        await sendEmail({
            to: adminEmail,
            subject,
            html
        });
        console.log(`✅ Admin notification sent for new ${type}`);
    } catch (error) {
        console.error('Failed to send admin notification:', error);
    // Don't throw - admin notification failure shouldn't block user action
    }
}
async function notifySubscribersNewOpportunity(opportunityData) {
    // Get all active subscribers
    const subscribers = await getActiveSubscribers();
    if (subscribers.length === 0) {
        console.log('No active subscribers to notify');
        return {
            success: true,
            totalSent: 0,
            batches: 0
        };
    }
    const siteUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
    const excerpt = opportunityData.description.substring(0, 200) + '...';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F3F4F6;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 50px 30px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 15px;">🎯</div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">New Opportunity Alert!</h1>
        <p style="color: white; margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">
          Don't miss out on this exciting opportunity
        </p>
      </div>

      <!-- Content -->
      <div style="background: white; padding: 40px 30px;">
        ${opportunityData.image ? `
          <div style="text-align: center; margin: 0 0 30px 0;">
            <img src="${opportunityData.image}" 
                 alt="${opportunityData.title}" 
                 style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
          </div>
        ` : ''}

        <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); 
                    padding: 8px 16px; 
                    border-radius: 20px; 
                    display: inline-block; 
                    margin-bottom: 20px;">
          <span style="color: #92400E; font-weight: 600; font-size: 14px; text-transform: uppercase;">
            ${opportunityData.category || 'Opportunity'}
          </span>
        </div>

        <h2 style="color: #1F2937; margin: 0 0 15px 0; font-size: 28px; line-height: 1.3;">
          ${opportunityData.title}
        </h2>

        ${opportunityData.organization ? `
          <p style="color: #6B7280; margin: 0 0 20px 0; font-size: 16px;">
            <strong>By:</strong> ${opportunityData.organization}
          </p>
        ` : ''}

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 25px 0; font-size: 16px;">
          ${excerpt}
        </p>

        ${opportunityData.deadline ? `
          <div style="background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%); 
                      padding: 15px 20px; 
                      border-radius: 8px; 
                      margin: 25px 0;
                      border-left: 4px solid #EF4444;">
            <p style="color: #991B1B; margin: 0; font-size: 15px;">
              ⏰ <strong>Deadline:</strong> ${opportunityData.deadline}
            </p>
          </div>
        ` : ''}

        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0 30px 0;">
          <a href="${opportunityData.applyLink}" 
             style="display: inline-block; 
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); 
                    color: white; 
                    text-decoration: none; 
                    padding: 18px 50px; 
                    border-radius: 8px; 
                    font-weight: bold;
                    font-size: 18px;
                    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
                    transition: transform 0.2s;">
            Apply Now →
          </a>
        </div>

        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 30px 0 0 0; text-align: center;">
          <p style="color: #6B7280; margin: 0; font-size: 14px; line-height: 1.6;">
            💡 <strong>Pro Tip:</strong> Apply early! Many opportunities are filled on a first-come, first-served basis.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #1F2937; padding: 30px; text-align: center;">
        <p style="color: #9CA3AF; margin: 0 0 15px 0; font-size: 14px;">
          You're receiving this because you subscribed to Rise for Impact opportunities.
        </p>
        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
          <a href="${siteUrl}/unsubscribe" style="color: #F59E0B; text-decoration: none;">Unsubscribe</a> • 
          <a href="${siteUrl}" style="color: #F59E0B; text-decoration: none;">Visit Website</a>
        </p>
        <p style="color: #6B7280; margin: 15px 0 0 0; font-size: 12px;">
          © ${new Date().getFullYear()} Rise for Impact. Empowering African Youth Leaders.
        </p>
      </div>
    </div>
  `;
    // Send in batches to avoid rate limits (50 emails per batch)
    const batchSize = 50;
    const results = [];
    for(let i = 0; i < subscribers.length; i += batchSize){
        const batch = subscribers.slice(i, i + batchSize);
        const result = await sendEmail({
            to: batch,
            subject: `🎯 New Opportunity: ${opportunityData.title}`,
            html
        });
        results.push(result);
        // Wait 1 second between batches to avoid rate limiting
        if (i + batchSize < subscribers.length) {
            await new Promise((resolve)=>setTimeout(resolve, 1000));
        }
    }
    console.log(`✅ Opportunity notification sent to ${subscribers.length} subscribers`);
    return {
        success: true,
        totalSent: subscribers.length,
        batches: results.length
    };
}
}),
"[project]/src/app/api/volunteers/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-notifications.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const volunteers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].volunteerApplication.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteer applications:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch volunteer applications'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const volunteer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].volunteerApplication.create({
            data: body
        });
        // Send instant confirmation email (non-blocking)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyApplicationReceived"])({
            name: body.fullName || body.name,
            email: body.email,
            type: `Volunteer - ${body.role || 'General'}`,
            isDonation: false
        }).catch((error)=>{
            console.error('Failed to send volunteer confirmation email:', error);
        // Don't fail the submission if email fails
        });
        // Notify admin about new volunteer (non-blocking)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAdminNewSubmission"])({
            type: 'volunteer',
            name: body.fullName || body.name,
            email: body.email,
            submissionType: 'Volunteer Application',
            role: body.role,
            message: body.motivation
        }).catch((error)=>{
            console.error('Failed to send admin notification:', error);
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(volunteer, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating volunteer application:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create volunteer application'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__307f107f._.js.map