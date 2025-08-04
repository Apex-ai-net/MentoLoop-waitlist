import { Mail, MapPin } from 'lucide-react';
import ProfessionalGradient from './ProfessionalGradient';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
  onShowTermsOfService: () => void;
}

export default function Footer({ onShowPrivacyPolicy, onShowTermsOfService }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Professional background effects */}
      <ProfessionalGradient className="opacity-10" variant="subtle" />
      <div className="container-max py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/Logo outlined.svg" 
                alt="MentoLoop Logo" 
                className="h-14 md:h-16 w-auto mr-4 filter drop-shadow-lg"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transforming nursing education through meaningful connections between 
              students and experienced healthcare professionals.
            </p>
            <button
              onClick={scrollToWaitlist}
              className="btn-primary inline-flex items-center"
            >
              Join Our Community
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToWaitlist}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email us</p>
                  <a 
                    href="mailto:support@mentoloop.com" 
                    className="text-white hover:text-primary-400 transition-colors duration-200"
                  >
                    support@mentoloop.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Serving</p>
                  <p className="text-white">Nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MentorFit™ Highlight */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-400 rounded-lg p-6 text-center group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] medical-card">
            <h4 className="text-xl font-bold mb-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse group-hover:bg-secondary-200 group-hover:scale-150 transition-all duration-500 mentorfit-icon"></div>
              Powered by <span className="mentorfit-title ml-1">MentorFit™</span>
            </h4>
            <p className="text-white opacity-90">
              Our proprietary matching system creates perfect mentor-student pairs 
              based on compatibility, learning style, and clinical needs.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 MentoLoop. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <button 
              onClick={onShowPrivacyPolicy}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onShowTermsOfService}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}