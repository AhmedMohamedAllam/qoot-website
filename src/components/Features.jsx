import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSmartphone, 
  FiShoppingBag, 
  FiCreditCard, 
  FiBox, 
  FiTrendingUp, 
  FiGlobe,
  FiUsers,
  FiCheck,
  FiPlus,
  FiMinus
} from 'react-icons/fi';
import { HiX, HiOutlineQrcode } from 'react-icons/hi';
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
      mockupType: 'menu',
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
      mockupType: 'ordering',
    },
    {
      icon: FiCreditCard,
      title: t('features.payments'),
      subtitle: t('features.paymentsTag'),
      description: t('features.paymentsDesc'),
      details: isRTL ? [
        'الدفع عبر NFC: انقر هاتفك للدفع فوراً',
        'الدفع عبر QR: امسح وادفع بثوانٍ',
        'تقسيم الفاتورة الذكي: كل شخص يدفع فقط ما أكله',
        'تكامل محلي: Apple Pay، Google Pay، إنستاباي، فوري',
        'تسوية فورية: لا انتظار للنادل',
      ] : [
        'NFC Payment: Tap your phone to pay instantly',
        'QR Code Payment: Scan and pay in seconds',
        'Smart Split Bill: Each person pays only for what they ate',
        'Local Integration: Apple Pay, Google Pay, InstaPay, Fawry',
        'Instant Settlement: No waiting for the server',
      ],
      color: '#9b59b6',
      isHighlighted: true,
      mockupType: 'payment',
    },
    {
      icon: FiUsers,
      title: isRTL ? 'تقسيم الفاتورة الذكي' : 'Smart Split Bill',
      subtitle: isRTL ? 'لا مزيد من الجدال!' : 'No More Arguments!',
      description: isRTL 
        ? 'كل صديق يمسح، يختار أصنافه من الإيصال، ويدفع حصته فقط. سحر!' 
        : 'Each friend scans, selects their items from the receipt, and pays their share only. Magic!',
      details: isRTL ? [
        'كل شخص يمسح رمز QR على الطاولة',
        'يرى الإيصال كاملاً بالتفصيل',
        'ينقر لتحديد أصنافه فقط',
        'يدفع حصته عبر NFC أو QR أو المحفظة',
        'لا حسابات، لا جدال، لا إحراج!',
      ] : [
        'Each person scans the table QR code',
        'Views the full itemized receipt',
        'Taps to select only their items',
        'Pays their share via NFC, QR, or wallet',
        'No calculations, no arguments, no awkwardness!',
      ],
      color: '#e91e63',
      isNew: true,
      mockupType: 'split',
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
      mockupType: 'ar',
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
      mockupType: 'analytics',
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
      mockupType: 'localization',
    },
  ];

  // Feature Mockups
  const FeatureMockups = ({ type }) => {
    switch(type) {
      case 'menu':
        return (
          <div className="bg-[#1a1a1a] rounded-2xl p-2 shadow-xl max-w-[180px] mx-auto">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-[#2ecc71] text-white p-2 text-center text-xs font-bold">
                {isRTL ? '📱 القائمة الرقمية' : '📱 Digital Menu'}
              </div>
              <div className="p-2 space-y-1">
                {[
                  { name: '🍔', price: '120' },
                  { name: '🍕', price: '150' },
                  { name: '🥗', price: '85' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-1 bg-gray-50 rounded"
                  >
                    <span className="text-lg">{item.name}</span>
                    <span className="text-xs font-bold text-[#2ecc71]">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'ordering':
        return (
          <div className="bg-[#1a1a1a] rounded-2xl p-2 shadow-xl max-w-[180px] mx-auto">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-[#3498db] text-white p-2 text-center text-xs font-bold">
                {isRTL ? '🛒 الطلب الذكي' : '🛒 Smart Order'}
              </div>
              <div className="p-2">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 mb-2">
                  <p className="text-[10px] text-blue-600 font-medium">✏️ {isRTL ? 'تخصيص' : 'Customize'}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    <span className="px-1 bg-blue-100 rounded text-[8px]">🚫 {isRTL ? 'بصل' : 'Onion'}</span>
                    <span className="px-1 bg-green-100 rounded text-[8px]">➕ {isRTL ? 'صوص' : 'Sauce'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">🍔 x1</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <FiMinus className="w-2 h-2" />
                    </div>
                    <span className="text-xs">1</span>
                    <div className="w-4 h-4 bg-[#3498db] rounded-full flex items-center justify-center">
                      <FiPlus className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="bg-[#1a1a1a] rounded-2xl p-2 shadow-xl max-w-[180px] mx-auto">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white p-2 text-center">
                <p className="text-[10px]">{isRTL ? 'المجموع' : 'Total'}</p>
                <p className="text-lg font-black">165 EGP</p>
              </div>
              <div className="p-2 space-y-1">
                {['📱 Apple Pay', '💳 NFC', '📷 QR Code'].map((method, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-1 bg-gray-50 rounded text-xs text-center"
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'split':
        return (
          <div className="bg-[#1a1a1a] rounded-2xl p-2 shadow-xl max-w-[180px] mx-auto">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-[#e91e63] text-white p-2 text-center text-xs font-bold">
                {isRTL ? '👥 تقسيم الفاتورة' : '👥 Split Bill'}
              </div>
              <div className="p-2 space-y-1">
                {[
                  { name: '🍔 Burger', selected: true },
                  { name: '🍟 Fries', selected: true },
                  { name: '🥗 Salad', selected: false },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-1 p-1 rounded ${item.selected ? 'bg-green-50 border border-green-300' : 'bg-gray-50'}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${item.selected ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center`}>
                      {item.selected && <FiCheck className="w-2 h-2 text-white" />}
                    </div>
                    <span className="text-[10px]">{item.name}</span>
                  </div>
                ))}
                <div className="text-center pt-1">
                  <span className="text-xs font-bold text-[#e91e63]">{isRTL ? 'حصتك: ١٦٥' : 'Your share: 165'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'ar':
        return (
          <div className="relative bg-[#1a1a1a] rounded-2xl p-2 shadow-xl max-w-[180px] mx-auto">
            <div className="bg-gradient-to-b from-gray-100 to-white rounded-xl overflow-hidden h-[140px] flex items-center justify-center relative">
              {/* AR Visualization */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotateY: [0, 360],
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity },
                  rotateY: { duration: 4, repeat: Infinity },
                }}
                className="text-5xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                🍔
              </motion.div>
              {/* AR Frame */}
              <div className="absolute inset-4 border-2 border-[#e74c3c]/50 rounded-xl border-dashed" />
              {/* AR Badge */}
              <div className="absolute top-2 right-2 px-1 bg-[#e74c3c] rounded text-[8px] text-white font-bold">
                AR
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="bg-[#1a1a1a] rounded-xl p-2 shadow-xl max-w-[200px] mx-auto">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-[#f39c12] text-white p-1 text-center text-[10px] font-bold">
                📊 {isRTL ? 'التحليلات' : 'Analytics'}
              </div>
              <div className="p-2 grid grid-cols-2 gap-1">
                <div className="p-1 bg-green-50 rounded text-center">
                  <p className="text-lg font-black text-[#2ecc71]">↑23%</p>
                  <p className="text-[8px] text-gray-500">{isRTL ? 'إيرادات' : 'Revenue'}</p>
                </div>
                <div className="p-1 bg-blue-50 rounded text-center">
                  <p className="text-lg font-black text-[#3498db]">156</p>
                  <p className="text-[8px] text-gray-500">{isRTL ? 'طلبات' : 'Orders'}</p>
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className="flex items-end gap-[2px] h-8">
                  {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-[#f39c12] rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'localization':
        return (
          <div className="flex gap-2 justify-center">
            <div className="bg-[#1a1a1a] rounded-xl p-1 shadow-xl w-[80px]">
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-xs font-bold mb-1">🇬🇧 EN</p>
                <p className="text-[10px]">Menu</p>
                <p className="text-[10px]">Order</p>
                <p className="text-[10px]">Pay</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-1 shadow-xl w-[80px]">
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-xs font-bold mb-1">🇪🇬 AR</p>
                <p className="text-[10px]">قائمة</p>
                <p className="text-[10px]">اطلب</p>
                <p className="text-[10px]">ادفع</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          className="absolute top-40 left-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-bold mb-6"
          >
            <HiOutlineQrcode className="w-5 h-5" />
            {t('features.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2c3e50] mb-6">
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
              className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
              whileHover={{ y: -8 }}
            >
              {/* Premium Badge */}
              {feature.isPremium && (
                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold z-10`}>
                  {t('features.premium')}
                </div>
              )}
              {/* New Feature Badge */}
              {feature.isNew && (
                <motion.div 
                  className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold z-10`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isRTL ? 'جديد ✨' : 'NEW ✨'}
                </motion.div>
              )}

              {/* Mockup Preview */}
              <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <FeatureMockups type={feature.mockupType} />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${isRTL ? 'mr-0 ml-auto' : ''}`}
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
              className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden ${isRTL ? 'text-right' : ''}`}
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedFeature(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors`}
              >
                <HiX className="w-5 h-5 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left: Mockup */}
                <div 
                  className="p-8 flex items-center justify-center"
                  style={{ backgroundColor: `${expandedFeature.color}10` }}
                >
                  <FeatureMockups type={expandedFeature.mockupType} />
                </div>

                {/* Right: Content */}
                <div className="p-8">
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
                          <FiCheck className="w-3 h-3" style={{ color: expandedFeature.color }} />
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
                    className="w-full mt-8 py-4 rounded-xl text-white font-bold transition-all"
                    style={{ backgroundColor: expandedFeature.color }}
                    whileHover={{ scale: 1.02, boxShadow: `0 10px 30px ${expandedFeature.color}40` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isRTL ? `ابدأ مع ${expandedFeature.title}` : `Get Started with ${expandedFeature.title}`}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
