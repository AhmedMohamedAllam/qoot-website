import { motion } from 'framer-motion';
import { FiGlobe, FiCreditCard, FiMessageCircle, FiShield } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function Localization() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: FiGlobe,
      title: t('localization.bilingual'),
      description: t('localization.bilingualDesc'),
      highlight: t('localization.bilingualTag'),
    },
    {
      icon: FiCreditCard,
      title: t('localization.payment'),
      description: t('localization.paymentDesc'),
      highlight: t('localization.paymentTag'),
    },
    {
      icon: FiMessageCircle,
      title: t('localization.whatsapp'),
      description: t('localization.whatsappDesc'),
      highlight: t('localization.whatsappTag'),
    },
    {
      icon: FiShield,
      title: t('localization.compliance'),
      description: t('localization.complianceDesc'),
      highlight: t('localization.complianceTag'),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#1a252f] to-[#2c3e50] relative overflow-hidden">
      {/* Background Decoration - Egypt Themed */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-3xl" />
        
        {/* Subtle Pyramid Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <polygon fill="white" points="0,120 200,20 400,120" />
            <polygon fill="white" points="350,120 500,40 650,120" />
            <polygon fill="white" points="600,120 800,30 1000,120" />
            <polygon fill="white" points="950,120 1100,50 1200,120" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? 'lg:col-start-2 text-right' : ''}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#c8a961]/20 text-[#c8a961] text-sm font-medium mb-4">
              {t('localization.badge')}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {isRTL ? (
                <>مُعد <span className="text-[#c8a961]">للسوق المصري</span></>
              ) : (
                <>Localized for the <span className="text-[#c8a961]">Egyptian Market</span></>
              )}
            </h2>
            <p className="text-lg text-white/60 mb-8">
              {t('localization.description')}
            </p>

            {/* Egypt Flag Colors Bar */}
            <div className={`flex gap-1 mb-8 ${isRTL ? 'justify-end' : ''}`}>
              <div className={`h-2 w-16 bg-[#c8102e] ${isRTL ? 'rounded-r-full' : 'rounded-l-full'}`} />
              <div className="h-2 w-16 bg-white" />
              <div className={`h-2 w-16 bg-black ${isRTL ? 'rounded-l-full' : 'rounded-r-full'}`} />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${isRTL ? 'text-right' : ''}`}>
                <div className="text-3xl font-bold text-[#2ecc71] mb-1">100%</div>
                <div className="text-sm text-white/60">{t('localization.arabicSupport')}</div>
              </div>
              <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${isRTL ? 'text-right' : ''}`}>
                <div className="text-3xl font-bold text-[#2ecc71] mb-1">5+</div>
                <div className="text-sm text-white/60">{t('localization.paymentMethods')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRTL ? 'lg:col-start-1' : ''}`}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group ${isRTL ? 'text-right' : ''}`}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-[#2ecc71]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                  <feature.icon className="w-6 h-6 text-[#2ecc71]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 mb-4">
                  {feature.description}
                </p>

                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-medium">
                  {feature.highlight}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Partnership Logos (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-white/40 text-sm mb-8">{t('localization.integratedWith')}</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              isRTL ? 'إنستاباي' : 'InstaPay', 
              isRTL ? 'فوري' : 'Fawry', 
              'Visa', 
              'Mastercard', 
              'Apple Pay'
            ].map((provider, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-lg bg-white/5 text-white/60 font-medium"
              >
                {provider}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
