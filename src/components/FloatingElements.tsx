import { useEffect, useRef, useState } from 'react';

interface FloatingElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
}

export default function FloatingElements({ 
  className = '', 
  density = 'medium' 
}: FloatingElementsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Skip heavy animations on mobile
  if (isMobile) {
    return <div className={`absolute inset-0 pointer-events-none ${className}`} />;
  }

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

    // Floating medical elements
    interface FloatingElement {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      type: 'plus' | 'circle' | 'hexagon';
      color: string;
    }

    const elements: FloatingElement[] = [];
    const densityMap = { low: 8, medium: 12, high: 20 };
    const elementCount = densityMap[density];
    
    // Professional medical colors
    const colors = [
      'rgba(0, 74, 173, 0.08)',   // Primary blue
      'rgba(147, 233, 190, 0.08)', // Secondary green
      'rgba(0, 74, 173, 0.04)',   // Lighter blue
      'rgba(147, 233, 190, 0.04)' // Lighter green
    ];

    // Initialize floating elements
    for (let i = 0; i < elementCount; i++) {
      elements.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 15 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.3 + 0.1,
        type: ['plus', 'circle', 'hexagon'][Math.floor(Math.random() * 3)] as 'plus' | 'circle' | 'hexagon',
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Draw functions for different shapes
    const drawPlus = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const thickness = size * 0.25;
      // Horizontal bar
      ctx.fillRect(-size/2, -thickness/2, size, thickness);
      // Vertical bar
      ctx.fillRect(-thickness/2, -size/2, thickness, size);
      
      ctx.restore();
    };

    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size * 0.5;
        const py = Math.sin(angle) * size * 0.5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      elements.forEach((element) => {
        // Update position and rotation
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += element.rotationSpeed;

        // Wrap around edges
        if (element.x < -element.size) element.x = canvas.offsetWidth + element.size;
        if (element.x > canvas.offsetWidth + element.size) element.x = -element.size;
        if (element.y < -element.size) element.y = canvas.offsetHeight + element.size;
        if (element.y > canvas.offsetHeight + element.size) element.y = -element.size;

        // Set drawing properties
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;

        // Draw based on type
        switch (element.type) {
          case 'plus':
            drawPlus(element.x, element.y, element.size, element.rotation);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'hexagon':
            drawHexagon(element.x, element.y, element.size, element.rotation);
            break;
        }
      });

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
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}