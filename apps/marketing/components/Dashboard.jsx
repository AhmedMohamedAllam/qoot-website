import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

// Animated counter component
function AnimatedCounter({ value, suffix = '', inView }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [inView, value]);
  
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function Dashboard() {
  const { isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const topItems = [
    { name: isRTL ? 'برجر كلاسيك' : 'Classic Burger', orders: 156, revenue: 18720, emoji: '🍔' },
    { name: isRTL ? 'بيتزا مارجريتا' : 'Margherita Pizza', orders: 124, revenue: 18600, emoji: '🍕' },
    { name: isRTL ? 'باستا كاربونارا' : 'Pasta Carbonara', orders: 98, revenue: 14700, emoji: '🍝' },
    { name: isRTL ? 'سلطة سيزر' : 'Caesar Salad', orders: 87, revenue: 7395, emoji: '🥗' },
    { name: isRTL ? 'تشيز كيك' : 'Cheesecake', orders: 76, revenue: 5700, emoji: '🍰' },
  ];

  const hourlyData = [
    { hour: '9AM', value: 12 },
    { hour: '10AM', value: 18 },
    { hour: '11AM', value: 25 },
    { hour: '12PM', value: 65 },
    { hour: '1PM', value: 85 },
    { hour: '2PM', value: 70 },
    { hour: '3PM', value: 45 },
    { hour: '4PM', value: 30 },
    { hour: '5PM', value: 35 },
    { hour: '6PM', value: 55 },
    { hour: '7PM', value: 95 },
    { hour: '8PM', value: 100 },
    { hour: '9PM', value: 88 },
    { hour: '10PM', value: 60 },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#1a252f] to-[#2c3e50] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3498db]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2ecc71]/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3498db]/20 text-[#3498db] text-sm font-bold mb-6"
          >
            <FiPieChart className="w-5 h-5" />
            {isRTL ? 'تحليلات في الوقت الفعلي' : 'Real-Time Analytics'}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>بيانات <span className="text-[#3498db]">تُحرك</span> قراراتك</>
            ) : (
              <>Data That <span className="text-[#3498db]">Drives</span> Decisions</>
            )}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {isRTL 
              ? 'لوحة تحكم شاملة تُظهر كل شيء عن مطعمك في نظرة واحدة'
              : 'A comprehensive dashboard showing everything about your restaurant at a glance'}
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Desktop Frame */}
          <div className="bg-[#0a0a0a] rounded-t-2xl p-3">
            {/* Browser Chrome */}
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-center">
                <span className="text-white/40 text-sm">dashboard.qoot.app</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-[#f8f9fa] rounded-xl overflow-hidden">
              {/* Dashboard Header */}
              <div className={`bg-white p-4 border-b border-gray-200 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-[#2ecc71] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">Q</span>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="font-bold text-[#2c3e50]">{isRTL ? 'مطعم الشام' : 'Al Sham Restaurant'}</h3>
                    <p className="text-xs text-gray-500">{isRTL ? 'القاهرة الجديدة' : 'New Cairo'}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="px-3 py-1.5 bg-green-100 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-600 text-sm font-medium">{isRTL ? 'مباشر' : 'Live'}</span>
                  </div>
                  <span className="text-sm text-gray-500">{isRTL ? 'اليوم' : 'Today'}</span>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="p-4 grid grid-cols-4 gap-4">
                {/* Stats Cards */}
                {[
                  { icon: FiDollarSign, label: isRTL ? 'إيرادات اليوم' : "Today's Revenue", value: 12450, suffix: ' EGP', color: '#2ecc71', trend: '+23%' },
                  { icon: FiShoppingBag, label: isRTL ? 'الطلبات' : 'Orders', value: 156, suffix: '', color: '#3498db', trend: '+18%' },
                  { icon: FiUsers, label: isRTL ? 'العملاء' : 'Customers', value: 89, suffix: '', color: '#9b59b6', trend: '+12%' },
                  { icon: FiTrendingUp, label: isRTL ? 'متوسط الفاتورة' : 'Avg. Check', value: 145, suffix: ' EGP', color: '#f39c12', trend: '+8%' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">{stat.trend}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-black" style={{ color: stat.color }}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="px-4 pb-4 grid grid-cols-3 gap-4">
                {/* Hourly Sales Chart */}
                <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
                  <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-bold text-[#2c3e50] flex items-center gap-2">
                      <FiBarChart2 className="w-5 h-5 text-[#3498db]" />
                      {isRTL ? 'المبيعات بالساعة' : 'Hourly Sales'}
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{isRTL ? 'اليوم' : 'Today'}</span>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-32">
                    {hourlyData.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <motion.div
                          className="w-full rounded-t"
                          style={{ 
                            backgroundColor: item.value > 80 ? '#2ecc71' : item.value > 50 ? '#3498db' : '#bdc3c7',
                          }}
                          initial={{ height: 0 }}
                          animate={isInView ? { height: `${item.value}%` } : {}}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                        />
                        <span className="text-[8px] text-gray-400 mt-1">{item.hour}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 rounded bg-[#2ecc71]" />
                      <span className="text-xs text-gray-500">{isRTL ? 'ذروة' : 'Peak'}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 rounded bg-[#3498db]" />
                      <span className="text-xs text-gray-500">{isRTL ? 'متوسط' : 'Average'}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 rounded bg-[#bdc3c7]" />
                      <span className="text-xs text-gray-500">{isRTL ? 'هادئ' : 'Slow'}</span>
                    </div>
                  </div>
                </div>

                {/* Top Items */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className={`font-bold text-[#2c3e50] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>🏆</span>
                    {isRTL ? 'الأكثر مبيعاً' : 'Top Sellers'}
                  </h4>
                  <div className="space-y-3">
                    {topItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <div className="flex-1">
                          <p className={`text-xs font-medium text-gray-800 ${isRTL ? 'text-right' : ''}`}>{item.name}</p>
                          <p className={`text-[10px] text-gray-400 ${isRTL ? 'text-right' : ''}`}>{item.orders} {isRTL ? 'طلب' : 'orders'}</p>
                        </div>
                        <span className="text-xs font-bold text-[#2ecc71]">{item.revenue.toLocaleString()}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor Stand */}
          <div className="flex justify-center">
            <div className="w-40 h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-2xl" />
          </div>
          <div className="flex justify-center">
            <div className="w-60 h-4 bg-[#0a0a0a] rounded-full shadow-2xl" />
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '📊', title: isRTL ? 'تقارير مباشرة' : 'Live Reports', desc: isRTL ? 'بيانات تحديث كل ثانية' : 'Data updated every second' },
            { icon: '🎯', title: isRTL ? 'هندسة القائمة' : 'Menu Engineering', desc: isRTL ? 'اعرف النجوم والخاسرين' : 'Know your stars & dogs' },
            { icon: '📈', title: isRTL ? 'تنبؤات ذكية' : 'Smart Predictions', desc: isRTL ? 'توقع الطلب المستقبلي' : 'Forecast future demand' },
            { icon: '📱', title: isRTL ? 'تطبيق موبايل' : 'Mobile App', desc: isRTL ? 'راقب من أي مكان' : 'Monitor from anywhere' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <span className="text-4xl">{feature.icon}</span>
              <h4 className="text-lg font-bold text-white mt-3">{feature.title}</h4>
              <p className="text-sm text-white/50 mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

