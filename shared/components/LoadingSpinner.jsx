import { motion } from 'framer-motion';

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text = '',
  fullScreen = false,
  className = ''
}) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'text-[#2ecc71]',
    secondary: 'text-[#3498db]',
    white: 'text-white',
    dark: 'text-[#2c3e50]'
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        className={`${sizes[size]} ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeOpacity="0.2"
          />
          <path 
            d="M12 2a10 10 0 0 1 10 10" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      {text && (
        <p className={`text-sm font-medium ${colors[color]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Loading skeleton for content placeholders
export function Skeleton({
  width = 'full',
  height = '4',
  rounded = 'md',
  className = ''
}) {
  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4'
  };

  const heightClasses = {
    '2': 'h-2',
    '4': 'h-4',
    '6': 'h-6',
    '8': 'h-8',
    '10': 'h-10',
    '12': 'h-12',
    '16': 'h-16',
    '20': 'h-20',
    '32': 'h-32',
    '48': 'h-48'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  return (
    <div 
      className={`
        animate-pulse bg-gray-200
        ${widthClasses[width] || width}
        ${heightClasses[height] || height}
        ${roundedClasses[rounded]}
        ${className}
      `}
    />
  );
}

// Card skeleton
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton width="12" height="12" rounded="xl" className="!w-12 !h-12" />
        <div className="flex-1">
          <Skeleton width="3/4" height="4" className="mb-2" />
          <Skeleton width="1/2" height="2" />
        </div>
      </div>
      <Skeleton width="full" height="20" rounded="xl" />
    </div>
  );
}

// List skeleton
export function ListSkeleton({ count = 5, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton width="10" height="10" rounded="full" className="!w-10 !h-10" />
          <div className="flex-1">
            <Skeleton width="3/4" height="4" className="mb-2" />
            <Skeleton width="1/2" height="2" />
          </div>
        </div>
      ))}
    </div>
  );
}

