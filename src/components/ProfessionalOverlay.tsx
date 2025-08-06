import { useEffect, useRef } from 'react';

interface ProfessionalOverlayProps {
  className?: string;
  disabled?: boolean;
}

export default function ProfessionalOverlay({ className = '', disabled = false }: ProfessionalOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Early return if disabled
    if (disabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas context not available for ProfessionalOverlay');
      return;
    }

    // Set canvas size with error handling
    const resizeCanvas = () => {
      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Lower DPR for overlay
        canvas.width = Math.max(1, canvas.offsetWidth * dpr);
        canvas.height = Math.max(1, canvas.offsetHeight * dpr);
        ctx.scale(dpr, dpr);
      } catch (error) {
        console.warn('Canvas resize error in ProfessionalOverlay:', error);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    let animationActive = true;

    // Ultra-subtle grid pattern - much more conservative
    const drawGrid = () => {
      try {
        // Validate canvas dimensions
        if (!canvas.offsetWidth || !canvas.offsetHeight || 
            canvas.offsetWidth <= 0 || canvas.offsetHeight <= 0) {
          return;
        }
        
        // Ultra-subtle styling to prevent visible artifacts
        ctx.strokeStyle = 'rgba(0, 74, 173, 0.002)'; // Almost invisible
        ctx.lineWidth = 0.25; // Very thin
        
        const gridSize = Math.max(80, Math.min(120, 100)); // Larger grid for fewer lines
        
        // Only draw every other grid line to reduce density
        let lineCount = 0;
        const maxLines = 5; // Limit total number of lines
        
        // Vertical lines with strict limits
        for (let x = gridSize; x < canvas.offsetWidth && lineCount < maxLines; x += gridSize * 2) {
          if (x > 0 && x < canvas.offsetWidth) {
            ctx.beginPath();
            ctx.moveTo(Math.round(x), 0);
            ctx.lineTo(Math.round(x), canvas.offsetHeight);
            ctx.stroke();
            lineCount++;
          }
        }
        
        // Horizontal lines with strict limits  
        lineCount = 0;
        for (let y = gridSize; y < canvas.offsetHeight && lineCount < maxLines; y += gridSize * 2) {
          if (y > 0 && y < canvas.offsetHeight) {
            ctx.beginPath();
            ctx.moveTo(0, Math.round(y));
            ctx.lineTo(canvas.offsetWidth, Math.round(y));
            ctx.stroke();
            lineCount++;
          }
        }
      } catch (error) {
        console.warn('Grid drawing error:', error);
      }
    };

    // Minimal pulsing dots
    const drawPulsingDots = () => {
      try {
        const gridSize = 100;
        const pulse = Math.sin(time * 1) * 0.3 + 0.7; // Slower, subtler pulse
        
        ctx.fillStyle = `rgba(147, 233, 190, ${0.01 + pulse * 0.01})`; // Ultra-subtle
        
        // Only a few dots
        const maxDots = 3;
        let dotCount = 0;
        
        for (let x = gridSize * 2; x < canvas.offsetWidth && dotCount < maxDots; x += gridSize * 3) {
          for (let y = gridSize * 2; y < canvas.offsetHeight && dotCount < maxDots; y += gridSize * 3) {
            if (x > 0 && x < canvas.offsetWidth && y > 0 && y < canvas.offsetHeight) {
              ctx.beginPath();
              ctx.arc(x, y, 0.8, 0, Math.PI * 2); // Tiny dots
              ctx.fill();
              dotCount++;
            }
          }
        }
      } catch (error) {
        console.warn('Dots drawing error:', error);
      }
    };

    // Conservative animation loop
    const animate = () => {
      if (!animationActive) return;
      
      try {
        time += 0.005; // Very slow animation
        
        // Validate canvas state
        if (!canvas.offsetWidth || !canvas.offsetHeight) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Very low opacity
        ctx.globalAlpha = 0.15;
        drawGrid();
        drawPulsingDots();
        ctx.globalAlpha = 1;
        
      } catch (error) {
        console.warn('Animation error in ProfessionalOverlay:', error);
        ctx.globalAlpha = 1; // Reset alpha
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Only start animation if canvas is reasonable size
    if (canvas.offsetWidth > 100 && canvas.offsetHeight > 100) {
      animate();
    }

    return () => {
      animationActive = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [disabled]);

  // Don't render if disabled
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