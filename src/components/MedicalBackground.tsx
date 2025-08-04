import { useEffect, useRef, useState } from 'react';

interface MedicalBackgroundProps {
  className?: string;
}

export default function MedicalBackground({ className = '' }: MedicalBackgroundProps) {
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Medical particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = isMobile ? 5 : 15; // Reduce particles on mobile
    
    // Medical-themed colors matching your logo
    const colors = ['rgba(0, 74, 173, 0.1)', 'rgba(147, 233, 190, 0.1)', 'rgba(0, 74, 173, 0.05)'];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animation loop
    let lastTime = 0;
    const animate = (currentTime: number = 0) => {
      // Throttle animation on mobile (30fps instead of 60fps)
      if (isMobile && currentTime - lastTime < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        // Update position (slower on mobile)
        const speed = isMobile ? 0.5 : 1;
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        // Wrap around edges
        if (particle.x < -particle.radius) particle.x = canvas.offsetWidth + particle.radius;
        if (particle.x > canvas.offsetWidth + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.offsetHeight + particle.radius;
        if (particle.y > canvas.offsetHeight + particle.radius) particle.y = -particle.radius;

        // Draw particle with medical cross pattern (simplified on mobile)
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        if (isMobile) {
          // Simple circle on mobile for better performance
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Full medical cross and glow on desktop
          const crossSize = particle.radius * 0.3;
          ctx.fillRect(particle.x - crossSize/2, particle.y - crossSize*2, crossSize, crossSize*4);
          ctx.fillRect(particle.x - crossSize*2, particle.y - crossSize/2, crossSize*4, crossSize);
          
          // Draw circular glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius
          );
          gradient.addColorStop(0, particle.color.replace('0.1', '0.2'));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Only animate if not on a very small mobile device
    if (!isMobile || window.innerWidth > 480) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}