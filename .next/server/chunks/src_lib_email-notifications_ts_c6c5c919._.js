module.exports=[65392,e=>{"use strict";var t=e.i(46245),i=e.i(98043);let o=new t.Resend(process.env.RESEND_API_KEY);async function r({to:e,subject:t,html:i}){try{let r=await o.emails.send({from:"Rise for Impact <noreply@riseforimpact.org>",to:e,subject:t,html:i});return{success:!0,data:r}}catch(e){return{success:!1,error:e}}}async function n(){try{return(await i.prisma.newsletterSubscriber.findMany({where:{isActive:!0},select:{email:!0}})).map(e=>e.email)}catch(e){return[]}}async function a(e){let t=await n();if(0===t.length)return{success:!1,message:"No subscribers"};let i=e.url||"http://localhost:3000/blog",o=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #22C55E, #F59E0B); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Rise for Impact</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Blog Post Published!</p>
      </div>

      <!-- Blog Image -->
      ${e.image?`
        <div style="width: 100%; height: 300px; overflow: hidden;">
          <img src="${e.image}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      `:""}

      <!-- Content -->
      <div style="padding: 30px; background: #F9FAFB;">
        <h2 style="color: #1F2937; margin: 0 0 15px 0;">${e.title}</h2>
        
        <p style="color: #6B7280; font-size: 14px; margin: 0 0 20px 0;">
          By ${e.author} • ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
        </p>

        <p style="color: #4B5563; line-height: 1.6; margin: 0 0 30px 0;">
          ${e.excerpt}
        </p>

        <!-- CTA Button -->
        <div style="text-align: center;">
          <a href="${i}" 
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
          <a href="http://localhost:3000/unsubscribe" style="color: #22C55E; text-decoration: none;">Unsubscribe</a> • 
          <a href="http://localhost:3000" style="color: #22C55E; text-decoration: none;">Visit Website</a>
        </p>
        <p style="color: #6B7280; margin: 15px 0 0 0; font-size: 12px;">
          \xa9 ${new Date().getFullYear()} Rise for Impact. Empowering African Youth Leaders.
        </p>
      </div>
    </div>
  `,a=[];for(let i=0;i<t.length;i+=50){let n=t.slice(i,i+50),l=await r({to:n,subject:`📚 New Blog Post: ${e.title}`,html:o});a.push(l),i+50<t.length&&await new Promise(e=>setTimeout(e,1e3))}return{success:!0,totalSent:t.length,batches:a.length}}async function l(e){let t=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #22C55E, #10b981); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Congratulations!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Your Application Has Been Approved</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${e.name},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          We are thrilled to inform you that your application for <strong style="color: #22C55E;">${e.type}</strong> 
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
          <a href="http://localhost:3000/programs" 
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
          \xa9 ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;return await r({to:e.email,subject:"🎉 Application Approved - Welcome to Rise for Impact!",html:t})}async function s(e){let t=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #EC4899, #F59E0B); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">🙋</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to the Team!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Volunteer Application Approved</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${e.fullName},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          We are excited to welcome you as a <strong style="color: #EC4899;">${e.role}</strong> volunteer 
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
          <a href="http://localhost:3000/get-involved" 
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
          \xa9 ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;return await r({to:e.email,subject:"🙋 Welcome to Rise for Impact Volunteer Team!",html:t})}async function p(e){let t=e.isDonation||!1,i=t?`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #EC4899, #BE185D); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">💚</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Thank You!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Your Generosity Makes a Difference</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${e.name},</h2>
        
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
          <a href="http://localhost:3000/programs" 
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
          \xa9 ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `:`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #3B82F6, #1D4ED8); padding: 40px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
        <h1 style="color: white; margin: 0; font-size: 32px;">Application Received!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">We'll Review and Get Back to You</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Dear ${e.name},</h2>
        
        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
          Thank you for your interest in Rise for Impact! We've successfully received your application for <strong style="color: #3B82F6;">${e.type}</strong>.
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
          <a href="http://localhost:3000/programs" 
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
          \xa9 ${new Date().getFullYear()} Rise for Impact. All rights reserved.
        </p>
      </div>
    </div>
  `;try{await r({to:e.email,subject:t?"💚 Thank You for Your Generous Donation!":"✅ Application Received - Rise for Impact",html:i})}catch(e){throw e}}async function d({type:e,name:t,email:i,submissionType:o,role:n,message:a}){let l=process.env.ADMIN_EMAIL||"admin@riseforimpact.org",s=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, ${"donation"===e?"#EC4899, #BE185D":"volunteer"===e?"#8B5CF6, #7C3AED":"#3B82F6, #1D4ED8"}); padding: 40px 20px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">${"donation"===e?"💚":"volunteer"===e?"🙋":"📨"}</div>
        <h1 style="color: white; margin: 0; font-size: 28px;">New ${"donation"===e?"Donation":"volunteer"===e?"Volunteer":"Application"}!</h1>
      </div>

      <!-- Content -->
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0;">Submission Details</h2>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #1F2937;"><strong>Name:</strong> ${t}</p>
          <p style="margin: 5px 0; color: #1F2937;"><strong>Email:</strong> <a href="mailto:${i}" style="color: #3B82F6;">${i}</a></p>
          <p style="margin: 5px 0; color: #1F2937;"><strong>Type:</strong> ${o}</p>
          ${n?`<p style="margin: 5px 0; color: #1F2937;"><strong>Role:</strong> ${n}</p>`:""}
          ${a?`<p style="margin: 5px 0; color: #1F2937;"><strong>Message:</strong> ${a}</p>`:""}
          <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        ${"donation"===e?`
          <div style="background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EC4899;">
            <p style="color: #9F1239; margin: 0;">
              💰 <strong>Action Required:</strong> Process donation and send official receipt.
            </p>
          </div>
        `:`
          <div style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
            <p style="color: #1E40AF; margin: 0;">
              ⏰ <strong>Action Required:</strong> Review and respond within 5-7 business days.
            </p>
          </div>
        `}

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000/admin/${"volunteer"===e?"volunteers":"applications"}" 
             style="display: inline-block; 
                    background: linear-gradient(to right, ${"donation"===e?"#EC4899, #BE185D":"volunteer"===e?"#8B5CF6, #7C3AED":"#3B82F6, #1D4ED8"}); 
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
          <a href="http://localhost:3000/admin/dashboard" style="color: #22C55E; text-decoration: none;">Go to Dashboard</a>
        </p>
      </div>
    </div>
  `;try{await r({to:l,subject:"donation"===e?"💚 New Donation Received!":"volunteer"===e?"🙋 New Volunteer Application!":"📨 New Application Submitted!",html:s})}catch(e){}}async function g(e){let t=await n();if(0===t.length)return{success:!0,totalSent:0,batches:0};let i="http://localhost:3000",o=e.description.substring(0,200)+"...",a=`
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
        ${e.image?`
          <div style="text-align: center; margin: 0 0 30px 0;">
            <img src="${e.image}" 
                 alt="${e.title}" 
                 style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
          </div>
        `:""}

        <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); 
                    padding: 8px 16px; 
                    border-radius: 20px; 
                    display: inline-block; 
                    margin-bottom: 20px;">
          <span style="color: #92400E; font-weight: 600; font-size: 14px; text-transform: uppercase;">
            ${e.category||"Opportunity"}
          </span>
        </div>

        <h2 style="color: #1F2937; margin: 0 0 15px 0; font-size: 28px; line-height: 1.3;">
          ${e.title}
        </h2>

        ${e.organization?`
          <p style="color: #6B7280; margin: 0 0 20px 0; font-size: 16px;">
            <strong>By:</strong> ${e.organization}
          </p>
        `:""}

        <p style="color: #4B5563; line-height: 1.8; margin: 0 0 25px 0; font-size: 16px;">
          ${o}
        </p>

        ${e.deadline?`
          <div style="background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%); 
                      padding: 15px 20px; 
                      border-radius: 8px; 
                      margin: 25px 0;
                      border-left: 4px solid #EF4444;">
            <p style="color: #991B1B; margin: 0; font-size: 15px;">
              ⏰ <strong>Deadline:</strong> ${e.deadline}
            </p>
          </div>
        `:""}

        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0 30px 0;">
          <a href="${e.applyLink}" 
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
          <a href="${i}/unsubscribe" style="color: #F59E0B; text-decoration: none;">Unsubscribe</a> • 
          <a href="${i}" style="color: #F59E0B; text-decoration: none;">Visit Website</a>
        </p>
        <p style="color: #6B7280; margin: 15px 0 0 0; font-size: 12px;">
          \xa9 ${new Date().getFullYear()} Rise for Impact. Empowering African Youth Leaders.
        </p>
      </div>
    </div>
  `,l=[];for(let i=0;i<t.length;i+=50){let o=t.slice(i,i+50),n=await r({to:o,subject:`🎯 New Opportunity: ${e.title}`,html:a});l.push(n),i+50<t.length&&await new Promise(e=>setTimeout(e,1e3))}return{success:!0,totalSent:t.length,batches:l.length}}e.s(["getActiveSubscribers",()=>n,"notifyAdminNewSubmission",()=>d,"notifyApplicationApproved",()=>l,"notifyApplicationReceived",()=>p,"notifySubscribersNewBlog",()=>a,"notifySubscribersNewOpportunity",()=>g,"notifyVolunteerApproved",()=>s,"sendEmail",()=>r])}];

//# sourceMappingURL=src_lib_email-notifications_ts_c6c5c919._.js.map