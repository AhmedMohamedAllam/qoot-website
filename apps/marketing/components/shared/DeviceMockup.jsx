import { motion } from 'framer-motion';

// Reusable Phone Mockup Component
export function PhoneMockup({ children, className = '', animate = true, delay = 0 }) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
    whileHover: { y: -10 },
  } : {};

  return (
    <Wrapper className={`relative ${className}`} {...wrapperProps}>
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl shadow-black/30">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-20">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#0a0a0a] rounded-full" />
        </div>
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
          {children}
        </div>
        
        {/* Side Button */}
        <div className="absolute right-[-3px] top-24 w-1 h-12 bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-[-3px] top-20 w-1 h-8 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute left-[-3px] top-32 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
      </div>
    </Wrapper>
  );
}

// Reusable Tablet Mockup Component
export function TabletMockup({ children, className = '', animate = true, delay = 0 }) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
    whileHover: { y: -10, rotateY: 5 },
  } : {};

  return (
    <Wrapper className={`relative ${className}`} {...wrapperProps}>
      {/* Tablet Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[2rem] p-4 shadow-2xl shadow-black/30">
        {/* Camera */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] rounded-full" />
        
        {/* Screen */}
        <div className="relative bg-white rounded-[1.5rem] overflow-hidden">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}

// Reusable Desktop/Monitor Mockup Component
export function DesktopMockup({ children, className = '', animate = true, delay = 0 }) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
    whileHover: { y: -5 },
  } : {};

  return (
    <Wrapper className={`relative ${className}`} {...wrapperProps}>
      {/* Monitor Frame */}
      <div className="relative">
        {/* Screen Bezel */}
        <div className="bg-[#1a1a1a] rounded-t-2xl p-3 pb-4">
          {/* Screen */}
          <div className="relative bg-white rounded-lg overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Stand Neck */}
        <div className="flex justify-center">
          <div className="w-20 h-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        </div>
        
        {/* Stand Base */}
        <div className="flex justify-center">
          <div className="w-40 h-3 bg-[#1a1a1a] rounded-full shadow-lg" />
        </div>
      </div>
    </Wrapper>
  );
}

// Kitchen Display Screen Mockup (Large format)
export function KDSMockup({ children, className = '', animate = true, delay = 0 }) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  } : {};

  return (
    <Wrapper className={`relative ${className}`} {...wrapperProps}>
      {/* Screen Frame */}
      <div className="relative bg-[#0a0a0a] rounded-xl p-2 shadow-2xl">
        {/* Screen */}
        <div className="relative bg-[#1a252f] rounded-lg overflow-hidden">
          {children}
        </div>
        
        {/* Power LED */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </Wrapper>
  );
}

// Floating Badge Component
export function FloatingBadge({ children, className = '', position = 'top-right', delay = 0 }) {
  const positions = {
    'top-right': '-top-4 -right-4',
    'top-left': '-top-4 -left-4',
    'bottom-right': '-bottom-4 -right-4',
    'bottom-left': '-bottom-4 -left-4',
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} z-20 ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      {children}
    </motion.div>
  );
}

// Notification Toast Component
export function NotificationToast({ icon, title, subtitle, color = '#2ecc71', delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      animate={{ y: [0, -5, 0] }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export default { PhoneMockup, TabletMockup, DesktopMockup, KDSMockup, FloatingBadge, NotificationToast };

