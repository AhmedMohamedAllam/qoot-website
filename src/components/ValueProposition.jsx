import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiUsers } from 'react-icons/fi';

const stats = [
  {
    icon: FiTrendingUp,
    value: 20,
    suffix: '%',
    label: 'Increase in Table Turnover',
    description: 'Faster checkout means more covers per night',
    color: '#2ecc71',
  },
  {
    icon: FiDollarSign,
    value: 15,
    suffix: '%',
    label: 'Higher Average Ticket Size',
    description: 'Smart upselling suggestions boost revenue',
    color: '#3498db',
  },
  {
    icon: FiUsers,
    value: 30,
    suffix: '%',
    label: 'Reduction in Labor Costs',
    description: 'Optimize staff efficiency with automation',
    color: '#9b59b6',
  },
];

function CountUpAnimation({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
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
  }, [inView, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/20 text-[#2ecc71] text-sm font-medium mb-4">
            Value for Owners
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            ROI You Can <span className="text-[#2ecc71]">Measure</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Qoot isn't an expense; it's an investment that pays for itself.
            See the projected impact on your business.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center">
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon 
                    className="w-8 h-8" 
                    style={{ color: stat.color }} 
                  />
                </div>

                {/* Value */}
                <div 
                  className="text-5xl md:text-6xl font-black mb-4"
                  style={{ color: stat.color }}
                >
                  <CountUpAnimation 
                    target={stat.value} 
                    suffix={stat.suffix} 
                    inView={isInView}
                  />
                </div>

                {/* Arrow Indicator */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span 
                    className="text-2xl"
                    style={{ color: stat.color }}
                  >
                    {index === 2 ? '↓' : '↑'}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm">
                  {stat.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{ 
                  boxShadow: `0 0 60px ${stat.color}30`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-lg italic">
            "Traditional systems are fragmented. Qoot unifies them."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

