import { createClient } from '@supabase/supabase-js';
import type { WaitlistFormData, WaitlistEntry, ApiResponse } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const submitToWaitlist = async (formData: WaitlistFormData): Promise<ApiResponse<WaitlistEntry>> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email.toLowerCase(),
          role: formData.role,
          referral_source: formData.referralSource || null,
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return {
          success: false,
          error: 'This email is already registered for our waitlist.'
        };
      }
      
      throw error;
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.'
    };
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return false;
    }

    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking email:', error);
    }

    return !!data;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};