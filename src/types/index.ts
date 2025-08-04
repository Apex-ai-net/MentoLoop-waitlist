export interface WaitlistFormData {
  fullName: string;
  email: string;
  role: 'student' | 'preceptor' | 'school';
  referralSource?: string;
}

export interface WaitlistEntry extends WaitlistFormData {
  id: string;
  created_at: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormState {
  status: FormStatus;
  message?: string;
}

export interface ScrollToOptions {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}