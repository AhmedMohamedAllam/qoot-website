import { motion } from 'framer-motion';
import { FiCamera, FiShoppingCart, FiCoffee, FiCreditCard, FiPieChart } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Solution() {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      number: isRTL ? '٠١' : '01',
      icon: FiCamera,
      title: t('solution.scan'),
      description: t('solution.scanDesc'),
    },
    {
      number: isRTL ? '٠٢' : '02',
      icon: FiShoppingCart,
      title: t('solution.order'),
      description: t('solution.orderDesc'),
    },
    {
      number: isRTL ? '٠٣' : '03',
      icon: FiCoffee,
      title: t('solution.enjoy'),
      description: t('solution.enjoyDesc'),
    },
    {
      number: isRTL ? '٠٤' : '04',
      icon: FiCreditCard,
      title: t('solution.pay'),
      description: t('solution.payDesc'),
    },
    {
      number: isRTL ? '٠٥' : '05',
      icon: FiPieChart,
      title: t('solution.analyze'),
      description: t('solution.analyzeDesc'),
    },
  ];

  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-50">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2ecc71]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-medium mb-4">
            {t('solution.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
            {isRTL ? (
              <>نظام <span className="text-[#2ecc71]">قوت</span> المتكامل</>
            ) : (
              <>The <span className="text-[#2ecc71]">Qoot</span> Ecosystem</>
            )}
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            {t('solution.description')}
          </p>
        </motion.div>

        {/* Steps Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className={`absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r ${isRTL ? 'from-transparent via-[#2ecc71] to-transparent' : 'from-transparent via-[#2ecc71] to-transparent'}`} />
          
          <div className={`grid grid-cols-5 gap-4 ${isRTL ? 'direction-rtl' : ''}`}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="group text-center">
                  {/* Icon Circle */}
                  <motion.div
                    className="relative mx-auto w-20 h-20 rounded-full bg-white border-4 border-[#2ecc71] shadow-lg shadow-[#2ecc71]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-8 h-8 text-[#2ecc71]" />
                    {/* Step Number */}
                    <div className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-7 h-7 rounded-full bg-[#2c3e50] text-white text-xs font-bold flex items-center justify-center`}>
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#646464] leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className={`absolute top-24 ${isRTL ? '-left-2' : '-right-2'} text-[#2ecc71] text-2xl hidden lg:block`}>
                    {isRTL ? '←' : '→'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps Timeline - Mobile/Tablet */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className={`absolute ${isRTL ? 'right-10' : 'left-10'} top-20 w-0.5 h-full bg-[#2ecc71]/30`} />
              )}

              {/* Icon Circle */}
              <div className="relative flex-shrink-0 w-20 h-20 rounded-full bg-white border-4 border-[#2ecc71] shadow-lg shadow-[#2ecc71]/20 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-[#2ecc71]" />
                <div className={`absolute -top-2 ${isRTL ? '-right-2' : '-left-2'} w-7 h-7 rounded-full bg-[#2c3e50] text-white text-xs font-bold flex items-center justify-center`}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="pt-2 flex-1">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#646464] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 rounded-2xl bg-[#2c3e50] text-white text-center"
        >
          <p className="text-xl font-light mb-2">
            {t('solution.fromSeated')}
          </p>
          <p className="text-4xl font-bold text-[#2ecc71]">
            {t('solution.simpleSteps')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
