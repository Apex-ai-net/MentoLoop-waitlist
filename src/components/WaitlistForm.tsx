import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { waitlistSchema, type WaitlistValidationSchema, formatName } from '../utils/validation';
import { submitToWaitlist } from '../services/supabase';
import { sendWelcomeEmail } from '../services/sendgrid';
import type { FormState } from '../types';
import ProfessionalGradient from './ProfessionalGradient';
import FloatingElements from './FloatingElements';

export default function WaitlistForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<WaitlistValidationSchema>({
    resolver: zodResolver(waitlistSchema),
    mode: 'onChange'
  });

  const selectedRole = watch('role');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: WaitlistValidationSchema) => {
    setFormState({ status: 'loading' });

    try {
      // Format the data
      const formattedData = {
        ...data,
        fullName: formatName(data.fullName),
        email: data.email.toLowerCase().trim(),
      };

      // Submit to Supabase
      const supabaseResult = await submitToWaitlist(formattedData);
      
      if (!supabaseResult.success) {
        setFormState({
          status: 'error',
          message: supabaseResult.error || 'Failed to join waitlist. Please try again.'
        });
        return;
      }

      // Send welcome email (don't fail if this doesn't work)
      await sendWelcomeEmail(formattedData);

      // Success!
      setFormState({
        status: 'success',
        message: `Welcome to MentoLoop, ${formattedData.fullName}! Check your email for next steps.`
      });

      // Reset form after a delay
      setTimeout(() => {
        reset();
        setFormState({ status: 'idle' });
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'student':
        return 'Find your perfect preceptor match and accelerate your clinical learning journey.';
      case 'preceptor':
        return 'Shape the future of nursing by mentoring the next generation of NPs.';
      case 'school':
        return 'Streamline clinical placements and enhance your program\'s success.';
      default:
        return 'Join our community of healthcare professionals transforming nursing education.';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <User className="w-5 h-5" />;
      case 'preceptor':
        return <Users className="w-5 h-5" />;
      case 'school':
        return <Users className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  if (formState.status === 'success') {
    return (
      <section 
        id="waitlist" 
        ref={sectionRef}
        className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden"
      >
        {/* Professional background effects for success state */}
        <ProfessionalGradient className="opacity-20" variant="secondary" />
        <FloatingElements density="low" className="opacity-30" />
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-12 animate-fade-in">
              <div className="bg-secondary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-secondary-600" />
              </div>
              <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                Welcome to MentoLoop
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                {formState.message}
              </p>
              <div className="bg-secondary-50 p-6 rounded-lg">
                <p className="text-secondary-800 font-medium">
                  What's next? We'll notify you as soon as MentoLoop launches with your 
                  early access invitation and setup instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="waitlist" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden"
    >
      {/* Professional background effects */}
      <ProfessionalGradient className="opacity-40" variant="secondary" />
      <FloatingElements density="medium" className="opacity-50" />
      <div className="container-max">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
              Join the <span className="text-primary-600">MentoLoop</span> Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be among the first to experience the future of nursing education. 
              Get early access and exclusive launch updates.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden medical-card">
              {/* Form header with role description */}
              {selectedRole && (
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
                  <div className="flex items-center justify-center mb-3">
                    {getRoleIcon(selectedRole)}
                    <span className="ml-2 font-semibold capitalize">{selectedRole}</span>
                  </div>
                  <p className="text-center opacity-90">
                    {getRoleDescription(selectedRole)}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="form-label">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                    disabled={formState.status === 'loading'}
                  />
                  {errors.fullName && (
                    <p className="form-error">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email address"
                    disabled={formState.status === 'loading'}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="form-label">
                    <Users className="w-4 h-4 inline mr-2" />
                    I am a... *
                  </label>
                  <select
                    {...register('role')}
                    id="role"
                    className={`form-input ${errors.role ? 'border-red-500' : ''}`}
                    disabled={formState.status === 'loading'}
                  >
                    <option value="">Select your role</option>
                    <option value="student">NP Student</option>
                    <option value="preceptor">Preceptor</option>
                    <option value="school">School/Program</option>
                  </select>
                  {errors.role && (
                    <p className="form-error">{errors.role.message}</p>
                  )}
                </div>

                {/* Referral Source */}
                <div>
                  <label htmlFor="referralSource" className="form-label">
                    How did you hear about us? (Optional)
                  </label>
                  <select
                    {...register('referralSource')}
                    id="referralSource"
                    className="form-input"
                    disabled={formState.status === 'loading'}
                  >
                    <option value="">Select an option</option>
                    <option value="social-media">Social Media</option>
                    <option value="colleague">Colleague/Friend</option>
                    <option value="school">My School/Program</option>
                    <option value="conference">Conference/Event</option>
                    <option value="online-search">Online Search</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Error message */}
                {formState.status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{formState.message}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formState.status === 'loading'}
                  className="btn-primary w-full text-lg flex items-center justify-center"
                >
                  {formState.status === 'loading' ? (
                    <>
                      <Loader className="w-5 h-5 mr-3 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    'Join the Waitlist'
                  )}
                </button>

                {/* Privacy note */}
                <p className="text-sm text-gray-500 text-center">
                  By joining our waitlist, you agree to receive updates about MentoLoop. 
                  We respect your privacy and won't share your information with third parties.
                </p>
              </form>
            </div>

            {/* Additional benefits */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Early Access</h4>
                <p className="text-gray-600 text-sm">
                  Be the first to use MentorFit™ and get priority matching
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-secondary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Launch Updates</h4>
                <p className="text-gray-600 text-sm">
                  Get exclusive insights and updates as we build the platform
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Access</h4>
                <p className="text-gray-600 text-sm">
                  Join our exclusive community of NP students and preceptors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}