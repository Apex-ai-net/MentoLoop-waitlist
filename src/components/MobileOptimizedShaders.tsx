import { useEffect, useState } from 'react';
import MedicalBackground from './MedicalBackground';
import ProfessionalGradient from './ProfessionalGradient';
import FloatingElements from './FloatingElements';
import ProfessionalOverlay from './ProfessionalOverlay';

interface MobileOptimizedShadersProps {
  children?: React.ReactNode;
  enableBackground?: boolean;
  enableGradient?: boolean;
  enableFloating?: boolean;
  enableOverlay?: boolean;
  className?: string;
}

export default function MobileOptimizedShaders({
  children,
  enableBackground = true,
  enableGradient = true,
  enableFloating = false,
  enableOverlay = false,
  className = ''
}: MobileOptimizedShadersProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [canvasError, setCanvasError] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const lowPerf = window.innerWidth < 480 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(mobile);
      setIsLowPerformance(lowPerf);
    };

    // Test canvas support
    const testCanvas = () => {
      try {
        const testCanv = document.createElement('canvas');
        const testCtx = testCanv.getContext('2d');
        if (!testCtx) {
          setCanvasError(true);
          console.warn('Canvas 2D context not supported, falling back to CSS-only mode');
        }
      } catch (error) {
        setCanvasError(true);
        console.warn('Canvas not supported, falling back to CSS-only mode:', error);
      }
    };

    checkDevice();
    testCanvas();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // On very low performance devices or canvas errors, disable all shaders
  if ((isLowPerformance && window.innerWidth < 480) || canvasError) {
    return (
      <div className={`${className} ${canvasError ? 'canvas-fallback' : ''}`}>
        {/* CSS-only gradient fallback */}
        {enableGradient && (
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-600/5 via-primary-500/10 to-secondary-400/5" />
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Only show simplified effects on mobile */}
      {enableGradient && (!isMobile || window.innerWidth > 600) && (
        <ProfessionalGradient className="opacity-30" variant="subtle" />
      )}
      
      {enableBackground && !isLowPerformance && (
        <MedicalBackground className="opacity-40" />
      )}
      
      {enableFloating && !isMobile && (
        <FloatingElements density="low" className="opacity-50" />
      )}
      
      {enableOverlay && !isMobile && (
        <ProfessionalOverlay className="opacity-20" />
      )}
      
      {children}
    </div>
  );
}