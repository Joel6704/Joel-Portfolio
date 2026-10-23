import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  _honey?: string;
}

export interface SendEmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const RECIPIENT_EMAIL = 'joelt6704@gmail.com';

/**
 * Format current date & time cleanly for email delivery
 */
export function getFormattedSubmissionTime(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Unified email sending service.
 * Supports:
 * 1. Client-Side direct delivery to Gmail via EmailJS (when VITE_EMAILJS_* keys are configured)
 * 2. Secure Server-Side delivery to Gmail via /api/contact (Resend or Gmail SMTP)
 */
export async function sendContactEmail(data: ContactFormData): Promise<SendEmailResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const inquiryType = data.subject && data.subject.trim().length > 0
    ? data.subject.trim()
    : 'General Inquiry';
  
  const formattedDate = getFormattedSubmissionTime();

  // 1. Client-Side EmailJS delivery
  if (serviceId && templateId && publicKey) {
    try {
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        to_name: 'Joel Thomas',
        from_name: data.name.trim(),
        name: data.name.trim(),
        from_email: data.email.trim(),
        email: data.email.trim(),
        reply_to: data.email.trim(),
        subject: `New Portfolio Inquiry — ${inquiryType}`,
        inquiry_type: inquiryType,
        message: data.message.trim(),
        received_at: formattedDate,
      };

      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (res.status === 200 || res.text === 'OK') {
        return {
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        };
      }
      return {
        success: false,
        error: `EmailJS responded with status ${res.status}: ${res.text}`,
      };
    } catch (err: any) {
      console.error('EmailJS error:', err);
      return {
        success: false,
        error: err?.text || err?.message || 'Failed to deliver message via EmailJS. Please try again.',
      };
    }
  }

  // 2. Server-side /api/contact delivery
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: inquiryType,
        message: data.message.trim(),
        _honey: data._honey || '',
      }),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && result?.success) {
      return {
        success: true,
        message: result.message || 'Thank you! Your message has been sent successfully.',
      };
    }

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    if (result?.errors) {
      const firstError = Object.values(result.errors)[0] as string;
      return {
        success: false,
        error: firstError || 'Form validation failed on server.',
      };
    }

    return {
      success: false,
      error: `Server responded with status ${response.status}. Please try again later.`,
    };
  } catch (err: any) {
    console.error('Contact API fetch error:', err);
    return {
      success: false,
      error:
        'Unable to connect to the email server. Please check your internet connection or email joelt6704@gmail.com directly.',
    };
  }
}
