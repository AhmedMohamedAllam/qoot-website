import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GoldButton = forwardRef(({ 
  children, 
  className = '', 
  variant = 'solid', // solid, outline, ghost
  size = 'md', // sm, md, lg
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ...props 
}, ref) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  const variantStyles = {
    solid: 'btn-gold',
    outline: `
      bg-transparent border-2 border-[var(--gold-primary)] text-[var(--gold-primary)]
      hover:bg-[var(--gold-subtle)] hover:shadow-[var(--shadow-glow)]
    `,
    ghost: `
      bg-transparent text-[var(--gold-primary)]
      hover:bg-[var(--gold-subtle)]
    `
  };

  return (
    <motion.button
      ref={ref}
      className={`
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        font-semibold inline-flex items-center justify-center gap-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      {...props}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
});

GoldButton.displayName = 'GoldButton';

export default GoldButton;

