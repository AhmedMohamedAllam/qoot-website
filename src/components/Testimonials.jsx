import { motion } from 'framer-motion';
import { FiStar, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { isRTL } = useLanguage();

  const testimonials = [
    {
      name: isRTL ? 'أحمد الشريف' : 'Ahmed El-Sherif',
      role: isRTL ? 'مالك مطعم البيت' : 'Owner, Al-Bait Restaurant',
      location: isRTL ? 'القاهرة الجديدة' : 'New Cairo',
      image: '👨‍💼',
      quote: isRTL 
        ? 'قوت غيّر كل شيء! الطلبات أسرع، الأخطاء اختفت، والعملاء سعداء. أرباحنا زادت 25% في 3 شهور فقط.'
        : 'Qoot changed everything! Orders are faster, errors disappeared, and customers are happy. Our profits increased 25% in just 3 months.',
      stats: { revenue: '+25%', orders: '+40%', errors: '-90%' },
      rating: 5,
    },
    {
      name: isRTL ? 'سارة محمود' : 'Sara Mahmoud',
      role: isRTL ? 'مديرة كافيه لافي' : 'Manager, Café La Vie',
      location: isRTL ? 'مدينتي' : 'Madinaty',
      image: '👩‍💼',
      quote: isRTL
        ? 'تقسيم الفاتورة كان كابوس يومي. الآن كل شخص يدفع حصته بنفسه. الحياة صارت أسهل!'
        : 'Bill splitting was a daily nightmare. Now everyone pays their own share. Life is so much easier!',
      stats: { revenue: '+18%', orders: '+35%', time: '-60%' },
      rating: 5,
    },
    {
      name: isRTL ? 'محمد حسين' : 'Mohamed Hussein',
      role: isRTL ? 'شريك مؤسس، برجر هاوس' : 'Co-founder, Burger House',
      location: isRTL ? 'الرحاب' : 'El Rehab',
      image: '👨‍🍳',
      quote: isRTL
        ? 'شاشة المطبخ حلّت مشكلة كبيرة. الطلبات منظمة، الفريق سعيد، والعملاء راضين.'
        : 'The kitchen display solved a huge problem. Orders are organized, team is happy, and customers are satisfied.',
      stats: { speed: '+50%', accuracy: '99%', waste: '-40%' },
      rating: 5,
    },
  ];

  const caseStudies = [
    {
      restaurant: isRTL ? 'مطعم الشرق' : 'El Sharq Restaurant',
      type: isRTL ? 'مطعم عائلي' : 'Family Dining',
      before: {
        revenue: '85,000',
        turnover: '3.2',
        errors: '15%',
        waitTime: '25 min',
      },
      after: {
        revenue: '112,000',
        turnover: '4.8',
        errors: '2%',
        waitTime: '12 min',
      },
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#2ecc71]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#3498db]/5 rounded-full blur-3xl"
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
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f39c12]/10 text-[#f39c12] text-sm font-bold mb-6"
          >
            <FiStar className="w-5 h-5" />
            {isRTL ? 'قصص نجاح' : 'Success Stories'}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2c3e50] mb-6">
            {isRTL ? (
              <><span className="text-[#2ecc71]">مطاعم حقيقية</span>، نتائج حقيقية</>
            ) : (
              <><span className="text-[#2ecc71]">Real Restaurants</span>, Real Results</>
            )}
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            {isRTL 
              ? 'اكتشف كيف يُحدث قوت فرقاً ملموساً في أعمال أصحاب المطاعم'
              : 'Discover how Qoot makes a tangible difference in restaurant owners\' businesses'}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl bg-white shadow-xl border border-gray-100 ${isRTL ? 'text-right' : ''}`}
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            >
              {/* Quote Mark */}
              <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-6xl text-[#2ecc71]/20 font-serif`}>
                "
              </div>

              {/* Avatar & Info */}
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2ecc71]/20 to-[#3498db]/20 flex items-center justify-center text-3xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-[#2c3e50]">{testimonial.name}</h4>
                  <p className="text-sm text-[#646464]">{testimonial.role}</p>
                  <p className="text-xs text-[#2ecc71]">📍 {testimonial.location}</p>
                </div>
              </div>

              {/* Stars */}
              <div className={`flex gap-1 mb-4 ${isRTL ? 'justify-end' : ''}`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <FiStar className="w-5 h-5 fill-[#f39c12] text-[#f39c12]" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#646464] leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-100">
                {Object.entries(testimonial.stats).map(([key, value], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-lg font-black text-[#2ecc71]">{value}</p>
                    <p className="text-[10px] text-gray-400 uppercase">{key}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-[#2c3e50] text-center mb-8">
            📊 {isRTL ? 'دراسة حالة تفصيلية' : 'Detailed Case Study'}
          </h3>
          
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="text-xl font-bold">{study.restaurant}</h4>
                  <p className="text-white/60">{study.type}</p>
                </div>
                <div className="px-4 py-2 bg-[#2ecc71] rounded-xl font-bold">
                  {isRTL ? 'نجاح موثق ✓' : 'Verified Success ✓'}
                </div>
              </div>

              {/* Before/After Grid */}
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="p-6 bg-red-50 border-r border-gray-100">
                  <h5 className={`text-lg font-bold text-red-500 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>❌</span> {isRTL ? 'قبل قوت' : 'Before Qoot'}
                  </h5>
                  <div className="space-y-4">
                    {[
                      { label: isRTL ? 'الإيرادات الشهرية' : 'Monthly Revenue', value: study.before.revenue, unit: ' EGP' },
                      { label: isRTL ? 'دورات الطاولة' : 'Table Turnover', value: study.before.turnover, unit: '/day' },
                      { label: isRTL ? 'أخطاء الطلبات' : 'Order Errors', value: study.before.errors, unit: '' },
                      { label: isRTL ? 'وقت الانتظار' : 'Wait Time', value: study.before.waitTime, unit: '' },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="font-bold text-red-500">{item.value}{item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* After */}
                <div className="p-6 bg-green-50">
                  <h5 className={`text-lg font-bold text-green-500 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>✓</span> {isRTL ? 'بعد قوت' : 'After Qoot'}
                  </h5>
                  <div className="space-y-4">
                    {[
                      { label: isRTL ? 'الإيرادات الشهرية' : 'Monthly Revenue', value: study.after.revenue, unit: ' EGP', improvement: '+32%' },
                      { label: isRTL ? 'دورات الطاولة' : 'Table Turnover', value: study.after.turnover, unit: '/day', improvement: '+50%' },
                      { label: isRTL ? 'أخطاء الطلبات' : 'Order Errors', value: study.after.errors, unit: '', improvement: '-87%' },
                      { label: isRTL ? 'وقت الانتظار' : 'Wait Time', value: study.after.waitTime, unit: '', improvement: '-52%' },
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="font-bold text-green-600">{item.value}{item.unit}</span>
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full font-bold">{item.improvement}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#646464] mb-6">
            {isRTL ? 'موثوق به من قبل المطاعم في جميع أنحاء مصر' : 'Trusted by restaurants across Egypt'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '50+', label: isRTL ? 'مطعم نشط' : 'Active Restaurants' },
              { value: '100K+', label: isRTL ? 'طلب شهرياً' : 'Orders/Month' },
              { value: '4.9/5', label: isRTL ? 'تقييم العملاء' : 'Customer Rating' },
              { value: '24/7', label: isRTL ? 'دعم فني' : 'Support' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-black text-[#2ecc71]">{stat.value}</p>
                <p className="text-sm text-[#646464]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

