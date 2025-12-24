import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSmartphone, 
  FiShoppingBag, 
  FiCreditCard, 
  FiBox, 
  FiTrendingUp, 
  FiGlobe 
} from 'react-icons/fi';
import { HiX } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: FiSmartphone,
      title: t('features.digitalMenu'),
      subtitle: t('features.digitalMenuTag'),
      description: t('features.digitalMenuDesc'),
      details: isRTL ? [
        'تحديث الأسعار الفوري: غيّر 80 صنف في ثوانٍ',
        'جاذبية بصرية: صور عالية الدقة لكل طبق',
        'البيع الذكي: اقتراح تلقائي للأطباق الجانبية والمشروبات',
        'صديق للبيئة: صفر هدر ورقي',
      ] : [
        'Instant Price Updates: Change 80 items in seconds',
        'Visual Appeal: High-definition photos for every dish',
        'Smart Upselling: Automatically suggest sides and drinks',
        'Eco-Friendly: Zero paper waste',
      ],
      color: '#2ecc71',
    },
    {
      icon: FiShoppingBag,
      title: t('features.smartOrdering'),
      subtitle: t('features.smartOrderingTag'),
      description: t('features.smartOrderingDesc'),
      details: isRTL ? [
        'التخصيص: "بدون بصل" أو "صلصة إضافية" محددة بوضوح',
        'تخفيف عبء الموظفين: النُدُل يركزون على الضيافة',
        'السرعة: الطلبات تصل للمطبخ فوراً',
        'الدقة: صفر سوء تفاهم',
      ] : [
        'Customization: "No onions" or "Extra sauce" clearly flagged',
        'Reduced Staff Load: Waiters focus on hospitality',
        'Speed: Orders hit the KDS instantly',
        'Accuracy: Zero miscommunication',
      ],
      color: '#3498db',
    },
    {
      icon: FiCreditCard,
      title: t('features.payments'),
      subtitle: t('features.paymentsTag'),
      description: t('features.paymentsDesc'),
      details: isRTL ? [
        'تقسيم الفاتورة: حسب الصنف أو بالنسبة المئوية',
        'تكامل محلي: البطاقات، Apple Pay، المحافظ المحلية',
        'بقشيش أعلى: خيارات محددة مسبقاً تشجع مكافأة الموظفين',
        'تسوية فورية: لا انتظار للنادل',
      ] : [
        'Split the Bill: By item or by percentage',
        'Local Integration: Credit Cards, Apple Pay, local wallets',
        'Higher Tips: Preset tip options encourage rewarding staff',
        'Instant Settlement: No waiting for the server',
      ],
      color: '#9b59b6',
    },
    {
      icon: FiBox,
      title: t('features.ar'),
      subtitle: t('features.arTag'),
      description: t('features.arDesc'),
      details: isRTL ? [
        'يقلل من "حسد الطعام" وعدم اليقين',
        'يزيد متوسط الفاتورة بنسبة 15-20%',
        'يخلق لحظات فيروسية على وسائل التواصل',
        'تميز متميز لعلامتك التجارية',
      ] : [
        'Reduces "Food Envy" and uncertainty',
        'Increases average check size by 15-20%',
        'Creates viral social media moments',
        'Premium differentiation for your brand',
      ],
      color: '#e74c3c',
      isPremium: true,
    },
    {
      icon: FiTrendingUp,
      title: t('features.analytics'),
      subtitle: t('features.analyticsTag'),
      description: t('features.analyticsDesc'),
      details: isRTL ? [
        'المبيعات الحية: راقب الإيرادات لحظة بلحظة',
        'ساعات الذروة: اعرف بالضبط متى تزيد الموظفين',
        'هندسة القائمة: حدد النجوم والخاسرين',
        'الاحتفاظ بالعملاء: تتبع الزيارات المتكررة',
      ] : [
        'Real-time Sales: Monitor revenue as it happens',
        'Peak Hours: Know exactly when to staff up',
        'Menu Engineering: Identify stars and dogs',
        'Customer Retention: Track repeat visits',
      ],
      color: '#f39c12',
    },
    {
      icon: FiGlobe,
      title: t('features.localized'),
      subtitle: t('features.localizedTag'),
      description: t('features.localizedDesc'),
      details: isRTL ? [
        'واجهة ثنائية اللغة بالكامل (عربي/إنجليزي)',
        'متكامل مع إنستاباي، فوري، المحافظ المحلية',
        'دعم واتساب محلي للمالكين',
        'متوافق مع اللوائح المصرية',
      ] : [
        'Fully Bilingual Interface (Arabic/English)',
        'Integrated with InstaPay, Fawry, local wallets',
        'Local WhatsApp Support for owners',
        'Compliant with Egyptian regulations',
      ],
      color: '#1abc9c',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-medium mb-4">
            {t('features.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
            {isRTL ? (
              <>كل ما تحتاجه <span className="text-[#2ecc71]">لتحويل</span> مطعمك</>
            ) : (
              <>Everything You Need to <span className="text-[#2ecc71]">Transform</span> Your Restaurant</>
            )}
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setExpandedFeature(feature)}
              className={`group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent cursor-pointer transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
              whileHover={{ y: -5 }}
            >
              {/* Premium Badge */}
              {feature.isPremium && (
                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold`}>
                  {t('features.premium')}
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${isRTL ? 'mr-0 ml-auto' : ''}`}
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon 
                  className="w-7 h-7" 
                  style={{ color: feature.color }} 
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#2c3e50] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: feature.color }}>
                {feature.subtitle}
              </p>
              <p className="text-[#646464] text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More */}
              <div 
                className={`mt-4 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                style={{ color: feature.color }}
              >
                {t('features.clickToLearn')}
                <span>{isRTL ? '←' : '→'}</span>
              </div>

              {/* Hover Border Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ 
                  boxShadow: `inset 0 0 0 2px ${feature.color}40`,
                  borderRadius: '1rem',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Feature Modal */}
      <AnimatePresence>
        {expandedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setExpandedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 ${isRTL ? 'text-right' : ''}`}
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedFeature(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors`}
              >
                <HiX className="w-5 h-5 text-gray-600" />
              </button>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${isRTL ? 'mr-0 ml-auto' : ''}`}
                style={{ backgroundColor: `${expandedFeature.color}15` }}
              >
                <expandedFeature.icon 
                  className="w-8 h-8" 
                  style={{ color: expandedFeature.color }} 
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">
                {expandedFeature.title}
              </h3>
              <p 
                className="text-sm font-medium mb-4"
                style={{ color: expandedFeature.color }}
              >
                {expandedFeature.subtitle}
              </p>
              <p className="text-[#646464] mb-6">
                {expandedFeature.description}
              </p>

              {/* Details List */}
              <div className="space-y-3">
                {expandedFeature.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${expandedFeature.color}15` }}
                    >
                      <span style={{ color: expandedFeature.color }}>✓</span>
                    </div>
                    <p className="text-[#2c3e50] text-sm">{detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => {
                  setExpandedFeature(null);
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full mt-8 py-3 rounded-xl text-white font-semibold transition-all"
                style={{ backgroundColor: expandedFeature.color }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRTL ? `ابدأ مع ${expandedFeature.title}` : `Get Started with ${expandedFeature.title}`}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
