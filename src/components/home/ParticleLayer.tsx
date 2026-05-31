'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (init = false): Particle => ({
      x: Math.random() * window.innerWidth,
      y: init ? Math.random() * window.innerHeight : window.innerHeight + 10,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.25,
      size: 0.5 + Math.random() * 1.5,
      alpha: 0.02 + Math.random() * 0.08,
    });

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
        ctx.fill();

        // Recycle particle if it moves off-screen
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle(false);
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
