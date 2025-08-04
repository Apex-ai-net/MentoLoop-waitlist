import { CheckCircle, Target, Award, Shield, Clock, Users, Heart, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MobileOptimizedShaders from './MobileOptimizedShaders';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const features = [
    {
      icon: Target,
      title: "Smart Matching with MentorFit™",
      description: "We pair students and preceptors using a proprietary compatibility score based on learning style, specialty, location, and availability.",
      color: "text-primary-600"
    },
    {
      icon: Zap,
      title: "Seamless Process",
      description: "Our platform handles intake, scheduling, and communication, so there's no endless emailing or phone tag.",
      color: "text-secondary-600"
    },
    {
      icon: Heart,
      title: "Mentorship-First Approach",
      description: "We prioritize connection and growth, not just filling a rotation slot.",
      color: "text-accent-600"
    },
    {
      icon: Shield,
      title: "Trusted Preceptors",
      description: "Every preceptor is verified and vetted, so students can train with confidence.",
      color: "text-primary-600"
    },
    {
      icon: Award,
      title: "Affordable & Transparent",
      description: "Clear pricing for students and no-cost onboarding for preceptors, with optional perks and rewards.",
      color: "text-secondary-600"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our team helps troubleshoot, guide, and keep rotations running smoothly.",
      color: "text-accent-600"
    },
    {
      icon: Users,
      title: "Growing NP Community",
      description: "Join a network built for students, preceptors, and programs to connect, grow, and elevate the NP profession together.",
      color: "text-primary-600"
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      <MobileOptimizedShaders enableGradient={true} enableFloating={true}>
      <div className="container-max">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
              About <span className="text-primary-600">MentoLoop</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming nursing education through meaningful connections between 
              students and experienced healthcare professionals.
            </p>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                About Us
              </h3>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  MentoLoop is a nurse practitioner–led platform designed to bridge the gap between 
                  NP students and experienced preceptors. Our mission is to make clinical placements 
                  seamless, stress-free, and mentorship-driven — so every NP student can thrive, 
                  and every preceptor feels supported.
                </p>
                
                <p>
                  We combine the human touch of mentorship with smart technology, including our 
                  exclusive <span className="font-semibold text-primary-600 mentorfit-title cursor-pointer hover:scale-105 inline-block transition-transform duration-300">MentorFit™ matching system</span>, 
                  which pairs students and preceptors based on learning style, clinical needs, 
                  location, and compatibility.
                </p>
                
                <p>
                  Our platform handles the details — intake, matching, scheduling, and communication — 
                  so students can focus on learning and preceptors can focus on teaching, 
                  without the administrative hassle.
                </p>
                
                <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-600">
                  <p className="font-medium text-primary-900">
                    At MentoLoop, we believe in creating a connected, mentorship-first community 
                    where nurse practitioners can grow, teach, and lead the next generation of providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-secondary-400 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 p-4 rounded-full mr-4 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 professional-glow mentorfit-icon">
                    <Target className="w-10 h-10 group-hover:text-secondary-200 transition-colors duration-500" />
                  </div>
                  <h4 className="text-2xl font-bold relative group cursor-pointer transform group-hover:scale-105 transition-transform duration-500">
                    <span className="mentorfit-title">
                      MentorFit™ System
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-secondary-400/30 to-white/30 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
                    <div className="absolute -inset-1 bg-white/10 rounded-lg opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                  </h4>
                </div>
                <p className="text-lg opacity-90 mb-6">
                  Our proprietary matching algorithm considers multiple factors to create 
                  perfect mentor-student pairs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary-400 mr-3" />
                    <span>Learning style compatibility</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary-400 mr-3" />
                    <span>Clinical specialty alignment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary-400 mr-3" />
                    <span>Geographic proximity</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary-400 mr-3" />
                    <span>Schedule compatibility</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary-400 mr-3" />
                    <span>Personality and communication style</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose MentoLoop */}
          <div>
            <h3 className="text-3xl font-bold font-heading text-gray-900 text-center mb-12">
              Why Choose <span className="text-primary-600">MentoLoop?</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 medical-card hover:professional-glow"
                >
                  <div className={`${feature.color} mb-6`}>
                    <feature.icon className="w-16 h-16" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </MobileOptimizedShaders>
    </section>
  );
}