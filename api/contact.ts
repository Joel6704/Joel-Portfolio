// Vercel Serverless Function: api/contact.ts
// Handles secure submission, validation, honeypot spam protection,
// and delivery to Gmail via Nodemailer (Gmail SMTP / App Password) or Resend API.

import nodemailer from 'nodemailer';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only POST requests are supported.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, subject, message, _honey } = body;

    // 1. Honeypot Anti-Spam Check: If hidden field is filled, silently ignore bot
    if (_honey && String(_honey).trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      });
    }

    // 2. Server-side Validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Your name is required (minimum 2 characters).';
    } else if (name.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    // Subject / Inquiry Type is optional per requirements
    if (subject && typeof subject === 'string' && subject.trim().length > 150) {
      errors.subject = 'Subject cannot exceed 150 characters.';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    } else if (message.trim().length > 3000) {
      errors.message = 'Message cannot exceed 3000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed.',
        errors,
      });
    }

    const inquiryType = subject && typeof subject === 'string' && subject.trim().length > 0
      ? subject.trim()
      : 'General Inquiry';

    const submissionDate = new Date();
    const formattedReceivedAt = submissionDate.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: inquiryType,
      message: message.trim(),
      timestamp: submissionDate.toISOString(),
      formattedDate: formattedReceivedAt,
      userAgent: req.headers?.['user-agent'] || 'Unknown',
      ip: req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown',
    };

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'joelt6704@gmail.com';
    const emailSubject = `New Portfolio Inquiry — ${inquiryType}`;

    const plainTextContent = `New Portfolio Inquiry

Subject: ${emailSubject}
Sender Name: ${cleanData.name}
Sender Email: ${cleanData.email}
Inquiry Type: ${cleanData.subject}
Received At: ${cleanData.formattedDate}

Message:
${cleanData.message}

---
Delivered to: ${recipientEmail}
Sent from Joel Thomas Portfolio (IP: ${cleanData.ip})`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060B18; margin: 0; padding: 24px; color: #F8FAFC;">
  <div style="max-width: 600px; margin: 0 auto; background: #0A1228; border: 1px solid #172554; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: #060B18; padding: 24px 28px; border-bottom: 2px solid #0066FF;">
      <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 6px 0; font-weight: 700; letter-spacing: 0.5px;">New Portfolio Inquiry</h1>
      <p style="color: #94A3B8; font-size: 13px; margin: 0;">Joel Thomas Portfolio Contact Form</p>
    </div>
    <div style="padding: 28px;">
      <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #172554;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38BDF8; font-weight: 600; margin-bottom: 4px;">Sender Name</div>
        <div style="font-size: 15px; color: #FFFFFF; font-weight: 600;">${escapeHtml(cleanData.name)}</div>
      </div>
      <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #172554;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38BDF8; font-weight: 600; margin-bottom: 4px;">Sender Email</div>
        <div style="font-size: 15px; color: #FFFFFF;"><a href="mailto:${escapeHtml(cleanData.email)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(cleanData.email)}</a></div>
      </div>
      <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #172554;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38BDF8; font-weight: 600; margin-bottom: 4px;">Inquiry Type</div>
        <div style="font-size: 15px; color: #FFFFFF; font-weight: 500;">${escapeHtml(cleanData.subject)}</div>
      </div>
      <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #172554;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38BDF8; font-weight: 600; margin-bottom: 4px;">Received At</div>
        <div style="font-size: 14px; color: #94A3B8;">${escapeHtml(cleanData.formattedDate)}</div>
      </div>
      <div style="margin-top: 10px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #38BDF8; font-weight: 600; margin-bottom: 8px;">Message</div>
        <div style="background: #060B18; border: 1px solid #172554; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap;">${escapeHtml(cleanData.message)}</div>
      </div>
    </div>
    <div style="background: #060B18; padding: 16px 28px; font-size: 12px; color: #64748B; text-align: center; border-top: 1px solid #172554;">
      You can directly reply to this email to respond to <strong style="color: #94A3B8;">${escapeHtml(cleanData.name)}</strong> at <a href="mailto:${escapeHtml(cleanData.email)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(cleanData.email)}</a>.
    </div>
  </div>
</body>
</html>`;

    let emailDelivered = false;
    let deliveryProvider = '';

    // 3. Option A: Deliver via Gmail SMTP (Nodemailer)
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (gmailUser && gmailPass) {
      try {
        const isGmail = !process.env.SMTP_HOST || process.env.SMTP_HOST.includes('gmail');
        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: 'gmail',
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              }
            : {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 465,
                secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              }
        );

        await transporter.sendMail({
          from: `"${cleanData.name} (Portfolio)" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: cleanData.email,
          subject: emailSubject,
          text: plainTextContent,
          html: htmlContent,
        });

        emailDelivered = true;
        deliveryProvider = 'Gmail SMTP';
      } catch (smtpErr: any) {
        console.error('SMTP sending error:', smtpErr);
        throw new Error(`Gmail SMTP delivery failed: ${smtpErr?.message || 'Check credentials'}`);
      }
    }

    // 4. Option B: Deliver via Resend API (if RESEND_API_KEY is configured and SMTP wasn't used)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!emailDelivered && resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Joel Thomas Portfolio <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: cleanData.email,
            subject: emailSubject,
            text: plainTextContent,
            html: htmlContent,
          }),
        });

        if (resendRes.ok) {
          emailDelivered = true;
          deliveryProvider = 'Resend';
        } else {
          const errorText = await resendRes.text();
          console.warn('Resend email warning:', errorText);
          throw new Error(`Resend email delivery failed: ${errorText}`);
        }
      } catch (resendErr: any) {
        console.error('Resend delivery error:', resendErr);
        throw resendErr;
      }
    }

    // 5. Optional: Supabase Storage via REST
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            name: cleanData.name,
            email: cleanData.email,
            subject: cleanData.subject,
            message: cleanData.message,
            created_at: cleanData.timestamp,
          }),
        });
      } catch (dbErr) {
        console.warn('Supabase logging non-blocking error:', dbErr);
      }
    }

    console.log(`[Contact Submission] ${cleanData.timestamp} - ${cleanData.name} (${cleanData.email}) [${deliveryProvider || 'No backend email configured'}]`);

    // If neither email delivery method was configured on the server:
    if (!emailDelivered) {
      return res.status(503).json({
        success: false,
        error: 'Email delivery service is not configured on the server. Please configure GMAIL_USER & GMAIL_APP_PASSWORD, RESEND_API_KEY, or EmailJS public keys in environment variables.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      provider: deliveryProvider,
    });
  } catch (err: any) {
    console.error('Contact handler error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'An internal server error occurred while sending your message. Please try again.',
    });
  }
}
