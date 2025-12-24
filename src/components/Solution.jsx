import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiShoppingCart, FiCoffee, FiCreditCard, FiPieChart, FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import { HiOutlineQrcode } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';

export default function Solution() {
  const { t, isRTL } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: isRTL ? '٠١' : '01',
      icon: FiCamera,
      title: t('solution.scan'),
      description: t('solution.scanDesc'),
      color: '#2ecc71',
      mockup: 'scan',
    },
    {
      number: isRTL ? '٠٢' : '02',
      icon: FiShoppingCart,
      title: t('solution.order'),
      description: t('solution.orderDesc'),
      color: '#3498db',
      mockup: 'order',
    },
    {
      number: isRTL ? '٠٣' : '03',
      icon: FiCoffee,
      title: t('solution.enjoy'),
      description: t('solution.enjoyDesc'),
      color: '#f39c12',
      mockup: 'kitchen',
    },
    {
      number: isRTL ? '٠٤' : '04',
      icon: FiCreditCard,
      title: t('solution.pay'),
      description: t('solution.payDesc'),
      color: '#9b59b6',
      mockup: 'pay',
    },
    {
      number: isRTL ? '٠٥' : '05',
      icon: FiPieChart,
      title: t('solution.analyze'),
      description: t('solution.analyzeDesc'),
      color: '#e74c3c',
      mockup: 'analytics',
    },
  ];

  // Phone Mockup for Scanning
  const ScanMockup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl max-w-[220px] mx-auto">
        {/* Notch - centered using flex */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-20" style={{ direction: 'ltr' }}>
          <div className="w-24 h-6 bg-[#1a1a1a] rounded-b-2xl flex justify-center items-center pt-2">
            <div className="w-12 h-2 bg-[#0a0a0a] rounded-full" />
          </div>
        </div>
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] overflow-hidden h-[380px]">
          {/* Camera View */}
          <div className="relative h-full flex items-center justify-center p-6">
            {/* QR Frame */}
            <motion.div
              className="w-40 h-40 border-4 border-[#2ecc71] rounded-2xl relative"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Scanning Line */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-[#2ecc71] rounded-full shadow-lg shadow-[#2ecc71]/50"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* QR Pattern */}
              <div className="absolute inset-3 grid grid-cols-7 gap-1 opacity-60">
                {[...Array(49)].map((_, i) => (
                  <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'} rounded-sm`} />
                ))}
              </div>
            </motion.div>
            
            {/* Corner Markers */}
            <div className="absolute top-8 left-8 w-8 h-8 border-l-3 border-t-3 border-white/40 rounded-tl-xl" />
            <div className="absolute top-8 right-8 w-8 h-8 border-r-3 border-t-3 border-white/40 rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-l-3 border-b-3 border-white/40 rounded-bl-xl" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-r-3 border-b-3 border-white/40 rounded-br-xl" />
            
            {/* Instruction */}
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <p className="text-white/80 text-sm font-medium">{isRTL ? 'ضع الكود في الإطار' : 'Point at QR Code'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Badge */}
      <motion.div
        className="absolute -top-3 -right-3 z-30 px-3 py-2 bg-[#2ecc71] rounded-xl shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-white font-bold text-sm">📱 {isRTL ? 'فوري!' : 'Instant!'}</span>
      </motion.div>
    </motion.div>
  );

  // Phone Mockup for Ordering
  const OrderMockup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl max-w-[220px] mx-auto">
        {/* Notch - centered using flex */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-20" style={{ direction: 'ltr' }}>
          <div className="w-24 h-6 bg-[#1a1a1a] rounded-b-2xl flex justify-center items-center pt-2">
            <div className="w-12 h-2 bg-[#0a0a0a] rounded-full" />
          </div>
        </div>
        <div className="bg-white rounded-[2rem] overflow-hidden h-[380px]">
          {/* Header */}
          <div className="bg-[#2c3e50] text-white p-3 text-center">
            <p className="font-bold">{isRTL ? '🍽️ القائمة الذكية' : '🍽️ Smart Menu'}</p>
          </div>
          
          {/* Menu Items */}
          <div className="p-3 space-y-2 overflow-auto h-[280px]">
            {[
              { name: isRTL ? 'برجر كلاسيك' : 'Classic Burger', price: '120', emoji: '🍔', selected: true },
              { name: isRTL ? 'بطاطس مقرمشة' : 'Crispy Fries', price: '45', emoji: '🍟', selected: true },
              { name: isRTL ? 'كولا باردة' : 'Cold Cola', price: '25', emoji: '🥤', selected: false },
              { name: isRTL ? 'سلطة سيزر' : 'Caesar Salad', price: '85', emoji: '🥗', selected: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center justify-between p-2 rounded-xl border-2 transition-all ${
                  item.selected 
                    ? 'bg-[#2ecc71]/10 border-[#2ecc71]' 
                    : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-[#2ecc71] font-bold">{item.price} EGP</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {item.selected ? (
                    <>
                      <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiMinus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">1</span>
                      <button className="w-6 h-6 rounded-full bg-[#2ecc71] flex items-center justify-center">
                        <FiPlus className="w-3 h-3 text-white" />
                      </button>
                    </>
                  ) : (
                    <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiPlus className="w-3 h-3 text-gray-600" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Customization */}
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-600 font-medium">✏️ {isRTL ? 'تخصيص:' : 'Customization:'}</p>
              <p className="text-xs text-gray-600">{isRTL ? 'بدون بصل ✓' : 'No onions ✓'}</p>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#2ecc71] p-3 rounded-t-2xl">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-xs opacity-80">{isRTL ? 'المجموع' : 'Total'}</p>
                <p className="text-lg font-black">165 EGP</p>
              </div>
              <button className="px-4 py-2 bg-white text-[#2ecc71] rounded-xl font-bold text-sm">
                {isRTL ? 'أكد الطلب' : 'Confirm'} →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast */}
      <motion.div
        className="absolute -bottom-4 -left-4 px-3 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm">🛒 2 {isRTL ? 'أصناف' : 'items'}</span>
      </motion.div>
    </motion.div>
  );

  // Kitchen Display Mockup
  const KitchenMockup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="bg-[#0a0a0a] rounded-xl p-2 shadow-2xl max-w-[320px] mx-auto">
        <div className="bg-[#1a252f] rounded-lg overflow-hidden">
          {/* KDS Header */}
          <div className="bg-[#2c3e50] text-white p-2 flex items-center justify-between">
            <span className="font-bold text-sm">🍳 {isRTL ? 'شاشة المطبخ' : 'Kitchen Display'}</span>
            <span className="text-[#2ecc71] text-xs">● LIVE</span>
          </div>
          
          {/* Orders */}
          <div className="p-3 grid grid-cols-2 gap-2">
            {/* Order 1 - In Progress */}
            <motion.div
              className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40"
              animate={{ borderColor: ['rgba(245,158,11,0.4)', 'rgba(245,158,11,0.8)', 'rgba(245,158,11,0.4)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold text-xs">#{isRTL ? '٧' : '7'}</span>
                <span className="text-yellow-400 text-[10px]">⏱ 3:45</span>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-[10px]">🍔 Burger x1</p>
                <p className="text-white/80 text-[10px]">🍟 Fries x1</p>
              </div>
              <div className="mt-2 text-center">
                <span className="px-2 py-1 bg-yellow-500 rounded text-[10px] font-bold text-black">{isRTL ? 'قيد التحضير' : 'COOKING'}</span>
              </div>
            </motion.div>
            
            {/* Order 2 - Ready */}
            <motion.div
              className="p-2 rounded-lg bg-green-500/20 border border-green-500/40"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold text-xs">#{isRTL ? '٦' : '6'}</span>
                <span className="text-green-400 text-[10px]">✓ {isRTL ? 'جاهز' : 'Ready'}</span>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-[10px]">🥗 Salad x1</p>
                <p className="text-white/80 text-[10px]">🥤 Cola x2</p>
              </div>
              <div className="mt-2 text-center">
                <span className="px-2 py-1 bg-green-500 rounded text-[10px] font-bold text-white">{isRTL ? 'جاهز!' : 'READY!'}</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Power LED */}
        <div className="flex justify-center mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Chef Badge */}
      <motion.div
        className="absolute -top-3 -right-3 text-4xl"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        👨‍🍳
      </motion.div>
    </motion.div>
  );

  // Payment Mockup
  const PayMockup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl max-w-[220px] mx-auto">
        {/* Notch - centered using flex */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-20" style={{ direction: 'ltr' }}>
          <div className="w-24 h-6 bg-[#1a1a1a] rounded-b-2xl flex justify-center items-center pt-2">
            <div className="w-12 h-2 bg-[#0a0a0a] rounded-full" />
          </div>
        </div>
        <div className="bg-white rounded-[2rem] overflow-hidden h-[380px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white p-4 text-center">
            <p className="text-sm opacity-80">{isRTL ? 'الإجمالي' : 'Total Amount'}</p>
            <p className="text-3xl font-black">165 EGP</p>
          </div>
          
          {/* Payment Options */}
          <div className="p-4 space-y-3">
            <p className="text-center text-gray-500 text-xs mb-3">{isRTL ? 'اختر طريقة الدفع' : 'Choose Payment Method'}</p>
            
            {[
              { icon: '📱', name: 'Apple Pay', color: '#000' },
              { icon: '💳', name: 'NFC Tap', color: '#2ecc71' },
              { icon: '📷', name: 'QR Code', color: '#3498db' },
              { icon: '⚡', name: 'InstaPay', color: '#f39c12' },
            ].map((method, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-[#9b59b6]/30 hover:bg-[#9b59b6]/5 transition-all"
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium text-gray-800">{method.name}</span>
              </motion.button>
            ))}
          </div>
          
          {/* NFC Animation */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-[#9b59b6]/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
      
      {/* Success Badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 px-4 py-2 bg-[#2ecc71] rounded-xl shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-white font-bold text-sm flex items-center gap-1">
          <FiCheck className="w-4 h-4" /> {isRTL ? 'تم الدفع!' : 'Paid!'}
        </span>
      </motion.div>
    </motion.div>
  );

  // Analytics Dashboard Mockup
  const AnalyticsMockup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="bg-[#1a1a1a] rounded-t-xl p-2 shadow-2xl max-w-[320px] mx-auto">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-[#2c3e50] text-white p-2 flex items-center justify-between">
            <span className="font-bold text-sm">📊 {isRTL ? 'التحليلات' : 'Analytics'}</span>
            <span className="text-[#2ecc71] text-xs">{isRTL ? 'اليوم' : 'Today'}</span>
          </div>
          
          {/* Stats */}
          <div className="p-3 grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-[#2ecc71]/10">
              <p className="text-[10px] text-gray-500">{isRTL ? 'الإيرادات' : 'Revenue'}</p>
              <p className="text-lg font-black text-[#2ecc71]">12,450</p>
              <span className="text-[10px] text-[#2ecc71]">↑ 23%</span>
            </div>
            <div className="p-2 rounded-lg bg-[#3498db]/10">
              <p className="text-[10px] text-gray-500">{isRTL ? 'الطلبات' : 'Orders'}</p>
              <p className="text-lg font-black text-[#3498db]">156</p>
              <span className="text-[10px] text-[#3498db]">↑ 18%</span>
            </div>
          </div>
          
          {/* Mini Chart */}
          <div className="px-3 pb-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <p className="text-[10px] text-gray-500 mb-2">{isRTL ? 'المبيعات بالساعة' : 'Hourly Sales'}</p>
              <div className="flex items-end justify-between gap-1 h-16">
                {[30, 50, 40, 70, 55, 85, 65, 90, 75, 95, 80, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#e74c3c] to-[#e74c3c]/60 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stand */}
      <div className="flex justify-center">
        <div className="w-16 h-6 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-2 bg-[#1a1a1a] rounded-full" />
      </div>
      
      {/* Insight Badge */}
      <motion.div
        className="absolute -top-3 -left-3 px-3 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm font-bold text-[#e74c3c]">💡 {isRTL ? 'ذروة: ٧م' : 'Peak: 7PM'}</span>
      </motion.div>
    </motion.div>
  );

  const mockups = {
    scan: <ScanMockup />,
    order: <OrderMockup />,
    kitchen: <KitchenMockup />,
    pay: <PayMockup />,
    analytics: <AnalyticsMockup />,
  };

  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-50">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2ecc71]/10 rounded-full blur-3xl" />
      </div>
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
            {t('solution.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2c3e50] mb-6">
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

        {/* Interactive Journey */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left: Steps Navigator */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:col-start-2' : ''}
          >
            <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                  onClick={() => setActiveStep(index)}
                  className={`relative cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-white shadow-xl border-2' 
                      : 'bg-gray-50 hover:bg-white hover:shadow-lg border-2 border-transparent'
                  }`}
                  style={{
                    borderColor: activeStep === index ? step.color : 'transparent',
                  }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number & Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: activeStep === index ? step.color : `${step.color}20`,
                      }}
                    >
                      <step.icon 
                        className={`w-7 h-7 ${activeStep === index ? 'text-white' : ''}`}
                        style={{ color: activeStep === index ? 'white' : step.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-sm font-bold"
                          style={{ color: step.color }}
                        >
                          {step.number}
                        </span>
                        <h3 className="text-lg font-bold text-[#2c3e50]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[#646464]">{step.description}</p>
                </div>

                    {/* Active Indicator */}
                    {activeStep === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                    )}
                  </div>

                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute top-20 w-0.5 h-8"
                      style={{ 
                        backgroundColor: index < activeStep ? step.color : '#e5e7eb',
                        [isRTL ? 'right' : 'left']: '2.75rem',
                      }}
                    />
                )}
              </motion.div>
            ))}
          </div>
          </motion.div>

          {/* Right: Device Mockup */}
            <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            className={`relative ${isRTL ? 'lg:col-start-1' : ''}`}
            >
            <div className="relative min-h-[480px] flex items-center justify-center">
              {/* Animated Background */}
                <div 
                className="absolute inset-0 rounded-3xl opacity-20"
                  style={{ 
                  background: `radial-gradient(circle at center, ${steps[activeStep].color}40, transparent 70%)`,
                }}
              />

              {/* Mockup Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {mockups[steps[activeStep].mockup]}
                </motion.div>
              </AnimatePresence>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 left-0 text-3xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute bottom-10 right-0 text-3xl"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🚀
              </motion.div>
              </div>
            </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="text-center"
                >
                  <div 
                    className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-all ${
                      i <= activeStep ? 'text-white' : 'text-gray-400 bg-gray-200'
                    }`}
                    style={{ backgroundColor: i <= activeStep ? step.color : undefined }}
                  >
                    {i < activeStep ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.number}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2ecc71] via-[#3498db] to-[#9b59b6] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white text-center"
        >
          <p className="text-xl font-light mb-2">
            {t('solution.fromSeated')}
          </p>
          <p className="text-4xl sm:text-5xl font-black text-[#2ecc71]">
            {t('solution.simpleSteps')}
          </p>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            {isRTL 
              ? 'من المسح إلى الدفع، تجربة سلسة بالكامل بدون انتظار أو تعقيدات'
              : 'From scan to pay, a completely seamless experience with zero waiting or complications'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
