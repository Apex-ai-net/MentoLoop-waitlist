import { ArrowDown, Heart, Users, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileOptimizedShaders from './MobileOptimizedShaders';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export default function Hero({ onJoinWaitlist }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-400 overflow-hidden">
      <MobileOptimizedShaders enableBackground={true} enableGradient={true}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-bounce-gentle">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
          <Users className="w-10 h-10 text-white" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}>
          <Stethoscope className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="container-max section-padding text-center text-white relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/Logo outlined.svg" 
              alt="MentoLoop Logo" 
              className="h-72 md:h-80 lg:h-96 w-auto filter drop-shadow-lg"
            />
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            Connect. Learn.{' '}
            <span className="text-secondary-400">Grow.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Transforming nursing education through meaningful connections between 
            <span className="font-semibold text-yellow-300"> NP students</span> and 
            <span className="font-semibold text-yellow-300"> experienced preceptors</span>
          </p>
          
          {/* MentorFit tagline */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 group cursor-pointer hover:bg-white/30 transition-all duration-500 hover:scale-105 professional-glow">
              <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3 animate-pulse group-hover:bg-white group-hover:scale-150 transition-all duration-500"></div>
              <span className="text-lg font-medium group-hover:text-white transition-colors duration-500">
                Powered by <span className="mentorfit-title font-bold">MentorFit™</span> Matching System
              </span>
            </div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Our proprietary algorithm pairs students and preceptors based on learning style, 
              clinical needs, location, and compatibility
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onJoinWaitlist}
              className="btn-accent text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
            >
              Join the Waitlist
            </button>
            
            <button
              onClick={scrollToAbout}
              className="text-white border-2 border-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              Learn More
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
          
          {/* Key benefits */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="bg-secondary-400 text-primary-900 p-4 rounded-full mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="opacity-80 text-center">
                MentorFit™ pairs you with the perfect mentor or student based on compatibility
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="bg-secondary-400 text-primary-900 p-4 rounded-full mb-4">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentorship-First</h3>
              <p className="opacity-80 text-center">
                Focus on meaningful connections and growth, not just filling rotation slots
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="bg-secondary-400 text-primary-900 p-4 rounded-full mb-4">
                <Stethoscope className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Process</h3>
              <p className="opacity-80 text-center">
                We handle intake, scheduling, and communication so you can focus on learning
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Scroll to learn more"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
      </MobileOptimizedShaders>
    </section>
  );
}