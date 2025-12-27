import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ParticleBackground({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 2 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.3
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          top: '10%',
          left: '20%',
          filter: 'blur(60px)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 149, 0, 0.06) 0%, transparent 70%)',
          bottom: '20%',
          right: '10%',
          filter: 'blur(50px)'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--gold-primary)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: '-10px',
            opacity: 0
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, particle.opacity, particle.opacity, 0],
            x: [0, Math.sin(particle.id) * 50]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}

