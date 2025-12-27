import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ 
  value, 
  className = '',
  prefix = '',
  suffix = '',
  duration = 0.5,
  decimals = 0
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000
  });

  useEffect(() => {
    spring.set(value);
    prevValue.current = value;
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [spring]);

  const formattedValue = displayValue.toFixed(decimals);
  const isIncreasing = value > prevValue.current;

  return (
    <motion.span 
      className={`inline-flex items-center tabular-nums ${className}`}
      key={value}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      <motion.span
        initial={{ y: isIncreasing ? 10 : -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {formattedValue}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

