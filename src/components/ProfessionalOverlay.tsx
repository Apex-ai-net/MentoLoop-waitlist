import { useEffect, useRef } from 'react';

interface ProfessionalOverlayProps {
  className?: string;
}

export default function ProfessionalOverlay({ className = '' }: ProfessionalOverlayProps) {
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

    // Subtle grid pattern for professional look
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 74, 173, 0.02)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      
      // Vertical lines
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }
    };

    // Subtle pulsing dots at grid intersections
    const drawPulsingDots = () => {
      const gridSize = 40;
      const pulse = Math.sin(time * 2) * 0.5 + 0.5;
      
      ctx.fillStyle = `rgba(147, 233, 190, ${0.05 + pulse * 0.03})`;
      
      for (let x = 0; x < canvas.offsetWidth; x += gridSize * 4) {
        for (let y = 0; y < canvas.offsetHeight; y += gridSize * 4) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Animation loop
    const animate = () => {
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Only draw if opacity is significant
      ctx.globalAlpha = 0.4;
      drawGrid();
      drawPulsingDots();
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}