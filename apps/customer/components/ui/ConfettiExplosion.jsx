import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = ['#d4af37', '#f4c430', '#ff9500', '#10b981', '#faf8f5'];

function Particle({ color, x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        left: '50%',
        top: '50%'
      }}
      initial={{ 
        x: 0, 
        y: 0, 
        scale: 0, 
        opacity: 1 
      }}
      animate={{
        x: x,
        y: y,
        scale: [0, 1, 0.5],
        opacity: [1, 1, 0],
        rotate: [0, Math.random() * 360]
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: [0.23, 1, 0.32, 1]
      }}
    />
  );
}

export default function ConfettiExplosion({ 
  trigger = true, 
  particleCount = 50,
  duration = 2000,
  onComplete
}) {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400 - 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.3
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, particleCount, duration, onComplete, isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {particles.map((particle) => (
              <Particle key={particle.id} {...particle} />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

