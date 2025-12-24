import { motion } from 'framer-motion';
import { HiArrowDown, HiPlay } from 'react-icons/hi';
import { FiCheck, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, isRTL } = useLanguage();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#2ecc71]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2ecc71]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3498db]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2ecc71]/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232ecc71%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left: Text Content */}
          <div className={`text-center lg:text-left ${isRTL ? 'lg:text-right lg:col-start-2' : ''}`}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className={`w-2 h-2 bg-[#2ecc71] rounded-full ${isRTL ? 'ml-2' : 'mr-2'} animate-pulse`} />
              {t('hero.badge')}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight"
            >
              <span className="block">{isRTL ? 'قوت' : 'QOOT'}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light mb-4"
            >
              {isRTL ? (
                <>
                  قوائم ذكية. مدفوعات ذكية.{' '}
                  <span className="text-[#2ecc71] font-semibold">تجربة طعام أذكى.</span>
                </>
              ) : (
                <>
                  Smart Menus. Smart Payments.{' '}
                  <span className="text-[#2ecc71] font-semibold">Smarter Dining.</span>
                </>
              )}
            </motion.p>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base sm:text-lg text-white/60 max-w-xl mb-8"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className={`flex flex-col sm:flex-row items-center gap-4 ${isRTL ? 'sm:flex-row-reverse lg:justify-end' : 'lg:justify-start'} justify-center`}
            >
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="group px-8 py-4 bg-[#2ecc71] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.requestDemo')}
                <span className={`inline-block ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform`}>
                  {isRTL ? '←' : '→'}
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('#solution')}
                className={`group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiPlay className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#2ecc71]`} />
                {t('hero.seeHow')}
              </motion.button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className={`mt-12 grid grid-cols-3 gap-6 max-w-md ${isRTL ? 'lg:mr-0 lg:ml-auto' : 'lg:ml-0 lg:mr-auto'} mx-auto lg:mx-0`}
            >
              {[
                { value: '20%', label: t('hero.fasterTurnover') },
                { value: '15%', label: t('hero.higherRevenue') },
                { value: '30%', label: t('hero.costSavings') },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#2ecc71]">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`relative ${isRTL ? 'lg:col-start-1' : ''}`}
          >
            <div className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Phone Mockup - QR Scanning */}
              <motion.div
                className={`relative z-20 ${isRTL ? 'ml-[-60px] mr-0' : 'ml-0 mr-[-40px]'}`}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl shadow-black/40">
                  {/* Notch - centered using inset-x-0 and margin auto */}
                  <div className="absolute top-0 inset-x-0 flex justify-center z-20" style={{ direction: 'ltr' }}>
                    <div className="w-24 h-6 bg-[#1a1a1a] rounded-b-2xl flex justify-center items-center pt-2">
                      <div className="w-12 h-2 bg-[#0a0a0a] rounded-full" />
                    </div>
                  </div>
                  
                  {/* Phone Screen */}
                  <div className="relative bg-gradient-to-b from-gray-100 to-white rounded-[2rem] overflow-hidden w-[180px] h-[380px]">
                    {/* Status Bar */}
                    <div className="bg-[#2c3e50] text-white text-xs p-2 text-center font-medium" dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? 'امسح القائمة' : 'Scan Menu'}
                    </div>
                    
                    {/* Camera View */}
                    <div className="relative flex-1 bg-gradient-to-br from-gray-800 to-gray-900 h-44 flex items-center justify-center">
                      {/* QR Frame */}
                      <motion.div
                        className="w-28 h-28 border-4 border-[#2ecc71] rounded-2xl relative"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Scanning Line */}
                        <motion.div
                          className="absolute left-0 right-0 h-1 bg-[#2ecc71] rounded-full shadow-lg shadow-[#2ecc71]/50"
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        {/* QR Pattern */}
                        <div className="absolute inset-2 grid grid-cols-5 gap-1 opacity-60">
                          {[...Array(25)].map((_, i) => (
                            <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'} rounded-sm`} />
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Camera corners */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
                    </div>

                    {/* Menu Preview */}
                    <div className="p-3 space-y-2" dir={isRTL ? 'rtl' : 'ltr'}>
                      <div className="text-center text-xs font-bold text-[#2c3e50] mb-2">
                        {isRTL ? 'قائمة المطعم 🍽️' : '🍽️ Restaurant Menu'}
                      </div>
                      
                      {/* Menu Items */}
                      {[
                        { name: isRTL ? 'برجر كلاسيك' : 'Classic Burger', price: '120', emoji: '🍔' },
                        { name: isRTL ? 'بيتزا مارجريتا' : 'Margherita Pizza', price: '150', emoji: '🍕' },
                        { name: isRTL ? 'سلطة سيزر' : 'Caesar Salad', price: '85', emoji: '🥗' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center justify-between p-2 rounded-lg bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.2 }}
                        >
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-lg">{item.emoji}</span>
                            <span className="text-xs font-medium text-gray-700">{item.name}</span>
                          </div>
                          <span className="text-xs font-bold text-[#2ecc71]">{item.price}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Side Buttons */}
                  <div className="absolute right-[-3px] top-20 w-1 h-10 bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute left-[-3px] top-16 w-1 h-6 bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute left-[-3px] top-24 w-1 h-10 bg-[#2a2a2a] rounded-l-sm" />
                </div>

                {/* Floating Success Badge */}
                <motion.div
                  className={`absolute -top-4 ${isRTL ? '-left-8' : '-right-8'} z-30 px-3 py-2 bg-white rounded-full shadow-xl flex items-center gap-2`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring' }}
                >
                  <div className="w-6 h-6 bg-[#2ecc71] rounded-full flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{isRTL ? 'مجاني!' : 'Instant!'}</span>
                </motion.div>
              </motion.div>

              {/* Tablet Mockup - Dashboard */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="relative bg-[#1a1a1a] rounded-[1.5rem] p-3 shadow-2xl shadow-black/30">
                  {/* Tablet Camera - centered using inset-x-0 */}
                  <div className="absolute top-4 inset-x-0 flex justify-center" style={{ direction: 'ltr' }}>
                    <div className="w-2 h-2 bg-[#0a0a0a] rounded-full" />
                  </div>
                  
                  {/* Tablet Screen */}
                  <div className="relative bg-white rounded-[1rem] overflow-hidden w-[280px] h-[200px]">
                    {/* Dashboard Header */}
                    <div className={`bg-[#2c3e50] text-white text-xs p-2 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      <span className="font-bold">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
                      <span className="text-[#2ecc71]">{isRTL ? 'مباشر ●' : '● Live'}</span>
                    </div>
                    
                    {/* Dashboard Content */}
                    <div className="p-3 grid grid-cols-2 gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
                      {/* Today's Revenue */}
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-[#2ecc71]/10 to-[#2ecc71]/5 border border-[#2ecc71]/20 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-[10px] text-gray-500">{isRTL ? 'إيرادات اليوم' : "Today's Revenue"}</p>
                        <p className="text-lg font-black text-[#2ecc71]">12,450</p>
                        <div className={`flex items-center gap-1 ${isRTL ? 'justify-end' : ''}`}>
                          <FiTrendingUp className="w-3 h-3 text-[#2ecc71]" />
                          <span className="text-[10px] text-[#2ecc71]">+23%</span>
                        </div>
                      </div>
                      
                      {/* Active Orders */}
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-[#3498db]/10 to-[#3498db]/5 border border-[#3498db]/20 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-[10px] text-gray-500">{isRTL ? 'طلبات نشطة' : 'Active Orders'}</p>
                        <p className="text-lg font-black text-[#3498db]">24</p>
                        <div className={`flex items-center gap-1 ${isRTL ? 'justify-end' : ''}`}>
                          <FiShoppingCart className="w-3 h-3 text-[#3498db]" />
                          <span className="text-[10px] text-[#3498db]">{isRTL ? 'قيد التحضير' : 'In progress'}</span>
                        </div>
                      </div>
                      
                      {/* Mini Chart */}
                      <div className={`col-span-2 p-2 rounded-lg bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-[10px] text-gray-500 mb-2">{isRTL ? 'المبيعات بالساعة' : 'Hourly Sales'}</p>
                        <div className="flex items-end justify-between gap-1 h-12">
                          {[40, 65, 45, 80, 60, 90, 75, 95].map((height, i) => (
                            <motion.div
                              key={i}
                              className="flex-1 bg-[#2ecc71] rounded-t"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Notification Toast */}
                <motion.div
                  className={`absolute -bottom-6 ${isRTL ? '-right-16' : '-right-16'} px-3 py-2 bg-white rounded-xl shadow-xl flex items-center gap-2 border border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="w-8 h-8 bg-[#f39c12]/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔔</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] font-bold text-gray-800">{isRTL ? 'طلب جديد!' : 'New Order!'}</p>
                    <p className="text-[8px] text-gray-500">{isRTL ? 'طاولة ٧ • ٣ أصناف' : 'Table 7 • 3 items'}</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 left-0 text-4xl"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              📱
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-0 text-4xl"
              animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              💳
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-10 text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => scrollToSection('#problem')}
          className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs mb-2">{t('hero.scrollToExplore')}</span>
          <HiArrowDown className="text-xl" />
        </motion.button>
      </motion.div>
    </section>
  );
}
