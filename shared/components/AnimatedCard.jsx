import { motion } from 'framer-motion';

// Animated Card with hover effects
export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hoverScale = 1.02,
  hoverY = -5,
  glowColor = null,
}) {
  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: hoverScale, y: hoverY }}
    >
      {children}
      
      {/* Glow Effect */}
      {glowColor && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
          style={{ boxShadow: `0 0 60px ${glowColor}30` }}
        />
      )}
    </motion.div>
  );
}

// Glassmorphism Card
export function GlassCard({ 
  children, 
  className = '',
  delay = 0,
  dark = false,
}) {
  return (
    <motion.div
      className={`
        backdrop-blur-md rounded-2xl border
        ${dark 
          ? 'bg-white/10 border-white/20' 
          : 'bg-white/80 border-gray-200/50'
        }
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// Gradient Border Card
export function GradientBorderCard({
  children,
  className = '',
  gradientFrom = '#2ecc71',
  gradientTo = '#3498db',
  delay = 0,
}) {
  return (
    <motion.div
      className={`relative p-[2px] rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-white dark:bg-[#1a252f] rounded-2xl h-full">
        {children}
      </div>
    </motion.div>
  );
}

// Feature Card with Icon
export function FeatureCard({
  icon,
  title,
  description,
  color = '#2ecc71',
  delay = 0,
  isRTL = false,
}) {
  return (
    <AnimatedCard 
      className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}
      delay={delay}
      glowColor={color}
    >
      <div 
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`}
        style={{ backgroundColor: `${color}15` }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#2c3e50] mb-2">{title}</h3>
      <p className="text-[#646464] text-sm leading-relaxed">{description}</p>
    </AnimatedCard>
  );
}

// Stats Card
export function StatsCard({
  value,
  label,
  icon,
  color = '#2ecc71',
  delay = 0,
  trend = null, // 'up' | 'down' | null
}) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-4xl font-black" style={{ color }}>{value}</span>
        {trend && (
          <span className={`text-xl ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-white/60 text-sm mt-1">{label}</p>
    </motion.div>
  );
}

export default { AnimatedCard, GlassCard, GradientBorderCard, FeatureCard, StatsCard };

