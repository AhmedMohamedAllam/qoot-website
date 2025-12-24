import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Bar Chart
export function AnimatedBarChart({ 
  data, // [{ label, value, color }]
  maxValue = 100,
  height = 200,
  showLabels = true,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-2 h-full">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center h-full">
            <div className="flex-1 w-full flex items-end">
              <motion.div
                className="w-full rounded-t-lg"
                style={{ backgroundColor: item.color }}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${(item.value / maxValue) * 100}%` } : {}}
                transition={{ duration: 0.8, delay: delay + index * 0.1, ease: 'easeOut' }}
              />
            </div>
            {showLabels && (
              <div className="mt-2 text-center">
                <p className="text-xs text-white/60">{item.label}</p>
                <p className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated Pie Chart (simplified)
export function AnimatedPieChart({
  percentage,
  color = '#2ecc71',
  size = 120,
  strokeWidth = 10,
  label,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white">{percentage}%</span>
        {label && <span className="text-xs text-white/60">{label}</span>}
      </div>
    </div>
  );
}

// Live Counter
export function LiveCounter({ 
  target, 
  prefix = '', 
  suffix = '', 
  duration = 2000,
  color = '#2ecc71',
  size = 'lg',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
  };

  return (
    <span ref={ref} className={`font-black ${sizeClasses[size]}`} style={{ color }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Animated Progress Bar
export function AnimatedProgressBar({
  value,
  maxValue = 100,
  color = '#2ecc71',
  height = 8,
  showLabel = true,
  label = '',
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white/60">{label}</span>
          <span className="text-sm font-bold" style={{ color }}>{value}%</span>
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full overflow-hidden" style={{ height }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(value / maxValue) * 100}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Revenue Graph (Line-style visualization)
export function RevenueGraph({
  data, // [{ month, value }]
  color = '#2ecc71',
  height = 150,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-1 h-full">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex-1 rounded-t-sm"
            style={{ backgroundColor: color }}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { 
              height: `${(item.value / maxValue) * 100}%`,
              opacity: 1,
            } : {}}
            transition={{ duration: 0.5, delay: delay + index * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

// Comparison Card (Before/After)
export function ComparisonCard({
  beforeValue,
  afterValue,
  label,
  unit = '%',
  delay = 0,
}) {
  const improvement = afterValue - beforeValue;
  const improvementPercent = ((afterValue - beforeValue) / beforeValue * 100).toFixed(0);

  return (
    <motion.div
      className="p-6 rounded-2xl bg-white/5 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <p className="text-white/60 text-sm mb-4">{label}</p>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-xs text-red-400 mb-1">Before</p>
          <p className="text-2xl font-bold text-red-400">{beforeValue}{unit}</p>
        </div>
        <div className="text-3xl text-white/30">→</div>
        <div className="text-center">
          <p className="text-xs text-green-400 mb-1">After</p>
          <p className="text-2xl font-bold text-green-400">{afterValue}{unit}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <span className="text-green-400 font-bold">+{improvementPercent}% improvement</span>
      </div>
    </motion.div>
  );
}

export default { 
  AnimatedBarChart, 
  AnimatedPieChart, 
  LiveCounter, 
  AnimatedProgressBar,
  RevenueGraph,
  ComparisonCard,
};

