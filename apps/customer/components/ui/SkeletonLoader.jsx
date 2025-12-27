import { motion } from 'framer-motion';

export default function SkeletonLoader({ 
  variant = 'rect', // rect, circle, text
  width,
  height,
  className = '',
  count = 1
}) {
  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4'
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((i) => (
        <motion.div
          key={i}
          className={`skeleton ${variants[variant]}`}
          style={{ width, height }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
}

// Preset skeleton components
export function MenuItemSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-4 flex gap-4">
      <div className="skeleton w-24 h-24 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded-md" />
        <div className="skeleton h-4 w-full rounded-md" />
        <div className="skeleton h-4 w-1/2 rounded-md" />
        <div className="flex justify-between items-center mt-4">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CategoryTabsSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton h-10 w-24 rounded-full flex-shrink-0" />
      ))}
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="relative h-48 glass-card rounded-2xl overflow-hidden">
      <div className="skeleton absolute inset-0" />
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="skeleton h-8 w-48 rounded-md" />
        <div className="skeleton h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}

