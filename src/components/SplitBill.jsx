import { motion } from 'framer-motion';
import { FiUsers, FiCreditCard, FiSmartphone, FiCheck, FiZap } from 'react-icons/fi';
import { HiOutlineQrcode } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';

export default function SplitBill() {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      icon: HiOutlineQrcode,
      step: isRTL ? '١' : '1',
      title: t('splitBill.step1Title'),
      description: t('splitBill.step1Desc'),
    },
    {
      icon: FiCheck,
      step: isRTL ? '٢' : '2',
      title: t('splitBill.step2Title'),
      description: t('splitBill.step2Desc'),
    },
    {
      icon: FiCreditCard,
      step: isRTL ? '٣' : '3',
      title: t('splitBill.step3Title'),
      description: t('splitBill.step3Desc'),
    },
  ];

  const paymentMethods = [
    { name: 'NFC Tap', icon: '📱' },
    { name: 'QR Code', icon: '📷' },
    { name: 'Apple Pay', icon: '🍎' },
    { name: 'Google Pay', icon: '💳' },
    { name: 'InstaPay', icon: '⚡' },
    { name: 'Fawry', icon: '🏪' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-32 right-20 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💳
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-6xl opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        📱
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold mb-6"
          >
            <FiZap className="w-5 h-5 text-yellow-300" />
            {t('splitBill.badge')}
            <FiZap className="w-5 h-5 text-yellow-300" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>
                <span className="text-yellow-300">{t('splitBill.titleHighlight')}</span>
                <br />
                {t('splitBill.titleRest')}
              </>
            ) : (
              <>
                <span className="text-yellow-300">{t('splitBill.titleHighlight')}</span>
                <br />
                {t('splitBill.titleRest')}
              </>
            )}
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('splitBill.description')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          
          {/* Left: How It Works */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? 'lg:col-start-2' : ''}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className={`text-2xl font-bold text-white mb-8 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FiUsers className="w-8 h-8 text-yellow-300" />
                {t('splitBill.howItWorks')}
              </h3>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                      <span className="text-2xl font-black text-purple-900">{step.step}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        <step.icon className={`w-5 h-5 text-yellow-300 ${isRTL ? 'order-2' : ''}`} />
                        {step.title}
                      </h4>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={isRTL ? 'lg:col-start-1' : ''}
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-xs">
              <motion.div
                className="bg-white rounded-[3rem] p-4 shadow-2xl"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Phone Screen */}
                <div className="bg-gray-100 rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-[#2c3e50] text-white text-xs p-3 text-center font-medium">
                    {t('splitBill.selectItems')}
                  </div>

                  {/* Receipt Items */}
                  <div className="p-4 space-y-3 bg-white">
                    <div className={`flex items-center justify-between p-3 rounded-xl bg-green-50 border-2 border-green-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800">🍔 Burger</span>
                      </div>
                      <span className="font-bold text-green-600">120 EGP</span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-xl bg-green-50 border-2 border-green-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800">🍟 Fries</span>
                      </div>
                      <span className="font-bold text-green-600">45 EGP</span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 border-2 border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                        <span className="font-medium text-gray-400">🥗 Salad</span>
                      </div>
                      <span className="font-medium text-gray-400">85 EGP</span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 border-2 border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                        <span className="font-medium text-gray-400">🥤 Cola</span>
                      </div>
                      <span className="font-medium text-gray-400">25 EGP</span>
                    </div>
                  </div>

                  {/* Total & Pay */}
                  <div className="bg-[#2ecc71] p-4 text-center">
                    <p className="text-white/80 text-sm mb-1">{t('splitBill.yourTotal')}</p>
                    <p className="text-3xl font-black text-white mb-3">165 EGP</p>
                    <div className={`flex gap-2 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium flex items-center gap-2">
                        <HiOutlineQrcode className="w-4 h-4" />
                        QR
                      </div>
                      <div className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium flex items-center gap-2">
                        <FiSmartphone className="w-4 h-4" />
                        NFC
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Friend Avatars */}
              <motion.div
                className={`absolute -bottom-8 ${isRTL ? '-right-8' : '-left-8'} flex -space-x-3`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center text-white font-bold shadow-lg">A</div>
                <div className="w-12 h-12 rounded-full bg-pink-500 border-4 border-white flex items-center justify-center text-white font-bold shadow-lg">S</div>
                <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-white flex items-center justify-center text-white font-bold shadow-lg">M</div>
              </motion.div>

              {/* Success Badge */}
              <motion.div
                className={`absolute -top-4 ${isRTL ? '-left-4' : '-right-4'} px-4 py-2 bg-white rounded-full shadow-xl flex items-center gap-2`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <span className="text-green-500 font-bold">{t('splitBill.noFight')}</span>
                <span className="text-xl">🎉</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-white/60 text-sm mb-6">{t('splitBill.payWith')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium flex items-center gap-2 border border-white/20"
              >
                <span className="text-xl">{method.icon}</span>
                {method.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 bg-yellow-400 text-purple-900 rounded-2xl font-black text-lg shadow-2xl shadow-yellow-400/30 hover:bg-yellow-300 transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 60px rgba(250, 204, 21, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('splitBill.cta')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

