import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-[#2ecc71] text-white hover:bg-[#27ae60] shadow-lg shadow-[#2ecc71]/30',
  secondary: 'bg-[#3498db] text-white hover:bg-[#2980b9] shadow-lg shadow-[#3498db]/30',
  danger: 'bg-[#e74c3c] text-white hover:bg-[#c0392b] shadow-lg shadow-[#e74c3c]/30',
  warning: 'bg-[#f39c12] text-white hover:bg-[#e67e22] shadow-lg shadow-[#f39c12]/30',
  outline: 'bg-transparent border-2 border-[#2ecc71] text-[#2ecc71] hover:bg-[#2ecc71] hover:text-white',
  ghost: 'bg-transparent text-[#2c3e50] hover:bg-gray-100',
  dark: 'bg-[#2c3e50] text-white hover:bg-[#34495e]'
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-2xl'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        font-semibold transition-all duration-200 
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-5 w-5" 
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle 
              className="opacity-25" 
              cx="12" cy="12" r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </motion.button>
  );
}

