import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiPlus, FiMinus, FiShoppingCart, FiCreditCard, FiUsers } from 'react-icons/fi';
import { HiOutlineQrcode } from 'react-icons/hi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function InteractiveDemo() {
  const { isRTL } = useLanguage();
  const [step, setStep] = useState('menu'); // menu, cart, split, payment, success
  const [cart, setCart] = useState([]);
  const [selectedForSplit, setSelectedForSplit] = useState([]);

  const menuItems = [
    { id: 1, name: isRTL ? 'برجر كلاسيك' : 'Classic Burger', price: 120, emoji: '🍔', category: 'main' },
    { id: 2, name: isRTL ? 'بيتزا مارجريتا' : 'Margherita Pizza', price: 150, emoji: '🍕', category: 'main' },
    { id: 3, name: isRTL ? 'باستا كاربونارا' : 'Pasta Carbonara', price: 135, emoji: '🍝', category: 'main' },
    { id: 4, name: isRTL ? 'سلطة سيزر' : 'Caesar Salad', price: 85, emoji: '🥗', category: 'starter' },
    { id: 5, name: isRTL ? 'بطاطس مقرمشة' : 'Crispy Fries', price: 45, emoji: '🍟', category: 'side' },
    { id: 6, name: isRTL ? 'كولا باردة' : 'Cold Cola', price: 25, emoji: '🥤', category: 'drink' },
    { id: 7, name: isRTL ? 'عصير برتقال' : 'Orange Juice', price: 35, emoji: '🍊', category: 'drink' },
    { id: 8, name: isRTL ? 'تشيز كيك' : 'Cheesecake', price: 75, emoji: '🍰', category: 'dessert' },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem.qty > 1) {
      setCart(cart.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
    } else {
      setCart(cart.filter(i => i.id !== itemId));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const splitTotal = selectedForSplit.reduce((sum, itemId) => {
    const item = cart.find(i => i.id === itemId);
    return sum + (item ? item.price * item.qty : 0);
  }, 0);

  const toggleSplitItem = (itemId) => {
    if (selectedForSplit.includes(itemId)) {
      setSelectedForSplit(selectedForSplit.filter(id => id !== itemId));
    } else {
      setSelectedForSplit([...selectedForSplit, itemId]);
    }
  };

  const resetDemo = () => {
    setStep('menu');
    setCart([]);
    setSelectedForSplit([]);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 right-20 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🍽️
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
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold mb-6"
          >
            <HiOutlineQrcode className="w-5 h-5" />
            {isRTL ? 'جرّب بنفسك' : 'Try It Yourself'}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>شوف <span className="text-yellow-300">قوت</span> في العمل</>
            ) : (
              <>See <span className="text-yellow-300">Qoot</span> in Action</>
            )}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {isRTL 
              ? 'جرّب تجربة الطلب والدفع الكاملة - من القائمة إلى تقسيم الفاتورة!'
              : 'Experience the full ordering and payment journey - from menu to split bill!'}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2">
            {[
              { id: 'menu', label: isRTL ? 'القائمة' : 'Menu', icon: '📋' },
              { id: 'cart', label: isRTL ? 'السلة' : 'Cart', icon: '🛒' },
              { id: 'split', label: isRTL ? 'تقسيم' : 'Split', icon: '👥' },
              { id: 'payment', label: isRTL ? 'الدفع' : 'Pay', icon: '💳' },
              { id: 'success', label: isRTL ? 'تم!' : 'Done!', icon: '✅' },
            ].map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => {
                  if (s.id === 'menu') setStep('menu');
                  else if (s.id === 'cart' && cart.length > 0) setStep('cart');
                  else if (s.id === 'split' && cart.length > 0) setStep('split');
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  step === s.id 
                    ? 'bg-white text-[#764ba2]' 
                    : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Phone Frame */}
            <div className="bg-[#1a1a1a] rounded-[3rem] p-4 shadow-2xl shadow-black/30">
              {/* Notch - centered using flex */}
              <div className="absolute top-0 inset-x-0 flex justify-center z-20" style={{ direction: 'ltr' }}>
                <div className="w-32 h-8 bg-[#1a1a1a] rounded-b-3xl flex justify-center items-center pt-3">
                  <div className="w-16 h-3 bg-[#0a0a0a] rounded-full" />
                </div>
              </div>

              {/* Screen */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden w-[320px] h-[600px] relative">
                <AnimatePresence mode="wait">
                  {/* Menu View */}
                  {step === 'menu' && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="h-full flex flex-col"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] p-4 text-white">
                        <h3 className="text-lg font-bold text-center">🍽️ {isRTL ? 'مطعم قوت' : 'Qoot Restaurant'}</h3>
                        <p className="text-center text-white/80 text-sm">{isRTL ? 'القائمة الرقمية' : 'Digital Menu'}</p>
                      </div>

                      {/* Menu Grid */}
                      <div className="flex-1 overflow-auto p-4">
                        <div className="grid grid-cols-2 gap-3">
                          {menuItems.map((item) => (
                            <motion.button
                              key={item.id}
                              onClick={() => addToCart(item)}
                              className="p-3 rounded-2xl bg-gray-50 border-2 border-gray-100 hover:border-[#2ecc71] hover:bg-[#2ecc71]/5 transition-all text-center"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="text-3xl block mb-2">{item.emoji}</span>
                              <p className="text-xs font-medium text-gray-800 mb-1">{item.name}</p>
                              <p className="text-sm font-bold text-[#2ecc71]">{item.price} EGP</p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Cart Button */}
                      {cart.length > 0 && (
                        <motion.button
                          initial={{ y: 100 }}
                          animate={{ y: 0 }}
                          onClick={() => setStep('cart')}
                          className="m-4 py-4 bg-[#2ecc71] text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                        >
                          <FiShoppingCart className="w-5 h-5" />
                          {isRTL ? 'عرض السلة' : 'View Cart'} ({cart.reduce((sum, i) => sum + i.qty, 0)})
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {/* Cart View */}
                  {step === 'cart' && (
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] p-4 text-white">
                        <h3 className="text-lg font-bold text-center">🛒 {isRTL ? 'سلتك' : 'Your Cart'}</h3>
                      </div>

                      <div className="flex-1 overflow-auto p-4 space-y-3">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.emoji}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-[#2ecc71]">{item.price} EGP</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-6 text-center font-bold">{item.qty}</span>
                              <button 
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 rounded-full bg-[#2ecc71] flex items-center justify-center text-white"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <div className="flex justify-between mb-4">
                          <span className="text-gray-500">{isRTL ? 'الإجمالي' : 'Total'}</span>
                          <span className="text-2xl font-black text-[#2c3e50]">{totalPrice} EGP</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setStep('split')}
                            className="py-3 bg-[#9b59b6] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                          >
                            <FiUsers className="w-5 h-5" />
                            {isRTL ? 'تقسيم' : 'Split'}
                          </button>
                          <button 
                            onClick={() => setStep('payment')}
                            className="py-3 bg-[#2ecc71] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                          >
                            <FiCreditCard className="w-5 h-5" />
                            {isRTL ? 'ادفع' : 'Pay'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Split Bill View */}
                  {step === 'split' && (
                    <motion.div
                      key="split"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] p-4 text-white">
                        <h3 className="text-lg font-bold text-center">👥 {isRTL ? 'اختر أصنافك' : 'Select Your Items'}</h3>
                        <p className="text-center text-white/80 text-sm">{isRTL ? 'انقر على ما طلبته' : 'Tap what you ordered'}</p>
                      </div>

                      <div className="flex-1 overflow-auto p-4 space-y-3">
                        {cart.map((item) => (
                          <motion.button
                            key={item.id}
                            onClick={() => toggleSplitItem(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              selectedForSplit.includes(item.id)
                                ? 'bg-green-50 border-green-500'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                selectedForSplit.includes(item.id) ? 'bg-green-500' : 'bg-gray-300'
                              }`}>
                                {selectedForSplit.includes(item.id) && <FiCheck className="w-4 h-4 text-white" />}
                              </div>
                              <span className="text-2xl">{item.emoji}</span>
                              <div className="text-left">
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">x{item.qty}</p>
                              </div>
                            </div>
                            <span className={`font-bold ${selectedForSplit.includes(item.id) ? 'text-green-600' : 'text-gray-400'}`}>
                              {item.price * item.qty} EGP
                            </span>
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-100 bg-[#9b59b6]/10">
                        <div className="flex justify-between mb-4">
                          <span className="text-[#9b59b6]">{isRTL ? 'حصتك' : 'Your Share'}</span>
                          <span className="text-2xl font-black text-[#9b59b6]">{splitTotal} EGP</span>
                        </div>
                        <button 
                          onClick={() => setStep('payment')}
                          disabled={splitTotal === 0}
                          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                            splitTotal > 0 
                              ? 'bg-[#9b59b6] text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <FiCreditCard className="w-5 h-5" />
                          {isRTL ? 'ادفع حصتك' : 'Pay Your Share'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Payment View */}
                  {step === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] p-6 text-white text-center">
                        <p className="text-sm opacity-80">{isRTL ? 'المبلغ المطلوب' : 'Amount Due'}</p>
                        <p className="text-4xl font-black">{splitTotal > 0 ? splitTotal : totalPrice} EGP</p>
                      </div>

                      <div className="flex-1 p-4 space-y-3">
                        <p className="text-center text-gray-500 text-sm mb-4">{isRTL ? 'اختر طريقة الدفع' : 'Choose Payment Method'}</p>
                        
                        {[
                          { icon: '📱', name: 'Apple Pay', color: '#000' },
                          { icon: '💳', name: 'NFC Tap', color: '#2ecc71' },
                          { icon: '📷', name: 'QR Code', color: '#3498db' },
                          { icon: '⚡', name: 'InstaPay', color: '#f39c12' },
                          { icon: '🏪', name: 'Fawry', color: '#e74c3c' },
                        ].map((method, i) => (
                          <motion.button
                            key={i}
                            onClick={() => setStep('success')}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#2ecc71] hover:bg-[#2ecc71]/5 transition-all"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <span className="text-3xl">{method.icon}</span>
                            <span className="font-medium text-gray-800">{method.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Success View */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#2ecc71] to-[#27ae60]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6"
                      >
                        <FiCheck className="w-12 h-12 text-[#2ecc71]" />
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-black text-white mb-2"
                      >
                        {isRTL ? 'تم الدفع بنجاح! 🎉' : 'Payment Successful! 🎉'}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/80 text-center mb-8"
                      >
                        {isRTL ? 'شكراً لتجربتك! هكذا يعمل قوت.' : 'Thanks for trying! This is how Qoot works.'}
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        onClick={resetDemo}
                        className="px-8 py-3 bg-white text-[#2ecc71] rounded-xl font-bold"
                      >
                        {isRTL ? 'أعد التجربة' : 'Try Again'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Side Buttons */}
              <div className="absolute right-[-3px] top-28 w-1 h-12 bg-[#2a2a2a] rounded-r-sm" />
              <div className="absolute left-[-3px] top-24 w-1 h-8 bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute left-[-3px] top-36 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
            </div>

            {/* Instruction Badge */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-xl shadow-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm font-bold text-[#2c3e50]">
                👆 {isRTL ? 'جرّب النقر على الأصناف!' : 'Try tapping the items!'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

