import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfServiceModal from './components/TermsOfServiceModal';

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onJoinWaitlist={scrollToWaitlist} />
      
      {/* About Section */}
      <About />
      
      {/* Waitlist Form Section */}
      <WaitlistForm />
      
      {/* Footer */}
      <Footer 
        onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)}
        onShowTermsOfService={() => setShowTermsOfService(true)}
      />
      
      {/* Floating Action Button for Mobile */}
      <button
        onClick={scrollToWaitlist}
        className="fixed bottom-6 right-6 bg-accent-600 hover:bg-accent-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 z-50 md:hidden"
        aria-label="Join waitlist"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Modals */}
      <PrivacyPolicyModal 
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
      <TermsOfServiceModal 
        isOpen={showTermsOfService}
        onClose={() => setShowTermsOfService(false)}
      />
    </div>
  );
}

export default App;