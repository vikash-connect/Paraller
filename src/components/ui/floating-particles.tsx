"use client";
import React, { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Generate initial particles
    const particleCount = 40;
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);

    let animationFrameId: number;

    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let newVx = p.vx;
          let newVy = p.vy;
          const newX = p.x + newVx;
          const newY = p.y + newVy;

          if (newX < 0 || newX > 100) newVx *= -1;
          if (newY < 0 || newY > 100) newVy *= -1;

          return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400 dark:bg-cyan-300 transition-opacity duration-1000 ease-in-out"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(6, 182, 212, 0.8)`,
          }}
        />
      ))}
    </div>
  );
};
