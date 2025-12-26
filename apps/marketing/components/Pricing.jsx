import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiZap, FiStar, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { t, isRTL } = useLanguage();

  const pricingPlans = [
    {
      name: t('pricing.starter'),
      subtitle: t('pricing.starterTag'),
      description: t('pricing.starterDesc'),
      price: isRTL ? '٤٩٩ ج.م' : '499 EGP',
      period: isRTL ? '/شهرياً' : '/month',
      features: [
        t('pricing.features.qrCode'),
        t('pricing.features.menuManagement'),
        t('pricing.features.basicCustomization'),
        t('pricing.features.upTo50Items'),
        t('pricing.features.emailSupport'),
      ],
      cta: t('pricing.getStarted'),
      popular: false,
      icon: '🚀',
      color: '#3498db',
      mockupFeatures: ['menu', 'qr'],
    },
    {
      name: t('pricing.pro'),
      subtitle: t('pricing.proTag'),
      description: t('pricing.proDesc'),
      price: isRTL ? '٩٩٩ ج.م' : '999 EGP',
      period: isRTL ? '/شهرياً' : '/month',
      features: [
        t('pricing.features.everythingStarter'),
        t('pricing.features.smartOrdering'),
        t('pricing.features.tableSidePayments'),
        t('pricing.features.basicAnalytics'),
        t('pricing.features.unlimitedItems'),
        t('pricing.features.prioritySupport'),
        t('pricing.features.staffTraining'),
      ],
      cta: t('pricing.getStarted'),
      popular: true,
      icon: '⚡',
      color: '#2ecc71',
      mockupFeatures: ['menu', 'qr', 'payment', 'analytics'],
    },
    {
      name: t('pricing.enterprise'),
      subtitle: t('pricing.enterpriseTag'),
      description: t('pricing.enterpriseDesc'),
      price: isRTL ? '١,٩٩٩ ج.م' : '1,999 EGP',
      period: isRTL ? '/شهرياً' : '/month',
      features: [
        t('pricing.features.everythingPro'),
        t('pricing.features.arMenu'),
        t('pricing.features.aiRecommendations'),
        t('pricing.features.apiAccess'),
        t('pricing.features.advancedAnalytics'),
        t('pricing.features.multiLocation'),
        t('pricing.features.dedicatedManager'),
        t('pricing.features.customIntegrations'),
      ],
      cta: t('pricing.contactSales'),
      popular: false,
      icon: '👑',
      color: '#9b59b6',
      mockupFeatures: ['menu', 'qr', 'payment', 'analytics', 'ar', 'ai'],
    },
  ];

  // Feature Icons for mockup preview
  const featureIcons = {
    menu: { icon: '📱', label: isRTL ? 'قائمة' : 'Menu' },
    qr: { icon: '📷', label: 'QR' },
    payment: { icon: '💳', label: isRTL ? 'دفع' : 'Pay' },
    analytics: { icon: '📊', label: isRTL ? 'تحليل' : 'Analytics' },
    ar: { icon: '🥽', label: 'AR' },
    ai: { icon: '🤖', label: 'AI' },
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          className="absolute top-40 right-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-bold mb-6"
          >
            <FiStar className="w-5 h-5" />
            {t('pricing.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2c3e50] mb-6">
            {isRTL ? (
              <>اشتراك مرن <span className="text-[#2ecc71]">لكل مرحلة</span></>
            ) : (
              <>Flexible SaaS for <span className="text-[#2ecc71]">Every Stage</span></>
            )}
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            {t('pricing.description')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-3xl overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white' 
                  : 'bg-white border border-gray-100'
              } shadow-xl ${isRTL ? 'text-right' : ''}`}
              whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-1 left-1/2 -translate-x-1/2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={`px-6 py-2 bg-[#2ecc71] rounded-b-2xl text-white text-sm font-bold flex items-center gap-2 shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FiZap className="w-4 h-4" />
                    {t('pricing.mostPopular')}
                    <FiZap className="w-4 h-4" />
                  </div>
                </motion.div>
              )}

              {/* Feature Preview Mockup */}
              <div className={`p-6 ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`flex items-center justify-center gap-2 p-4 rounded-2xl mb-6 ${
                  plan.popular ? 'bg-white/10' : 'bg-gray-50'
                }`}>
                  {plan.mockupFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        plan.popular ? 'bg-white/20' : 'bg-white shadow-sm border border-gray-100'
                      }`}
                    >
                      <span className="text-lg">{featureIcons[feature].icon}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <span className="text-4xl mb-2 block">{plan.icon}</span>
                  <h3 className={`text-2xl font-black mb-1 ${
                    plan.popular ? 'text-white' : 'text-[#2c3e50]'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${
                    plan.popular ? 'text-white/60' : 'text-[#646464]'
                  }`}>
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <motion.div 
                    className={`text-4xl font-black ${
                      plan.popular ? 'text-[#2ecc71]' : 'text-[#2c3e50]'
                    }`}
                    animate={hoveredPlan === index ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.price}
                  </motion.div>
                  {plan.period && (
                    <div className={`text-sm ${
                      plan.popular ? 'text-white/60' : 'text-[#646464]'
                    }`}>
                      {plan.period}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className={`text-center text-sm mb-6 ${
                  plan.popular ? 'text-white/70' : 'text-[#646464]'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className={`px-6 pb-6 ${plan.popular ? 'border-t border-white/10 pt-6' : 'border-t border-gray-100 pt-6'}`}>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-[#2ecc71]/20' : 'bg-[#2ecc71]/10'
                      }`}>
                        <FiCheck className="w-3 h-3 text-[#2ecc71]" />
                      </div>
                      <span className={`text-sm ${
                        plan.popular ? 'text-white/80' : 'text-[#646464]'
                      }`}>
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  onClick={scrollToContact}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-[#2ecc71] text-white hover:bg-[#27ae60] shadow-lg shadow-[#2ecc71]/30'
                      : 'bg-[#2c3e50] text-white hover:bg-[#34495e]'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                  <FiArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>

              {/* Hover Glow */}
              <AnimatePresence>
                {hoveredPlan === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 2px ${plan.color}40`,
                      borderRadius: '1.5rem',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-[#2c3e50] text-center mb-8">
            {isRTL ? '📊 مقارنة المميزات' : '📊 Feature Comparison'}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`py-4 px-4 text-sm font-bold text-[#2c3e50] ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الميزة' : 'Feature'}
                  </th>
                  {pricingPlans.map((plan, i) => (
                    <th key={i} className="py-4 px-4 text-center">
                      <span className="text-2xl">{plan.icon}</span>
                      <p className="text-sm font-bold text-[#2c3e50] mt-1">{plan.name}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: isRTL ? 'قائمة رقمية QR' : 'Digital QR Menu', starter: true, pro: true, enterprise: true },
                  { feature: isRTL ? 'الطلب الذكي' : 'Smart Ordering', starter: false, pro: true, enterprise: true },
                  { feature: isRTL ? 'الدفع على الطاولة' : 'Table-Side Payment', starter: false, pro: true, enterprise: true },
                  { feature: isRTL ? 'تقسيم الفاتورة' : 'Split Bill', starter: false, pro: true, enterprise: true },
                  { feature: isRTL ? 'تحليلات أساسية' : 'Basic Analytics', starter: false, pro: true, enterprise: true },
                  { feature: isRTL ? 'تحليلات متقدمة' : 'Advanced Analytics', starter: false, pro: false, enterprise: true },
                  { feature: isRTL ? 'قائمة AR' : 'AR Menu', starter: false, pro: false, enterprise: true },
                  { feature: isRTL ? 'توصيات AI' : 'AI Recommendations', starter: false, pro: false, enterprise: true },
                  { feature: isRTL ? 'تكاملات مخصصة' : 'Custom Integrations', starter: false, pro: false, enterprise: true },
                  { feature: isRTL ? 'مواقع متعددة' : 'Multi-Location', starter: false, pro: false, enterprise: true },
                ].map((row, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className={`py-3 px-4 text-sm text-[#646464] ${isRTL ? 'text-right' : 'text-left'}`}>{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.starter ? (
                        <span className="text-[#2ecc71] text-xl">✓</span>
                      ) : (
                        <span className="text-gray-300 text-xl">−</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center bg-[#2ecc71]/5">
                      {row.pro ? (
                        <span className="text-[#2ecc71] text-xl">✓</span>
                      ) : (
                        <span className="text-gray-300 text-xl">−</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.enterprise ? (
                        <span className="text-[#2ecc71] text-xl">✓</span>
                      ) : (
                        <span className="text-gray-300 text-xl">−</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="text-[#646464]">
              {t('pricing.needCustom')}{' '}
              <button 
                onClick={scrollToContact}
                className="text-[#2ecc71] font-bold hover:underline"
              >
                {t('pricing.contactForPricing')}
              </button>
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="flex items-center gap-2 text-sm text-[#646464]">
                <span className="text-xl">🔒</span> {isRTL ? 'بدون رسوم خفية' : 'No hidden fees'}
              </span>
              <span className="flex items-center gap-2 text-sm text-[#646464]">
                <span className="text-xl">⚡</span> {isRTL ? 'إعداد في ٢٤ ساعة' : '24h setup'}
              </span>
              <span className="flex items-center gap-2 text-sm text-[#646464]">
                <span className="text-xl">🎯</span> {isRTL ? 'إلغاء في أي وقت' : 'Cancel anytime'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
