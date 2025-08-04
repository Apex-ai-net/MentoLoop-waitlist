import { X } from 'lucide-react';
import { useEffect } from 'react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative medical-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-sm text-gray-600 mb-4">
            <strong>Effective Date:</strong> December 2024
          </div>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using MentoLoop ("the Service"), you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              MentoLoop is a platform that connects nurse practitioner students with experienced 
              healthcare professionals for mentorship and clinical guidance. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>MentorFit™ matching algorithm to pair mentors and mentees</li>
              <li>Communication tools and resources</li>
              <li>Educational content and guidance</li>
              <li>Professional networking opportunities</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Users agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain professional conduct at all times</li>
              <li>Respect confidentiality and privacy of other users</li>
              <li>Not use the service for illegal or unauthorized purposes</li>
              <li>Comply with all applicable healthcare regulations and standards</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Professional Guidance Disclaimer</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">
                <strong>Important:</strong> MentoLoop facilitates mentorship connections but does not 
                provide medical advice, diagnosis, or treatment. All clinical guidance should be 
                verified with appropriate supervisors and healthcare institutions. Users are 
                responsible for following their institution's policies and procedures.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Privacy and Data</h3>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how 
              we collect, use, and protect your information. By using our service, you consent to 
              the collection and use of information as outlined in our Privacy Policy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content, features, and functionality are and will remain 
              the exclusive property of MentoLoop and its licensors. The Service is protected by 
              copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">
              MentoLoop shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of the service. Our total liability shall 
              not exceed the amount paid by you for the service in the twelve months preceding the 
              claim.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Termination</h3>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and bar access to the Service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever 
              including breach of the Terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is 
              material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Information</h3>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@mentoloop.com<br />
                <strong>Company:</strong> MentoLoop
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            I Agree to These Terms
          </button>
        </div>
      </div>
    </div>
  );
}