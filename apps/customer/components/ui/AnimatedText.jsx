import { motion } from 'framer-motion';

export function AnimatedText({ 
  text, 
  className = '',
  as = 'span',
  staggerDelay = 0.03,
  initialDelay = 0,
  type = 'chars' // chars, words
}) {
  const Component = motion[as];
  const items = type === 'chars' ? text.split('') : text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <Component
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ 
            transformOrigin: 'bottom',
            marginRight: type === 'words' ? '0.25em' : item === ' ' ? '0.25em' : '0'
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </Component>
  );
}

export function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true
}) {
  return (
    <motion.span className={`inline-flex ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * (speed / 1000),
            duration: 0
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className="ml-1 bg-[var(--gold-primary)]"
          style={{ width: '2px', height: '1em' }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
}

export function GlowText({ children, className = '' }) {
  return (
    <span 
      className={`relative ${className}`}
      style={{
        textShadow: '0 0 20px var(--gold-glow), 0 0 40px var(--gold-subtle)'
      }}
    >
      {children}
    </span>
  );
}

