import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiUsers, FiArrowUp, FiArrowDown, FiClock, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

function CountUpAnimation({ target, suffix, inView, color }) {
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
    <span style={{ color }}>
      {count}{suffix}
    </span>
  );
}

// Animated Bar Component
function AnimatedBar({ value, maxValue = 100, color, delay = 0, label, inView }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/60">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / maxValue) * 100}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Comparison Chart Component
function ComparisonChart({ before, after, label, color, inView, delay = 0 }) {
  const improvement = Math.round(((after - before) / before) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="bg-white/5 rounded-xl p-4 border border-white/10"
    >
      <p className="text-sm text-white/60 mb-3">{label}</p>
      <div className="flex items-center gap-4 mb-3">
        <div className="text-center flex-1">
          <p className="text-[10px] text-red-400 mb-1">{label === 'Revenue' ? 'Old' : 'Before'}</p>
          <motion.p 
            className="text-xl font-bold text-red-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.2 }}
          >
            {before}
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.4, type: 'spring' }}
        >
          <FiArrowUp className="w-6 h-6 text-white/30" />
        </motion.div>
        <div className="text-center flex-1">
          <p className="text-[10px] mb-1" style={{ color }}>{label === 'Revenue' ? 'New' : 'After'}</p>
          <motion.p 
            className="text-xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.6 }}
          >
            {after}
          </motion.p>
        </div>
      </div>
      <motion.div
        className="text-center pt-3 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.8 }}
      >
        <span className="font-bold" style={{ color }}>+{improvement}% improvement</span>
      </motion.div>
    </motion.div>
  );
}

