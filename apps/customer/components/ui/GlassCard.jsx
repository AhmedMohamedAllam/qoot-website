import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GlassCard = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default', // default, gold, strong
  hover3D = false,
  glow = false,
  onClick,
  as = 'div',
  ...props 
}, ref) => {
  const Component = motion[as] || motion.div;
  
  const variants = {
    default: 'glass-card',
    gold: 'glass-card-gold',
    strong: 'glass-strong'
  };

  const baseStyles = `
    ${variants[variant]}
    rounded-2xl overflow-hidden
    ${glow ? 'animate-pulse-glow' : ''}
    ${hover3D ? 'card-3d' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <Component
      ref={ref}
      className={baseStyles}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;

