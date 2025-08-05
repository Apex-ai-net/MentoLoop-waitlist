const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@mentoloop.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mentoloop.com';

const getEmailTemplate = (formData) => {
  const { fullName, role } = formData;
  
  let subject = '';
  let content = '';
  
  switch (role) {
    case 'student':
      subject = 'Welcome to MentoLoop - Your Clinical Placement Journey Starts Here!';
      content = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 10px;">Welcome to MentoLoop!</h1>
            <p style="color: #6b7280; font-size: 16px;">Your journey to meaningful clinical experiences begins now</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hi ${fullName},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining the MentoLoop waitlist! You're now part of a growing community of nurse practitioner students 
            who are transforming their clinical education experience.
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-bottom: 15px;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;">We'll notify you as soon as MentoLoop launches</li>
              <li style="margin-bottom: 10px;">You'll get early access to our MentorFit™ matching system</li>
              <li style="margin-bottom: 10px;">Connect with verified, experienced preceptors in your area</li>
              <li>Join a supportive community focused on mentorship and growth</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            In the meantime, follow us on social media for updates and tips on making the most of your clinical rotations.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              Questions? Reply to this email - we'd love to hear from you!
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>MentoLoop - Transforming nursing education through meaningful connections</p>
          </div>
        </div>
      `;
      break;
      
    case 'preceptor':
      subject = 'Welcome to MentoLoop - Shape the Future of Nursing Education!';
      content = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 28px; margin-bottom: 10px;">Welcome to MentoLoop!</h1>
            <p style="color: #6b7280; font-size: 16px;">Thank you for being part of the mentorship revolution</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hi ${fullName},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining MentoLoop as a preceptor! Your experience and dedication to mentoring the next generation 
            of nurse practitioners is exactly what our platform was built to support.
          </p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-bottom: 15px;">What makes MentoLoop different for preceptors?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;">Smart matching with students who fit your teaching style</li>
              <li style="margin-bottom: 10px;">Streamlined communication and scheduling tools</li>
              <li style="margin-bottom: 10px;">No administrative hassle - we handle the paperwork</li>
              <li style="margin-bottom: 10px;">Recognition and rewards for your mentorship</li>
              <li>Connect with other preceptors in our professional community</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We'll be in touch soon with launch updates and early access to set up your preceptor profile.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              Have questions about becoming a MentoLoop preceptor? We're here to help!
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>MentoLoop - Transforming nursing education through meaningful connections</p>
          </div>
        </div>
      `;
      break;
      
    case 'school':
      subject = 'Welcome to MentoLoop - Streamline Your Clinical Placements!';
      content = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ea580c; font-size: 28px; margin-bottom: 10px;">Welcome to MentoLoop!</h1>
            <p style="color: #6b7280; font-size: 16px;">Revolutionizing clinical placements for nursing programs</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hi ${fullName},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your interest in MentoLoop! We're excited to work with forward-thinking nursing programs 
            that prioritize quality clinical experiences and meaningful mentorship.
          </p>
          
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ea580c; margin-bottom: 15px;">How MentoLoop supports nursing programs:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;">Streamlined clinical placement coordination</li>
              <li style="margin-bottom: 10px;">Access to our vetted network of preceptors</li>
              <li style="margin-bottom: 10px;">Real-time tracking and communication tools</li>
              <li style="margin-bottom: 10px;">Reduced administrative burden on faculty</li>
              <li>Comprehensive reporting and analytics</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Our team will reach out soon to discuss how MentoLoop can support your program's clinical placement needs.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              Ready to learn more? We'd love to schedule a demo for your team.
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>MentoLoop - Transforming nursing education through meaningful connections</p>
          </div>
        </div>
      `;
      break;
  }
  
  // Create plain text version
  const textContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return {
    to: formData.email,
    subject,
    html: content,
    text: textContent
  };
};

const getAdminNotificationTemplate = (formData) => {
  const { fullName, email, role, referralSource } = formData;
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short'
  });
  
  const subject = `[MentoLoop] New ${role} signup: ${fullName}`;
  
  const content = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">New Waitlist Signup!</h2>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Role:</td>
              <td style="padding: 8px 0;">
                <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px; text-transform: capitalize;">
                  ${role}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Referral:</td>
              <td style="padding: 8px 0; color: #1f2937;">${referralSource || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Timestamp:</td>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${timestamp}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="https://supabase.com/dashboard/project" 
             style="background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
            View in Supabase Dashboard
          </a>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 6px; font-size: 14px; color: #6b7280;">
        <p style="margin: 0;">This is an automated notification from your MentoLoop waitlist form.</p>
      </div>
    </div>
  `;
  
  // Create plain text version
  const textContent = `
New MentoLoop Waitlist Signup!

Name: ${fullName}
Email: ${email}
Role: ${role}
Referral Source: ${referralSource || 'Not specified'}
Timestamp: ${timestamp}

View the full details in your Supabase dashboard.
  `.trim();
  
  return {
    to: ADMIN_EMAIL,
    subject,
    html: content,
    text: textContent
  };
};

export const handler = async (event) => {
  console.log('Function called!', event.httpMethod);
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('SendGrid API Key exists:', !!SENDGRID_API_KEY);
    console.log('From email:', FROM_EMAIL);
    
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid is not configured');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Email service not configured' })
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const formData = JSON.parse(event.body);
    console.log('Form data received:', formData);
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.role) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Generate both email templates
    const welcomeTemplate = getEmailTemplate(formData);
    const adminTemplate = getAdminNotificationTemplate(formData);
    console.log('Email templates created for:', formData.role);

    // Send both emails in parallel with graceful degradation
    const sendEmail = async (template, emailType) => {
      try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: template.to }],
                subject: template.subject,
              }
            ],
            from: { email: FROM_EMAIL, name: 'MentoLoop Team' },
            content: [
              {
                type: 'text/plain',
                value: template.text
              },
              {
                type: 'text/html',
                value: template.html
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error(`SendGrid error for ${emailType}:`, errorData);
          throw new Error(`SendGrid API error: ${response.status}`);
        }

        console.log(`${emailType} email sent successfully to:`, template.to);
        return { success: true, type: emailType };
      } catch (error) {
        console.error(`Error sending ${emailType} email:`, error);
        return { success: false, type: emailType, error: error.message };
      }
    };

    // Send both emails in parallel
    const [welcomeResult, adminResult] = await Promise.allSettled([
      sendEmail(welcomeTemplate, 'welcome'),
      sendEmail(adminTemplate, 'admin')
    ]);

    // Log results
    console.log('Welcome email result:', welcomeResult);
    console.log('Admin notification result:', adminResult);

    // The welcome email is critical - if it fails, we should throw an error
    if (welcomeResult.status === 'rejected') {
      throw new Error(welcomeResult.reason?.message || 'Failed to send welcome email');
    }

    // Admin email failure is logged but doesn't fail the request
    if (adminResult.status === 'rejected') {
      console.warn('Admin notification failed:', adminResult.reason);
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to send welcome email'
      })
    };
  }
};