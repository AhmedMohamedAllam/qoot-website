import { motion } from 'framer-motion';
import { FiUsers, FiClock, FiFileText, FiBarChart2, FiX, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Problem() {
  const { t, isRTL } = useLanguage();

  const painPoints = [
    {
      icon: FiUsers,
      title: t('problem.overwhelmedStaff'),
      description: t('problem.overwhelmedStaffDesc'),
      visual: {
        emoji: '😰',
        scene: isRTL ? 'نادل مرهق' : 'Stressed Waiter',
        details: isRTL ? ['طلبات متداخلة', 'أخطاء متكررة', 'عملاء غاضبون'] : ['Mixed-up orders', 'Constant errors', 'Angry customers'],
      },
    },
    {
      icon: FiClock,
      title: t('problem.slowTurnover'),
      description: t('problem.slowTurnoverDesc'),
      visual: {
        emoji: '⏳',
        scene: isRTL ? 'انتظار طويل' : 'Long Wait Times',
        details: isRTL ? ['عملاء ينتظرون', 'طاولات محجوزة', 'إيرادات ضائعة'] : ['Waiting customers', 'Blocked tables', 'Lost revenue'],
      },
    },
    {
      icon: FiFileText,
      title: t('problem.expensiveMenus'),
      description: t('problem.expensiveMenusDesc'),
      visual: {
        emoji: '📋',
        scene: isRTL ? 'قوائم قديمة' : 'Outdated Menus',
        details: isRTL ? ['أسعار ملصقة', 'تصميم قديم', 'تكاليف طباعة'] : ['Sticker prices', 'Old design', 'Print costs'],
      },
    },
    {
      icon: FiBarChart2,
      title: t('problem.noData'),
      description: t('problem.noDataDesc'),
      visual: {
        emoji: '📊',
        scene: isRTL ? 'صفر بيانات' : 'Zero Insights',
        details: isRTL ? ['قرارات عشوائية', 'لا تحليلات', 'فرص ضائعة'] : ['Random decisions', 'No analytics', 'Missed opportunities'],
      },
    },
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] relative overflow-hidden">
      {/* Creative Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(249,115,22,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.05)_0%,_transparent_70%)]" />
        
        {/* Floating Chaos Elements */}
        <motion.div
          className="absolute top-20 left-[10%] text-6xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          📋
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-5xl opacity-15"
          animate={{ y: [0, 25, 0], rotate: [0, -20, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        >
          ⏰
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[20%] text-4xl opacity-20"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          💸
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[25%] text-5xl opacity-15"
          animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        >
          😤
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-[5%] text-4xl opacity-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🔥
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[8%] text-3xl opacity-15"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        >
          ❌
        </motion.div>
        
        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/20 text-red-400 text-sm font-bold mb-6"
          >
            <FiAlertCircle className="w-5 h-5" />
            {t('problem.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>فوضى <span className="text-red-400">المطاعم التقليدية</span></>
            ) : (
              <>The Chaos of <span className="text-red-400">Traditional Dining</span></>
            )}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {t('problem.description')}
          </p>
        </motion.div>

        {/* Visual Chaos Scene */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl p-8 border border-red-500/20 overflow-hidden">
            {/* Restaurant Scene Header */}
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="text-xl font-bold text-white">{isRTL ? 'مطعم تقليدي' : 'Traditional Restaurant'}</h3>
                  <p className="text-sm text-red-400">{isRTL ? '🔴 يوم عمل نموذجي' : '🔴 A Typical Day'}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-red-500/20 rounded-full">
                <span className="text-red-400 text-sm font-bold">{isRTL ? 'قبل قوت' : 'Before QOOT'}</span>
              </div>
            </div>

            {/* Chaos Visual Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Stressed Staff */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative bg-[#1a252f] rounded-2xl p-4 border border-red-500/30"
              >
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-center"
                >
                  <span className="text-5xl">😰</span>
                </motion.div>
                <p className="text-center text-white/60 text-sm mt-3">{isRTL ? 'نادل مرهق' : 'Stressed Staff'}</p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <FiX className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              {/* Waiting Customers */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative bg-[#1a252f] rounded-2xl p-4 border border-red-500/30"
              >
                <div className="flex justify-center gap-1">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="text-3xl"
                  >👤</motion.span>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="text-3xl"
                  >👤</motion.span>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="text-3xl"
                  >👤</motion.span>
                </div>
                <p className="text-center text-white/60 text-sm mt-3">{isRTL ? 'طوابير انتظار' : 'Long Queues'}</p>
                <motion.div 
                  className="absolute -top-2 -right-2 px-2 py-1 bg-orange-500 rounded-full text-white text-xs font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  +20 {isRTL ? 'دقيقة' : 'min'}
                </motion.div>
              </motion.div>

              {/* Paper Menus */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative bg-[#1a252f] rounded-2xl p-4 border border-red-500/30"
              >
                <div className="text-center relative">
                  <span className="text-5xl">📋</span>
                  {/* Price Stickers */}
                  <motion.div
                    className="absolute top-0 right-4 w-6 h-4 bg-yellow-400 rounded text-[8px] font-bold flex items-center justify-center -rotate-12"
                    animate={{ rotate: [-12, -8, -12] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    NEW!
                  </motion.div>
                </div>
                <p className="text-center text-white/60 text-sm mt-3">{isRTL ? 'قوائم ورقية' : 'Paper Menus'}</p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">💸</span>
                </div>
              </motion.div>

              {/* Split Bill Chaos */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative bg-[#1a252f] rounded-2xl p-4 border border-red-500/30"
              >
                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <span className="text-3xl">🧮</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-xl"
                    >➗</motion.span>
                    <span className="text-3xl">💢</span>
                  </div>
                </div>
                <p className="text-center text-white/60 text-sm mt-3">{isRTL ? 'تقسيم الفاتورة' : 'Bill Drama'}</p>
                <motion.div
                  className="absolute -top-2 -right-2 text-lg"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  😤
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              <div className="text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-2xl font-black text-red-400">-35%</p>
                <p className="text-xs text-white/50">{isRTL ? 'كفاءة الخدمة' : 'Service Efficiency'}</p>
              </div>
              <div className="text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-2xl font-black text-red-400">+25%</p>
                <p className="text-xs text-white/50">{isRTL ? 'أخطاء الطلبات' : 'Order Errors'}</p>
              </div>
              <div className="text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-2xl font-black text-red-400">-20%</p>
                <p className="text-xs text-white/50">{isRTL ? 'رضا العملاء' : 'Customer Satisfaction'}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden ${isRTL ? 'text-right' : ''}`}
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300">
                {/* Visual Scene */}
                <div className={`flex items-start gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Emoji Visual */}
                  <motion.div
                    className="flex-shrink-0 w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-4xl">{point.visual.emoji}</span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <point.icon className="w-5 h-5 text-red-400" />
                      <h3 className="text-xl font-bold text-white">{point.title}</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed text-sm">{point.description}</p>
                  </div>
                </div>

                {/* Pain Point Details */}
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                  {point.visual.details.map((detail, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <FiX className="w-3 h-3" />
                      {detail}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-2 h-2 rounded-full bg-red-500/50`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-block p-8 rounded-3xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/20"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-white/60 text-lg mb-4">
              {t('problem.soundFamiliar')}
            </p>
            <p className="text-3xl font-bold text-white mb-6">
              {isRTL ? 'حان وقت التغيير! 🚀' : 'Time for a Change! 🚀'}
            </p>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#solution');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`inline-flex items-center px-8 py-4 rounded-xl bg-[#2ecc71] text-white font-bold text-lg hover:bg-[#27ae60] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('problem.seeSolution')}
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-xl`}>↓</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
