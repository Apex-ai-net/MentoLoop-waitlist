import type { WaitlistFormData, ApiResponse } from '../types';

export const sendWelcomeEmail = async (formData: WaitlistFormData): Promise<ApiResponse> => {
  try {
    // In development, skip the email and return success
    if (import.meta.env.DEV) {
      console.log('Development mode: Skipping email send for:', formData.email);
      return {
        success: true,
        message: 'Email service disabled in development mode'
      };
    }

    // In production, use Netlify functions
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Email service error:', errorData);
      throw new Error(`Email service error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send welcome email'
    };
  }
};