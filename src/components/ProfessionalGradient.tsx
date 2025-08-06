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
    if (!ctx) {
      console.warn('Canvas context not available for ProfessionalGradient');
      return;
    }

    // Set canvas size with error handling
    const resizeCanvas = () => {
      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR to prevent huge canvases
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
      } catch (error) {
        console.warn('Canvas resize error:', error);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    let animationActive = true;

    // Professional gradient colors based on variant
    const getGradientColors = () => {
      switch (variant) {
        case 'primary':
          return [
            'rgba(0, 74, 173, 0.02)',  // Very subtle
            'rgba(0, 74, 173, 0.04)',
            'rgba(147, 233, 190, 0.02)'
          ];
        case 'secondary':
          return [
            'rgba(147, 233, 190, 0.03)',
            'rgba(147, 233, 190, 0.05)',
            'rgba(0, 74, 173, 0.02)'
          ];
        case 'subtle':
          return [
            'rgba(0, 74, 173, 0.01)',
            'rgba(147, 233, 190, 0.01)',
            'rgba(0, 74, 173, 0.005)'
          ];
        default:
          return [
            'rgba(0, 74, 173, 0.01)',
            'rgba(147, 233, 190, 0.01)'
          ];
      }
    };

    // Safe animation loop
    const animate = () => {
      if (!animationActive) return;
      
      try {
        time += 0.005; // Slower animation
        
        // Validate canvas dimensions
        if (!canvas.offsetWidth || !canvas.offsetHeight || 
            canvas.offsetWidth <= 0 || canvas.offsetHeight <= 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        const colors = getGradientColors();
        
        // Create safe animated gradient with bounded coordinates
        const maxOffset = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.1;
        const animX = canvas.offsetWidth + Math.sin(time) * maxOffset;
        const animY = canvas.offsetHeight + Math.cos(time * 0.7) * maxOffset;
        
        // Ensure coordinates are finite and reasonable
        const safeX = isFinite(animX) ? Math.max(0, Math.min(animX, canvas.offsetWidth * 2)) : canvas.offsetWidth;
        const safeY = isFinite(animY) ? Math.max(0, Math.min(animY, canvas.offsetHeight * 2)) : canvas.offsetHeight;
        
        const gradient = ctx.createLinearGradient(0, 0, safeX, safeY);

        colors.forEach((color, index) => {
          const stop = Math.max(0, Math.min(1, index / (colors.length - 1)));
          gradient.addColorStop(stop, color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        // Subtle overlay with strict bounds
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.3; // Very subtle
        
        for (let i = 0; i < 2; i++) { // Reduced from 3 to prevent artifacts
          const baseX = canvas.offsetWidth * (0.4 + i * 0.2);
          const baseY = canvas.offsetHeight * (0.4 + i * 0.2);
          const offsetX = Math.sin(time + i) * maxOffset * 0.5;
          const offsetY = Math.cos(time + i) * maxOffset * 0.5;
          
          const centerX = Math.max(0, Math.min(canvas.offsetWidth, baseX + offsetX));
          const centerY = Math.max(0, Math.min(canvas.offsetHeight, baseY + offsetY));
          const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.3;
          
          const overlayGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
          );
          
          overlayGradient.addColorStop(0, colors[i % colors.length]);
          overlayGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = overlayGradient;
          ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        
      } catch (error) {
        console.warn('Canvas rendering error in ProfessionalGradient:', error);
        // Reset state and continue
        try {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
        } catch {}
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      animationActive = false;
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