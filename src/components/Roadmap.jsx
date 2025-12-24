import { motion } from 'framer-motion';
import { FiMapPin, FiPackage, FiCpu, FiSun, FiCheck, FiTarget, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Roadmap() {
  const { t, isRTL } = useLanguage();

  const milestones = [
    {
      quarter: t('roadmap.q1'),
      icon: FiMapPin,
      title: t('roadmap.q1Title'),
      description: t('roadmap.q1Desc'),
      status: 'current',
      locations: [t('roadmap.newCairo'), t('roadmap.madinaty')],
      features: isRTL 
        ? ['قوائم QR رقمية', 'الطلب الذكي', 'الدفع على الطاولة', 'تقسيم الفاتورة']
        : ['Digital QR Menus', 'Smart Ordering', 'Table-Side Payments', 'Split Bill Feature'],
      target: isRTL ? '٥٠+ مطعم' : '50+ Restaurants',
      color: '#2ecc71',
    },
    {
      quarter: t('roadmap.q2'),
      icon: FiPackage,
      title: t('roadmap.q2Title'),
      description: t('roadmap.q2Desc'),
      status: 'upcoming',
      locations: [],
      features: isRTL
        ? ['تتبع المخزون الحي', 'ربط الموردين', 'تنبيهات المخزون المنخفض', 'تحسين التكلفة']
        : ['Real-time Stock Tracking', 'Supplier Connections', 'Low Stock Alerts', 'Cost Optimization'],
      target: isRTL ? '١٠٠+ مطعم' : '100+ Restaurants',
      color: '#3498db',
    },
    {
      quarter: t('roadmap.q3'),
      icon: FiCpu,
      title: t('roadmap.q3Title'),
      description: t('roadmap.q3Desc'),
      status: 'upcoming',
      locations: [],
      features: isRTL
        ? ['توصيات مخصصة', 'تنبؤ الطلب', 'التسعير الديناميكي', 'رؤى سلوك العملاء']
        : ['Personalized Recommendations', 'Demand Prediction', 'Dynamic Pricing', 'Customer Behavior Insights'],
      target: isRTL ? '٢٠٠+ مطعم' : '200+ Restaurants',
      color: '#9b59b6',
    },
    {
      quarter: t('roadmap.q4'),
      icon: FiSun,
      title: t('roadmap.q4Title'),
      description: t('roadmap.q4Desc'),
      status: 'upcoming',
      locations: [t('roadmap.sahel'), t('roadmap.gouna')],
      features: isRTL
        ? ['الساحل الشمالي', 'الجونة', 'شرم الشيخ', 'الإسكندرية']
        : ['North Coast (Sahel)', 'El Gouna', 'Sharm El Sheikh', 'Alexandria'],
      target: isRTL ? '٥٠٠+ مطعم' : '500+ Restaurants',
      color: '#f39c12',
    },
  ];

  const stats = [
    { value: '2025', label: isRTL ? 'سنة الإطلاق' : 'Launch Year', icon: '🚀' },
    { value: '4', label: isRTL ? 'مراحل رئيسية' : 'Key Phases', icon: '📍' },
    { value: '500+', label: isRTL ? 'مطعم مستهدف' : 'Target Restaurants', icon: '🍽️' },
    { value: '∞', label: isRTL ? 'إمكانيات النمو' : 'Growth Potential', icon: '📈' },
  ];

  return (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-[#1a252f] to-[#2c3e50] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9b59b6]/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-bold mb-6"
          >
            <FiTarget className="w-5 h-5 text-[#2ecc71]" />
            {t('roadmap.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>نبني <span className="text-[#2ecc71]">للمستقبل</span></>
            ) : (
              <>Building for the <span className="text-[#2ecc71]">Future</span></>
            )}
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {t('roadmap.description')}
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-[#2ecc71]">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex justify-between mb-4">
            {milestones.map((m, i) => (
              <div key={i} className={`text-center flex-1 ${i > 0 ? 'border-l border-white/10' : ''}`}>
                <span className={`text-sm font-bold ${m.status === 'current' ? 'text-[#2ecc71]' : 'text-white/40'}`}>
                  {m.quarter}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '25%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-full relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-[#2ecc71]/50" />
            </motion.div>
          </div>
        </motion.div>

        {/* Milestone Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className={`h-full p-8 rounded-3xl border transition-all duration-300 ${
                  milestone.status === 'current'
                    ? 'bg-gradient-to-br from-[#2ecc71] to-[#27ae60] border-[#2ecc71]/50 shadow-2xl shadow-[#2ecc71]/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Header */}
                <div className={`flex items-start justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <span 
                      className={`inline-block px-4 py-2 rounded-full text-sm font-black mb-3 ${
                        milestone.status === 'current'
                          ? 'bg-white/20 text-white'
                          : 'text-white'
                      }`}
                      style={{ backgroundColor: milestone.status !== 'current' ? `${milestone.color}20` : undefined, color: milestone.status !== 'current' ? milestone.color : undefined }}
                    >
                      {milestone.quarter}
                    </span>
                    <h3 className={`text-2xl font-bold ${milestone.status === 'current' ? 'text-white' : 'text-white'}`}>
                      {milestone.title}
                    </h3>
                  </div>
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      milestone.status === 'current' ? 'bg-white/20' : ''
                    }`}
                    style={{ backgroundColor: milestone.status !== 'current' ? `${milestone.color}20` : undefined }}
                  >
                    <milestone.icon className={`w-7 h-7 ${milestone.status === 'current' ? 'text-white' : ''}`} style={{ color: milestone.status !== 'current' ? milestone.color : undefined }} />
                  </div>
                </div>

                {/* Description */}
                <p className={`text-lg mb-6 ${milestone.status === 'current' ? 'text-white/90' : 'text-white/60'}`}>
                  {milestone.description}
                </p>

                {/* Features List */}
                <div className={`grid grid-cols-2 gap-3 mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {milestone.features.map((feature, fIndex) => (
                    <div 
                      key={fIndex}
                      className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <FiCheck className={`w-4 h-4 flex-shrink-0 ${milestone.status === 'current' ? 'text-white' : 'text-[#2ecc71]'}`} />
                      <span className={`text-sm ${milestone.status === 'current' ? 'text-white/80' : 'text-white/50'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className={`flex items-center justify-between pt-6 border-t ${milestone.status === 'current' ? 'border-white/20' : 'border-white/10'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Target */}
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FiTrendingUp className={`w-5 h-5 ${milestone.status === 'current' ? 'text-white' : 'text-[#2ecc71]'}`} />
                    <span className={`font-bold ${milestone.status === 'current' ? 'text-white' : 'text-white/70'}`}>
                      {milestone.target}
                    </span>
                  </div>

                  {/* Locations */}
                  {milestone.locations.length > 0 && (
                    <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {milestone.locations.map((loc, lIndex) => (
                        <span 
                          key={lIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''} ${
                            milestone.status === 'current'
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          <FiMapPin className="w-3 h-3" />
                          {loc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Status */}
                  {milestone.status === 'current' && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-xs text-white/80 font-medium">{t('roadmap.currentlyActive')}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2ecc71]/20 mb-6">
            <FiGlobe className="w-10 h-10 text-[#2ecc71]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            {isRTL ? 'رؤيتنا لعام 2026' : 'Our 2026 Vision'}
          </h3>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {isRTL 
              ? 'تحويل كل مطعم في مصر إلى تجربة طعام ذكية. من القاهرة إلى الساحل، من الإسكندرية إلى أسوان.'
              : 'Transform every restaurant in Egypt into a smart dining experience. From Cairo to the Coast, from Alexandria to Aswan.'}
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/40 text-lg mb-6">
            {t('roadmap.bePartOf')}
          </p>
          <motion.button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 bg-[#2ecc71] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(46, 204, 113, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('roadmap.joinEarly')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
