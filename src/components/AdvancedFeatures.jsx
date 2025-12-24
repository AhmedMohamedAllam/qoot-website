import { motion } from 'framer-motion';
import { FiGift, FiCalendar, FiMail, FiLink, FiTruck, FiUsers, FiHeart, FiZap } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function AdvancedFeatures() {
  const { isRTL } = useLanguage();

  const features = [
    {
      icon: FiGift,
      title: isRTL ? 'برنامج الولاء' : 'Loyalty Program',
      description: isRTL 
        ? 'نظام نقاط ومكافآت يُشجع العملاء على العودة. اجمع نقاط مع كل طلب واستبدلها بخصومات.'
        : 'Points and rewards system that encourages customers to return. Earn points with every order and redeem for discounts.',
      color: '#e91e63',
      emoji: '🎁',
      features: isRTL 
        ? ['نقاط تلقائية', 'مستويات VIP', 'عروض خاصة', 'إشعارات ذكية']
        : ['Auto Points', 'VIP Tiers', 'Special Offers', 'Smart Notifications'],
      mockup: (
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-3 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">👤</div>
            <div>
              <p className="text-xs opacity-80">{isRTL ? 'مرحباً' : 'Hello'},</p>
              <p className="font-bold text-sm">Ahmed</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-2 text-center">
            <p className="text-2xl font-black">1,250</p>
            <p className="text-xs opacity-80">{isRTL ? 'نقاط' : 'Points'}</p>
          </div>
          <div className="mt-2 flex gap-1">
            {['🥉', '🥈', '🥇', '💎'].map((tier, i) => (
              <div key={i} className={`flex-1 py-1 rounded text-center text-xs ${i < 2 ? 'bg-white/30' : 'bg-white/10'}`}>
                {tier}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: FiCalendar,
      title: isRTL ? 'حجز الطاولات' : 'Table Reservations',
      description: isRTL
        ? 'نظام حجز ذكي يُدير الطاولات تلقائياً. العملاء يحجزون عبر الإنترنت ويتلقون تأكيداً فورياً.'
        : 'Smart reservation system that manages tables automatically. Customers book online and receive instant confirmation.',
      color: '#3498db',
      emoji: '📅',
      features: isRTL
        ? ['حجز أونلاين', 'تأكيد SMS', 'تذكير تلقائي', 'إدارة القوائم']
        : ['Online Booking', 'SMS Confirm', 'Auto Reminder', 'Waitlist Mgmt'],
      mockup: (
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 text-white">
          <div className="text-center mb-2">
            <p className="text-xs opacity-80">{isRTL ? 'حجز جديد' : 'New Reservation'}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="py-2 bg-white/20 rounded">
                <p className="text-lg font-bold">25</p>
                <p className="text-[8px] opacity-80">Dec</p>
              </div>
              <div className="py-2 bg-white/20 rounded">
                <p className="text-lg font-bold">7:00</p>
                <p className="text-[8px] opacity-80">PM</p>
              </div>
              <div className="py-2 bg-white/20 rounded">
                <p className="text-lg font-bold">4</p>
                <p className="text-[8px] opacity-80">{isRTL ? 'أشخاص' : 'Guests'}</p>
              </div>
            </div>
          </div>
          <div className="mt-2 py-2 bg-white text-blue-500 rounded-lg text-center font-bold text-xs">
            ✓ {isRTL ? 'تم التأكيد' : 'Confirmed'}
          </div>
        </div>
      ),
    },
    {
      icon: FiMail,
      title: isRTL ? 'التسويق الذكي' : 'Smart Marketing',
      description: isRTL
        ? 'حملات تسويقية مُؤتمتة عبر SMS والإيميل. استهدف العملاء المناسبين بالعروض المناسبة.'
        : 'Automated marketing campaigns via SMS and Email. Target the right customers with the right offers.',
      color: '#f39c12',
      emoji: '📣',
      features: isRTL
        ? ['حملات تلقائية', 'تجزئة العملاء', 'A/B Testing', 'تتبع النتائج']
        : ['Auto Campaigns', 'Segmentation', 'A/B Testing', 'Track Results'],
      mockup: (
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-3 text-white">
          <div className="bg-white/20 rounded-lg p-2 mb-2">
            <p className="text-xs opacity-80 mb-1">{isRTL ? 'حملة نشطة' : 'Active Campaign'}</p>
            <p className="font-bold text-sm">🎉 {isRTL ? 'عرض الجمعة' : 'Friday Special'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/20 rounded p-2 text-center">
              <p className="text-lg font-bold">1.2K</p>
              <p className="text-[8px] opacity-80">{isRTL ? 'مرسل' : 'Sent'}</p>
            </div>
            <div className="bg-white/20 rounded p-2 text-center">
              <p className="text-lg font-bold">42%</p>
              <p className="text-[8px] opacity-80">{isRTL ? 'مفتوح' : 'Opened'}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: FiLink,
      title: isRTL ? 'مركز التكاملات' : 'Integration Hub',
      description: isRTL
        ? 'اربط قوت بأنظمتك الحالية - POS، المحاسبة، التوصيل. كل شيء متزامن تلقائياً.'
        : 'Connect Qoot to your existing systems - POS, accounting, delivery. Everything syncs automatically.',
      color: '#9b59b6',
      emoji: '🔗',
      features: isRTL
        ? ['POS Integration', 'QuickBooks', 'طلبات/Talabat', 'Uber Eats']
        : ['POS Systems', 'QuickBooks', 'Talabat', 'Uber Eats'],
      mockup: (
        <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl p-3 text-white">
          <p className="text-xs opacity-80 text-center mb-2">{isRTL ? 'متصل مع' : 'Connected to'}</p>
          <div className="grid grid-cols-2 gap-2">
            {['💳 POS', '📊 QB', '🛵 Talabat', '🚗 Uber'].map((service, i) => (
              <div key={i} className="bg-white/20 rounded-lg p-2 text-center flex items-center justify-center gap-1">
                <span className="text-sm">{service}</span>
                <span className="text-green-300 text-xs">●</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: FiTruck,
      title: isRTL ? 'إدارة التوصيل' : 'Delivery Management',
      description: isRTL
        ? 'تتبع طلبات التوصيل في الوقت الفعلي. إشعارات للعملاء في كل مرحلة من الرحلة.'
        : 'Track delivery orders in real-time. Notifications for customers at every stage of the journey.',
      color: '#e74c3c',
      emoji: '🛵',
      features: isRTL
        ? ['تتبع مباشر', 'إشعارات SMS', 'تقييم السائقين', 'تقارير التوصيل']
        : ['Live Tracking', 'SMS Updates', 'Driver Ratings', 'Delivery Reports'],
      mockup: (
        <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-xl p-3 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs opacity-80">#{isRTL ? '١٢٣٤' : '1234'}</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px]">{isRTL ? 'في الطريق' : 'On Way'}</span>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xl">🏪</span>
                <div className="w-8 h-0.5 bg-white/40" />
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-xl"
                >🛵</motion.span>
                <div className="w-8 h-0.5 bg-white/20" />
                <span className="text-xl">🏠</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs mt-2 opacity-80">⏱ ~15 {isRTL ? 'دقيقة' : 'min'}</p>
        </div>
      ),
    },
    {
      icon: FiHeart,
      title: isRTL ? 'رؤى العملاء' : 'Customer Insights',
      description: isRTL
        ? 'اعرف عملاءك بشكل أعمق. تفضيلاتهم، عاداتهم، ومتى يزورون. بيانات تُحدث فرقاً.'
        : 'Know your customers deeply. Their preferences, habits, and when they visit. Data that makes a difference.',
      color: '#2ecc71',
      emoji: '💡',
      features: isRTL
        ? ['ملفات العملاء', 'تحليل السلوك', 'تفضيلات الطعام', 'سجل الزيارات']
        : ['Customer Profiles', 'Behavior Analysis', 'Food Preferences', 'Visit History'],
      mockup: (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-3 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">👨</div>
            <div>
              <p className="font-bold text-sm">Ahmed Hassan</p>
              <p className="text-[10px] opacity-80">🏆 VIP • 12 {isRTL ? 'زيارة' : 'visits'}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <p className="text-[10px] opacity-80 mb-1">{isRTL ? 'المفضلات' : 'Favorites'}</p>
            <div className="flex gap-1">
              {['🍔', '🍟', '🥤'].map((emoji, i) => (
                <span key={i} className="text-lg">{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#9b59b6]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#3498db]/5 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9b59b6]/10 text-[#9b59b6] text-sm font-bold mb-6"
          >
            <FiZap className="w-5 h-5" />
            {isRTL ? 'قادم قريباً' : 'Coming Soon'}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2c3e50] mb-6">
            {isRTL ? (
              <>ميزات <span className="text-[#9b59b6]">متقدمة</span> في الطريق</>
            ) : (
              <><span className="text-[#9b59b6]">Advanced</span> Features on the Way</>
            )}
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            {isRTL 
              ? 'نعمل على ميزات إضافية ستُحدث ثورة في إدارة مطعمك. كن أول من يجربها!'
              : 'We\'re building additional features that will revolutionize your restaurant management. Be the first to try them!'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden group ${isRTL ? 'text-right' : ''}`}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            >
              {/* Coming Soon Badge */}
              <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                <span className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold rounded-full">
                  {isRTL ? 'قريباً' : 'Soon'}
                </span>
              </div>

              {/* Mockup Preview */}
              <div className="p-6 pb-0">
                {feature.mockup}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon & Title */}
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2c3e50]">{feature.title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-[#646464] mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature Tags */}
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                  {feature.features.map((f, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${feature.color}10`,
                        color: feature.color,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ 
                  boxShadow: `inset 0 0 0 2px ${feature.color}30`,
                  borderRadius: '1.5rem',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-[#9b59b6]/10 to-[#3498db]/10 border border-[#9b59b6]/20">
            <p className="text-xl text-[#2c3e50] font-bold mb-4">
              {isRTL ? '🚀 انضم لقائمة الانتظار' : '🚀 Join the Waitlist'}
            </p>
            <p className="text-[#646464] mb-6">
              {isRTL 
                ? 'كن أول من يحصل على هذه الميزات عند إطلاقها'
                : 'Be the first to access these features when they launch'}
            </p>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#9b59b6] to-[#3498db] text-white rounded-xl font-bold"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(155, 89, 182, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isRTL ? 'سجّل اهتمامك' : 'Register Interest'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

