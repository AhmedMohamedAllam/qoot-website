import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiCreditCard, FiClock, FiCheck, FiUsers } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { GlassCard, GoldButton, ParticleBackground, AnimatedCounter } from '../components/ui';

function SwipeableCartItem({ item, index, onRemove, onUpdateQuantity, isRTL, language }) {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0],
    ['rgba(239, 68, 68, 0.3)', 'transparent']
  );
  const deleteOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);

  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      onRemove(item.cartId);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRTL ? -100 : 100, height: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Delete Background */}
      <motion.div
        className="absolute inset-0 rounded-2xl flex items-center justify-end px-6"
        style={{ background }}
      >
        <motion.div style={{ opacity: deleteOpacity }}>
          <FiTrash2 className="text-red-500 w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Swipeable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative"
      >
        <GlassCard className={`p-4 flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Image */}
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            {item.image ? (
              <img src={item.image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[var(--bg-glass)] flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-[var(--text-primary)] text-lg">{name}</h3>
            {item.notes && (
              <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">{item.notes}</p>
            )}
            <motion.p
              className="text-[var(--gold-primary)] font-bold mt-2"
              key={item.price * item.quantity}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {formatCurrency(item.price * item.quantity, language === 'ar')}
            </motion.p>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col items-end justify-between">
            <motion.button
              onClick={() => onRemove(item.cartId)}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiTrash2 size={16} />
            </motion.button>
            
            <div 
              className="flex items-center gap-2 rounded-xl p-1"
              style={{ background: 'var(--bg-glass)' }}
            >
              <motion.button
                onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-glass-strong)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMinus size={14} className="text-[var(--text-secondary)]" />
              </motion.button>
              
              <motion.span
                key={item.quantity}
                className="w-6 text-center font-bold text-[var(--text-primary)]"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
              >
                {item.quantity}
              </motion.span>
              
              <motion.button
                onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                  color: '#0a0a0a'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlus size={14} />
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// Payment Timing Option Component
function PaymentTimingOption({ type, isSelected, onClick, isRTL }) {
  const isPayNow = type === 'now';
  
  const content = {
    now: {
      icon: <FiCreditCard size={24} />,
      title: isRTL ? 'ادفع الآن' : 'Pay Now',
      subtitle: isRTL ? 'الدفع قبل تحضير الطلب' : 'Pay before order preparation',
      badge: isRTL ? 'موصى به' : 'Recommended',
      color: '#10b981' // emerald
    },
    later: {
      icon: <FiClock size={24} />,
      title: isRTL ? 'ادفع لاحقاً' : 'Pay Later',
      subtitle: isRTL ? 'الدفع بعد الانتهاء من الوجبة' : 'Pay after finishing your meal',
      badge: null,
      color: '#f59e0b' // amber
    }
  };

  const data = content[type];

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-2xl text-left transition-all duration-300
        ${isRTL ? 'text-right' : ''}
      `}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${data.color}15 0%, ${data.color}08 100%)`
          : 'var(--bg-glass)',
        border: isSelected 
          ? `2px solid ${data.color}` 
          : '1px solid var(--border-subtle)',
        boxShadow: isSelected 
          ? `0 0 30px ${data.color}20`
          : 'none'
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isSelected 
              ? `linear-gradient(135deg, ${data.color}30 0%, ${data.color}15 100%)`
              : 'var(--bg-glass-strong)',
            color: isSelected ? data.color : 'var(--text-muted)'
          }}
        >
          {data.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <h4 
              className="font-bold text-lg"
              style={{ color: isSelected ? data.color : 'var(--text-primary)' }}
            >
              {data.title}
            </h4>
            {data.badge && (
              <span 
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: `${data.color}20`,
                  color: data.color
                }}
              >
                {data.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            {data.subtitle}
          </p>
        </div>
        
        {/* Selection Indicator */}
        <div 
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-300
          `}
          style={{
            borderColor: isSelected ? data.color : 'var(--border-subtle)',
            background: isSelected ? data.color : 'transparent'
          }}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FiCheck size={14} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
}

