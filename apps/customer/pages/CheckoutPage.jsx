import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiDollarSign, FiSmartphone, FiCheck, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { GlassCard, GoldButton, ParticleBackground } from '../components/ui';

const paymentMethods = [
  { id: 'cash', icon: FiDollarSign, name: 'Cash', nameAr: 'نقداً', description: 'Pay at the counter', descriptionAr: 'الدفع عند الكاشير' },
  { id: 'card', icon: FiCreditCard, name: 'Card', nameAr: 'بطاقة', description: 'Credit/Debit card', descriptionAr: 'بطاقة ائتمان/خصم' },
  { id: 'instapay', icon: FiSmartphone, name: 'InstaPay', nameAr: 'انستاباي', description: 'Mobile payment', descriptionAr: 'الدفع بالموبايل' },
];

const orderTypes = [
  { id: 'dine-in', name: 'Dine In', nameAr: 'في المطعم', emoji: '🍽️' },
  { id: 'takeaway', name: 'Takeaway', nameAr: 'سفري', emoji: '🥡' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  const { items, total, tableNumber, clearCart } = useCart();
  
  const [orderType, setOrderType] = useState('dine-in');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(r => setTimeout(r, 2000));
    
    // Generate mock order ID
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    
    clearCart();
    navigate(`/success/${orderId}`);
  };

  return (
    <div className="min-h-screen relative pb-40">
      <ParticleBackground count={15} />

      {/* Header */}
      <motion.div 
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(16px)'
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button
              onClick={() => navigate(-1)}
              className="p-3 glass rounded-xl text-[var(--text-secondary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
            </motion.button>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-2xl font-black text-[var(--text-primary)] font-display">
                {isRTL ? 'إتمام الطلب' : 'Checkout'}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Order Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'نوع الطلب' : 'Order Type'}
          </h2>
          <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'direction-rtl' : ''}`}>
            {orderTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setOrderType(type.id)}
                className={`relative p-4 rounded-2xl text-center transition-all ${
                  orderType === type.id 
                    ? 'glass-card-gold' 
                    : 'glass-card hover:border-[var(--border-gold)]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-3xl mb-2 block">{type.emoji}</span>
                <span className={`font-semibold ${orderType === type.id ? 'text-[var(--gold-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {language === 'ar' ? type.nameAr : type.name}
                </span>
                
                {orderType === type.id && (
                  <motion.div
                    layoutId="orderTypeCheck"
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--gold-primary)' }}
                  >
                    <FiCheck size={14} className="text-[#0a0a0a]" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'طريقة الدفع' : 'Payment Method'}
          </h2>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              
              return (
                <motion.button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    isSelected 
                      ? 'glass-card-gold' 
                      : 'glass-card hover:border-[var(--border-gold)]'
                  } ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
                        : 'var(--bg-glass)'
                    }}
                  >
                    <Icon size={22} className={isSelected ? 'text-[#0a0a0a]' : 'text-[var(--text-muted)]'} />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-semibold ${isSelected ? 'text-[var(--gold-primary)]' : 'text-[var(--text-primary)]'}`}>
                      {language === 'ar' ? method.nameAr : method.name}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {language === 'ar' ? method.descriptionAr : method.description}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="paymentCheck"
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--gold-primary)' }}
                    >
                      <FiCheck size={14} className="text-[#0a0a0a]" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Order Summary Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="overflow-hidden">
            <button
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className={`w-full p-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="font-semibold text-[var(--text-primary)]">
                {isRTL ? 'ملخص الطلب' : 'Order Summary'} ({items.length})
              </span>
              <motion.div
                animate={{ rotate: showOrderSummary ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="text-[var(--text-muted)]" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {showOrderSummary && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <div className="p-4 space-y-3">
                    {items.map((item) => {
                      const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
                      return (
                        <div 
                          key={item.cartId} 
                          className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <span className="text-[var(--text-secondary)]">
                            {item.quantity}x {name}
                          </span>
                          <span className="text-[var(--text-primary)]">
                            {formatCurrency(item.price * item.quantity, language === 'ar')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>

      {/* Fixed Bottom - Total & Place Order */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.95) 20%, #0a0a0a 100%)'
        }}
      >
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Total */}
          <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-[var(--text-muted)]">
              {isRTL ? 'الإجمالي' : 'Total'}
            </span>
            <span className="text-2xl font-black text-gradient-gold">
              {formatCurrency(total, language === 'ar')}
            </span>
          </div>

          {/* Place Order Button */}
          <GoldButton
            fullWidth
            size="lg"
            onClick={handlePlaceOrder}
            loading={isProcessing}
            className="text-lg"
          >
            {isProcessing 
              ? (isRTL ? 'جاري إرسال الطلب...' : 'Placing Order...')
              : (isRTL ? 'إرسال الطلب' : 'Place Order')
            }
          </GoldButton>
          
          {/* Demo notice */}
          <p className="text-center text-xs text-[var(--text-dim)] mt-3">
            {isRTL ? '🎯 هذا عرض تجريبي - لن يتم الدفع الفعلي' : '🎯 Demo mode - No actual payment'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