// Revenue Graph Component
function RevenueGraph({ data, inView }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-white/60">Monthly Revenue Growth</p>
        <span className="px-2 py-1 bg-[#2ecc71]/20 rounded text-[#2ecc71] text-xs font-bold">+45%</span>
      </div>
      <div className="flex items-end justify-between gap-1 h-24">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <motion.div
              className="w-full rounded-t bg-gradient-to-t from-[#2ecc71] to-[#2ecc71]/60"
              initial={{ height: 0 }}
              animate={inView ? { height: `${(item.value / maxValue) * 100}%` } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
            <p className="text-[8px] text-white/40 mt-1">{item.month}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      icon: FiTrendingUp,
      value: 20,
      suffix: '%',
      label: t('value.turnover'),
      description: t('value.turnoverDesc'),
      color: '#2ecc71',
      trend: 'up',
    },
    {
      icon: FiDollarSign,
      value: 15,
      suffix: '%',
      label: t('value.ticket'),
      description: t('value.ticketDesc'),
      color: '#3498db',
      trend: 'up',
    },
    {
      icon: FiUsers,
      value: 30,
      suffix: '%',
      label: t('value.labor'),
      description: t('value.laborDesc'),
      color: '#9b59b6',
      trend: 'down',
    },
  ];

  const revenueData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 },
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 78 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 89 },
    { month: 'Nov', value: 95 },
    { month: 'Dec', value: 100 },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9b59b6]/5 rounded-full blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
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
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2ecc71]/20 text-[#2ecc71] text-sm font-bold mb-6"
          >
            <FiTrendingUp className="w-5 h-5" />
            {t('value.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>عائد استثمار <span className="text-[#2ecc71]">قابل للقياس</span></>
            ) : (
              <>ROI You Can <span className="text-[#2ecc71]">Measure</span></>
            )}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {t('value.description')}
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon 
                    className="w-8 h-8" 
                    style={{ color: stat.color }} 
                  />
                </div>

                {/* Value with Animation */}
                <div className="text-center mb-4">
                  <div className="text-6xl md:text-7xl font-black">
                    <CountUpAnimation 
                      target={stat.value} 
                      suffix={stat.suffix} 
                      inView={isInView}
                      color={stat.color}
                    />
                  </div>
                </div>

                {/* Trend Arrow */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    animate={{ y: stat.trend === 'up' ? [-3, 3, -3] : [3, -3, 3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {stat.trend === 'up' ? (
                      <FiArrowUp className="w-6 h-6" style={{ color: stat.color }} />
                    ) : (
                      <FiArrowDown className="w-6 h-6" style={{ color: stat.color }} />
                    )}
                  </motion.div>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm text-center">
                  {stat.description}
                </p>

                {/* Mini Progress Bar */}
                <div className="mt-6">
                  <AnimatedBar 
                    value={stat.value + 50} 
                    color={stat.color} 
                    delay={0.5 + index * 0.2}
                    label={isRTL ? 'مقارنة بالسوق' : 'vs Market Average'}
                    inView={isInView}
                  />
                </div>
              </div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{ 
                  boxShadow: `0 0 60px ${stat.color}30`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Data Visualization Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Revenue Graph */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {isRTL ? '📈 نمو الإيرادات' : '📈 Revenue Growth'}
                </h3>
                <p className="text-sm text-white/60">
                  {isRTL ? 'مقارنة شهرية بعد استخدام قوت' : 'Monthly comparison after using Qoot'}
                </p>
              </div>
              <div className="px-3 py-1 bg-[#2ecc71]/20 rounded-full">
                <span className="text-[#2ecc71] font-bold text-sm flex items-center gap-1">
                  <FiRefreshCw className="w-3 h-3" /> {isRTL ? 'مباشر' : 'Live'}
                </span>
              </div>
            </div>
            
            <RevenueGraph data={revenueData} inView={isInView} />
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2ecc71]" />
                <span className="text-xs text-white/60">{isRTL ? 'إيرادات مع قوت' : 'Revenue with Qoot'}</span>
              </div>
            </div>
          </motion.div>

          {/* Before/After Comparisons */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <ComparisonChart 
              before={15} 
              after={8} 
              label={isRTL ? '⏱️ وقت الانتظار (دقائق)' : '⏱️ Wait Time (minutes)'}
              color="#2ecc71"
              inView={isInView}
              delay={0.2}
            />
            <ComparisonChart 
              before={85} 
              after={120} 
              label={isRTL ? '💰 متوسط الفاتورة (EGP)' : '💰 Avg. Check Size (EGP)'}
              color="#3498db"
              inView={isInView}
              delay={0.4}
            />
            <ComparisonChart 
              before={4} 
              after={6} 
              label={isRTL ? '🔄 دورات الطاولة/يوم' : '🔄 Table Turns/Day'}
              color="#9b59b6"
              inView={isInView}
              delay={0.6}
            />
          </motion.div>
        </motion.div>

        {/* Time Savings Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#2ecc71]/20 to-[#3498db]/20 border border-white/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {isRTL ? '⏱️ توفير الوقت في كل طلب' : '⏱️ Time Saved Per Order'}
            </h3>
            <p className="text-white/60">
              {isRTL ? 'من الطلب إلى الدفع' : 'From ordering to payment'}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: isRTL ? 'الطلب' : 'Ordering', before: '5m', after: '1m', icon: '📝' },
              { label: isRTL ? 'الانتظار' : 'Waiting', before: '15m', after: '8m', icon: '⏳' },
              { label: isRTL ? 'الدفع' : 'Payment', before: '8m', after: '30s', icon: '💳' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-white font-bold mt-2">{item.label}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-red-400 line-through text-sm">{item.before}</p>
                  <motion.p 
                    className="text-[#2ecc71] font-bold text-xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                  >
                    {item.after}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Total Savings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-block px-8 py-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-white/60 text-sm mb-1">{isRTL ? 'إجمالي التوفير لكل طلب' : 'Total Saved Per Order'}</p>
              <p className="text-4xl font-black text-[#2ecc71]">
                {isRTL ? '~١٨ دقيقة' : '~18 minutes'}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-white/60 text-lg italic mb-4">
              {t('value.quote')}
            </p>
            <p className="text-2xl font-bold text-white">
              {isRTL ? '📊 البيانات لا تكذب. النتائج تتحدث.' : '📊 Data doesn\'t lie. Results speak.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
