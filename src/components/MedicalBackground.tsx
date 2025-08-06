import { useEffect, useRef, useState } from 'react';

interface MedicalBackgroundProps {
  className?: string;
  disabled?: boolean;
}

export default function MedicalBackground({ className = '', disabled = false }: MedicalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices and reduce complexity
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Early return if disabled
    if (disabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas context not available for MedicalBackground');
      return;
    }

    // Set canvas size with enhanced error handling
    const resizeCanvas = () => {
      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR
        canvas.width = Math.max(1, canvas.offsetWidth * dpr);
        canvas.height = Math.max(1, canvas.offsetHeight * dpr);
        ctx.scale(dpr, dpr);
      } catch (error) {
        console.warn('Canvas resize error in MedicalBackground:', error);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Medical particle system with enhanced validation
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
      lastValidX: number;
      lastValidY: number;
    }

    const particles: Particle[] = [];
    const particleCount = isMobile ? 3 : 8; // Reduced count for stability
    
    // Medical-themed colors
    const colors = ['rgba(0, 74, 173, 0.08)', 'rgba(147, 233, 190, 0.08)', 'rgba(0, 74, 173, 0.04)'];

    // Initialize particles with validation
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * Math.max(1, canvas.offsetWidth);
      const y = Math.random() * Math.max(1, canvas.offsetHeight);
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2, // Slower movement
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 15 + 8, // Smaller particles
        opacity: Math.random() * 0.2 + 0.05, // More subtle
        color: colors[Math.floor(Math.random() * colors.length)],
        lastValidX: x,
        lastValidY: y
      });
    }

    // Safe animation loop
    let lastTime = 0;
    let animationActive = true;
    
    const animate = (currentTime: number = 0) => {
      if (!animationActive) return;
      
      // Throttle animation on mobile
      if (isMobile && currentTime - lastTime < 50) { // 20fps on mobile
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      
      try {
        // Validate canvas state
        if (!canvas.offsetWidth || !canvas.offsetHeight || 
            canvas.offsetWidth <= 0 || canvas.offsetHeight <= 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        particles.forEach((particle, index) => {
          // Enhanced particle validation
          if (!particle || 
              typeof particle.x !== 'number' || typeof particle.y !== 'number' || 
              !isFinite(particle.x) || !isFinite(particle.y) || 
              !isFinite(particle.radius) || particle.radius <= 0 ||
              particle.radius > 100) { // Cap max radius
            // Reset corrupted particle
            particles[index] = {
              x: Math.random() * canvas.offsetWidth,
              y: Math.random() * canvas.offsetHeight,
              vx: (Math.random() - 0.5) * 0.2,
              vy: (Math.random() - 0.5) * 0.2,
              radius: Math.random() * 15 + 8,
              opacity: Math.random() * 0.2 + 0.05,
              color: colors[Math.floor(Math.random() * colors.length)],
              lastValidX: particle.lastValidX || 0,
              lastValidY: particle.lastValidY || 0
            };
            return;
          }

          // Update position with bounds checking
          const speed = isMobile ? 0.3 : 0.5; // Slower movement
          const newX = particle.x + particle.vx * speed;
          const newY = particle.y + particle.vy * speed;
          
          // Validate new position
          if (isFinite(newX) && isFinite(newY)) {
            particle.x = newX;
            particle.y = newY;
            particle.lastValidX = newX;
            particle.lastValidY = newY;
          } else {
            // Use last valid position
            particle.x = particle.lastValidX;
            particle.y = particle.lastValidY;
          }

          // Wrap around edges with safety buffer
          const buffer = particle.radius + 20;
          if (particle.x < -buffer) particle.x = canvas.offsetWidth + buffer;
          if (particle.x > canvas.offsetWidth + buffer) particle.x = -buffer;
          if (particle.y < -buffer) particle.y = canvas.offsetHeight + buffer;
          if (particle.y > canvas.offsetHeight + buffer) particle.y = -buffer;

          // Skip drawing if particle is way outside visible area
          if (particle.x < -canvas.offsetWidth || particle.x > canvas.offsetWidth * 2 ||
              particle.y < -canvas.offsetHeight || particle.y > canvas.offsetHeight * 2) {
            return;
          }

          // Safe drawing with validation
          const opacity = Math.max(0, Math.min(1, particle.opacity || 0.05));
          ctx.globalAlpha = opacity;
          ctx.fillStyle = particle.color || 'rgba(0, 74, 173, 0.05)';
          
          if (isMobile) {
            // Simple circle on mobile
            const radius = Math.max(2, Math.min(25, particle.radius * 0.5));
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Medical cross with strict bounds checking
            const crossSize = Math.max(2, Math.min(8, particle.radius * 0.2)); // Much smaller
            const maxDimension = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.1;
            
            // Ensure cross won't exceed canvas bounds
            const vertHeight = Math.min(crossSize * 3, maxDimension);
            const horizWidth = Math.min(crossSize * 3, maxDimension);
            
            // Only draw if completely within safe bounds
            if (particle.x - horizWidth/2 > 0 && particle.x + horizWidth/2 < canvas.offsetWidth &&
                particle.y - vertHeight/2 > 0 && particle.y + vertHeight/2 < canvas.offsetHeight) {
              
              // Vertical bar
              ctx.fillRect(
                Math.round(particle.x - crossSize/2), 
                Math.round(particle.y - vertHeight/2), 
                crossSize, 
                vertHeight
              );
              
              // Horizontal bar
              ctx.fillRect(
                Math.round(particle.x - horizWidth/2), 
                Math.round(particle.y - crossSize/2), 
                horizWidth, 
                crossSize
              );
            }
            
            // Subtle glow effect
            const glowRadius = Math.max(5, Math.min(30, particle.radius * 0.8));
            if (particle.x + glowRadius > 0 && particle.x - glowRadius < canvas.offsetWidth &&
                particle.y + glowRadius > 0 && particle.y - glowRadius < canvas.offsetHeight) {
              
              const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowRadius
              );
              gradient.addColorStop(0, particle.color.replace(/[0-9.]+\)$/, '0.1)'));
              gradient.addColorStop(1, 'transparent');
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

        ctx.globalAlpha = 1;
        
      } catch (error) {
        console.warn('Canvas rendering error in MedicalBackground:', error);
        // Continue animation even if one frame fails
        ctx.globalAlpha = 1;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Only animate if not on a very small mobile device
    if (!isMobile || window.innerWidth > 480) {
      animate();
    }

    return () => {
      animationActive = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, disabled]);

  // Don't render canvas if disabled
  if (disabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}