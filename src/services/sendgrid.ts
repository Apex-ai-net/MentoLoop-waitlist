import type { WaitlistFormData, ApiResponse } from '../types';

export const sendWelcomeEmail = async (formData: WaitlistFormData): Promise<ApiResponse> => {
  try {
    // Determine the API endpoint based on environment
    const API_BASE = import.meta.env.DEV 
      ? 'http://localhost:8888/.netlify/functions' 
      : '/.netlify/functions';
    
    const response = await fetch(`${API_BASE}/send-email`, {
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