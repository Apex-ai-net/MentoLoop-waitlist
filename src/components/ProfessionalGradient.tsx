import { useEffect, useRef } from 'react';

interface ProfessionalGradientProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'subtle';
}

export default function ProfessionalGradient({ 
  className = '', 
  variant = 'primary' 
}: ProfessionalGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

    let time = 0;

    // Professional gradient colors based on variant
    const getGradientColors = () => {
      switch (variant) {
        case 'primary':
          return [
            'rgba(0, 74, 173, 0.03)',  // Primary blue
            'rgba(0, 74, 173, 0.08)',
            'rgba(147, 233, 190, 0.03)' // Secondary green
          ];
        case 'secondary':
          return [
            'rgba(147, 233, 190, 0.05)',
            'rgba(147, 233, 190, 0.10)',
            'rgba(0, 74, 173, 0.03)'
          ];
        case 'subtle':
          return [
            'rgba(0, 74, 173, 0.01)',
            'rgba(147, 233, 190, 0.02)',
            'rgba(0, 74, 173, 0.01)'
          ];
        default:
          return [
            'rgba(0, 74, 173, 0.03)',
            'rgba(147, 233, 190, 0.03)'
          ];
      }
    };

    // Animation loop for subtle gradient movement
    const animate = () => {
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const colors = getGradientColors();
      
      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0, 
        0, 
        canvas.offsetWidth + Math.sin(time) * 100, 
        canvas.offsetHeight + Math.cos(time * 0.7) * 100
      );

      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Add subtle overlay pattern
      ctx.globalCompositeOperation = 'overlay';
      for (let i = 0; i < 3; i++) {
        const overlayGradient = ctx.createRadialGradient(
          canvas.offsetWidth * (0.3 + i * 0.2) + Math.sin(time + i) * 50,
          canvas.offsetHeight * (0.4 + i * 0.15) + Math.cos(time + i) * 30,
          0,
          canvas.offsetWidth * (0.3 + i * 0.2),
          canvas.offsetHeight * (0.4 + i * 0.15),
          canvas.offsetWidth * 0.6
        );
        
        overlayGradient.addColorStop(0, colors[i % colors.length]);
        overlayGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = overlayGradient;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }
      
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}