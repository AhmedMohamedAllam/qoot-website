import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../../shared/utils/currency';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';

export default function FloatingCart() {
  const navigate = useNavigate();
  const { itemCount, total, isEmpty } = useCart();
  const { isRTL, language } = useLanguage();

  return (
    <AnimatePresence>
      {!isEmpty && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <motion.button
            onClick={() => navigate('/cart')}
            className={`
              w-full btn-gold py-4 px-6 rounded-2xl
              flex items-center justify-between
              ${isRTL ? 'flex-row-reverse' : ''}
            `}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Left side - cart info */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative">
                <FiShoppingCart size={22} />
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#0a0a0a] text-[var(--gold-primary)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              </div>
              <span className="font-bold">
                {isRTL ? 'عرض السلة' : 'View Cart'}
              </span>
            </div>

            {/* Right side - total */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <motion.span
                key={total}
                initial={{ scale: 1.2, color: '#fff' }}
                animate={{ scale: 1, color: '#0a0a0a' }}
                className="font-bold text-lg"
              >
                {formatCurrency(total, language === 'ar')}
              </motion.span>
              <FiArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