export default function CartPage() {
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  const { items, updateQuantity, removeItem, subtotal, tax, total, isEmpty, tableNumber } = useCart();
  const [paymentTiming, setPaymentTiming] = useState('now'); // 'now' or 'later'

  if (isEmpty) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-6">
        <ParticleBackground count={20} />
        
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)'
            }}
            animate={{ 
              boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 30px rgba(212,175,55,0.2)', '0 0 0 rgba(212,175,55,0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiShoppingBag size={48} className="text-[var(--text-muted)]" />
          </motion.div>
          
          <h2 className="text-3xl font-black text-[var(--text-primary)] font-display mb-3">
            {isRTL ? 'السلة فارغة' : 'Your cart is empty'}
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-xs mx-auto">
            {isRTL ? 'أضف بعض الأصناف اللذيذة من القائمة' : 'Add some delicious items from the menu'}
          </p>
          
          <GoldButton onClick={() => navigate(-1)} size="lg">
            {isRTL ? 'العودة للقائمة' : 'Back to Menu'}
          </GoldButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-48">
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
                {isRTL ? 'السلة' : 'Your Cart'}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cart Items */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <SwipeableCartItem
              key={item.cartId}
              item={item}
              index={index}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
              isRTL={isRTL}
              language={language}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary - Fixed Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.95) 20%, #0a0a0a 100%)'
        }}
      >
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Payment Timing Selection */}
          <div className="mb-4">
            <h3 className={`text-sm font-semibold text-[var(--text-muted)] mb-3 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'متى تريد الدفع؟' : 'When would you like to pay?'}
            </h3>
            <div className="space-y-3">
              <PaymentTimingOption
                type="now"
                isSelected={paymentTiming === 'now'}
                onClick={() => setPaymentTiming('now')}
                isRTL={isRTL}
              />
              <PaymentTimingOption
                type="later"
                isSelected={paymentTiming === 'later'}
                onClick={() => setPaymentTiming('later')}
                isRTL={isRTL}
              />
            </div>
          </div>

          {/* Summary */}
          <GlassCard className="p-4 mb-4">
            <div className="space-y-3">
              <div className={`flex justify-between text-[var(--text-muted)] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <AnimatedCounter value={subtotal} prefix={language === 'ar' ? '' : ''} suffix={language === 'ar' ? ' ج.م' : ' EGP'} />
              </div>
              <div className={`flex justify-between text-[var(--text-muted)] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{isRTL ? 'الضريبة (14%)' : 'Tax (14%)'}</span>
                <AnimatedCounter value={tax} prefix={language === 'ar' ? '' : ''} suffix={language === 'ar' ? ' ج.م' : ' EGP'} />
              </div>
              <div className={`flex justify-between text-xl font-bold pt-3 border-t border-[var(--border-subtle)] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[var(--text-primary)]">{isRTL ? 'الإجمالي' : 'Total'}</span>
                <span className="text-gradient-gold">
                  <AnimatedCounter value={total} suffix={language === 'ar' ? ' ج.م' : ' EGP'} />
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Split Bill Button */}
            <motion.button
              onClick={() => navigate('/split-bill')}
              className={`
                flex-1 py-4 px-4 rounded-2xl flex items-center justify-center gap-2
                ${isRTL ? 'flex-row-reverse' : ''}
              `}
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-primary)'
              }}
              whileHover={{ scale: 1.02, borderColor: 'var(--gold-primary)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FiUsers size={20} />
              <span className="font-bold">
                {isRTL ? 'قسّم الفاتورة' : 'Split Bill'}
              </span>
            </motion.button>
            
            {/* Checkout Button */}
            <GoldButton
              onClick={() => navigate(`/checkout?payment=${paymentTiming}`)}
              className="flex-[2] text-lg"
              size="lg"
            >
              {paymentTiming === 'now' 
                ? (isRTL ? 'ادفع وأرسل' : 'Pay & Order')
                : (isRTL ? 'أرسل الطلب' : 'Place Order')
              }
            </GoldButton>
          </div>
          
          {/* Payment timing note */}
          <motion.p 
            className="text-center text-xs text-[var(--text-dim)] mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={paymentTiming}
          >
            {paymentTiming === 'now' 
              ? (isRTL ? '💳 سيتم توجيهك لصفحة الدفع الآمن' : '💳 You will be redirected to secure payment')
              : (isRTL ? '🍽️ ادفع للكاشير بعد الانتهاء من وجبتك' : '🍽️ Pay at the cashier after your meal')
            }
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
